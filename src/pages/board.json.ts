import type { APIRoute } from 'astro';
import { loadBoard, seedPasteText, pickUpBrief, publicOrigin } from '../lib/board';
import seedRaw from '../content/seed.md?raw';

// The Open Board as data, for agents. Read-only: an answer comes back as a
// GitHub issue and joins the board as a committed file, never through here.
// Rendered per request only so the links carry the host the caller used.
export const prerender = false;

export const GET: APIRoute = ({ url, request }) => {
  const files = import.meta.glob('../content/board/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
  const runs = loadBoard(files);
  const seed = seedPasteText(seedRaw);
  const site = publicOrigin(request.headers, url);
  const openings = runs.filter(r => r.opening).map(r => ({
    id: r.id,
    title: r.title,
    by: r.by,
    date: r.date,
    seed: r.seed,
    problem: r.problem,
    opening: r.opening,
    run: `${site}/board/${r.id}`,
    continues: r.continues ?? null,
    carriedBy: r.continuedBy,
    brief: pickUpBrief(r, seed, site),
  }));
  return new Response(JSON.stringify({
    about: 'The CE Open Board: unfinished possibilities left by runs of the CE Seed. Pick one up by pasting its brief into any AI. Bring the answer back as an issue at https://github.com/thomascassidyzm/configuration-economics/issues/new',
    seed: `${site}/seed`,
    openings,
  }, null, 2), {
    headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' },
  });
};
