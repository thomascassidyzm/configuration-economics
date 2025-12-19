import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, r as renderTemplate } from '../chunks/astro/server_DKOE9GFU.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Configuration Economics — A Living Epistemic Work</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Sora:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Configuration Economics</h1> <p class="subtitle" data-astro-cid-j7pv25f6>A Living Epistemic Work</p> <span class="status" data-astro-cid-j7pv25f6>Development Preview</span> <div class="links" data-astro-cid-j7pv25f6> <a href="/concept-dark" data-astro-cid-j7pv25f6>Format Exploration — Dark Mode</a> <a href="/concept-light" data-astro-cid-j7pv25f6>Format Exploration — Light Mode</a> </div> <p class="note" data-astro-cid-j7pv25f6>
This is a new publication format where content exists in superposition
        until the reader's intent causes collapse into an appropriate projection.
        Configuration Economics will be the first work published in this format.
</p> </div> </body></html>`;
}, "/Users/tomcassidy/configuration-economics/src/pages/index.astro", void 0);

const $$file = "/Users/tomcassidy/configuration-economics/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
