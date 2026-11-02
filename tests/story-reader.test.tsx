import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getNarrative } from "@/data/narratives";
import { StoryReader } from "@/features/stories/story-reader";
import { StoryLinks } from "@/features/stories/story-links";

describe("StoryReader", () => {
  it("renders continuous chapters with working contents and source anchors", () => {
    const story = getNarrative("northern-qi-zhou-sui", "pingyang")!;
    const { container } = render(<StoryReader story={story} seriesSlug={story.seriesId} seriesTitle="北齐北周与隋" events={[]} />);
    expect(screen.getByRole("heading", { level: 1, name: story.title })).toBeInTheDocument();
    const contents = screen.getByRole("navigation", { name: "本篇目录" });
    for (const section of story.sections) {
      expect(within(contents).getByRole("link", { name: section.title })).toHaveAttribute("href", `#${section.id}`);
      expect(container.querySelector(`[id="${section.id}"]`)).toBeInTheDocument();
    }
    for (const link of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(container.querySelector(`[id="${link.hash.slice(1)}"]`), link.hash).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: /下一篇.*宇文赟/ })).toHaveAttribute("href", "/series/northern-qi-zhou-sui/stories/zhou-xuan-emperor");
    expect(screen.queryByRole("link", { name: /下一篇.*萧观音/ })).not.toBeInTheDocument();
  });

  it("keeps poetry, attribution, interpretation and source qualification visible", () => {
    const story = getNarrative("liao", "xiao-guanyin")!;
    render(<StoryReader story={story} seriesSlug="liao" seriesTitle="辽与西辽" events={[]} />);
    const poem = screen.getByRole("figure", { name: "《回心院》其五" });
    expect(poem).toHaveTextContent("作品归属存在争议");
    expect(poem).toHaveTextContent("待君贶");
    expect(poem).toHaveTextContent("编者释义");
    expect(screen.getAllByText("文学流传").length).toBeGreaterThan(0);
    expect(screen.getByRole("region", { name: "阅读依据" })).toHaveTextContent("仅查阅摘要");
    expect(screen.getByText(/原稿段落定位/)).toBeInTheDocument();
  });
});

describe("story entry points", () => {
  it("filters event and person entry points without leaking other series", () => {
    const { rerender, container } = render(<StoryLinks seriesId="northern-qi-zhou-sui" seriesSlug="northern-qi-zhou-sui" eventId="zhou-pingyang-campaign" />);
    expect(screen.getByRole("link", { name: /平阳城下/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /大军为何/ })).not.toBeInTheDocument();
    rerender(<StoryLinks seriesId="northern-qi-zhou-sui" seriesSlug="northern-qi-zhou-sui" personId="yang-guang" />);
    expect(screen.getByRole("link", { name: /大军为何/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /平阳城下/ })).not.toBeInTheDocument();
    rerender(<StoryLinks seriesId="liao" seriesSlug="liao" eventId="zhou-pingyang-campaign" />);
    expect(container).toBeEmptyDOMElement();
  });
});
