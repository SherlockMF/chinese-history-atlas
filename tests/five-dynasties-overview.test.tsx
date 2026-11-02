import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { dynasties } from "@/data/seed/dynasties";
import { FiveDynastiesOverview } from "@/features/series/five-dynasties-overview";

describe("Five Dynasties comparative overview", () => {
  it("shows exactly five dynasties and ten kingdoms through 979 with real period tooltips", async () => {
    render(<FiveDynastiesOverview dynasties={dynasties} />);
    const user = userEvent.setup();
    expect(screen.getAllByTestId("five-polity-time-row")).toHaveLength(15);
    expect(screen.getByRole("button", { name: "北汉：951—979年" })).toBeInTheDocument();
    await user.hover(screen.getByRole("button", { name: "吴：902—937年" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("吴 · 902—937年");
    await user.selectOptions(screen.getByLabelText("五代十国对照年份"), "979");
    const contemporaries = screen.getByRole("region", { name: "979年五代十国同期政权" });
    expect(contemporaries).toHaveTextContent("北汉");
    expect(contemporaries).not.toHaveTextContent("吴越");
    expect(within(contemporaries).getByRole("link", { name: /979年地图/ })).toHaveAttribute("href", "/map?year=979");
  });
  it("retains the early Wu period without pretending a 902 map exists", async () => {
    render(<FiveDynastiesOverview dynasties={dynasties} routePrefix="/series/five-dynasties" />);
    const user = userEvent.setup();
    await user.selectOptions(screen.getByLabelText("五代十国对照年份"), "902");
    expect(screen.getByRole("link", { name: /907年地图/ })).toHaveAttribute("href", "/series/five-dynasties/map?year=907");
    expect(screen.getByText(/地图从907年开始/)).toBeInTheDocument();
  });
});
