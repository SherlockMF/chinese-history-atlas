import { act, cleanup, render } from "@testing-library/react";
import { Suspense } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HistoryProvider } from "@/features/history-state/history-provider";
import { useHistoryStore } from "@/features/history-state/history-store";

const navigation = vi.hoisted(() => ({
  pathname: "/map",
  query: "year=936",
  replace: vi.fn(),
  suspendSearch: false,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ replace: navigation.replace }),
  useSearchParams: () => {
    if (navigation.suspendSearch) throw new Promise(() => {});
    return new URLSearchParams(navigation.query);
  },
}));

function renderProvider() {
  const view = <HistoryProvider><div>history</div></HistoryProvider>;
  const result = render(view);
  return {
    commit(query: string, pathname = navigation.pathname) {
      act(() => {
        navigation.pathname = pathname;
        navigation.query = query;
        result.rerender(
          <HistoryProvider><div>history</div></HistoryProvider>,
        );
      });
    },
  };
}

describe("HistoryProvider URL synchronization", () => {
  beforeEach(() => {
    navigation.pathname = "/map";
    navigation.query = "year=936";
    navigation.replace.mockReset();
    navigation.suspendSearch = false;
    useHistoryStore.getState().reset({ currentYear: 936 });
  });

  afterEach(cleanup);

  it("keeps story chapters in the initial HTML while URL synchronization suspends", () => {
    navigation.suspendSearch = true;
    const html = renderToString(
      <Suspense fallback={null}>
        <HistoryProvider><section id="six-rulers">六位君主的结局</section></HistoryProvider>
      </Suspense>,
    );
    expect(html).toContain('<section id="six-rulers">六位君主的结局</section>');
  });

  it.each(["jin-sixteen-kingdoms", "eastern-jin"])("preserves a narrative return context when selecting a person in %s event details", (slug) => {
    navigation.pathname = "/explore/jin-fei-river";
    navigation.query = `year=383&series=${slug}&sequence=former-qin-fei&step=fei-battle`;
    renderProvider();
    act(() => useHistoryStore.getState().selectPerson("fu-jian"));
    const href = navigation.replace.mock.calls.at(-1)?.[0] as string;
    const params = new URL(href, "http://localhost").searchParams;
    expect(params.get("sequence")).toBe("former-qin-fei");
    expect(params.get("step")).toBe("fei-battle");
    expect(params.get("series")).toBe(slug);
  });

  it("keeps the Eastern Jin narrative when changing years locally on its map", () => {
    navigation.pathname = "/series/eastern-jin/map";
    navigation.query = "year=383&sequence=former-qin-fei&step=fei-river";
    const replaceState = vi.spyOn(window.history, "replaceState");
    renderProvider();
    act(() => useHistoryStore.getState().setCurrentYear(384));
    expect(replaceState).toHaveBeenLastCalledWith(null, "", "/series/eastern-jin/map?year=384&sequence=former-qin-fei&step=fei-river");
    replaceState.mockRestore();
  });

  it("switches series without clamping 608 to the old range and restores legacy routes", () => {
    const { commit } = renderProvider();
    act(() => useHistoryStore.getState().selectPerson("shi-jingtang"));
    commit("year=608", "/series/northern-qi-zhou-sui/timeline");
    expect(useHistoryStore.getState().currentYear).toBe(608);
    expect(useHistoryStore.getState().selectedPerson).toBeUndefined();
    expect(useHistoryStore.getState().series.id).toBe("northern-qi-zhou-sui");
    const replaceState = vi.spyOn(window.history, "replaceState");
    act(() => useHistoryStore.getState().setCurrentYear(609));
    expect(replaceState).toHaveBeenLastCalledWith(null, "", "/series/northern-qi-zhou-sui/timeline?year=609");
    replaceState.mockRestore();
    commit("year=936", "/map");
    expect(useHistoryStore.getState().currentYear).toBe(936);
    expect(useHistoryStore.getState().series.id).toBe("five-dynasties");
    expect(useHistoryStore.getState().routePrefix).toBe("");
  });

  it("updates map playback years without a server navigation", () => {
    const replaceState = vi.spyOn(window.history, "replaceState");
    renderProvider();
    act(() => useHistoryStore.getState().setCurrentYear(937));
    expect(navigation.replace).not.toHaveBeenCalled();
    expect(replaceState).toHaveBeenLastCalledWith(null, "", "/map?year=937");
    replaceState.mockRestore();
  });

  it.each(["/people", "/series/five-dynasties/people"])("keeps person selection local before following a story from %s", (pathname) => {
    navigation.pathname = pathname;
    const replaceState = vi.spyOn(window.history, "replaceState");
    try {
      const { commit } = renderProvider();
      act(() => useHistoryStore.getState().selectPerson("shi-jingtang"));
      act(() => useHistoryStore.getState().selectPerson("li-yu"));
      expect(replaceState).toHaveBeenLastCalledWith(null, "", `${pathname}?year=936&person=li-yu`);
      expect(navigation.replace).not.toHaveBeenCalled();
      commit("", "/series/northern-wei/stories/heyin");
      expect(navigation.replace).not.toHaveBeenCalled();
      expect(useHistoryStore.getState().series.id).toBe("northern-wei");
    } finally {
      replaceState.mockRestore();
    }
  });

  it("keeps a rapid open then close closed when the old open URL commits late", () => {
    const { commit } = renderProvider();

    act(() => useHistoryStore.getState().selectDynasty("later-jin"));
    expect(navigation.replace).toHaveBeenLastCalledWith(
      "/map?year=936&dynasty=later-jin",
      { scroll: false },
    );

    act(() => useHistoryStore.getState().selectDynasty(undefined));
    expect(navigation.replace).toHaveBeenLastCalledWith(
      "/map?year=936",
      { scroll: false },
    );

    commit("year=936&dynasty=later-jin");
    expect(useHistoryStore.getState().selectedDynasty).toBeUndefined();
    expect(navigation.replace).toHaveBeenLastCalledWith(
      "/map?year=936",
      { scroll: false },
    );

    commit("year=936");
    expect(useHistoryStore.getState().selectedDynasty).toBeUndefined();
  });

  it("does not replay an older local person URL as a server navigation", () => {
    navigation.pathname = "/series/northern-qi-zhou-sui/people";
    navigation.query = "";
    const replaceState = vi.spyOn(window.history, "replaceState");
    try {
      const { commit } = renderProvider();
      act(() => useHistoryStore.getState().selectPerson("gao-wei"));
      act(() => useHistoryStore.getState().selectPerson("yang-guang"));
      commit("year=550&person=gao-wei");
      expect(useHistoryStore.getState().selectedPerson).toBe("yang-guang");
      expect(navigation.replace).not.toHaveBeenCalled();
      expect(replaceState).toHaveBeenCalledTimes(2);
      commit("year=550&person=yang-guang");
      commit("", "/series/northern-qi-zhou-sui/stories/sui-goguryeo");
      expect(navigation.replace).not.toHaveBeenCalled();
    } finally {
      replaceState.mockRestore();
    }
  });

  it("accepts an external URL after local selection returns to the observed query", () => {
    navigation.pathname = "/people";
    const { commit } = renderProvider();
    act(() => {
      useHistoryStore.getState().selectPerson("shi-jingtang");
      useHistoryStore.getState().selectPerson(undefined);
    });
    commit("year=936");
    commit("year=937&person=li-yu");
    expect(useHistoryStore.getState()).toMatchObject({ currentYear: 937, selectedPerson: "li-yu" });
    expect(navigation.replace).not.toHaveBeenCalled();
  });

  it.each(["/map", "/series/five-dynasties/map"])("keeps the latest local map year when older server navigations commit on %s", (pathname) => {
    navigation.pathname = pathname;
    const { commit } = renderProvider();
    act(() => useHistoryStore.getState().selectDynasty("later-jin"));
    act(() => useHistoryStore.getState().selectDynasty("liao"));
    act(() => useHistoryStore.getState().setCurrentYear(937));

    expect(navigation.replace).toHaveBeenCalledTimes(2);
    expect(window.location.pathname + window.location.search).toBe(`${pathname}?year=937&dynasty=liao`);

    commit("year=936&dynasty=later-jin");
    expect(useHistoryStore.getState()).toMatchObject({ currentYear: 937, selectedDynasty: "liao" });
    commit("year=936&dynasty=liao");
    expect(useHistoryStore.getState()).toMatchObject({ currentYear: 937, selectedDynasty: "liao" });
    expect(navigation.replace).toHaveBeenCalledTimes(2);

    commit("year=937&dynasty=liao");
    commit("year=938&dynasty=later-jin");
    expect(useHistoryStore.getState()).toMatchObject({ currentYear: 938, selectedDynasty: "later-jin" });
    expect(navigation.replace).toHaveBeenCalledTimes(2);
  });

  it("makes the last of rapid A to B to none updates win", () => {
    const { commit } = renderProvider();

    act(() => useHistoryStore.getState().selectDynasty("later-jin"));
    act(() => useHistoryStore.getState().selectDynasty("liao"));
    act(() => useHistoryStore.getState().selectDynasty(undefined));

    expect(navigation.replace.mock.calls.slice(0, 3)).toEqual([
      ["/map?year=936&dynasty=later-jin", { scroll: false }],
      ["/map?year=936&dynasty=liao", { scroll: false }],
      ["/map?year=936", { scroll: false }],
    ]);

    commit("year=936&dynasty=later-jin");
    expect(useHistoryStore.getState().selectedDynasty).toBeUndefined();
    commit("year=936&dynasty=liao");
    expect(useHistoryStore.getState().selectedDynasty).toBeUndefined();
    commit("year=936");
    expect(useHistoryStore.getState().selectedDynasty).toBeUndefined();
  });

  it("accepts browser URL changes after the internal navigation settles", () => {
    const { commit } = renderProvider();

    act(() => useHistoryStore.getState().selectDynasty("later-jin"));
    commit("year=936&dynasty=later-jin");
    expect(useHistoryStore.getState().selectedDynasty).toBe("later-jin");

    commit("year=936");
    expect(useHistoryStore.getState().selectedDynasty).toBeUndefined();
  });

  it("accepts a new pathname without replaying pending state from the old route", () => {
    const { commit } = renderProvider();

    act(() => useHistoryStore.getState().selectDynasty("later-jin"));
    commit("year=978&person=li-yu", "/people");

    expect(useHistoryStore.getState()).toMatchObject({
      currentYear: 978,
      selectedDynasty: undefined,
      selectedPerson: "li-yu",
    });
    expect(navigation.replace).toHaveBeenCalledTimes(1);
  });
});
