import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SeriesStoryExplorer } from "@/features/series/series-story-explorer";

describe("SeriesStoryExplorer", () => {
  it("links the Northern Wei reform diagram to the full story", () => {
    render(<SeriesStoryExplorer seriesId="northern-wei" />);
    expect(screen.getByRole("link", { name: "读完整故事：户籍、田地与官俸 →" })).toHaveAttribute("href", "/series/northern-wei/stories/wei-households");
  });

  it("links each capital and frontier topic to its own narrative", async () => {
    const user = userEvent.setup();
    render(<SeriesStoryExplorer seriesId="northern-wei" />);
    await user.click(screen.getByRole("button", { name: "从洛阳新都到北镇危机" }));
    expect(screen.getByRole("link", { name: /读本节故事：迁都改变/ })).toHaveAttribute("href", "/series/northern-wei/stories/xiaowen-luoyang");
    await user.click(screen.getByRole("button", { name: "边镇危机" }));
    expect(screen.getByRole("link", { name: /读本节故事：六镇/ })).toHaveAttribute("href", "/series/northern-wei/stories/six-garrisons");
    expect(screen.queryByRole("link", { name: /读本节故事：迁都改变/ })).not.toBeInTheDocument();
  });

  it("does not show another dynasty's stories for an unknown series", () => {
    const { container } = render(<SeriesStoryExplorer seriesId="not-a-series" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("switches Liao themes and resets the selected diagram explanation", async () => {
    const user = userEvent.setup();
    render(<SeriesStoryExplorer seriesId="liao" />);
    await user.click(screen.getByRole("button", { name: "汉城" }));
    expect(screen.getByRole("region", { name: "图解说明" })).toHaveTextContent("市肆");
    await user.click(screen.getByRole("button", { name: "西辽的统治关系" }));
    expect(screen.getByRole("heading", { name: "王庭与核心辖区" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "汉城" })).not.toBeInTheDocument();
  });

  it("offers all six chiefdoms with a visible schematic boundary and sources", async () => {
    const user = userEvent.setup();
    render(<SeriesStoryExplorer seriesId="dali" />);
    await user.click(screen.getByRole("button", { name: "蒙舍诏" }));
    const detail = screen.getByRole("region", { name: "图解说明" });
    expect(detail).toHaveTextContent("巍山");
    expect(detail).toHaveTextContent("最南");
    expect(screen.getByText(/相对方位示意.*不是疆界/)).toBeVisible();
    expect(screen.getByText(/大理（上）.*P035–P040/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /大理州人民政府.*隋唐时期/ })).toHaveAttribute("href", expect.stringContaining("dali.gov.cn"));
    for (const name of ["浪穹诏", "邆赕诏", "施浪诏", "越析诏", "蒙嶲诏", "蒙舍诏"]) {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    }
  });

  it("resets series state when the homepage changes dynasty", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<SeriesStoryExplorer seriesId="liao" />);
    await user.click(screen.getByRole("button", { name: "西辽的统治关系" }));
    rerender(<SeriesStoryExplorer seriesId="northern-wei" />);
    expect(screen.getByRole("heading", { name: "班禄：官俸从哪里来" })).toBeInTheDocument();
    expect(screen.queryByText("西辽的统治关系")).not.toBeInTheDocument();
  });

  it("allows keyboard selection of a canal and explains the historical route", async () => {
    const user = userEvent.setup();
    render(<SeriesStoryExplorer seriesId="northern-qi-zhou-sui" />);
    await user.click(screen.getByRole("button", { name: "洛阳与运河" }));
    const node = screen.getByRole("button", { name: "永济渠" });
    node.focus();
    await user.keyboard("{Enter}");
    expect(node).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("region", { name: "图解说明" })).toHaveTextContent("608");
    expect(screen.getByRole("region", { name: "图解说明" })).toHaveTextContent("涿郡");
    expect(screen.getByText(/不套用.*京杭/)).toBeVisible();
  });

  it.each([
    ["northern-wei", "户籍、田地与官俸"],
    ["liao", "双城与移动皇廷"],
    ["western-xia", "学校、选官与法典"],
    ["dali", "洱海周围的六诏"],
    ["southern-dynasties", "建康的寺院生活"],
    ["northern-qi-zhou-sui", "从北朝官制到隋"],
    ["five-dynasties", "闽地的港口、农田与学校"],
  ])("provides substantive, traceable content for %s", (seriesId, title) => {
    render(<SeriesStoryExplorer seriesId={seriesId} />);
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    const sources = screen.getByRole("region", { name: "阅读依据" });
    expect(within(sources).getAllByRole("link").length).toBeGreaterThan(0);
    for (const link of within(sources).getAllByRole("link")) {
      expect(link).toHaveAttribute("href", expect.stringMatching(/^https:\/\//));
    }
    expect(sources).toHaveTextContent(/P\d{3}/);
    expect(screen.getByRole("region", { name: "图解说明" }).textContent!.length).toBeGreaterThan(55);
  });
});
