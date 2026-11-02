import Link from "next/link";
import { narrativeCatalog } from "@/data/narratives/catalog";

export function StoryLinks({ seriesId, seriesSlug, eventId, personId }: {
  seriesId: string;
  seriesSlug: string;
  eventId?: string;
  personId?: string;
}) {
  const stories = narrativeCatalog.filter(story => story.seriesId === seriesId
    && (!eventId || story.eventIds.includes(eventId))
    && (!personId || story.personIds.includes(personId)));
  if (!stories.length) return null;

  return <section aria-label="故事长读" className="my-8 border-y border-ink/15 py-7">
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h2 className="font-serif text-2xl">故事长读</h2>
      <Link href={`/series/${seriesSlug}/stories`} className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4 focus-visible:outline-cinnabar">全部故事 →</Link>
    </div>
    <div className="divide-y divide-ink/10">
      {stories.map(story => <div key={story.slug} className="py-5">
        <p className="text-xs tracking-wider text-muted">{story.period} · {story.category}</p>
        <Link href={`/series/${seriesSlug}/stories/${story.slug}`} className="mt-2 inline-flex min-h-11 items-center font-serif text-xl leading-8 text-ink underline decoration-cinnabar/30 underline-offset-8 hover:text-cinnabar focus-visible:outline-cinnabar">{story.title}</Link>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{story.summary}</p>
      </div>)}
    </div>
  </section>;
}
