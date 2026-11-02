import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PolityPeriodBar } from "@/features/series/polity-period-bar";

describe("polity period details", () => {
  it("shows actual years on hover and keyboard focus and dismisses with Escape", async () => {
    render(<div className="relative"><PolityPeriodBar name="前凉" start={301} end={376} firstYear={301} lastYear={440} color="#a58b5e" active /></div>);
    const user = userEvent.setup(), bar = screen.getByRole("button", { name: "前凉：301—376年" });
    await user.hover(bar);
    expect(screen.getByRole("tooltip")).toHaveTextContent("前凉 · 301—376年");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    fireEvent.focus(bar);
    expect(screen.getByRole("tooltip")).toHaveTextContent("含兴亡年");
  });
  it("supports touch activation and outside dismissal without inventing dates", async () => {
    render(<><PolityPeriodBar name="西秦" start={409} end={431} firstYear={301} lastYear={440} color="#a58b5e" active /><button>空白区域</button></>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "西秦：409—431年" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("409—431年");
    await user.click(screen.getByRole("button", { name: "空白区域" }));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
