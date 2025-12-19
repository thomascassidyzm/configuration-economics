import 'piccolore';
import { n as decodeKey } from './chunks/astro/server_DKOE9GFU.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D_dBA6dc.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/tomcassidy/configuration-economics/","cacheDir":"file:///Users/tomcassidy/configuration-economics/node_modules/.astro/","outDir":"file:///Users/tomcassidy/configuration-economics/dist/","srcDir":"file:///Users/tomcassidy/configuration-economics/src/","publicDir":"file:///Users/tomcassidy/configuration-economics/public/","buildClientDir":"file:///Users/tomcassidy/configuration-economics/dist/client/","buildServerDir":"file:///Users/tomcassidy/configuration-economics/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/guide","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/guide\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"guide","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/guide.ts","pathname":"/api/guide","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/concept-dark.BTNA54Bk.css"}],"routeData":{"route":"/concept-dark","isIndex":false,"type":"page","pattern":"^\\/concept-dark\\/?$","segments":[[{"content":"concept-dark","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/concept-dark.astro","pathname":"/concept-dark","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/concept-light.Cr5ALAnz.css"}],"routeData":{"route":"/concept-light","isIndex":false,"type":"page","pattern":"^\\/concept-light\\/?$","segments":[[{"content":"concept-light","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/concept-light.astro","pathname":"/concept-light","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":":root{--void: #0a0a0c;--depth-1: #12121a;--text-primary: #e8e8f0;--text-secondary: #a0a0b8;--text-muted: #606080;--accent: #4a9eff;--font-display: \"Cormorant Garamond\", serif;--font-body: \"Sora\", sans-serif;--font-mono: \"JetBrains Mono\", monospace}[data-astro-cid-j7pv25f6]{margin:0;padding:0;box-sizing:border-box}body{font-family:var(--font-body);background:var(--void);color:var(--text-primary);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem}.container[data-astro-cid-j7pv25f6]{max-width:600px;text-align:center}h1[data-astro-cid-j7pv25f6]{font-family:var(--font-display);font-size:3rem;font-weight:300;margin-bottom:.5rem}.subtitle[data-astro-cid-j7pv25f6]{font-size:.875rem;color:var(--text-muted);letter-spacing:.2em;text-transform:uppercase;margin-bottom:3rem}.status[data-astro-cid-j7pv25f6]{font-family:var(--font-mono);font-size:.75rem;color:var(--text-muted);margin-bottom:3rem;padding:.5rem 1rem;border:1px solid rgba(255,255,255,.1);border-radius:4px;display:inline-block}.links[data-astro-cid-j7pv25f6]{display:flex;flex-direction:column;gap:1rem;margin-bottom:3rem}a[data-astro-cid-j7pv25f6]{color:var(--text-secondary);text-decoration:none;padding:1rem 2rem;border:1px solid rgba(255,255,255,.1);border-radius:8px;transition:all .3s ease}a[data-astro-cid-j7pv25f6]:hover{border-color:var(--accent);color:var(--text-primary);transform:translateY(-2px)}.note[data-astro-cid-j7pv25f6]{font-size:.875rem;color:var(--text-muted);line-height:1.6;max-width:500px}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/tomcassidy/configuration-economics/src/pages/concept-dark.astro",{"propagation":"none","containsHead":true}],["/Users/tomcassidy/configuration-economics/src/pages/concept-light.astro",{"propagation":"none","containsHead":true}],["/Users/tomcassidy/configuration-economics/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/guide@_@ts":"pages/api/guide.astro.mjs","\u0000@astro-page:src/pages/concept-dark@_@astro":"pages/concept-dark.astro.mjs","\u0000@astro-page:src/pages/concept-light@_@astro":"pages/concept-light.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B9sLC3Td.mjs","/Users/tomcassidy/configuration-economics/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DZFJVJZx.mjs","/Users/tomcassidy/configuration-economics/src/pages/concept-dark.astro?astro&type=script&index=0&lang.ts":"_astro/concept-dark.astro_astro_type_script_index_0_lang.Cbsp-zaG.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/tomcassidy/configuration-economics/src/pages/concept-dark.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\".intent-option\").forEach(e=>{e.addEventListener(\"click\",()=>{const t=e.textContent;console.log(\"Intent:\",t),e.style.borderColor=\"var(--accent)\",e.style.background=\"var(--accent-glow)\",setTimeout(()=>{},300)})});document.querySelectorAll(\".mode-card\").forEach(e=>{e.addEventListener(\"click\",()=>{const t=e.dataset.mode;console.log(\"Mode selected:\",t)})});document.querySelectorAll(\".depth-layer\").forEach(e=>{e.addEventListener(\"click\",()=>{e.classList.toggle(\"expanded\")})});document.querySelectorAll(\".highlight\").forEach(e=>{e.addEventListener(\"click\",()=>{console.log(\"Term clicked:\",e.textContent)})});"]],"assets":["/_astro/concept-dark.BTNA54Bk.css","/_astro/concept-light.Cr5ALAnz.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"T8ZULlRHQT3c11RYV4g8Qm54yjqzh2iGXVdxA5eobiA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
