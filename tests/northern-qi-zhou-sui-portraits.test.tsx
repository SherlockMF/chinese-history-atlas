import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { northernQiZhouSuiPeople as people } from "@/data/seed/people/northern-qi-zhou-sui";
import { northernQiZhouSuiConfig as series } from "@/data/series/northern-qi-zhou-sui/config";
import { KeyPeople } from "@/features/home/key-people";
import { PersonDetailPanel } from "@/features/people/person-detail-panel";
import { PersonPortrait } from "@/features/people/person-portrait";
import { PersonSearch } from "@/features/people/person-search";

const yangJian = people.find(({ id }) => id === "yang-jian")!;
const liJingxun = people.find(({ id }) => id === "li-jingxun")!;

describe("Northern Qi, Northern Zhou and Sui portraits", () => {
  it("shows all 19 portraits in search and selects the matching canonical person", () => {
    const onSelect = vi.fn();
    render(<PersonSearch people={people} hasActiveFilters={false} onSelect={onSelect} />);

    const candidates = screen.getByRole("region", { name: "候选人物" });
    expect(within(candidates).getAllByRole("img")).toHaveLength(19);
    expect(screen.queryByText("画像未收录")).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "李静训" } });
    const result = screen.getByRole("button", { name: "选择李静训" });
    expect(within(result).getByRole("img", { name: "李静训画像" })).toBeVisible();
    fireEvent.click(result);
    expect(onSelect).toHaveBeenCalledWith("li-jingxun");
  });

  it("links Yang Jian to the checked reference rather than the rejected candidate", () => {
    render(<PersonDetailPanel person={yangJian} enableChat={false} />);

    expect(screen.getByRole("img", { name: "杨坚画像" })).toBeVisible();
    expect(screen.getByText("有参考画像")).toBeVisible();
    fireEvent.click(screen.getByText("画像依据与说明"));
    expect(screen.getByRole("link", { name: /参考画像：/ })).toHaveAttribute(
      "href", "https://commons.wikimedia.org/wiki/File:Emperor_Wen_of_sui.jpeg",
    );
    expect(screen.getByText(/画像均为艺术创作，非真容复原/)).toBeVisible();
  });

  it("describes Li Jingxun as an imagined child portrait with the recorded age", () => {
    render(<PersonDetailPanel person={liJingxun} enableChat={false} />);

    expect(screen.getByRole("img", { name: "李静训画像" })).toBeVisible();
    expect(screen.getByText("无参考画像")).toBeVisible();
    fireEvent.click(screen.getByText("画像依据与说明"));
    expect(screen.getByText(/依据史料“年九岁”创作儿童形象/)).toBeVisible();
    expect(screen.queryByRole("link", { name: /参考画像：/ })).not.toBeInTheDocument();
  });

  it("uses the series routes for illustrated homepage cards", () => {
    render(<KeyPeople people={[yangJian, liJingxun]} series={series} routePrefix="/series/northern-qi-zhou-sui" />);

    for (const person of [yangJian, liJingxun]) {
      const portrait = screen.getByRole("img", { name: `${person.name}画像` });
      expect(portrait).toBeVisible();
      expect(portrait.closest("a")).toHaveAttribute("href", expect.stringContaining(`/series/northern-qi-zhou-sui/people?person=${person.id}`));
    }
  });

  it("keeps an unknown person distinct from an imagined portrait", () => {
    render(<PersonPortrait person={{ id: "unlisted-northern-person", name: "未收录人物" }} details />);

    expect(screen.getByText("画像未收录")).toBeVisible();
    expect(screen.queryByText("无参考画像")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
