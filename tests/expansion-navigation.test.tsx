import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRouteSeries } from "@/data/series";
import { getEventSeries } from "@/lib/repositories/series-repository";
import { getArchiveHref, getSiteById } from "@/data/sites";
import { RelatedSites } from "@/features/sites/related-sites";
import EventPage from "@/app/explore/[id]/page";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NEXT_NOT_FOUND"); } }));

describe("expansion navigation", () => {
  it("resolves shared events in a validated requested series", () => {
    expect(getEventSeries("wei-split-eastern-wei", "northern-wei")?.id).toBe("northern-wei");
    expect(getRouteSeries("/explore/wei-split-eastern-wei", "northern-wei").id).toBe("northern-wei");
    expect(getEventSeries("wei-split-eastern-wei", "jin")?.id).toBe("northern-qi-zhou-sui");
    expect(getRouteSeries("/explore/wei-split-eastern-wei", "jin").id).toBe("northern-qi-zhou-sui");
  });
  it("keeps the northern Wei reading path at its shared final event", async () => {
    render(await EventPage({ params: Promise.resolve({ id: "wei-split-eastern-wei" }), searchParams: Promise.resolve({ series: "northern-wei", path: "wei-breaking", year: "534" }) }));
    expect(screen.getByRole("link", { name: "全部导读" })).toHaveAttribute("href", "/series/northern-wei#reading-paths");
    expect(screen.getByRole("link", { name: /返回时间线/ })).toHaveAttribute("href", "/series/northern-wei/timeline?year=534#timeline");
    expect(screen.getByRole("link", { name: /上一站/ }).getAttribute("href")).toContain("series=northern-wei");
  });
  it.each(["xu-xianxiu", "sima-jinlong", "yelu-yuzhi", "fangshan-jinling"])("reserves %s without creating a broken archive link", id => {
    const site = getSiteById(id);
    expect(site).not.toBeNull();
    if (!site) return;
    expect(site.status).toBe("planned");
    expect(getArchiveHref(site)).toBeNull();
    render(<RelatedSites sites={[site]} />);
    expect(screen.getByText(/现场内容筹备中/)).toBeVisible();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
