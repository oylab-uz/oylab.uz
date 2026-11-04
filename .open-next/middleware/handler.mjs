
import { Buffer } from "node:buffer";
globalThis.Buffer = Buffer;

// Next.js' compiled middleware references `AsyncLocalStorage` as a global. workerd only
// exposes it via `node:async_hooks` (not as a global, even with `nodejs_compat`), so it is
// assigned here - as `@opennextjs/aws`'s edge middleware bundler does.
import { AsyncLocalStorage } from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;

// Next.js sets `__import_unsupported` on `globalThis` with `configurable: false`.
// When the middleware and the server share a Worker, the second call would throw,
// so it is skipped when the property is already set. Otherwise it runs as usual.
// See https://github.com/vercel/next.js/blob/5b7833e3/packages/next/src/server/web/globals.ts#L94-L98
const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function (o, p, a) {
	if (p === "__import_unsupported" && Boolean(globalThis.__import_unsupported)) {
		// `Object.defineProperty` returns the object it was passed.
		return o;
	}
	return defaultDefineProperty(o, p, a);
};

globalThis.openNextDebug = false;
globalThis.openNextVersion = "4.1.15";
globalThis.nextVersion = "16.4.5";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod7) => function __require2() {
  try {
    return mod7 || (0, cb[__getOwnPropNames(cb)[0]])((mod7 = { exports: {} }).exports, mod7), mod7.exports;
  } catch (e) {
    throw mod7 = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod7, isNodeMode, target) => (target = mod7 != null ? __create(__getProtoOf(mod7)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod7 || !mod7.__esModule ? __defProp(target, "default", { value: mod7, enumerable: true }) : target,
  mod7
));

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => !["cf-connecting-ip", "x-forwarded-host"].includes(key.toLowerCase())));
        if (eventHeaders.host) {
          headers["x-forwarded-host"] = eventHeaders.host;
        }
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-builtins:node:worker_threads
import * as mod from "node:worker_threads";
var require_node_worker_threads = __commonJS({
  "node-builtins:node:worker_threads"(exports, module) {
    module.exports = mod.default ?? mod;
  }
});

// node_modules/.pnpm/@opennextjs+cloudflare@1.20.16_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_reac_b035b5dbbe8cdd65324855e1a4a64204/node_modules/@opennextjs/cloudflare/dist/cli/templates/shims/throw.js
var throw_exports = {};
__export(throw_exports, {
  default: () => throw_default
});
var throw_default;
var init_throw = __esm({
  "node_modules/.pnpm/@opennextjs+cloudflare@1.20.16_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_reac_b035b5dbbe8cdd65324855e1a4a64204/node_modules/@opennextjs/cloudflare/dist/cli/templates/shims/throw.js"() {
    throw "OpenNext shim";
    throw_default = {};
  }
});

// node-builtins:node:path
import * as mod2 from "node:path";
var require_node_path = __commonJS({
  "node-builtins:node:path"(exports, module) {
    module.exports = mod2.default ?? mod2;
  }
});

// node-builtins:node:url
import * as mod3 from "node:url";
var require_node_url = __commonJS({
  "node-builtins:node:url"(exports, module) {
    module.exports = mod3.default ?? mod3;
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/build/adapter/setup-node-env.external.js
var require_setup_node_env_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/build/adapter/setup-node-env.external.js"() {
    "use strict";
    if (false) {
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/response-cache/types.js
var require_types = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/response-cache/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      CachedRouteKind: function() {
        return CachedRouteKind;
      },
      IncrementalCacheKind: function() {
        return IncrementalCacheKind;
      }
    });
    var CachedRouteKind = /* @__PURE__ */ (function(CachedRouteKind2) {
      CachedRouteKind2["APP_PAGE"] = "APP_PAGE";
      CachedRouteKind2["APP_ROUTE"] = "APP_ROUTE";
      CachedRouteKind2["PAGES"] = "PAGES";
      CachedRouteKind2["FETCH"] = "FETCH";
      CachedRouteKind2["REDIRECT"] = "REDIRECT";
      CachedRouteKind2["IMAGE"] = "IMAGE";
      return CachedRouteKind2;
    })({});
    var IncrementalCacheKind = /* @__PURE__ */ (function(IncrementalCacheKind2) {
      IncrementalCacheKind2["APP_PAGE"] = "APP_PAGE";
      IncrementalCacheKind2["APP_ROUTE"] = "APP_ROUTE";
      IncrementalCacheKind2["PAGES"] = "PAGES";
      IncrementalCacheKind2["FETCH"] = "FETCH";
      IncrementalCacheKind2["IMAGE"] = "IMAGE";
      return IncrementalCacheKind2;
    })({});
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/lru-cache.js
var require_lru_cache = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/lru-cache.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "LRUCache", {
      enumerable: true,
      get: function() {
        return LRUCache;
      }
    });
    var LRUNode = class {
      constructor(key, data, size) {
        this.prev = null;
        this.next = null;
        this.key = key;
        this.data = data;
        this.size = size;
      }
    };
    var SentinelNode = class {
      constructor() {
        this.prev = null;
        this.next = null;
      }
    };
    var LRUCache = class {
      constructor(maxSize, calculateSize, onEvict) {
        this.cache = /* @__PURE__ */ new Map();
        this.totalSize = 0;
        this.maxSize = maxSize;
        this.calculateSize = calculateSize;
        this.onEvict = onEvict;
        this.head = new SentinelNode();
        this.tail = new SentinelNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
      }
      /**
      * Adds a node immediately after the head (marks as most recently used).
      * Used when inserting new items or when an item is accessed.
      * PRECONDITION: node must be disconnected (prev/next should be null)
      */
      addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
      }
      /**
      * Removes a node from its current position in the doubly-linked list.
      * Updates the prev/next pointers of adjacent nodes to maintain list integrity.
      * PRECONDITION: node must be connected (prev/next are non-null)
      */
      removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }
      /**
      * Moves an existing node to the head position (marks as most recently used).
      * This is the core LRU operation - accessed items become most recent.
      */
      moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
      }
      /**
      * Removes and returns the least recently used node (the one before tail).
      * This is called during eviction when the cache exceeds capacity.
      * PRECONDITION: cache is not empty (ensured by caller)
      */
      removeTail() {
        const lastNode = this.tail.prev;
        this.removeNode(lastNode);
        return lastNode;
      }
      /**
      * Sets a key-value pair in the cache.
      * If the key exists, updates the value and moves to head.
      * If new, adds at head and evicts from tail if necessary.
      *
      * Time Complexity:
      * - O(1) for uniform item sizes
      * - O(k) where k is the number of items evicted (can be O(N) for variable sizes)
      */
      set(key, value) {
        const size = (this.calculateSize == null ? void 0 : this.calculateSize.call(this, value, key)) ?? 1;
        if (size <= 0) {
          throw new Error(`LRUCache: calculateSize returned ${size}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`);
        }
        if (size > this.maxSize) {
          console.warn("Single item size exceeds maxSize");
          return false;
        }
        const existing = this.cache.get(key);
        if (existing) {
          existing.data = value;
          this.totalSize = this.totalSize - existing.size + size;
          existing.size = size;
          this.moveToHead(existing);
        } else {
          const newNode = new LRUNode(key, value, size);
          this.cache.set(key, newNode);
          this.addToHead(newNode);
          this.totalSize += size;
        }
        while (this.totalSize > this.maxSize && this.cache.size > 0) {
          const tail = this.removeTail();
          this.cache.delete(tail.key);
          this.totalSize -= tail.size;
          this.onEvict == null ? void 0 : this.onEvict.call(this, tail.key, tail.data);
        }
        return true;
      }
      /**
      * Checks if a key exists in the cache.
      * This is a pure query operation - does NOT update LRU order.
      *
      * Time Complexity: O(1)
      */
      has(key) {
        return this.cache.has(key);
      }
      /**
      * Retrieves a value by key and marks it as most recently used.
      * Moving to head maintains the LRU property for future evictions.
      *
      * Time Complexity: O(1)
      */
      get(key) {
        const node = this.cache.get(key);
        if (!node) return void 0;
        this.moveToHead(node);
        return node.data;
      }
      /**
      * Returns an iterator over the cache entries. The order is outputted in the
      * order of most recently used to least recently used.
      */
      *[Symbol.iterator]() {
        let current = this.head.next;
        while (current && current !== this.tail) {
          const node = current;
          yield [
            node.key,
            node.data
          ];
          current = current.next;
        }
      }
      /**
      * Removes a specific key from the cache.
      * Updates both the hash map and doubly-linked list.
      *
      * Note: This is an explicit removal and does NOT trigger the `onEvict`
      * callback. Use this for intentional deletions where eviction tracking
      * is not needed.
      *
      * Time Complexity: O(1)
      */
      remove(key) {
        const node = this.cache.get(key);
        if (!node) return;
        this.removeNode(node);
        this.cache.delete(key);
        this.totalSize -= node.size;
      }
      /**
      * Returns the number of items in the cache.
      */
      get size() {
        return this.cache.size;
      }
      /**
      * Returns the current total size of all cached items.
      * This uses the custom size calculation if provided.
      */
      get currentSize() {
        return this.totalSize;
      }
    };
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/incremental-cache/memory-cache.external.js
var require_memory_cache_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/incremental-cache/memory-cache.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "getMemoryCache", {
      enumerable: true,
      get: function() {
        return getMemoryCache;
      }
    });
    var _types = require_types();
    var _lrucache = require_lru_cache();
    var memoryCache;
    function getBufferSize(buffer) {
      return (buffer == null ? void 0 : buffer.length) || 0;
    }
    function getSegmentDataSize(segmentData) {
      if (!segmentData) {
        return 0;
      }
      let size = 0;
      for (const [segmentPath, buffer] of segmentData) {
        size += segmentPath.length + getBufferSize(buffer);
      }
      return size;
    }
    function getMemoryCache(maxMemoryCacheSize) {
      if (!memoryCache) {
        memoryCache = new _lrucache.LRUCache(maxMemoryCacheSize, function length({ value }, cacheKey) {
          let valueSize;
          if (!value) {
            valueSize = 25;
          } else if (value.kind === _types.CachedRouteKind.REDIRECT) {
            valueSize = JSON.stringify(value.props).length;
          } else if (value.kind === _types.CachedRouteKind.IMAGE) {
            throw new Error("invariant image should not be incremental-cache");
          } else if (value.kind === _types.CachedRouteKind.FETCH) {
            valueSize = JSON.stringify(value.data || "").length;
          } else if (value.kind === _types.CachedRouteKind.APP_ROUTE) {
            valueSize = value.body.length;
          } else if (value.kind === _types.CachedRouteKind.APP_PAGE) {
            var _value_postponed;
            valueSize = Math.max(1, value.html.length + getBufferSize(value.rscData) + (((_value_postponed = value.postponed) == null ? void 0 : _value_postponed.length) || 0) + getSegmentDataSize(value.segmentData));
          } else {
            var _JSON_stringify;
            valueSize = value.html.length + (((_JSON_stringify = JSON.stringify(value.pageData)) == null ? void 0 : _JSON_stringify.length) || 0);
          }
          return cacheKey.length + valueSize;
        });
      }
      return memoryCache;
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js
var require_ensure_leading_slash = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "ensureLeadingSlash", {
      enumerable: true,
      get: function() {
        return ensureLeadingSlash;
      }
    });
    function ensureLeadingSlash(path3) {
      return path3.startsWith("/") ? path3 : `/${path3}`;
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js
var require_sorted_routes = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      getSortedRouteObjects: function() {
        return getSortedRouteObjects;
      },
      getSortedRoutes: function() {
        return getSortedRoutes;
      }
    });
    var UrlNode = class _UrlNode {
      insert(urlPath) {
        this._insert(urlPath.split("/").filter(Boolean), [], false);
      }
      smoosh() {
        return this._smoosh();
      }
      _smoosh(prefix = "/") {
        const childrenPaths = [
          ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
        }
        if (this.restSlugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
        }
        if (this.optionalRestSlugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
        }
        const routes = childrenPaths.map((c) => this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr) => [
          ...prev,
          ...curr
        ], []);
        if (this.slugName !== null) {
          routes.push(...this.children.get("[]")._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
          const r = prefix === "/" ? "/" : prefix.slice(0, -1);
          if (this.optionalRestSlugName != null) {
            throw new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`);
          }
          routes.unshift(r);
        }
        if (this.restSlugName !== null) {
          routes.push(...this.children.get("[...]")._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        if (this.optionalRestSlugName !== null) {
          routes.push(...this.children.get("[[...]]")._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
        }
        return routes;
      }
      _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
          this.placeholder = false;
          return;
        }
        if (isCatchAll) {
          throw new Error(`Catch-all must be the last part of the URL.`);
        }
        let nextSegment = urlPaths[0];
        if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
          let handleSlug = function(previousSlug, nextSlug) {
            if (previousSlug !== null) {
              if (previousSlug !== nextSlug) {
                throw new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`);
              }
            }
            slugNames.forEach((slug) => {
              if (slug === nextSlug) {
                throw new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`);
              }
              if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
                throw new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`);
              }
            });
            slugNames.push(nextSlug);
          };
          let segmentName = nextSegment.slice(1, -1);
          let isOptional = false;
          if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
            segmentName = segmentName.slice(1, -1);
            isOptional = true;
          }
          if (segmentName.startsWith("\u2026")) {
            throw new Error(`Detected a three-dot character ('\u2026') at ('${segmentName}'). Did you mean ('...')?`);
          }
          if (segmentName.startsWith("...")) {
            segmentName = segmentName.substring(3);
            isCatchAll = true;
          }
          if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
            throw new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`);
          }
          if (segmentName.startsWith(".")) {
            throw new Error(`Segment names may not start with erroneous periods ('${segmentName}').`);
          }
          if (isCatchAll) {
            if (isOptional) {
              if (this.restSlugName != null) {
                throw new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`);
              }
              handleSlug(this.optionalRestSlugName, segmentName);
              this.optionalRestSlugName = segmentName;
              nextSegment = "[[...]]";
            } else {
              if (this.optionalRestSlugName != null) {
                throw new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`);
              }
              handleSlug(this.restSlugName, segmentName);
              this.restSlugName = segmentName;
              nextSegment = "[...]";
            }
          } else {
            if (isOptional) {
              throw new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`);
            }
            handleSlug(this.slugName, segmentName);
            this.slugName = segmentName;
            nextSegment = "[]";
          }
        }
        if (!this.children.has(nextSegment)) {
          this.children.set(nextSegment, new _UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
      }
      constructor() {
        this.placeholder = true;
        this.children = /* @__PURE__ */ new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
      }
    };
    function getSortedRoutes(normalizedPages) {
      const root = new UrlNode();
      normalizedPages.forEach((pagePath) => root.insert(pagePath));
      return root.smoosh();
    }
    function getSortedRouteObjects(objects, getter) {
      const indexes = {};
      const pathnames = [];
      for (let i = 0; i < objects.length; i++) {
        const pathname = getter(objects[i]);
        indexes[pathname] = i;
        pathnames[i] = pathname;
      }
      const sorted = getSortedRoutes(pathnames);
      return sorted.map((pathname) => objects[indexes[pathname]]);
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/segment.js
var require_segment = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/segment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
      },
      NOT_FOUND_SEGMENT_KEY: function() {
        return NOT_FOUND_SEGMENT_KEY;
      },
      PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
      },
      computeSelectedLayoutSegment: function() {
        return computeSelectedLayoutSegment;
      },
      getSegmentValue: function() {
        return getSegmentValue;
      },
      getSelectedLayoutSegmentPath: function() {
        return getSelectedLayoutSegmentPath;
      },
      isGroupSegment: function() {
        return isGroupSegment;
      },
      isParallelRouteSegment: function() {
        return isParallelRouteSegment;
      }
    });
    function getSegmentValue(segment) {
      return Array.isArray(segment) ? segment[1] : segment;
    }
    function isGroupSegment(segment) {
      return segment[0] === "(" && segment.endsWith(")");
    }
    function isParallelRouteSegment(segment) {
      return segment.startsWith("@") && segment !== "@children";
    }
    function computeSelectedLayoutSegment(segments, parallelRouteKey) {
      if (!segments || segments.length === 0) {
        return null;
      }
      const rawSegment = parallelRouteKey === "children" ? segments[0] : segments[segments.length - 1];
      return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
    }
    function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
      let node;
      if (first) {
        node = tree[1][parallelRouteKey];
      } else {
        const parallelRoutes = tree[1];
        node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
      }
      if (!node) return segmentPath;
      const segment = node[0];
      let segmentValue = getSegmentValue(segment);
      if (!segmentValue || segmentValue === PAGE_SEGMENT_KEY) {
        return segmentPath;
      }
      segmentPath.push(segmentValue);
      return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
    }
    var PAGE_SEGMENT_KEY = "__PAGE__";
    var DEFAULT_SEGMENT_KEY = "__DEFAULT__";
    var NOT_FOUND_SEGMENT_KEY = "/_not-found";
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/app-paths.js
var require_app_paths = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/app-paths.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      compareAppPaths: function() {
        return compareAppPaths2;
      },
      normalizeAppPath: function() {
        return normalizeAppPath2;
      },
      normalizeRscURL: function() {
        return normalizeRscURL;
      },
      selectAppPageEntry: function() {
        return selectAppPageEntry2;
      }
    });
    var _ensureleadingslash = require_ensure_leading_slash();
    var _segment = require_segment();
    function normalizeAppPath2(route) {
      return (0, _ensureleadingslash.ensureLeadingSlash)(route.split("/").reduce((pathname, segment, index, segments) => {
        if (!segment) {
          return pathname;
        }
        if ((0, _segment.isGroupSegment)(segment)) {
          return pathname;
        }
        if (segment[0] === "@") {
          return pathname;
        }
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
          return pathname;
        }
        return `${pathname}/${segment}`;
      }, ""));
    }
    function compareAppPaths2(a, b) {
      const aHasSlot = a.includes("/@");
      const bHasSlot = b.includes("/@");
      if (aHasSlot && !bHasSlot) return -1;
      if (!aHasSlot && bHasSlot) return 1;
      return a.localeCompare(b);
    }
    function normalizeAppPageEntryPathname(appPath) {
      return normalizeAppPath2(appPath).replace(/%5F/g, "_");
    }
    function selectAppPageEntry2(pathname, appPaths, normalizePathname = normalizeAppPageEntryPathname) {
      let entry;
      for (const appPath of appPaths) {
        if (normalizePathname(appPath) !== pathname) continue;
        if (entry === void 0 || compareAppPaths2(entry, appPath) < 0) {
          entry = appPath;
        }
      }
      if (entry === void 0) {
        throw new Error(`Invariant: no direct app page entry found for ${pathname}`);
      }
      return entry;
    }
    function normalizeRscURL(url) {
      return url.replace(
        /\.rsc($|\?)/,
        // $1 ensures `?` is preserved
        "$1"
      );
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/interception-routes.js
var require_interception_routes = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/interception-routes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      INTERCEPTION_ROUTE_MARKERS: function() {
        return INTERCEPTION_ROUTE_MARKERS;
      },
      extractInterceptionRouteInformation: function() {
        return extractInterceptionRouteInformation;
      },
      findMissingCanonicalInterceptionRoutes: function() {
        return findMissingCanonicalInterceptionRoutes;
      },
      isInterceptionRouteAppPath: function() {
        return isInterceptionRouteAppPath;
      }
    });
    var _apppaths = require_app_paths();
    var INTERCEPTION_ROUTE_MARKERS = [
      "(..)(..)",
      "(.)",
      "(..)",
      "(...)"
    ];
    function parseRoutePattern(route) {
      const segments = route.split("/").filter(Boolean);
      const tail = segments.at(-1);
      const isOptionalCatchAll = tail !== void 0 && tail.startsWith("[[...") && tail.endsWith("]]");
      const isCatchAll = tail !== void 0 && tail.startsWith("[...") && tail.endsWith("]");
      const unbounded = isOptionalCatchAll || isCatchAll;
      const prefixSegments = unbounded ? segments.slice(0, -1) : segments;
      return {
        prefix: prefixSegments.map((segment) => segment.startsWith("[") && segment.endsWith("]") ? null : segment),
        minLength: prefixSegments.length + (isCatchAll && !isOptionalCatchAll ? 1 : 0),
        unbounded
      };
    }
    function acceptsLength(pattern, length) {
      return pattern.unbounded ? length >= pattern.minLength : length === pattern.minLength;
    }
    function prefixCovers(canonical, intercepted) {
      return canonical.prefix.every((canonicalSegment, index) => {
        if (canonicalSegment === null) return true;
        const interceptedSegment = intercepted.prefix[index];
        return interceptedSegment !== void 0 && interceptedSegment !== null && canonicalSegment === interceptedSegment;
      });
    }
    function patternCoversAtLength(canonical, intercepted, length) {
      return acceptsLength(canonical, length) && acceptsLength(intercepted, length) && prefixCovers(canonical, intercepted);
    }
    function isRoutePatternCovered(route, ordinaryRoutes) {
      const intercepted = parseRoutePattern(route);
      if (!intercepted.unbounded) {
        return ordinaryRoutes.some((pattern) => patternCoversAtLength(pattern, intercepted, intercepted.minLength));
      }
      let unboundedCoverageStart = Infinity;
      for (const pattern of ordinaryRoutes) {
        if (pattern.unbounded && prefixCovers(pattern, intercepted)) {
          unboundedCoverageStart = Math.min(unboundedCoverageStart, Math.max(intercepted.minLength, pattern.minLength));
        }
      }
      if (unboundedCoverageStart === Infinity) return false;
      for (let length = intercepted.minLength; length < unboundedCoverageStart; length++) {
        if (!ordinaryRoutes.some((pattern) => patternCoversAtLength(pattern, intercepted, length))) {
          return false;
        }
      }
      return true;
    }
    function isInterceptionRouteAppPath(path3) {
      return path3.split("/").find((segment) => INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m))) !== void 0;
    }
    function extractInterceptionRouteInformation(path3) {
      let interceptingRoute;
      let marker;
      let interceptedRoute;
      for (const segment of path3.split("/")) {
        marker = INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
        if (marker) {
          ;
          [interceptingRoute, interceptedRoute] = path3.split(marker, 2);
          break;
        }
      }
      if (!interceptingRoute || !marker || !interceptedRoute) {
        throw new Error(`Invalid interception route: ${path3}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
      }
      interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute);
      switch (marker) {
        case "(.)":
          if (interceptingRoute === "/") {
            interceptedRoute = `/${interceptedRoute}`;
          } else {
            interceptedRoute = interceptingRoute + "/" + interceptedRoute;
          }
          break;
        case "(..)":
          if (interceptingRoute === "/") {
            throw new Error(`Invalid interception route: ${path3}. Cannot use (..) marker at the root level, use (.) instead.`);
          }
          interceptedRoute = interceptingRoute.split("/").slice(0, -1).concat(interceptedRoute).join("/");
          break;
        case "(...)":
          interceptedRoute = "/" + interceptedRoute;
          break;
        case "(..)(..)":
          const splitInterceptingRoute = interceptingRoute.split("/");
          if (splitInterceptingRoute.length <= 2) {
            throw new Error(`Invalid interception route: ${path3}. Cannot use (..)(..) marker at the root level or one level up.`);
          }
          interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join("/");
          break;
        default:
          throw new Error("Invariant: unexpected marker");
      }
      return {
        interceptingRoute,
        interceptedRoute
      };
    }
    function findMissingCanonicalInterceptionRoutes(appPaths) {
      const canonicalRoutes = Object.keys(appPaths).filter((route) => !isInterceptionRouteAppPath(route));
      const canonicalRoutePatterns = canonicalRoutes.map(parseRoutePattern);
      return Object.keys(appPaths).filter(isInterceptionRouteAppPath).map((interceptionRoute) => ({
        interceptionRoute,
        canonicalRoute: extractInterceptionRouteInformation(interceptionRoute).interceptedRoute
      })).filter(({ canonicalRoute }) => !isRoutePatternCovered(canonicalRoute, canonicalRoutePatterns)).sort((a, b) => a.interceptionRoute.localeCompare(b.interceptionRoute));
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js
var require_is_dynamic = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "isDynamicRoute", {
      enumerable: true,
      get: function() {
        return isDynamicRoute;
      }
    });
    var _interceptionroutes = require_interception_routes();
    var TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
    var TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
    function isDynamicRoute(route, strict = true) {
      if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
      }
      if (strict) {
        return TEST_STRICT_ROUTE.test(route);
      }
      return TEST_ROUTE.test(route);
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/index.js
var require_utils = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/router/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      getSortedRouteObjects: function() {
        return _sortedroutes.getSortedRouteObjects;
      },
      getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
      },
      isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
      }
    });
    var _sortedroutes = require_sorted_routes();
    var _isdynamic = require_is_dynamic();
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/utils.js
var require_utils2 = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      DecodeError: function() {
        return DecodeError;
      },
      MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
      },
      MissingStaticPage: function() {
        return MissingStaticPage;
      },
      NormalizeError: function() {
        return NormalizeError;
      },
      PageNotFoundError: function() {
        return PageNotFoundError;
      },
      SP: function() {
        return SP;
      },
      ST: function() {
        return ST;
      },
      WEB_VITALS: function() {
        return WEB_VITALS;
      },
      execOnce: function() {
        return execOnce;
      },
      getDisplayName: function() {
        return getDisplayName;
      },
      getLocationOrigin: function() {
        return getLocationOrigin;
      },
      getURL: function() {
        return getURL;
      },
      isAbsoluteUrl: function() {
        return isAbsoluteUrl;
      },
      isResSent: function() {
        return isResSent;
      },
      loadGetInitialProps: function() {
        return loadGetInitialProps;
      },
      normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes2;
      },
      stringifyError: function() {
        return stringifyError;
      }
    });
    var WEB_VITALS = [
      "CLS",
      "FCP",
      "INP",
      "LCP",
      "TTFB"
    ];
    function execOnce(fn) {
      let used = false;
      let result;
      return (...args) => {
        if (!used) {
          used = true;
          result = fn(...args);
        }
        return result;
      };
    }
    var ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
    var isAbsoluteUrl = (url) => {
      const c = url.charCodeAt(0);
      const isLetter = c >= 65 && c <= 90 || c >= 97 && c <= 122;
      if (!isLetter) {
        return false;
      }
      return ABSOLUTE_URL_REGEX.test(url);
    };
    function getLocationOrigin() {
      const { protocol, hostname, port } = window.location;
      return `${protocol}//${hostname}${port ? ":" + port : ""}`;
    }
    function getURL() {
      const { href } = window.location;
      const origin = getLocationOrigin();
      return href.substring(origin.length);
    }
    function getDisplayName(Component) {
      return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
    }
    function isResSent(res) {
      return res.finished || res.headersSent;
    }
    function normalizeRepeatedSlashes2(url) {
      const urlParts = url.split("?");
      const urlNoQuery = urlParts[0];
      return urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? `?${urlParts.slice(1).join("?")}` : "");
    }
    async function loadGetInitialProps(App, ctx) {
      if (false) {
        if (App.prototype?.getInitialProps) {
          const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
          throw new Error(message);
        }
      }
      const res = ctx.res || ctx.ctx && ctx.ctx.res;
      if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
          return {
            pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
          };
        }
        return {};
      }
      const props = await App.getInitialProps(ctx);
      if (res && isResSent(res)) {
        return props;
      }
      if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw new Error(message);
      }
      if (false) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
          console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
      }
      return props;
    }
    var SP = typeof performance !== "undefined";
    var ST = SP && [
      "mark",
      "measure",
      "getEntriesByName"
    ].every((method) => typeof performance[method] === "function");
    var DecodeError = class extends Error {
    };
    var NormalizeError = class extends Error {
    };
    var PageNotFoundError = class extends Error {
      constructor(page) {
        super();
        this.code = "ENOENT";
        this.name = "PageNotFoundError";
        this.message = `Cannot find module for page: ${page}`;
      }
    };
    var MissingStaticPage = class extends Error {
      constructor(page, message) {
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
      }
    };
    var MiddlewareNotFoundError = class extends Error {
      constructor() {
        super();
        this.code = "ENOENT";
        this.message = `Cannot find the middleware module`;
      }
    };
    function stringifyError(error2) {
      return JSON.stringify({
        message: error2.message,
        stack: error2.stack
      });
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js
var require_normalize_page_path = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "normalizePagePath", {
      enumerable: true,
      get: function() {
        return normalizePagePath2;
      }
    });
    var _ensureleadingslash = require_ensure_leading_slash();
    var _utils = require_utils();
    var _utils1 = require_utils2();
    function normalizePagePath2(page) {
      const normalized = /^\/index(\/|$)/.test(page) && !(0, _utils.isDynamicRoute)(page) ? `/index${page}` : page === "/" ? "/index" : (0, _ensureleadingslash.ensureLeadingSlash)(page);
      if (false) {
        const { posix } = null;
        const resolvedPage = posix.normalize(normalized);
        if (resolvedPage !== normalized) {
          throw new _utils1.NormalizeError(`Requested and resolved page mismatch: ${normalized} ${resolvedPage}`);
        }
      }
      return normalized;
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js
var require_normalize_locale_path = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "normalizeLocalePath", {
      enumerable: true,
      get: function() {
        return normalizeLocalePath2;
      }
    });
    var cache = /* @__PURE__ */ new WeakMap();
    function normalizeLocalePath2(pathname, locales) {
      if (!locales) return {
        pathname
      };
      let lowercasedLocales = cache.get(locales);
      if (!lowercasedLocales) {
        lowercasedLocales = locales.map((locale) => locale.toLowerCase());
        cache.set(locales, lowercasedLocales);
      }
      let detectedLocale;
      const segments = pathname.split("/", 2);
      if (!segments[1]) return {
        pathname
      };
      const segment = segments[1].toLowerCase();
      const index = lowercasedLocales.indexOf(segment);
      if (index < 0) return {
        pathname
      };
      detectedLocale = locales[index];
      pathname = pathname.slice(detectedLocale.length + 1) || "/";
      return {
        pathname,
        detectedLocale
      };
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/invariant-error.js
var require_invariant_error = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/invariant-error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "InvariantError", {
      enumerable: true,
      get: function() {
        return InvariantError;
      }
    });
    var InvariantError = class extends Error {
      constructor(message, options) {
        super(`Invariant: ${message.endsWith(".") ? message : message + "."} This is a bug in Next.js.`, options);
        this.name = "InvariantError";
      }
    };
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/normalizers/normalizers.js
var require_normalizers = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/normalizers/normalizers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Normalizers", {
      enumerable: true,
      get: function() {
        return Normalizers;
      }
    });
    var Normalizers = class {
      constructor(normalizers = []) {
        this.normalizers = normalizers;
      }
      push(normalizer) {
        this.normalizers.push(normalizer);
      }
      normalize(pathname) {
        return this.normalizers.reduce((normalized, normalizer) => normalizer.normalize(normalized), pathname);
      }
    };
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/normalizers/wrap-normalizer-fn.js
var require_wrap_normalizer_fn = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/normalizers/wrap-normalizer-fn.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "wrapNormalizerFn", {
      enumerable: true,
      get: function() {
        return wrapNormalizerFn;
      }
    });
    function wrapNormalizerFn(fn) {
      return {
        normalize: fn
      };
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/normalizers/underscore-normalizer.js
var require_underscore_normalizer = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/normalizers/underscore-normalizer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "UnderscoreNormalizer", {
      enumerable: true,
      get: function() {
        return UnderscoreNormalizer;
      }
    });
    var UnderscoreNormalizer = class {
      normalize(pathname) {
        return pathname.replace(/%5F/g, "_");
      }
    };
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/normalizers/built/app/app-pathname-normalizer.js
var require_app_pathname_normalizer = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/normalizers/built/app/app-pathname-normalizer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      AppPathnameNormalizer: function() {
        return AppPathnameNormalizer;
      },
      DevAppPathnameNormalizer: function() {
        return DevAppPathnameNormalizer;
      }
    });
    var _apppaths = require_app_paths();
    var _normalizers = require_normalizers();
    var _wrapnormalizerfn = require_wrap_normalizer_fn();
    var _underscorenormalizer = require_underscore_normalizer();
    var AppPathnameNormalizer = class extends _normalizers.Normalizers {
      constructor() {
        super([
          // The pathname to match should have the trailing `/page` and other route
          // group information stripped from it.
          (0, _wrapnormalizerfn.wrapNormalizerFn)(_apppaths.normalizeAppPath),
          // The page should have the `%5F` characters replaced with `_` characters.
          new _underscorenormalizer.UnderscoreNormalizer()
        ]);
      }
      normalize(page) {
        return super.normalize(page);
      }
    };
    var DevAppPathnameNormalizer = class extends _normalizers.Normalizers {
      constructor(pageNormalizer) {
        super([
          // This should normalize the filename to a page.
          pageNormalizer,
          // Normalize the app page to a pathname.
          new AppPathnameNormalizer()
        ]);
      }
      normalize(filename) {
        return super.normalize(filename);
      }
    };
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-kind.js
var require_route_kind = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-kind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "RouteKind", {
      enumerable: true,
      get: function() {
        return RouteKind;
      }
    });
    var RouteKind = /* @__PURE__ */ (function(RouteKind2) {
      RouteKind2["PAGES"] = "PAGES";
      RouteKind2["PAGES_API"] = "PAGES_API";
      RouteKind2["APP_PAGE"] = "APP_PAGE";
      RouteKind2["APP_ROUTE"] = "APP_ROUTE";
      RouteKind2["IMAGE"] = "IMAGE";
      return RouteKind2;
    })({});
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/hash.js/sha256/256.js
var require__ = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/hash.js/sha256/256.js"(exports, module) {
    (() => {
      var t = { 226: (t2, r2, e2) => {
        "use strict";
        var n = e2(302);
        var i = e2(551);
        function BlockHash() {
          this.pending = null;
          this.pendingTotal = 0;
          this.blockSize = this.constructor.blockSize;
          this.outSize = this.constructor.outSize;
          this.hmacStrength = this.constructor.hmacStrength;
          this.padLength = this.constructor.padLength / 8;
          this.endian = "big";
          this._delta8 = this.blockSize / 8;
          this._delta32 = this.blockSize / 32;
        }
        r2.BlockHash = BlockHash;
        BlockHash.prototype.update = function update(t3, r3) {
          t3 = n.toArray(t3, r3);
          if (!this.pending) this.pending = t3;
          else this.pending = this.pending.concat(t3);
          this.pendingTotal += t3.length;
          if (this.pending.length >= this._delta8) {
            t3 = this.pending;
            var e3 = t3.length % this._delta8;
            this.pending = t3.slice(t3.length - e3, t3.length);
            if (this.pending.length === 0) this.pending = null;
            t3 = n.join32(t3, 0, t3.length - e3, this.endian);
            for (var i2 = 0; i2 < t3.length; i2 += this._delta32) this._update(t3, i2, i2 + this._delta32);
          }
          return this;
        };
        BlockHash.prototype.digest = function digest(t3) {
          this.update(this._pad());
          i(this.pending === null);
          return this._digest(t3);
        };
        BlockHash.prototype._pad = function pad() {
          var t3 = this.pendingTotal;
          var r3 = this._delta8;
          var e3 = r3 - (t3 + this.padLength) % r3;
          var n2 = new Array(e3 + this.padLength);
          n2[0] = 128;
          for (var i2 = 1; i2 < e3; i2++) n2[i2] = 0;
          t3 <<= 3;
          if (this.endian === "big") {
            for (var s = 8; s < this.padLength; s++) n2[i2++] = 0;
            n2[i2++] = 0;
            n2[i2++] = 0;
            n2[i2++] = 0;
            n2[i2++] = 0;
            n2[i2++] = t3 >>> 24 & 255;
            n2[i2++] = t3 >>> 16 & 255;
            n2[i2++] = t3 >>> 8 & 255;
            n2[i2++] = t3 & 255;
          } else {
            n2[i2++] = t3 & 255;
            n2[i2++] = t3 >>> 8 & 255;
            n2[i2++] = t3 >>> 16 & 255;
            n2[i2++] = t3 >>> 24 & 255;
            n2[i2++] = 0;
            n2[i2++] = 0;
            n2[i2++] = 0;
            n2[i2++] = 0;
            for (s = 8; s < this.padLength; s++) n2[i2++] = 0;
          }
          return n2;
        };
      }, 563: (t2, r2, e2) => {
        "use strict";
        var n = e2(302);
        var i = e2(226);
        var s = e2(101);
        var o = e2(551);
        var h = n.sum32;
        var u = n.sum32_4;
        var a = n.sum32_5;
        var l = s.ch32;
        var f = s.maj32;
        var _ = s.s0_256;
        var c = s.s1_256;
        var v = s.g0_256;
        var p = s.g1_256;
        var g = i.BlockHash;
        var d = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
        function SHA256() {
          if (!(this instanceof SHA256)) return new SHA256();
          g.call(this);
          this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
          this.k = d;
          this.W = new Array(64);
        }
        n.inherits(SHA256, g);
        t2.exports = SHA256;
        SHA256.blockSize = 512;
        SHA256.outSize = 256;
        SHA256.hmacStrength = 192;
        SHA256.padLength = 64;
        SHA256.prototype._update = function _update(t3, r3) {
          var e3 = this.W;
          for (var n2 = 0; n2 < 16; n2++) e3[n2] = t3[r3 + n2];
          for (; n2 < e3.length; n2++) e3[n2] = u(p(e3[n2 - 2]), e3[n2 - 7], v(e3[n2 - 15]), e3[n2 - 16]);
          var i2 = this.h[0];
          var s2 = this.h[1];
          var g2 = this.h[2];
          var d2 = this.h[3];
          var m = this.h[4];
          var A = this.h[5];
          var y = this.h[6];
          var S = this.h[7];
          o(this.k.length === e3.length);
          for (n2 = 0; n2 < e3.length; n2++) {
            var H = a(S, c(m), l(m, A, y), this.k[n2], e3[n2]);
            var b = h(_(i2), f(i2, s2, g2));
            S = y;
            y = A;
            A = m;
            m = h(d2, H);
            d2 = g2;
            g2 = s2;
            s2 = i2;
            i2 = h(H, b);
          }
          this.h[0] = h(this.h[0], i2);
          this.h[1] = h(this.h[1], s2);
          this.h[2] = h(this.h[2], g2);
          this.h[3] = h(this.h[3], d2);
          this.h[4] = h(this.h[4], m);
          this.h[5] = h(this.h[5], A);
          this.h[6] = h(this.h[6], y);
          this.h[7] = h(this.h[7], S);
        };
        SHA256.prototype._digest = function digest(t3) {
          if (t3 === "hex") return n.toHex32(this.h, "big");
          else return n.split32(this.h, "big");
        };
      }, 101: (t2, r2, e2) => {
        "use strict";
        var n = e2(302);
        var i = n.rotr32;
        function ft_1(t3, r3, e3, n2) {
          if (t3 === 0) return ch32(r3, e3, n2);
          if (t3 === 1 || t3 === 3) return p32(r3, e3, n2);
          if (t3 === 2) return maj32(r3, e3, n2);
        }
        r2.ft_1 = ft_1;
        function ch32(t3, r3, e3) {
          return t3 & r3 ^ ~t3 & e3;
        }
        r2.ch32 = ch32;
        function maj32(t3, r3, e3) {
          return t3 & r3 ^ t3 & e3 ^ r3 & e3;
        }
        r2.maj32 = maj32;
        function p32(t3, r3, e3) {
          return t3 ^ r3 ^ e3;
        }
        r2.p32 = p32;
        function s0_256(t3) {
          return i(t3, 2) ^ i(t3, 13) ^ i(t3, 22);
        }
        r2.s0_256 = s0_256;
        function s1_256(t3) {
          return i(t3, 6) ^ i(t3, 11) ^ i(t3, 25);
        }
        r2.s1_256 = s1_256;
        function g0_256(t3) {
          return i(t3, 7) ^ i(t3, 18) ^ t3 >>> 3;
        }
        r2.g0_256 = g0_256;
        function g1_256(t3) {
          return i(t3, 17) ^ i(t3, 19) ^ t3 >>> 10;
        }
        r2.g1_256 = g1_256;
      }, 302: (t2, r2, e2) => {
        "use strict";
        var n = e2(551);
        var i = e2(638);
        r2.inherits = i;
        function isSurrogatePair(t3, r3) {
          if ((t3.charCodeAt(r3) & 64512) !== 55296) {
            return false;
          }
          if (r3 < 0 || r3 + 1 >= t3.length) {
            return false;
          }
          return (t3.charCodeAt(r3 + 1) & 64512) === 56320;
        }
        function toArray(t3, r3) {
          if (Array.isArray(t3)) return t3.slice();
          if (!t3) return [];
          var e3 = [];
          if (typeof t3 === "string") {
            if (!r3) {
              var n2 = 0;
              for (var i2 = 0; i2 < t3.length; i2++) {
                var s = t3.charCodeAt(i2);
                if (s < 128) {
                  e3[n2++] = s;
                } else if (s < 2048) {
                  e3[n2++] = s >> 6 | 192;
                  e3[n2++] = s & 63 | 128;
                } else if (isSurrogatePair(t3, i2)) {
                  s = 65536 + ((s & 1023) << 10) + (t3.charCodeAt(++i2) & 1023);
                  e3[n2++] = s >> 18 | 240;
                  e3[n2++] = s >> 12 & 63 | 128;
                  e3[n2++] = s >> 6 & 63 | 128;
                  e3[n2++] = s & 63 | 128;
                } else {
                  e3[n2++] = s >> 12 | 224;
                  e3[n2++] = s >> 6 & 63 | 128;
                  e3[n2++] = s & 63 | 128;
                }
              }
            } else if (r3 === "hex") {
              t3 = t3.replace(/[^a-z0-9]+/gi, "");
              if (t3.length % 2 !== 0) t3 = "0" + t3;
              for (i2 = 0; i2 < t3.length; i2 += 2) e3.push(parseInt(t3[i2] + t3[i2 + 1], 16));
            }
          } else {
            for (i2 = 0; i2 < t3.length; i2++) e3[i2] = t3[i2] | 0;
          }
          return e3;
        }
        r2.toArray = toArray;
        function toHex(t3) {
          var r3 = "";
          for (var e3 = 0; e3 < t3.length; e3++) r3 += zero2(t3[e3].toString(16));
          return r3;
        }
        r2.toHex = toHex;
        function htonl(t3) {
          var r3 = t3 >>> 24 | t3 >>> 8 & 65280 | t3 << 8 & 16711680 | (t3 & 255) << 24;
          return r3 >>> 0;
        }
        r2.htonl = htonl;
        function toHex32(t3, r3) {
          var e3 = "";
          for (var n2 = 0; n2 < t3.length; n2++) {
            var i2 = t3[n2];
            if (r3 === "little") i2 = htonl(i2);
            e3 += zero8(i2.toString(16));
          }
          return e3;
        }
        r2.toHex32 = toHex32;
        function zero2(t3) {
          if (t3.length === 1) return "0" + t3;
          else return t3;
        }
        r2.zero2 = zero2;
        function zero8(t3) {
          if (t3.length === 7) return "0" + t3;
          else if (t3.length === 6) return "00" + t3;
          else if (t3.length === 5) return "000" + t3;
          else if (t3.length === 4) return "0000" + t3;
          else if (t3.length === 3) return "00000" + t3;
          else if (t3.length === 2) return "000000" + t3;
          else if (t3.length === 1) return "0000000" + t3;
          else return t3;
        }
        r2.zero8 = zero8;
        function join32(t3, r3, e3, i2) {
          var s = e3 - r3;
          n(s % 4 === 0);
          var o = new Array(s / 4);
          for (var h = 0, u = r3; h < o.length; h++, u += 4) {
            var a;
            if (i2 === "big") a = t3[u] << 24 | t3[u + 1] << 16 | t3[u + 2] << 8 | t3[u + 3];
            else a = t3[u + 3] << 24 | t3[u + 2] << 16 | t3[u + 1] << 8 | t3[u];
            o[h] = a >>> 0;
          }
          return o;
        }
        r2.join32 = join32;
        function split32(t3, r3) {
          var e3 = new Array(t3.length * 4);
          for (var n2 = 0, i2 = 0; n2 < t3.length; n2++, i2 += 4) {
            var s = t3[n2];
            if (r3 === "big") {
              e3[i2] = s >>> 24;
              e3[i2 + 1] = s >>> 16 & 255;
              e3[i2 + 2] = s >>> 8 & 255;
              e3[i2 + 3] = s & 255;
            } else {
              e3[i2 + 3] = s >>> 24;
              e3[i2 + 2] = s >>> 16 & 255;
              e3[i2 + 1] = s >>> 8 & 255;
              e3[i2] = s & 255;
            }
          }
          return e3;
        }
        r2.split32 = split32;
        function rotr32(t3, r3) {
          return t3 >>> r3 | t3 << 32 - r3;
        }
        r2.rotr32 = rotr32;
        function rotl32(t3, r3) {
          return t3 << r3 | t3 >>> 32 - r3;
        }
        r2.rotl32 = rotl32;
        function sum32(t3, r3) {
          return t3 + r3 >>> 0;
        }
        r2.sum32 = sum32;
        function sum32_3(t3, r3, e3) {
          return t3 + r3 + e3 >>> 0;
        }
        r2.sum32_3 = sum32_3;
        function sum32_4(t3, r3, e3, n2) {
          return t3 + r3 + e3 + n2 >>> 0;
        }
        r2.sum32_4 = sum32_4;
        function sum32_5(t3, r3, e3, n2, i2) {
          return t3 + r3 + e3 + n2 + i2 >>> 0;
        }
        r2.sum32_5 = sum32_5;
        function sum64(t3, r3, e3, n2) {
          var i2 = t3[r3];
          var s = t3[r3 + 1];
          var o = n2 + s >>> 0;
          var h = (o < n2 ? 1 : 0) + e3 + i2;
          t3[r3] = h >>> 0;
          t3[r3 + 1] = o;
        }
        r2.sum64 = sum64;
        function sum64_hi(t3, r3, e3, n2) {
          var i2 = r3 + n2 >>> 0;
          var s = (i2 < r3 ? 1 : 0) + t3 + e3;
          return s >>> 0;
        }
        r2.sum64_hi = sum64_hi;
        function sum64_lo(t3, r3, e3, n2) {
          var i2 = r3 + n2;
          return i2 >>> 0;
        }
        r2.sum64_lo = sum64_lo;
        function sum64_4_hi(t3, r3, e3, n2, i2, s, o, h) {
          var u = 0;
          var a = r3;
          a = a + n2 >>> 0;
          u += a < r3 ? 1 : 0;
          a = a + s >>> 0;
          u += a < s ? 1 : 0;
          a = a + h >>> 0;
          u += a < h ? 1 : 0;
          var l = t3 + e3 + i2 + o + u;
          return l >>> 0;
        }
        r2.sum64_4_hi = sum64_4_hi;
        function sum64_4_lo(t3, r3, e3, n2, i2, s, o, h) {
          var u = r3 + n2 + s + h;
          return u >>> 0;
        }
        r2.sum64_4_lo = sum64_4_lo;
        function sum64_5_hi(t3, r3, e3, n2, i2, s, o, h, u, a) {
          var l = 0;
          var f = r3;
          f = f + n2 >>> 0;
          l += f < r3 ? 1 : 0;
          f = f + s >>> 0;
          l += f < s ? 1 : 0;
          f = f + h >>> 0;
          l += f < h ? 1 : 0;
          f = f + a >>> 0;
          l += f < a ? 1 : 0;
          var _ = t3 + e3 + i2 + o + u + l;
          return _ >>> 0;
        }
        r2.sum64_5_hi = sum64_5_hi;
        function sum64_5_lo(t3, r3, e3, n2, i2, s, o, h, u, a) {
          var l = r3 + n2 + s + h + a;
          return l >>> 0;
        }
        r2.sum64_5_lo = sum64_5_lo;
        function rotr64_hi(t3, r3, e3) {
          var n2 = r3 << 32 - e3 | t3 >>> e3;
          return n2 >>> 0;
        }
        r2.rotr64_hi = rotr64_hi;
        function rotr64_lo(t3, r3, e3) {
          var n2 = t3 << 32 - e3 | r3 >>> e3;
          return n2 >>> 0;
        }
        r2.rotr64_lo = rotr64_lo;
        function shr64_hi(t3, r3, e3) {
          return t3 >>> e3;
        }
        r2.shr64_hi = shr64_hi;
        function shr64_lo(t3, r3, e3) {
          var n2 = t3 << 32 - e3 | r3 >>> e3;
          return n2 >>> 0;
        }
        r2.shr64_lo = shr64_lo;
      }, 638: (t2) => {
        if (typeof Object.create === "function") {
          t2.exports = function inherits(t3, r2) {
            if (r2) {
              t3.super_ = r2;
              t3.prototype = Object.create(r2.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } });
            }
          };
        } else {
          t2.exports = function inherits(t3, r2) {
            if (r2) {
              t3.super_ = r2;
              var TempCtor = function() {
              };
              TempCtor.prototype = r2.prototype;
              t3.prototype = new TempCtor();
              t3.prototype.constructor = t3;
            }
          };
        }
      }, 551: (t2) => {
        t2.exports = assert;
        function assert(t3, r2) {
          if (!t3) throw new Error(r2 || "Assertion failed");
        }
        assert.equal = function assertEqual(t3, r2, e2) {
          if (t3 != r2) throw new Error(e2 || "Assertion failed: " + t3 + " != " + r2);
        };
      } };
      var r = {};
      function __nccwpck_require__2(e2) {
        var n = r[e2];
        if (n !== void 0) {
          return n.exports;
        }
        var i = r[e2] = { exports: {} };
        var s = true;
        try {
          t[e2](i, i.exports, __nccwpck_require__2);
          s = false;
        } finally {
          if (s) delete r[e2];
        }
        return i.exports;
      }
      if (typeof __nccwpck_require__2 !== "undefined") __nccwpck_require__2.ab = __dirname + "/";
      var e = __nccwpck_require__2(563);
      module.exports = e;
    })();
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/route-cache-key.js
var require_route_cache_key = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/route-cache-key.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      ROUTE_CACHE_DIRECTORY: function() {
        return ROUTE_CACHE_DIRECTORY2;
      },
      getResponseCacheOwner: function() {
        return getResponseCacheOwner;
      },
      getRouteCacheKey: function() {
        return getRouteCacheKey2;
      },
      isRouteCacheOwner: function() {
        return isRouteCacheOwner;
      }
    });
    var _normalizepagepath = require_normalize_page_path();
    var _normalizelocalepath = require_normalize_locale_path();
    var _invarianterror = require_invariant_error();
    var _apppathnamenormalizer = require_app_pathname_normalizer();
    var _routekind = require_route_kind();
    var ROUTE_CACHE_DIRECTORY2 = "route-cache";
    var appPathnameNormalizer = new _apppathnamenormalizer.AppPathnameNormalizer();
    function getResponseCacheOwner(definition) {
      return {
        kind: definition.kind,
        // Pages module names can include a trailing /index in Turbopack. Their
        // pathname matches the manifest's source in both bundlers. App modules
        // retain groups and parallel slots in their cache identity.
        sourceRoute: definition.kind === _routekind.RouteKind.PAGES ? definition.pathname : definition.page
      };
    }
    function isRouteCacheOwner(pathname, owner, prerender, locales) {
      if (!prerender) {
        return false;
      }
      const kind = prerender.dataRoute === null ? _routekind.RouteKind.APP_ROUTE : prerender.dataRoute.endsWith(".json") ? _routekind.RouteKind.PAGES : prerender.dataRoute.endsWith(".rsc") ? _routekind.RouteKind.APP_PAGE : void 0;
      if (kind !== owner.kind) {
        return false;
      }
      const source = "srcRoute" in prerender ? prerender.srcRoute : prerender.fallbackSourceRoute;
      const prerenderOwner = source ?? (kind === _routekind.RouteKind.PAGES ? (0, _normalizelocalepath.normalizeLocalePath)(pathname, locales).pathname : pathname);
      return prerenderOwner === (kind === _routekind.RouteKind.PAGES ? owner.sourceRoute : appPathnameNormalizer.normalize(owner.sourceRoute));
    }
    function getRouteCacheKey2(pathname, owner) {
      if (!owner) {
        throw new _invarianterror.InvariantError("Response cache requires a source route");
      }
      const { sourceRoute } = owner;
      let source;
      if (true) {
        const sha256 = require__();
        source = sha256().update(new TextEncoder().encode(sourceRoute)).digest("hex");
      } else {
        const { createHash: createHash4 } = null;
        source = createHash4("sha256").update(sourceRoute).digest("hex");
      }
      return `/${ROUTE_CACHE_DIRECTORY2}/${owner.kind}/${source}/$${(0, _normalizepagepath.normalizePagePath)(pathname)}`;
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/incremental-cache/shared-cache-controls.external.js
var require_shared_cache_controls_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/incremental-cache/shared-cache-controls.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "SharedCacheControls", {
      enumerable: true,
      get: function() {
        return SharedCacheControls;
      }
    });
    var _routecachekey = require_route_cache_key();
    var _normalizelocalepath = require_normalize_locale_path();
    var _routekind = require_route_kind();
    var SharedCacheControls = class _SharedCacheControls {
      static #_ = (
        /**
        * The in-memory cache of cache lives for routes. This cache is populated when
        * the cache is updated with new cache lives.
        */
        this.cacheControls = /* @__PURE__ */ new Map()
      );
      constructor(prerenderManifest, locales) {
        this.prerenderManifest = prerenderManifest;
        this.locales = locales;
      }
      /**
      * Try to get the cache control value for a route. This will first try to get
      * the value from the in-memory cache. If the value is not present in the
      * in-memory cache, it will be sourced from the prerender manifest.
      *
      * @param route the route to get the cache control for
      * @param owner the source route that owns the response
      * @returns the cache control for the route, or undefined if the values
      *          are not present in the in-memory cache or the prerender manifest
      */
      get(route, owner) {
        let cacheControl = _SharedCacheControls.cacheControls.get((0, _routecachekey.getRouteCacheKey)(route, owner));
        if (cacheControl) return cacheControl;
        let prerenderData = this.prerenderManifest.routes[route];
        if (prerenderData && (0, _routecachekey.isRouteCacheOwner)(route, owner, prerenderData, this.locales)) {
          const { initialRevalidateSeconds, initialExpireSeconds } = prerenderData;
          if (typeof initialRevalidateSeconds !== "undefined") {
            return {
              revalidate: initialRevalidateSeconds,
              expire: initialExpireSeconds
            };
          }
        }
        const dynamicPathname = owner.kind === _routekind.RouteKind.PAGES ? (0, _normalizelocalepath.normalizeLocalePath)(route, this.locales).pathname : route;
        const dynamicPrerenderData = this.prerenderManifest.dynamicRoutes[dynamicPathname];
        if (dynamicPrerenderData && (0, _routecachekey.isRouteCacheOwner)(route, owner, dynamicPrerenderData, this.locales)) {
          const { fallbackRevalidate, fallbackExpire } = dynamicPrerenderData;
          if (typeof fallbackRevalidate !== "undefined") {
            return {
              revalidate: fallbackRevalidate,
              expire: fallbackExpire
            };
          }
        }
        return void 0;
      }
      /**
      * Set the cache control for a route.
      *
      * @param route the route to set the cache control for
      * @param cacheControl the cache control for the route
      */
      set(route, cacheControl) {
        _SharedCacheControls.cacheControls.set(route, cacheControl);
      }
      /**
      * Clear the in-memory cache of cache controls for routes.
      */
      clear() {
        _SharedCacheControls.cacheControls.clear();
      }
    };
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/incremental-cache/tags-manifest.external.js
var require_tags_manifest_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/incremental-cache/tags-manifest.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      areTagsExpired: function() {
        return areTagsExpired;
      },
      areTagsStale: function() {
        return areTagsStale;
      },
      tagsManifest: function() {
        return tagsManifest;
      }
    });
    var tagsManifest = /* @__PURE__ */ new Map();
    var areTagsExpired = (tags, timestamp) => {
      for (const tag of tags) {
        const entry = tagsManifest.get(tag);
        const expiredAt = entry == null ? void 0 : entry.expired;
        if (typeof expiredAt === "number") {
          const now = performance.timeOrigin + performance.now();
          const isImmediatelyExpired = expiredAt <= now && expiredAt > timestamp;
          if (isImmediatelyExpired) {
            return true;
          }
        }
      }
      return false;
    };
    var areTagsStale = (tags, timestamp) => {
      for (const tag of tags) {
        const entry = tagsManifest.get(tag);
        const staleAt = (entry == null ? void 0 : entry.stale) ?? 0;
        if (typeof staleAt === "number" && staleAt > timestamp) {
          return true;
        }
      }
      return false;
    };
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/is-plain-object.js
var require_is_plain_object = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/is-plain-object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      getObjectClassLabel: function() {
        return getObjectClassLabel;
      },
      isPlainObject: function() {
        return isPlainObject;
      }
    });
    function getObjectClassLabel(value) {
      return Object.prototype.toString.call(value);
    }
    function isPlainObject(value) {
      if (getObjectClassLabel(value) !== "[object Object]") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype.hasOwnProperty("isPrototypeOf");
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/lib/is-error.js
var require_is_error = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/lib/is-error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      /**
      * Checks whether the given value is a NextError.
      * This can be used to print a more detailed error message with properties like `code` & `digest`.
      */
      default: function() {
        return isError;
      },
      getProperError: function() {
        return getProperError;
      }
    });
    var _isplainobject = require_is_plain_object();
    function safeStringifyLite(obj) {
      const seen = /* @__PURE__ */ new WeakSet();
      return JSON.stringify(obj, (_key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      });
    }
    function isError(err) {
      return typeof err === "object" && err !== null && "name" in err && "message" in err;
    }
    function getProperError(err) {
      if (isError(err)) {
        return err;
      }
      if (false) {
        if (typeof err === "undefined") {
          return new Error("An undefined error was thrown, see here for more info: https://nextjs.org/docs/messages/threw-undefined");
        }
        if (err === null) {
          return new Error("A null error was thrown, see here for more info: https://nextjs.org/docs/messages/threw-undefined");
        }
      }
      return new Error((0, _isplainobject.isPlainObject)(err) ? safeStringifyLite(err) : err + "");
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/lib/constants.js
var require_constants = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/lib/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      ACTION_SUFFIX: function() {
        return ACTION_SUFFIX;
      },
      APP_DIR_ALIAS: function() {
        return APP_DIR_ALIAS;
      },
      CACHE_ONE_YEAR_SECONDS: function() {
        return CACHE_ONE_YEAR_SECONDS;
      },
      DOT_NEXT_ALIAS: function() {
        return DOT_NEXT_ALIAS;
      },
      ESLINT_DEFAULT_DIRS: function() {
        return ESLINT_DEFAULT_DIRS;
      },
      GSP_NO_RETURNED_VALUE: function() {
        return GSP_NO_RETURNED_VALUE;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function() {
        return GSSP_COMPONENT_MEMBER_ERROR;
      },
      GSSP_NO_RETURNED_VALUE: function() {
        return GSSP_NO_RETURNED_VALUE;
      },
      HTML_CONTENT_TYPE_HEADER: function() {
        return HTML_CONTENT_TYPE_HEADER;
      },
      INFINITE_CACHE: function() {
        return INFINITE_CACHE;
      },
      INSTRUMENTATION_HOOK_FILENAME: function() {
        return INSTRUMENTATION_HOOK_FILENAME;
      },
      JSON_CONTENT_TYPE_HEADER: function() {
        return JSON_CONTENT_TYPE_HEADER;
      },
      MATCHED_PATH_HEADER: function() {
        return MATCHED_PATH_HEADER;
      },
      MIDDLEWARE_FILENAME: function() {
        return MIDDLEWARE_FILENAME;
      },
      MIDDLEWARE_LOCATION_REGEXP: function() {
        return MIDDLEWARE_LOCATION_REGEXP;
      },
      NEXT_BODY_SUFFIX: function() {
        return NEXT_BODY_SUFFIX;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return NEXT_CACHE_IMPLICIT_TAG_ID;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
      },
      NEXT_CACHE_ROOT_PARAM_TAG_ID: function() {
        return NEXT_CACHE_ROOT_PARAM_TAG_ID;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
      },
      NEXT_CACHE_TAGS_HEADER: function() {
        return NEXT_CACHE_TAGS_HEADER;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return NEXT_CACHE_TAG_MAX_ITEMS;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return NEXT_CACHE_TAG_MAX_LENGTH;
      },
      NEXT_DATA_SUFFIX: function() {
        return NEXT_DATA_SUFFIX;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return NEXT_INTERCEPTION_MARKER_PREFIX;
      },
      NEXT_META_SUFFIX: function() {
        return NEXT_META_SUFFIX;
      },
      NEXT_NAV_DEPLOYMENT_ID_HEADER: function() {
        return NEXT_NAV_DEPLOYMENT_ID_HEADER;
      },
      NEXT_QUERY_PARAM_PREFIX: function() {
        return NEXT_QUERY_PARAM_PREFIX;
      },
      NEXT_RESUME_HEADER: function() {
        return NEXT_RESUME_HEADER;
      },
      NEXT_RESUME_STATE_LENGTH_HEADER: function() {
        return NEXT_RESUME_STATE_LENGTH_HEADER;
      },
      NON_STANDARD_NODE_ENV: function() {
        return NON_STANDARD_NODE_ENV;
      },
      PAGES_DIR_ALIAS: function() {
        return PAGES_DIR_ALIAS;
      },
      PRERENDER_REVALIDATE_HEADER: function() {
        return PRERENDER_REVALIDATE_HEADER2;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
      },
      PROXY_FILENAME: function() {
        return PROXY_FILENAME;
      },
      PROXY_LOCATION_REGEXP: function() {
        return PROXY_LOCATION_REGEXP;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
      },
      ROOT_DIR_ALIAS: function() {
        return ROOT_DIR_ALIAS;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return RSC_ACTION_ENCRYPTION_ALIAS;
      },
      RSC_ACTION_PROXY_ALIAS: function() {
        return RSC_ACTION_PROXY_ALIAS;
      },
      RSC_ACTION_VALIDATE_ALIAS: function() {
        return RSC_ACTION_VALIDATE_ALIAS;
      },
      RSC_CACHE_WRAPPER_ALIAS: function() {
        return RSC_CACHE_WRAPPER_ALIAS;
      },
      RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function() {
        return RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS;
      },
      RSC_MOD_REF_PROXY_ALIAS: function() {
        return RSC_MOD_REF_PROXY_ALIAS;
      },
      RSC_SEGMENTS_DIR_SUFFIX: function() {
        return RSC_SEGMENTS_DIR_SUFFIX;
      },
      RSC_SEGMENT_SUFFIX: function() {
        return RSC_SEGMENT_SUFFIX;
      },
      RSC_SUFFIX: function() {
        return RSC_SUFFIX;
      },
      SERVER_PROPS_EXPORT_ERROR: function() {
        return SERVER_PROPS_EXPORT_ERROR;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
      },
      SERVER_PROPS_SSG_CONFLICT: function() {
        return SERVER_PROPS_SSG_CONFLICT;
      },
      SERVER_RUNTIME: function() {
        return SERVER_RUNTIME;
      },
      SSG_FALLBACK_EXPORT_ERROR: function() {
        return SSG_FALLBACK_EXPORT_ERROR;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return SSG_GET_INITIAL_PROPS_CONFLICT;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
      },
      TEXT_PLAIN_CONTENT_TYPE_HEADER: function() {
        return TEXT_PLAIN_CONTENT_TYPE_HEADER;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return UNSTABLE_REVALIDATE_RENAME_ERROR;
      },
      WEBPACK_LAYERS: function() {
        return WEBPACK_LAYERS;
      },
      WEBPACK_RESOURCE_QUERIES: function() {
        return WEBPACK_RESOURCE_QUERIES;
      },
      WEB_SOCKET_MAX_RECONNECTIONS: function() {
        return WEB_SOCKET_MAX_RECONNECTIONS;
      }
    });
    var TEXT_PLAIN_CONTENT_TYPE_HEADER = "text/plain";
    var HTML_CONTENT_TYPE_HEADER = "text/html; charset=utf-8";
    var JSON_CONTENT_TYPE_HEADER = "application/json; charset=utf-8";
    var NEXT_QUERY_PARAM_PREFIX = "nxtP";
    var NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
    var MATCHED_PATH_HEADER = "x-matched-path";
    var PRERENDER_REVALIDATE_HEADER2 = "x-prerender-revalidate";
    var PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
    var RSC_SEGMENTS_DIR_SUFFIX = ".segments";
    var RSC_SEGMENT_SUFFIX = ".segment.rsc";
    var RSC_SUFFIX = ".rsc";
    var ACTION_SUFFIX = ".action";
    var NEXT_DATA_SUFFIX = ".json";
    var NEXT_META_SUFFIX = ".meta";
    var NEXT_BODY_SUFFIX = ".body";
    var NEXT_NAV_DEPLOYMENT_ID_HEADER = "x-nextjs-deployment-id";
    var NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
    var NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
    var NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
    var NEXT_RESUME_HEADER = "next-resume";
    var NEXT_RESUME_STATE_LENGTH_HEADER = "x-next-resume-state-length";
    var NEXT_CACHE_TAG_MAX_ITEMS = 128;
    var NEXT_CACHE_TAG_MAX_LENGTH = 256;
    var NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
    var NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
    var NEXT_CACHE_ROOT_PARAM_TAG_ID = "_N_RP_";
    var CACHE_ONE_YEAR_SECONDS = 31536e3;
    var INFINITE_CACHE = 4294967294;
    var MIDDLEWARE_FILENAME = "middleware";
    var MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
    var PROXY_FILENAME = "proxy";
    var PROXY_LOCATION_REGEXP = `(?:src/)?${PROXY_FILENAME}`;
    var INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
    var PAGES_DIR_ALIAS = "private-next-pages";
    var DOT_NEXT_ALIAS = "private-dot-next";
    var ROOT_DIR_ALIAS = "private-next-root-dir";
    var APP_DIR_ALIAS = "private-next-app-dir";
    var RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
    var RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
    var RSC_ACTION_PROXY_ALIAS = "private-next-rsc-server-reference";
    var RSC_CACHE_WRAPPER_ALIAS = "private-next-rsc-cache-wrapper";
    var RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = "private-next-rsc-track-dynamic-import";
    var RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
    var RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
    var PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
    var SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
    var SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
    var SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
    var STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
    var SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
    var GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
    var GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
    var UNSTABLE_REVALIDATE_RENAME_ERROR = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.";
    var GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
    var NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
    var SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
    var ESLINT_DEFAULT_DIRS = [
      "app",
      "pages",
      "components",
      "lib",
      "src"
    ];
    var SERVER_RUNTIME = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs"
    };
    var WEB_SOCKET_MAX_RECONNECTIONS = 12;
    var WEBPACK_LAYERS_NAMES = {
      /**
      * The layer for the shared code between the client and server bundles.
      */
      shared: "shared",
      /**
      * The layer for server-only runtime and picking up `react-server` export conditions.
      * Including app router RSC pages and app router custom routes and metadata routes.
      */
      reactServerComponents: "rsc",
      /**
      * Server Side Rendering layer for app (ssr).
      */
      serverSideRendering: "ssr",
      /**
      * The browser client bundle layer for actions.
      */
      actionBrowser: "action-browser",
      /**
      * The Node.js bundle layer for the API routes.
      */
      apiNode: "api-node",
      /**
      * The Edge Lite bundle layer for the API routes.
      */
      apiEdge: "api-edge",
      /**
      * The layer for the middleware code.
      */
      middleware: "middleware",
      /**
      * The layer for the instrumentation hooks.
      */
      instrument: "instrument",
      /**
      * The layer for assets on the edge.
      */
      edgeAsset: "edge-asset",
      /**
      * The browser client bundle layer for App directory.
      */
      appPagesBrowser: "app-pages-browser",
      /**
      * The browser client bundle layer for Pages directory.
      */
      pagesDirBrowser: "pages-dir-browser",
      /**
      * The Edge Lite bundle layer for Pages directory.
      */
      pagesDirEdge: "pages-dir-edge",
      /**
      * The Node.js bundle layer for Pages directory.
      */
      pagesDirNode: "pages-dir-node"
    };
    var WEBPACK_LAYERS = {
      ...WEBPACK_LAYERS_NAMES,
      GROUP: {
        builtinReact: [
          WEBPACK_LAYERS_NAMES.reactServerComponents,
          WEBPACK_LAYERS_NAMES.actionBrowser
        ],
        serverOnly: [
          WEBPACK_LAYERS_NAMES.reactServerComponents,
          WEBPACK_LAYERS_NAMES.actionBrowser,
          WEBPACK_LAYERS_NAMES.instrument,
          WEBPACK_LAYERS_NAMES.middleware
        ],
        neutralTarget: [
          // pages api
          WEBPACK_LAYERS_NAMES.apiNode,
          WEBPACK_LAYERS_NAMES.apiEdge
        ],
        clientOnly: [
          WEBPACK_LAYERS_NAMES.serverSideRendering,
          WEBPACK_LAYERS_NAMES.appPagesBrowser
        ],
        bundled: [
          WEBPACK_LAYERS_NAMES.reactServerComponents,
          WEBPACK_LAYERS_NAMES.actionBrowser,
          WEBPACK_LAYERS_NAMES.serverSideRendering,
          WEBPACK_LAYERS_NAMES.appPagesBrowser,
          WEBPACK_LAYERS_NAMES.shared,
          WEBPACK_LAYERS_NAMES.instrument,
          WEBPACK_LAYERS_NAMES.middleware
        ],
        appPages: [
          // app router pages and layouts
          WEBPACK_LAYERS_NAMES.reactServerComponents,
          WEBPACK_LAYERS_NAMES.serverSideRendering,
          WEBPACK_LAYERS_NAMES.appPagesBrowser,
          WEBPACK_LAYERS_NAMES.actionBrowser
        ]
      }
    };
    var WEBPACK_RESOURCE_QUERIES = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__"
    };
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/lib/interop-default.js
var require_interop_default = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/lib/interop-default.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "interopDefault", {
      enumerable: true,
      get: function() {
        return interopDefault;
      }
    });
    function interopDefault(mod7) {
      return mod7.default || mod7;
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/async-local-storage.js
var require_async_local_storage = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/async-local-storage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      bindSnapshot: function() {
        return bindSnapshot;
      },
      createAsyncLocalStorage: function() {
        return createAsyncLocalStorage;
      },
      createSnapshot: function() {
        return createSnapshot;
      },
      getOrCreateGlobalAsyncLocalStorage: function() {
        return getOrCreateGlobalAsyncLocalStorage;
      }
    });
    var sharedAsyncLocalStorageNotAvailableError = new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
    var FakeAsyncLocalStorage = class {
      disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
      }
      getStore() {
        return void 0;
      }
      run() {
        throw sharedAsyncLocalStorageNotAvailableError;
      }
      exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
      }
      enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
      }
      static bind(fn) {
        return fn;
      }
    };
    var maybeGlobalAsyncLocalStorage = typeof globalThis !== "undefined" && globalThis.AsyncLocalStorage;
    function createAsyncLocalStorage() {
      if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
      }
      return new FakeAsyncLocalStorage();
    }
    function getOrCreateGlobalAsyncLocalStorage(name) {
      const key = /* @__PURE__ */ Symbol.for(`@next/${name}@${"16.4.5"}`);
      const globalStore = globalThis;
      return globalStore[key] ??= createAsyncLocalStorage();
    }
    function bindSnapshot(fn) {
      if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.bind(fn);
      }
      return FakeAsyncLocalStorage.bind(fn);
    }
    function createSnapshot() {
      if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.snapshot();
      }
      return function(fn, ...args) {
        return fn(...args);
      };
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js
var require_work_unit_async_storage_instance = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "workUnitAsyncStorageInstance", {
      enumerable: true,
      get: function() {
        return workUnitAsyncStorageInstance;
      }
    });
    var _asynclocalstorage = require_async_local_storage();
    var workUnitAsyncStorageInstance = (0, _asynclocalstorage.getOrCreateGlobalAsyncLocalStorage)("work-unit-async-storage");
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js
var require_work_unit_async_storage_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      getCacheSignal: function() {
        return getCacheSignal;
      },
      getDraftModeProviderForCacheScope: function() {
        return getDraftModeProviderForCacheScope;
      },
      getHmrRefreshHash: function() {
        return getHmrRefreshHash;
      },
      getResumeDataCache: function() {
        return getResumeDataCache;
      },
      getServerComponentsHmrCache: function() {
        return getServerComponentsHmrCache;
      },
      getStagedRenderingController: function() {
        return getStagedRenderingController;
      },
      getVaryParamsAccumulator: function() {
        return getVaryParamsAccumulator;
      },
      isHmrRefresh: function() {
        return isHmrRefresh;
      },
      throwForMissingRequestStore: function() {
        return throwForMissingRequestStore;
      },
      throwInvariantForMissingStore: function() {
        return throwInvariantForMissingStore;
      },
      willConsumerServerCache: function() {
        return willConsumerServerCache;
      },
      workUnitAsyncStorage: function() {
        return _workunitasyncstorageinstance.workUnitAsyncStorageInstance;
      }
    });
    var _workunitasyncstorageinstance = require_work_unit_async_storage_instance();
    var _invarianterror = require_invariant_error();
    function willConsumerServerCache(workUnitStore) {
      if (!workUnitStore) {
        return false;
      }
      switch (workUnitStore.type) {
        case "cache":
        case "private-cache":
        case "unstable-cache":
          return workUnitStore.consumerWillServerCache;
        case "prerender":
        case "prerender-client":
        case "prerender-legacy":
          return true;
        case "request":
        case "prerender-runtime":
        case "validation-client":
        case "build-time-generator":
          return false;
        default:
          return workUnitStore;
      }
    }
    function throwForMissingRequestStore(callingExpression) {
      throw new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`);
    }
    function throwInvariantForMissingStore() {
      throw new _invarianterror.InvariantError("Expected workUnitAsyncStorage to have a store.");
    }
    function getResumeDataCache(workUnitStore) {
      switch (workUnitStore.type) {
        case "request":
        case "prerender":
        case "prerender-runtime":
        case "prerender-client":
        case "validation-client":
          return workUnitStore.resumeDataCache;
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "prerender-legacy":
        case "build-time-generator":
          return null;
        default:
          return workUnitStore;
      }
    }
    function getHmrRefreshHash(workUnitStore) {
      if (process.env.__NEXT_DEV_SERVER) {
        switch (workUnitStore.type) {
          case "cache":
          case "private-cache":
          case "prerender":
          case "prerender-runtime":
          case "request":
            return workUnitStore.hmrRefreshHash;
          case "prerender-client":
          case "validation-client":
          case "prerender-legacy":
          case "unstable-cache":
          case "build-time-generator":
            break;
          default:
            workUnitStore;
        }
      }
      return void 0;
    }
    function isHmrRefresh(workUnitStore) {
      if (process.env.__NEXT_DEV_SERVER) {
        switch (workUnitStore.type) {
          case "cache":
          case "private-cache":
          case "request":
            return workUnitStore.isHmrRefresh ?? false;
          case "prerender":
          case "prerender-client":
          case "validation-client":
          case "prerender-runtime":
          case "prerender-legacy":
          case "unstable-cache":
          case "build-time-generator":
            break;
          default:
            workUnitStore;
        }
      }
      return false;
    }
    function getServerComponentsHmrCache(workUnitStore) {
      if (process.env.__NEXT_DEV_SERVER) {
        switch (workUnitStore.type) {
          case "cache":
          case "private-cache":
          case "request":
            return workUnitStore.serverComponentsHmrCache;
          case "prerender":
          case "prerender-client":
          case "validation-client":
          case "prerender-runtime":
          case "prerender-legacy":
          case "unstable-cache":
          case "build-time-generator":
            break;
          default:
            workUnitStore;
        }
      }
      return void 0;
    }
    function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
      if (workStore.isDraftMode) {
        switch (workUnitStore.type) {
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-runtime":
          case "request":
            return workUnitStore.draftMode;
          case "prerender":
          case "prerender-client":
          case "validation-client":
          case "prerender-legacy":
          case "build-time-generator":
            break;
          default:
            workUnitStore;
        }
      }
      return void 0;
    }
    function getStagedRenderingController(workUnitStore) {
      switch (workUnitStore.type) {
        case "request":
        case "prerender-runtime":
        case "prerender":
          return workUnitStore.stagedRendering ?? null;
        case "prerender-client":
        case "validation-client":
        case "prerender-legacy":
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "build-time-generator":
          return null;
        default:
          return workUnitStore;
      }
    }
    function getCacheSignal(workUnitStore) {
      switch (workUnitStore.type) {
        case "prerender":
        case "prerender-client":
        case "validation-client":
        case "prerender-runtime":
          return workUnitStore.cacheSignal;
        case "request": {
          if (workUnitStore.cacheSignal) {
            return workUnitStore.cacheSignal;
          }
        }
        case "prerender-legacy":
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "build-time-generator":
          return null;
        default:
          return workUnitStore;
      }
    }
    function getVaryParamsAccumulator(workUnitStore) {
      switch (workUnitStore.type) {
        case "prerender":
        case "prerender-runtime":
        case "request": {
          return workUnitStore.varyParamsAccumulator ?? null;
        }
        case "prerender-legacy":
        case "cache":
        case "private-cache":
        case "prerender-client":
        case "validation-client":
        case "unstable-cache":
        case "build-time-generator":
          return null;
        default:
          workUnitStore;
          return null;
      }
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/server-reference-info.js
var require_server_reference_info = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/server-reference-info.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      SERVER_REFERENCE_ID_LENGTH: function() {
        return SERVER_REFERENCE_ID_LENGTH;
      },
      extractInfoFromServerReferenceId: function() {
        return extractInfoFromServerReferenceId;
      },
      mightBeServerReferenceId: function() {
        return mightBeServerReferenceId;
      },
      omitUnusedArgs: function() {
        return omitUnusedArgs;
      }
    });
    var SERVER_REFERENCE_ID_LENGTH = 42;
    function mightBeServerReferenceId(id) {
      return id.length === SERVER_REFERENCE_ID_LENGTH;
    }
    function extractInfoFromServerReferenceId(id) {
      const infoByte = parseInt(id.slice(0, 2), 16);
      const typeBit = infoByte >> 7 & 1;
      const argMask = infoByte >> 1 & 63;
      const restArgs = infoByte & 1;
      const usedArgs = Array(6);
      for (let index = 0; index < 6; index++) {
        const bitPosition = 5 - index;
        const bit = argMask >> bitPosition & 1;
        usedArgs[index] = bit === 1;
      }
      return {
        type: typeBit === 1 ? "use-cache" : "server-action",
        usedArgs,
        hasRestArgs: restArgs === 1
      };
    }
    function omitUnusedArgs(args, info) {
      const filteredArgs = new Array(args.length);
      let length = 0;
      for (let index = 0; index < args.length; index++) {
        if (index < 6 && info.usedArgs[index] || // This assumes that the server reference info byte has the restArgs bit
        // set to 1 if there are more than 6 args.
        index >= 6 && info.hasRestArgs) {
          filteredArgs[index] = args[index];
          length = index + 1;
        }
      }
      filteredArgs.length = length;
      return filteredArgs;
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/lib/client-and-server-references.js
var require_client_and_server_references = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/lib/client-and-server-references.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      getUseCacheFunctionInfo: function() {
        return getUseCacheFunctionInfo;
      },
      isClientReference: function() {
        return isClientReference;
      },
      isServerReference: function() {
        return isServerReference;
      },
      isUseCacheFunction: function() {
        return isUseCacheFunction;
      }
    });
    var _serverreferenceinfo = require_server_reference_info();
    function isServerReference(value) {
      return value.$$typeof === /* @__PURE__ */ Symbol.for("react.server.reference");
    }
    function isUseCacheFunction(value) {
      if (!isServerReference(value)) {
        return false;
      }
      const { type } = (0, _serverreferenceinfo.extractInfoFromServerReferenceId)(value.$$id);
      return type === "use-cache";
    }
    function getUseCacheFunctionInfo(value) {
      if (!isServerReference(value)) {
        return null;
      }
      const info = (0, _serverreferenceinfo.extractInfoFromServerReferenceId)(value.$$id);
      return info.type === "use-cache" ? info : null;
    }
    function isClientReference(mod7) {
      const defaultExport = (mod7 == null ? void 0 : mod7.default) || mod7;
      return (defaultExport == null ? void 0 : defaultExport.$$typeof) === /* @__PURE__ */ Symbol.for("react.client.reference");
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/@opentelemetry/api/index.js
var require_api = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/@opentelemetry/api/index.js"(exports, module) {
    (() => {
      "use strict";
      var e = { 912: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.ContextAPI = void 0;
        const n = r2(108);
        const a = r2(221);
        const o = r2(44);
        const i = "context";
        const c = new n.NoopContextManager();
        class ContextAPI {
          constructor() {
          }
          static getInstance() {
            if (!this._instance) {
              this._instance = new ContextAPI();
            }
            return this._instance;
          }
          setGlobalContextManager(e3) {
            return (0, a.registerGlobal)(i, e3, o.DiagAPI.instance());
          }
          active() {
            return this._getContextManager().active();
          }
          with(e3, t3, r3, ...n2) {
            return this._getContextManager().with(e3, t3, r3, ...n2);
          }
          bind(e3, t3) {
            return this._getContextManager().bind(e3, t3);
          }
          _getContextManager() {
            return (0, a.getGlobal)(i) || c;
          }
          disable() {
            this._getContextManager().disable();
            (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
          }
        }
        t2.ContextAPI = ContextAPI;
      }, 44: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.DiagAPI = void 0;
        const n = r2(757);
        const a = r2(412);
        const o = r2(711);
        const i = r2(221);
        const c = "diag";
        class DiagAPI {
          constructor() {
            function _logProxy(e4) {
              return function(...t3) {
                const r3 = (0, i.getGlobal)("diag");
                if (!r3) return;
                return r3[e4](...t3);
              };
            }
            const e3 = this;
            const setLogger = (t3, r3 = { logLevel: o.DiagLogLevel.INFO }) => {
              var n2, c2, s;
              if (t3 === e3) {
                const t4 = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                e3.error((n2 = t4.stack) !== null && n2 !== void 0 ? n2 : t4.message);
                return false;
              }
              if (typeof r3 === "number") {
                r3 = { logLevel: r3 };
              }
              const u = (0, i.getGlobal)("diag");
              const l = (0, a.createLogLevelDiagLogger)((c2 = r3.logLevel) !== null && c2 !== void 0 ? c2 : o.DiagLogLevel.INFO, t3);
              if (u && !r3.suppressOverrideMessage) {
                const e4 = (s = new Error().stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                u.warn(`Current logger will be overwritten from ${e4}`);
                l.warn(`Current logger will overwrite one already registered from ${e4}`);
              }
              return (0, i.registerGlobal)("diag", l, e3, true);
            };
            e3.setLogger = setLogger;
            e3.disable = () => {
              (0, i.unregisterGlobal)(c, e3);
            };
            e3.createComponentLogger = (e4) => new n.DiagComponentLogger(e4);
            e3.verbose = _logProxy("verbose");
            e3.debug = _logProxy("debug");
            e3.info = _logProxy("info");
            e3.warn = _logProxy("warn");
            e3.error = _logProxy("error");
          }
          static instance() {
            if (!this._instance) {
              this._instance = new DiagAPI();
            }
            return this._instance;
          }
        }
        t2.DiagAPI = DiagAPI;
      }, 262: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.MetricsAPI = void 0;
        const n = r2(586);
        const a = r2(221);
        const o = r2(44);
        const i = "metrics";
        class MetricsAPI {
          constructor() {
          }
          static getInstance() {
            if (!this._instance) {
              this._instance = new MetricsAPI();
            }
            return this._instance;
          }
          setGlobalMeterProvider(e3) {
            return (0, a.registerGlobal)(i, e3, o.DiagAPI.instance());
          }
          getMeterProvider() {
            return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
          }
          getMeter(e3, t3, r3) {
            return this.getMeterProvider().getMeter(e3, t3, r3);
          }
          disable() {
            (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
          }
        }
        t2.MetricsAPI = MetricsAPI;
      }, 25: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.PropagationAPI = void 0;
        const n = r2(221);
        const a = r2(19);
        const o = r2(92);
        const i = r2(398);
        const c = r2(504);
        const s = r2(44);
        const u = "propagation";
        const l = new a.NoopTextMapPropagator();
        class PropagationAPI {
          constructor() {
            this.createBaggage = c.createBaggage;
            this.getBaggage = i.getBaggage;
            this.getActiveBaggage = i.getActiveBaggage;
            this.setBaggage = i.setBaggage;
            this.deleteBaggage = i.deleteBaggage;
          }
          static getInstance() {
            if (!this._instance) {
              this._instance = new PropagationAPI();
            }
            return this._instance;
          }
          setGlobalPropagator(e3) {
            return (0, n.registerGlobal)(u, e3, s.DiagAPI.instance());
          }
          inject(e3, t3, r3 = o.defaultTextMapSetter) {
            return this._getGlobalPropagator().inject(e3, t3, r3);
          }
          extract(e3, t3, r3 = o.defaultTextMapGetter) {
            return this._getGlobalPropagator().extract(e3, t3, r3);
          }
          fields() {
            return this._getGlobalPropagator().fields();
          }
          disable() {
            (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
          }
          _getGlobalPropagator() {
            return (0, n.getGlobal)(u) || l;
          }
        }
        t2.PropagationAPI = PropagationAPI;
      }, 397: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.TraceAPI = void 0;
        const n = r2(221);
        const a = r2(498);
        const o = r2(477);
        const i = r2(793);
        const c = r2(44);
        const s = "trace";
        class TraceAPI {
          constructor() {
            this._proxyTracerProvider = new a.ProxyTracerProvider();
            this.wrapSpanContext = o.wrapSpanContext;
            this.isSpanContextValid = o.isSpanContextValid;
            this.deleteSpan = i.deleteSpan;
            this.getSpan = i.getSpan;
            this.getActiveSpan = i.getActiveSpan;
            this.getSpanContext = i.getSpanContext;
            this.setSpan = i.setSpan;
            this.setSpanContext = i.setSpanContext;
          }
          static getInstance() {
            if (!this._instance) {
              this._instance = new TraceAPI();
            }
            return this._instance;
          }
          setGlobalTracerProvider(e3) {
            const t3 = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
            if (t3) {
              this._proxyTracerProvider.setDelegate(e3);
            }
            return t3;
          }
          getTracerProvider() {
            return (0, n.getGlobal)(s) || this._proxyTracerProvider;
          }
          getTracer(e3, t3) {
            return this.getTracerProvider().getTracer(e3, t3);
          }
          disable() {
            (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
            this._proxyTracerProvider = new a.ProxyTracerProvider();
          }
        }
        t2.TraceAPI = TraceAPI;
      }, 398: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
        const n = r2(912);
        const a = r2(23);
        const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
        function getBaggage(e3) {
          return e3.getValue(o) || void 0;
        }
        t2.getBaggage = getBaggage;
        function getActiveBaggage() {
          return getBaggage(n.ContextAPI.getInstance().active());
        }
        t2.getActiveBaggage = getActiveBaggage;
        function setBaggage(e3, t3) {
          return e3.setValue(o, t3);
        }
        t2.setBaggage = setBaggage;
        function deleteBaggage(e3) {
          return e3.deleteValue(o);
        }
        t2.deleteBaggage = deleteBaggage;
      }, 152: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.BaggageImpl = void 0;
        class BaggageImpl {
          constructor(e3) {
            this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
          }
          getEntry(e3) {
            const t3 = this._entries.get(e3);
            if (!t3) {
              return void 0;
            }
            return Object.assign({}, t3);
          }
          getAllEntries() {
            return Array.from(this._entries.entries()).map((([e3, t3]) => [e3, t3]));
          }
          setEntry(e3, t3) {
            const r2 = new BaggageImpl(this._entries);
            r2._entries.set(e3, t3);
            return r2;
          }
          removeEntry(e3) {
            const t3 = new BaggageImpl(this._entries);
            t3._entries.delete(e3);
            return t3;
          }
          removeEntries(...e3) {
            const t3 = new BaggageImpl(this._entries);
            for (const r2 of e3) {
              t3._entries.delete(r2);
            }
            return t3;
          }
          clear() {
            return new BaggageImpl();
          }
        }
        t2.BaggageImpl = BaggageImpl;
      }, 647: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.baggageEntryMetadataSymbol = void 0;
        t2.baggageEntryMetadataSymbol = /* @__PURE__ */ Symbol("BaggageEntryMetadata");
      }, 504: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
        const n = r2(44);
        const a = r2(152);
        const o = r2(647);
        const i = n.DiagAPI.instance();
        function createBaggage(e3 = {}) {
          return new a.BaggageImpl(new Map(Object.entries(e3)));
        }
        t2.createBaggage = createBaggage;
        function baggageEntryMetadataFromString(e3) {
          if (typeof e3 !== "string") {
            i.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`);
            e3 = "";
          }
          return { __TYPE__: o.baggageEntryMetadataSymbol, toString() {
            return e3;
          } };
        }
        t2.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
      }, 778: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.context = void 0;
        const n = r2(912);
        t2.context = n.ContextAPI.getInstance();
      }, 108: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.NoopContextManager = void 0;
        const n = r2(23);
        class NoopContextManager {
          active() {
            return n.ROOT_CONTEXT;
          }
          with(e3, t3, r3, ...n2) {
            return t3.call(r3, ...n2);
          }
          bind(e3, t3) {
            return t3;
          }
          enable() {
            return this;
          }
          disable() {
            return this;
          }
        }
        t2.NoopContextManager = NoopContextManager;
      }, 23: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.ROOT_CONTEXT = t2.createContextKey = void 0;
        function createContextKey(e3) {
          return Symbol.for(e3);
        }
        t2.createContextKey = createContextKey;
        class BaseContext {
          constructor(e3) {
            const t3 = this;
            t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            t3.getValue = (e4) => t3._currentContext.get(e4);
            t3.setValue = (e4, r2) => {
              const n = new BaseContext(t3._currentContext);
              n._currentContext.set(e4, r2);
              return n;
            };
            t3.deleteValue = (e4) => {
              const r2 = new BaseContext(t3._currentContext);
              r2._currentContext.delete(e4);
              return r2;
            };
          }
        }
        t2.ROOT_CONTEXT = new BaseContext();
      }, 304: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.diag = void 0;
        const n = r2(44);
        t2.diag = n.DiagAPI.instance();
      }, 757: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.DiagComponentLogger = void 0;
        const n = r2(221);
        class DiagComponentLogger {
          constructor(e3) {
            this._namespace = e3.namespace || "DiagComponentLogger";
          }
          debug(...e3) {
            return logProxy("debug", this._namespace, e3);
          }
          error(...e3) {
            return logProxy("error", this._namespace, e3);
          }
          info(...e3) {
            return logProxy("info", this._namespace, e3);
          }
          warn(...e3) {
            return logProxy("warn", this._namespace, e3);
          }
          verbose(...e3) {
            return logProxy("verbose", this._namespace, e3);
          }
        }
        t2.DiagComponentLogger = DiagComponentLogger;
        function logProxy(e3, t3, r3) {
          const a = (0, n.getGlobal)("diag");
          if (!a) {
            return;
          }
          r3.unshift(t3);
          return a[e3](...r3);
        }
      }, 83: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.DiagConsoleLogger = void 0;
        const r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
        class DiagConsoleLogger {
          constructor() {
            function _consoleFunc(e3) {
              return function(...t3) {
                if (console) {
                  let r3 = console[e3];
                  if (typeof r3 !== "function") {
                    r3 = console.log;
                  }
                  if (typeof r3 === "function") {
                    return r3.apply(console, t3);
                  }
                }
              };
            }
            for (let e3 = 0; e3 < r2.length; e3++) {
              this[r2[e3].n] = _consoleFunc(r2[e3].c);
            }
          }
        }
        t2.DiagConsoleLogger = DiagConsoleLogger;
      }, 412: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.createLogLevelDiagLogger = void 0;
        const n = r2(711);
        function createLogLevelDiagLogger(e3, t3) {
          if (e3 < n.DiagLogLevel.NONE) {
            e3 = n.DiagLogLevel.NONE;
          } else if (e3 > n.DiagLogLevel.ALL) {
            e3 = n.DiagLogLevel.ALL;
          }
          t3 = t3 || {};
          function _filterFunc(r3, n2) {
            const a = t3[r3];
            if (typeof a === "function" && e3 >= n2) {
              return a.bind(t3);
            }
            return function() {
            };
          }
          return { error: _filterFunc("error", n.DiagLogLevel.ERROR), warn: _filterFunc("warn", n.DiagLogLevel.WARN), info: _filterFunc("info", n.DiagLogLevel.INFO), debug: _filterFunc("debug", n.DiagLogLevel.DEBUG), verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE) };
        }
        t2.createLogLevelDiagLogger = createLogLevelDiagLogger;
      }, 711: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.DiagLogLevel = void 0;
        var r2;
        (function(e3) {
          e3[e3["NONE"] = 0] = "NONE";
          e3[e3["ERROR"] = 30] = "ERROR";
          e3[e3["WARN"] = 50] = "WARN";
          e3[e3["INFO"] = 60] = "INFO";
          e3[e3["DEBUG"] = 70] = "DEBUG";
          e3[e3["VERBOSE"] = 80] = "VERBOSE";
          e3[e3["ALL"] = 9999] = "ALL";
        })(r2 = t2.DiagLogLevel || (t2.DiagLogLevel = {}));
      }, 221: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
        const n = r2(678);
        const a = r2(652);
        const o = r2(662);
        const i = a.VERSION.split(".")[0];
        const c = /* @__PURE__ */ Symbol.for(`opentelemetry.js.api.${i}`);
        const s = n._globalThis;
        function registerGlobal(e3, t3, r3, n2 = false) {
          var o2;
          const i2 = s[c] = (o2 = s[c]) !== null && o2 !== void 0 ? o2 : { version: a.VERSION };
          if (!n2 && i2[e3]) {
            const t4 = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
            r3.error(t4.stack || t4.message);
            return false;
          }
          if (i2.version !== a.VERSION) {
            const t4 = new Error(`@opentelemetry/api: Registration of version v${i2.version} for ${e3} does not match previously registered API v${a.VERSION}`);
            r3.error(t4.stack || t4.message);
            return false;
          }
          i2[e3] = t3;
          r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${a.VERSION}.`);
          return true;
        }
        t2.registerGlobal = registerGlobal;
        function getGlobal(e3) {
          var t3, r3;
          const n2 = (t3 = s[c]) === null || t3 === void 0 ? void 0 : t3.version;
          if (!n2 || !(0, o.isCompatible)(n2)) {
            return;
          }
          return (r3 = s[c]) === null || r3 === void 0 ? void 0 : r3[e3];
        }
        t2.getGlobal = getGlobal;
        function unregisterGlobal(e3, t3) {
          t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${a.VERSION}.`);
          const r3 = s[c];
          if (r3) {
            delete r3[e3];
          }
        }
        t2.unregisterGlobal = unregisterGlobal;
      }, 662: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.isCompatible = t2._makeCompatibilityCheck = void 0;
        const n = r2(652);
        const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
        function _makeCompatibilityCheck(e3) {
          const t3 = /* @__PURE__ */ new Set([e3]);
          const r3 = /* @__PURE__ */ new Set();
          const n2 = e3.match(a);
          if (!n2) {
            return () => false;
          }
          const o = { major: +n2[1], minor: +n2[2], patch: +n2[3], prerelease: n2[4] };
          if (o.prerelease != null) {
            return function isExactmatch(t4) {
              return t4 === e3;
            };
          }
          function _reject(e4) {
            r3.add(e4);
            return false;
          }
          function _accept(e4) {
            t3.add(e4);
            return true;
          }
          return function isCompatible(e4) {
            if (t3.has(e4)) {
              return true;
            }
            if (r3.has(e4)) {
              return false;
            }
            const n3 = e4.match(a);
            if (!n3) {
              return _reject(e4);
            }
            const i = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (i.prerelease != null) {
              return _reject(e4);
            }
            if (o.major !== i.major) {
              return _reject(e4);
            }
            if (o.major === 0) {
              if (o.minor === i.minor && o.patch <= i.patch) {
                return _accept(e4);
              }
              return _reject(e4);
            }
            if (o.minor <= i.minor) {
              return _accept(e4);
            }
            return _reject(e4);
          };
        }
        t2._makeCompatibilityCheck = _makeCompatibilityCheck;
        t2.isCompatible = _makeCompatibilityCheck(n.VERSION);
      }, 120: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.metrics = void 0;
        const n = r2(262);
        t2.metrics = n.MetricsAPI.getInstance();
      }, 532: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.ValueType = void 0;
        var r2;
        (function(e3) {
          e3[e3["INT"] = 0] = "INT";
          e3[e3["DOUBLE"] = 1] = "DOUBLE";
        })(r2 = t2.ValueType || (t2.ValueType = {}));
      }, 440: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
        class NoopMeter {
          constructor() {
          }
          createHistogram(e3, r2) {
            return t2.NOOP_HISTOGRAM_METRIC;
          }
          createCounter(e3, r2) {
            return t2.NOOP_COUNTER_METRIC;
          }
          createUpDownCounter(e3, r2) {
            return t2.NOOP_UP_DOWN_COUNTER_METRIC;
          }
          createObservableGauge(e3, r2) {
            return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
          }
          createObservableCounter(e3, r2) {
            return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
          }
          createObservableUpDownCounter(e3, r2) {
            return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
          }
          addBatchObservableCallback(e3, t3) {
          }
          removeBatchObservableCallback(e3) {
          }
        }
        t2.NoopMeter = NoopMeter;
        class NoopMetric {
        }
        t2.NoopMetric = NoopMetric;
        class NoopCounterMetric extends NoopMetric {
          add(e3, t3) {
          }
        }
        t2.NoopCounterMetric = NoopCounterMetric;
        class NoopUpDownCounterMetric extends NoopMetric {
          add(e3, t3) {
          }
        }
        t2.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
        class NoopHistogramMetric extends NoopMetric {
          record(e3, t3) {
          }
        }
        t2.NoopHistogramMetric = NoopHistogramMetric;
        class NoopObservableMetric {
          addCallback(e3) {
          }
          removeCallback(e3) {
          }
        }
        t2.NoopObservableMetric = NoopObservableMetric;
        class NoopObservableCounterMetric extends NoopObservableMetric {
        }
        t2.NoopObservableCounterMetric = NoopObservableCounterMetric;
        class NoopObservableGaugeMetric extends NoopObservableMetric {
        }
        t2.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
        class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
        }
        t2.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
        t2.NOOP_METER = new NoopMeter();
        t2.NOOP_COUNTER_METRIC = new NoopCounterMetric();
        t2.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
        t2.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
        t2.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
        t2.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
        t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
        function createNoopMeter() {
          return t2.NOOP_METER;
        }
        t2.createNoopMeter = createNoopMeter;
      }, 586: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
        const n = r2(440);
        class NoopMeterProvider {
          getMeter(e3, t3, r3) {
            return n.NOOP_METER;
          }
        }
        t2.NoopMeterProvider = NoopMeterProvider;
        t2.NOOP_METER_PROVIDER = new NoopMeterProvider();
      }, 678: function(e2, t2, r2) {
        var n = this && this.__createBinding || (Object.create ? function(e3, t3, r3, n2) {
          if (n2 === void 0) n2 = r3;
          Object.defineProperty(e3, n2, { enumerable: true, get: function() {
            return t3[r3];
          } });
        } : function(e3, t3, r3, n2) {
          if (n2 === void 0) n2 = r3;
          e3[n2] = t3[r3];
        });
        var a = this && this.__exportStar || function(e3, t3) {
          for (var r3 in e3) if (r3 !== "default" && !Object.prototype.hasOwnProperty.call(t3, r3)) n(t3, e3, r3);
        };
        Object.defineProperty(t2, "__esModule", { value: true });
        a(r2(59), t2);
      }, 460: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2._globalThis = void 0;
        t2._globalThis = typeof globalThis === "object" ? globalThis : global;
      }, 59: function(e2, t2, r2) {
        var n = this && this.__createBinding || (Object.create ? function(e3, t3, r3, n2) {
          if (n2 === void 0) n2 = r3;
          Object.defineProperty(e3, n2, { enumerable: true, get: function() {
            return t3[r3];
          } });
        } : function(e3, t3, r3, n2) {
          if (n2 === void 0) n2 = r3;
          e3[n2] = t3[r3];
        });
        var a = this && this.__exportStar || function(e3, t3) {
          for (var r3 in e3) if (r3 !== "default" && !Object.prototype.hasOwnProperty.call(t3, r3)) n(t3, e3, r3);
        };
        Object.defineProperty(t2, "__esModule", { value: true });
        a(r2(460), t2);
      }, 27: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.propagation = void 0;
        const n = r2(25);
        t2.propagation = n.PropagationAPI.getInstance();
      }, 19: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.NoopTextMapPropagator = void 0;
        class NoopTextMapPropagator {
          inject(e3, t3) {
          }
          extract(e3, t3) {
            return e3;
          }
          fields() {
            return [];
          }
        }
        t2.NoopTextMapPropagator = NoopTextMapPropagator;
      }, 92: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0;
        t2.defaultTextMapGetter = { get(e3, t3) {
          if (e3 == null) {
            return void 0;
          }
          return e3[t3];
        }, keys(e3) {
          if (e3 == null) {
            return [];
          }
          return Object.keys(e3);
        } };
        t2.defaultTextMapSetter = { set(e3, t3, r2) {
          if (e3 == null) {
            return;
          }
          e3[t3] = r2;
        } };
      }, 816: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.trace = void 0;
        const n = r2(397);
        t2.trace = n.TraceAPI.getInstance();
      }, 374: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.NonRecordingSpan = void 0;
        const n = r2(546);
        class NonRecordingSpan {
          constructor(e3 = n.INVALID_SPAN_CONTEXT) {
            this._spanContext = e3;
          }
          spanContext() {
            return this._spanContext;
          }
          setAttribute(e3, t3) {
            return this;
          }
          setAttributes(e3) {
            return this;
          }
          addEvent(e3, t3) {
            return this;
          }
          setStatus(e3) {
            return this;
          }
          updateName(e3) {
            return this;
          }
          end(e3) {
          }
          isRecording() {
            return false;
          }
          recordException(e3, t3) {
          }
        }
        t2.NonRecordingSpan = NonRecordingSpan;
      }, 637: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.NoopTracer = void 0;
        const n = r2(912);
        const a = r2(793);
        const o = r2(374);
        const i = r2(477);
        const c = n.ContextAPI.getInstance();
        class NoopTracer {
          startSpan(e3, t3, r3 = c.active()) {
            const n2 = Boolean(t3 === null || t3 === void 0 ? void 0 : t3.root);
            if (n2) {
              return new o.NonRecordingSpan();
            }
            const s = r3 && (0, a.getSpanContext)(r3);
            if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
              return new o.NonRecordingSpan(s);
            } else {
              return new o.NonRecordingSpan();
            }
          }
          startActiveSpan(e3, t3, r3, n2) {
            let o2;
            let i2;
            let s;
            if (arguments.length < 2) {
              return;
            } else if (arguments.length === 2) {
              s = t3;
            } else if (arguments.length === 3) {
              o2 = t3;
              s = r3;
            } else {
              o2 = t3;
              i2 = r3;
              s = n2;
            }
            const u = i2 !== null && i2 !== void 0 ? i2 : c.active();
            const l = this.startSpan(e3, o2, u);
            const g = (0, a.setSpan)(u, l);
            return c.with(g, s, void 0, l);
          }
        }
        t2.NoopTracer = NoopTracer;
        function isSpanContext(e3) {
          return typeof e3 === "object" && typeof e3["spanId"] === "string" && typeof e3["traceId"] === "string" && typeof e3["traceFlags"] === "number";
        }
      }, 76: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.NoopTracerProvider = void 0;
        const n = r2(637);
        class NoopTracerProvider {
          getTracer(e3, t3, r3) {
            return new n.NoopTracer();
          }
        }
        t2.NoopTracerProvider = NoopTracerProvider;
      }, 779: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.ProxyTracer = void 0;
        const n = r2(637);
        const a = new n.NoopTracer();
        class ProxyTracer {
          constructor(e3, t3, r3, n2) {
            this._provider = e3;
            this.name = t3;
            this.version = r3;
            this.options = n2;
          }
          startSpan(e3, t3, r3) {
            return this._getTracer().startSpan(e3, t3, r3);
          }
          startActiveSpan(e3, t3, r3, n2) {
            const a2 = this._getTracer();
            return Reflect.apply(a2.startActiveSpan, a2, arguments);
          }
          _getTracer() {
            if (this._delegate) {
              return this._delegate;
            }
            const e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
            if (!e3) {
              return a;
            }
            this._delegate = e3;
            return this._delegate;
          }
        }
        t2.ProxyTracer = ProxyTracer;
      }, 498: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.ProxyTracerProvider = void 0;
        const n = r2(779);
        const a = r2(76);
        const o = new a.NoopTracerProvider();
        class ProxyTracerProvider {
          getTracer(e3, t3, r3) {
            var a2;
            return (a2 = this.getDelegateTracer(e3, t3, r3)) !== null && a2 !== void 0 ? a2 : new n.ProxyTracer(this, e3, t3, r3);
          }
          getDelegate() {
            var e3;
            return (e3 = this._delegate) !== null && e3 !== void 0 ? e3 : o;
          }
          setDelegate(e3) {
            this._delegate = e3;
          }
          getDelegateTracer(e3, t3, r3) {
            var n2;
            return (n2 = this._delegate) === null || n2 === void 0 ? void 0 : n2.getTracer(e3, t3, r3);
          }
        }
        t2.ProxyTracerProvider = ProxyTracerProvider;
      }, 312: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.SamplingDecision = void 0;
        var r2;
        (function(e3) {
          e3[e3["NOT_RECORD"] = 0] = "NOT_RECORD";
          e3[e3["RECORD"] = 1] = "RECORD";
          e3[e3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
        })(r2 = t2.SamplingDecision || (t2.SamplingDecision = {}));
      }, 793: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
        const n = r2(23);
        const a = r2(374);
        const o = r2(912);
        const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
        function getSpan(e3) {
          return e3.getValue(i) || void 0;
        }
        t2.getSpan = getSpan;
        function getActiveSpan() {
          return getSpan(o.ContextAPI.getInstance().active());
        }
        t2.getActiveSpan = getActiveSpan;
        function setSpan(e3, t3) {
          return e3.setValue(i, t3);
        }
        t2.setSpan = setSpan;
        function deleteSpan(e3) {
          return e3.deleteValue(i);
        }
        t2.deleteSpan = deleteSpan;
        function setSpanContext(e3, t3) {
          return setSpan(e3, new a.NonRecordingSpan(t3));
        }
        t2.setSpanContext = setSpanContext;
        function getSpanContext(e3) {
          var t3;
          return (t3 = getSpan(e3)) === null || t3 === void 0 ? void 0 : t3.spanContext();
        }
        t2.getSpanContext = getSpanContext;
      }, 285: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.TraceStateImpl = void 0;
        const n = r2(240);
        const a = 32;
        const o = 512;
        const i = ",";
        const c = "=";
        class TraceStateImpl {
          constructor(e3) {
            this._internalState = /* @__PURE__ */ new Map();
            if (e3) this._parse(e3);
          }
          set(e3, t3) {
            const r3 = this._clone();
            if (r3._internalState.has(e3)) {
              r3._internalState.delete(e3);
            }
            r3._internalState.set(e3, t3);
            return r3;
          }
          unset(e3) {
            const t3 = this._clone();
            t3._internalState.delete(e3);
            return t3;
          }
          get(e3) {
            return this._internalState.get(e3);
          }
          serialize() {
            return this._keys().reduce(((e3, t3) => {
              e3.push(t3 + c + this.get(t3));
              return e3;
            }), []).join(i);
          }
          _parse(e3) {
            if (e3.length > o) return;
            this._internalState = e3.split(i).reverse().reduce(((e4, t3) => {
              const r3 = t3.trim();
              const a2 = r3.indexOf(c);
              if (a2 !== -1) {
                const o2 = r3.slice(0, a2);
                const i2 = r3.slice(a2 + 1, t3.length);
                if ((0, n.validateKey)(o2) && (0, n.validateValue)(i2)) {
                  e4.set(o2, i2);
                } else {
                }
              }
              return e4;
            }), /* @__PURE__ */ new Map());
            if (this._internalState.size > a) {
              this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
            }
          }
          _keys() {
            return Array.from(this._internalState.keys()).reverse();
          }
          _clone() {
            const e3 = new TraceStateImpl();
            e3._internalState = new Map(this._internalState);
            return e3;
          }
        }
        t2.TraceStateImpl = TraceStateImpl;
      }, 240: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.validateValue = t2.validateKey = void 0;
        const r2 = "[_0-9a-z-*/]";
        const n = `[a-z]${r2}{0,255}`;
        const a = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`;
        const o = new RegExp(`^(?:${n}|${a})$`);
        const i = /^[ -~]{0,255}[!-~]$/;
        const c = /,|=/;
        function validateKey(e3) {
          return o.test(e3);
        }
        t2.validateKey = validateKey;
        function validateValue(e3) {
          return i.test(e3) && !c.test(e3);
        }
        t2.validateValue = validateValue;
      }, 87: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.createTraceState = void 0;
        const n = r2(285);
        function createTraceState(e3) {
          return new n.TraceStateImpl(e3);
        }
        t2.createTraceState = createTraceState;
      }, 546: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
        const n = r2(731);
        t2.INVALID_SPANID = "0000000000000000";
        t2.INVALID_TRACEID = "00000000000000000000000000000000";
        t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n.TraceFlags.NONE };
      }, 613: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.SpanKind = void 0;
        var r2;
        (function(e3) {
          e3[e3["INTERNAL"] = 0] = "INTERNAL";
          e3[e3["SERVER"] = 1] = "SERVER";
          e3[e3["CLIENT"] = 2] = "CLIENT";
          e3[e3["PRODUCER"] = 3] = "PRODUCER";
          e3[e3["CONSUMER"] = 4] = "CONSUMER";
        })(r2 = t2.SpanKind || (t2.SpanKind = {}));
      }, 477: (e2, t2, r2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
        const n = r2(546);
        const a = r2(374);
        const o = /^([0-9a-f]{32})$/i;
        const i = /^[0-9a-f]{16}$/i;
        function isValidTraceId(e3) {
          return o.test(e3) && e3 !== n.INVALID_TRACEID;
        }
        t2.isValidTraceId = isValidTraceId;
        function isValidSpanId(e3) {
          return i.test(e3) && e3 !== n.INVALID_SPANID;
        }
        t2.isValidSpanId = isValidSpanId;
        function isSpanContextValid(e3) {
          return isValidTraceId(e3.traceId) && isValidSpanId(e3.spanId);
        }
        t2.isSpanContextValid = isSpanContextValid;
        function wrapSpanContext(e3) {
          return new a.NonRecordingSpan(e3);
        }
        t2.wrapSpanContext = wrapSpanContext;
      }, 854: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.SpanStatusCode = void 0;
        var r2;
        (function(e3) {
          e3[e3["UNSET"] = 0] = "UNSET";
          e3[e3["OK"] = 1] = "OK";
          e3[e3["ERROR"] = 2] = "ERROR";
        })(r2 = t2.SpanStatusCode || (t2.SpanStatusCode = {}));
      }, 731: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.TraceFlags = void 0;
        var r2;
        (function(e3) {
          e3[e3["NONE"] = 0] = "NONE";
          e3[e3["SAMPLED"] = 1] = "SAMPLED";
        })(r2 = t2.TraceFlags || (t2.TraceFlags = {}));
      }, 652: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        t2.VERSION = void 0;
        t2.VERSION = "1.6.0";
      } };
      var t = {};
      function __nccwpck_require__2(r2) {
        var n = t[r2];
        if (n !== void 0) {
          return n.exports;
        }
        var a = t[r2] = { exports: {} };
        var o = true;
        try {
          e[r2].call(a.exports, a, a.exports, __nccwpck_require__2);
          o = false;
        } finally {
          if (o) delete t[r2];
        }
        return a.exports;
      }
      if (typeof __nccwpck_require__2 !== "undefined") __nccwpck_require__2.ab = __dirname + "/";
      var r = {};
      (() => {
        var e2 = r;
        Object.defineProperty(e2, "__esModule", { value: true });
        e2.trace = e2.propagation = e2.metrics = e2.diag = e2.context = e2.INVALID_SPAN_CONTEXT = e2.INVALID_TRACEID = e2.INVALID_SPANID = e2.isValidSpanId = e2.isValidTraceId = e2.isSpanContextValid = e2.createTraceState = e2.TraceFlags = e2.SpanStatusCode = e2.SpanKind = e2.SamplingDecision = e2.ProxyTracerProvider = e2.ProxyTracer = e2.defaultTextMapSetter = e2.defaultTextMapGetter = e2.ValueType = e2.createNoopMeter = e2.DiagLogLevel = e2.DiagConsoleLogger = e2.ROOT_CONTEXT = e2.createContextKey = e2.baggageEntryMetadataFromString = void 0;
        var t2 = __nccwpck_require__2(504);
        Object.defineProperty(e2, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return t2.baggageEntryMetadataFromString;
        } });
        var n = __nccwpck_require__2(23);
        Object.defineProperty(e2, "createContextKey", { enumerable: true, get: function() {
          return n.createContextKey;
        } });
        Object.defineProperty(e2, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return n.ROOT_CONTEXT;
        } });
        var a = __nccwpck_require__2(83);
        Object.defineProperty(e2, "DiagConsoleLogger", { enumerable: true, get: function() {
          return a.DiagConsoleLogger;
        } });
        var o = __nccwpck_require__2(711);
        Object.defineProperty(e2, "DiagLogLevel", { enumerable: true, get: function() {
          return o.DiagLogLevel;
        } });
        var i = __nccwpck_require__2(440);
        Object.defineProperty(e2, "createNoopMeter", { enumerable: true, get: function() {
          return i.createNoopMeter;
        } });
        var c = __nccwpck_require__2(532);
        Object.defineProperty(e2, "ValueType", { enumerable: true, get: function() {
          return c.ValueType;
        } });
        var s = __nccwpck_require__2(92);
        Object.defineProperty(e2, "defaultTextMapGetter", { enumerable: true, get: function() {
          return s.defaultTextMapGetter;
        } });
        Object.defineProperty(e2, "defaultTextMapSetter", { enumerable: true, get: function() {
          return s.defaultTextMapSetter;
        } });
        var u = __nccwpck_require__2(779);
        Object.defineProperty(e2, "ProxyTracer", { enumerable: true, get: function() {
          return u.ProxyTracer;
        } });
        var l = __nccwpck_require__2(498);
        Object.defineProperty(e2, "ProxyTracerProvider", { enumerable: true, get: function() {
          return l.ProxyTracerProvider;
        } });
        var g = __nccwpck_require__2(312);
        Object.defineProperty(e2, "SamplingDecision", { enumerable: true, get: function() {
          return g.SamplingDecision;
        } });
        var p = __nccwpck_require__2(613);
        Object.defineProperty(e2, "SpanKind", { enumerable: true, get: function() {
          return p.SpanKind;
        } });
        var d = __nccwpck_require__2(854);
        Object.defineProperty(e2, "SpanStatusCode", { enumerable: true, get: function() {
          return d.SpanStatusCode;
        } });
        var _ = __nccwpck_require__2(731);
        Object.defineProperty(e2, "TraceFlags", { enumerable: true, get: function() {
          return _.TraceFlags;
        } });
        var f = __nccwpck_require__2(87);
        Object.defineProperty(e2, "createTraceState", { enumerable: true, get: function() {
          return f.createTraceState;
        } });
        var b = __nccwpck_require__2(477);
        Object.defineProperty(e2, "isSpanContextValid", { enumerable: true, get: function() {
          return b.isSpanContextValid;
        } });
        Object.defineProperty(e2, "isValidTraceId", { enumerable: true, get: function() {
          return b.isValidTraceId;
        } });
        Object.defineProperty(e2, "isValidSpanId", { enumerable: true, get: function() {
          return b.isValidSpanId;
        } });
        var v = __nccwpck_require__2(546);
        Object.defineProperty(e2, "INVALID_SPANID", { enumerable: true, get: function() {
          return v.INVALID_SPANID;
        } });
        Object.defineProperty(e2, "INVALID_TRACEID", { enumerable: true, get: function() {
          return v.INVALID_TRACEID;
        } });
        Object.defineProperty(e2, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return v.INVALID_SPAN_CONTEXT;
        } });
        const O = __nccwpck_require__2(778);
        Object.defineProperty(e2, "context", { enumerable: true, get: function() {
          return O.context;
        } });
        const P = __nccwpck_require__2(304);
        Object.defineProperty(e2, "diag", { enumerable: true, get: function() {
          return P.diag;
        } });
        const N = __nccwpck_require__2(120);
        Object.defineProperty(e2, "metrics", { enumerable: true, get: function() {
          return N.metrics;
        } });
        const S = __nccwpck_require__2(27);
        Object.defineProperty(e2, "propagation", { enumerable: true, get: function() {
          return S.propagation;
        } });
        const C = __nccwpck_require__2(816);
        Object.defineProperty(e2, "trace", { enumerable: true, get: function() {
          return C.trace;
        } });
        e2["default"] = { context: O.context, diag: P.diag, metrics: N.metrics, propagation: S.propagation, trace: C.trace };
      })();
      module.exports = r;
    })();
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/router-utils/instrumentation-node-extensions.js
var require_instrumentation_node_extensions = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/router-utils/instrumentation-node-extensions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "afterRegistration", {
      enumerable: true,
      get: function() {
        return afterRegistration;
      }
    });
    var _workunitasyncstorageexternal = require_work_unit_async_storage_external();
    var _invarianterror = require_invariant_error();
    var _clientandserverreferences = require_client_and_server_references();
    function afterRegistration() {
      if (true) {
        throw new _invarianterror.InvariantError("Node.js instrumentation extensions should not be loaded in the Edge runtime.");
      }
      extendTracerProviderForCacheComponents();
    }
    function isProxyTracerProvider(provider) {
      return "getDelegateTracer" in provider && typeof provider.getDelegateTracer === "function";
    }
    function extendTracerProviderForCacheComponents() {
      let api;
      try {
        api = require_api();
      } catch (err) {
        api = require_api();
      }
      const provider = api.trace.getTracerProvider();
      const originalGetTracer = provider.getTracer.bind(provider);
      provider.getTracer = (...args) => {
        return instrumentTracerForCacheComponents(originalGetTracer.apply(provider, args));
      };
      if (isProxyTracerProvider(provider)) {
        const originalGetDelegateTracer = provider.getDelegateTracer.bind(provider);
        provider.getDelegateTracer = (...args) => {
          const tracer = originalGetDelegateTracer(...args);
          return tracer === void 0 ? void 0 : instrumentTracerForCacheComponents(tracer);
        };
      }
    }
    function instrumentTracerForCacheComponents(tracer) {
      if (WeakTracers.has(tracer)) {
        return tracer;
      }
      const originalStartSpan = tracer.startSpan;
      tracer.startSpan = (...startSpanArgs) => {
        return _workunitasyncstorageexternal.workUnitAsyncStorage.exit(() => originalStartSpan.apply(tracer, startSpanArgs));
      };
      const originalStartActiveSpan = tracer.startActiveSpan;
      tracer.startActiveSpan = (...startActiveSpanArgs) => {
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (!workUnitStore) {
          return originalStartActiveSpan.apply(tracer, startActiveSpanArgs);
        }
        let fnIdx = 0;
        if (startActiveSpanArgs.length === 2 && typeof startActiveSpanArgs[1] === "function") {
          fnIdx = 1;
        } else if (startActiveSpanArgs.length === 3 && typeof startActiveSpanArgs[2] === "function") {
          fnIdx = 2;
        } else if (startActiveSpanArgs.length > 3 && typeof startActiveSpanArgs[3] === "function") {
          fnIdx = 3;
        }
        if (fnIdx) {
          const originalFn = startActiveSpanArgs[fnIdx];
          if ((0, _clientandserverreferences.isUseCacheFunction)(originalFn)) {
            console.error("A Cache Function (`use cache`) was passed to startActiveSpan which means it will receive a Span argument with a possibly random ID on every invocation leading to cache misses. Provide a wrapping function around the Cache Function that does not forward the Span argument to avoid this issue.");
          }
          startActiveSpanArgs[fnIdx] = withWorkUnitContext(workUnitStore, originalFn);
        }
        return _workunitasyncstorageexternal.workUnitAsyncStorage.exit(() => {
          return originalStartActiveSpan.apply(tracer, startActiveSpanArgs);
        });
      };
      WeakTracers.add(tracer);
      return tracer;
    }
    var WeakTracers = /* @__PURE__ */ new WeakSet();
    function withWorkUnitContext(workUnitStore, fn) {
      return (...args) => _workunitasyncstorageexternal.workUnitAsyncStorage.run(workUnitStore, fn, ...args);
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/trace/constants.js
var require_constants2 = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/trace/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      AppRenderSpan: function() {
        return AppRenderSpan;
      },
      AppRouteRouteHandlersSpan: function() {
        return AppRouteRouteHandlersSpan;
      },
      AppRouteRouteModuleSpan: function() {
        return AppRouteRouteModuleSpan;
      },
      BaseServerSpan: function() {
        return BaseServerSpan;
      },
      DevBundlerServiceSpan: function() {
        return DevBundlerServiceSpan;
      },
      InstrumentationSpan: function() {
        return InstrumentationSpan;
      },
      LoadComponentsSpan: function() {
        return LoadComponentsSpan;
      },
      LogSpanAllowList: function() {
        return LogSpanAllowList;
      },
      MiddlewareSpan: function() {
        return MiddlewareSpan;
      },
      NextNodeServerSpan: function() {
        return NextNodeServerSpan;
      },
      NextServerSpan: function() {
        return NextServerSpan;
      },
      NextSpan: function() {
        return NextSpan;
      },
      NextVanillaSpanAllowlist: function() {
        return NextVanillaSpanAllowlist;
      },
      NodeSpan: function() {
        return NodeSpan;
      },
      RenderSpan: function() {
        return RenderSpan;
      },
      ResolveMetadataSpan: function() {
        return ResolveMetadataSpan;
      },
      RouteModuleSpan: function() {
        return RouteModuleSpan;
      },
      RouterSpan: function() {
        return RouterSpan;
      },
      StartServerSpan: function() {
        return StartServerSpan;
      }
    });
    var BaseServerSpan = /* @__PURE__ */ (function(BaseServerSpan2) {
      BaseServerSpan2["handleRequest"] = "BaseServer.handleRequest";
      BaseServerSpan2["run"] = "BaseServer.run";
      BaseServerSpan2["pipe"] = "BaseServer.pipe";
      BaseServerSpan2["getStaticHTML"] = "BaseServer.getStaticHTML";
      BaseServerSpan2["render"] = "BaseServer.render";
      BaseServerSpan2["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
      BaseServerSpan2["renderToResponse"] = "BaseServer.renderToResponse";
      BaseServerSpan2["renderToHTML"] = "BaseServer.renderToHTML";
      BaseServerSpan2["renderError"] = "BaseServer.renderError";
      BaseServerSpan2["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
      BaseServerSpan2["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
      BaseServerSpan2["render404"] = "BaseServer.render404";
      return BaseServerSpan2;
    })(BaseServerSpan || {});
    var LoadComponentsSpan = /* @__PURE__ */ (function(LoadComponentsSpan2) {
      LoadComponentsSpan2["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
      LoadComponentsSpan2["loadComponents"] = "LoadComponents.loadComponents";
      LoadComponentsSpan2["loadRouteModule"] = "LoadComponents.loadRouteModule";
      return LoadComponentsSpan2;
    })(LoadComponentsSpan || {});
    var InstrumentationSpan = /* @__PURE__ */ (function(InstrumentationSpan2) {
      InstrumentationSpan2["loadModule"] = "Instrumentation.loadModule";
      InstrumentationSpan2["register"] = "Instrumentation.register";
      return InstrumentationSpan2;
    })(InstrumentationSpan || {});
    var NextServerSpan = /* @__PURE__ */ (function(NextServerSpan2) {
      NextServerSpan2["getRequestHandler"] = "NextServer.getRequestHandler";
      NextServerSpan2["getRequestHandlerWithMetadata"] = "NextServer.getRequestHandlerWithMetadata";
      NextServerSpan2["getServer"] = "NextServer.getServer";
      NextServerSpan2["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
      NextServerSpan2["createServer"] = "createServer.createServer";
      return NextServerSpan2;
    })(NextServerSpan || {});
    var NextNodeServerSpan = /* @__PURE__ */ (function(NextNodeServerSpan2) {
      NextNodeServerSpan2["compression"] = "NextNodeServer.compression";
      NextNodeServerSpan2["getBuildId"] = "NextNodeServer.getBuildId";
      NextNodeServerSpan2["createComponentTree"] = "NextNodeServer.createComponentTree";
      NextNodeServerSpan2["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
      NextNodeServerSpan2["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
      NextNodeServerSpan2["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
      NextNodeServerSpan2["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
      NextNodeServerSpan2["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
      NextNodeServerSpan2["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
      NextNodeServerSpan2["sendRenderResult"] = "NextNodeServer.sendRenderResult";
      NextNodeServerSpan2["proxyRequest"] = "NextNodeServer.proxyRequest";
      NextNodeServerSpan2["runApi"] = "NextNodeServer.runApi";
      NextNodeServerSpan2["render"] = "NextNodeServer.render";
      NextNodeServerSpan2["renderHTML"] = "NextNodeServer.renderHTML";
      NextNodeServerSpan2["imageOptimizer"] = "NextNodeServer.imageOptimizer";
      NextNodeServerSpan2["getPagePath"] = "NextNodeServer.getPagePath";
      NextNodeServerSpan2["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
      NextNodeServerSpan2["findPageComponents"] = "NextNodeServer.findPageComponents";
      NextNodeServerSpan2["getFontManifest"] = "NextNodeServer.getFontManifest";
      NextNodeServerSpan2["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
      NextNodeServerSpan2["getRequestHandler"] = "NextNodeServer.getRequestHandler";
      NextNodeServerSpan2["renderToHTML"] = "NextNodeServer.renderToHTML";
      NextNodeServerSpan2["renderError"] = "NextNodeServer.renderError";
      NextNodeServerSpan2["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
      NextNodeServerSpan2["render404"] = "NextNodeServer.render404";
      NextNodeServerSpan2["startResponse"] = "NextNodeServer.startResponse";
      NextNodeServerSpan2["route"] = "route";
      NextNodeServerSpan2["onProxyReq"] = "onProxyReq";
      NextNodeServerSpan2["apiResolver"] = "apiResolver";
      NextNodeServerSpan2["internalFetch"] = "internalFetch";
      return NextNodeServerSpan2;
    })(NextNodeServerSpan || {});
    var StartServerSpan = /* @__PURE__ */ (function(StartServerSpan2) {
      StartServerSpan2["startServer"] = "startServer.startServer";
      return StartServerSpan2;
    })(StartServerSpan || {});
    var RenderSpan = /* @__PURE__ */ (function(RenderSpan2) {
      RenderSpan2["getServerSideProps"] = "Render.getServerSideProps";
      RenderSpan2["getStaticProps"] = "Render.getStaticProps";
      RenderSpan2["renderToString"] = "Render.renderToString";
      RenderSpan2["renderDocument"] = "Render.renderDocument";
      RenderSpan2["createBodyResult"] = "Render.createBodyResult";
      return RenderSpan2;
    })(RenderSpan || {});
    var AppRenderSpan = /* @__PURE__ */ (function(AppRenderSpan2) {
      AppRenderSpan2["renderToString"] = "AppRender.renderToString";
      AppRenderSpan2["renderToReadableStream"] = "AppRender.renderToReadableStream";
      AppRenderSpan2["getBodyResult"] = "AppRender.getBodyResult";
      AppRenderSpan2["fetch"] = "AppRender.fetch";
      AppRenderSpan2["waitShellReady"] = "AppRender.waitShellReady";
      AppRenderSpan2["renderToNodeFizzStream"] = "AppRender.renderToNodeFizzStream";
      AppRenderSpan2["instantInsights"] = "AppRender.instantInsights";
      AppRenderSpan2["instantInsightsPrepareValidation"] = "AppRender.instantInsights.prepareValidation";
      AppRenderSpan2["instantInsightsRunValidation"] = "AppRender.instantInsights.runValidation";
      return AppRenderSpan2;
    })(AppRenderSpan || {});
    var DevBundlerServiceSpan = /* @__PURE__ */ (function(DevBundlerServiceSpan2) {
      DevBundlerServiceSpan2["ensurePage"] = "DevBundlerService.ensurePage";
      return DevBundlerServiceSpan2;
    })(DevBundlerServiceSpan || {});
    var RouterSpan = /* @__PURE__ */ (function(RouterSpan2) {
      RouterSpan2["executeRoute"] = "Router.executeRoute";
      return RouterSpan2;
    })(RouterSpan || {});
    var NodeSpan = /* @__PURE__ */ (function(NodeSpan2) {
      NodeSpan2["runHandler"] = "Node.runHandler";
      return NodeSpan2;
    })(NodeSpan || {});
    var AppRouteRouteHandlersSpan = /* @__PURE__ */ (function(AppRouteRouteHandlersSpan2) {
      AppRouteRouteHandlersSpan2["runHandler"] = "AppRouteRouteHandlers.runHandler";
      return AppRouteRouteHandlersSpan2;
    })(AppRouteRouteHandlersSpan || {});
    var AppRouteRouteModuleSpan = /* @__PURE__ */ (function(AppRouteRouteModuleSpan2) {
      AppRouteRouteModuleSpan2["loadUserland"] = "AppRouteRouteModule.loadUserland";
      return AppRouteRouteModuleSpan2;
    })(AppRouteRouteModuleSpan || {});
    var RouteModuleSpan = /* @__PURE__ */ (function(RouteModuleSpan2) {
      RouteModuleSpan2["prepare"] = "RouteModule.prepare";
      RouteModuleSpan2["loadManifests"] = "RouteModule.loadManifests";
      return RouteModuleSpan2;
    })(RouteModuleSpan || {});
    var ResolveMetadataSpan = /* @__PURE__ */ (function(ResolveMetadataSpan2) {
      ResolveMetadataSpan2["generateMetadata"] = "ResolveMetadata.generateMetadata";
      ResolveMetadataSpan2["generateViewport"] = "ResolveMetadata.generateViewport";
      return ResolveMetadataSpan2;
    })(ResolveMetadataSpan || {});
    var MiddlewareSpan = /* @__PURE__ */ (function(MiddlewareSpan2) {
      MiddlewareSpan2["execute"] = "Middleware.execute";
      return MiddlewareSpan2;
    })(MiddlewareSpan || {});
    var NextSpan = /* @__PURE__ */ (function(NextSpan2) {
      NextSpan2["request"] = "Next.request";
      return NextSpan2;
    })(NextSpan || {});
    var NextVanillaSpanAllowlist = /* @__PURE__ */ new Set([
      "Middleware.execute",
      "Next.request",
      "BaseServer.handleRequest",
      "Render.getServerSideProps",
      "Render.getStaticProps",
      "AppRender.fetch",
      "AppRender.getBodyResult",
      "LoadComponents.loadRouteModule",
      "Render.renderDocument",
      "Node.runHandler",
      "AppRouteRouteHandlers.runHandler",
      "AppRouteRouteModule.loadUserland",
      "RouteModule.prepare",
      "Instrumentation.loadModule",
      "Instrumentation.register",
      "ResolveMetadata.generateMetadata",
      "ResolveMetadata.generateViewport",
      "NextNodeServer.createComponentTree",
      "NextNodeServer.findPageComponents",
      "NextNodeServer.getLayoutOrPageModule",
      "NextNodeServer.startResponse",
      "NextNodeServer.clientComponentLoading"
    ]);
    var LogSpanAllowList = /* @__PURE__ */ new Set([
      "NextNodeServer.findPageComponents",
      "NextNodeServer.createComponentTree",
      "NextNodeServer.clientComponentLoading"
    ]);
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/is-thenable.js
var require_is_thenable = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/shared/lib/is-thenable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "isThenable", {
      enumerable: true,
      get: function() {
        return isThenable;
      }
    });
    function isThenable(promise) {
      return promise !== null && typeof promise === "object" && "then" in promise && typeof promise.then === "function";
    }
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/trace/tracer.js
var require_tracer = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/trace/tracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      BubbledError: function() {
        return BubbledError;
      },
      SpanKind: function() {
        return SpanKind;
      },
      SpanStatusCode: function() {
        return SpanStatusCode;
      },
      getTracer: function() {
        return getTracer;
      },
      isBubbledError: function() {
        return isBubbledError;
      },
      recordSpanError: function() {
        return recordSpanError;
      }
    });
    var _constants = require_constants2();
    var _isthenable = require_is_thenable();
    var NEXT_OTEL_PERFORMANCE_PREFIX = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
    var LOCAL_SPAN_RECORDER_KEY = /* @__PURE__ */ Symbol.for("@next/local-span-recorder");
    var api;
    function getLocalSpanRecorder() {
      if (process.env.__NEXT_DEV_SERVER) {
        return globalThis[LOCAL_SPAN_RECORDER_KEY];
      } else {
        return void 0;
      }
    }
    if (true) {
      api = require_api();
    } else {
      try {
        api = null;
      } catch (err) {
        api = null;
      }
    }
    var { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
    var BubbledError = class extends Error {
      constructor(bubble, result) {
        super(), this.bubble = bubble, this.result = result;
      }
    };
    function isBubbledError(error2) {
      if (typeof error2 !== "object" || error2 === null) return false;
      return error2 instanceof BubbledError;
    }
    var recordSpanError = (span, error2) => {
      if (isBubbledError(error2) && error2.bubble) {
        span.setAttribute("next.bubble", true);
      } else {
        if (error2) {
          span.recordException(error2);
          span.setAttribute("error.type", error2.name);
        }
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error2 == null ? void 0 : error2.message
        });
      }
    };
    var closeSpanWithError = (span, error2, endTime) => {
      recordSpanError(span, error2);
      span.end(endTime);
    };
    var rootSpanAttributesStore = /* @__PURE__ */ new Map();
    var rootSpanIdKey = api.createContextKey("next.rootSpanId");
    var lastSpanId = 0;
    var getSpanId = () => lastSpanId++;
    var clientTraceDataSetter = {
      set(carrier, key, value) {
        carrier.push({
          key,
          value
        });
      }
    };
    var NextTracerImpl = class {
      /**
      * Returns an instance to the trace with configured name.
      * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
      * This should be lazily evaluated.
      */
      getTracerInstance() {
        return trace.getTracer("next.js", "16.4.5");
      }
      isOpenTelemetryEnabled() {
        var _tracerProvider_getDelegate_constructor, _tracerProvider_getDelegate;
        const activeSpan = trace.getSpan(context.active());
        if (activeSpan == null ? void 0 : activeSpan.isRecording()) {
          return true;
        }
        const tracerProvider = trace.getTracerProvider();
        if (!("getDelegate" in tracerProvider)) {
          return true;
        }
        return (tracerProvider.getDelegate == null ? void 0 : (_tracerProvider_getDelegate = tracerProvider.getDelegate.call(tracerProvider)) == null ? void 0 : (_tracerProvider_getDelegate_constructor = _tracerProvider_getDelegate.constructor) == null ? void 0 : _tracerProvider_getDelegate_constructor.name) !== "NoopTracerProvider";
      }
      getContext() {
        return context;
      }
      getTracePropagationData() {
        const activeContext = context.active();
        const entries = [];
        propagation.inject(activeContext, entries, clientTraceDataSetter);
        return entries;
      }
      getTraceContextHeaders() {
        const activeContext = context.active();
        if (!trace.getSpanContext(activeContext) || !this.isOpenTelemetryEnabled()) {
          return void 0;
        }
        const carrier = {};
        propagation.inject(activeContext, carrier);
        const { traceparent, tracestate } = carrier;
        if (!traceparent) {
          return void 0;
        }
        return {
          traceparent,
          tracestate
        };
      }
      hasActiveSpanContext() {
        const spanContext = trace.getSpanContext(context.active());
        return Boolean(spanContext && trace.isSpanContextValid(spanContext));
      }
      getActiveScopeSpan() {
        const localSpanRecorder = getLocalSpanRecorder();
        const activeLocalSpan = localSpanRecorder == null ? void 0 : localSpanRecorder.getActiveLocalSpan();
        if (activeLocalSpan && (localSpanRecorder == null ? void 0 : localSpanRecorder.isOpenTelemetryIsolatedSpan(activeLocalSpan))) {
          return activeLocalSpan;
        }
        const activeSpan = trace.getSpan(context.active());
        if (activeSpan || !process.env.__NEXT_DEV_SERVER) {
          return activeSpan;
        }
        return activeLocalSpan;
      }
      withPropagatedContext(carrier, fn, getter, force = false) {
        const activeContext = context.active();
        if (!NEXT_OTEL_PERFORMANCE_PREFIX && !this.isOpenTelemetryEnabled() && !trace.getSpanContext(activeContext)) {
          return fn();
        }
        if (force) {
          const remoteContext2 = propagation.extract(ROOT_CONTEXT, carrier, getter);
          if (trace.getSpanContext(remoteContext2)) {
            return context.with(remoteContext2, fn);
          }
          const mergedContext = propagation.extract(activeContext, carrier, getter);
          return context.with(mergedContext, fn);
        }
        if (trace.getSpanContext(activeContext)) {
          return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
      }
      trace(...args) {
        const [type, fnOrOptions, fnOrEmpty] = args;
        const tracingEnabled = Boolean(NEXT_OTEL_PERFORMANCE_PREFIX) || this.isOpenTelemetryEnabled();
        const localSpanRecorder = getLocalSpanRecorder();
        const localSpanRecordingEnabled = (localSpanRecorder == null ? void 0 : localSpanRecorder.isLocalSpanRecordingEnabled()) ?? false;
        if (!tracingEnabled && !localSpanRecordingEnabled) {
          return typeof fnOrOptions === "function" ? fnOrOptions() : fnOrEmpty();
        }
        const { fn, options } = typeof fnOrOptions === "function" ? {
          fn: fnOrOptions,
          options: {}
        } : {
          fn: fnOrEmpty,
          options: {
            ...fnOrOptions
          }
        };
        const spanName = options.spanName ?? type;
        const parentSpan = options.parentSpan ?? this.getActiveScopeSpan();
        const isolatedParentSpan = parentSpan && (localSpanRecorder == null ? void 0 : localSpanRecorder.isOpenTelemetryIsolatedSpan(parentSpan)) ? parentSpan : void 0;
        const shouldDelegateSpan = !isolatedParentSpan && (_constants.NextVanillaSpanAllowlist.has(type) || process.env.NEXT_OTEL_VERBOSE === "1");
        const shouldTraceSpan = shouldDelegateSpan || ((localSpanRecorder == null ? void 0 : localSpanRecorder.isRequestInsightsEnabled()) ?? false);
        if (!shouldTraceSpan || options.hideSpan) {
          return fn();
        }
        let spanContext = isolatedParentSpan ? context.active() : this.getSpanContext(parentSpan);
        if (!spanContext) {
          spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
        }
        const existingRootSpanId = spanContext.getValue(rootSpanIdKey);
        const isRootSpan = typeof existingRootSpanId !== "number" || !rootSpanAttributesStore.has(existingRootSpanId);
        const spanId = getSpanId();
        options.attributes = {
          "next.span_category": "nextjs",
          "next.span_name": spanName,
          "next.span_type": type,
          ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), () => this.runWithActiveSpan(spanName, options, spanContext, tracingEnabled && shouldDelegateSpan, localSpanRecordingEnabled, isolatedParentSpan, (span) => {
          let startTime;
          if (NEXT_OTEL_PERFORMANCE_PREFIX && type && _constants.LogSpanAllowList.has(type)) {
            startTime = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0;
          }
          let cleanedUp = false;
          const onCleanup = () => {
            if (cleanedUp) return;
            cleanedUp = true;
            rootSpanAttributesStore.delete(spanId);
            if (startTime) {
              performance.measure(`${NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split(".").pop() || "").replace(/[A-Z]/g, (match2) => "-" + match2.toLowerCase())}`, {
                start: startTime,
                end: performance.now()
              });
            }
          };
          if (isRootSpan) {
            rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
          }
          if (fn.length > 1) {
            try {
              return fn(span, (err) => {
                if (err) {
                  closeSpanWithError(span, err, options.endTime);
                } else {
                  span.end(options.endTime);
                }
              });
            } catch (err) {
              closeSpanWithError(span, err, options.endTime);
              throw err;
            } finally {
              onCleanup();
            }
          }
          try {
            const result = fn(span);
            if ((0, _isthenable.isThenable)(result)) {
              return result.then((res) => {
                span.end(options.endTime);
                return res;
              }).catch((err) => {
                closeSpanWithError(span, err, options.endTime);
                throw err;
              }).finally(onCleanup);
            } else {
              span.end(options.endTime);
              onCleanup();
            }
            return result;
          } catch (err) {
            closeSpanWithError(span, err, options.endTime);
            onCleanup();
            throw err;
          }
        }));
      }
      runWithActiveSpan(spanName, options, parentContext, tracingEnabled, localSpanRecordingEnabled, isolatedParentSpan, fn) {
        if (tracingEnabled) {
          return this.getTracerInstance().startActiveSpan(spanName, options, (span2) => fn(localSpanRecordingEnabled ? this.createLocalRecordingSpan(spanName, options, parentContext, span2, isolatedParentSpan) : span2));
        }
        const span = this.createLocalRecordingSpan(spanName, options, parentContext, void 0, isolatedParentSpan);
        const localSpanRecorder = getLocalSpanRecorder();
        return localSpanRecorder.withLocalSpan(span, () => localSpanRecorder.isOpenTelemetryIsolatedSpan(span) ? fn(span) : context.with(trace.setSpan(context.active(), span), fn, void 0, span));
      }
      createLocalRecordingSpan(name, options, parentContext, delegateSpan, isolatedParentSpan) {
        const parentSpanContext = (isolatedParentSpan == null ? void 0 : isolatedParentSpan.spanContext()) ?? trace.getSpanContext(parentContext);
        const delegateSpanContext = delegateSpan == null ? void 0 : delegateSpan.spanContext();
        return getLocalSpanRecorder().createLocalSpan({
          name,
          attributes: options.attributes,
          links: options.links,
          startTime: options.startTime,
          delegateSpan,
          traceId: (delegateSpanContext == null ? void 0 : delegateSpanContext.traceId) ?? (parentSpanContext == null ? void 0 : parentSpanContext.traceId),
          spanId: delegateSpanContext == null ? void 0 : delegateSpanContext.spanId,
          parentSpanId: parentSpanContext == null ? void 0 : parentSpanContext.spanId,
          isolateOpenTelemetry: isolatedParentSpan !== void 0
        });
      }
      wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
          args[0],
          {},
          args[1]
        ];
        if (!_constants.NextVanillaSpanAllowlist.has(name) && process.env.NEXT_OTEL_VERBOSE !== "1" && !process.env.__NEXT_DEV_SERVER) {
          return fn;
        }
        return function() {
          let optionsObj = options;
          if (typeof optionsObj === "function" && typeof fn === "function") {
            optionsObj = optionsObj.apply(this, arguments);
          }
          const lastArgId = arguments.length - 1;
          const cb = arguments[lastArgId];
          if (typeof cb === "function") {
            const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
            return tracer.trace(name, optionsObj, (_span, done) => {
              arguments[lastArgId] = function(err) {
                done == null ? void 0 : done(err);
                return scopeBoundCb.apply(this, arguments);
              };
              return fn.apply(this, arguments);
            });
          } else {
            return tracer.trace(name, optionsObj, () => fn.apply(this, arguments));
          }
        };
      }
      startSpan(...args) {
        const [type, passedOptions] = args;
        const options = passedOptions ? {
          ...passedOptions,
          attributes: {
            "next.span_category": "nextjs",
            ...passedOptions.attributes
          }
        } : {
          attributes: {
            "next.span_category": "nextjs"
          }
        };
        const localSpanRecorder = getLocalSpanRecorder();
        const parentSpan = options.parentSpan ?? this.getActiveScopeSpan();
        const isolatedParentSpan = parentSpan && (localSpanRecorder == null ? void 0 : localSpanRecorder.isOpenTelemetryIsolatedSpan(parentSpan)) ? parentSpan : void 0;
        const parentContext = (isolatedParentSpan ? void 0 : this.getSpanContext(parentSpan)) ?? context.active();
        const localSpanRecordingEnabled = (localSpanRecorder == null ? void 0 : localSpanRecorder.isLocalSpanRecordingEnabled()) ?? false;
        if (!localSpanRecordingEnabled) {
          return this.getTracerInstance().startSpan(type, options, parentContext);
        }
        const delegateSpan = !isolatedParentSpan && this.isOpenTelemetryEnabled() ? this.getTracerInstance().startSpan(type, options, parentContext) : void 0;
        return this.createLocalRecordingSpan(type, options, parentContext, delegateSpan, isolatedParentSpan);
      }
      getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : void 0;
        return spanContext;
      }
      getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
      }
      setRootSpanAttribute(key, value) {
        const spanId = context.active().getValue(rootSpanIdKey);
        const attributes = rootSpanAttributesStore.get(spanId);
        if (attributes && !attributes.has(key)) {
          attributes.set(key, value);
        }
        if (process.env.__NEXT_DEV_SERVER) {
          var _getLocalSpanRecorder;
          const localSpan = (_getLocalSpanRecorder = getLocalSpanRecorder()) == null ? void 0 : _getLocalSpanRecorder.getActiveLocalSpan();
          if (localSpan) {
            localSpan.setAttribute(key, value);
          }
        }
      }
      withSpan(span, fn) {
        const recorder = getLocalSpanRecorder();
        if (recorder == null ? void 0 : recorder.isLocalRecordingSpan(span)) {
          return recorder.withLocalSpan(span, () => recorder.isOpenTelemetryIsolatedSpan(span) ? fn() : context.with(trace.setSpan(context.active(), span), fn));
        }
        return context.with(trace.setSpan(context.active(), span), fn);
      }
    };
    var getTracer = (() => {
      const tracer = new NextTracerImpl();
      return () => tracer;
    })();
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/router-utils/instrumentation-globals.external.js
var require_instrumentation_globals_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/lib/router-utils/instrumentation-globals.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      ensureInstrumentationRegistered: function() {
        return ensureInstrumentationRegistered;
      },
      ensureInstrumentationRegisteredWithDeferredSpans: function() {
        return ensureInstrumentationRegisteredWithDeferredSpans;
      },
      getInstrumentationModule: function() {
        return getInstrumentationModule;
      },
      instrumentationOnRequestError: function() {
        return instrumentationOnRequestError;
      }
    });
    var _nodepath = /* @__PURE__ */ _interop_require_default(require_node_path());
    var _iserror = /* @__PURE__ */ _interop_require_default(require_is_error());
    var _constants = require_constants();
    var _interopdefault = require_interop_default();
    var _instrumentationnodeextensions = require_instrumentation_node_extensions();
    var _tracer = require_tracer();
    var _constants1 = require_constants2();
    function _interop_require_default(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var cachedInstrumentationModule;
    var instrumentationModuleLoadTiming;
    function getInstrumentationTimestamp() {
      return performance.timeOrigin + performance.now();
    }
    function traceBackdatedInstrumentationSpan({ type, spanName, timing: { startTime, endTime, error: error2 } }) {
      (0, _tracer.getTracer)().trace(type, {
        spanName,
        startTime,
        endTime
      }, error2 === void 0 ? () => void 0 : (span) => {
        span == null ? void 0 : span.recordException(error2);
        if ((0, _iserror.default)(error2)) {
          span == null ? void 0 : span.setAttribute("error.type", error2.name);
        }
        span == null ? void 0 : span.setStatus({
          code: _tracer.SpanStatusCode.ERROR,
          message: (0, _iserror.default)(error2) ? error2.message : void 0
        });
      });
    }
    function takeInstrumentationModuleLoadSpan() {
      if (!instrumentationModuleLoadTiming) return void 0;
      const timing = instrumentationModuleLoadTiming;
      instrumentationModuleLoadTiming = void 0;
      return {
        type: _constants1.InstrumentationSpan.loadModule,
        spanName: "load instrumentation module",
        timing
      };
    }
    function traceInstrumentationModuleLoad() {
      const span = takeInstrumentationModuleLoadSpan();
      if (span) {
        traceBackdatedInstrumentationSpan(span);
      }
    }
    async function getInstrumentationModule(projectDir, distDir) {
      if (cachedInstrumentationModule) {
        return cachedInstrumentationModule;
      }
      const startTime = getInstrumentationTimestamp();
      let error2;
      try {
        cachedInstrumentationModule = null;
        return cachedInstrumentationModule;
      } catch (err) {
        if ((0, _iserror.default)(err) && err.code !== "ENOENT" && err.code !== "MODULE_NOT_FOUND" && err.code !== "ERR_MODULE_NOT_FOUND") {
          error2 = err;
          throw err;
        }
      } finally {
        instrumentationModuleLoadTiming ??= {
          startTime,
          endTime: getInstrumentationTimestamp(),
          error: error2
        };
      }
    }
    var instrumentationModulePromise = null;
    async function registerInstrumentation(projectDir, distDir, deferredSpans) {
      if (process.env.NEXT_PHASE === "phase-production-build") {
        return;
      }
      if (!instrumentationModulePromise) {
        instrumentationModulePromise = getInstrumentationModule(projectDir, distDir);
      }
      let instrumentation;
      try {
        instrumentation = await instrumentationModulePromise;
      } catch (err) {
        traceInstrumentationModuleLoad();
        throw err;
      }
      if (instrumentation == null ? void 0 : instrumentation.register) {
        const startTime = getInstrumentationTimestamp();
        let error2;
        let registered = false;
        try {
          await instrumentation.register();
          (0, _instrumentationnodeextensions.afterRegistration)();
          registered = true;
        } catch (err) {
          error2 = err;
          err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
          throw err;
        } finally {
          const endTime = getInstrumentationTimestamp();
          const spans = [
            takeInstrumentationModuleLoadSpan(),
            {
              type: _constants1.InstrumentationSpan.register,
              spanName: "register instrumentation",
              timing: {
                startTime,
                endTime,
                error: error2
              }
            }
          ].filter((span) => span !== void 0);
          if (deferredSpans && registered) {
            deferredSpans.push(...spans);
          } else {
            spans.forEach(traceBackdatedInstrumentationSpan);
          }
        }
      } else {
        const span = takeInstrumentationModuleLoadSpan();
        if (span) {
          if (deferredSpans) {
            deferredSpans.push(span);
          } else {
            traceBackdatedInstrumentationSpan(span);
          }
        }
      }
    }
    async function instrumentationOnRequestError(projectDir, distDir, ...args) {
      const instrumentation = await getInstrumentationModule(projectDir, distDir);
      try {
        var _instrumentation_onRequestError;
        await (instrumentation == null ? void 0 : (_instrumentation_onRequestError = instrumentation.onRequestError) == null ? void 0 : _instrumentation_onRequestError.call(instrumentation, ...args));
      } catch (err) {
        console.error("Error in instrumentation.onRequestError:", err);
      }
    }
    var registerInstrumentationPromise = null;
    function ensureInstrumentationRegistered(projectDir, distDir) {
      if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation(projectDir, distDir);
      }
      return registerInstrumentationPromise;
    }
    async function ensureInstrumentationRegisteredWithDeferredSpans(projectDir, distDir) {
      if (registerInstrumentationPromise) {
        await registerInstrumentationPromise;
        return void 0;
      }
      const deferredSpans = [];
      registerInstrumentationPromise = registerInstrumentation(projectDir, distDir, deferredSpans);
      await registerInstrumentationPromise;
      if (deferredSpans.length === 0) {
        return void 0;
      }
      return () => {
        deferredSpans.splice(0).forEach(traceBackdatedInstrumentationSpan);
      };
    }
  }
});

// node-builtins:node:async_hooks
import * as mod4 from "node:async_hooks";
var require_node_async_hooks = __commonJS({
  "node-builtins:node:async_hooks"(exports, module) {
    module.exports = mod4.default ?? mod4;
  }
});

// .open-next/middleware/.next/server/chunks/[root-of-the-server]__17apu0aa5snhb._.js
var require_root_of_the_server_17apu0aa5snhb = __commonJS({
  ".open-next/middleware/.next/server/chunks/[root-of-the-server]__17apu0aa5snhb._.js"(exports, module) {
    "use strict";
    module.exports = [21025, (e, t, r) => {
      t.exports = e.x("next/dist/build/adapter/setup-node-env.external.js", () => require_setup_node_env_external());
    }, 96476, (e, t, r) => {
      t.exports = e.x("next/dist/server/lib/incremental-cache/memory-cache.external.js", () => require_memory_cache_external());
    }, 55292, (e, t, r) => {
      t.exports = e.x("next/dist/server/lib/incremental-cache/shared-cache-controls.external.js", () => require_shared_cache_controls_external());
    }, 51187, (e, t, r) => {
      t.exports = e.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require_tags_manifest_external());
    }, 94533, (e, t, r) => {
      t.exports = e.x("next/dist/server/lib/router-utils/instrumentation-globals.external.js", () => require_instrumentation_globals_external());
    }, 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => require_node_async_hooks());
    }, 50227, (e, t, r) => {
      t.exports = e.x("node:path", () => require_node_path());
    }, 72463, (e, t, r) => {
      "use strict";
      let n;
      Object.defineProperty(r, "__esModule", { value: true }), r.format = function(e2) {
        let { type: t2, parameters: r2 } = e2;
        if (!t2 || !s.test(t2)) throw TypeError(`Invalid type: ${t2}`);
        let n2 = t2;
        if (r2) for (let e3 of Object.keys(r2)) {
          if (!i.test(e3)) throw TypeError(`Invalid parameter name: ${e3}`);
          n2 += `; ${e3}=${(function(e4) {
            if (i.test(e4)) return e4;
            if (a.test(e4)) return `"${e4.replace(o, "\\$&")}"`;
            throw TypeError(`Invalid parameter value: ${e4}`);
          })(r2[e3])}`;
        }
        return n2;
      }, r.parse = function(e2, t2) {
        let r2 = t2?.comma === true ? c : 65536, n2 = e2.length, a2 = d(e2, t2?.start ?? 0, n2), i2 = a2;
        a2 = u(e2, a2, n2, r2);
        let o2 = h(e2, i2, a2), s2 = e2.slice(i2, o2).toLowerCase();
        return t2?.parameters === false ? { type: s2, index: a2, parameters: new l() } : (function(e3, t3, r3, n3, a3) {
          let i3 = new l();
          e: for (; r3 < n3 && e3.charCodeAt(r3) !== a3; ) {
            let t4 = r3 = d(e3, r3 + 1, n3);
            for (; r3 < n3; ) {
              let o3 = e3.charCodeAt(r3);
              if (o3 === a3) break e;
              if (59 === o3) continue e;
              if (61 === o3) {
                let o4 = h(e3, t4, r3), s3 = e3.slice(t4, o4).toLowerCase();
                if ((r3 = d(e3, r3 + 1, n3)) < n3 && 34 === e3.charCodeAt(r3)) {
                  r3++;
                  let t5 = "";
                  for (; r3 < n3; ) {
                    let o5 = e3.charCodeAt(r3++);
                    if (34 === o5) {
                      r3 = u(e3, r3, n3, a3), void 0 === i3[s3] && (i3[s3] = t5);
                      break;
                    }
                    if (92 === o5 && r3 < n3) {
                      t5 += e3[r3++];
                      continue;
                    }
                    t5 += String.fromCharCode(o5);
                  }
                  continue e;
                }
                let l2 = r3;
                if (r3 = u(e3, r3, n3, a3), void 0 === i3[s3]) {
                  let t5 = h(e3, l2, r3);
                  i3[s3] = e3.slice(l2, t5);
                }
                continue e;
              }
              r3++;
            }
          }
          return { type: t3, index: r3, parameters: i3 };
        })(e2, s2, a2, n2, r2);
      };
      let a = /^[\u0009\u0020-\u007e\u0080-\u00ff]*$/, i = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/, o = /[\\"]/g, s = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/, l = ((n = function() {
      }).prototype = /* @__PURE__ */ Object.create(null), n), c = 44;
      function u(e2, t2, r2, n2) {
        for (; t2 < r2; ) {
          let r3 = e2.charCodeAt(t2);
          if (59 === r3 || r3 === n2) break;
          t2++;
        }
        return t2;
      }
      function d(e2, t2, r2) {
        for (; t2 < r2; ) {
          let r3 = e2.charCodeAt(t2);
          if (32 !== r3 && 9 !== r3) break;
          t2++;
        }
        return t2;
      }
      function h(e2, t2, r2) {
        for (; r2 > t2; ) {
          let t3 = e2.charCodeAt(r2 - 1);
          if (32 !== t3 && 9 !== t3) break;
          r2--;
        }
        return r2;
      }
    }, 57183, (e, t, r) => {
      "use strict";
      var n = e.r(18306), a = e.r(62616), i = e.r(34418), o = e.r(2255);
      function s(e2) {
        if (!(this instanceof s)) return new s(e2);
        this.request = e2;
      }
      t.exports = s, t.exports.Negotiator = s, s.prototype.charset = function(e2) {
        var t2 = this.charsets(e2);
        return t2 && t2[0];
      }, s.prototype.charsets = function(e2) {
        return n(this.request.headers["accept-charset"], e2);
      }, s.prototype.encoding = function(e2, t2) {
        var r2 = this.encodings(e2, t2);
        return r2 && r2[0];
      }, s.prototype.encodings = function(e2, t2) {
        return a(this.request.headers["accept-encoding"], e2, (t2 || {}).preferred);
      }, s.prototype.language = function(e2) {
        var t2 = this.languages(e2);
        return t2 && t2[0];
      }, s.prototype.languages = function(e2) {
        return i(this.request.headers["accept-language"], e2);
      }, s.prototype.mediaType = function(e2) {
        var t2 = this.mediaTypes(e2);
        return t2 && t2[0];
      }, s.prototype.mediaTypes = function(e2) {
        return o(this.request.headers.accept, e2);
      }, s.prototype.preferredCharset = s.prototype.charset, s.prototype.preferredCharsets = s.prototype.charsets, s.prototype.preferredEncoding = s.prototype.encoding, s.prototype.preferredEncodings = s.prototype.encodings, s.prototype.preferredLanguage = s.prototype.language, s.prototype.preferredLanguages = s.prototype.languages, s.prototype.preferredMediaType = s.prototype.mediaType, s.prototype.preferredMediaTypes = s.prototype.mediaTypes;
    }, 47369, (e, t, r) => {
      "use strict";
      var n = e.r(72463);
      t.exports = function(e2) {
        for (var t2 = [], r2 = 0; r2 < e2.length; ) {
          var a = (function(e3, t3) {
            for (var r3 = t3; 32 === e3.charCodeAt(r3) || 9 === e3.charCodeAt(r3); ) r3++;
            return r3;
          })(e2, r2), i = n.parse(e2, { comma: true, start: a });
          i.type = e2.slice(a, a + i.type.length), t2.push(i), r2 = i.index + 1;
        }
        return t2;
      };
    }, 18306, (e, t, r) => {
      "use strict";
      var n = e.r(47369);
      function a(e2, t2) {
        var r2 = (function(e3) {
          for (var t3 = n(e3), r3 = 0, a3 = 0; r3 < t3.length; r3++) {
            var i2, o2, s2 = (i2 = t3[r3], o2 = r3, i2.type ? { charset: i2.type, q: i2.parameters.q ? parseFloat(i2.parameters.q) : 1, i: o2 } : null);
            s2 && (t3[a3++] = s2);
          }
          return t3.length = a3, t3;
        })(void 0 === e2 ? "*" : e2 || "");
        if (!t2) return r2.filter(s).sort(i).map(o);
        var a2 = t2.map(function(e3, t3) {
          for (var n2 = { o: -1, q: 0, s: 0 }, a3 = 0; a3 < r2.length; a3++) {
            var i2 = (function(e4, t4, r3) {
              var n3 = 0;
              if (t4.charset.toLowerCase() === e4.toLowerCase()) n3 |= 1;
              else if ("*" !== t4.charset) return null;
              return { i: r3, o: t4.i, q: t4.q, s: n3 };
            })(e3, r2[a3], t3);
            i2 && 0 > (n2.s - i2.s || n2.q - i2.q || n2.o - i2.o) && (n2 = i2);
          }
          return n2;
        });
        return a2.filter(s).sort(i).map(function(e3) {
          return t2[a2.indexOf(e3)];
        });
      }
      function i(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function o(e2) {
        return e2.charset;
      }
      function s(e2) {
        return e2.q > 0;
      }
      t.exports = a, t.exports.preferredCharsets = a;
    }, 62616, (e, t, r) => {
      "use strict";
      var n = e.r(47369);
      function a(e2, t2, r2) {
        var n2 = 0;
        if (t2.encoding.toLowerCase() === e2.toLowerCase()) n2 |= 1;
        else if ("*" !== t2.encoding) return null;
        return { encoding: e2, i: r2, o: t2.i, q: t2.q, s: n2 };
      }
      function i(e2, t2, r2) {
        var i2 = (function(e3) {
          for (var t3 = n(e3), r3 = false, i3 = 1, o2 = 0, s2 = 0; o2 < t3.length; o2++) {
            var l2, c2, u2 = (l2 = t3[o2], c2 = o2, l2.type ? { encoding: l2.type, q: l2.parameters.q ? parseFloat(l2.parameters.q) : 1, i: c2 } : null);
            u2 && (t3[s2++] = u2, r3 = r3 || a("identity", u2), i3 = Math.min(i3, u2.q || 1));
          }
          return r3 || (t3[s2++] = { encoding: "identity", q: i3, i: o2 }), t3.length = s2, t3;
        })(e2 || ""), c = r2 ? function(e3, t3) {
          if (e3.q !== t3.q) return t3.q - e3.q;
          var n2 = r2.indexOf(e3.encoding), a2 = r2.indexOf(t3.encoding);
          return -1 === n2 && -1 === a2 ? t3.s - e3.s || e3.o - t3.o || e3.i - t3.i : -1 !== n2 && -1 !== a2 ? n2 - a2 : -1 === n2 ? 1 : -1;
        } : o;
        if (!t2) return i2.filter(l).sort(c).map(s);
        var u = t2.map(function(e3, t3) {
          for (var r3 = { encoding: e3, o: -1, q: 0, s: 0 }, n2 = 0; n2 < i2.length; n2++) {
            var o2 = a(e3, i2[n2], t3);
            o2 && 0 > (r3.s - o2.s || r3.q - o2.q || r3.o - o2.o) && (r3 = o2);
          }
          return r3;
        });
        return u.filter(l).sort(c).map(function(e3) {
          return t2[u.indexOf(e3)];
        });
      }
      function o(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i;
      }
      function s(e2) {
        return e2.encoding;
      }
      function l(e2) {
        return e2.q > 0;
      }
      t.exports = i, t.exports.preferredEncodings = i;
    }, 34418, (e, t, r) => {
      "use strict";
      var n = e.r(72463), a = e.r(47369);
      function i(e2, t2) {
        if (!e2.type) return null;
        var r2 = e2.type.indexOf("-");
        return { prefix: -1 === r2 ? e2.type : e2.type.slice(0, r2), suffix: -1 === r2 ? void 0 : e2.type.slice(r2 + 1), q: e2.parameters.q ? parseFloat(e2.parameters.q) : 1, i: t2, full: e2.type };
      }
      function o(e2, t2) {
        var r2 = (function(e3) {
          for (var t3 = a(e3), r3 = 0, n2 = 0; r3 < t3.length; r3++) {
            var o3 = i(t3[r3], r3);
            o3 && (t3[n2++] = o3);
          }
          return t3.length = n2, t3;
        })(void 0 === e2 ? "*" : e2 || "");
        if (!t2) return r2.filter(c).sort(s).map(l);
        var o2 = t2.map(function(e3, t3) {
          for (var a2 = { o: -1, q: 0, s: 0 }, o3 = 0; o3 < r2.length; o3++) {
            var s2 = (function(e4, t4, r3) {
              var a3 = i(n.parse(e4), 0);
              if (!a3) return null;
              var o4 = 0;
              if (t4.full.toLowerCase() === a3.full.toLowerCase()) o4 |= 4;
              else if (t4.prefix.toLowerCase() === a3.full.toLowerCase()) o4 |= 2;
              else if (t4.full.toLowerCase() === a3.prefix.toLowerCase()) o4 |= 1;
              else if ("*" !== t4.full) return null;
              return { i: r3, o: t4.i, q: t4.q, s: o4 };
            })(e3, r2[o3], t3);
            s2 && 0 > (a2.s - s2.s || a2.q - s2.q || a2.o - s2.o) && (a2 = s2);
          }
          return a2;
        });
        return o2.filter(c).sort(s).map(function(e3) {
          return t2[o2.indexOf(e3)];
        });
      }
      function s(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function l(e2) {
        return e2.full;
      }
      function c(e2) {
        return e2.q > 0;
      }
      t.exports = o, t.exports.preferredLanguages = o;
    }, 2255, (e, t, r) => {
      "use strict";
      var n = e.r(72463), a = e.r(47369);
      function i(e2, t2) {
        var r2 = e2.type.indexOf("/");
        if (-1 === r2) return null;
        var n2 = e2.parameters.q ? parseFloat(e2.parameters.q) : 1;
        return delete e2.parameters.q, { type: e2.type.slice(0, r2), subtype: e2.type.slice(r2 + 1), params: e2.parameters, q: n2, i: t2 };
      }
      function o(e2, t2) {
        var r2 = (function(e3) {
          for (var t3 = a(e3), r3 = 0, n2 = 0; r3 < t3.length; r3++) {
            var o3 = i(t3[r3], r3);
            o3 && (t3[n2++] = o3);
          }
          return t3.length = n2, t3;
        })(void 0 === e2 ? "*/*" : e2 || "");
        if (!t2) return r2.filter(c).sort(s).map(l);
        var o2 = t2.map(function(e3, t3) {
          for (var a2 = { o: -1, q: 0, s: 0 }, o3 = 0; o3 < r2.length; o3++) {
            var s2 = (function(e4, t4, r3) {
              var a3 = i(n.parse(e4), 0), o4 = 0;
              if (!a3) return null;
              if (t4.type.toLowerCase() == a3.type.toLowerCase()) o4 |= 4;
              else if ("*" != t4.type) return null;
              if (t4.subtype.toLowerCase() == a3.subtype.toLowerCase()) o4 |= 2;
              else if ("*" != t4.subtype) return null;
              var s3 = Object.keys(t4.params);
              if (s3.length > 0) if (!s3.every(function(e5) {
                return "*" == t4.params[e5] || (t4.params[e5] || "").toLowerCase() == (a3.params[e5] || "").toLowerCase();
              })) return null;
              else o4 |= 1;
              return { i: r3, o: t4.i, q: t4.q, s: o4 };
            })(e3, r2[o3], t3);
            s2 && 0 > (a2.s - s2.s || a2.q - s2.q || a2.o - s2.o) && (a2 = s2);
          }
          return a2;
        });
        return o2.filter(c).sort(s).map(function(e3) {
          return t2[o2.indexOf(e3)];
        });
      }
      function s(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function l(e2) {
        return e2.type + "/" + e2.subtype;
      }
      function c(e2) {
        return e2.q > 0;
      }
      t.exports = o, t.exports.preferredMediaTypes = o;
    }, 51181, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { DynamicServerError: function() {
        return o;
      }, isDynamicServerError: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = "DYNAMIC_SERVER_USAGE";
      class o extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = i;
        }
      }
      function s(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === i;
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 37986, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { StaticGenBailoutError: function() {
        return o;
      }, isStaticGenBailoutError: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = "NEXT_STATIC_GEN_BAILOUT";
      class o extends Error {
        constructor(...e2) {
          super(...e2), this.code = i;
        }
      }
      function s(e2) {
        return "object" == typeof e2 && null !== e2 && "code" in e2 && e2.code === i;
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 81984, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, a = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => g, ResponseCookies: () => _, parseCookie: () => d, parseSetCookie: () => h, stringifyCookie: () => u };
      for (var c in l) n(s, c, { get: l[c], enumerable: true });
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, a2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != a2 ? a2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function h(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = d(e2), { domain: a2, expires: i2, httponly: o2, maxage: s2, path: l2, samesite: c2, secure: u2, partitioned: h2, priority: g2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var _2, m, y = { name: t2, value: decodeURIComponent(r2), domain: a2, ...i2 && { expires: new Date(i2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...c2 && { sameSite: f.includes(_2 = (_2 = c2).toLowerCase()) ? _2 : void 0 }, ...u2 && { secure: true }, ...g2 && { priority: p.includes(m = (m = g2).toLowerCase()) ? m : void 0 }, ...h2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in y) y[t3] && (e3[t3] = y[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let s2 of i(t2)) o.call(e2, s2) || void 0 === s2 || n(e2, s2, { get: () => t2[s2], enumerable: !(r2 = a(t2, s2)) || r2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var f = ["strict", "lax", "none"], p = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, _ = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let a2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(a2) ? a2 : (function(e4) {
            if (!e4) return [];
            var t3, r3, n3, a3, i2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), a3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (i2 = true, s2 = a3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!i2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          })(a2)) {
            let t3 = h(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, a2 = this._parsed;
          return a2.set(t2, (function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          })({ name: t2, value: r2, ...n2 })), (function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          })(a2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 40289, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, a, i, o;
        var s, l, c, u, d, h, f, p, g, _, m, y, v, b, w, S, x = { 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(108), a2 = r3(221), i2 = r3(44), o2 = "context", s2 = new n2.NoopContextManager();
          t2.ContextAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalContextManager(e4) {
              return (0, a2.registerGlobal)(o2, e4, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e4, t3, r4, ...n3) {
              return this._getContextManager().with(e4, t3, r4, ...n3);
            }
            bind(e4, t3) {
              return this._getContextManager().bind(e4, t3);
            }
            _getContextManager() {
              return (0, a2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, a2.unregisterGlobal)(o2, i2.DiagAPI.instance());
            }
          };
        }, 44: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(757), a2 = r3(412), i2 = r3(711), o2 = r3(221);
          t2.DiagAPI = class e3 {
            constructor() {
              function e4(e5) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e5](...t4);
                };
              }
              let t3 = this;
              t3.setLogger = (e5, r4 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var n3, s2, l2;
                if (e5 === t3) {
                  let e6 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e6.stack) ? n3 : e6.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, o2.getGlobal)("diag"), u2 = (0, a2.createLogLevelDiagLogger)(null != (s2 = r4.logLevel) ? s2 : i2.DiagLogLevel.INFO, e5);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e6 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e6}`), u2.warn(`Current logger will overwrite one already registered from ${e6}`);
                }
                return (0, o2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e5) => new n2.DiagComponentLogger(e5), t3.verbose = e4("verbose"), t3.debug = e4("debug"), t3.info = e4("info"), t3.warn = e4("warn"), t3.error = e4("error");
            }
            static instance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
          };
        }, 262: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(586), a2 = r3(221), i2 = r3(44), o2 = "metrics";
          t2.MetricsAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalMeterProvider(e4) {
              return (0, a2.registerGlobal)(o2, e4, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, a2.getGlobal)(o2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e4, t3, r4) {
              return this.getMeterProvider().getMeter(e4, t3, r4);
            }
            disable() {
              (0, a2.unregisterGlobal)(o2, i2.DiagAPI.instance());
            }
          };
        }, 25: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(221), a2 = r3(19), i2 = r3(92), o2 = r3(398), s2 = r3(504), l2 = r3(44), c2 = "propagation", u2 = new a2.NoopTextMapPropagator();
          t2.PropagationAPI = class e3 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalPropagator(e4) {
              return (0, n2.registerGlobal)(c2, e4, l2.DiagAPI.instance());
            }
            inject(e4, t3, r4 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e4, t3, r4);
            }
            extract(e4, t3, r4 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e4, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c2) || u2;
            }
          };
        }, 397: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(221), a2 = r3(498), i2 = r3(477), o2 = r3(793), s2 = r3(44), l2 = "trace";
          t2.TraceAPI = class e3 {
            constructor() {
              this._proxyTracerProvider = new a2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalTracerProvider(e4) {
              let t3 = (0, n2.registerGlobal)(l2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e4), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e4, t3) {
              return this.getTracerProvider().getTracer(e4, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, s2.DiagAPI.instance()), this._proxyTracerProvider = new a2.ProxyTracerProvider();
            }
          };
        }, 398: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(912), a2 = (0, r3(23).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(a2) || void 0;
          }
          t2.getBaggage = i2, t2.getActiveBaggage = function() {
            return i2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(a2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(a2);
          };
        }, 152: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0, t2.BaggageImpl = class e3 {
            constructor(e4) {
              this._entries = e4 ? new Map(e4) : /* @__PURE__ */ new Map();
            }
            getEntry(e4) {
              let t3 = this._entries.get(e4);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e4, t3]) => [e4, t3]);
            }
            setEntry(t3, r3) {
              let n2 = new e3(this._entries);
              return n2._entries.set(t3, r3), n2;
            }
            removeEntry(t3) {
              let r3 = new e3(this._entries);
              return r3._entries.delete(t3), r3;
            }
            removeEntries(...t3) {
              let r3 = new e3(this._entries);
              for (let e4 of t3) r3._entries.delete(e4);
              return r3;
            }
            clear() {
              return new e3();
            }
          };
        }, 647: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = /* @__PURE__ */ Symbol("BaggageEntryMetadata");
        }, 504: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(44), a2 = r3(152), i2 = r3(647), o2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new a2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 778: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(912).ContextAPI.getInstance();
        }, 108: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(23);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 23: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          }, t2.ROOT_CONTEXT = new class e3 {
            constructor(t3) {
              let r3 = this;
              r3._currentContext = t3 ? new Map(t3) : /* @__PURE__ */ new Map(), r3.getValue = (e4) => r3._currentContext.get(e4), r3.setValue = (t4, n2) => {
                let a2 = new e3(r3._currentContext);
                return a2._currentContext.set(t4, n2), a2;
              }, r3.deleteValue = (t4) => {
                let n2 = new e3(r3._currentContext);
                return n2._currentContext.delete(t4), n2;
              };
            }
          }();
        }, 304: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(44).DiagAPI.instance();
        }, 757: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(221);
          function a2(e3, t3, r4) {
            let a3 = (0, n2.getGlobal)("diag");
            if (a3) return r4.unshift(t3), a3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return a2("debug", this._namespace, e3);
            }
            error(...e3) {
              return a2("error", this._namespace, e3);
            }
            info(...e3) {
              return a2("info", this._namespace, e3);
            }
            warn(...e3) {
              return a2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return a2("verbose", this._namespace, e3);
            }
          };
        }, 83: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ (function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              })(r3[e3].c);
            }
          };
        }, 412: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(711);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let a2 = t3[r5];
              return "function" == typeof a2 && e3 >= n3 ? a2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 711: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 221: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(678), a2 = r3(652), i2 = r3(662), o2 = a2.VERSION.split(".")[0], s2 = /* @__PURE__ */ Symbol.for(`opentelemetry.js.api.${o2}`), l2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var i3;
            let o3 = l2[s2] = null != (i3 = l2[s2]) ? i3 : { version: a2.VERSION };
            if (!n3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== a2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${a2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${a2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (n3 && (0, i2.isCompatible)(n3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${a2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 662: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(652), a2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(a2);
            if (!n3) return () => false;
            let i3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != i3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(a2);
              if (!n4) return o2(e4);
              let s2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s2.prerelease || i3.major !== s2.major) return o2(e4);
              if (0 === i3.major) return i3.minor === s2.minor && i3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return i3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = i2, t2.isCompatible = i2(n2.VERSION);
        }, 120: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(262).MetricsAPI.getInstance();
        }, 532: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 440: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = a2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = i2;
          class o2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class l2 extends s2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class u2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new a2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 586: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(440);
          class a2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = a2, t2.NOOP_METER_PROVIDER = new a2();
        }, 678: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), a2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), a2(r3(59), t2);
        }, 460: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 59: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), a2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), a2(r3(460), t2);
        }, 27: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(25).PropagationAPI.getInstance();
        }, 19: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 92: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 816: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(397).TraceAPI.getInstance();
        }, 374: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(546);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 637: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(912), a2 = r3(793), i2 = r3(374), o2 = r3(477), s2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new i2.NonRecordingSpan();
              let l2 = r4 && (0, a2.getSpanContext)(r4);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o2.isSpanContextValid)(l2) ? new i2.NonRecordingSpan(l2) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i3, o3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (i3 = t3, l2 = r4) : (i3 = t3, o3 = r4, l2 = n3);
              let c2 = null != o3 ? o3 : s2.active(), u2 = this.startSpan(e3, i3, c2), d2 = (0, a2.setSpan)(c2, u2);
              return s2.with(d2, l2, void 0, u2);
            }
          };
        }, 76: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(637);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 779: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(637)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a2 = this._getTracer();
              return Reflect.apply(a2.startActiveSpan, a2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 498: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(779), a2 = new (r3(76)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var a3;
              return null != (a3 = this.getDelegateTracer(e3, t3, r4)) ? a3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : a2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 312: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 793: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(23), a2 = r3(374), i2 = r3(912), o2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(i2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new a2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 285: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(240);
          t2.TraceStateImpl = class e3 {
            constructor(e4) {
              this._internalState = /* @__PURE__ */ new Map(), e4 && this._parse(e4);
            }
            set(e4, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e4) && r4._internalState.delete(e4), r4._internalState.set(e4, t3), r4;
            }
            unset(e4) {
              let t3 = this._clone();
              return t3._internalState.delete(e4), t3;
            }
            get(e4) {
              return this._internalState.get(e4);
            }
            serialize() {
              return this._keys().reduce((e4, t3) => (e4.push(t3 + "=" + this.get(t3)), e4), []).join(",");
            }
            _parse(e4) {
              !(e4.length > 512) && (this._internalState = e4.split(",").reverse().reduce((e5, t3) => {
                let r4 = t3.trim(), a2 = r4.indexOf("=");
                if (-1 !== a2) {
                  let i2 = r4.slice(0, a2), o2 = r4.slice(a2 + 1, t3.length);
                  (0, n2.validateKey)(i2) && (0, n2.validateValue)(o2) && e5.set(i2, o2);
                }
                return e5;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let t3 = new e3();
              return t3._internalState = new Map(this._internalState), t3;
            }
          };
        }, 240: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, a2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, i2 = RegExp(`^(?:${n2}|${a2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return i2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 87: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(285);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 546: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(731);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 613: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 477: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(546), a2 = r3(374), i2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return i2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l2(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new a2.NonRecordingSpan(e3);
          };
        }, 854: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 731: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 652: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, E = {};
        function P(e2) {
          var t2 = E[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = E[e2] = { exports: {} }, n2 = true;
          try {
            x[e2].call(r3.exports, r3, r3.exports, P), n2 = false;
          } finally {
            n2 && delete E[e2];
          }
          return r3.exports;
        }
        P.ab = "/ROOT/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/@opentelemetry/api/";
        var C = {};
        Object.defineProperty(C, "__esModule", { value: true }), C.trace = C.propagation = C.metrics = C.diag = C.context = C.INVALID_SPAN_CONTEXT = C.INVALID_TRACEID = C.INVALID_SPANID = C.isValidSpanId = C.isValidTraceId = C.isSpanContextValid = C.createTraceState = C.TraceFlags = C.SpanStatusCode = C.SpanKind = C.SamplingDecision = C.ProxyTracerProvider = C.ProxyTracer = C.defaultTextMapSetter = C.defaultTextMapGetter = C.ValueType = C.createNoopMeter = C.DiagLogLevel = C.DiagConsoleLogger = C.ROOT_CONTEXT = C.createContextKey = C.baggageEntryMetadataFromString = void 0, s = P(504), Object.defineProperty(C, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = P(23), Object.defineProperty(C, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(C, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = P(83), Object.defineProperty(C, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = P(711), Object.defineProperty(C, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = P(440), Object.defineProperty(C, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), h = P(532), Object.defineProperty(C, "ValueType", { enumerable: true, get: function() {
          return h.ValueType;
        } }), f = P(92), Object.defineProperty(C, "defaultTextMapGetter", { enumerable: true, get: function() {
          return f.defaultTextMapGetter;
        } }), Object.defineProperty(C, "defaultTextMapSetter", { enumerable: true, get: function() {
          return f.defaultTextMapSetter;
        } }), p = P(779), Object.defineProperty(C, "ProxyTracer", { enumerable: true, get: function() {
          return p.ProxyTracer;
        } }), g = P(498), Object.defineProperty(C, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), _ = P(312), Object.defineProperty(C, "SamplingDecision", { enumerable: true, get: function() {
          return _.SamplingDecision;
        } }), m = P(613), Object.defineProperty(C, "SpanKind", { enumerable: true, get: function() {
          return m.SpanKind;
        } }), y = P(854), Object.defineProperty(C, "SpanStatusCode", { enumerable: true, get: function() {
          return y.SpanStatusCode;
        } }), v = P(731), Object.defineProperty(C, "TraceFlags", { enumerable: true, get: function() {
          return v.TraceFlags;
        } }), b = P(87), Object.defineProperty(C, "createTraceState", { enumerable: true, get: function() {
          return b.createTraceState;
        } }), w = P(477), Object.defineProperty(C, "isSpanContextValid", { enumerable: true, get: function() {
          return w.isSpanContextValid;
        } }), Object.defineProperty(C, "isValidTraceId", { enumerable: true, get: function() {
          return w.isValidTraceId;
        } }), Object.defineProperty(C, "isValidSpanId", { enumerable: true, get: function() {
          return w.isValidSpanId;
        } }), S = P(546), Object.defineProperty(C, "INVALID_SPANID", { enumerable: true, get: function() {
          return S.INVALID_SPANID;
        } }), Object.defineProperty(C, "INVALID_TRACEID", { enumerable: true, get: function() {
          return S.INVALID_TRACEID;
        } }), Object.defineProperty(C, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return S.INVALID_SPAN_CONTEXT;
        } }), r2 = P(778), Object.defineProperty(C, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = P(304), Object.defineProperty(C, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), a = P(120), Object.defineProperty(C, "metrics", { enumerable: true, get: function() {
          return a.metrics;
        } }), i = P(27), Object.defineProperty(C, "propagation", { enumerable: true, get: function() {
          return i.propagation;
        } }), o = P(816), Object.defineProperty(C, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), C.default = { context: r2.context, diag: n.diag, metrics: a.metrics, propagation: i.propagation, trace: o.trace }, t.exports = C;
      })();
    }, 28954, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, a, i = {};
        i.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var a2 = {}, i2 = t2.split(n), o = (r3 || {}).decode || e2, s = 0; s < i2.length; s++) {
            var l = i2[s], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == a2[u] && (a2[u] = (function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              })(d, o));
            }
          }
          return a2;
        }, i.serialize = function(e3, t2, n2) {
          var i2 = n2 || {}, o = i2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!a.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !a.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != i2.maxAge) {
            var c = i2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (i2.domain) {
            if (!a.test(i2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + i2.domain;
          }
          if (i2.path) {
            if (!a.test(i2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + i2.path;
          }
          if (i2.expires) {
            if ("function" != typeof i2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + i2.expires.toUTCString();
          }
          if (i2.httpOnly && (l += "; HttpOnly"), i2.secure && (l += "; Secure"), i2.sameSite) switch ("string" == typeof i2.sameSite ? i2.sameSite.toLowerCase() : i2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = i;
      })();
    }, 71791, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, a, i;
        var o = { 234: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function a2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function i2(e4, t3, n3, i3, o3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s3 = new a2(n3, i3 || e4, o3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, n3, a3 = [];
            if (0 === this._eventsCount) return a3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && a3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? a3.concat(Object.getOwnPropertySymbols(e4)) : a3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var a3 = 0, i3 = n3.length, o3 = Array(i3); a3 < i3; a3++) o3[a3] = n3[a3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, a3, i3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var l2, c2, u = this._events[s3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, a3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, a3, i3), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, a3, i3, o3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var h, f = u.length;
              for (c2 = 0; c2 < f; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
                case 1:
                  u[c2].fn.call(u[c2].context);
                  break;
                case 2:
                  u[c2].fn.call(u[c2].context, t3);
                  break;
                case 3:
                  u[c2].fn.call(u[c2].context, t3, n3);
                  break;
                case 4:
                  u[c2].fn.call(u[c2].context, t3, n3, a3);
                  break;
                default:
                  if (!l2) for (h = 1, l2 = Array(d - 1); h < d; h++) l2[h - 1] = arguments[h];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, a3) {
            var i3 = r3 ? r3 + e4 : e4;
            if (!this._events[i3]) return this;
            if (!t3) return o2(this, i3), this;
            var s3 = this._events[i3];
            if (s3.fn) s3.fn !== t3 || a3 && !s3.once || n3 && s3.context !== n3 || o2(this, i3);
            else {
              for (var l2 = 0, c2 = [], u = s3.length; l2 < u; l2++) (s3[l2].fn !== t3 || a3 && !s3[l2].once || n3 && s3[l2].context !== n3) && c2.push(s3[l2]);
              c2.length ? this._events[i3] = 1 === c2.length ? c2[0] : c2 : o2(this, i3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 274: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 294: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, a2 = e4.length;
            for (; a2 > 0; ) {
              let i2 = a2 / 2 | 0, o2 = n2 + i2;
              0 >= r3(e4[o2], t3) ? (n2 = ++o2, a2 -= i2 + 1) : a2 = i2;
            }
            return n2;
          };
        }, 838: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(294);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let a2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(a2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 138: (e3, t2, r3) => {
          let n2 = r3(274);
          class a2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let i2 = (e4, t3, r4) => new Promise((i3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (1 / 0 === t3) return void i3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  i3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new a2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            n2(e4.then(i3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = i2, e3.exports.default = i2, e3.exports.TimeoutError = a2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, n2 = true;
          try {
            o[e3](r3, r3.exports, l), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(234), r2 = l(138), n = l(838), a = () => {
        }, i = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, i2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = a, this._resolveIdle = a, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = 1 / 0 === e3.intervalCap || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = a, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = a, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, a2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && a2(i);
                  });
                  n2(await o3);
                } catch (e4) {
                  a2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }, 13646, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = (function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var n3 = e4[r4];
                if ("*" === n3 || "+" === n3 || "?" === n3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === n3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === n3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === n3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === n3) {
                  for (var a2 = "", i3 = r4 + 1; i3 < e4.length; ) {
                    var o3 = e4.charCodeAt(i3);
                    if (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 90 || o3 >= 97 && o3 <= 122 || 95 === o3) {
                      a2 += e4[i3++];
                      continue;
                    }
                    break;
                  }
                  if (!a2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: a2 }), r4 = i3;
                  continue;
                }
                if ("(" === n3) {
                  var s3 = 1, l2 = "", i3 = r4 + 1;
                  if ("?" === e4[i3]) throw TypeError('Pattern cannot start with "?" at '.concat(i3));
                  for (; i3 < e4.length; ) {
                    if ("\\" === e4[i3]) {
                      l2 += e4[i3++] + e4[i3++];
                      continue;
                    }
                    if (")" === e4[i3]) {
                      if (0 == --s3) {
                        i3++;
                        break;
                      }
                    } else if ("(" === e4[i3] && (s3++, "?" !== e4[i3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(i3));
                    l2 += e4[i3++];
                  }
                  if (s3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = i3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            })(e3), n2 = t3.prefixes, i2 = void 0 === n2 ? "./" : n2, o2 = t3.delimiter, s2 = void 0 === o2 ? "/#?" : o2, l = [], c = 0, u = 0, d = "", h = function(e4) {
              if (u < r3.length && r3[u].type === e4) return r3[u++].value;
            }, f = function(e4) {
              var t4 = h(e4);
              if (void 0 !== t4) return t4;
              var n3 = r3[u], a2 = n3.type, i3 = n3.index;
              throw TypeError("Unexpected ".concat(a2, " at ").concat(i3, ", expected ").concat(e4));
            }, p = function() {
              for (var e4, t4 = ""; e4 = h("CHAR") || h("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, g = function(e4) {
              for (var t4 = 0; t4 < s2.length; t4++) {
                var r4 = s2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, _ = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || g(r4) ? "[^".concat(a(s2), "]+?") : "(?:(?!".concat(a(r4), ")[^").concat(a(s2), "])+?");
            }; u < r3.length; ) {
              var m = h("CHAR"), y = h("NAME"), v = h("PATTERN");
              if (y || v) {
                var b = m || "";
                -1 === i2.indexOf(b) && (d += b, b = ""), d && (l.push(d), d = ""), l.push({ name: y || c++, prefix: b, suffix: "", pattern: v || _(b), modifier: h("MODIFIER") || "" });
                continue;
              }
              var w = m || h("ESCAPED_CHAR");
              if (w) {
                d += w;
                continue;
              }
              if (d && (l.push(d), d = ""), h("OPEN")) {
                var b = p(), S = h("NAME") || "", x = h("PATTERN") || "", E = p();
                f("CLOSE"), l.push({ name: S || (x ? c++ : ""), pattern: S && !x ? _(b) : x, prefix: b, suffix: E, modifier: h("MODIFIER") || "" });
                continue;
              }
              f("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = i(t3), n2 = t3.encode, a2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2, o2 = t3.validate, s2 = void 0 === o2 || o2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", n3 = 0; n3 < e3.length; n3++) {
                var i2 = e3[n3];
                if ("string" == typeof i2) {
                  r4 += i2;
                  continue;
                }
                var o3 = t4 ? t4[i2.name] : void 0, c = "?" === i2.modifier || "*" === i2.modifier, u = "*" === i2.modifier || "+" === i2.modifier;
                if (Array.isArray(o3)) {
                  if (!u) throw TypeError('Expected "'.concat(i2.name, '" to not repeat, but got an array'));
                  if (0 === o3.length) {
                    if (c) continue;
                    throw TypeError('Expected "'.concat(i2.name, '" to not be empty'));
                  }
                  for (var d = 0; d < o3.length; d++) {
                    var h = a2(o3[d], i2);
                    if (s2 && !l[n3].test(h)) throw TypeError('Expected all "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(h, '"'));
                    r4 += i2.prefix + h + i2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof o3 || "number" == typeof o3) {
                  var h = a2(String(o3), i2);
                  if (s2 && !l[n3].test(h)) throw TypeError('Expected "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(h, '"'));
                  r4 += i2.prefix + h + i2.suffix;
                  continue;
                }
                if (!c) {
                  var f = u ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(i2.name, '" to be ').concat(f));
                }
              }
              return r4;
            };
          }
          function n(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var n2 = r3.decode, a2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2;
            return function(r4) {
              var n3 = e3.exec(r4);
              if (!n3) return false;
              for (var i2 = n3[0], o2 = n3.index, s2 = /* @__PURE__ */ Object.create(null), l = 1; l < n3.length; l++) !(function(e4) {
                if (void 0 !== n3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? s2[r5.name] = n3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return a2(e5, r5);
                  }) : s2[r5.name] = a2(n3[e4], r5);
                }
              })(l);
              return { path: i2, index: o2, params: s2 };
            };
          }
          function a(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function i(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function o(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var n2 = r3.strict, o2 = void 0 !== n2 && n2, s2 = r3.start, l = r3.end, c = r3.encode, u = void 0 === c ? function(e4) {
              return e4;
            } : c, d = r3.delimiter, h = r3.endsWith, f = "[".concat(a(void 0 === h ? "" : h), "]|$"), p = "[".concat(a(void 0 === d ? "/#?" : d), "]"), g = void 0 === s2 || s2 ? "^" : "", _ = 0; _ < e3.length; _++) {
              var m = e3[_];
              if ("string" == typeof m) g += a(u(m));
              else {
                var y = a(u(m.prefix)), v = a(u(m.suffix));
                if (m.pattern) if (t3 && t3.push(m), y || v) if ("+" === m.modifier || "*" === m.modifier) {
                  var b = "*" === m.modifier ? "?" : "";
                  g += "(?:".concat(y, "((?:").concat(m.pattern, ")(?:").concat(v).concat(y, "(?:").concat(m.pattern, "))*)").concat(v, ")").concat(b);
                } else g += "(?:".concat(y, "(").concat(m.pattern, ")").concat(v, ")").concat(m.modifier);
                else {
                  if ("+" === m.modifier || "*" === m.modifier) throw TypeError('Can not repeat "'.concat(m.name, '" without a prefix and suffix'));
                  g += "(".concat(m.pattern, ")").concat(m.modifier);
                }
                else g += "(?:".concat(y).concat(v, ")").concat(m.modifier);
              }
            }
            if (void 0 === l || l) o2 || (g += "".concat(p, "?")), g += r3.endsWith ? "(?=".concat(f, ")") : "$";
            else {
              var w = e3[e3.length - 1], S = "string" == typeof w ? p.indexOf(w[w.length - 1]) > -1 : void 0 === w;
              o2 || (g += "(?:".concat(p, "(?=").concat(f, "))?")), S || (g += "(?=".concat(p, "|").concat(f, ")"));
            }
            return new RegExp(g, i(r3));
          }
          function s(e3, r3, n2) {
            if (e3 instanceof RegExp) {
              var a2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, c = 0, u = l.exec(e3.source); u; ) r3.push({ name: u[1] || c++, prefix: "", suffix: "", modifier: "", pattern: "" }), u = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (a2 = e3.map(function(e4) {
              return s(e4, r3, n2).source;
            }), new RegExp("(?:".concat(a2.join("|"), ")"), i(n2))) : o(t2(e3, n2), r3, n2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, n2) {
            return r2(t2(e3, n2), n2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return n(s(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = n, e2.tokensToRegexp = o, e2.pathToRegexp = s;
        })(), t.exports = e2;
      })();
    }, 77793, (e, t, r) => {
      var n = { 943: function(t2, r2) {
        !(function(n2) {
          "use strict";
          var a2 = "function", i2 = "undefined", o = "object", s = "string", l = "major", c = "model", u = "name", d = "type", h = "vendor", f = "version", p = "architecture", g = "console", _ = "mobile", m = "tablet", y = "smarttv", v = "wearable", b = "embedded", w = "Amazon", S = "Apple", x = "ASUS", E = "BlackBerry", P = "Browser", C = "Chrome", R = "Firefox", T = "Google", A = "Huawei", O = "Microsoft", I = "Motorola", N = "Opera", L = "Samsung", M = "Sharp", k = "Sony", D = "Xiaomi", j = "Zebra", U = "Facebook", q = "Chromium OS", $ = "Mac OS", G = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, B = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, H = function(e2, t3) {
            return typeof e2 === s && -1 !== F(t3).indexOf(F(e2));
          }, F = function(e2) {
            return e2.toLowerCase();
          }, V = function(e2, t3) {
            if (typeof e2 === s) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === i2 ? e2 : e2.substring(0, 350);
          }, z = function(e2, t3) {
            for (var r3, n3, i3, s2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], h2 = t3[u2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (i3 = 0; i3 < h2.length; i3++) c2 = l2[++n3], typeof (s2 = h2[i3]) === o && s2.length > 0 ? 2 === s2.length ? typeof s2[1] == a2 ? this[s2[0]] = s2[1].call(this, c2) : this[s2[0]] = s2[1] : 3 === s2.length ? typeof s2[1] !== a2 || s2[1].exec && s2[1].test ? this[s2[0]] = c2 ? c2.replace(s2[1], s2[2]) : void 0 : this[s2[0]] = c2 ? s2[1].call(this, c2, s2[2]) : void 0 : 4 === s2.length && (this[s2[0]] = c2 ? s2[3].call(this, c2.replace(s2[1], s2[2])) : void 0) : this[s2] = c2 || void 0;
              u2 += 2;
            }
          }, W = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (H(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (H(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, K = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [u, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [u, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [u, f], [/opios[\/ ]+([\w\.]+)/i], [f, [u, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [u, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [u, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [u, "UC" + P]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [u, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [u, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [u, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [u, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [u, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[u, /(.+)/, "$1 Secure " + P], f], [/\bfocus\/([\w\.]+)/i], [f, [u, R + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [u, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [u, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [u, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [u, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [u, "MIUI " + P]], [/fxios\/([-\w\.]+)/i], [f, [u, R]], [/\bqihu|(qi?ho?o?|360)browser/i], [[u, "360 " + P]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[u, /(.+)/, "$1 " + P], f], [/(comodo_dragon)\/([\w\.]+)/i], [[u, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [u, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [u], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[u, U], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [u, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [u, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [u, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [u, C + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[u, C + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [u, "Android " + P]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [u, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [u, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, u], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [u, [f, W, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [u, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[u, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [u, R + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [u, f], [/(cobalt)\/([\w\.]+)/i], [u, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[p, "amd64"]], [/(ia32(?=;))/i], [[p, F]], [/((?:i[346]|x)86)[;\)]/i], [[p, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[p, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[p, "armhf"]], [/windows (ce|mobile); ppc;/i], [[p, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[p, /ower/, "", F]], [/(sun4\w)[;\)]/i], [[p, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[p, F]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [h, L], [d, m]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [h, L], [d, _]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [c, [h, S], [d, _]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [h, S], [d, m]], [/(macintosh);/i], [c, [h, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [h, M], [d, _]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [h, A], [d, m]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [c, [h, A], [d, _]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [h, D], [d, _]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [h, D], [d, m]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [c, [h, "OPPO"], [d, _]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [h, "Vivo"], [d, _]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [h, "Realme"], [d, _]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [h, I], [d, _]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [h, I], [d, m]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [h, "LG"], [d, m]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [h, "LG"], [d, _]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [h, "Lenovo"], [d, m]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [h, "Nokia"], [d, _]], [/(pixel c)\b/i], [c, [h, T], [d, m]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [h, T], [d, _]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [h, k], [d, _]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [h, k], [d, m]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [h, "OnePlus"], [d, _]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [h, w], [d, m]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [h, w], [d, _]], [/(playbook);[-\w\),; ]+(rim)/i], [c, h, [d, m]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [h, E], [d, _]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [h, x], [d, m]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [h, x], [d, _]], [/(nexus 9)/i], [c, [h, "HTC"], [d, m]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [c, /_/g, " "], [d, _]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [h, "Acer"], [d, m]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [h, "Meizu"], [d, _]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, c, [d, _]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, c, [d, m]], [/(surface duo)/i], [c, [h, O], [d, m]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [h, "Fairphone"], [d, _]], [/(u304aa)/i], [c, [h, "AT&T"], [d, _]], [/\bsie-(\w*)/i], [c, [h, "Siemens"], [d, _]], [/\b(rct\w+) b/i], [c, [h, "RCA"], [d, m]], [/\b(venue[\d ]{2,7}) b/i], [c, [h, "Dell"], [d, m]], [/\b(q(?:mv|ta)\w+) b/i], [c, [h, "Verizon"], [d, m]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [h, "Barnes & Noble"], [d, m]], [/\b(tm\d{3}\w+) b/i], [c, [h, "NuVision"], [d, m]], [/\b(k88) b/i], [c, [h, "ZTE"], [d, m]], [/\b(nx\d{3}j) b/i], [c, [h, "ZTE"], [d, _]], [/\b(gen\d{3}) b.+49h/i], [c, [h, "Swiss"], [d, _]], [/\b(zur\d{3}) b/i], [c, [h, "Swiss"], [d, m]], [/\b((zeki)?tb.*\b) b/i], [c, [h, "Zeki"], [d, m]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], c, [d, m]], [/\b(ns-?\w{0,9}) b/i], [c, [h, "Insignia"], [d, m]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [h, "NextBook"], [d, m]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], c, [d, _]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], c, [d, _]], [/\b(ph-1) /i], [c, [h, "Essential"], [d, _]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [h, "Envizen"], [d, m]], [/\b(trio[-\w\. ]+) b/i], [c, [h, "MachSpeed"], [d, m]], [/\btu_(1491) b/i], [c, [h, "Rotor"], [d, m]], [/(shield[\w ]+) b/i], [c, [h, "Nvidia"], [d, m]], [/(sprint) (\w+)/i], [h, c, [d, _]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [h, O], [d, _]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [h, j], [d, m]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [h, j], [d, _]], [/smart-tv.+(samsung)/i], [h, [d, y]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [h, L], [d, y]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [d, y]], [/(apple) ?tv/i], [h, [c, S + " TV"], [d, y]], [/crkey/i], [[c, C + "cast"], [h, T], [d, y]], [/droid.+aft(\w)( bui|\))/i], [c, [h, w], [d, y]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [c, [h, M], [d, y]], [/(bravia[\w ]+)( bui|\))/i], [c, [h, k], [d, y]], [/(mitv-\w{5}) bui/i], [c, [h, D], [d, y]], [/Hbbtv.*(technisat) (.*);/i], [h, c, [d, y]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, V], [c, V], [d, y]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, y]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, c, [d, g]], [/droid.+; (shield) bui/i], [c, [h, "Nvidia"], [d, g]], [/(playstation [345portablevi]+)/i], [c, [h, k], [d, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [h, O], [d, g]], [/((pebble))app/i], [h, c, [d, v]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [c, [h, S], [d, v]], [/droid.+; (glass) \d/i], [c, [h, T], [d, v]], [/droid.+; (wt63?0{2,3})\)/i], [c, [h, j], [d, v]], [/(quest( 2| pro)?)/i], [c, [h, U], [d, v]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [d, b]], [/(aeobc)\b/i], [c, [h, w], [d, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [d, _]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [d, m]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, m]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, _]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [u, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [u, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [u, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, u]], os: [[/microsoft (windows) (vista|xp)/i], [u, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [u, [f, W, K]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[u, "Windows"], [f, W, K]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [u, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[u, $], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, u], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [u, f], [/\(bb(10);/i], [f, [u, E]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [u, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [u, R + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [u, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [u, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [u, C + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[u, q], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [u, f], [/(sunos) ?([\w\.\d]*)/i], [[u, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [u, f]] }, Y = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof Y)) return new Y(e2, t3).getResult();
            var r3 = typeof n2 !== i2 && n2.navigator ? n2.navigator : void 0, g2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), y2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, v2 = t3 ? G(X, t3) : X, b2 = r3 && r3.userAgent == g2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[u] = void 0, t4[f] = void 0, z.call(t4, g2, v2.browser), t4[l] = typeof (e3 = t4[f]) === s ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, b2 && r3 && r3.brave && typeof r3.brave.isBrave == a2 && (t4[u] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[p] = void 0, z.call(e3, g2, v2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[h] = void 0, e3[c] = void 0, e3[d] = void 0, z.call(e3, g2, v2.device), b2 && !e3[d] && y2 && y2.mobile && (e3[d] = _), b2 && "Macintosh" == e3[c] && r3 && typeof r3.standalone !== i2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[c] = "iPad", e3[d] = m), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[u] = void 0, e3[f] = void 0, z.call(e3, g2, v2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[u] = void 0, e3[f] = void 0, z.call(e3, g2, v2.os), b2 && !e3[u] && y2 && "Unknown" != y2.platform && (e3[u] = y2.platform.replace(/chrome os/i, q).replace(/macos/i, $)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return g2;
            }, this.setUA = function(e3) {
              return g2 = typeof e3 === s && e3.length > 350 ? V(e3, 350) : e3, this;
            }, this.setUA(g2), this;
          };
          if (Y.VERSION = "1.0.35", Y.BROWSER = B([u, f, l]), Y.CPU = B([p]), Y.DEVICE = B([c, h, d, g, _, y, m, v, b]), Y.ENGINE = Y.OS = B([u, f]), typeof r2 !== i2) t2.exports && (r2 = t2.exports = Y), r2.UAParser = Y;
          else if (typeof define === a2 && define.amd) e.r, void 0 !== Y && e.v(Y);
          else typeof n2 !== i2 && (n2.UAParser = Y);
          var J = typeof n2 !== i2 && (n2.jQuery || n2.Zepto);
          if (J && !J.ua) {
            var Z = new Y();
            J.ua = Z.getResult(), J.ua.get = function() {
              return Z.getUA();
            }, J.ua.set = function(e2) {
              Z.setUA(e2);
              var t3 = Z.getResult();
              for (var r3 in t3) J.ua[r3] = t3[r3];
            };
          }
        })(this);
      } }, a = {};
      function i(e2) {
        var t2 = a[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = a[e2] = { exports: {} }, o = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, i), o = false;
        } finally {
          o && delete a[e2];
        }
        return r2.exports;
      }
      i.ab = "/ROOT/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/ua-parser-js/", t.exports = i(943);
    }, 64567, (e) => {
      "use strict";
      let t, r, n, a, i, o;
      async function s() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(21025);
      let l = null;
      async function c() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        l || (l = s());
        let e10 = await l;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function u(...e10) {
        let t10 = await s();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let d = null;
      class h extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class f extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class p extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let g = "x-prerender-revalidate", _ = "x-prerender-revalidate-if-generated", m = ".segments", y = ".segment.rsc", v = ".rsc", b = ".json", w = ".meta", S = "x-next-cache-tags", x = "x-next-revalidated-tags", E = "_N_T_", P = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function C(e10) {
        var t10, r10, n2, a2, i2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t10 = s2, i2 = false; l2(); ) if ("," === (r10 = e10.charAt(s2))) {
            for (n2 = s2, s2 += 1, l2(), a2 = s2; s2 < e10.length && "=" !== (r10 = e10.charAt(s2)) && ";" !== r10 && "," !== r10; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (i2 = true, s2 = a2, o2.push(e10.substring(t10, n2)), t10 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!i2 || s2 >= e10.length) && o2.push(e10.substring(t10, e10.length));
        }
        return o2;
      }
      function R(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n2, a2] of e10.entries()) "set-cookie" === n2.toLowerCase() ? (r10.push(...C(a2)), t10[n2] = 1 === r10.length ? r10[0] : r10) : t10[n2] = a2;
        return t10;
      }
      function T(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      ({ ...P, GROUP: { builtinReact: [P.reactServerComponents, P.actionBrowser], serverOnly: [P.reactServerComponents, P.actionBrowser, P.instrument, P.middleware], neutralTarget: [P.apiNode, P.apiEdge], clientOnly: [P.serverSideRendering, P.appPagesBrowser], bundled: [P.reactServerComponents, P.actionBrowser, P.serverSideRendering, P.appPagesBrowser, P.shared, P.instrument, P.middleware], appPages: [P.reactServerComponents, P.serverSideRendering, P.appPagesBrowser, P.actionBrowser] } });
      let A = /* @__PURE__ */ Symbol("response"), O = /* @__PURE__ */ Symbol("passThrough"), I = /* @__PURE__ */ Symbol("waitUntil");
      class N {
        constructor(e10, t10) {
          this[O] = false, this[I] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[A] || (this[A] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[O] = true;
        }
        waitUntil(e10) {
          if ("external" === this[I].kind) return (0, this[I].function)(e10);
          this[I].promises.push(e10);
        }
      }
      class L extends N {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw new h({ page: this.sourcePage });
        }
        respondWith() {
          throw new h({ page: this.sourcePage });
        }
      }
      function M(e10) {
        return 47 === e10.charCodeAt(e10.length - 1) && e10.length > 1 ? e10.slice(0, -1) : e10;
      }
      function k(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n2 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n2 || t10 > -1 ? { pathname: e10.substring(0, n2 ? r10 : t10), query: n2 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function D(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n2, hash: a2 } = k(e10);
        return `${t10}${r10}${n2}${a2}`;
      }
      function j(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n2, hash: a2 } = k(e10);
        return `${r10}${t10}${n2}${a2}`;
      }
      function U(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = k(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let q = /* @__PURE__ */ new WeakMap();
      function $(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n2 = q.get(t10);
        n2 || (n2 = t10.map((e11) => e11.toLowerCase()), q.set(t10, n2));
        let a2 = e10.split("/", 2);
        if (!a2[1]) return { pathname: e10 };
        let i2 = a2[1].toLowerCase(), o2 = n2.indexOf(i2);
        return o2 < 0 ? { pathname: e10 } : (r10 = t10[o2], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let G = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function B(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return G.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let H = /* @__PURE__ */ Symbol("NextURLInternal");
      class F {
        constructor(e10, t10, r10) {
          let n2, a2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n2 = t10, a2 = r10 || {}) : a2 = r10 || t10 || {}, this[H] = { url: B(e10, n2 ?? a2.base), options: a2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n2, a2;
          let i2 = (function(e11, t11) {
            let { basePath: r11, i18n: n3, trailingSlash: a3 } = t11.nextConfig ?? {}, i3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a3 };
            r11 && U(i3.pathname, r11) && (i3.pathname = (function(e12, t12) {
              if (!U(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            })(i3.pathname, r11), i3.basePath = r11);
            let o3 = i3.pathname;
            if (i3.pathname.startsWith("/_next/data/") && i3.pathname.endsWith(".json")) {
              let e12 = i3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              i3.buildId = e12[0], o3 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (i3.pathname = o3);
            }
            if (n3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(i3.pathname) : $(i3.pathname, n3.locales);
              i3.locale = e12.detectedLocale, i3.pathname = e12.pathname ?? i3.pathname, !e12.detectedLocale && i3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3) : $(o3, n3.locales)).detectedLocale && (i3.locale = e12.detectedLocale);
            }
            return i3;
          })(this[H].url.pathname, { nextConfig: this[H].options.nextConfig, parseData: true, i18nProvider: this[H].options.i18nProvider }), o2 = (function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          })(this[H].url, this[H].options.headers);
          this[H].domainLocale = this[H].options.i18nProvider ? this[H].options.i18nProvider.detectDomainLocale(o2) : (function(e11, t11, r11) {
            if (e11) {
              for (let n3 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n3.domain?.split(":", 1)[0].toLowerCase() || r11 === n3.defaultLocale.toLowerCase() || n3.locales?.some((e12) => e12.toLowerCase() === r11)) return n3;
            }
          })(null == (t10 = this[H].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r10 = this[H].domainLocale) ? void 0 : r10.defaultLocale) || (null == (a2 = this[H].options.nextConfig) || null == (n2 = a2.i18n) ? void 0 : n2.defaultLocale);
          this[H].url.pathname = i2.pathname, this[H].defaultLocale = s2, this[H].basePath = i2.basePath ?? "", this[H].buildId = i2.buildId, this[H].locale = i2.locale ?? s2, this[H].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = (function(e11, t11, r10, n2) {
            if (!t11 || t11 === r10) return e11;
            let a2 = e11.toLowerCase();
            return !n2 && (U(a2, "/api") || U(a2, `/${t11.toLowerCase()}`)) ? e11 : D(e11, `/${t11}`);
          })((e10 = { basePath: this[H].basePath, buildId: this[H].buildId, defaultLocale: this[H].options.forceLocale ? void 0 : this[H].defaultLocale, locale: this[H].locale, pathname: this[H].url.pathname, trailingSlash: this[H].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = M(t10)), e10.buildId && (t10 = j(D(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = D(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : j(t10, "/") : M(t10);
        }
        formatSearch() {
          return this[H].url.search;
        }
        get buildId() {
          return this[H].buildId;
        }
        set buildId(e10) {
          this[H].buildId = e10;
        }
        get locale() {
          return this[H].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[H].locale || !(null == (r10 = this[H].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[H].locale = e10;
        }
        get defaultLocale() {
          return this[H].defaultLocale;
        }
        get domainLocale() {
          return this[H].domainLocale;
        }
        get searchParams() {
          return this[H].url.searchParams;
        }
        get host() {
          return this[H].url.host;
        }
        set host(e10) {
          this[H].url.host = e10;
        }
        get hostname() {
          return this[H].url.hostname;
        }
        set hostname(e10) {
          this[H].url.hostname = e10;
        }
        get port() {
          return this[H].url.port;
        }
        set port(e10) {
          this[H].url.port = e10;
        }
        get protocol() {
          return this[H].url.protocol;
        }
        set protocol(e10) {
          this[H].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[H].url = B(e10), this.analyze();
        }
        get origin() {
          return this[H].url.origin;
        }
        get pathname() {
          return this[H].url.pathname;
        }
        set pathname(e10) {
          this[H].url.pathname = e10;
        }
        get hash() {
          return this[H].url.hash;
        }
        set hash(e10) {
          this[H].url.hash = e10;
        }
        get search() {
          return this[H].url.search;
        }
        set search(e10) {
          this[H].url.search = e10;
        }
        get password() {
          return this[H].url.password;
        }
        set password(e10) {
          this[H].url.password = e10;
        }
        get username() {
          return this[H].url.username;
        }
        set username(e10) {
          this[H].url.username = e10;
        }
        get basePath() {
          return this[H].basePath;
        }
        set basePath(e10) {
          this[H].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new F(String(this), this[H].options);
        }
      }
      var V, z, W, K, X, Y, J, Z, Q, ee, et, er, en, ea, ei, eo, es, el, ec, eu, ed, eh, ef, ep, eg, e_, em = e.i(81984);
      let ey = /* @__PURE__ */ Symbol("internal request");
      class ev extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          T(r10), t10.body && "half" !== t10.duplex && (t10.duplex = "half"), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let n2 = new F(r10, { headers: R(this.headers), nextConfig: t10.nextConfig });
          this[ey] = { cookies: new em.RequestCookies(this.headers), nextUrl: n2, url: n2.toString() };
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[ey].cookies;
        }
        get nextUrl() {
          return this[ey].nextUrl;
        }
        get page() {
          throw new f();
        }
        get ua() {
          throw new p();
        }
        get url() {
          return this[ey].url;
        }
      }
      class eb {
        static get(e10, t10, r10) {
          let n2 = Reflect.get(e10, t10, r10);
          return "function" == typeof n2 ? n2.bind(e10) : n2;
        }
        static set(e10, t10, r10, n2) {
          return Reflect.set(e10, t10, r10, n2);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let ew = /* @__PURE__ */ Symbol("internal response"), eS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ex(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [n2, a2] of e10.request.headers) t10.set("x-middleware-request-" + n2, a2), r11.push(n2);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class eE extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, n2 = new Proxy(new em.ResponseCookies(r10), { get(e11, n3, a2) {
            switch (n3) {
              case "delete":
              case "set":
                return (...a3) => {
                  let i2 = Reflect.apply(e11[n3], e11, a3), o2 = new Headers(r10);
                  return i2 instanceof em.ResponseCookies && r10.set("x-middleware-set-cookie", i2.getAll().map((e12) => (0, em.stringifyCookie)(e12)).join(",")), ex(t10, o2), i2;
                };
              default:
                return eb.get(e11, n3, a2);
            }
          } });
          this[ew] = { cookies: n2, url: t10.url ? new F(t10.url, { headers: R(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[ew].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new eE(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!eS.has(r10)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n2 = "object" == typeof t10 ? t10 : {}, a2 = new Headers(null == n2 ? void 0 : n2.headers);
          return a2.set("Location", T(e10)), new eE(null, { ...n2, headers: a2, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", T(e10)), ex(t10, r10), new eE(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), ex(e10, t10), new eE(null, { ...e10, headers: t10 });
        }
      }
      function eP(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n2 = new URL(e10, t10), a2 = n2.origin === r10.origin;
        return { url: a2 ? n2.toString().slice(r10.origin.length) : n2.toString(), isRelative: a2 };
      }
      let eC = "next-router-prefetch", eR = ["rsc", "next-router-state-tree", eC, "next-hmr-refresh", "next-router-segment-prefetch"], eT = "_rsc";
      function eA(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function eO(e10) {
        return eA(e10.split("/").reduce((e11, t10, r10, n2) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === n2.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eI extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eI();
        }
      }
      class eN extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n2) {
            if ("symbol" == typeof r10) return eb.get(t10, r10, n2);
            let a2 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            if (void 0 !== i2) return eb.get(t10, i2, n2);
          }, set(t10, r10, n2, a2) {
            if ("symbol" == typeof r10) return eb.set(t10, r10, n2, a2);
            let i2 = r10.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            return eb.set(t10, o2 ?? r10, n2, a2);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return eb.has(t10, r10);
            let n2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 !== a2 && eb.has(t10, a2);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return eb.deleteProperty(t10, r10);
            let n2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 === a2 || eb.deleteProperty(t10, a2);
          } });
        }
        static seal(e10, t10) {
          let r10, n2 = t10 && t10.size > 0 ? (e11) => t10.has(e11.toLowerCase()) : null, a2 = new Proxy(e10, { get(e11, t11, n3) {
            switch (t11) {
              case "append":
              case "delete":
              case "set":
                return eI.callable;
              case Symbol.iterator:
                return r10[Symbol.iterator];
              case "get":
              case "has":
              case "getSetCookie":
              case "keys":
              case "values":
              case "entries":
              case "forEach":
                return r10[t11];
              default:
                return eb.get(e11, t11, n3);
            }
          } });
          return r10 = n2 ? /* @__PURE__ */ (function(e11, t11, r11) {
            function* n3() {
              for (let t12 of e11.entries()) r11(t12[0]) || (yield t12);
            }
            return { entries: n3, [Symbol.iterator]: n3, get: (t12) => r11(t12) ? null : e11.get(t12), has: (t12) => !r11(t12) && e11.has(t12), getSetCookie: () => r11("set-cookie") ? [] : e11.getSetCookie(), *keys() {
              for (let t12 of e11.keys()) r11(t12) || (yield t12);
            }, *values() {
              for (let [, e12] of n3()) yield e12;
            }, forEach(e12, r12) {
              for (let [a3, i2] of n3()) e12.call(r12, i2, a3, t11);
            } };
          })(e10, a2, n2) : { get: e10.get.bind(e10), has: e10.has.bind(e10), getSetCookie: e10.getSetCookie.bind(e10), keys: e10.keys.bind(e10), values: e10.values.bind(e10), entries: e10.entries.bind(e10), [Symbol.iterator]: e10[Symbol.iterator].bind(e10), forEach(t11, r11) {
            for (let [n3, i2] of e10.entries()) t11.call(r11, i2, n3, a2);
          } }, a2;
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => eb.get(e11, t10, r10) });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new eN(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n2] of this.entries()) e10.call(t10, n2, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var eL = e.i(56704);
      class eM extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new eM();
        }
      }
      class ek {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eM.callable;
              default:
                return eb.get(e11, t10, r10);
            }
          } });
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => eb.get(e11, t10, r10) });
        }
      }
      let eD = /* @__PURE__ */ Symbol.for("next.mutated.cookies");
      class ej {
        static wrap(e10, t10) {
          let r10 = new em.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n2 = [], a2 = /* @__PURE__ */ new Set(), i2 = () => {
            let e11 = eL.workAsyncStorage.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), n2 = r10.getAll().filter((e12) => a2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n2) {
                let r11 = new em.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o2 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eD:
                return n2;
              case "delete":
                return function(...t12) {
                  a2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o2;
                  } finally {
                    i2();
                  }
                };
              case "set":
                return function(...t12) {
                  a2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o2;
                  } finally {
                    i2();
                  }
                };
              default:
                return eb.get(e11, t11, r11);
            }
          } });
          return o2;
        }
      }
      function eU(e10, t10) {
        if ("action" !== e10.phase) throw new eM();
      }
      var eq = ((V = eq || {}).handleRequest = "BaseServer.handleRequest", V.run = "BaseServer.run", V.pipe = "BaseServer.pipe", V.getStaticHTML = "BaseServer.getStaticHTML", V.render = "BaseServer.render", V.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", V.renderToResponse = "BaseServer.renderToResponse", V.renderToHTML = "BaseServer.renderToHTML", V.renderError = "BaseServer.renderError", V.renderErrorToResponse = "BaseServer.renderErrorToResponse", V.renderErrorToHTML = "BaseServer.renderErrorToHTML", V.render404 = "BaseServer.render404", V), e$ = ((z = e$ || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", z.loadComponents = "LoadComponents.loadComponents", z.loadRouteModule = "LoadComponents.loadRouteModule", z), eG = ((W = eG || {}).loadModule = "Instrumentation.loadModule", W.register = "Instrumentation.register", W), eB = ((K = eB || {}).getRequestHandler = "NextServer.getRequestHandler", K.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", K.getServer = "NextServer.getServer", K.getServerRequestHandler = "NextServer.getServerRequestHandler", K.createServer = "createServer.createServer", K), eH = ((X = eH || {}).compression = "NextNodeServer.compression", X.getBuildId = "NextNodeServer.getBuildId", X.createComponentTree = "NextNodeServer.createComponentTree", X.clientComponentLoading = "NextNodeServer.clientComponentLoading", X.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", X.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", X.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", X.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", X.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", X.sendRenderResult = "NextNodeServer.sendRenderResult", X.proxyRequest = "NextNodeServer.proxyRequest", X.runApi = "NextNodeServer.runApi", X.render = "NextNodeServer.render", X.renderHTML = "NextNodeServer.renderHTML", X.imageOptimizer = "NextNodeServer.imageOptimizer", X.getPagePath = "NextNodeServer.getPagePath", X.getRoutesManifest = "NextNodeServer.getRoutesManifest", X.findPageComponents = "NextNodeServer.findPageComponents", X.getFontManifest = "NextNodeServer.getFontManifest", X.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", X.getRequestHandler = "NextNodeServer.getRequestHandler", X.renderToHTML = "NextNodeServer.renderToHTML", X.renderError = "NextNodeServer.renderError", X.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", X.render404 = "NextNodeServer.render404", X.startResponse = "NextNodeServer.startResponse", X.route = "route", X.onProxyReq = "onProxyReq", X.apiResolver = "apiResolver", X.internalFetch = "internalFetch", X), eF = ((Y = eF || {}).startServer = "startServer.startServer", Y), eV = ((J = eV || {}).getServerSideProps = "Render.getServerSideProps", J.getStaticProps = "Render.getStaticProps", J.renderToString = "Render.renderToString", J.renderDocument = "Render.renderDocument", J.createBodyResult = "Render.createBodyResult", J), ez = ((Z = ez || {}).renderToString = "AppRender.renderToString", Z.renderToReadableStream = "AppRender.renderToReadableStream", Z.getBodyResult = "AppRender.getBodyResult", Z.fetch = "AppRender.fetch", Z.waitShellReady = "AppRender.waitShellReady", Z.renderToNodeFizzStream = "AppRender.renderToNodeFizzStream", Z.instantInsights = "AppRender.instantInsights", Z.instantInsightsPrepareValidation = "AppRender.instantInsights.prepareValidation", Z.instantInsightsRunValidation = "AppRender.instantInsights.runValidation", Z), eW = ((Q = eW || {}).ensurePage = "DevBundlerService.ensurePage", Q), eK = ((ee = eK || {}).executeRoute = "Router.executeRoute", ee), eX = ((et = eX || {}).runHandler = "Node.runHandler", et), eY = ((er = eY || {}).runHandler = "AppRouteRouteHandlers.runHandler", er), eJ = ((en = eJ || {}).loadUserland = "AppRouteRouteModule.loadUserland", en), eZ = ((ea = eZ || {}).prepare = "RouteModule.prepare", ea.loadManifests = "RouteModule.loadManifests", ea), eQ = ((ei = eQ || {}).generateMetadata = "ResolveMetadata.generateMetadata", ei.generateViewport = "ResolveMetadata.generateViewport", ei), e0 = ((eo = e0 || {}).execute = "Middleware.execute", eo), e1 = ((es = e1 || {}).request = "Next.request", es);
      let e3 = /* @__PURE__ */ new Set(["Middleware.execute", "Next.request", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "LoadComponents.loadRouteModule", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "AppRouteRouteModule.loadUserland", "RouteModule.prepare", "Instrumentation.loadModule", "Instrumentation.register", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), e2 = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function e4(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let e9 = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      function e5() {
      }
      /* @__PURE__ */ Symbol.for("@next/local-span-recorder");
      try {
        t = e.r(70406);
      } catch (r10) {
        t = e.r(40289);
      }
      let { context: e6, propagation: e8, trace: e7, SpanStatusCode: te, SpanKind: tt, ROOT_CONTEXT: tr } = t;
      class tn extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let ta = (e10, t10, r10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof tn && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: te.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end(r10);
      }, ti = /* @__PURE__ */ new Map(), to = t.createContextKey("next.rootSpanId"), ts = 0, tl = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, tc = (n = new class e {
        getTracerInstance() {
          return e7.getTracer("next.js", "16.4.5");
        }
        isOpenTelemetryEnabled() {
          var e10, t10;
          let r10 = e7.getSpan(e6.active());
          if (null == r10 ? void 0 : r10.isRecording()) return true;
          let n2 = e7.getTracerProvider();
          return !("getDelegate" in n2) || (null == n2.getDelegate || null == (t10 = n2.getDelegate.call(n2)) || null == (e10 = t10.constructor) ? void 0 : e10.name) !== "NoopTracerProvider";
        }
        getContext() {
          return e6;
        }
        getTracePropagationData() {
          let e10 = e6.active(), t10 = [];
          return e8.inject(e10, t10, tl), t10;
        }
        getTraceContextHeaders() {
          let e10 = e6.active();
          if (!e7.getSpanContext(e10) || !this.isOpenTelemetryEnabled()) return;
          let t10 = {};
          e8.inject(e10, t10);
          let { traceparent: r10, tracestate: n2 } = t10;
          if (r10) return { traceparent: r10, tracestate: n2 };
        }
        hasActiveSpanContext() {
          let e10 = e7.getSpanContext(e6.active());
          return !!(e10 && e7.isSpanContextValid(e10));
        }
        getActiveScopeSpan() {
          let e10 = e5(), t10 = null == e10 ? void 0 : e10.getActiveLocalSpan();
          return t10 && (null == e10 ? void 0 : e10.isOpenTelemetryIsolatedSpan(t10)) ? t10 : e7.getSpan(e6.active());
        }
        withPropagatedContext(e10, t10, r10, n2 = false) {
          let a2 = e6.active();
          if (!e9 && !this.isOpenTelemetryEnabled() && !e7.getSpanContext(a2)) return t10();
          if (n2) {
            let n3 = e8.extract(tr, e10, r10);
            if (e7.getSpanContext(n3)) return e6.with(n3, t10);
            let i3 = e8.extract(a2, e10, r10);
            return e6.with(i3, t10);
          }
          if (e7.getSpanContext(a2)) return t10();
          let i2 = e8.extract(a2, e10, r10);
          return e6.with(i2, t10);
        }
        trace(...e10) {
          let [t10, r10, n2] = e10, a2 = !!e9 || this.isOpenTelemetryEnabled(), i2 = e5(), o2 = (null == i2 ? void 0 : i2.isLocalSpanRecordingEnabled()) ?? false;
          if (!a2 && !o2) return "function" == typeof r10 ? r10() : n2();
          let { fn: s2, options: l2 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n2, options: { ...r10 } }, c2 = l2.spanName ?? t10, u2 = l2.parentSpan ?? this.getActiveScopeSpan(), d2 = u2 && (null == i2 ? void 0 : i2.isOpenTelemetryIsolatedSpan(u2)) ? u2 : void 0, h2 = !d2 && (e3.has(t10) || "1" === process.env.NEXT_OTEL_VERBOSE);
          if (!(h2 || (null == i2 ? void 0 : i2.isRequestInsightsEnabled())) || l2.hideSpan) return s2();
          let f2 = d2 ? e6.active() : this.getSpanContext(u2);
          f2 || (f2 = (null == e6 ? void 0 : e6.active()) ?? tr);
          let p2 = f2.getValue(to), g2 = "number" != typeof p2 || !ti.has(p2), _2 = ts++;
          return l2.attributes = { "next.span_category": "nextjs", "next.span_name": c2, "next.span_type": t10, ...l2.attributes }, e6.with(f2.setValue(to, _2), () => this.runWithActiveSpan(c2, l2, f2, a2 && h2, o2, d2, (e11) => {
            let r11;
            e9 && t10 && e2.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n3 = false, a3 = () => {
              !n3 && (n3 = true, ti.delete(_2), r11 && performance.measure(`${e9}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (g2 && ti.set(_2, new Map(Object.entries(l2.attributes ?? {}))), s2.length > 1) try {
              return s2(e11, (t11) => {
                t11 ? ta(e11, t11, l2.endTime) : e11.end(l2.endTime);
              });
            } catch (t11) {
              throw ta(e11, t11, l2.endTime), t11;
            } finally {
              a3();
            }
            try {
              let t11 = s2(e11);
              if (e4(t11)) return t11.then((t12) => (e11.end(l2.endTime), t12)).catch((t12) => {
                throw ta(e11, t12, l2.endTime), t12;
              }).finally(a3);
              return e11.end(l2.endTime), a3(), t11;
            } catch (t11) {
              throw ta(e11, t11, l2.endTime), a3(), t11;
            }
          }));
        }
        runWithActiveSpan(e10, t10, r10, n2, a2, i2, o2) {
          if (n2) return this.getTracerInstance().startActiveSpan(e10, t10, (n3) => o2(a2 ? this.createLocalRecordingSpan(e10, t10, r10, n3, i2) : n3));
          let s2 = this.createLocalRecordingSpan(e10, t10, r10, void 0, i2), l2 = e5();
          return l2.withLocalSpan(s2, () => l2.isOpenTelemetryIsolatedSpan(s2) ? o2(s2) : e6.with(e7.setSpan(e6.active(), s2), o2, void 0, s2));
        }
        createLocalRecordingSpan(e10, t10, r10, n2, a2) {
          let i2 = (null == a2 ? void 0 : a2.spanContext()) ?? e7.getSpanContext(r10), o2 = null == n2 ? void 0 : n2.spanContext();
          return e5().createLocalSpan({ name: e10, attributes: t10.attributes, links: t10.links, startTime: t10.startTime, delegateSpan: n2, traceId: (null == o2 ? void 0 : o2.traceId) ?? (null == i2 ? void 0 : i2.traceId), spanId: null == o2 ? void 0 : o2.spanId, parentSpanId: null == i2 ? void 0 : i2.spanId, isolateOpenTelemetry: void 0 !== a2 });
        }
        wrap(...e10) {
          let t10 = this, [r10, n2, a2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return e3.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n2;
            "function" == typeof e11 && "function" == typeof a2 && (e11 = e11.apply(this, arguments));
            let i2 = arguments.length - 1, o2 = arguments[i2];
            if ("function" != typeof o2) return t10.trace(r10, e11, () => a2.apply(this, arguments));
            {
              let n3 = t10.getContext().bind(e6.active(), o2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[i2] = function(e13) {
                return null == t11 || t11(e13), n3.apply(this, arguments);
              }, a2.apply(this, arguments)));
            }
          } : a2;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n2 = r10 ? { ...r10, attributes: { "next.span_category": "nextjs", ...r10.attributes } } : { attributes: { "next.span_category": "nextjs" } }, a2 = e5(), i2 = n2.parentSpan ?? this.getActiveScopeSpan(), o2 = i2 && (null == a2 ? void 0 : a2.isOpenTelemetryIsolatedSpan(i2)) ? i2 : void 0, s2 = (o2 ? void 0 : this.getSpanContext(i2)) ?? e6.active();
          if (!(null == a2 ? void 0 : a2.isLocalSpanRecordingEnabled())) return this.getTracerInstance().startSpan(t10, n2, s2);
          let l2 = !o2 && this.isOpenTelemetryEnabled() ? this.getTracerInstance().startSpan(t10, n2, s2) : void 0;
          return this.createLocalRecordingSpan(t10, n2, s2, l2, o2);
        }
        getSpanContext(e10) {
          return e10 ? e7.setSpan(e6.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = e6.active().getValue(to);
          return ti.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = e6.active().getValue(to), n2 = ti.get(r10);
          n2 && !n2.has(e10) && n2.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = e5();
          return (null == r10 ? void 0 : r10.isLocalRecordingSpan(e10)) ? r10.withLocalSpan(e10, () => r10.isOpenTelemetryIsolatedSpan(e10) ? t10() : e6.with(e7.setSpan(e6.active(), e10), t10)) : e6.with(e7.setSpan(e6.active(), e10), t10);
        }
      }(), () => n), tu = "__prerender_bypass";
      /* @__PURE__ */ Symbol("__next_preview_data"), Symbol(tu);
      class td {
        constructor(e10, t10, r10, n2) {
          var a2;
          let i2 = e10 && (function(e11, t11) {
            if ("function" == typeof e11.get) {
              let r11 = eN.from(e11);
              return { isOnDemandRevalidate: r11.get(g) === t11.previewModeId, revalidateOnlyGenerated: r11.has(_) };
            }
            return { isOnDemandRevalidate: e11[g] === t11.previewModeId, revalidateOnlyGenerated: e11.hasOwnProperty(_) };
          })(t10, e10).isOnDemandRevalidate, o2 = null == (a2 = r10.get(tu)) ? void 0 : a2.value;
          this._isEnabled = !!(!i2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: tu, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: tu, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      let th = new Set([...eR, "x-nextjs-request-id", "x-nextjs-html-request-id"].map((e10) => e10.toLowerCase()));
      function tf(e10, t10) {
        if ("x-middleware-set-cookie" in e10 && "string" == typeof e10["x-middleware-set-cookie"]) {
          let r10 = e10["x-middleware-set-cookie"], n2 = new Headers();
          for (let e11 of C(r10)) n2.append("set-cookie", e11);
          for (let e11 of new em.ResponseCookies(n2).getAll()) t10.set(e11);
        }
      }
      var tp = e.i(32319), tg = e.i(71791);
      class t_ extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), this.name = "InvariantError";
        }
      }
      var tm = e.i(51187);
      function ty() {
      }
      new TextEncoder();
      let tv = new TextEncoder();
      function tb(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tv.encode(e10)), t10.close();
        } });
      }
      function tw(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tS(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), n2 = "";
        for await (let a2 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return n2;
          n2 += r10.decode(a2, { stream: true });
        }
        return n2 + r10.decode();
      }
      process.env.NEXT_PRIVATE_DEBUG_CACHE, /* @__PURE__ */ Symbol.for("@next/cache-handlers");
      let tx = /* @__PURE__ */ Symbol.for("@next/cache-handlers-map"), tE = /* @__PURE__ */ Symbol.for("@next/cache-handlers-set");
      /* @__PURE__ */ Symbol.for("@next/custom-cache-handlers-registration"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-private"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-built-in"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-dev-fronts"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-dev-tiered"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-memory-disabled");
      let tP = globalThis;
      function tC() {
        let e10 = tP[tx];
        if (e10) return e10.entries();
      }
      async function tR(e10, t10) {
        if (!e10) return t10();
        let r10 = tT(e10);
        try {
          return await t10();
        } finally {
          var n2, a2, i2, o2;
          let t11, s2, l2, c2, u2 = (n2 = r10, a2 = tT(e10), t11 = new Map(n2.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return [`${e11.tag}:${t12}`, e11.revalidatedAt];
          })), s2 = new Set(n2.pendingRevalidateWrites), { pendingRevalidatedTags: a2.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "", n3 = t11.get(`${e11.tag}:${r11}`);
            return void 0 === n3 || e11.revalidatedAt > n3;
          }), pendingRevalidates: Object.fromEntries(Object.entries(a2.pendingRevalidates).filter(([e11]) => !(e11 in n2.pendingRevalidates))), pendingRevalidateWrites: a2.pendingRevalidateWrites.filter((e11) => !s2.has(e11)) });
          await (i2 = e10, l2 = [], (c2 = (null == (o2 = u2) ? void 0 : o2.pendingRevalidatedTags) ?? i2.pendingRevalidatedTags ?? []).length > 0 && l2.push(tA(c2, i2.incrementalCache, i2)), l2.push(...Object.values((null == o2 ? void 0 : o2.pendingRevalidates) ?? i2.pendingRevalidates ?? {})), l2.push(...(null == o2 ? void 0 : o2.pendingRevalidateWrites) ?? i2.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function tT(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? e10.pendingRevalidatedTags.map((e11) => ({ ...e11 })) : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function tA(e10, t10, r10) {
        if (0 === e10.length) return;
        let n2 = (function() {
          let e11 = tP[tE];
          if (e11) return Array.from(e11);
        })() ?? [], a2 = [], i2 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of i2) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n3 = e11 || r11;
          i2.has(n3) || i2.set(n3, []), i2.get(n3).push(t11.tag);
        }
        for (let [e11, o2] of i2) {
          let i3;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11 && !(t11 = null == r10 ? void 0 : r10.cacheLifeProfiles[e11])) throw Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`);
            t11 && (i3 = { expire: t11.expire });
          }
          for (let t11 of n2) e11 ? a2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o2, i3)) : a2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o2));
          t10 && a2.push(t10.revalidateTag(o2, i3));
        }
        await Promise.all(a2);
      }
      let tO = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class tI {
        disable() {
          throw tO;
        }
        getStore() {
        }
        run() {
          throw tO;
        }
        exit() {
          throw tO;
        }
        enterWith() {
          throw tO;
        }
        static bind(e10) {
          return e10;
        }
      }
      let tN = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      var tL = e.i(24725);
      class tM {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.isRequestClosed = false, this.initialOnCloseError = null, this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new tg.default(), this.callbackQueue.pause();
          try {
            t10(() => {
              for (let e11 of (this.isRequestClosed = true, this.workUnitStores)) e11.phase = "after";
            });
          } catch (e11) {
            this.initialOnCloseError = { error: e11 };
          }
        }
        after(e10, t10) {
          if (this.initialOnCloseError) throw new t_("An onClose call failed, which means after() can't work correctly.", { cause: this.initialOnCloseError.error });
          if (this.workUnitStores.add(t10), e4(e10)) this.addThenable(e10);
          else if ("function" == typeof e10) this.addCallback(e10, t10);
          else throw Error("`after()`: Argument must be a promise or a function");
        }
        addThenable(e10) {
          this.waitUntil || tk(), this.waitUntil(new Promise((t10) => {
            e10.then(() => {
              t10();
            }, (e11) => {
              t10(), this.reportTaskError("promise", e11);
            });
          }));
        }
        addCallback(e10, t10) {
          var r10;
          this.waitUntil || tk();
          let n2 = tL.afterTaskAsyncStorage.getStore(), a2 = n2 ? n2.rootTaskSpawnPhase : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i2 = (r10 = async () => {
            try {
              await tL.afterTaskAsyncStorage.run({ rootTaskSpawnPhase: a2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, tN ? tN.bind(r10) : tI.bind(r10));
          this.callbackQueue.add(i2);
        }
        async runCallbacksOnClose() {
          return this.isRequestClosed ? await new Promise((e10) => {
            setImmediate(e10);
          }) : await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          let e10 = eL.workAsyncStorage.getStore();
          if (!e10) throw new t_("Missing workStore in AfterContext.runCallbacks");
          return tR(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(new t_("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }));
          }
        }
      }
      function tk() {
        throw Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment.");
      }
      function tD(e10) {
        let t10, r10 = { then: (n2, a2) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n2, a2)) };
        return r10;
      }
      class tj {
        onClose(e10) {
          if (this.isClosed) throw Error("Cannot subscribe to a closed CloseController");
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Error("Cannot close a CloseController multiple times");
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      let tU = "x-middleware-override-headers", tq = "x-middleware-request-";
      function t$(e10) {
        let [, t10, r10] = (null == e10 ? void 0 : e10.toLowerCase().split("-")) ?? [];
        return t10 && r10 ? `${t10}-${r10}` : void 0;
      }
      function tG(e10) {
        return "traceparent" === e10 || "tracestate" === e10;
      }
      function tB(e10, t10, r10) {
        e10.set(tq + "traceparent", r10.traceparent), t10.push("traceparent"), r10.tracestate ? (e10.set(tq + "tracestate", r10.tracestate), t10.push("tracestate")) : e10.delete(tq + "tracestate"), e10.set(tU, t10.join(","));
      }
      function tH() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tF = /* @__PURE__ */ Symbol.for("@next/request-context"), tV = /[^\t\x20-\x7e]/, tz = /[^\t\x20-\x7e]+/g;
      function tW(e10) {
        return tV.test(e10) ? e10.replace(tz, (e11) => encodeURIComponent(e11)) : e10;
      }
      async function tK(e10, t10, r10) {
        let n2 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.indexOf("/", 1);
            for (; ; ) {
              -1 === r11 && (r11 = e11.length);
              let n3 = e11.slice(0, r11);
              if (n3 && (n3.endsWith("/page") || n3.endsWith("/route") || (n3 = `${n3}${!n3.endsWith("/") ? "/" : ""}layout`), t12.push(n3)), r11 === e11.length) break;
              r11 = e11.indexOf("/", r11 + 1);
            }
          }
          return t12;
        })(e10)) t11 = tW(`${E}${t11}`), n2.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = tW(`${E}${t10}`);
          n2.add(e11);
        }
        n2.has(`${E}/`) && n2.add(`${E}/index`), n2.has(`${E}/index`) && n2.add(`${E}/`);
        let a2 = Array.from(n2);
        return { tags: a2, expirationsByCacheKind: (function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = tC();
          if (r11) for (let [n3, a3] of r11) "getExpiration" in a3 && t11.set(n3, tD(async () => a3.getExpiration(e11)));
          return t11;
        })(a2) };
      }
      let tX = /* @__PURE__ */ Symbol.for("NextInternalRequestMeta"), tY = { get default() {
        throw new t_("Proxy does not support `use cache`, so reading its `default` cacheLife profile is unexpected.");
      } };
      class tJ extends ev {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new h({ page: this.sourcePage });
        }
        respondWith() {
          throw new h({ page: this.sourcePage });
        }
        waitUntil() {
          throw new h({ page: this.sourcePage });
        }
      }
      let tZ = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tQ = (e10, t10) => tc().withPropagatedContext(e10.headers, t10, tZ), t0 = false;
      async function t1(t10) {
        var r10, n2, a2, i2, o2, s2;
        let l2, u2, h2, f2, p2, g2, _2;
        !(function() {
          if (!t0 && (t0 = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(83868);
            t11(), tQ = r11(tQ);
          }
        })(), await (!d && (d = c()), d);
        let m2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let y2 = t10.bypassNextUrl ? new URL(t10.request.url) : new F(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...y2.searchParams.keys()]) {
          let t11 = y2.searchParams.getAll(e10), r11 = (function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          })(e10);
          if (r11) {
            for (let e11 of (y2.searchParams.delete(r11), t11)) y2.searchParams.append(r11, e11);
            y2.searchParams.delete(e10);
          }
        }
        let v2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in y2 && (v2 = y2.buildId || "", y2.buildId = "");
        let b2 = (function(e10) {
          let t11 = new Headers();
          for (let [r11, n3] of Object.entries(e10)) for (let e11 of Array.isArray(n3) ? n3 : [n3]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        })(t10.request.headers), w2 = b2.has("x-nextjs-data"), S2 = "1" === b2.get("rsc");
        w2 && "/index" === y2.pathname && (y2.pathname = "/");
        let x2 = /* @__PURE__ */ new Map();
        if (!m2) for (let e10 of eR) {
          let t11 = b2.get(e10);
          null !== t11 && (x2.set(e10, t11), b2.delete(e10));
        }
        let E2 = y2.searchParams.get(eT), P2 = new tJ({ page: t10.page, input: ((g2 = (p2 = "string" == typeof y2) ? new URL(y2) : y2).searchParams.delete(eT), p2 ? g2.toString() : g2).toString(), init: { body: t10.request.body, headers: b2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (o2 = t10.request.requestMeta, P2[tX] = o2), w2 && Object.defineProperty(P2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, previewProps: tH(), prerenderManifest: { version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tH() } }));
        let C2 = t10.request.waitUntil ?? (null == (r10 = null == (_2 = globalThis[tF]) ? void 0 : _2.get()) ? void 0 : r10.waitUntil), R2 = new L({ request: P2, page: t10.page, context: C2 ? { waitUntil: C2 } : void 0 }), T2 = "/middleware" === (s2 = t10.page) || "/src/middleware" === s2 || "/proxy" === s2 || "/src/proxy" === s2;
        if ((l2 = await tQ(P2, () => {
          if (T2) {
            let e10 = R2.waitUntil.bind(R2), r11 = new tj(), n3 = tc(), a3 = () => {
              let a4 = new Headers(P2.headers);
              return (h2 = (function(e11, t11) {
                if (!t11) return;
                let r12 = e11.get("traceparent"), n4 = t$(r12);
                if (r12 && n4 && n4 === t$(t11.traceparent)) {
                  let t12 = e11.get("tracestate");
                  return t12 ? { traceparent: r12, tracestate: t12 } : { traceparent: r12, tracestate: void 0 };
                }
                return t11;
              })(a4, n3.getTraceContextHeaders())) && (f2 = a4), n3.trace(e0.execute, { spanName: `middleware ${P2.method}`, startTime: t10.emitInstrumentationSpans ? t10.requestStartTime : void 0, attributes: { "http.target": P2.nextUrl.pathname, "http.method": P2.method } }, async () => {
                null == t10.emitInstrumentationSpans || t10.emitInstrumentationSpans.call(t10);
                try {
                  var n4, a5, i3, o3, s3, l3;
                  let c2 = tH(), d2 = await tK("/", P2.nextUrl.pathname, null), h3 = (i3 = P2.nextUrl, o3 = (e11) => {
                    u2 = e11;
                  }, s3 = void 0, (function(e11) {
                    let { phase: t11, headers: r12, onUpdateCookies: n5, url: a6, rootParams: i4, implicitTags: o4, resumeDataCache: s4, previewProps: l4, isHmrRefresh: c3, serverComponentsHmrCache: u3, hmrRefreshHash: d3, stagedFallbackParams: h4 } = e11, f4 = {};
                    return { type: "request", phase: t11, implicitTags: o4, url: { pathname: a6.pathname, search: a6.search ?? "" }, rootParams: i4, get headers() {
                      return f4.headers || (f4.headers = eN.seal(eN.from(r12), th)), f4.headers;
                    }, get cookies() {
                      if (!f4.cookies) {
                        let e12 = new em.RequestCookies(eN.from(r12));
                        tf(r12, e12), f4.cookies = ek.seal(e12);
                      }
                      return f4.cookies;
                    }, set cookies(e12) {
                      f4.cookies = e12;
                    }, get mutableCookies() {
                      if (!f4.mutableCookies) {
                        let e12, t12 = (e12 = new em.RequestCookies(eN.from(r12)), ej.wrap(e12, n5));
                        tf(r12, t12), f4.mutableCookies = t12;
                      }
                      return f4.mutableCookies;
                    }, get userspaceMutableCookies() {
                      if (!f4.userspaceMutableCookies) {
                        var e12;
                        let t12;
                        e12 = this, f4.userspaceMutableCookies = t12 = new Proxy(e12.mutableCookies, { get(r13, n6, a7) {
                          switch (n6) {
                            case "delete":
                              return function(...n7) {
                                return eU(e12, "cookies().delete"), r13.delete(...n7), t12;
                              };
                            case "set":
                              return function(...n7) {
                                return eU(e12, "cookies().set"), r13.set(...n7), t12;
                              };
                            default:
                              return eb.get(r13, n6, a7);
                          }
                        } });
                      }
                      return f4.userspaceMutableCookies;
                    }, get draftMode() {
                      return f4.draftMode || (f4.draftMode = new td(l4, r12, this.cookies, this.mutableCookies)), f4.draftMode;
                    }, resumeDataCache: s4 ?? null, isHmrRefresh: c3, serverComponentsHmrCache: u3 || globalThis.__serverComponentsHmrCache, hmrRefreshHash: d3, stagedFallbackParams: h4, usedDynamic: false };
                  })({ phase: "action", headers: P2.headers, onUpdateCookies: o3, url: i3, rootParams: {}, implicitTags: d2, resumeDataCache: null, previewProps: c2, isHmrRefresh: false, serverComponentsHmrCache: void 0, hmrRefreshHash: s3, stagedFallbackParams: null })), f3 = (l3 = { page: "/", renderOpts: { cacheLifeProfiles: tY, staticPageGenerationTimeout: 0, cacheComponents: false, validationLevel: "warning", experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (a5 = t10.request.nextConfig) || null == (n4 = a5.experimental) ? void 0 : n4.authInterrupts), useCacheTimeout: 0, durableUseCacheEntries: false }, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === P2.headers.get(eC), buildId: v2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] }, (function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n5, deploymentId: a6, previouslyRevalidatedTags: i4, nonce: o4 }, s4) {
                    let l4 = { page: e11, route: eO(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, useCacheTimeout: t11.experimental.useCacheTimeout, durableUseCacheEntries: t11.experimental.durableUseCacheEntries, staticPageGenerationTimeout: t11.staticPageGenerationTimeout, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, requestId: void 0, htmlRequestId: void 0, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n5, deploymentId: a6, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o4, afterContext: (function(e12) {
                      let { waitUntil: t12, onClose: r13, onAfterTaskError: n6 } = e12;
                      return new tM({ waitUntil: t12, onClose: r13, onTaskError: n6 });
                    })(t11), cacheComponentsEnabled: t11.cacheComponents, validationLevel: t11.validationLevel, previouslyRevalidatedTags: i4, requestStartTime: performance.timeOrigin + performance.now(), refreshTagsByCacheKind: (function() {
                      let e12 = /* @__PURE__ */ new Map(), t12 = tC();
                      if (t12) for (let [r13, n6] of t12) "refreshTags" in n6 && e12.set(r13, tD(async () => n6.refreshTags()));
                      return e12;
                    })(), runInCleanSnapshot: tN ? tN.snapshot() : function(e12, ...t12) {
                      return e12(...t12);
                    }, shouldTrackFetchMetrics: s4, clientComponentLoadTracker: void 0, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                    return t11.store = l4, l4;
                  })(l3, false));
                  return await eL.workAsyncStorage.run(f3, () => tp.workUnitAsyncStorage.run(h3, t10.handler, P2, R2));
                } finally {
                  setTimeout(() => {
                    r11.dispatchClose();
                  }, 0);
                }
              });
            };
            return n3.isOpenTelemetryEnabled() && !n3.hasActiveSpanContext() ? n3.trace(e1.request, { spanName: P2.method, kind: tt.SERVER, startTime: t10.requestStartTime, attributes: { "http.target": P2.nextUrl.pathname, "http.method": P2.method } }, a3) : a3();
          }
          return t10.handler(P2, R2);
        })) && !(l2 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        l2 && !T2 && l2.headers.has("x-middleware-set-cookie") && (l2 = new Response(l2.body, l2)).headers.delete("x-middleware-set-cookie"), l2 && u2 && l2.headers.set("set-cookie", u2);
        let A2 = null == l2 ? void 0 : l2.headers.get("x-middleware-rewrite");
        if (l2 && A2 && (S2 || !m2)) {
          let e10 = new F(A2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          m2 || e10.host !== P2.nextUrl.host || (e10.buildId = v2 || e10.buildId, l2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: o3 } = eP(e10.toString(), y2.toString());
          !m2 && w2 && l2.headers.set("x-nextjs-rewrite", r11);
          let s3 = !o3 && (null == (i2 = t10.request.nextConfig) || null == (a2 = i2.experimental) || null == (n2 = a2.clientParamParsingOrigins) ? void 0 : n2.some((t11) => new RegExp(t11).test(e10.origin)));
          S2 && (o3 || s3) && (y2.pathname !== e10.pathname && l2.headers.set("x-nextjs-rewritten-path", e10.pathname), y2.search !== e10.search && l2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (l2 && A2 && S2 && E2) {
          let e10 = new URL(A2);
          e10.searchParams.has(eT) || (e10.searchParams.set(eT, E2), l2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let O2 = null == l2 ? void 0 : l2.headers.get("Location");
        if (l2 && O2 && !m2) {
          let e10 = new F(O2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          l2 = new Response(l2.body, l2), e10.host === y2.host && (e10.buildId = v2 || e10.buildId, l2.headers.set("Location", eP(e10, y2).url)), w2 && (l2.headers.delete("Location"), l2.headers.set("x-nextjs-redirect", eP(e10.toString(), y2.toString()).url));
        }
        let N2 = l2 || eE.next();
        f2 && (function(e10, t11, r11) {
          if (!r11 || !e10.has("x-middleware-next") && !e10.has("x-middleware-rewrite")) return;
          let n3 = e10.get(tU);
          if (!n3) {
            if (t11.get("traceparent") === r11.traceparent && t11.get("tracestate") === (r11.tracestate ?? null)) return;
            let n4 = [];
            for (let [r12, a4] of t11) tG(r12) || (e10.set(tq + r12, a4), n4.push(r12));
            tB(e10, n4, r11);
            return;
          }
          let a3 = n3.split(",").map((e11) => e11.trim()).filter(Boolean);
          a3.includes("traceparent") && e10.get(tq + "traceparent") !== t11.get("traceparent") || tB(e10, a3.filter((e11) => !tG(e11)), r11);
        })(N2.headers, f2, h2);
        let M2 = N2.headers.get("x-middleware-override-headers"), k2 = [];
        if (M2) {
          for (let [e10, t11] of x2) N2.headers.set(`x-middleware-request-${e10}`, t11), k2.push(e10);
          k2.length > 0 && N2.headers.set("x-middleware-override-headers", M2 + "," + k2.join(","));
        }
        return { response: N2, waitUntil: ("internal" === R2[I].kind ? Promise.all(R2[I].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: P2.fetchMetrics };
      }
      let t3 = ["(..)(..)", "(.)", "(..)", "(...)"], t2 = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, t4 = /\/\[[^/]+\](?=\/|$)/;
      "u" > typeof performance && ["mark", "measure", "getEntriesByName"].every((e10) => "function" == typeof performance[e10]);
      class t9 extends Error {
      }
      class t5 {
        constructor(e10 = []) {
          this.normalizers = e10;
        }
        push(e10) {
          this.normalizers.push(e10);
        }
        normalize(e10) {
          return this.normalizers.reduce((e11, t10) => t10.normalize(e11), e10);
        }
      }
      class t6 {
        normalize(e10) {
          return e10.replace(/%5F/g, "_");
        }
      }
      var t8 = ((el = {}).PAGES = "PAGES", el.PAGES_API = "PAGES_API", el.APP_PAGE = "APP_PAGE", el.APP_ROUTE = "APP_ROUTE", el.IMAGE = "IMAGE", el);
      let t7 = "route-cache", re = new class extends t5 {
        constructor() {
          super([{ normalize: eO }, new t6()]);
        }
        normalize(e10) {
          return super.normalize(e10);
        }
      }();
      function rt(t10, r10) {
        let n2;
        if (!r10) throw new t_("Response cache requires a source route");
        let { sourceRoute: a2 } = r10;
        {
          let { createHash: t11 } = e.r(54799);
          n2 = t11("sha256").update(a2).digest("hex");
        }
        return `/${t7}/${r10.kind}/${n2}/$${(function(t11) {
          let r11 = /^\/index(\/|$)/.test(t11) && !(function(e10, t12 = true) {
            return (void 0 !== e10.split("/").find((e11) => t3.find((t13) => e11.startsWith(t13))) && (e10 = (function(e11) {
              let t13, r12, n3;
              for (let a3 of e11.split("/")) if (r12 = t3.find((e12) => a3.startsWith(e12))) {
                [t13, n3] = e11.split(r12, 2);
                break;
              }
              if (!t13 || !r12 || !n3) throw Error(`Invalid interception route: ${e11}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
              switch (t13 = eO(t13), r12) {
                case "(.)":
                  n3 = "/" === t13 ? `/${n3}` : t13 + "/" + n3;
                  break;
                case "(..)":
                  if ("/" === t13) throw Error(`Invalid interception route: ${e11}. Cannot use (..) marker at the root level, use (.) instead.`);
                  n3 = t13.split("/").slice(0, -1).concat(n3).join("/");
                  break;
                case "(...)":
                  n3 = "/" + n3;
                  break;
                case "(..)(..)":
                  let a3 = t13.split("/");
                  if (a3.length <= 2) throw Error(`Invalid interception route: ${e11}. Cannot use (..)(..) marker at the root level or one level up.`);
                  n3 = a3.slice(0, -2).concat(n3).join("/");
                  break;
                default:
                  throw Error("Invariant: unexpected marker");
              }
              return { interceptingRoute: t13, interceptedRoute: n3 };
            })(e10).interceptedRoute), t12) ? t4.test(e10) : t2.test(e10);
          })(t11) ? `/index${t11}` : "/" === t11 ? "/index" : eA(t11);
          {
            let { posix: t12 } = e.r(14747), n3 = t12.normalize(r11);
            if (n3 !== r11) throw new t9(`Requested and resolved page mismatch: ${r11} ${n3}`);
          }
          return r11;
        })(t10)}`;
      }
      var rr = ((ec = {}).APP_PAGE = "APP_PAGE", ec.APP_ROUTE = "APP_ROUTE", ec.PAGES = "PAGES", ec.FETCH = "FETCH", ec.REDIRECT = "REDIRECT", ec.IMAGE = "IMAGE", ec), rn = ((eu = {}).APP_PAGE = "APP_PAGE", eu.APP_ROUTE = "APP_ROUTE", eu.PAGES = "PAGES", eu.FETCH = "FETCH", eu.IMAGE = "IMAGE", eu);
      function ra() {
        let e10, t10, r10 = new Promise((r11, n2) => {
          e10 = r11, t10 = n2;
        });
        return { resolve: e10, reject: t10, promise: r10 };
      }
      class ri {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class ro {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class rs {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new ro(), this.tail = new ro(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10, e10)) ?? 1;
          if (r10 <= 0) throw Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`);
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let n2 = this.cache.get(e10);
          if (n2) n2.data = t10, this.totalSize = this.totalSize - n2.size + r10, n2.size = r10, this.moveToHead(n2);
          else {
            let n3 = new ri(e10, t10, r10);
            this.cache.set(e10, n3), this.addToHead(n3), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: rl, stdout: rc } = (null == (e_ = globalThis) ? void 0 : e_.process) ?? {}, ru = rl && !rl.NO_COLOR && (rl.FORCE_COLOR || (null == rc ? void 0 : rc.isTTY) && !rl.CI && "dumb" !== rl.TERM);
      (null == rc ? void 0 : rc.isTTY) || rl.NEXT_PRIVATE_PROMPT_OUTPUT;
      let rd = (e10, t10, r10, n2) => {
        let a2 = e10.substring(0, n2) + r10, i2 = e10.substring(n2 + t10.length), o2 = i2.indexOf(t10);
        return ~o2 ? a2 + rd(i2, t10, r10, o2) : a2 + i2;
      }, rh = (e10, t10, r10 = e10) => ru ? (n2) => {
        let a2 = "" + n2, i2 = a2.indexOf(t10, e10.length);
        return ~i2 ? e10 + rd(a2, t10, r10, i2) + t10 : e10 + a2 + t10;
      } : String, rf = rh("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      rh("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), rh("\x1B[3m", "\x1B[23m"), rh("\x1B[4m", "\x1B[24m"), rh("\x1B[7m", "\x1B[27m"), rh("\x1B[8m", "\x1B[28m"), rh("\x1B[9m", "\x1B[29m"), rh("\x1B[30m", "\x1B[39m");
      let rp = rh("\x1B[31m", "\x1B[39m"), rg = rh("\x1B[32m", "\x1B[39m"), r_ = rh("\x1B[33m", "\x1B[39m");
      rh("\x1B[34m", "\x1B[39m");
      let rm = rh("\x1B[35m", "\x1B[39m");
      rh("\x1B[38;2;173;127;168m", "\x1B[39m"), rh("\x1B[36m", "\x1B[39m");
      let ry = rh("\x1B[37m", "\x1B[39m");
      rh("\x1B[90m", "\x1B[39m"), rh("\x1B[40m", "\x1B[49m"), rh("\x1B[41m", "\x1B[49m"), rh("\x1B[42m", "\x1B[49m"), rh("\x1B[43m", "\x1B[49m"), rh("\x1B[44m", "\x1B[49m"), rh("\x1B[45m", "\x1B[49m"), rh("\x1B[46m", "\x1B[49m"), rh("\x1B[47m", "\x1B[49m"), ry(rf("\u25CB")), rp(rf("\u2A2F")), r_(rf("\u26A0")), ry(rf(" ")), rg(rf("\u2713")), rm(rf("\xBB")), new rs(1e4, (e10) => e10.length), new rs(1e4, (e10) => e10.length);
      let rv = "ResponseAborted";
      class rb extends Error {
        constructor(...e10) {
          super(...e10), this.name = rv;
        }
      }
      function rw(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === rv;
      }
      let rS = "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      async function rx(e10, t10, r10, n2) {
        try {
          let a2, { errored: i2, destroyed: o2 } = t10;
          if (i2 || o2) return;
          let s2 = (a2 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || a2.abort(new rb());
          }), a2), l2 = (function(e11, t11, r11) {
            let n3 = false, a3 = ra();
            function i3() {
              a3.resolve();
            }
            e11.on("drain", i3), e11.once("close", () => {
              e11.off("drain", i3), a3.resolve();
            });
            let o3 = ra();
            return e11.once("finish", () => {
              o3.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!n3) {
                if (n3 = true, rS) {
                  let e12 = null == r11 ? void 0 : r11.snapshot();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), tc().trace(eH.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await a3.promise, a3 = ra());
              } catch (t13) {
                throw e11.end(), Error("failed to write chunk to response", { cause: t13 });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), o3.promise;
            } });
          })(t10, r10, n2);
          await e10.pipeTo(l2, { signal: s2.signal });
        } catch (e11) {
          if (rw(e11)) return;
          throw Error("failed to pipe response", { cause: e11 });
        }
      }
      async function rE(e10, t10, r10, n2) {
        try {
          let { errored: a2, destroyed: i2 } = t10;
          if (a2 || i2) return;
          let o2 = false, s2 = ra(), l2 = false, c2 = () => {
            l2 && !e10.destroyed && (l2 = false, e10.resume());
          };
          t10.on("drain", c2), t10.once("close", () => {
            t10.off("drain", c2), e10.destroy(), s2.resolve();
          }), e10.on("data", (r11) => {
            if (!o2) {
              if (o2 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                let e11 = null == n2 ? void 0 : n2.snapshot();
                e11 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e11.clientComponentLoadStart, end: e11.clientComponentLoadStart + e11.clientComponentLoadTimes });
              }
              t10.flushHeaders(), tc().trace(eH.startResponse, { spanName: "start response" }, () => void 0);
            }
            let a3 = t10.write(r11);
            "flush" in t10 && "function" == typeof t10.flush && t10.flush(), a3 || (l2 = true, e10.pause());
          }), e10.on("end", async () => {
            r10 && await r10, t10.writableFinished || t10.end(), s2.resolve();
          }), e10.on("error", (e11) => {
            rw(e11) || t10.destroy(e11), s2.resolve();
          }), await s2.promise;
        } catch (e11) {
          if (rw(e11)) return;
          throw Error("failed to pipe response", { cause: e11 });
        }
      }
      function rP(e10) {
        return null !== e10 && "object" == typeof e10 && "function" == typeof e10.pipe && "function" == typeof e10.on && !(e10 instanceof ReadableStream);
      }
      class rC {
        static #e = this.EMPTY = new rC(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new rC(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: n2 }) {
          this.response = e10, this.contentType = t10, this.metadata = n2, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw new t_("dynamic responses cannot be unchunked. This is a bug in Next.js");
            return tS(this.readable);
          }
          return this.response;
        }
        get readable() {
          return null === this.response ? new ReadableStream({ start(e10) {
            e10.close();
          } }) : "string" == typeof this.response ? tb(this.response) : Buffer.isBuffer(this.response) ? tw(this.response) : Array.isArray(this.response) ? (function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), n2 = e10[0].pipeTo(r10, { preventClose: true }), a2 = 1;
            for (; a2 < e10.length - 1; a2++) {
              let t11 = e10[a2];
              n2 = n2.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let i2 = e10[a2];
            return (n2 = n2.then(() => i2.pipeTo(r10))).catch(ty), t10;
          })(...this.response) : rP(this.response) ? e.r(81111).Readable.toWeb(this.response) : this.response;
        }
        coerce() {
          return null === this.response ? [] : "string" == typeof this.response ? [tb(this.response)] : Array.isArray(this.response) ? this.response : Buffer.isBuffer(this.response) ? [tw(this.response)] : rP(this.response) ? [e.r(81111).Readable.toWeb(this.response)] : [this.response];
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (rw(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          null !== this.response && "string" != typeof this.response && !Buffer.isBuffer(this.response) && !Array.isArray(this.response) && rP(this.response) ? await rE(this.response, e10, this.waitUntil, this.metadata.clientComponentLoadTracker) : await rx(this.readable, e10, this.waitUntil, this.metadata.clientComponentLoadTracker);
        }
      }
      function rR(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      rR(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), rR(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var rT = e.i(69857);
      class rA {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(rT.default.dirname(e10)), n2 = r10[1].then(() => this.fs.writeFile(e10, t10));
          n2.catch(() => {
          }), r10[2].push(n2);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      var rO = e.i(96476);
      class rI {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        static #t = this.seedReads = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? rI.memoryCache ? rI.debug && console.log("FileSystemCache: memory store already initialized") : (rI.debug && console.log("FileSystemCache: using memory store for fetch cache"), rI.memoryCache = (0, rO.getMemoryCache)(e10.maxMemoryCacheSize)) : rI.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        getSeedReadState(e10) {
          return rI.seedReads.get(`${this.serverDistDir}:${e10}`);
        }
        beginSeedRead(e10) {
          let t10 = `${this.serverDistDir}:${e10}`, r10 = rI.seedReads.get(t10);
          return r10 || (r10 = { readers: 0, version: 0 }, rI.seedReads.set(t10, r10)), r10.readers++, { stateKey: t10, state: r10, version: r10.version };
        }
        finishSeedRead(e10, t10) {
          t10.readers--, 0 !== t10.readers || t10.promotion || rI.seedReads.delete(e10);
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, rI.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let n2 of e10) {
            let e11 = tm.tagsManifest.get(n2) || {};
            if (t10) {
              let a2 = { ...e11 };
              a2.stale = r10, void 0 !== t10.expire && (a2.expired = r10 + 1e3 * t10.expire), tm.tagsManifest.set(n2, a2);
            } else tm.tagsManifest.set(n2, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, n2, a2, i2, o2, s2, l2, c2, u2, d2, h2, f2, p2;
          let g2, [_2, x2] = e10, { kind: E2 } = x2, P2 = _2, C2 = null == (t10 = rI.memoryCache) ? void 0 : t10.get(_2), R2 = null == (r10 = this.getSeedReadState(_2)) ? void 0 : r10.promotion;
          !C2 && R2 && (await R2, C2 = null == (s2 = rI.memoryCache) ? void 0 : s2.get(_2)), rI.debug && (E2 === rn.FETCH ? console.log("FileSystemCache: get", _2, x2.tags, E2, !!C2) : console.log("FileSystemCache: get", _2, E2, !!C2));
          let T2 = E2 === rn.PAGES || E2 === rn.APP_PAGE || E2 === rn.APP_ROUTE;
          if (!C2 && T2 && _2.startsWith(`/${t7}/`) && 1) {
            let e11 = this.getFilePath(E2 === rn.APP_ROUTE ? `${_2}.body` : `${_2}.html`, E2);
            if (!this.fs.existsSync(e11)) {
              let e12 = _2.indexOf("/$/");
              if (-1 !== e12) {
                let t11 = _2.slice(e12 + 2), r11 = this.getFilePath(`${t11}${w}`, E2);
                try {
                  let e13 = JSON.parse(this.fs.readFileSync(r11, "utf8")), n3 = _2.indexOf("/$/"), a3 = e13.routeCache ? rt("/", e13.routeCache.owner) : void 0;
                  (null == (l2 = e13.routeCache) ? void 0 : l2.key) === _2 && (e13.routeCache.isFallback === !!x2.isFallback || E2 === rn.APP_PAGE && x2.isRoutePPREnabled && null != e13.postponed) && (null == a3 ? void 0 : a3.slice(0, a3.indexOf("/$/"))) === _2.slice(0, n3) && (P2 = t11, g2 = this.beginSeedRead(_2));
                } catch {
                }
              }
            }
          }
          if (!C2) try {
            if (E2 === rn.APP_ROUTE) {
              let e11 = this.getFilePath(`${P2}.body`, rn.APP_ROUTE), t11 = await this.fs.readFile(e11), { mtime: r11 } = await this.fs.stat(e11), n3 = JSON.parse(await this.fs.readFile(e11.replace(/\.body$/, w), "utf8"));
              C2 = { lastModified: n3.routeCacheLastModified ?? r11.getTime(), value: { kind: rr.APP_ROUTE, body: t11, headers: n3.headers, status: n3.status }, cacheControl: n3.cacheControl };
            } else {
              let e11 = this.getFilePath(E2 === rn.FETCH ? P2 : `${P2}.html`, E2), t11 = await this.fs.readFile(e11, "utf8"), { mtime: r11 } = await this.fs.stat(e11);
              if (E2 === rn.FETCH) {
                let { tags: e12, fetchIdx: n3, fetchUrl: a3 } = x2;
                if (!this.flushToDisk) return null;
                let i3 = r11.getTime(), o3 = JSON.parse(t11);
                if (C2 = { lastModified: i3, value: o3 }, (null == (c2 = C2.value) ? void 0 : c2.kind) === rr.FETCH) {
                  let t12 = null == (u2 = C2.value) ? void 0 : u2.tags;
                  (null == e12 ? void 0 : e12.every((e13) => null == t12 ? void 0 : t12.includes(e13))) || (rI.debug && console.log("FileSystemCache: tags vs storedTags mismatch", e12, t12), await this.set(_2, C2.value, { fetchCache: true, tags: e12, fetchIdx: n3, fetchUrl: a3 }));
                }
              } else if (E2 === rn.APP_PAGE) {
                let n3, a3, i3 = JSON.parse(await this.fs.readFile(e11.replace(/\.html$/, w), "utf8"));
                if (null == i3 ? void 0 : i3.segmentPaths) {
                  let e12 = /* @__PURE__ */ new Map();
                  n3 = e12;
                  let t12 = P2 + m;
                  await Promise.all(i3.segmentPaths.map(async (r12) => {
                    let n4 = this.getFilePath(t12 + r12 + y, rn.APP_PAGE);
                    try {
                      e12.set(r12, await this.fs.readFile(n4));
                    } catch {
                    }
                  }));
                }
                x2.isFallback || x2.isRoutePPREnabled && (null == i3 ? void 0 : i3.postponed) != null || (a3 = await this.fs.readFile(this.getFilePath(`${P2}${v}`, rn.APP_PAGE))), C2 = { lastModified: i3.routeCacheLastModified ?? r11.getTime(), value: { kind: rr.APP_PAGE, html: t11, rscData: a3, postponed: null == i3 ? void 0 : i3.postponed, headers: null == i3 ? void 0 : i3.headers, status: null == i3 ? void 0 : i3.status, segmentData: n3 }, cacheControl: null == i3 ? void 0 : i3.cacheControl };
              } else if (E2 === rn.PAGES) {
                let n3 = JSON.parse(await this.fs.readFile(e11.replace(/\.html$/, w), "utf8")), a3 = {};
                x2.isFallback || (a3 = JSON.parse(await this.fs.readFile(this.getFilePath(`${P2}${b}`, rn.PAGES), "utf8"))), C2 = { lastModified: n3.routeCacheLastModified ?? r11.getTime(), value: { kind: rr.PAGES, html: t11, pageData: a3, headers: null == n3 ? void 0 : n3.headers, status: null == n3 ? void 0 : n3.status } };
              } else throw Error(`Invariant: Unexpected route kind ${E2} in file system cache.`);
            }
            C2 && !g2 && (null == (d2 = rI.memoryCache) || d2.set(_2, C2));
          } catch {
            return g2 && this.finishSeedRead(g2.stateKey, g2.state), null;
          }
          if ((null == C2 || null == (n2 = C2.value) ? void 0 : n2.kind) === rr.APP_PAGE || (null == C2 || null == (a2 = C2.value) ? void 0 : a2.kind) === rr.APP_ROUTE || (null == C2 || null == (i2 = C2.value) ? void 0 : i2.kind) === rr.PAGES) {
            let e11 = null == (h2 = C2.value.headers) ? void 0 : h2[S];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && (0, tm.areTagsExpired)(t11, C2.lastModified)) return rI.debug && console.log("FileSystemCache: expired tags", t11), g2 && this.finishSeedRead(g2.stateKey, g2.state), null;
            }
          } else if ((null == C2 || null == (o2 = C2.value) ? void 0 : o2.kind) === rr.FETCH) {
            let e11 = x2.kind === rn.FETCH ? [...x2.tags || [], ...x2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return rI.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if ((0, tm.areTagsExpired)(e11, C2.lastModified)) return rI.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          if (g2 && C2) {
            let { stateKey: e11, state: t11, version: r11 } = g2;
            try {
              t11.version === r11 && (await this.promoteSeed(_2, P2, C2, x2, e11, t11, r11), t11.version !== r11 || (null == (f2 = rI.memoryCache) ? void 0 : f2.get(_2)) || null == (p2 = rI.memoryCache) || p2.set(_2, C2));
            } finally {
              this.finishSeedRead(e11, t11);
            }
          }
          return C2 ?? null;
        }
        async promoteSeed(e10, t10, r10, n2, a2, i2, o2) {
          let s2 = this.fs.writeFileAtomic;
          if (!this.flushToDisk || !s2 || !r10.value) return;
          if (i2.promotion) return void await i2.promotion;
          let l2 = (async () => {
            let a3 = r10.value;
            if (!a3 || i2.version !== o2 || a3.kind !== rr.PAGES && a3.kind !== rr.APP_PAGE && a3.kind !== rr.APP_ROUTE) return;
            let l3 = n2.kind, c2 = this.getFilePath(a3.kind === rr.APP_ROUTE ? `${e10}.body` : `${e10}.html`, l3);
            if (this.fs.existsSync(c2)) return;
            let u2 = this.getFilePath(a3.kind === rr.APP_ROUTE ? `${t10}.body` : `${t10}.html`, l3), d2 = u2.replace(a3.kind === rr.APP_ROUTE ? /\.body$/ : /\.html$/, w), h2 = JSON.parse(await this.fs.readFile(d2, "utf8"));
            h2.routeCacheLastModified = r10.lastModified;
            let f2 = [];
            a3.kind !== rr.PAGES || n2.isFallback ? a3.kind === rr.APP_PAGE && (n2.isFallback || n2.isRoutePPREnabled && null != h2.postponed || f2.push({ path: this.getFilePath(`${e10}${v}`, l3), data: await this.fs.readFile(this.getFilePath(`${t10}${v}`, l3)) }), f2.push(...await Promise.all((h2.segmentPaths ?? []).map(async (r11) => ({ path: this.getFilePath(e10 + m + r11 + y, l3), data: await this.fs.readFile(this.getFilePath(t10 + m + r11 + y, l3)) }))))) : f2.push({ path: this.getFilePath(`${e10}${b}`, l3), data: await this.fs.readFile(this.getFilePath(`${t10}${b}`, l3)) });
            let p2 = new rA(this.fs);
            for (let e11 of f2) p2.append(e11.path, e11.data);
            if (await p2.wait(), i2.version !== o2) return;
            let g2 = c2.replace(a3.kind === rr.APP_ROUTE ? /\.body$/ : /\.html$/, w);
            await this.fs.mkdir(rT.default.dirname(g2)), await this.fs.writeFile(g2, JSON.stringify(h2)), i2.version !== o2 || this.fs.existsSync(c2) || await s2.call(this.fs, c2, await this.fs.readFile(u2));
          })();
          i2.promotion = l2.catch((e11) => {
            rI.debug && console.log("FileSystemCache: failed to promote build seed", e11);
          });
          try {
            await i2.promotion;
          } finally {
            i2.promotion && (i2.promotion = void 0), 0 === i2.readers && rI.seedReads.delete(a2);
          }
        }
        async set(e10, t10, r10) {
          var n2;
          let a2 = r10.fetchCache ? void 0 : r10.cacheControl, i2 = this.getSeedReadState(e10);
          if (i2 && i2.version++, null == (n2 = rI.memoryCache) || n2.set(e10, { value: t10, lastModified: Date.now(), cacheControl: a2 }), rI.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          await (null == i2 ? void 0 : i2.promotion);
          let o2 = new rA(this.fs);
          if (t10.kind === rr.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, rn.APP_ROUTE);
            o2.append(r11, t10.body);
            let n3 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0, cacheControl: a2 };
            o2.append(r11.replace(/\.body$/, w), JSON.stringify(n3, null, 2));
          } else if (t10.kind === rr.PAGES || t10.kind === rr.APP_PAGE) {
            let n3 = t10.kind === rr.APP_PAGE, i3 = this.getFilePath(`${e10}.html`, n3 ? rn.APP_PAGE : rn.PAGES);
            if (o2.append(i3, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || o2.append(this.getFilePath(`${e10}${n3 ? v : b}`, n3 ? rn.APP_PAGE : rn.PAGES), n3 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === rr.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = i3.replace(/\.html$/, m);
                for (let [n4, a3] of t10.segmentData) {
                  e11.push(n4);
                  let t11 = r12 + n4 + y;
                  o2.append(t11, a3);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0, cacheControl: a2 };
              o2.append(i3.replace(/\.html$/, w), JSON.stringify(r11));
            } else {
              let e11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
              o2.append(i3.replace(/\.html$/, w), JSON.stringify(e11));
            }
          } else if (t10.kind === rr.FETCH) {
            let n3 = this.getFilePath(e10, rn.FETCH);
            o2.append(n3, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await o2.wait();
        }
        getFilePath(e10, t10) {
          let r10;
          switch (t10) {
            case rn.FETCH:
              r10 = rT.default.join(this.serverDistDir, "..", "cache", "fetch-cache");
              break;
            case rn.PAGES:
              r10 = rT.default.join(this.serverDistDir, "pages");
              break;
            case rn.IMAGE:
            case rn.APP_PAGE:
            case rn.APP_ROUTE:
              r10 = rT.default.join(this.serverDistDir, "app");
              break;
            default:
              throw Error(`Unexpected file path kind: ${t10}`);
          }
          (t10 === rn.PAGES || t10 === rn.APP_PAGE || t10 === rn.APP_ROUTE) && e10.startsWith(`/${t7}/`) && (r10 = rT.default.join(this.serverDistDir, "."));
          let n2 = rT.default.join(r10, e10);
          if (!(n2.startsWith(r10 + rT.default.sep) || n2 === r10)) throw Error(`Invalid file path: ${n2}`);
          return n2;
        }
      }
      var rN = e.i(55292);
      function rL(e10) {
        let t10 = "buffer" in e10 ? new Uint8Array(e10.buffer, e10.byteOffset, e10.byteLength) : new Uint8Array(e10), r10 = "";
        for (let e11 of t10) r10 += e11.toString(16).padStart(2, "0");
        return r10;
      }
      async function rM(t10) {
        return e.r(54799).createHash("sha256").update(t10).digest("hex");
      }
      e.i(13646);
      class rk {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: n2, serverDistDir: a2, requestHeaders: i2, maxMemoryCacheSize: o2, previewProps: s2, prerenderManifest: l2, fetchCacheKeyPrefix: c2, CurCacheHandler: u2, allowedRevalidateHeaderKeys: d2, locales: h2 }) {
          var f2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!u2;
          let p2 = /* @__PURE__ */ Symbol.for("@next/cache-handlers"), _2 = globalThis;
          if (u2) rk.debug && console.log("IncrementalCache: using custom cache handler", u2.name);
          else {
            let t11 = _2[p2];
            (null == t11 ? void 0 : t11.FetchCache) ? (u2 = t11.FetchCache, rk.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && a2 && (rk.debug && console.log("IncrementalCache: using filesystem cache handler"), u2 = rI);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (o2 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = n2, this.requestHeaders = i2, this.allowedRevalidateHeaderKeys = d2, this.previewProps = s2, this.prerenderManifest = l2, this.locales = h2, this.cacheControls = new rN.SharedCacheControls(this.prerenderManifest, h2), this.fetchCacheKeyPrefix = c2;
          let m2 = [];
          i2[g] === this.previewProps.previewModeId && (this.isOnDemandRevalidate = true), n2 && (m2 = this.revalidatedTags = (f2 = this.previewProps.previewModeId, "string" == typeof i2[x] && i2["x-next-revalidate-tag-token"] === f2 ? i2[x].split(",") : [])), u2 && (this.cacheHandler = new u2({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: a2, revalidatedTags: m2, maxMemoryCacheSize: o2, _requestHeaders: i2, fetchCacheKeyPrefix: c2 }));
        }
        calculateRevalidate(e10, t10, r10, n2) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let a2 = e10 ? e10.revalidate : !n2 && 1;
          return "number" == typeof a2 ? 1e3 * a2 + t10 : a2;
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (rk.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = ra();
          return rk.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateSimpleCacheKey(e10) {
          return rM(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10]));
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], n2 = new TextEncoder(), a2 = null, i2 = t10.body;
          if (i2) if ("object" == typeof i2 && "byteLength" in i2) r10.push(`bytes:${rL(i2)}`), t10._ogBody = i2;
          else if ("function" == typeof i2.getReader) {
            let e11 = [];
            try {
              await i2.pipeTo(new WritableStream({ write(t11) {
                e11.push("string" == typeof t11 ? n2.encode(t11) : t11);
              } }));
              let a3 = e11.reduce((e12, t11) => e12 + t11.length, 0), o3 = new Uint8Array(a3), s2 = 0;
              for (let t11 of e11) o3.set(t11, s2), s2 += t11.length;
              r10.push(`bytes:${rL(o3)}`), t10._ogBody = o3;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof i2.keys) for (let [e11, n3] of (a2 = "[object FormData]" === String(i2) ? "multipart/form-data; boundary=" : "application/x-www-form-urlencoded;charset=UTF-8", t10._ogBody = i2, i2.entries())) r10.push(`key:${e11}`), "string" == typeof n3 ? r10.push(`str:${n3}`) : r10.push("file", n3.name, n3.type, `bytes:${rL(await n3.arrayBuffer())}`);
          else if ("function" == typeof i2.arrayBuffer) {
            let e11 = await i2.arrayBuffer();
            r10.push("blob", i2.type, `bytes:${rL(e11)}`), t10._ogBody = new Blob([e11], { type: i2.type }), a2 = i2.type;
          } else if ("string" == typeof i2) r10.push(`str:${i2}`), t10._ogBody = i2, a2 = "text/plain;charset=UTF-8";
          else throw Error(`Unsupported body type: ${typeof i2}`);
          let o2 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          return "traceparent" in o2 && delete o2.traceparent, "tracestate" in o2 && delete o2.tracestate, rM(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10, t10.method, a2, o2, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]));
        }
        async get(e10, t10) {
          var r10, n2, a2, i2, o2, s2, l2;
          let c2, u2;
          if (t10.kind === rn.IMAGE) throw new t_("Images must use the image optimizer cache");
          if (t10.kind === rn.FETCH) {
            let r11 = tp.workUnitAsyncStorage.getStore(), n3 = r11 ? (0, tp.getResumeDataCache)(r11) : null;
            if (n3) {
              let r12 = n3.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === rr.FETCH) {
                let n4 = eL.workAsyncStorage.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == n4 || null == (r13 = n4.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return rk.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                rk.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else rk.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else rk.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== rn.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          let d2 = e10, h2 = t10;
          if (t10.kind !== rn.FETCH) {
            let { route: r11, ...n3 } = t10;
            d2 = rt(e10, r11), h2 = n3;
          }
          let f2 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(d2, h2));
          if (t10.kind === rn.FETCH) {
            if (!f2) return null;
            if ((null == (a2 = f2.value) ? void 0 : a2.kind) !== rr.FETCH) throw new t_(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (i2 = f2.value) ? void 0 : i2.kind)} instead.`);
            let r11 = eL.workAsyncStorage.getStore(), n3 = [...t10.tags || [], ...t10.softTags || []];
            if (n3.some((e11) => {
              var t11, n4;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (n4 = r11.pendingRevalidatedTags) ? void 0 : n4.some((t12) => t12.tag === e11));
            })) return rk.debug && console.log("IncrementalCache: expired tag", e10), null;
            let o3 = tp.workUnitAsyncStorage.getStore();
            if (o3) {
              let t11 = (0, tp.getResumeDataCache)(o3);
              (null == t11 ? void 0 : t11.mutable) && (rk.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, f2.value));
            }
            let s3 = t10.revalidate || f2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (f2.lastModified || 0)) / 1e3 > s3, c3 = f2.value.data;
            return (0, tm.areTagsExpired)(n3, f2.lastModified) ? null : ((0, tm.areTagsStale)(n3, f2.lastModified) && (l3 = true), { isStale: l3, value: { kind: rr.FETCH, data: c3, revalidate: s3 } });
          }
          if ((null == f2 || null == (n2 = f2.value) ? void 0 : n2.kind) === rr.FETCH) throw new t_(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`);
          let p2 = null, { isFallback: g2 } = t10, _2 = this.cacheControls.get(e10, t10.route);
          if ((null == f2 ? void 0 : f2.cacheControl) && (_2 = f2.cacheControl, this.cacheControls.set(d2, _2)), (null == f2 ? void 0 : f2.lastModified) === -1) c2 = -1, u2 = -31536e6;
          else {
            let e11 = performance.timeOrigin + performance.now(), r11 = (null == f2 ? void 0 : f2.lastModified) || e11;
            u2 = this.calculateRevalidate(_2, r11, this.dev ?? false, t10.isFallback);
            let n3 = "number" == typeof (null == _2 ? void 0 : _2.expire) ? 1e3 * _2.expire + r11 : void 0;
            if (void 0 !== n3 && n3 < e11) c2 = -1;
            else if (void 0 === (c2 = false !== u2 && u2 < e11 || void 0) && ((null == f2 || null == (o2 = f2.value) ? void 0 : o2.kind) === rr.APP_PAGE || (null == f2 || null == (s2 = f2.value) ? void 0 : s2.kind) === rr.APP_ROUTE)) {
              let e12 = null == (l2 = f2.value.headers) ? void 0 : l2[S];
              if ("string" == typeof e12) {
                let t11 = e12.split(",");
                t11.length > 0 && ((0, tm.areTagsExpired)(t11, r11) ? c2 = -1 : (0, tm.areTagsStale)(t11, r11) && (c2 = true));
              }
            }
          }
          return f2 && (p2 = { isStale: c2, cacheControl: _2, revalidateAfter: u2, value: f2.value, isFallback: g2 }), !f2 && this.prerenderManifest.notFoundRoutes.includes(e10) && (function(e11, t11, r11, n3) {
            if (!r11) return false;
            let a3 = null === r11.dataRoute ? t8.APP_ROUTE : r11.dataRoute.endsWith(".json") ? t8.PAGES : r11.dataRoute.endsWith(".rsc") ? t8.APP_PAGE : void 0;
            return a3 === t11.kind && (("srcRoute" in r11 ? r11.srcRoute : r11.fallbackSourceRoute) ?? (a3 === t8.PAGES ? $(e11, n3).pathname : e11)) === (a3 === t8.PAGES ? t11.sourceRoute : re.normalize(t11.sourceRoute));
          })(e10, t10.route, this.prerenderManifest.routes[e10], this.locales) && (p2 = { isStale: c2, value: null, cacheControl: _2, revalidateAfter: u2, isFallback: g2 }, this.set(e10, p2.value, { ...t10, cacheControl: _2 })), p2;
        }
        async set(e10, t10, r10) {
          if ("kind" in r10 && r10.kind === rn.IMAGE) throw new t_("Images must use the image optimizer cache");
          if ((null == t10 ? void 0 : t10.kind) === rr.FETCH) {
            let r11 = tp.workUnitAsyncStorage.getStore(), n3 = r11 ? (0, tp.getResumeDataCache)(r11) : null;
            (null == n3 ? void 0 : n3.mutable) && (rk.debug && console.log("IncrementalCache: rdc:set", e10), n3.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          let n2 = e10, a2 = r10;
          if (!r10.fetchCache) {
            let { route: t11, ...i3 } = r10;
            if (!t11) throw new t_("Response cache requires a source route");
            n2 = rt(e10, t11), a2 = i3;
          }
          let i2 = JSON.stringify(t10).length;
          if (r10.fetchCache && i2 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${i2} bytes)`;
            if (this.dev) throw Error(t11);
            console.warn(t11);
            return;
          }
          try {
            var o2;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(n2, r10.cacheControl), await (null == (o2 = this.cacheHandler) ? void 0 : o2.set(n2, t10, a2));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      var rD = e.i(84652);
      function rj(e10, t10, r10) {
        return "string" == typeof e10 ? e10 : e10[t10] || r10;
      }
      function rU(e10) {
        let t10 = (function() {
          try {
            return "true" === process.env._next_intl_trailing_slash;
          } catch {
            return false;
          }
        })(), [r10, ...n2] = e10.split("#"), a2 = n2.join("#"), i2 = r10;
        if ("/" !== i2) {
          let e11 = i2.endsWith("/");
          t10 && !e11 ? i2 += "/" : !t10 && e11 && (i2 = i2.slice(0, -1));
        }
        return a2 && (i2 += "#" + a2), i2;
      }
      function rq(e10, t10) {
        let r10 = rU(e10), n2 = rU(t10);
        return rG(r10).test(n2);
      }
      function r$(e10, t10) {
        return "never" !== t10.mode && t10.prefixes?.[e10] || "/" + e10;
      }
      function rG(e10) {
        let t10 = e10.replace(/\/\[\[(\.\.\.[^\]]+)\]\]/g, "(?:/(.*))?").replace(/\[\[(\.\.\.[^\]]+)\]\]/g, "(?:/(.*))?").replace(/\[(\.\.\.[^\]]+)\]/g, "(.+)").replace(/\[([^\]]+)\]/g, "([^/]+)");
        return RegExp(`^${t10}$`);
      }
      function rB(e10) {
        return e10.includes("[[...");
      }
      function rH(e10) {
        return e10.includes("[...");
      }
      function rF(e10) {
        return e10.includes("[");
      }
      function rV(e10, t10) {
        let r10 = e10.split("/"), n2 = t10.split("/"), a2 = Math.max(r10.length, n2.length);
        for (let e11 = 0; e11 < a2; e11++) {
          let t11 = r10[e11], a3 = n2[e11];
          if (!t11 && a3) return -1;
          if (t11 && !a3) return 1;
          if (t11 || a3) {
            if (!rF(t11) && rF(a3)) return -1;
            if (rF(t11) && !rF(a3)) return 1;
            if (!rH(t11) && rH(a3)) return -1;
            if (rH(t11) && !rH(a3)) return 1;
            if (!rB(t11) && rB(a3)) return -1;
            if (rB(t11) && !rB(a3)) return 1;
          }
        }
        return 0;
      }
      function rz(e10, t10, r10, n2) {
        let a2 = "";
        return a2 += (function(e11, t11) {
          if (!t11) return e11;
          let r11 = e11 = e11.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
          return Object.entries(t11).forEach(([e12, t12]) => {
            r11 = r11.replace(`[${e12}]`, () => t12);
          }), r11;
        })(r10, (function(e11, t11) {
          let r11 = rU(t11), n3 = rU(e11), a3 = rG(n3).exec(r11);
          if (!a3) return;
          let i2 = {}, o2 = n3.match(/\[([^\]]+)\]/g) ?? [];
          for (let e12 = 1; e12 < a3.length; e12++) {
            let t12 = o2[e12 - 1];
            if (!t12) continue;
            let r12 = t12.replace(/[[\]]/g, ""), n4 = a3[e12] ?? "";
            i2[r12] = n4;
          }
          return i2;
        })(t10, e10)), a2 = rU(a2);
      }
      function rW(e10, t10, r10) {
        e10.endsWith("/") || (e10 += "/");
        let n2 = rK(t10, r10), a2 = RegExp(`^(${n2.map(([, e11]) => e11.replaceAll("/", "\\/")).join("|")})/(.*)`, "i"), i2 = e10.match(a2), o2 = i2 ? "/" + i2[2] : e10;
        return "/" !== o2 && (o2 = rU(o2)), o2;
      }
      function rK(e10, t10, r10 = true) {
        let n2 = e10.map((e11) => [e11, r$(e11, t10)]);
        return r10 && n2.sort((e11, t11) => t11[1].length - e11[1].length), n2;
      }
      function rX(e10, t10, r10, n2) {
        let a2 = rK(t10, r10);
        for (let [t11, r11] of (n2 && a2.sort(([e11], [t12]) => {
          if (e11 === n2.defaultLocale) return -1;
          if (t12 === n2.defaultLocale) return 1;
          let r12 = n2.locales.includes(e11), a3 = n2.locales.includes(t12);
          return r12 && !a3 ? -1 : !r12 && a3 ? 1 : 0;
        }), a2)) {
          let n3, a3;
          if (e10 === r11 || e10.startsWith(r11 + "/")) n3 = a3 = true;
          else {
            let t12 = e10.toLowerCase(), i2 = r11.toLowerCase();
            (t12 === i2 || t12.startsWith(i2 + "/")) && (n3 = false, a3 = true);
          }
          if (a3) return { locale: t11, prefix: r11, matchedPrefix: e10.slice(0, r11.length), exact: n3 };
        }
      }
      function rY(e10, t10, r10) {
        var n2;
        let a2, i2 = e10;
        return t10 && (n2 = i2, a2 = t10, /^\/(\?.*)?$/.test(n2) && (n2 = n2.slice(1)), i2 = a2 += n2), r10 && (i2 += r10), i2;
      }
      function rJ(e10) {
        return e10.get("x-forwarded-host") ?? e10.get("host") ?? void 0;
      }
      function rZ(e10, t10) {
        return t10.defaultLocale === e10 || t10.locales.includes(e10);
      }
      function rQ(e10, t10, r10) {
        let n2;
        return e10 && rZ(t10, e10) && (n2 = e10), n2 || (n2 = r10.find((e11) => e11.defaultLocale === t10)), n2 || (n2 = r10.find((e11) => e11.locales.includes(t10))), n2;
      }
      function r0(e10, t10, r10, n2) {
        let a2 = null == n2 || "number" == typeof n2 || "boolean" == typeof n2 ? n2 : r10(n2), i2 = t10.get(a2);
        return void 0 === i2 && (i2 = e10.call(this, n2), t10.set(a2, i2)), i2;
      }
      function r1(e10, t10, r10) {
        let n2 = Array.prototype.slice.call(arguments, 3), a2 = r10(n2), i2 = t10.get(a2);
        return void 0 === i2 && (i2 = e10.apply(this, n2), t10.set(a2, i2)), i2;
      }
      var r3 = class {
        constructor() {
          this.cache = /* @__PURE__ */ Object.create(null);
        }
        get(e10) {
          return this.cache[e10];
        }
        set(e10, t10) {
          this.cache[e10] = t10;
        }
      };
      let r2 = { "written-new": [{ paradigmLocales: { _locales: "en en_GB es es_419 pt_BR pt_PT" } }, { $enUS: { _value: "AS+CA+GU+MH+MP+PH+PR+UM+US+VI" } }, { $cnsar: { _value: "HK+MO" } }, { $americas: { _value: "019" } }, { $maghreb: { _value: "MA+DZ+TN+LY+MR+EH" } }, { no: { _desired: "nb", _distance: "1" } }, { bs: { _desired: "hr", _distance: "4" } }, { bs: { _desired: "sh", _distance: "4" } }, { hr: { _desired: "sh", _distance: "4" } }, { sr: { _desired: "sh", _distance: "4" } }, { aa: { _desired: "ssy", _distance: "4" } }, { de: { _desired: "gsw", _distance: "4", _oneway: "true" } }, { de: { _desired: "lb", _distance: "4", _oneway: "true" } }, { no: { _desired: "da", _distance: "8" } }, { nb: { _desired: "da", _distance: "8" } }, { ru: { _desired: "ab", _distance: "30", _oneway: "true" } }, { en: { _desired: "ach", _distance: "30", _oneway: "true" } }, { nl: { _desired: "af", _distance: "20", _oneway: "true" } }, { en: { _desired: "ak", _distance: "30", _oneway: "true" } }, { en: { _desired: "am", _distance: "30", _oneway: "true" } }, { es: { _desired: "ay", _distance: "20", _oneway: "true" } }, { ru: { _desired: "az", _distance: "30", _oneway: "true" } }, { ur: { _desired: "bal", _distance: "20", _oneway: "true" } }, { ru: { _desired: "be", _distance: "20", _oneway: "true" } }, { en: { _desired: "bem", _distance: "30", _oneway: "true" } }, { hi: { _desired: "bh", _distance: "30", _oneway: "true" } }, { en: { _desired: "bn", _distance: "30", _oneway: "true" } }, { zh: { _desired: "bo", _distance: "20", _oneway: "true" } }, { fr: { _desired: "br", _distance: "20", _oneway: "true" } }, { es: { _desired: "ca", _distance: "20", _oneway: "true" } }, { fil: { _desired: "ceb", _distance: "30", _oneway: "true" } }, { en: { _desired: "chr", _distance: "20", _oneway: "true" } }, { ar: { _desired: "ckb", _distance: "30", _oneway: "true" } }, { fr: { _desired: "co", _distance: "20", _oneway: "true" } }, { fr: { _desired: "crs", _distance: "20", _oneway: "true" } }, { sk: { _desired: "cs", _distance: "20" } }, { en: { _desired: "cy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ee", _distance: "30", _oneway: "true" } }, { en: { _desired: "eo", _distance: "30", _oneway: "true" } }, { es: { _desired: "eu", _distance: "20", _oneway: "true" } }, { da: { _desired: "fo", _distance: "20", _oneway: "true" } }, { nl: { _desired: "fy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ga", _distance: "20", _oneway: "true" } }, { en: { _desired: "gaa", _distance: "30", _oneway: "true" } }, { en: { _desired: "gd", _distance: "20", _oneway: "true" } }, { es: { _desired: "gl", _distance: "20", _oneway: "true" } }, { es: { _desired: "gn", _distance: "20", _oneway: "true" } }, { hi: { _desired: "gu", _distance: "30", _oneway: "true" } }, { en: { _desired: "ha", _distance: "30", _oneway: "true" } }, { en: { _desired: "haw", _distance: "20", _oneway: "true" } }, { fr: { _desired: "ht", _distance: "20", _oneway: "true" } }, { ru: { _desired: "hy", _distance: "30", _oneway: "true" } }, { en: { _desired: "ia", _distance: "30", _oneway: "true" } }, { en: { _desired: "ig", _distance: "30", _oneway: "true" } }, { en: { _desired: "is", _distance: "20", _oneway: "true" } }, { id: { _desired: "jv", _distance: "20", _oneway: "true" } }, { en: { _desired: "ka", _distance: "30", _oneway: "true" } }, { fr: { _desired: "kg", _distance: "30", _oneway: "true" } }, { ru: { _desired: "kk", _distance: "30", _oneway: "true" } }, { en: { _desired: "km", _distance: "30", _oneway: "true" } }, { en: { _desired: "kn", _distance: "30", _oneway: "true" } }, { en: { _desired: "kri", _distance: "30", _oneway: "true" } }, { tr: { _desired: "ku", _distance: "30", _oneway: "true" } }, { ru: { _desired: "ky", _distance: "30", _oneway: "true" } }, { it: { _desired: "la", _distance: "20", _oneway: "true" } }, { en: { _desired: "lg", _distance: "30", _oneway: "true" } }, { fr: { _desired: "ln", _distance: "30", _oneway: "true" } }, { en: { _desired: "lo", _distance: "30", _oneway: "true" } }, { en: { _desired: "loz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "lua", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mai", _distance: "20", _oneway: "true" } }, { en: { _desired: "mfe", _distance: "30", _oneway: "true" } }, { fr: { _desired: "mg", _distance: "30", _oneway: "true" } }, { en: { _desired: "mi", _distance: "20", _oneway: "true" } }, { en: { _desired: "ml", _distance: "30", _oneway: "true" } }, { ru: { _desired: "mn", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mr", _distance: "30", _oneway: "true" } }, { id: { _desired: "ms", _distance: "30", _oneway: "true" } }, { en: { _desired: "mt", _distance: "30", _oneway: "true" } }, { en: { _desired: "my", _distance: "30", _oneway: "true" } }, { en: { _desired: "ne", _distance: "30", _oneway: "true" } }, { nb: { _desired: "nn", _distance: "20" } }, { no: { _desired: "nn", _distance: "20" } }, { en: { _desired: "nso", _distance: "30", _oneway: "true" } }, { en: { _desired: "ny", _distance: "30", _oneway: "true" } }, { en: { _desired: "nyn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "oc", _distance: "20", _oneway: "true" } }, { en: { _desired: "om", _distance: "30", _oneway: "true" } }, { en: { _desired: "or", _distance: "30", _oneway: "true" } }, { en: { _desired: "pa", _distance: "30", _oneway: "true" } }, { en: { _desired: "pcm", _distance: "20", _oneway: "true" } }, { en: { _desired: "ps", _distance: "30", _oneway: "true" } }, { es: { _desired: "qu", _distance: "30", _oneway: "true" } }, { de: { _desired: "rm", _distance: "20", _oneway: "true" } }, { en: { _desired: "rn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "rw", _distance: "30", _oneway: "true" } }, { hi: { _desired: "sa", _distance: "30", _oneway: "true" } }, { en: { _desired: "sd", _distance: "30", _oneway: "true" } }, { en: { _desired: "si", _distance: "30", _oneway: "true" } }, { en: { _desired: "sn", _distance: "30", _oneway: "true" } }, { en: { _desired: "so", _distance: "30", _oneway: "true" } }, { en: { _desired: "sq", _distance: "30", _oneway: "true" } }, { en: { _desired: "st", _distance: "30", _oneway: "true" } }, { id: { _desired: "su", _distance: "20", _oneway: "true" } }, { en: { _desired: "sw", _distance: "30", _oneway: "true" } }, { en: { _desired: "ta", _distance: "30", _oneway: "true" } }, { en: { _desired: "te", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tg", _distance: "30", _oneway: "true" } }, { en: { _desired: "ti", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tk", _distance: "30", _oneway: "true" } }, { en: { _desired: "tlh", _distance: "30", _oneway: "true" } }, { en: { _desired: "tn", _distance: "30", _oneway: "true" } }, { en: { _desired: "to", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tt", _distance: "30", _oneway: "true" } }, { en: { _desired: "tum", _distance: "30", _oneway: "true" } }, { zh: { _desired: "ug", _distance: "20", _oneway: "true" } }, { ru: { _desired: "uk", _distance: "20", _oneway: "true" } }, { en: { _desired: "ur", _distance: "30", _oneway: "true" } }, { ru: { _desired: "uz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "wo", _distance: "30", _oneway: "true" } }, { en: { _desired: "xh", _distance: "30", _oneway: "true" } }, { en: { _desired: "yi", _distance: "30", _oneway: "true" } }, { en: { _desired: "yo", _distance: "30", _oneway: "true" } }, { zh: { _desired: "za", _distance: "20", _oneway: "true" } }, { en: { _desired: "zu", _distance: "30", _oneway: "true" } }, { ar: { _desired: "aao", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abv", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acm", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acw", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acx", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acy", _distance: "10", _oneway: "true" } }, { ar: { _desired: "adf", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aeb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aec", _distance: "10", _oneway: "true" } }, { ar: { _desired: "afb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ajp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apc", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apd", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ars", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ary", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "auz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "avl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayn", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "bbz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "pga", _distance: "10", _oneway: "true" } }, { ar: { _desired: "shu", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ssh", _distance: "10", _oneway: "true" } }, { az: { _desired: "azb", _distance: "10", _oneway: "true" } }, { et: { _desired: "vro", _distance: "10", _oneway: "true" } }, { ff: { _desired: "ffm", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fub", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fue", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuf", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuh", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fui", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuq", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuv", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gnw", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gui", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gun", _distance: "10", _oneway: "true" } }, { gn: { _desired: "nhd", _distance: "10", _oneway: "true" } }, { iu: { _desired: "ikt", _distance: "10", _oneway: "true" } }, { kln: { _desired: "enb", _distance: "10", _oneway: "true" } }, { kln: { _desired: "eyo", _distance: "10", _oneway: "true" } }, { kln: { _desired: "niq", _distance: "10", _oneway: "true" } }, { kln: { _desired: "oki", _distance: "10", _oneway: "true" } }, { kln: { _desired: "pko", _distance: "10", _oneway: "true" } }, { kln: { _desired: "sgc", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tec", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tuy", _distance: "10", _oneway: "true" } }, { kok: { _desired: "gom", _distance: "10", _oneway: "true" } }, { kpe: { _desired: "gkp", _distance: "10", _oneway: "true" } }, { luy: { _desired: "ida", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lkb", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lko", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lks", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lri", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lrm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lsm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lto", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lts", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lwg", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nle", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nyd", _distance: "10", _oneway: "true" } }, { luy: { _desired: "rag", _distance: "10", _oneway: "true" } }, { lv: { _desired: "ltg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bhr", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bjq", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bmm", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bzc", _distance: "10", _oneway: "true" } }, { mg: { _desired: "msh", _distance: "10", _oneway: "true" } }, { mg: { _desired: "skg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tdx", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tkg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "txy", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmv", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmw", _distance: "10", _oneway: "true" } }, { mn: { _desired: "mvf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bjn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "btj", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bve", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bvu", _distance: "10", _oneway: "true" } }, { ms: { _desired: "coa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "dup", _distance: "10", _oneway: "true" } }, { ms: { _desired: "hji", _distance: "10", _oneway: "true" } }, { ms: { _desired: "id", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jak", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jax", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvr", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kxd", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lce", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lcf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "liw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "max", _distance: "10", _oneway: "true" } }, { ms: { _desired: "meo", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "min", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mqg", _distance: "10", _oneway: "true" } }, { ms: { _desired: "msi", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mui", _distance: "10", _oneway: "true" } }, { ms: { _desired: "orn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "ors", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pel", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pse", _distance: "10", _oneway: "true" } }, { ms: { _desired: "tmw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "urk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkt", _distance: "10", _oneway: "true" } }, { ms: { _desired: "xmm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zlm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zmi", _distance: "10", _oneway: "true" } }, { ne: { _desired: "dty", _distance: "10", _oneway: "true" } }, { om: { _desired: "gax", _distance: "10", _oneway: "true" } }, { om: { _desired: "hae", _distance: "10", _oneway: "true" } }, { om: { _desired: "orc", _distance: "10", _oneway: "true" } }, { or: { _desired: "spv", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pbt", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pst", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qub", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qud", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quf", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qug", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quk", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qul", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qup", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qur", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qus", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qux", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quy", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qva", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qve", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvi", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvj", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvm", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvs", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvz", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qws", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxr", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxt", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxu", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxw", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdc", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdn", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sro", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aae", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aat", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aln", _distance: "10", _oneway: "true" } }, { syr: { _desired: "aii", _distance: "10", _oneway: "true" } }, { uz: { _desired: "uzs", _distance: "10", _oneway: "true" } }, { yi: { _desired: "yih", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cdo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cjy", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cpx", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "gan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hak", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hsn", _distance: "10", _oneway: "true" } }, { zh: { _desired: "lzh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "mnp", _distance: "10", _oneway: "true" } }, { zh: { _desired: "nan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "wuu", _distance: "10", _oneway: "true" } }, { zh: { _desired: "yue", _distance: "10", _oneway: "true" } }, { "*": { _desired: "*", _distance: "80" } }, { "en-Latn": { _desired: "am-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "az-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "bn-Beng", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "bo-Tibt", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "hy-Armn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ka-Geor", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "km-Khmr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "kn-Knda", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "lo-Laoo", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ml-Mlym", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "my-Mymr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ne-Deva", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "or-Orya", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "pa-Guru", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ps-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "sd-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "si-Sinh", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ta-Taml", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "te-Telu", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ti-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "tk-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ur-Arab", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "uz-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "yi-Hebr", _distance: "10", _oneway: "true" } }, { "sr-Cyrl": { _desired: "sr-Latn", _distance: "5" } }, { "zh-Hans": { _desired: "za-Latn", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "zh-Hant": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "ar-Arab": { _desired: "ar-Latn", _distance: "20", _oneway: "true" } }, { "bn-Beng": { _desired: "bn-Latn", _distance: "20", _oneway: "true" } }, { "gu-Gujr": { _desired: "gu-Latn", _distance: "20", _oneway: "true" } }, { "hi-Deva": { _desired: "hi-Latn", _distance: "20", _oneway: "true" } }, { "kn-Knda": { _desired: "kn-Latn", _distance: "20", _oneway: "true" } }, { "ml-Mlym": { _desired: "ml-Latn", _distance: "20", _oneway: "true" } }, { "mr-Deva": { _desired: "mr-Latn", _distance: "20", _oneway: "true" } }, { "ta-Taml": { _desired: "ta-Latn", _distance: "20", _oneway: "true" } }, { "te-Telu": { _desired: "te-Latn", _distance: "20", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Latn", _distance: "20", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Latn", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hani", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hrkt", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hani", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hang", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "ko-Hang": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "*-*": { _desired: "*-*", _distance: "50" } }, { "ar-*-$maghreb": { _desired: "ar-*-$maghreb", _distance: "4" } }, { "ar-*-$!maghreb": { _desired: "ar-*-$!maghreb", _distance: "4" } }, { "ar-*-*": { _desired: "ar-*-*", _distance: "5" } }, { "en-*-$enUS": { _desired: "en-*-$enUS", _distance: "4" } }, { "en-*-GB": { _desired: "en-*-$!enUS", _distance: "3" } }, { "en-*-$!enUS": { _desired: "en-*-$!enUS", _distance: "4" } }, { "en-*-*": { _desired: "en-*-*", _distance: "5" } }, { "es-*-$americas": { _desired: "es-*-$americas", _distance: "4" } }, { "es-*-$!americas": { _desired: "es-*-$!americas", _distance: "4" } }, { "es-*-*": { _desired: "es-*-*", _distance: "5" } }, { "pt-*-$americas": { _desired: "pt-*-$americas", _distance: "4" } }, { "pt-*-$!americas": { _desired: "pt-*-$!americas", _distance: "4" } }, { "pt-*-*": { _desired: "pt-*-*", _distance: "5" } }, { "zh-Hant-$cnsar": { _desired: "zh-Hant-$cnsar", _distance: "4" } }, { "zh-Hant-$!cnsar": { _desired: "zh-Hant-$!cnsar", _distance: "4" } }, { "zh-Hant-*": { _desired: "zh-Hant-*", _distance: "5" } }, { "*-*-*": { _desired: "*-*-*", _distance: "4" } }] }, r4 = { "001": ["001", "001-status-grouping", "002", "005", "009", "011", "013", "014", "015", "017", "018", "019", "021", "029", "030", "034", "035", "039", "053", "054", "057", "061", "142", "143", "145", "150", "151", "154", "155", "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DG", "DJ", "DK", "DM", "DO", "DZ", "EA", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "EU", "EZ", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "IC", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "QO", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UN", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"], "002": ["002", "002-status-grouping", "011", "014", "015", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "DZ", "EA", "EG", "EH", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IC", "IO", "KE", "KM", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SD", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TN", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], "003": ["003", "013", "021", "029", "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CA", "CR", "CU", "CW", "DM", "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PM", "PR", "SV", "SX", "TC", "TT", "US", "VC", "VG", "VI"], "005": ["005", "AR", "BO", "BR", "BV", "CL", "CO", "EC", "FK", "GF", "GS", "GY", "PE", "PY", "SR", "UY", "VE"], "009": ["009", "053", "054", "057", "061", "AC", "AQ", "AS", "AU", "CC", "CK", "CP", "CX", "DG", "FJ", "FM", "GU", "HM", "KI", "MH", "MP", "NC", "NF", "NR", "NU", "NZ", "PF", "PG", "PN", "PW", "QO", "SB", "TA", "TK", "TO", "TV", "UM", "VU", "WF", "WS"], "011": ["011", "BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG"], "013": ["013", "BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"], "014": ["014", "BI", "DJ", "ER", "ET", "IO", "KE", "KM", "MG", "MU", "MW", "MZ", "RE", "RW", "SC", "SO", "SS", "TF", "TZ", "UG", "YT", "ZM", "ZW"], "015": ["015", "DZ", "EA", "EG", "EH", "IC", "LY", "MA", "SD", "TN"], "017": ["017", "AO", "CD", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"], "018": ["018", "BW", "LS", "NA", "SZ", "ZA"], "019": ["003", "005", "013", "019", "019-status-grouping", "021", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BM", "BO", "BQ", "BR", "BS", "BV", "BZ", "CA", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GL", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PM", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "US", "UY", "VC", "VE", "VG", "VI"], "021": ["021", "BM", "CA", "GL", "PM", "US"], "029": ["029", "AG", "AI", "AW", "BB", "BL", "BQ", "BS", "CU", "CW", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "030": ["030", "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"], "034": ["034", "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"], "035": ["035", "BN", "ID", "KH", "LA", "MM", "MY", "PH", "SG", "TH", "TL", "VN"], "039": ["039", "AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "PT", "RS", "SI", "SM", "VA", "XK"], "053": ["053", "AU", "CC", "CX", "HM", "NF", "NZ"], "054": ["054", "FJ", "NC", "PG", "SB", "VU"], "057": ["057", "FM", "GU", "KI", "MH", "MP", "NR", "PW", "UM"], "061": ["061", "AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"], 142: ["030", "034", "035", "142", "143", "145", "AE", "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CN", "CY", "GE", "HK", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MO", "MV", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SG", "SY", "TH", "TJ", "TL", "TM", "TR", "TW", "UZ", "VN", "YE"], 143: ["143", "KG", "KZ", "TJ", "TM", "UZ"], 145: ["145", "AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "YE"], 150: ["039", "150", "151", "154", "155", "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CQ", "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ", "SK", "SM", "UA", "VA", "XK"], 151: ["151", "BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"], 154: ["154", "AX", "CQ", "DK", "EE", "FI", "FO", "GB", "GG", "IE", "IM", "IS", "JE", "LT", "LV", "NO", "SE", "SJ"], 155: ["155", "AT", "BE", "CH", "DE", "FR", "LI", "LU", "MC", "NL"], 202: ["011", "014", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IO", "KE", "KM", "LR", "LS", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], 419: ["005", "013", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BO", "BQ", "BR", "BS", "BV", "BZ", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "UY", "VC", "VE", "VG", "VI"], EU: ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "EU", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"], EZ: ["AT", "BE", "CY", "DE", "EE", "ES", "EZ", "FI", "FR", "GR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"], QO: ["AC", "AQ", "CP", "DG", "QO", "TA"], UN: ["AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ER", "ES", "ET", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TD", "TG", "TH", "TJ", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TZ", "UA", "UG", "UN", "US", "UY", "UZ", "VC", "VE", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"] };
      function r9(e10) {
        let t10 = e10.split("-");
        for (let e11 = 1; e11 < t10.length && "x" !== t10[e11]; e11++) {
          if ("u" !== t10[e11]) continue;
          let r10 = e11 + 1;
          for (; r10 < t10.length && t10[r10].length > 1; ) r10++;
          return { locale: [...t10.slice(0, e11), ...t10.slice(r10)].join("-"), extension: "-" + t10.slice(e11, r10).join("-") };
        }
        return { locale: e10 };
      }
      function r5(e10, t10, r10 = Error) {
        if (!e10) throw new r10(t10);
      }
      function r6(e10, t10, r10) {
        let [n2, a2, i2] = t10.split("-"), o2 = true;
        if (i2 && "$" === i2[0]) {
          let t11 = "!" !== i2[1], n3 = (t11 ? r10[i2.slice(1)] : r10[i2.slice(2)]).map((e11) => r4[e11] || [e11]).reduce((e11, t12) => [...e11, ...t12], []);
          o2 &&= n3.indexOf(e10.region || "") > -1 == t11;
        } else o2 &&= !e10.region || "*" === i2 || i2 === e10.region;
        return o2 &&= !e10.script || "*" === a2 || a2 === e10.script, o2 &&= !e10.language || "*" === n2 || n2 === e10.language;
      }
      function r8(e10) {
        return [e10.language, e10.script, e10.region].filter(Boolean).join("-");
      }
      function r7(e10, t10, r10) {
        for (let n2 of r10.matches) {
          let a2 = r6(e10, n2.desired, r10.matchVariables) && r6(t10, n2.supported, r10.matchVariables);
          if (n2.oneway || a2 || (a2 = r6(e10, n2.supported, r10.matchVariables) && r6(t10, n2.desired, r10.matchVariables)), a2) {
            let a3 = 10 * n2.distance;
            if (r10.paradigmLocales.indexOf(r8(e10)) > -1 != r10.paradigmLocales.indexOf(r8(t10)) > -1) return a3 - 1;
            return a3;
          }
        }
        throw Error("No matching distance found");
      }
      let ne = (ed = function(e10, t10) {
        let n2 = new Intl.Locale(e10).maximize(), a2 = new Intl.Locale(t10).maximize(), i2 = { language: n2.language, script: n2.script || "", region: n2.region || "" }, o2 = { language: a2.language, script: a2.script || "", region: a2.region || "" }, s2 = 0, l2 = (function() {
          if (!r) {
            let e11 = r2["written-new"][0]?.paradigmLocales?._locales.split(" "), t11 = r2["written-new"].slice(1, 5);
            r = { matches: r2["written-new"].slice(5).map((e12) => {
              let t12 = Object.keys(e12)[0], r10 = e12[t12];
              return { supported: t12, desired: r10._desired, distance: +r10._distance, oneway: "true" === r10.oneway };
            }, {}), matchVariables: t11.reduce((e12, t12) => {
              let r10 = Object.keys(t12)[0], n3 = t12[r10];
              return e12[r10.slice(1)] = n3._value.split("+"), e12;
            }, {}), paradigmLocales: [...e11, ...e11.map((e12) => new Intl.Locale(e12.replace(/_/g, "-")).maximize().toString())] };
          }
          return r;
        })();
        return i2.language !== o2.language && (s2 += r7({ language: n2.language, script: "", region: "" }, { language: a2.language, script: "", region: "" }, l2)), i2.script !== o2.script && (s2 += r7({ language: n2.language, script: i2.script, region: "" }, { language: a2.language, script: o2.script, region: "" }, l2)), i2.region !== o2.region && (s2 += r7(i2, o2, l2)), s2;
      }, a = (eh = { serializer: (e10) => `${e10[0]}|${e10[1]}` }).cache ? eh.cache : { create: function() {
        return new r3();
      } }, i = eh && eh.serializer ? eh.serializer : function() {
        return JSON.stringify(arguments);
      }, (eh && eh.strategy ? eh.strategy : function(e10, t10) {
        var r10, n2;
        let a2 = 1 === e10.length ? r0 : r1;
        return r10 = t10.cache.create(), n2 = t10.serializer, a2.bind(this, e10, r10, n2);
      })(ed, { cache: a, serializer: i })), nt = /* @__PURE__ */ new WeakMap();
      function nr(e10) {
        return Intl.getCanonicalLocales(e10)[0];
      }
      let nn = /* @__PURE__ */ new WeakMap();
      var na = e.i(57183);
      function ni(e10, t10, r10) {
        let n2, a2 = new na.default({ headers: { "accept-language": e10.get("accept-language") || void 0 } }).languages();
        try {
          var i2;
          let e11 = t10.slice().sort((e12, t11) => t11.length - e12.length);
          i2 = (function(e12, t11, r11, n3, a3, i3) {
            let o2, s2;
            if ("lookup" === r11.localeMatcher) o2 = (function(e13, t12, r12) {
              let n4 = { locale: "" };
              for (let r13 of t12) {
                let { locale: t13, extension: a4 } = r9(r13), i4 = (function(e14, t14) {
                  let r14 = nn.get(e14);
                  r14 || (r14 = new Set(e14), nn.set(e14, r14));
                  let n5 = t14;
                  for (; ; ) {
                    if (r14.has(n5)) return n5;
                    let e15 = n5.lastIndexOf("-");
                    if (!~e15) return;
                    e15 >= 2 && "-" === n5[e15 - 2] && (e15 -= 2), n5 = n5.slice(0, e15);
                  }
                })(e13, t13);
                if (i4) return n4.locale = i4, a4 && (n4.extension = a4), n4;
              }
              return n4.locale = r12(), n4;
            })(Array.from(e12), t11, i3);
            else {
              var l2;
              let r12, n4, a4, s3, c3;
              l2 = Array.from(e12), a4 = [], s3 = t11.reduce((e13, t12) => {
                let { locale: r13 } = r9(t12);
                return a4.push(r13), e13[r13] = t12, e13;
              }, {}), (c3 = (function(e13, t12, r13 = 838) {
                let n5 = 1 / 0, a5 = { matchedDesiredLocale: "", distances: {} }, i4 = nt.get(t12);
                i4 || (i4 = t12.map((e14) => {
                  try {
                    return Intl.getCanonicalLocales([e14])[0] || e14;
                  } catch {
                    return e14;
                  }
                }), nt.set(t12, i4));
                let o3 = new Set(i4);
                for (let t13 = 0; t13 < e13.length; t13++) {
                  let r14 = e13[t13];
                  if (o3.has(r14)) {
                    let e14 = 0 + 40 * t13;
                    if (a5.distances[r14] = { [r14]: e14 }, e14 < n5 && (n5 = e14, a5.matchedDesiredLocale = r14, a5.matchedSupportedLocale = r14), 0 === t13) return a5;
                  }
                }
                for (let t13 = 0; t13 < e13.length; t13++) {
                  let r14 = e13[t13];
                  try {
                    let e14 = new Intl.Locale(r14).maximize().toString();
                    if (e14 !== r14) {
                      let i5 = (function(e15) {
                        let t14 = [], r15 = e15;
                        for (; r15; ) {
                          t14.push(r15);
                          let e16 = r15.lastIndexOf("-");
                          if (-1 === e16) break;
                          r15 = r15.substring(0, e16);
                        }
                        return t14;
                      })(e14);
                      for (let s4 = 0; s4 < i5.length; s4++) {
                        let l3 = i5[s4];
                        if (l3 !== r14 && o3.has(l3)) {
                          let i6;
                          try {
                            i6 = new Intl.Locale(l3).maximize().toString() === e14 ? 0 + 40 * t13 : 10 * s4 + 40 * t13;
                          } catch {
                            i6 = 10 * s4 + 40 * t13;
                          }
                          a5.distances[r14] || (a5.distances[r14] = {}), a5.distances[r14][l3] = i6, i6 < n5 && (n5 = i6, a5.matchedDesiredLocale = r14, a5.matchedSupportedLocale = l3);
                          break;
                        }
                      }
                    }
                  } catch {
                  }
                }
                return a5.matchedSupportedLocale && 0 === n5 || (n5 = 1 / 0, e13.forEach((e14, r14) => {
                  a5.distances[e14] || (a5.distances[e14] = {}), i4.forEach((i5, o4) => {
                    let s4 = t12[o4], l3 = ne(e14, i5) + 0 + 40 * r14;
                    a5.distances[e14][s4] = l3, l3 < n5 && (n5 = l3, a5.matchedDesiredLocale = e14, a5.matchedSupportedLocale = s4);
                  });
                }), n5 >= r13 && (a5.matchedDesiredLocale = void 0, a5.matchedSupportedLocale = void 0)), a5;
              })(a4, l2)).matchedSupportedLocale && c3.matchedDesiredLocale && (r12 = c3.matchedSupportedLocale, n4 = r9(s3[c3.matchedDesiredLocale]).extension), o2 = r12 ? { locale: r12, extension: n4 } : { locale: i3() };
            }
            null == o2 && (o2 = { locale: i3(), extension: "" });
            let c2 = o2.locale, u2 = a3[c2], d2 = /* @__PURE__ */ Object.create(null);
            d2.locale = "en", d2.dataLocale = c2, s2 = o2.extension ? (function(e13) {
              let t12;
              r5(e13 === e13.toLowerCase(), "Expected extension to be lowercase"), r5("-u-" === e13.slice(0, 3), "Expected extension to be a Unicode locale extension");
              let r12 = [], n4 = [], a4 = e13.length, i4 = 3;
              for (; i4 < a4; ) {
                let o3, s3 = e13.indexOf("-", i4);
                o3 = -1 === s3 ? a4 - i4 : s3 - i4;
                let l3 = e13.slice(i4, i4 + o3);
                r5(o3 >= 2, "Expected a subtag to have at least 2 characters"), void 0 === t12 && 2 != o3 ? -1 === r12.indexOf(l3) && r12.push(l3) : 2 === o3 ? (t12 = { key: l3, value: "" }, void 0 === n4.find((e14) => e14.key === t12?.key) && n4.push(t12)) : t12?.value === "" ? t12.value = l3 : (r5(void 0 !== t12, "Expected keyword to be defined"), t12.value += "-" + l3), i4 += o3 + 1;
              }
              return { attributes: r12, keywords: n4 };
            })(o2.extension).keywords : [];
            let h2 = [];
            for (let e13 of n3) {
              let t12, n4 = u2?.[e13] ?? [];
              r5(Array.isArray(n4), `keyLocaleData for ${e13} must be an array`);
              let a4 = n4[0];
              r5(null == a4 || "string" == typeof a4, "value must be a string, null, or undefined");
              let i4 = s2.find((t13) => t13.key === e13);
              if (i4) {
                let r12 = i4.value;
                "" !== r12 ? n4.indexOf(r12) > -1 && (t12 = { key: e13, value: a4 = r12 }) : n4.indexOf("true") > -1 && (t12 = { key: e13, value: a4 = "true" });
              }
              let o3 = r11[e13];
              r5(null == o3 || "string" == typeof o3, "optionsValue must be a string or undefined"), "string" == typeof o3 && "" === (o3 = (function(e14, t13) {
                let r12 = t13.toLowerCase();
                return r5(void 0 !== e14, "ukey must be defined"), r12;
              })(e13.toLowerCase(), o3)) && (o3 = "true"), void 0 !== o3 && o3 !== a4 && n4.indexOf(o3) > -1 && (a4 = o3, t12 = void 0), t12 && h2.push(t12), d2[e13] = a4;
            }
            return h2.length > 0 && (c2 = (function(e13, t12, r12) {
              r5(void 0 === r9(e13).extension, "Expected locale to not have a Unicode locale extension");
              let n4 = "-u";
              for (let e14 of t12) n4 += `-${e14}`;
              for (let e14 of r12) {
                let { key: t13, value: r13 } = e14;
                n4 += `-${t13}`, "" !== r13 && (n4 += `-${r13}`);
              }
              if ("-u" === n4) return nr(e13);
              let a4 = e13.indexOf("-x-");
              return nr(-1 === a4 ? e13 + n4 : e13.slice(0, a4) + n4 + e13.slice(a4));
            })(c2, [], h2)), d2.locale = c2, d2;
          })(e11, Intl.getCanonicalLocales(a2), { localeMatcher: "best fit" }, [], {}, () => r10).locale, n2 = t10.find((e12) => e12.toLowerCase() === i2.toLowerCase());
        } catch {
        }
        return n2;
      }
      function no(e10, t10) {
        if (e10.localeCookie && t10.has(e10.localeCookie.name)) {
          let r10 = t10.get(e10.localeCookie.name)?.value;
          if (r10 && e10.locales.includes(r10)) return r10;
        }
      }
      function ns(e10, t10, r10, n2) {
        let a2;
        return n2 && (a2 = rX(n2, e10.locales, e10.localePrefix)?.locale), !a2 && e10.localeDetection && (a2 = no(e10, r10)), !a2 && e10.localeDetection && (a2 = ni(t10, e10.locales, e10.defaultLocale)), a2 || (a2 = e10.defaultLocale), a2;
      }
      let nl = (o = { ...ef = { locales: ["en", "uz", "ru"], defaultLocale: "en", localePrefix: "as-needed", localeDetection: false }, localePrefix: "object" == typeof (eg = ef.localePrefix) ? eg : { mode: eg || "always" }, localeCookie: !!((ep = ef.localeCookie) ?? 1) && { name: "NEXT_LOCALE", sameSite: "lax", ..."object" == typeof ep && ep }, localeDetection: ef.localeDetection ?? true, alternateLinks: ef.alternateLinks ?? true }, function(e10) {
        var t10, r10;
        let n2;
        try {
          n2 = decodeURI(e10.nextUrl.pathname);
        } catch {
          return rD.NextResponse.next();
        }
        let a2 = n2.replace(/\\/g, "%5C").replace(/[\t\n\r]/g, "").replace(/\/+/g, "/"), { domain: i2, locale: s2 } = (t10 = e10.headers, r10 = e10.cookies, o.domains ? (function(e11, t11, r11, n3) {
          let a3, i3 = (function(e12, t12) {
            let r12 = rJ(e12);
            if (r12) return t12.find((e13) => e13.domain === r12);
          })(t11, e11.domains);
          if (!i3) return { locale: ns(e11, t11, r11, n3) };
          if (n3) {
            let t12 = rX(n3, e11.locales, e11.localePrefix, i3)?.locale;
            if (t12) {
              if (!rZ(t12, i3)) return { locale: t12, domain: i3 };
              a3 = t12;
            }
          }
          if (!a3 && e11.localeDetection) {
            let t12 = no(e11, r11);
            t12 && rZ(t12, i3) && (a3 = t12);
          }
          if (!a3 && e11.localeDetection) {
            let e12 = ni(t11, i3.locales, i3.defaultLocale);
            e12 && (a3 = e12);
          }
          return a3 || (a3 = i3.defaultLocale), { locale: a3, domain: i3 };
        })(o, t10, r10, a2) : { locale: ns(o, t10, r10, a2) }), l2 = i2 ? i2.defaultLocale === s2 : s2 === o.defaultLocale, c2 = o.domains?.filter((e11) => rZ(s2, e11)) || [], u2 = null != o.domains && !i2;
        function d2(t11) {
          var r11;
          let n3 = new URL(t11, e10.url);
          e10.nextUrl.basePath && (r11 = n3.pathname, n3.pathname = rU(e10.nextUrl.basePath + r11));
          let a3 = new Headers(e10.headers);
          return a3.set("X-NEXT-INTL-LOCALE", s2), rU(e10.nextUrl.pathname) !== rU(n3.pathname) ? rD.NextResponse.rewrite(n3, { request: { headers: a3 } }) : rD.NextResponse.next({ request: { headers: a3 } });
        }
        function h2(t11, r11) {
          var n3;
          let a3 = new URL(t11, e10.url);
          if (a3.pathname = rU(a3.pathname), c2.length > 0 && !r11 && i2) {
            let e11 = rQ(i2, s2, c2);
            if (e11) {
              r11 = e11.domain;
              let t12 = e11.localePrefix || o.localePrefix.mode;
              e11.defaultLocale === s2 && "as-needed" === t12 && (a3.pathname = rW(a3.pathname, o.locales, o.localePrefix));
            }
          }
          return r11 && (a3.host = r11, e10.headers.get("x-forwarded-host")) && (a3.protocol = e10.headers.get("x-forwarded-proto") ?? e10.nextUrl.protocol, a3.port = r11.split(":")[1] ?? e10.headers.get("x-forwarded-port") ?? ""), e10.nextUrl.basePath && (n3 = a3.pathname, a3.pathname = rU(e10.nextUrl.basePath + n3)), b2 = true, rD.NextResponse.redirect(a3.toString());
        }
        let f2 = rW(a2, o.locales, o.localePrefix), p2 = rX(a2, o.locales, o.localePrefix, i2), g2 = null != p2, _2 = i2?.localePrefix || o.localePrefix.mode, m2 = "never" === _2 || l2 && "as-needed" === _2, y2, v2, b2, w2 = f2, S2 = o.pathnames;
        if (S2) {
          let t11;
          if ([t11, v2] = (function(e11, t12, r11) {
            for (let n3 of Object.keys(e11).sort(rV)) {
              let a3 = e11[n3];
              if ("string" == typeof a3) {
                if (rq(a3, t12)) return [void 0, n3];
              } else {
                let i3 = Object.entries(a3), o2 = i3.findIndex(([e12]) => e12 === r11);
                for (let [r12] of (o2 > 0 && i3.unshift(i3.splice(o2, 1)[0]), i3)) if (rq(rj(e11[n3], r12, n3), t12)) return [r12, n3];
              }
            }
            for (let r12 of Object.keys(e11)) if (rq(r12, t12)) return [void 0, r12];
            return [void 0, void 0];
          })(S2, f2, s2), v2) {
            let r11 = S2[v2], n3 = rj(r11, s2, v2);
            if (rq(n3, f2)) w2 = rz(f2, n3, v2);
            else {
              let a3;
              a3 = t11 ? rj(r11, t11, v2) : v2;
              let i3 = m2 ? void 0 : r$(s2, o.localePrefix);
              y2 = h2(rY(rz(f2, a3, n3), i3, e10.nextUrl.search));
            }
          }
        }
        if (!y2) if ("/" !== w2 || g2) {
          let t11 = rY(w2, `/${s2}`, e10.nextUrl.search);
          if (g2) {
            let r11 = rY(f2, p2.prefix, e10.nextUrl.search);
            if ("never" === _2) y2 = h2(rY(f2, void 0, e10.nextUrl.search));
            else if (p2.exact) if (l2 && m2) y2 = h2(rY(f2, void 0, e10.nextUrl.search));
            else if (o.domains) {
              let e11 = rQ(i2, p2.locale, c2);
              y2 = i2?.domain === e11?.domain || u2 ? d2(t11) : h2(r11, e11?.domain);
            } else y2 = d2(t11);
            else y2 = h2(r11);
          } else y2 = m2 ? d2(t11) : h2(rY(f2, r$(s2, o.localePrefix), e10.nextUrl.search));
        } else y2 = m2 ? d2(rY(w2, `/${s2}`, e10.nextUrl.search)) : h2(rY(f2, r$(s2, o.localePrefix), e10.nextUrl.search));
        return (function(e11, t11, r11, n3, a3) {
          if (!n3.localeCookie) return;
          let i3 = e11.headers.get("sec-fetch-dest");
          if (null != i3 && "document" !== i3) return;
          let { name: o2, ...s3 } = n3.localeCookie, l3 = e11.cookies.has(o2);
          l3 && e11.cookies.get(o2)?.value !== r11 ? t11.cookies.set(o2, r11, { path: e11.nextUrl.basePath || void 0, ...s3 }) : l3 || ni(e11.headers, a3?.locales || n3.locales, n3.defaultLocale) === r11 || t11.cookies.set(o2, r11, { path: e11.nextUrl.basePath || void 0, ...s3 });
        })(e10, y2, s2, o, i2), !b2 && "never" !== _2 && o.alternateLinks && o.locales.length > 1 && y2.headers.set("Link", (function({ internalTemplateName: e11, localizedPathnames: t11, request: r11, resolvedLocale: n3, routing: a3 }) {
          let i3 = r11.nextUrl.clone(), o2 = rJ(r11.headers);
          function s3(e12, t12) {
            var n4;
            return e12.pathname = rU(e12.pathname), r11.nextUrl.basePath && ((e12 = new URL(e12)).pathname = (n4 = e12.pathname, rU(r11.nextUrl.basePath + n4))), `<${e12.toString()}>; rel="alternate"; hreflang="${t12}"`;
          }
          function l3(r12, a4) {
            return t11 && "object" == typeof t11 ? rz(r12, t11[n3] ?? e11, t11[a4] ?? e11) : r12;
          }
          o2 && (i3.port = "", i3.host = o2), i3.protocol = r11.headers.get("x-forwarded-proto") ?? i3.protocol, i3.pathname = rW(i3.pathname, a3.locales, a3.localePrefix);
          let c3 = rK(a3.locales, a3.localePrefix, false).flatMap(([e12, r12]) => {
            let n4;
            function o3(e13) {
              return "/" === e13 ? r12 : r12 + e13;
            }
            if (a3.domains) return a3.domains.filter((t12) => rZ(e12, t12)).map((t12) => {
              (n4 = new URL(i3)).port = "", n4.host = t12.domain, n4.pathname = l3(i3.pathname, e12);
              let r13 = t12.localePrefix || a3.localePrefix.mode;
              return e12 === t12.defaultLocale && "always" !== r13 || (n4.pathname = o3(n4.pathname)), s3(n4, e12);
            });
            {
              let r13;
              r13 = t11 && "object" == typeof t11 ? l3(i3.pathname, e12) : i3.pathname, e12 === a3.defaultLocale && "always" !== a3.localePrefix.mode || (r13 = o3(r13)), n4 = new URL(r13, i3);
            }
            return s3(n4, e12);
          });
          if (!a3.domains || 0 === a3.domains.length) {
            let e12 = l3(i3.pathname, a3.defaultLocale);
            if (e12) {
              let t12 = new URL(e12, i3);
              c3.push(s3(t12, "x-default"));
            }
          }
          return c3.join(", ");
        })({ routing: o, internalTemplateName: v2, localizedPathnames: null != v2 && S2 ? S2[v2] : void 0, request: e10, resolvedLocale: s2 })), y2;
      });
      e.s(["config", 0, { matcher: "/((?!api|_next|_vercel|.*\\..*).*)" }, "default", 0, nl], 22685);
      let nc = { ...e.i(22685) }, nu = "/proxy", nd = nc.proxy || nc.default;
      if ("function" != typeof nd) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Proxy file "${nu}" must export a function named \`proxy\` or a default function.`);
      let nh = async (t10) => {
        var r10, n2;
        let a2, i2;
        {
          i2 = performance.timeOrigin + performance.now();
          let { join: o2, relative: s2 } = e.r(50227), { ensureInstrumentationRegisteredWithDeferredSpans: l2 } = e.r(94533), c2 = o2(process.cwd(), (null == (r10 = t10.request.requestMeta) ? void 0 : r10.relativeProjectDir) || ""), u2 = null == (n2 = t10.request.requestMeta) ? void 0 : n2.distDir, d2 = u2 ? s2(c2, u2) : ".next";
          a2 = await l2(c2, d2);
        }
        try {
          return await t1({ ...t10, IncrementalCache: rk, incrementalCacheHandler: null, page: nu, handler: async (...e10) => {
            try {
              return await nd(...e10);
            } catch (a3) {
              let t11 = e10[0], r11 = new URL(t11.url), n3 = r11.pathname + r11.search;
              throw await u(a3, { path: n3, method: t11.method, headers: Object.fromEntries(t11.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), a3;
            }
          }, emitInstrumentationSpans: a2, requestStartTime: i2 });
        } catch (e10) {
          try {
            null == a2 || a2();
          } catch {
          }
          throw e10;
        }
      };
      async function nf(e10, t10) {
        let r10 = await nh({ request: { url: e10.url, method: e10.method, headers: R(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: nu }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, nh, "handler", 0, nf], 64567);
    }, 69857, (e, t, r) => {
      t.exports = e.r(14747);
    }, 48606, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let n2 = o(e2, t2);
        return n2 ? i.run(n2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = i.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 87515, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { handleFetch: function() {
        return c;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return o;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(48606), o = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function s(e2, t2) {
        let { url: r2, method: n2, headers: a2, body: i2, cache: o2, credentials: s2, integrity: l2, mode: c2, redirect: u2, referrer: d, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(a2), ["next-test-stack", (function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        })()]], body: i2 ? Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: s2, integrity: l2, mode: c2, redirect: u2, referrer: d, referrerPolicy: h } };
      }
      function l(e2, t2) {
        return t2.headers.set("next-test-internal", "1"), e2(t2);
      }
      async function c(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, o);
        if (!r2) return l(e2, t2);
        let { testData: n2, proxyPort: a2 } = r2, c2 = await s(n2, t2), u2 = await e2(`http://localhost:${a2}`, { method: "POST", body: JSON.stringify(c2), headers: { "next-test-internal": "1" }, next: { internal: true } });
        if (!u2.ok) throw Error(`Proxy request failed: ${u2.status}`);
        let d = await u2.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return l(e2, t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
          case "fetch":
            return (function(e3) {
              let { status: t3, headers: r3, body: n3 } = e3.response;
              return new Response(n3 ? Buffer.from(n3, "base64") : null, { status: t3, headers: new Headers(r3) });
            })(d);
          default:
            return h;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : c(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 83868, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(48606), o = e.r(87515);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 22037, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { ACTION_SUFFIX: function() {
        return _;
      }, APP_DIR_ALIAS: function() {
        return G;
      }, CACHE_ONE_YEAR_SECONDS: function() {
        return I;
      }, DOT_NEXT_ALIAS: function() {
        return q;
      }, ESLINT_DEFAULT_DIRS: function() {
        return es;
      }, GSP_NO_RETURNED_VALUE: function() {
        return et;
      }, GSSP_COMPONENT_MEMBER_ERROR: function() {
        return ea;
      }, GSSP_NO_RETURNED_VALUE: function() {
        return er;
      }, HTML_CONTENT_TYPE_HEADER: function() {
        return o;
      }, INFINITE_CACHE: function() {
        return N;
      }, INSTRUMENTATION_HOOK_FILENAME: function() {
        return j;
      }, JSON_CONTENT_TYPE_HEADER: function() {
        return s;
      }, MATCHED_PATH_HEADER: function() {
        return u;
      }, MIDDLEWARE_FILENAME: function() {
        return L;
      }, MIDDLEWARE_LOCATION_REGEXP: function() {
        return M;
      }, NEXT_BODY_SUFFIX: function() {
        return v;
      }, NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return A;
      }, NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return S;
      }, NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return x;
      }, NEXT_CACHE_ROOT_PARAM_TAG_ID: function() {
        return O;
      }, NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return T;
      }, NEXT_CACHE_TAGS_HEADER: function() {
        return w;
      }, NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return C;
      }, NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return R;
      }, NEXT_DATA_SUFFIX: function() {
        return m;
      }, NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return c;
      }, NEXT_META_SUFFIX: function() {
        return y;
      }, NEXT_NAV_DEPLOYMENT_ID_HEADER: function() {
        return b;
      }, NEXT_QUERY_PARAM_PREFIX: function() {
        return l;
      }, NEXT_RESUME_HEADER: function() {
        return E;
      }, NEXT_RESUME_STATE_LENGTH_HEADER: function() {
        return P;
      }, NON_STANDARD_NODE_ENV: function() {
        return ei;
      }, PAGES_DIR_ALIAS: function() {
        return U;
      }, PRERENDER_REVALIDATE_HEADER: function() {
        return d;
      }, PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return h;
      }, PROXY_FILENAME: function() {
        return k;
      }, PROXY_LOCATION_REGEXP: function() {
        return D;
      }, PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return X;
      }, ROOT_DIR_ALIAS: function() {
        return $;
      }, RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return K;
      }, RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return W;
      }, RSC_ACTION_PROXY_ALIAS: function() {
        return F;
      }, RSC_ACTION_VALIDATE_ALIAS: function() {
        return H;
      }, RSC_CACHE_WRAPPER_ALIAS: function() {
        return V;
      }, RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function() {
        return z;
      }, RSC_MOD_REF_PROXY_ALIAS: function() {
        return B;
      }, RSC_SEGMENTS_DIR_SUFFIX: function() {
        return f;
      }, RSC_SEGMENT_SUFFIX: function() {
        return p;
      }, RSC_SUFFIX: function() {
        return g;
      }, SERVER_PROPS_EXPORT_ERROR: function() {
        return ee;
      }, SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return J;
      }, SERVER_PROPS_SSG_CONFLICT: function() {
        return Z;
      }, SERVER_RUNTIME: function() {
        return el;
      }, SSG_FALLBACK_EXPORT_ERROR: function() {
        return eo;
      }, SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return Y;
      }, STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return Q;
      }, TEXT_PLAIN_CONTENT_TYPE_HEADER: function() {
        return i;
      }, UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return en;
      }, WEBPACK_LAYERS: function() {
        return ed;
      }, WEBPACK_RESOURCE_QUERIES: function() {
        return eh;
      }, WEB_SOCKET_MAX_RECONNECTIONS: function() {
        return ec;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = "text/plain", o = "text/html; charset=utf-8", s = "application/json; charset=utf-8", l = "nxtP", c = "nxtI", u = "x-matched-path", d = "x-prerender-revalidate", h = "x-prerender-revalidate-if-generated", f = ".segments", p = ".segment.rsc", g = ".rsc", _ = ".action", m = ".json", y = ".meta", v = ".body", b = "x-nextjs-deployment-id", w = "x-next-cache-tags", S = "x-next-revalidated-tags", x = "x-next-revalidate-tag-token", E = "next-resume", P = "x-next-resume-state-length", C = 128, R = 256, T = 1024, A = "_N_T_", O = "_N_RP_", I = 31536e3, N = 4294967294, L = "middleware", M = `(?:src/)?${L}`, k = "proxy", D = `(?:src/)?${k}`, j = "instrumentation", U = "private-next-pages", q = "private-dot-next", $ = "private-next-root-dir", G = "private-next-app-dir", B = "private-next-rsc-mod-ref-proxy", H = "private-next-rsc-action-validate", F = "private-next-rsc-server-reference", V = "private-next-rsc-cache-wrapper", z = "private-next-rsc-track-dynamic-import", W = "private-next-rsc-action-encryption", K = "private-next-rsc-action-client-wrapper", X = "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict", Y = "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps", J = "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.", Z = "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps", Q = "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props", ee = "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export", et = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?", er = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?", en = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.", ea = "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member", ei = 'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env', eo = "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export", es = ["app", "pages", "components", "lib", "src"], el = { edge: "edge", experimentalEdge: "experimental-edge", nodejs: "nodejs" }, ec = 12, eu = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" }, ed = { ...eu, GROUP: { builtinReact: [eu.reactServerComponents, eu.actionBrowser], serverOnly: [eu.reactServerComponents, eu.actionBrowser, eu.instrument, eu.middleware], neutralTarget: [eu.apiNode, eu.apiEdge], clientOnly: [eu.serverSideRendering, eu.appPagesBrowser], bundled: [eu.reactServerComponents, eu.actionBrowser, eu.serverSideRendering, eu.appPagesBrowser, eu.shared, eu.instrument, eu.middleware], appPages: [eu.reactServerComponents, eu.serverSideRendering, eu.appPagesBrowser, eu.actionBrowser] } }, eh = { edgeSSREntry: "__next_edge_ssr_entry__", metadata: "__next_metadata__", metadataRoute: "__next_metadata_route__", metadataImageMeta: "__next_metadata_image_meta__" };
    }, 75943, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { atLeastOneTask: function() {
        return s;
      }, scheduleImmediate: function() {
        return o;
      }, scheduleOnNextTick: function() {
        return i;
      }, waitAtLeastOneReactRenderTask: function() {
        return l;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = (e2) => {
        Promise.resolve().then(() => {
          process.nextTick(e2);
        });
      }, o = (e2) => {
        setImmediate(e2);
      };
      function s() {
        return new Promise((e2) => o(e2));
      }
      function l() {
        return new Promise((e2) => setImmediate(e2));
      }
    }, 15011, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "after", { enumerable: true, get: function() {
        return i;
      } });
      let n = e.r(56704), a = e.r(32319);
      function i(e2) {
        let t2 = n.workAsyncStorage.getStore(), r2 = a.workUnitAsyncStorage.getStore();
        if (!t2 || !r2) throw Error("`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context");
        let { afterContext: i2 } = t2;
        return i2.after(e2, r2);
      }
    }, 30131, (e, t, r) => {
      "use strict";
      var n, a;
      Object.defineProperty(r, "__esModule", { value: true }), n = e.r(15011), a = r, Object.keys(n).forEach(function(e2) {
        "default" === e2 || Object.prototype.hasOwnProperty.call(a, e2) || Object.defineProperty(a, e2, { enumerable: true, get: function() {
          return n[e2];
        } });
      });
    }, 62946, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { abortAndThrowOnSynchronousRequestDataAccess: function() {
        return m;
      }, abortOnSynchronousPlatformIOAccess: function() {
        return _;
      }, accessedDynamicData: function() {
        return w;
      }, annotateDynamicAccess: function() {
        return C;
      }, consumeDynamicAccess: function() {
        return S;
      }, createDynamicTrackingState: function() {
        return c;
      }, createHangingInputAbortSignal: function() {
        return E;
      }, formatDynamicAPIAccesses: function() {
        return x;
      }, getFirstDynamicReason: function() {
        return u;
      }, isPrerenderInterruptedError: function() {
        return b;
      }, markCurrentScopeAsDynamic: function() {
        return d;
      }, throwToInterruptStaticGeneration: function() {
        return h;
      }, trackDynamicDataInDynamicRender: function() {
        return f;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(51181), o = e.r(37986), s = e.r(32319), l = e.r(75943);
      function c(e2) {
        return { isDebugDynamicAccesses: e2, dynamicAccesses: [], syncDynamicErrorWithStack: null, syncDynamicErrorWithStackPostMicrotask: false };
      }
      function u(e2) {
        var t2;
        return null == (t2 = e2.dynamicAccesses[0]) ? void 0 : t2.expression;
      }
      function d(e2, t2, r2) {
        if (t2) switch (t2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
        if (!e2.forceDynamic && !e2.forceStatic) {
          if (e2.dynamicShouldError) throw new o.StaticGenBailoutError(`Route ${e2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${r2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (t2) switch (t2.type) {
            case "prerender-legacy":
              t2.revalidate = 0;
              let n2 = new i.DynamicServerError(`Route ${e2.route} couldn't be rendered statically because it used ${r2}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
              throw e2.dynamicUsageDescription = r2, e2.dynamicUsageStack = n2.stack, n2;
            case "request":
              p(t2);
          }
        }
      }
      function h(e2, t2, r2) {
        let n2 = new i.DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function f(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
          case "prerender":
          case "prerender-runtime":
          case "prerender-legacy":
          case "prerender-client":
          case "validation-client":
          case "build-time-generator":
            break;
          case "request":
            p(e2);
        }
      }
      function p(e2) {
      }
      function g(e2, t2, r2) {
        let n2 = v(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
        r2.controller.abort(n2);
        let a2 = r2.dynamicTracking;
        a2 && a2.dynamicAccesses.push({ stack: a2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
      }
      function _(e2, t2, r2, n2) {
        let a2 = n2.dynamicTracking;
        a2 && null === a2.syncDynamicErrorWithStack && (a2.syncDynamicErrorWithStack = r2, queueMicrotask(() => {
          a2.syncDynamicErrorWithStackPostMicrotask = true;
        })), g(e2, t2, n2);
      }
      function m(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          g(e2, t2, n2);
          let a2 = n2.dynamicTracking;
          a2 && null === a2.syncDynamicErrorWithStack && (a2.syncDynamicErrorWithStack = r2);
        }
        throw v(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      let y = "NEXT_PRERENDER_INTERRUPTED";
      function v(e2) {
        let t2 = Error(e2);
        return t2.digest = y, t2;
      }
      function b(e2) {
        return "object" == typeof e2 && null !== e2 && e2.digest === y && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }
      function w(e2) {
        return e2.length > 0;
      }
      function S(e2, t2) {
        return e2.dynamicAccesses.push(...t2.dynamicAccesses), e2.dynamicAccesses;
      }
      function x(e2) {
        return e2.filter((e3) => "string" == typeof e3.stack && e3.stack.length > 0).map(({ expression: e3, stack: t2 }) => (t2 = t2.split("\n").slice(4).filter((e4) => !(e4.includes("node_modules/next/") || e4.includes(" (<anonymous>)") || e4.includes(" (node:"))).join("\n"), `Dynamic API Usage Debug - ${e3}:
${t2}`));
      }
      function E(e2) {
        switch (e2.type) {
          case "prerender":
          case "prerender-runtime":
            let t2 = new AbortController();
            if (e2.cacheSignal) e2.cacheSignal.inputReady().then(() => {
              t2.abort();
            });
            else {
              let r2 = (0, s.getStagedRenderingController)(e2);
              r2 && null !== r2.finalStage ? r2.waitForStage(r2.finalStage).then(() => (0, l.scheduleOnNextTick)(() => t2.abort()), P) : (0, l.scheduleOnNextTick)(() => t2.abort());
            }
            return t2.signal;
          case "prerender-client":
          case "validation-client":
          case "prerender-legacy":
          case "request":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "build-time-generator":
            return;
        }
      }
      function P() {
      }
      function C(e2, t2) {
        let r2 = t2.dynamicTracking;
        r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: e2 });
      }
    }, 95099, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n, a, i = { EnsureStaticLevel: function() {
        return c;
      }, resolveEnsureStaticConfig: function() {
        return d;
      }, resolveEnsureStaticLevel: function() {
        return u;
      } };
      for (var o in i) Object.defineProperty(r, o, { enumerable: true, get: i[o] });
      let s = e.r(11062), l = e.r(6333);
      var c = ((n = {})[n.None = 0] = "None", n[n.Shell = 1] = "Shell", n[n.Prefetch = 2] = "Prefetch", n[n.Navigation = 3] = "Navigation", n);
      async function u(e2, t2) {
        switch (await d(e2, t2)) {
          case "auto":
          case false:
            return 0;
          case "shell":
            return 1;
          case "prefetch":
            return 2;
          case "navigation":
            return 3;
        }
      }
      async function d(e2, t2) {
        let { config: r2, filePath: n2 } = await h(e2);
        if (!t2) switch (r2) {
          case "auto":
            r2 = "prefetch";
            break;
          case false:
          case "shell": {
            let e3 = r2;
            r2 = "prefetch", console.warn(`${p(e3)} has no effect unless the route is using Partial Prefetching.
  (from: ${n2})`);
          }
        }
        return false === r2 ? "auto" : r2;
      }
      async function h(e2) {
        var t2;
        let { mod: r2, filePath: n2 } = await (0, l.getLayoutOrPageModule)(e2), a2 = { config: ((t2 = r2) ? t2.ensureStatic : void 0) ?? "auto", filePath: n2 ?? null }, i2 = null, o2 = null, { parallelRoutes: c2 } = (0, s.parseLoaderTree)(e2);
        for (let e3 in c2) {
          let t3 = c2[e3], r3 = await h(t3);
          if (i2) switch (m(r3.config, i2.config)) {
            case 2:
              "auto" === i2.config && "auto" !== r3.config && (i2 = r3, o2 = e3);
              break;
            case 4:
            case 1:
            case 3:
              throw Error(`Parallel slots cannot have incompatible \`ensureStatic\`.
  ${f(o2)}: 
    ${p(i2.config)}
    (from: ${i2.filePath})

  ${f(e3)}: 
    ${p(r3.config)}
    (from: ${r3.filePath})

 Possible fixes:
 - Remove one of the \`ensureStatic\` exports
 - Change one of the  \`ensureStatic\` exports to match the other`);
          }
          else i2 = r3, o2 = e3;
        }
        if (!i2) return a2;
        {
          let e3 = m(i2.config, a2.config);
          switch (e3) {
            case 2:
              if ("auto" === a2.config && "auto" !== i2.config) return i2;
              return a2;
            case 3:
              return i2;
            case 1:
            case 4:
              throw Error((1 === e3 ? "A child segment cannot override a parent segment with a less-constrained `ensureStatic`." : "A child segment cannot override a parent segment with an incompatible `ensureStatic`.") + `
  Parent has: 
    ${p(a2.config)}
    (from: ${a2.filePath})
  Child has: 
    ${p(i2.config)}
    (from: ${i2.filePath})

 Possible fixes:
 - Remove one of the \`ensureStatic\` exports
 - Change one of the  \`ensureStatic\` exports to match the other`);
          }
        }
      }
      function f(e2) {
        return "children" === e2 ? e2 : `@${e2}`;
      }
      function p(e2) {
        return `export const ensureStatic = ${JSON.stringify(e2)}`;
      }
      var g = ((a = g || {})[a.LessConstrained = 1] = "LessConstrained", a[a.Compatible = 2] = "Compatible", a[a.MoreConstrained = 3] = "MoreConstrained", a[a.Incompatible = 4] = "Incompatible", a);
      let _ = ["shell", "prefetch", "navigation"];
      function m(e2, t2) {
        if ("auto" === e2 || "auto" === t2 || false === e2 && false === t2) return 2;
        if (false === e2 || false === t2) return 4;
        let r2 = _.indexOf(e2), n2 = _.indexOf(t2);
        return r2 < n2 ? 1 : r2 === n2 ? 2 : 3;
      }
    }, 39301, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n, a, i = { RENDER_STAGE_ADVANCE_ORDER: function() {
        return u;
      }, RenderStage: function() {
        return c;
      }, StagedRenderingController: function() {
        return p;
      }, SyncIOMode: function() {
        return f;
      }, getNextStage: function() {
        return d;
      }, isAdvanceableRenderStage: function() {
        return h;
      } };
      for (var o in i) Object.defineProperty(r, o, { enumerable: true, get: i[o] });
      let s = e.r(9195), l = e.r(12152);
      var c = ((n = {})[n.Before = 1] = "Before", n[n.ShellStatic = 10] = "ShellStatic", n[n.PrefetchStatic_prefetchApi = 11] = "PrefetchStatic_prefetchApi", n[n.PrefetchStatic = 12] = "PrefetchStatic", n[n.NavigationStatic = 13] = "NavigationStatic", n[n.Static = 14] = "Static", n[n.ShellRuntime = 20] = "ShellRuntime", n[n.PrefetchRuntime_prefetchApi = 21] = "PrefetchRuntime_prefetchApi", n[n.PrefetchRuntime = 22] = "PrefetchRuntime", n[n.NavigationRuntime = 23] = "NavigationRuntime", n[n.Dynamic = 30] = "Dynamic", n[n.Abandoned = 40] = "Abandoned", n);
      let u = [10, 11, 12, 13, 14, 20, 21, 22, 23, 30];
      function d(e2) {
        return u[u.indexOf(e2) + 1];
      }
      function h(e2) {
        return 1 < e2 && e2 <= 30;
      }
      var f = ((a = {})[a.Untracked = 1] = "Untracked", a[a.AllowedInRuntimeOrDynamic = 2] = "AllowedInRuntimeOrDynamic", a[a.AllowedInDynamic = 3] = "AllowedInDynamic", a);
      class p {
        constructor({ abortSignal: e2, abandonController: t2, syncIO: r2, finalStage: n2 }) {
          this.currentStage = 1, this.syncInterruptReason = null, this.triggers = (function() {
            let e3 = {};
            for (let t3 of u) e3[t3] = (function() {
              let { promise: e4, resolve: t4, reject: r3 } = (0, l.createPromiseWithResolvers)();
              return { state: "pending", triggeredAt: null, promise: e4, _listeners: [], _resolvePromise: t4, _rejectPromise: r3 };
            })();
            return e3;
          })(), this.abortSignal = e2, this.abandonController = t2, this.syncIOMode = r2, this.finalStage = n2, e2 && e2.addEventListener("abort", () => {
            let { reason: t3 } = e2;
            for (let e3 of Object.values(this.triggers)) {
              var r3, n3;
              r3 = e3, n3 = t3, "pending" === r3.state && (r3.state = "cancelled", r3._listeners.length = 0, r3.promise.catch(g), r3._rejectPromise(n3));
            }
          }, { once: true }), t2 && t2.signal.addEventListener("abort", () => {
            this.abandonRender();
          }, { once: true });
        }
        onStage(e2, t2) {
          var r2, n2;
          r2 = this.triggers[e2], n2 = t2, "pending" === r2.state ? r2._listeners.push(n2) : n2();
        }
        shouldTrackSyncInterrupt() {
          let { syncIOMode: e2, currentStage: t2 } = this;
          switch (e2) {
            case 1:
              return false;
            case 2:
              return t2 > 1 && t2 <= 14;
            case 3:
              return t2 > 1 && t2 < 30;
          }
        }
        syncInterruptCurrentStageWithReason(e2) {
          let { currentStage: t2 } = this;
          if (1 !== t2 && 30 !== t2 && 40 !== t2) {
            if (this.abandonController) return void this.abandonController.abort();
            if (this.abortSignal) {
              this.syncInterruptReason = e2, this.currentStage = 40;
              return;
            }
            this.syncInterruptReason = e2, this.advanceStage(30);
          }
        }
        getSyncInterruptReason() {
          return this.syncInterruptReason;
        }
        getStageEndTime(e2) {
          return this.triggers[d(e2)].triggeredAt ?? 1 / 0;
        }
        abandonRender() {
          let { currentStage: e2 } = this;
          if (1 === e2) throw new s.InvariantError("A render that hasn't started yet cannot be abandoned");
          if (30 === e2 || 40 === e2) return;
          let t2 = u.indexOf(e2) + 1, r2 = u.indexOf(30);
          for (let e3 = t2; e3 < r2; e3++) this.resolveStage(u[e3]);
          this.currentStage = 40;
        }
        advanceStage(e2) {
          if (null !== this.finalStage && e2 > this.finalStage) throw new s.InvariantError(`Attempted to advance to stage ${c[e2]} but the render is limited to ${c[this.finalStage]}`);
          let { currentStage: t2 } = this;
          if (30 === t2 || 40 === t2 || e2 <= t2) return;
          this.currentStage = e2;
          let r2 = 1 === t2 ? 0 : u.indexOf(t2) + 1, n2 = u.indexOf(e2);
          for (let e3 = r2; e3 <= n2; e3++) this.resolveStage(u[e3]);
        }
        resolveStage(e2) {
          var t2 = this.triggers[e2];
          if ("pending" === t2.state) {
            t2.state = "triggered", t2.triggeredAt = performance.now() + performance.timeOrigin;
            try {
              let { _listeners: e3 } = t2;
              for (let t3 = 0; t3 < e3.length; t3++) e3[t3]();
              e3.length = 0;
            } finally {
              t2._resolvePromise();
            }
          }
        }
        getStagePromise(e2) {
          return this.triggers[e2].promise;
        }
        waitForStage(e2) {
          return this.getStagePromise(e2);
        }
        delayUntilStage(e2, t2, r2) {
          let n2 = this.getStagePromise(e2).then(() => r2);
          return this.abortSignal && n2.catch(g), n2;
        }
      }
      function g() {
      }
    }, 14483, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { ClientHookDynamicError: function() {
        return p;
      }, RENDER_STAGES_BY_DATA_KIND: function() {
        return G;
      }, applyOwnerStack: function() {
        return B;
      }, createPrerenderDataTracking: function() {
        return E;
      }, finishPrerenderDataTracking: function() {
        return P;
      }, isClientHookDynamicError: function() {
        return g;
      }, isHangingPromiseRejectionError: function() {
        return u;
      }, makeClientHookHangingPromise: function() {
        return M;
      }, makeDevtoolsIOAwarePromise: function() {
        return U;
      }, makeDynamicHangingPromise: function() {
        return m;
      }, makeFallbackParamsHangingPromise: function() {
        return x;
      }, makePrefetchHangingPromise: function() {
        return S;
      }, makePromiseFromTrigger: function() {
        return j;
      }, makeSessionDataHangingPromise: function() {
        return v;
      }, makeURLDataHangingPromise: function() {
        return b;
      }, makeUnknownRuntimeDataHangingPromise: function() {
        return w;
      }, makeUntrackedHangingPromise: function() {
        return y;
      }, trackFallbackParamsAccessed: function() {
        return T;
      }, trackIncompatibleShellContent: function() {
        return L;
      }, trackPromiseUsed: function() {
        return q;
      }, trackURLDataAccessed: function() {
        return R;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(9195), o = e.r(12152), s = e.r(95099), l = e.r(39301), c = e.r(56704);
      function u(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === d;
      }
      e.r(32319), e.r(59043);
      let d = "HANGING_PROMISE_REJECTION";
      class h extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = d;
        }
      }
      let f = "CLIENT_HOOK_DYNAMIC";
      class p extends Error {
        constructor(e2, t2) {
          super(`Route "${e2}": Next.js encountered URL data \`${t2}\` in a Client Component outside of \`<Suspense>\`.

This blocks prerendering because the value is only available at runtime.

Ways to fix this:
  - [stream] Wrap the component in \`<Suspense fallback={...}>\` so the hook value streams in after prerendering
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-client-hook`), this.digest = f;
        }
      }
      function g(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === f;
      }
      let _ = /* @__PURE__ */ new WeakMap();
      function m(e2, t2, r2) {
        return k(e2, new h(t2, r2));
      }
      function y(e2, t2, r2) {
        return k(e2, new h(t2, r2));
      }
      function v(e2, t2, r2, n2) {
        return q(k(e2, new h(t2, r2)), C.bind(null, n2, r2));
      }
      function b(e2, t2, r2, n2) {
        let a2 = k(e2, new h(t2, r2));
        return null === n2 ? a2 : q(a2, R.bind(null, n2, r2));
      }
      function w(e2, t2, r2, n2) {
        return v(e2, t2, r2, n2);
      }
      function S(e2, t2, r2) {
        return y(e2, t2, r2);
      }
      function x(e2, t2, r2, n2) {
        let a2 = k(e2, new h(t2, r2));
        return null === n2 ? a2 : q(a2, T.bind(null, n2, r2));
      }
      function E() {
        return { runtimeDataAccessed: (0, o.createPromiseWithResolvers)(), shouldAttemptStaticShell: true, shouldAttemptStaticPrefetch: true };
      }
      function P(e2) {
        e2.runtimeDataAccessed.resolve(false);
      }
      function C(e2, t2) {
        A(e2, 1, t2);
      }
      function R(e2, t2) {
        A(e2, 2, t2);
      }
      function T(e2, t2) {
        A(e2, 3, t2);
      }
      function A(e2, t2, r2) {
        if ("prerender" === e2.type) {
          let { prerenderDataTracking: n2, stagedRendering: a2 } = e2;
          if (!n2 || !a2) return;
          let { currentStage: o2 } = a2;
          if (o2 === l.RenderStage.Before) return void console.error(new i.InvariantError("Unexpected trackRuntimeDataAccessed in the Before stage."));
          if (o2 >= l.RenderStage.NavigationStatic) return;
          let c2 = e2.ensureStaticLevel ?? s.EnsureStaticLevel.None;
          switch (t2) {
            case 1: {
              let e3 = null;
              o2 <= l.RenderStage.ShellStatic && c2 < s.EnsureStaticLevel.Shell && (n2.shouldAttemptStaticShell = false, e3 ??= l.RenderStage.ShellStatic, null == I || I(r2, "shell")), o2 <= l.RenderStage.PrefetchStatic && c2 < s.EnsureStaticLevel.Prefetch && (n2.shouldAttemptStaticPrefetch = false, e3 ??= l.RenderStage.PrefetchStatic, null == I || I(r2, "prefetch")), null !== e3 && O(n2, a2, e3);
              break;
            }
            case 3:
              if (e2.isFallbackUpgradeable) {
                c2 < s.EnsureStaticLevel.Prefetch && (O(n2, a2, l.RenderStage.PrefetchStatic), null == N || N());
                break;
              }
            case 2:
              o2 <= l.RenderStage.PrefetchStatic && c2 < s.EnsureStaticLevel.Prefetch && (n2.shouldAttemptStaticPrefetch = false, null == I || I(r2, "prefetch"), O(n2, a2, l.RenderStage.PrefetchStatic));
          }
        }
      }
      function O(e2, t2, r2) {
        let { runtimeDataAccessed: n2 } = e2;
        t2.currentStage >= r2 ? n2.resolve(true) : t2.onStage(r2, n2.resolve.bind(null, true));
      }
      let I = process.env.NEXT_PRIVATE_DEBUG_RUNTIME_DATA ? (e2, t2) => {
        let { route: r2 } = c.workAsyncStorage.getStore();
        console.log(`Route '${r2}': deopting to a runtime ${t2} because it used ${e2}`);
      } : void 0, N = process.env.NEXT_PRIVATE_DEBUG_RUNTIME_DATA ? () => {
        let { route: e2 } = c.workAsyncStorage.getStore();
        console.log(`Route '${e2}': marking upgradeable fallback as runtime prefetchable`);
      } : void 0;
      function L(e2, t2) {
        let { stagedRendering: r2 } = e2;
        if (!r2) return;
        let { currentStage: n2 } = r2;
        if (n2 !== l.RenderStage.Dynamic && n2 !== l.RenderStage.Abandoned) {
          if (process.env.NEXT_PRIVATE_DEBUG_VALIDATION) {
            let e3 = c.workAsyncStorage.getStore();
            console.log(`Route ${e3.route}: Incompatible shell content: ${t2}`);
          }
          e2.hasIncompatibleShellContent = true;
        }
      }
      function M(e2, t2) {
        return k(e2, t2);
      }
      function k(e2, t2) {
        if (e2.aborted) return Promise.reject(t2);
        {
          let r2 = new Promise((r3, n2) => {
            let a2 = n2.bind(null, t2), i2 = _.get(e2);
            if (i2) i2.push(a2);
            else {
              let t3 = [a2];
              _.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return r2.catch(D), r2;
        }
      }
      function D() {
      }
      function j(e2, t2) {
        let r2 = e2.then(() => t2);
        return r2.catch(D), r2;
      }
      function U(e2, t2, r2) {
        return t2.stagedRendering ? t2.stagedRendering.delayUntilStage(r2, void 0, e2) : new Promise((t3) => {
          setTimeout(() => {
            t3(e2);
          }, 0);
        });
      }
      function q(e2, t2) {
        return $.from(e2, t2);
      }
      class $ extends Promise {
        #r;
        static get [Symbol.species]() {
          return Promise;
        }
        static from(e2, t2) {
          let r2 = new $(e2.then.bind(e2));
          return r2.#r = t2, Promise.prototype.then.call(r2, void 0, D), r2;
        }
        then(e2, t2) {
          let r2 = this.#r;
          if (r2) try {
            r2();
          } catch (e3) {
            console.error(e3);
          }
          return Promise.prototype.then.call(this, e2, t2);
        }
        constructor(...e2) {
          super(...e2), this.#r = null;
        }
      }
      let G = { sessionData: l.RenderStage.ShellRuntime, staticUrlData: { prefetchApi: { static: l.RenderStage.PrefetchStatic_prefetchApi, runtime: l.RenderStage.PrefetchRuntime_prefetchApi }, static: l.RenderStage.PrefetchStatic, runtime: l.RenderStage.PrefetchRuntime }, runtimeUrlData: l.RenderStage.PrefetchRuntime };
      function B(e2) {
        return e2;
      }
    }, 6333, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getComponentTypeModule: function() {
        return s;
      }, getLayoutOrPageModule: function() {
        return o;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(38613);
      async function o(e2) {
        let t2, r2, n2, { layout: a2, page: o2, defaultPage: s2 } = e2[2], l = void 0 !== a2, c = void 0 !== o2, u = void 0 !== s2 && e2[0] === i.DEFAULT_SEGMENT_KEY;
        return l ? (t2 = await a2[0](), r2 = "layout", n2 = a2[1]) : c ? (t2 = await o2[0](), r2 = "page", n2 = o2[1]) : u && (t2 = await s2[0](), r2 = "page", n2 = s2[1]), { mod: t2, modType: r2, filePath: n2 };
      }
      async function s(e2, t2) {
        let { [t2]: r2 } = e2[2];
        if (void 0 !== r2) return await r2[0]();
      }
    }, 40155, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "connection", { enumerable: true, get: function() {
        return d;
      } });
      let n = e.r(56704), a = e.r(32319), i = e.r(62946), o = e.r(37986), s = e.r(14483), l = e.r(199);
      e.r(39301);
      let c = e.r(9195), u = e.r(826);
      function d() {
        let e2 = n.workAsyncStorage.getStore(), t2 = a.workUnitAsyncStorage.getStore();
        if (e2) {
          if (t2 && !(0, l.isRequestApiAllowedInCurrentPhase)(t2)) throw Error(`Route ${e2.route} used \`connection()\` inside \`after()\` while rendering. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but \`after()\` executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`);
          if (e2.forceStatic) return Promise.resolve(void 0);
          if (e2.dynamicShouldError) throw new o.StaticGenBailoutError(`Route ${e2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (t2) switch (t2.type) {
            case "cache": {
              let t3 = (0, u.createConnectionInPublicUseCacheError)(e2.route);
              throw Error.captureStackTrace(t3, d), (0, s.applyOwnerStack)(t3), e2.invalidDynamicUsageError ??= t3, t3;
            }
            case "private-cache": {
              let t3 = (0, u.createConnectionInPrivateUseCacheError)(e2.route);
              throw Error.captureStackTrace(t3, d), (0, s.applyOwnerStack)(t3), e2.invalidDynamicUsageError ??= t3, t3;
            }
            case "unstable-cache":
              throw (0, u.createConnectionInUnstableCacheError)(e2.route);
            case "build-time-generator":
              throw Error(`Route ${e2.route} used \`connection()\` inside \`${t2.functionName}\`. This is not supported because \`${t2.functionName}\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`);
            case "prerender":
            case "prerender-client":
            case "prerender-runtime":
              return (0, s.makeDynamicHangingPromise)(t2.renderSignal, e2.route, "`connection()`");
            case "validation-client": {
              let e3 = "`connection`";
              throw new c.InvariantError(`${e3} must not be used within a Client Component. Next.js should be preventing ${e3} from being included in Client Components statically, but did not in this case.`);
            }
            case "prerender-legacy":
              return (0, i.throwToInterruptStaticGeneration)("connection", e2, t2);
            case "request":
              if ((0, i.trackDynamicDataInDynamicRender)(t2), t2.asyncApiPromises) return t2.asyncApiPromises.connection;
              return Promise.resolve(void 0);
          }
        }
        (0, a.throwForMissingRequestStore)("connection");
      }
    }, 199, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { isRequestApiAllowedInCurrentPhase: function() {
        return d;
      }, throwForSearchParamsAccessInUseCache: function() {
        return u;
      }, throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return c;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(37986), o = e.r(20635), s = e.r(24725), l = e.r(826);
      function c(e2, t2) {
        throw new i.StaticGenBailoutError(`Route ${e2} with \`dynamic = "error"\` couldn't be rendered statically because it used ${t2}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
      }
      function u(e2, t2) {
        let r2 = (0, l.createSearchParamsInUseCacheError)(e2.route);
        throw Error.captureStackTrace(r2, t2), e2.invalidDynamicUsageError ??= r2, r2;
      }
      function d(e2) {
        switch (e2.phase) {
          case "action":
          case "render":
            return true;
          case "after": {
            let e3 = o.actionAsyncStorage.getStore();
            if (e3 && (e3.isAppRoute || e3.isAction)) return true;
            let t2 = s.afterTaskAsyncStorage.getStore();
            if (t2) return "action" === t2.rootTaskSpawnPhase;
            return false;
          }
        }
      }
    }, 826, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { createCacheLifeOutsideUseCacheError: function() {
        return R;
      }, createCacheTagOutsideUseCacheError: function() {
        return C;
      }, createConnectionInPrivateUseCacheError: function() {
        return _;
      }, createConnectionInPublicUseCacheError: function() {
        return g;
      }, createConnectionInUnstableCacheError: function() {
        return m;
      }, createCookiesInUnstableCacheError: function() {
        return d;
      }, createCookiesInUseCacheError: function() {
        return u;
      }, createDraftModeMutationInUnstableCacheError: function() {
        return w;
      }, createDraftModeMutationInUseCacheError: function() {
        return b;
      }, createHeadersInUnstableCacheError: function() {
        return f;
      }, createHeadersInUseCacheError: function() {
        return h;
      }, createNestedCacheShortExpireError: function() {
        return A;
      }, createNestedCacheZeroRevalidateError: function() {
        return T;
      }, createRevalidateDuringRenderError: function() {
        return S;
      }, createRevalidateInBuildTimeGeneratorError: function() {
        return E;
      }, createRevalidateInCachedFunctionError: function() {
        return x;
      }, createRouteHandlerRequestInUnstableCacheError: function() {
        return v;
      }, createRouteHandlerRequestInUseCacheError: function() {
        return y;
      }, createSearchParamsInUseCacheError: function() {
        return p;
      }, createUseCachePrivateInsidePublicUseCacheError: function() {
        return O;
      }, createUseCachePrivateInsideUnstableCacheError: function() {
        return I;
      }, createUseCachePrivateOutsideRequestContextError: function() {
        return N;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = "https://nextjs.org/docs/messages/next-request-in-use-cache", o = "https://nextjs.org/docs/app/api-reference/functions/unstable_cache", s = "https://nextjs.org/docs/messages/use-cache-private-composition", l = "https://nextjs.org/docs/messages/revalidate-in-use-cache", c = "https://nextjs.org/docs/messages/nested-use-cache-no-explicit-cachelife";
      function u(e2) {
        return Error(`Route "${e2}": \`cookies()\` can't be read inside \`"use cache"\`. Read it outside the cached function and pass what you need as an argument.
Learn more: ${i}`);
      }
      function d(e2) {
        return Error(`Route "${e2}": \`cookies()\` can't be read inside \`unstable_cache()\`. Read it outside the cached function and pass what you need as an argument.
Learn more: ${o}`);
      }
      function h(e2) {
        return Error(`Route "${e2}": \`headers()\` can't be read inside \`"use cache"\`. Read it outside the cached function and pass what you need as an argument.
Learn more: ${i}`);
      }
      function f(e2) {
        return Error(`Route "${e2}": \`headers()\` can't be read inside \`unstable_cache()\`. Read it outside the cached function and pass what you need as an argument.
Learn more: ${o}`);
      }
      function p(e2) {
        return Error(`Route "${e2}": \`searchParams\` can't be read inside \`"use cache"\`. Await it outside the cached function and pass what you need as an argument.
Learn more: ${i}`);
      }
      function g(e2) {
        return Error(`Route "${e2}": \`connection()\` can't be called inside \`"use cache"\` because cached functions may run during prerendering, without an incoming request. Call it outside the cached function.
Learn more: ${i}`);
      }
      function _(e2) {
        return Error(`Route "${e2}": \`connection()\` can't be called inside \`"use cache: private"\` because private cached functions may run during prefetching, without a navigation request. Call it outside the cached function.
Learn more: https://nextjs.org/docs/app/api-reference/directives/use-cache-private`);
      }
      function m(e2) {
        return Error(`Route "${e2}": \`connection()\` can't be called inside \`unstable_cache()\` because cached functions may run during prerendering, without an incoming request. Call it outside the cached function.
Learn more: ${o}`);
      }
      function y(e2, t2) {
        return Error(`Route "${e2}": \`${t2}\` can't be read inside \`"use cache"\`. Read it outside the cached function and pass what you need as an argument.
Learn more: ${i}`);
      }
      function v(e2, t2) {
        return Error(`Route "${e2}": \`${t2}\` can't be read inside \`unstable_cache()\`. Read it outside the cached function and pass what you need as an argument.
Learn more: ${o}`);
      }
      function b(e2, t2) {
        return Error(`Route "${e2}": \`${t2}\` can't be called inside \`"use cache"\`. Draft mode can be read inside a cached function, but enabling or disabling it must happen outside.
Learn more: ${i}`);
      }
      function w(e2, t2) {
        return Error(`Route "${e2}": \`${t2}\` can't be called inside \`unstable_cache()\`. Draft mode can be read inside a cached function, but enabling or disabling it must happen outside.
Learn more: ${o}`);
      }
      function S(e2, t2) {
        return Error(`Route "${e2}": \`${t2}\` can't be called during render. Call it from a Server Action or Route Handler instead.
Learn more: ${l}`);
      }
      function x(e2, t2) {
        return Error(`Route "${e2}": \`${t2}\` can't be called inside a cached function. Call it from a Server Action or Route Handler instead.
Learn more: ${l}`);
      }
      function E(e2, t2, r2) {
        return Error(`Route "${e2}": \`${t2}\` can't be called inside \`${r2}\`. Call it from a Server Action or Route Handler instead.
Learn more: ${l}`);
      }
      function P(e2) {
        return void 0 === e2 ? "" : `Route "${e2}": `;
      }
      function C(e2) {
        return Error(`${P(e2)}\`cacheTag()\` can only be called inside a \`"use cache"\` or \`"use cache: private"\` function.
Learn more: https://nextjs.org/docs/messages/cache-tag-outside-use-cache`);
      }
      function R(e2) {
        return Error(`${P(e2)}\`cacheLife()\` can only be called inside a \`"use cache"\` or \`"use cache: private"\` function.
Learn more: https://nextjs.org/docs/messages/cache-life-outside-use-cache`);
      }
      function T(e2, t2) {
        return Error(`Route "${e2}": A nested \`"use cache"\` with \`revalidate: 0\` is inside an outer \`"use cache"\` that has no \`cacheLife()\`. Add \`cacheLife()\` to the outer one to choose whether to prerender it with a non-zero \`revalidate\` or keep it dynamic with \`revalidate: 0\`.
Learn more: ${c}`, { cause: t2 });
      }
      function A(e2, t2) {
        return Error(`Route "${e2}": A nested \`"use cache"\` with a short \`expire\` (under 5 minutes) is inside an outer \`"use cache"\` that has no \`cacheLife()\`. Add \`cacheLife()\` to the outer one to choose whether to prerender it with a longer \`expire\` or keep it dynamic with a short \`expire\`.
Learn more: ${c}`, { cause: t2 });
      }
      function O(e2) {
        return Error(`Route "${e2}": \`"use cache: private"\` can't be nested inside \`"use cache"\` because a shared cached function can't depend on private request data. Nest it only inside another \`"use cache: private"\`.
Learn more: ${s}`);
      }
      function I(e2) {
        return Error(`Route "${e2}": \`"use cache: private"\` can't be used inside \`unstable_cache()\` because \`unstable_cache()\` uses a shared cache that can't contain private request data. Call the private cached function outside \`unstable_cache()\`.
Learn more: ${s}`);
      }
      function N(e2, t2) {
        return Error(`Route "${e2}": \`"use cache: private"\` needs an active request, so it can't be used during \`${t2}\` or other build-time contexts. Move it to a request-time component or function.
Learn more: ${s}`);
      }
    }, 99996, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { PageSignatureError: function() {
        return i;
      }, RemovedPageError: function() {
        return o;
      }, RemovedUAError: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      class i extends Error {
        constructor({ page: e2 }) {
          super(`The middleware "${e2}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class o extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class s extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
    }, 88514, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "NextURL", { enumerable: true, get: function() {
        return u;
      } });
      let n = e.r(77142), a = e.r(11467), i = e.r(96570), o = e.r(89908), s = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function l(e2, t2) {
        let r2 = new URL(String(e2), t2 && String(t2));
        return s.test(r2.hostname) && (r2.hostname = "localhost"), r2;
      }
      let c = /* @__PURE__ */ Symbol("NextURLInternal");
      class u {
        constructor(e2, t2, r2) {
          let n2, a2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (n2 = t2, a2 = r2 || {}) : a2 = r2 || t2 || {}, this[c] = { url: l(e2, n2 ?? a2.base), options: a2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e2, t2, r2, a2, s2;
          let l2 = (0, o.getNextPathnameInfo)(this[c].url.pathname, { nextConfig: this[c].options.nextConfig, parseData: true, i18nProvider: this[c].options.i18nProvider }), u2 = (0, i.getHostname)(this[c].url, this[c].options.headers);
          this[c].domainLocale = this[c].options.i18nProvider ? this[c].options.i18nProvider.detectDomainLocale(u2) : (0, n.detectDomainLocale)(null == (t2 = this[c].options.nextConfig) || null == (e2 = t2.i18n) ? void 0 : e2.domains, u2);
          let d = (null == (r2 = this[c].domainLocale) ? void 0 : r2.defaultLocale) || (null == (s2 = this[c].options.nextConfig) || null == (a2 = s2.i18n) ? void 0 : a2.defaultLocale);
          this[c].url.pathname = l2.pathname, this[c].defaultLocale = d, this[c].basePath = l2.basePath ?? "", this[c].buildId = l2.buildId, this[c].locale = l2.locale ?? d, this[c].trailingSlash = l2.trailingSlash;
        }
        formatPathname() {
          return (0, a.formatNextPathnameInfo)({ basePath: this[c].basePath, buildId: this[c].buildId, defaultLocale: this[c].options.forceLocale ? void 0 : this[c].defaultLocale, locale: this[c].locale, pathname: this[c].url.pathname, trailingSlash: this[c].trailingSlash });
        }
        formatSearch() {
          return this[c].url.search;
        }
        get buildId() {
          return this[c].buildId;
        }
        set buildId(e2) {
          this[c].buildId = e2;
        }
        get locale() {
          return this[c].locale ?? "";
        }
        set locale(e2) {
          var t2, r2;
          if (!this[c].locale || !(null == (r2 = this[c].options.nextConfig) || null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e2))) throw TypeError(`The NextURL configuration includes no locale "${e2}"`);
          this[c].locale = e2;
        }
        get defaultLocale() {
          return this[c].defaultLocale;
        }
        get domainLocale() {
          return this[c].domainLocale;
        }
        get searchParams() {
          return this[c].url.searchParams;
        }
        get host() {
          return this[c].url.host;
        }
        set host(e2) {
          this[c].url.host = e2;
        }
        get hostname() {
          return this[c].url.hostname;
        }
        set hostname(e2) {
          this[c].url.hostname = e2;
        }
        get port() {
          return this[c].url.port;
        }
        set port(e2) {
          this[c].url.port = e2;
        }
        get protocol() {
          return this[c].url.protocol;
        }
        set protocol(e2) {
          this[c].url.protocol = e2;
        }
        get href() {
          let e2 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e2}${t2}${this.hash}`;
        }
        set href(e2) {
          this[c].url = l(e2), this.analyze();
        }
        get origin() {
          return this[c].url.origin;
        }
        get pathname() {
          return this[c].url.pathname;
        }
        set pathname(e2) {
          this[c].url.pathname = e2;
        }
        get hash() {
          return this[c].url.hash;
        }
        set hash(e2) {
          this[c].url.hash = e2;
        }
        get search() {
          return this[c].url.search;
        }
        set search(e2) {
          this[c].url.search = e2;
        }
        get password() {
          return this[c].url.password;
        }
        set password(e2) {
          this[c].url.password = e2;
        }
        get username() {
          return this[c].url.username;
        }
        set username(e2) {
          this[c].url.username = e2;
        }
        get basePath() {
          return this[c].basePath;
        }
        set basePath(e2) {
          this[c].basePath = e2.startsWith("/") ? e2 : `/${e2}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new u(String(this), this[c].options);
        }
      }
    }, 58969, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ReflectAdapter", { enumerable: true, get: function() {
        return n;
      } });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 54499, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { RequestCookies: function() {
        return i.RequestCookies;
      }, ResponseCookies: function() {
        return i.ResponseCookies;
      }, stringifyCookie: function() {
        return i.stringifyCookie;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(81984);
    }, 29947, (e, t, r) => {
      "use strict";
      function n() {
        throw Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead');
      }
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ImageResponse", { enumerable: true, get: function() {
        return n;
      } });
    }, 82163, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { INTERNALS: function() {
        return c;
      }, NextRequest: function() {
        return u;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(88514), o = e.r(86580), s = e.r(99996), l = e.r(54499), c = /* @__PURE__ */ Symbol("internal request");
      class u extends Request {
        constructor(e2, t2 = {}) {
          let r2 = "string" != typeof e2 && "url" in e2 ? e2.url : String(e2);
          (0, o.validateURL)(r2), t2.body && "half" !== t2.duplex && (t2.duplex = "half"), e2 instanceof Request ? super(e2, t2) : super(r2, t2);
          let n2 = new i.NextURL(r2, { headers: (0, o.toNodeOutgoingHttpHeaders)(this.headers), nextConfig: t2.nextConfig });
          this[c] = { cookies: new l.RequestCookies(this.headers), nextUrl: n2, url: n2.toString() };
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[c].cookies;
        }
        get nextUrl() {
          return this[c].nextUrl;
        }
        get page() {
          throw new s.RemovedPageError();
        }
        get ua() {
          throw new s.RemovedUAError();
        }
        get url() {
          return this[c].url;
        }
      }
    }, 59447, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "NextResponse", { enumerable: true, get: function() {
        return d;
      } });
      let n = e.r(54499), a = e.r(88514), i = e.r(86580), o = e.r(58969), s = e.r(54499), l = /* @__PURE__ */ Symbol("internal response"), c = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function u(e2, t2) {
        var r2;
        if (null == e2 || null == (r2 = e2.request) ? void 0 : r2.headers) {
          if (!(e2.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r3 = [];
          for (let [n2, a2] of e2.request.headers) t2.set("x-middleware-request-" + n2, a2), r3.push(n2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class d extends Response {
        constructor(e2, t2 = {}) {
          super(e2, t2);
          let r2 = this.headers, c2 = new Proxy(new s.ResponseCookies(r2), { get(e3, a2, i2) {
            switch (a2) {
              case "delete":
              case "set":
                return (...i3) => {
                  let o2 = Reflect.apply(e3[a2], e3, i3), l2 = new Headers(r2);
                  return o2 instanceof s.ResponseCookies && r2.set("x-middleware-set-cookie", o2.getAll().map((e4) => (0, n.stringifyCookie)(e4)).join(",")), u(t2, l2), o2;
                };
              default:
                return o.ReflectAdapter.get(e3, a2, i2);
            }
          } });
          this[l] = { cookies: c2, url: t2.url ? new a.NextURL(t2.url, { headers: (0, i.toNodeOutgoingHttpHeaders)(r2), nextConfig: t2.nextConfig }) : void 0 };
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[l].cookies;
        }
        static json(e2, t2) {
          let r2 = Response.json(e2, t2);
          return new d(r2.body, r2);
        }
        static redirect(e2, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!c.has(r2)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n2 = "object" == typeof t2 ? t2 : {}, a2 = new Headers(null == n2 ? void 0 : n2.headers);
          return a2.set("Location", (0, i.validateURL)(e2)), new d(null, { ...n2, headers: a2, status: r2 });
        }
        static rewrite(e2, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", (0, i.validateURL)(e2)), u(t2, r2), new d(null, { ...t2, headers: r2 });
        }
        static next(e2) {
          let t2 = new Headers(null == e2 ? void 0 : e2.headers);
          return t2.set("x-middleware-next", "1"), u(e2, t2), new d(null, { ...e2, headers: t2 });
        }
      }
    }, 22586, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "URLPattern", { enumerable: true, get: function() {
        return n;
      } });
      let n = "u" < typeof URLPattern ? void 0 : URLPattern;
    }, 99699, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n, a = { isBot: function() {
        return s;
      }, userAgent: function() {
        return c;
      }, userAgentFromString: function() {
        return l;
      } };
      for (var i in a) Object.defineProperty(r, i, { enumerable: true, get: a[i] });
      let o = (n = e.r(77793)) && n.__esModule ? n : { default: n };
      function s(e2) {
        return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver|GPTBot/i.test(e2);
      }
      function l(e2) {
        return { ...(0, o.default)(e2), isBot: void 0 !== e2 && s(e2) };
      }
      function c({ headers: e2 }) {
        return l(e2.get("user-agent") || void 0);
      }
    }, 86580, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { fromNodeOutgoingHttpHeaders: function() {
        return o;
      }, normalizeNextQueryParam: function() {
        return u;
      }, splitCookiesString: function() {
        return s;
      }, toNodeOutgoingHttpHeaders: function() {
        return l;
      }, validateURL: function() {
        return c;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(22037);
      function o(e2) {
        let t2 = new Headers();
        for (let [r2, n2] of Object.entries(e2)) for (let e3 of Array.isArray(n2) ? n2 : [n2]) void 0 !== e3 && ("number" == typeof e3 && (e3 = e3.toString()), t2.append(r2, e3));
        return t2;
      }
      function s(e2) {
        var t2, r2, n2, a2, i2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e2.length && /\s/.test(e2.charAt(s2)); ) s2 += 1;
          return s2 < e2.length;
        }
        for (; s2 < e2.length; ) {
          for (t2 = s2, i2 = false; l2(); ) if ("," === (r2 = e2.charAt(s2))) {
            for (n2 = s2, s2 += 1, l2(), a2 = s2; s2 < e2.length && "=" !== (r2 = e2.charAt(s2)) && ";" !== r2 && "," !== r2; ) s2 += 1;
            s2 < e2.length && "=" === e2.charAt(s2) ? (i2 = true, s2 = a2, o2.push(e2.substring(t2, n2)), t2 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!i2 || s2 >= e2.length) && o2.push(e2.substring(t2, e2.length));
        }
        return o2;
      }
      function l(e2) {
        let t2 = {}, r2 = [];
        if (e2) for (let [n2, a2] of e2.entries()) "set-cookie" === n2.toLowerCase() ? (r2.push(...s(a2)), t2[n2] = 1 === r2.length ? r2[0] : r2) : t2[n2] = a2;
        return t2;
      }
      function c(e2) {
        try {
          return String(new URL(String(e2)));
        } catch (t2) {
          throw Error(`URL is malformed "${String(e2)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 });
        }
      }
      function u(e2) {
        for (let t2 of [i.NEXT_QUERY_PARAM_PREFIX, i.NEXT_INTERCEPTION_MARKER_PREFIX]) if (e2 !== t2 && e2.startsWith(t2)) return e2.substring(t2.length);
        return null;
      }
    }, 96570, (e, t, r) => {
      "use strict";
      function n(e2, t2) {
        let r2;
        if (t2?.host && !Array.isArray(t2.host)) r2 = t2.host.toString().split(":", 1)[0];
        else {
          if (!e2.hostname) return;
          r2 = e2.hostname;
        }
        return r2.toLowerCase();
      }
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "getHostname", { enumerable: true, get: function() {
        return n;
      } });
    }, 77142, (e, t, r) => {
      "use strict";
      function n(e2, t2, r2) {
        if (e2) {
          for (let n2 of (r2 && (r2 = r2.toLowerCase()), e2)) if (t2 === n2.domain?.split(":", 1)[0].toLowerCase() || r2 === n2.defaultLocale.toLowerCase() || n2.locales?.some((e3) => e3.toLowerCase() === r2)) return n2;
        }
      }
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "detectDomainLocale", { enumerable: true, get: function() {
        return n;
      } });
    }, 9196, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "normalizeLocalePath", { enumerable: true, get: function() {
        return a;
      } });
      let n = /* @__PURE__ */ new WeakMap();
      function a(e2, t2) {
        let r2;
        if (!t2) return { pathname: e2 };
        let a2 = n.get(t2);
        a2 || (a2 = t2.map((e3) => e3.toLowerCase()), n.set(t2, a2));
        let i = e2.split("/", 2);
        if (!i[1]) return { pathname: e2 };
        let o = i[1].toLowerCase(), s = a2.indexOf(o);
        return s < 0 ? { pathname: e2 } : (r2 = t2[s], { pathname: e2 = e2.slice(r2.length + 1) || "/", detectedLocale: r2 });
      }
    }, 9195, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "InvariantError", { enumerable: true, get: function() {
        return n;
      } });
      class n extends Error {
        constructor(e2, t2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : e2 + "."} This is a bug in Next.js.`, t2), this.name = "InvariantError";
        }
      }
    }, 12152, (e, t, r) => {
      "use strict";
      function n() {
        let e2, t2, r2 = new Promise((r3, n2) => {
          e2 = r3, t2 = n2;
        });
        return { resolve: e2, reject: t2, promise: r2 };
      }
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createPromiseWithResolvers", { enumerable: true, get: function() {
        return n;
      } });
    }, 19675, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "addLocale", { enumerable: true, get: function() {
        return i;
      } });
      let n = e.r(82420), a = e.r(94921);
      function i(e2, t2, r2, i2) {
        if (!t2 || t2 === r2) return e2;
        let o = e2.toLowerCase();
        return !i2 && ((0, a.pathHasPrefix)(o, "/api") || (0, a.pathHasPrefix)(o, `/${t2.toLowerCase()}`)) ? e2 : (0, n.addPathPrefix)(e2, `/${t2}`);
      }
    }, 82420, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "addPathPrefix", { enumerable: true, get: function() {
        return a;
      } });
      let n = e.r(98658);
      function a(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: a2, hash: i } = (0, n.parsePath)(e2);
        return `${t2}${r2}${a2}${i}`;
      }
    }, 68664, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "addPathSuffix", { enumerable: true, get: function() {
        return a;
      } });
      let n = e.r(98658);
      function a(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: a2, hash: i } = (0, n.parsePath)(e2);
        return `${r2}${t2}${a2}${i}`;
      }
    }, 11467, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "formatNextPathnameInfo", { enumerable: true, get: function() {
        return s;
      } });
      let n = e.r(50648), a = e.r(82420), i = e.r(68664), o = e.r(19675);
      function s(e2) {
        let t2 = (0, o.addLocale)(e2.pathname, e2.locale, e2.buildId ? void 0 : e2.defaultLocale, e2.ignorePrefix);
        return (e2.buildId || !e2.trailingSlash) && (t2 = (0, n.removeTrailingSlash)(t2)), e2.buildId && (t2 = (0, i.addPathSuffix)((0, a.addPathPrefix)(t2, `/_next/data/${e2.buildId}`), "/" === e2.pathname ? "index.json" : ".json")), t2 = (0, a.addPathPrefix)(t2, e2.basePath), !e2.buildId && e2.trailingSlash ? t2.endsWith("/") ? t2 : (0, i.addPathSuffix)(t2, "/") : (0, n.removeTrailingSlash)(t2);
      }
    }, 89908, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "getNextPathnameInfo", { enumerable: true, get: function() {
        return o;
      } });
      let n = e.r(9196), a = e.r(62236), i = e.r(94921);
      function o(e2, t2) {
        let { basePath: r2, i18n: o2, trailingSlash: s } = t2.nextConfig ?? {}, l = { pathname: e2, trailingSlash: "/" !== e2 ? e2.endsWith("/") : s };
        r2 && (0, i.pathHasPrefix)(l.pathname, r2) && (l.pathname = (0, a.removePathPrefix)(l.pathname, r2), l.basePath = r2);
        let c = l.pathname;
        if (l.pathname.startsWith("/_next/data/") && l.pathname.endsWith(".json")) {
          let e3 = l.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
          l.buildId = e3[0], c = "index" !== e3[1] ? `/${e3.slice(1).join("/")}` : "/", true === t2.parseData && (l.pathname = c);
        }
        if (o2) {
          let e3 = t2.i18nProvider ? t2.i18nProvider.analyze(l.pathname) : (0, n.normalizeLocalePath)(l.pathname, o2.locales);
          l.locale = e3.detectedLocale, l.pathname = e3.pathname ?? l.pathname, !e3.detectedLocale && l.buildId && (e3 = t2.i18nProvider ? t2.i18nProvider.analyze(c) : (0, n.normalizeLocalePath)(c, o2.locales)).detectedLocale && (l.locale = e3.detectedLocale);
        }
        return l;
      }
    }, 11062, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "parseLoaderTree", { enumerable: true, get: function() {
        return a;
      } });
      let n = e.r(38613);
      function a(e2) {
        let [t2, r2, a2, i] = e2, { layout: o, template: s } = a2, { page: l } = a2;
        l = t2 === n.DEFAULT_SEGMENT_KEY ? a2.defaultPage : l;
        let c = o?.[1] || s?.[1] || l?.[1];
        return { page: l, segment: t2, modules: a2, conventionPath: c, parallelRoutes: r2, staticSiblings: i };
      }
    }, 98658, (e, t, r) => {
      "use strict";
      function n(e2) {
        let t2 = e2.indexOf("#"), r2 = e2.indexOf("?"), n2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return n2 || t2 > -1 ? { pathname: e2.substring(0, n2 ? r2 : t2), query: n2 ? e2.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e2.slice(t2) : "" } : { pathname: e2, query: "", hash: "" };
      }
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "parsePath", { enumerable: true, get: function() {
        return n;
      } });
    }, 94921, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "pathHasPrefix", { enumerable: true, get: function() {
        return a;
      } });
      let n = e.r(98658);
      function a(e2, t2) {
        if ("string" != typeof e2) return false;
        let { pathname: r2 } = (0, n.parsePath)(e2);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
    }, 62236, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "removePathPrefix", { enumerable: true, get: function() {
        return a;
      } });
      let n = e.r(94921);
      function a(e2, t2) {
        if (!(0, n.pathHasPrefix)(e2, t2)) return e2;
        let r2 = e2.slice(t2.length);
        return r2.startsWith("/") ? r2 : `/${r2}`;
      }
    }, 50648, (e, t, r) => {
      "use strict";
      function n(e2) {
        return 47 === e2.charCodeAt(e2.length - 1) && e2.length > 1 ? e2.slice(0, -1) : e2;
      }
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "removeTrailingSlash", { enumerable: true, get: function() {
        return n;
      } });
    }, 38613, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { DEFAULT_SEGMENT_KEY: function() {
        return u;
      }, NOT_FOUND_SEGMENT_KEY: function() {
        return d;
      }, PAGE_SEGMENT_KEY: function() {
        return c;
      }, computeSelectedLayoutSegment: function() {
        return l;
      }, getSegmentValue: function() {
        return i;
      }, getSelectedLayoutSegmentPath: function() {
        return function e2(t2, r2, n2 = true, a2 = []) {
          let o2;
          if (n2) o2 = t2[1][r2];
          else {
            let e3 = t2[1];
            o2 = e3.children ?? Object.values(e3)[0];
          }
          if (!o2) return a2;
          let s2 = i(o2[0]);
          return s2 && s2 !== c ? (a2.push(s2), e2(o2, r2, false, a2)) : a2;
        };
      }, isGroupSegment: function() {
        return o;
      }, isParallelRouteSegment: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      function i(e2) {
        return Array.isArray(e2) ? e2[1] : e2;
      }
      function o(e2) {
        return "(" === e2[0] && e2.endsWith(")");
      }
      function s(e2) {
        return e2.startsWith("@") && "@children" !== e2;
      }
      function l(e2, t2) {
        if (!e2 || 0 === e2.length) return null;
        let r2 = "children" === t2 ? e2[0] : e2[e2.length - 1];
        return r2 === u ? null : r2;
      }
      let c = "__PAGE__", u = "__DEFAULT__", d = "/_not-found";
    }, 84652, (e, t, r) => {
      let n = { NextRequest: e.r(82163).NextRequest, NextResponse: e.r(59447).NextResponse, ImageResponse: e.r(29947).ImageResponse, userAgentFromString: e.r(99699).userAgentFromString, userAgent: e.r(99699).userAgent, URLPattern: e.r(22586).URLPattern, after: e.r(30131).after, connection: e.r(40155).connection };
      t.exports = n, r.NextRequest = n.NextRequest, r.NextResponse = n.NextResponse, r.ImageResponse = n.ImageResponse, r.userAgentFromString = n.userAgentFromString, r.userAgent = n.userAgent, r.URLPattern = n.URLPattern, r.after = n.after, r.connection = n.connection;
    }];
  }
});

// node-builtins:node:crypto
import * as mod5 from "node:crypto";
var require_node_crypto = __commonJS({
  "node-builtins:node:crypto"(exports, module) {
    module.exports = mod5.default ?? mod5;
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/action-async-storage-instance.js
var require_action_async_storage_instance = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/action-async-storage-instance.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "actionAsyncStorageInstance", {
      enumerable: true,
      get: function() {
        return actionAsyncStorageInstance;
      }
    });
    var _asynclocalstorage = require_async_local_storage();
    var actionAsyncStorageInstance = (0, _asynclocalstorage.getOrCreateGlobalAsyncLocalStorage)("action-async-storage");
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/action-async-storage.external.js
var require_action_async_storage_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/action-async-storage.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "actionAsyncStorage", {
      enumerable: true,
      get: function() {
        return _actionasyncstorageinstance.actionAsyncStorageInstance;
      }
    });
    var _actionasyncstorageinstance = require_action_async_storage_instance();
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js
var require_after_task_async_storage_instance = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "afterTaskAsyncStorageInstance", {
      enumerable: true,
      get: function() {
        return afterTaskAsyncStorageInstance;
      }
    });
    var _asynclocalstorage = require_async_local_storage();
    var afterTaskAsyncStorageInstance = (0, _asynclocalstorage.getOrCreateGlobalAsyncLocalStorage)("after-task-async-storage");
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/after-task-async-storage.external.js
var require_after_task_async_storage_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/after-task-async-storage.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "afterTaskAsyncStorage", {
      enumerable: true,
      get: function() {
        return _aftertaskasyncstorageinstance.afterTaskAsyncStorageInstance;
      }
    });
    var _aftertaskasyncstorageinstance = require_after_task_async_storage_instance();
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/work-async-storage-instance.js
var require_work_async_storage_instance = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/work-async-storage-instance.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "workAsyncStorageInstance", {
      enumerable: true,
      get: function() {
        return workAsyncStorageInstance;
      }
    });
    var _asynclocalstorage = require_async_local_storage();
    var workAsyncStorageInstance = (0, _asynclocalstorage.getOrCreateGlobalAsyncLocalStorage)("work-async-storage");
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/work-async-storage.external.js
var require_work_async_storage_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/app-render/work-async-storage.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "workAsyncStorage", {
      enumerable: true,
      get: function() {
        return _workasyncstorageinstance.workAsyncStorageInstance;
      }
    });
    var _workasyncstorageinstance = require_work_async_storage_instance();
  }
});

// .open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/runtime-reacts.external.js
var require_runtime_reacts_external = __commonJS({
  ".open-next/middleware/node_modules/.pnpm/next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/runtime-reacts.external.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      getClientReact: function() {
        return getClientReact;
      },
      getServerReact: function() {
        return getServerReact;
      },
      registerClientReact: function() {
        return registerClientReact;
      },
      registerServerReact: function() {
        return registerServerReact;
      }
    });
    var ClientReact = null;
    function registerClientReact(react) {
      ClientReact = react;
    }
    function getClientReact() {
      return ClientReact;
    }
    var ServerReact = null;
    function registerServerReact(react) {
      ServerReact = react;
    }
    function getServerReact() {
      return ServerReact;
    }
  }
});

// node-builtins:node:stream
import * as mod6 from "node:stream";
var require_node_stream = __commonJS({
  "node-builtins:node:stream"(exports, module) {
    module.exports = mod6.default ?? mod6;
  }
});

// .open-next/middleware/.next/server/chunks/[externals]__0ehk92o3fo5-r._.js
var require_externals_0ehk92o3fo5_r = __commonJS({
  ".open-next/middleware/.next/server/chunks/[externals]__0ehk92o3fo5-r._.js"(exports, module) {
    "use strict";
    module.exports = [54799, (e, r, t) => {
      r.exports = e.x("crypto", () => require_node_crypto());
    }, 70406, (e, r, t) => {
      r.exports = e.x("next/dist/compiled/@opentelemetry/api", () => require_api());
    }, 20635, (e, r, t) => {
      r.exports = e.x("next/dist/server/app-render/action-async-storage.external.js", () => require_action_async_storage_external());
    }, 24725, (e, r, t) => {
      r.exports = e.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require_after_task_async_storage_external());
    }, 56704, (e, r, t) => {
      r.exports = e.x("next/dist/server/app-render/work-async-storage.external.js", () => require_work_async_storage_external());
    }, 32319, (e, r, t) => {
      r.exports = e.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require_work_unit_async_storage_external());
    }, 59043, (e, r, t) => {
      r.exports = e.x("next/dist/server/runtime-reacts.external.js", () => require_runtime_reacts_external());
    }, 81111, (e, r, t) => {
      r.exports = e.x("node:stream", () => require_node_stream());
    }, 14747, (e, r, t) => {
      r.exports = e.x("path", () => require_node_path());
    }];
  }
});

// .open-next/middleware/.next/server/chunks/[turbopack]_runtime.js
var require_turbopack_runtime = __commonJS({
  ".open-next/middleware/.next/server/chunks/[turbopack]_runtime.js"(exports, module) {
    "use strict";
    var RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
    var RELATIVE_ROOT_PATH = "..";
    var ASSET_PREFIX = "/";
    if (typeof __require !== "undefined") {
      try {
        ({ workerData } = require_node_worker_threads());
        if (workerData?.__turbopack_globals__) {
          Object.assign(globalThis, workerData.__turbopack_globals__);
          delete workerData.__turbopack_globals__;
        }
      } catch (_) {
      }
    }
    var workerData;
    var SourceType = /* @__PURE__ */ (function(SourceType2) {
      SourceType2[SourceType2["Runtime"] = 0] = "Runtime";
      SourceType2[SourceType2["Parent"] = 1] = "Parent";
      SourceType2[SourceType2["Update"] = 2] = "Update";
      return SourceType2;
    })(SourceType || {});
    var createModuleWithDirectionFlag = false;
    var REEXPORTED_OBJECTS = /* @__PURE__ */ new WeakMap();
    function Context(module2, exports2) {
      this.m = module2;
      this.e = exports2;
    }
    var contextPrototype = Context.prototype;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var toStringTag = typeof Symbol !== "undefined" && Symbol.toStringTag;
    function defineProp(obj, name, options) {
      if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
    }
    function getOverwrittenModule(moduleCache2, id) {
      let module2 = moduleCache2.get(id);
      if (module2 === void 0) {
        if (createModuleWithDirectionFlag) {
          module2 = createModuleWithDirection(id);
        } else {
          module2 = createModuleObject(id);
        }
        moduleCache2.set(id, module2);
      }
      return module2;
    }
    function createModuleObject(id) {
      return {
        exports: {},
        error: void 0,
        id,
        namespaceObject: void 0
      };
    }
    function createModuleWithDirection(id) {
      return {
        exports: {},
        error: void 0,
        id,
        namespaceObject: void 0,
        parents: [],
        children: []
      };
    }
    var BindingTag_Value = 0;
    var REEXPORT_GROUP_END = 0;
    function esm(exports2, bindings, dynamic) {
      defineProp(exports2, "__esModule", {
        value: true
      });
      if (toStringTag) defineProp(exports2, toStringTag, {
        value: "Module"
      });
      let i = 0;
      while (i < bindings.length) {
        const propName = bindings[i++];
        const tagOrFunction = bindings[i++];
        if (typeof tagOrFunction === "number") {
          if (tagOrFunction === BindingTag_Value) {
            defineProp(exports2, propName, {
              value: bindings[i++],
              enumerable: true,
              writable: false
            });
          } else {
            throw new Error(`unexpected tag: ${tagOrFunction}`);
          }
        } else {
          const getterFn = tagOrFunction;
          if (typeof bindings[i] === "function") {
            const setterFn = bindings[i++];
            defineProp(exports2, propName, {
              get: getterFn,
              set: setterFn,
              enumerable: true
            });
          } else {
            defineProp(exports2, propName, {
              get: getterFn,
              enumerable: true
            });
          }
        }
      }
      if (!dynamic) Object.seal(exports2);
    }
    function esmExport(bindings, id, dynamic) {
      let module2;
      let exports2;
      if (id != null) {
        module2 = getOverwrittenModule(this.c, id);
        exports2 = module2.exports;
      } else {
        module2 = this.m;
        exports2 = this.e;
      }
      module2.namespaceObject = exports2;
      esm(exports2, bindings, dynamic);
    }
    contextPrototype.s = esmExport;
    function esmReexport(list, id) {
      const bindings = [];
      let i = 0;
      while (i < list.length) {
        const head = list[i++];
        const start = i;
        while (i < list.length && list[i] !== REEXPORT_GROUP_END) i++;
        const end = i;
        i++;
        const namespace = typeof head === "string" || typeof head === "number" ? esmImport.call(this, head) : head;
        if (end - start === 1) {
          const pairs = list[start].split(",");
          for (let j = 0; j < pairs.length; j += 2) {
            appendReexportBinding(bindings, pairs[j], namespace, pairs[j + 1]);
          }
        } else {
          for (let j = start; j < end; j += 2) {
            appendReexportBinding(bindings, list[j], namespace, list[j + 1]);
          }
        }
      }
      esmExport.call(this, bindings, id);
    }
    contextPrototype.S = esmReexport;
    function appendReexportBinding(bindings, exportedName, namespace, importedName) {
      const descriptor = Reflect.getOwnPropertyDescriptor(namespace, importedName);
      if (descriptor) {
        if ("value" in descriptor) {
          bindings.push(exportedName, BindingTag_Value, descriptor.value);
          return;
        }
        if (descriptor.get) {
          bindings.push(exportedName, descriptor.get);
          return;
        }
      }
      bindings.push(exportedName, () => namespace[importedName]);
    }
    function ensureDynamicExports(module2, exports2) {
      let reexportedObjects = REEXPORTED_OBJECTS.get(module2);
      if (!reexportedObjects) {
        REEXPORTED_OBJECTS.set(module2, reexportedObjects = []);
        const reexportOwning = (prop) => {
          if (prop !== "default") {
            for (const obj of reexportedObjects) {
              if (hasOwnProperty.call(obj, prop)) return obj;
            }
          }
          return void 0;
        };
        module2.exports = module2.namespaceObject = new Proxy(exports2, {
          get(target, prop) {
            if (hasOwnProperty.call(target, prop) || prop === "default" || prop === "__esModule") {
              return Reflect.get(target, prop);
            }
            const obj = reexportOwning(prop);
            return obj && Reflect.get(obj, prop);
          },
          // The namespace is read-only, like a real esm namespace object. The
          // re-exported modules can still mutate their own exports (exposed live
          // via `get`), but mutating the namespace itself is rejected. Refusing
          // here, rather than forwarding to the extensible target, also prevents an
          // assignment/definition from shadowing a dynamic re-export. It also
          // prevents delete from removing a static export.
          set() {
            return false;
          },
          defineProperty() {
            return false;
          },
          deleteProperty() {
            return false;
          },
          // The `has` trap ensures that `'exportName' in starImports` will reflect
          // the truth of whether a key is exported.
          has(target, prop) {
            if (Reflect.has(target, prop)) return true;
            if (prop === "default" || prop === "__esModule") return false;
            return reexportOwning(prop) !== void 0;
          },
          // ownKeys and getOwnPropertyDescriptor together make the keys enumerable.
          // If a value is returned from `ownKeys` but its property descriptor is
          // not enumerable, it will not be visible to iterator methods.
          // Collectively, they allow code like the following:
          //
          // ```
          // // module.js re-exports dynamic CJS exports
          // export * from './legacyModule.cjs'
          //
          // // from another JS file, reference the re-exported dynamic values
          // import * as Namespace from './module.js'
          // Object.keys(Namespace)
          // ```
          ownKeys(target) {
            const keys = Reflect.ownKeys(target);
            for (const obj of reexportedObjects) {
              for (const key of Reflect.ownKeys(obj)) {
                if (key !== "default" && !keys.includes(key)) keys.push(key);
              }
            }
            return keys;
          },
          getOwnPropertyDescriptor(target, prop) {
            const own = Reflect.getOwnPropertyDescriptor(target, prop);
            if (own || prop === "default" || prop === "__esModule") return own;
            const obj = reexportOwning(prop);
            if (obj) {
              return {
                enumerable: true,
                configurable: true,
                get: () => Reflect.get(obj, prop)
              };
            }
            return void 0;
          }
        });
      }
      return reexportedObjects;
    }
    function dynamicExport(object, id) {
      let module2;
      let exports2;
      if (id != null) {
        module2 = getOverwrittenModule(this.c, id);
        exports2 = module2.exports;
      } else {
        module2 = this.m;
        exports2 = this.e;
      }
      const reexportedObjects = ensureDynamicExports(module2, exports2);
      if (typeof object === "object" && object !== null) {
        reexportedObjects.push(object);
      }
    }
    contextPrototype.j = dynamicExport;
    function exportValue(value, id) {
      let module2;
      if (id != null) {
        module2 = getOverwrittenModule(this.c, id);
      } else {
        module2 = this.m;
      }
      module2.exports = value;
    }
    contextPrototype.v = exportValue;
    function exportNamespace(namespace, id) {
      let module2;
      if (id != null) {
        module2 = getOverwrittenModule(this.c, id);
      } else {
        module2 = this.m;
      }
      module2.exports = module2.namespaceObject = namespace;
    }
    contextPrototype.n = exportNamespace;
    function createGetter(obj, key) {
      return () => obj[key];
    }
    var getProto = Object.getPrototypeOf ? (obj) => Object.getPrototypeOf(obj) : (obj) => obj.__proto__;
    var LEAF_PROTOTYPES = [
      null,
      getProto({}),
      getProto([]),
      getProto(getProto)
    ];
    function interopEsm(raw, ns, allowExportDefault) {
      const bindings = [];
      let defaultLocation = -1;
      for (let current = raw; (typeof current === "object" || typeof current === "function") && !LEAF_PROTOTYPES.includes(current); current = getProto(current)) {
        for (const key of Object.getOwnPropertyNames(current)) {
          bindings.push(key, createGetter(raw, key));
          if (defaultLocation === -1 && key === "default") {
            defaultLocation = bindings.length - 1;
          }
        }
      }
      if (!(allowExportDefault && defaultLocation >= 0)) {
        if (defaultLocation >= 0) {
          bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
        } else {
          bindings.push("default", BindingTag_Value, raw);
        }
      }
      esm(ns, bindings);
      return ns;
    }
    function createNS(raw) {
      if (typeof raw === "function") {
        return function(...args) {
          return raw.apply(this, args);
        };
      } else {
        return /* @__PURE__ */ Object.create(null);
      }
    }
    function esmImport(id) {
      const module2 = getOrInstantiateModuleFromParent(id, this.m);
      if (module2.namespaceObject) return module2.namespaceObject;
      const raw = module2.exports;
      return module2.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
    }
    contextPrototype.i = esmImport;
    function asyncLoader(moduleId) {
      const loader = this.r(moduleId);
      return loader(esmImport.bind(this));
    }
    contextPrototype.A = asyncLoader;
    var runtimeRequire = (
      // @ts-ignore
      typeof __require === "function" ? __require : function require1() {
        throw new Error("Unexpected use of runtime require");
      }
    );
    contextPrototype.t = runtimeRequire;
    function commonJsRequire(id) {
      return getOrInstantiateModuleFromParent(id, this.m).exports;
    }
    contextPrototype.r = commonJsRequire;
    function parseRequest(request) {
      const hashIndex = request.indexOf("#");
      if (hashIndex !== -1) {
        request = request.substring(0, hashIndex);
      }
      const queryIndex = request.indexOf("?");
      if (queryIndex !== -1) {
        request = request.substring(0, queryIndex);
      }
      return request;
    }
    function moduleContext(map) {
      function moduleContext2(id) {
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
          return map[id].module();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = "MODULE_NOT_FOUND";
        throw e;
      }
      moduleContext2.keys = () => {
        return Object.keys(map);
      };
      moduleContext2.resolve = (id) => {
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
          return map[id].id();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = "MODULE_NOT_FOUND";
        throw e;
      };
      moduleContext2.import = async (id) => {
        return await moduleContext2(id);
      };
      return moduleContext2;
    }
    contextPrototype.f = moduleContext;
    function installCompressedModuleFactories(chunkModules, offset, moduleFactories2, newModuleId) {
      let i = offset;
      while (i < chunkModules.length) {
        let end = i + 1;
        while (end < chunkModules.length && typeof chunkModules[end] !== "function") {
          end++;
        }
        if (end === chunkModules.length) {
          throw new Error("malformed chunk format, expected a factory function");
        }
        const moduleFactoryFn = chunkModules[end];
        let existingGroupFactory = void 0;
        for (let j = i; j < end; j++) {
          const id = chunkModules[j];
          const existingFactory = moduleFactories2.get(id);
          if (existingFactory) {
            existingGroupFactory = existingFactory;
            break;
          }
        }
        const factoryToInstall = existingGroupFactory ?? moduleFactoryFn;
        let didInstallFactory = false;
        for (let j = i; j < end; j++) {
          const id = chunkModules[j];
          if (!moduleFactories2.has(id)) {
            if (!didInstallFactory) {
              if (factoryToInstall === moduleFactoryFn) {
                applyModuleFactoryName(moduleFactoryFn);
              }
              didInstallFactory = true;
            }
            moduleFactories2.set(id, factoryToInstall);
            newModuleId?.(id);
          }
        }
        i = end + 1;
      }
    }
    var relativeURL = function relativeURL2(inputUrl) {
      const realUrl = new URL(inputUrl, "x:/");
      const values = {};
      for (const key in realUrl) values[key] = realUrl[key];
      values.href = inputUrl;
      values.pathname = inputUrl.replace(/[?#].*/, "");
      values.origin = values.protocol = "";
      values.toString = values.toJSON = (..._args) => inputUrl;
      for (const key in values) Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key]
      });
    };
    relativeURL.prototype = URL.prototype;
    contextPrototype.U = relativeURL;
    function invariant(never, computeMessage) {
      throw new Error(`Invariant: ${computeMessage(never)}`);
    }
    function factoryNotAvailableMessage(moduleId, sourceType, sourceData) {
      let instantiationReason;
      switch (sourceType) {
        case 0:
          instantiationReason = `as a runtime entry of chunk ${sourceData}`;
          break;
        case 1:
          instantiationReason = `because it was required from module ${sourceData}`;
          break;
        case 2:
          instantiationReason = "because of an HMR update";
          break;
        default:
          invariant(sourceType, (sourceType2) => `Unknown source type: ${sourceType2}`);
      }
      return `Module ${moduleId} was instantiated ${instantiationReason}, but the module factory is not available.`;
    }
    function placeholderFileUrl(modulePath, root) {
      return `file:///${encodeURIComponent(root ?? "ROOT")}/${modulePath.split("/").map(encodeURIComponent).join("/")}`;
    }
    function requireStub(_moduleId) {
      throw new Error("dynamic usage of require is not supported");
    }
    contextPrototype.z = requireStub;
    contextPrototype.g = globalThis;
    function applyModuleFactoryName(factory) {
      Object.defineProperty(factory, "name", {
        value: "module evaluation"
      });
    }
    async function externalImport(id) {
      let raw;
      try {
        switch (id) {
          case "next/dist/compiled/@vercel/og/index.node.js":
            raw = await Promise.resolve().then(() => (init_throw(), throw_exports));
            break;
          default:
            raw = await import(id);
        }
        ;
      } catch (err) {
        throw new Error(`Failed to load external module ${id}: ${err}`);
      }
      if (raw && raw.__esModule && raw.default && "default" in raw.default) {
        return interopEsm(raw.default, createNS(raw), true);
      }
      return raw;
    }
    contextPrototype.y = externalImport;
    function externalRequire(id, thunk, esm2 = false) {
      let raw;
      try {
        raw = thunk();
      } catch (err) {
        throw new Error(`Failed to load external module ${id}: ${err}`);
      }
      if (!esm2 || raw.__esModule) {
        return raw;
      }
      return interopEsm(raw, createNS(raw), true);
    }
    externalRequire.resolve = (id, options) => {
      return __require.resolve(id, options);
    };
    contextPrototype.x = externalRequire;
    var path3 = require_node_path();
    var relativePathToRuntimeRoot = path3.relative(RUNTIME_PUBLIC_PATH, ".");
    var relativePathToDistRoot = path3.join(relativePathToRuntimeRoot, RELATIVE_ROOT_PATH);
    var RUNTIME_ROOT = path3.resolve(__filename, relativePathToRuntimeRoot);
    var ABSOLUTE_ROOT = path3.resolve(__filename, relativePathToDistRoot);
    function resolveAbsolutePath(modulePath) {
      if (modulePath) {
        return path3.join(ABSOLUTE_ROOT, modulePath);
      }
      return ABSOLUTE_ROOT;
    }
    Context.prototype.P = resolveAbsolutePath;
    function resolveFileUrl(modulePath, root) {
      if (root !== void 0) {
        return placeholderFileUrl(modulePath, root);
      }
      return require_node_url().pathToFileURL(resolveAbsolutePath(modulePath)).href;
    }
    Context.prototype.F = resolveFileUrl;
    process.env.TURBOPACK = "1";
    var url = require_node_url();
    var moduleFactories = /* @__PURE__ */ new Map();
    var moduleCache = /* @__PURE__ */ new Map();
    function resolvePathFromModule(moduleId) {
      const exported = this.r(moduleId);
      const exportedPath = exported?.default ?? exported;
      if (typeof exportedPath !== "string") {
        return exported;
      }
      const strippedAssetPrefix = exportedPath.slice(ASSET_PREFIX.length);
      const resolved = path3.resolve(RUNTIME_ROOT, strippedAssetPrefix);
      return url.pathToFileURL(resolved).href;
    }
    function exportUrl(urlValue, id) {
      exportValue.call(this, urlValue, id);
    }
    function loadRuntimeChunk(sourcePath, chunkData) {
      if (typeof chunkData === "string") {
        loadRuntimeChunkPath(sourcePath, chunkData);
      } else {
        loadRuntimeChunkPath(sourcePath, chunkData.path);
      }
    }
    var loadedChunks = /* @__PURE__ */ new Set();
    var unsupportedLoadChunk = Promise.resolve(void 0);
    var loadedChunk = Promise.resolve(void 0);
    var chunkCache = /* @__PURE__ */ new Map();
    function clearChunkCache() {
      chunkCache.clear();
      loadedChunks.clear();
    }
    function loadRuntimeChunkPath(sourcePath, chunkPath) {
      if (!isJs(chunkPath)) {
        return;
      }
      if (loadedChunks.has(chunkPath)) {
        return;
      }
      try {
        const resolved = path3.resolve(RUNTIME_ROOT, chunkPath);
        const chunkModules = requireChunk(chunkPath);
        installCompressedModuleFactories(chunkModules, 0, moduleFactories);
        loadedChunks.add(chunkPath);
      } catch (cause) {
        let errorMessage = `Failed to load chunk ${chunkPath}`;
        if (sourcePath) {
          errorMessage += ` from runtime for chunk ${sourcePath}`;
        }
        const error2 = new Error(errorMessage, {
          cause
        });
        error2.name = "ChunkLoadError";
        throw error2;
      }
    }
    function loadChunkAsync(chunkData) {
      const chunkPath = typeof chunkData === "string" ? chunkData : chunkData.path;
      if (!isJs(chunkPath)) {
        return unsupportedLoadChunk;
      }
      let entry = chunkCache.get(chunkPath);
      if (entry === void 0) {
        try {
          const resolved = path3.resolve(RUNTIME_ROOT, chunkPath);
          const chunkModules = requireChunk(chunkPath);
          installCompressedModuleFactories(chunkModules, 0, moduleFactories);
          entry = loadedChunk;
        } catch (cause) {
          const errorMessage = `Failed to load chunk ${chunkPath} from module ${this.m.id}`;
          const error2 = new Error(errorMessage, {
            cause
          });
          error2.name = "ChunkLoadError";
          entry = Promise.reject(error2);
        }
        chunkCache.set(chunkPath, entry);
      }
      return entry;
    }
    contextPrototype.l = loadChunkAsync;
    function loadChunkAsyncByUrl(chunkUrl) {
      const path1 = url.fileURLToPath(new URL(chunkUrl, RUNTIME_ROOT));
      return loadChunkAsync.call(this, path1);
    }
    contextPrototype.L = loadChunkAsyncByUrl;
    contextPrototype.w = RUNTIME_ROOT;
    var regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
    function isJs(chunkUrlOrPath) {
      return regexJsUrl.test(chunkUrlOrPath);
    }
    createModuleWithDirectionFlag = true;
    var nodeContextPrototype = Context.prototype;
    nodeContextPrototype.q = exportUrl;
    nodeContextPrototype.M = moduleFactories;
    nodeContextPrototype.c = moduleCache;
    nodeContextPrototype.R = resolvePathFromModule;
    nodeContextPrototype.C = clearChunkCache;
    function instantiateModule(id, sourceType, sourceData) {
      const moduleFactory = moduleFactories.get(id);
      if (typeof moduleFactory !== "function") {
        throw new Error(factoryNotAvailableMessage(id, sourceType, sourceData));
      }
      const module1 = createModuleWithDirection(id);
      const exports2 = module1.exports;
      moduleCache.set(id, module1);
      const context = new Context(module1, exports2);
      try {
        moduleFactory(context, module1, exports2);
      } catch (error2) {
        module1.error = error2;
        throw error2;
      }
      ;
      module1.loaded = true;
      if (module1.namespaceObject && module1.exports !== module1.namespaceObject) {
        interopEsm(module1.exports, module1.namespaceObject);
      }
      return module1;
    }
    function getOrInstantiateModuleFromParent(id, sourceModule) {
      const module1 = moduleCache.get(id);
      if (module1) {
        if (module1.error) {
          throw module1.error;
        }
        return module1;
      }
      return instantiateModule(id, SourceType.Parent, sourceModule.id);
    }
    function instantiateRuntimeModule(chunkPath, moduleId) {
      return instantiateModule(moduleId, SourceType.Runtime, chunkPath);
    }
    function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
      const module1 = moduleCache.get(moduleId);
      if (module1) {
        if (module1.error) {
          throw module1.error;
        }
        return module1;
      }
      return instantiateRuntimeModule(chunkPath, moduleId);
    }
    module.exports = (sourcePath) => ({
      m: (id) => getOrInstantiateRuntimeModule(sourcePath, id),
      c: (chunkData) => loadRuntimeChunk(sourcePath, chunkData)
    });
    function requireChunk(chunkPath) {
      switch (chunkPath) {
        case "server/chunks/[turbopack]_runtime.js":
          return require_turbopack_runtime();
        case "server/chunks/[root-of-the-server]__17apu0aa5snhb._.js":
          return require_root_of_the_server_17apu0aa5snhb();
        case "server/chunks/[externals]__0ehk92o3fo5-r._.js":
          return require_externals_0ehk92o3fo5_r();
        default:
          throw new Error(`Not found ${chunkPath}`);
      }
    }
  }
});

// .open-next/middleware/.next/server/middleware.js
var require_middleware = __commonJS({
  ".open-next/middleware/.next/server/middleware.js"(exports, module) {
    var R = require_turbopack_runtime()("server/middleware.js");
    R.c("server/chunks/[externals]__0ehk92o3fo5-r._.js");
    R.c("server/chunks/[root-of-the-server]__17apu0aa5snhb._.js");
    R.m(64567);
    module.exports = R.m(64567).exports;
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/nodeMiddlewareHandler.js
var nodeMiddlewareHandler_exports = {};
__export(nodeMiddlewareHandler_exports, {
  default: () => middlewareHandler
});
import { Buffer as Buffer4 } from "node:buffer";
import { AsyncLocalStorage as AsyncLocalStorage2 } from "node:async_hooks";
async function middlewareHandler(request) {
  if (!_module) {
    _module = await (await Promise.resolve().then(() => __toESM(require_middleware()))).default;
  }
  const adapterFn = _module.default || _module;
  const result = await adapterFn({
    handler: _module.middleware || _module,
    request,
    page: "middleware"
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  return result.response;
}
var _module;
var init_nodeMiddlewareHandler = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/nodeMiddlewareHandler.js"() {
    globalThis.Buffer = Buffer4;
    globalThis.AsyncLocalStorage = AsyncLocalStorage2;
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/cacheHeaders.js
var CACHE_CONTROL_HEADER = "cache-control";
var OPEN_NEXT_CACHE_HEADER = "x-opennext-cache";
var CACHE_TAGS_HEADER = "x-next-cache-tags";
var ISR_HEADER = "x-isr";
var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
var NO_STORE_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";
function fixCacheControlForError(headers, statusCode) {
  if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
    return;
  }
  if (statusCode === 404 || statusCode === 500) {
    headers[CACHE_CONTROL_HEADER] = NO_STORE_CACHE_CONTROL;
  }
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  /**
   * Create a deferred promise tracked by this runner.
   *
   * @returns The tracked promise and its resolve/reject functions.
   */
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.add(detachedPromise.promise);
    return detachedPromise;
  }
  /**
   * Track background work and handle failures immediately.
   *
   * @param promise Work to await, including work registered during an active drain.
   * @returns Nothing; failures are logged rather than propagated.
   */
  add(promise) {
    this.promises.push(promise.then(() => {
    }, error));
  }
  /**
   * Drain tracked work, including additions made while earlier work is pending.
   *
   * Work started after the drain has settled still needs a new runtime waitUntil.
   * @returns Resolves when all work registered during this drain has settled.
   */
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    let awaited = 0;
    while (awaited < this.promises.length) {
      const batch = this.promises.slice(awaited);
      awaited = this.promises.length;
      await Promise.all(batch);
    }
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("@vercel/request-context");
  const nextAfterContext = {
    get: () => {
      const store = globalThis.__openNextAls.getStore();
      return {
        waitUntil: store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise))
      };
    }
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "instrumentationClientInject": [], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": true, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/jr/dev/oylab.uz", "enablePrerenderSourceMaps": true, "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "deprecated": {}, "experimental": { "agentUpgrade": "security", "agentFeedback": false, "coldCacheBadge": false, "collapseAdapterRoutes": true, "devValidationWorker": true, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "parallelRouteMetadata": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "dynamicOnHover": false, "reactBrowserBailout": true, "useOffline": false, "varyParams": true, "optimisticRouting": true, "concurrentRouterQueue": false, "instrumentationClientRouterTransitionEvents": false, "prefetchInlining": { "maxSize": 2048, "maxBundleSize": 10240 }, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 7, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptOperationCache": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptMozjpeg": true, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "devMemoryThresholdRestart": true, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "requestInsights": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "useTypeScriptCli": true, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": true, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "serverComponentsHmrCancellation": false, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "useCacheStaticRootParamTracking": false, "globalNotFound": false, "explicitParallelRouteChildren": true, "strictRouteMatching": true, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "disableResumeDataCacheCompression": false, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "exposeRuntimeErrorsToHMR": false, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": true, "turbopackStaleOutputMaxAge": 6048e5, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "turbopackSharedRuntime": true, "turbopackMemoryEvictionMode": "auto", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "useCacheTimeout": 54, "instantInsights": { "validationLevel": "warning" }, "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "rules": { "*.css": { "loaders": ["@tailwindcss/turbopack"], "as": "*.css" } }, "resolveAlias": { "next-intl/config": "./src/i18n/request.ts" }, "root": "/Users/jr/dev/oylab.uz" }, "repoRoot": "/Users/jr/dev/oylab.uz", "distDirRoot": ".next" };
var BuildId = "4fM-_3G7JBQkUz6SyIdOj";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/icon.svg", "regex": "^/icon\\.svg(?:/)?$", "routeKeys": {}, "namedRegex": "^/icon\\.svg(?:/)?$" }, { "page": "/robots.txt", "regex": "^/robots\\.txt(?:/)?$", "routeKeys": {}, "namedRegex": "^/robots\\.txt(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }], "dynamic": [{ "page": "/[locale]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)(?:/)?$" }, { "page": "/[locale]/[...rest]", "regex": "^/([^/]+?)/(.+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPrest": "nxtPrest" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/(?<nxtPrest>.+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 8999, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 7374, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/icon.svg": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/svg+xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/icon.svg/layout,_N_T_/icon.svg/route,_N_T_/icon.svg" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/icon.svg", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/robots.txt": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "text/plain", "x-next-cache-tags": "_N_T_/layout,_N_T_/robots.txt/layout,_N_T_/robots.txt/route,_N_T_/robots.txt" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/robots.txt", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "f844547623bece1e3d8e39a52f816592", "previewModeSigningKey": "9bb627b1b7846a68cffef3f6c4d633806c2d2b76744906efe9530b002f4a4a39", "previewModeEncryptionKey": "58283fc2949a32d9d3264c42d68bf0da750ab5e22fd163abc36ec2f321f61738" } };
var MiddlewareManifest = { "version": 3, "middleware": {}, "sortedMiddleware": [], "functions": {} };
var AppPathsManifest = { "/[locale]/[...rest]/page": "app/[locale]/[...rest]/page.js", "/[locale]/page": "app/[locale]/page.js", "/_global-error/page": "app/_global-error/page.js", "/_not-found/page": "app/_not-found/page.js", "/icon.svg/route": "app/icon.svg/route.js", "/robots.txt/route": "app/robots.txt/route.js", "/sitemap.xml/route": "app/sitemap.xml/route.js" };
var AppPathRoutesManifest = { "/[locale]/[...rest]/page": "/[locale]/[...rest]", "/[locale]/page": "/[locale]", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/icon.svg/route": "/icon.svg", "/robots.txt/route": "/robots.txt", "/sitemap.xml/route": "/sitemap.xml" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/_middleware": { "runtime": "nodejs", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|_vercel|.*\\..*).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/((?!api|_next|_vercel|.*\\..*).*)" }] } } };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = "4fM-_3G7JBQkUz6SyIdOj";
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
import { Transform } from "node:stream";
init_util();

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  return getQueryFromIterator(new URLSearchParams(query).entries());
}
function getUrlParts(url, isExternal2) {
  const hashIndex = url.indexOf("#");
  const hash = hashIndex === -1 ? "" : url.slice(hashIndex);
  const urlWithoutHash = hashIndex === -1 ? url : url.slice(0, hashIndex);
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = urlWithoutHash.match(regex2);
    return {
      hostname: "",
      pathname: urlWithoutHash.startsWith("/") ? `/${match3?.[1] ?? ""}` : "",
      protocol: "",
      queryString: match3?.[2] ?? "",
      hash
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s?]+)(\/[^?]*)?(\?.*)?/;
  const match2 = urlWithoutHash.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? "",
    hash
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => searchParams.append(key, entry));
    } else {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash as createHash3 } from "node:crypto";
init_stream();

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
import { Buffer as Buffer3 } from "node:buffer";
import { createHash } from "node:crypto";

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.[CACHE_TAGS_HEADER]?.split(",") ?? [];
    delete value.meta?.headers?.[CACHE_TAGS_HEADER];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/routeCacheKey.js
import { createHash as createHash2 } from "node:crypto";
var ROUTE_CACHE_DIRECTORY = "route-cache";
var DYNAMIC_ROUTE_REGEX = /\/\[[^/]+?\](?=\/|$)/;
function useRouteCacheKeys(nextVersion) {
  return compareSemver(nextVersion, ">=", "15.5.27") && compareSemver(nextVersion, "<", "16.0.0") || compareSemver(nextVersion, ">=", "16.3.8");
}
function normalizePagePath(page) {
  if (/^\/index(\/|$)/.test(page) && !DYNAMIC_ROUTE_REGEX.test(page)) {
    return `/index${page}`;
  }
  if (page === "/") {
    return "/index";
  }
  return page.startsWith("/") ? page : `/${page}`;
}
function normalizeAppPath(entry) {
  const pathname = entry.split("/").reduce((acc, segment, index, segments) => {
    if (!segment)
      return acc;
    if (segment.startsWith("(") && segment.endsWith(")"))
      return acc;
    if (segment.startsWith("@"))
      return acc;
    if ((segment === "page" || segment === "route") && index === segments.length - 1) {
      return acc;
    }
    return `${acc}/${segment}`;
  }, "");
  return pathname === "" ? "/" : pathname;
}
function compareAppPaths(a, b) {
  const aHasSlot = a.includes("/@");
  const bHasSlot = b.includes("/@");
  if (aHasSlot && !bHasSlot)
    return -1;
  if (!aHasSlot && bHasSlot)
    return 1;
  return a.localeCompare(b);
}
function selectAppPageEntry(route, appPaths) {
  let entry;
  for (const appPath of appPaths) {
    if (normalizeAppPath(appPath).replace(/%5F/g, "_") !== route)
      continue;
    if (entry === void 0 || compareAppPaths(entry, appPath) < 0) {
      entry = appPath;
    }
  }
  return entry;
}
function getRouteCacheOwner(sourceRoute, { appPaths, pagesManifest }) {
  const appEntry = selectAppPageEntry(sourceRoute, appPaths);
  if (appEntry) {
    return {
      kind: appEntry.endsWith("/route") ? "APP_ROUTE" : "APP_PAGE",
      sourceRoute: appEntry
    };
  }
  if (Object.hasOwn(pagesManifest, sourceRoute)) {
    return { kind: "PAGES", sourceRoute };
  }
  return void 0;
}
function normalizeLocalePath(pathname, locales) {
  const segment = pathname.split("/", 2)[1]?.toLowerCase();
  const locale = locales?.find((l) => l.toLowerCase() === segment);
  if (!locale) {
    return pathname;
  }
  return pathname.slice(locale.length + 1) || "/";
}
function getDynamicRouteCachePathname(pathname, locales) {
  if (normalizeLocalePath(pathname, locales) !== "/index") {
    return pathname;
  }
  return pathname.slice(0, -"/index".length) || "/";
}
function getPrerenderRouteCacheKey(pathname, manifests) {
  const { routes, dynamicRoutes } = manifests.prerenderManifest;
  const prerender = Object.hasOwn(routes, pathname) ? routes[pathname] : void 0;
  const fallback = !prerender && Object.hasOwn(dynamicRoutes, pathname) ? dynamicRoutes[pathname] : void 0;
  if (!prerender && !fallback) {
    return void 0;
  }
  const sourceRoute = prerender ? prerender.srcRoute : fallback?.fallbackSourceRoute ?? pathname;
  let owner;
  if (sourceRoute) {
    owner = getRouteCacheOwner(sourceRoute, manifests);
  } else {
    owner = getRouteCacheOwner(pathname, manifests);
    if (!owner && manifests.locales?.length) {
      const pagesOwner = getRouteCacheOwner(normalizeLocalePath(pathname, manifests.locales), manifests);
      owner = pagesOwner?.kind === "PAGES" ? pagesOwner : void 0;
    }
  }
  return owner ? getRouteCacheKey(pathname, owner) : void 0;
}
function getRouteCacheKey(pathname, owner) {
  const source = createHash2("sha256").update(owner.sourceRoute).digest("hex");
  return `/${ROUTE_CACHE_DIRECTORY}/${owner.kind}/${source}/$${normalizePagePath(pathname)}`;
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
var MIDDLEWARE_SET_COOKIE_HEADER = "x-middleware-set-cookie";
function getCachedResponseHeaders(headers) {
  const result = {};
  for (const [key, value] of Object.entries(headers ?? {})) {
    if (value === void 0 || key.toLowerCase() === MIDDLEWARE_SET_COOKIE_HEADER) {
      continue;
    }
    result[key] = value;
  }
  return result;
}
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false, revalidationPath = path3, revalidationKey = path3) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash3("md5").update(str).digest("hex");
  const etag = `"${hash(body)}"`;
  if (revalidate === 0) {
    return {
      [CACHE_CONTROL_HEADER]: NO_STORE_CACHE_CONTROL,
      [OPEN_NEXT_CACHE_HEADER]: "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash && revalidationPath !== "/" ? `${revalidationPath}/` : revalidationPath;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${revalidationKey}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(revalidationKey)
      });
    }
    return {
      [CACHE_CONTROL_HEADER]: `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      [OPEN_NEXT_CACHE_HEADER]: isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    [CACHE_CONTROL_HEADER]: `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    [OPEN_NEXT_CACHE_HEADER]: "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  const segmentHeader = event.headers[NEXT_SEGMENT_PREFETCH_HEADER];
  if (typeof segmentHeader === "string" && cachedValue.segmentData) {
    if (Object.hasOwn(cachedValue.segmentData, segmentHeader)) {
      return {
        body: cachedValue.segmentData[segmentHeader],
        additionalHeaders: {
          [NEXT_PRERENDER_HEADER]: "1",
          [NEXT_POSTPONED_HEADER]: "2"
        }
      };
    }
    return void 0;
  }
  if (cachedValue.rsc === void 0) {
    return void 0;
  }
  return { body: cachedValue.rsc, additionalHeaders: {} };
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false, cacheKey = localizedPath, revalidationPath = localizedPath) {
  debug("Returning result from experimental cache");
  let body;
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const appRouterResult = getBodyForAppRouter(event, cachedValue);
      body = appRouterResult?.body;
      additionalHeaders = appRouterResult?.additionalHeaders ?? {};
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  if (body === void 0) {
    debug("Missing body in the cache entry, falling back to the server");
    return void 0;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache, revalidationPath, cacheKey);
  const statusCode = computeStatusCode(event.rewriteStatusCode, cachedValue.meta?.status);
  const headers = {
    ...cacheControl,
    "content-type": type,
    ...getCachedResponseHeaders(cachedValue.meta?.headers),
    vary: VARY_HEADER,
    ...additionalHeaders
  };
  fixCacheControlForError(headers, statusCode);
  return {
    type: "core",
    statusCode,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers
  };
}
function computeStatusCode(rewriteStatusCode, cachedStatusCode) {
  if (cachedStatusCode !== void 0 && cachedStatusCode !== 200) {
    return cachedStatusCode;
  }
  return rewriteStatusCode ?? cachedStatusCode ?? 200;
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => escapePathDelimiters(decodeURIComponent(segment), true)).join("/");
}
var routeCacheManifests;
function getRouteCacheManifests() {
  routeCacheManifests ??= {
    prerenderManifest: {
      routes: PrerenderManifest?.routes ?? {},
      dynamicRoutes: PrerenderManifest?.dynamicRoutes ?? {}
    },
    appPaths: Object.keys(AppPathsManifest ?? {}),
    pagesManifest: PagesManifest ?? {},
    locales: NextConfig.i18n?.locales
  };
  return routeCacheManifests;
}
function getCacheKey(event, localizedPath, resolvedRoutes) {
  if (!useRouteCacheKeys(globalThis.nextVersion)) {
    const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath) || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
    if (!isISR)
      return void 0;
    return localizedPath === "/" ? "/index" : localizedPath;
  }
  const manifests = getRouteCacheManifests();
  if (Object.hasOwn(manifests.prerenderManifest.routes, localizedPath)) {
    const manifestKey = getPrerenderRouteCacheKey(localizedPath, manifests);
    const selectedRoute = resolvedRoutes?.[0];
    if (resolvedRoutes && !selectedRoute)
      return void 0;
    if (!selectedRoute)
      return manifestKey;
    const selectedOwner = getRouteCacheOwner(selectedRoute.route, manifests);
    if (!selectedOwner)
      return void 0;
    const selectedKey = getRouteCacheKey(localizedPath, selectedOwner);
    return selectedKey === manifestKey ? manifestKey : void 0;
  }
  const dynamicRoute = resolvedRoutes ? resolvedRoutes[0] : dynamicRouteMatcher(event.rawPath)[0];
  const dynamicPrerender = dynamicRoute ? manifests.prerenderManifest.dynamicRoutes[dynamicRoute.route] : void 0;
  if (!dynamicRoute || !dynamicPrerender || dynamicPrerender.fallback !== null) {
    return void 0;
  }
  const owner = getRouteCacheOwner(dynamicRoute.route, manifests);
  return owner ? getRouteCacheKey(getDynamicRouteCachePathname(localizedPath, manifests.locales), owner) : void 0;
}
async function cacheInterceptor(event, resolvedRoutes) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers[PRERENDER_REVALIDATE_HEADER]))
    return event;
  if (event.method !== "GET" && event.method !== "HEAD")
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  const basePath = NextConfig.basePath;
  const pathWithoutBasePath = !basePath ? event.rawPath : event.rawPath === basePath ? "/" : event.rawPath.startsWith(`${basePath}/`) ? event.rawPath.slice(basePath.length) : event.rawPath;
  let localizedPath = localizePath({ ...event, rawPath: pathWithoutBasePath });
  localizedPath = localizedPath.replace(/\/$/, "");
  const revalidationPath = localizedPath || "/";
  try {
    localizedPath = decodePathParams(localizedPath) || "/";
  } catch {
    return event;
  }
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const cacheKey = getCacheKey(event, localizedPath, resolvedRoutes);
  debug("cacheKey", cacheKey);
  if (cacheKey) {
    try {
      const cachedData = await globalThis.incrementalCache.get(cacheKey);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(cacheKey, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(cacheKey, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page": {
          const result = await generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale, cacheKey, revalidationPath);
          return result ?? event;
        }
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale, revalidationPath, cacheKey);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...getCachedResponseHeaders(cachedData.value.meta?.headers),
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale, revalidationPath, cacheKey);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          const statusCode = computeStatusCode(event.rewriteStatusCode, cachedData.value.meta?.status);
          const headers = {
            ...cacheControl,
            ...getCachedResponseHeaders(cachedData.value.meta?.headers),
            vary: VARY_HEADER
          };
          fixCacheControlForError(headers, statusCode);
          return {
            type: "core",
            statusCode,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers,
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod7 = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod7);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();
var compiledRegExps = /* @__PURE__ */ new Map();
function getCompiledRegExp(pattern, flags2 = "") {
  const key = `/${pattern}/${flags2}`;
  let regExp = compiledRegExps.get(key);
  if (!regExp) {
    regExp = new RegExp(pattern, flags2);
    compiledRegExps.set(key, regExp);
  }
  regExp.lastIndex = 0;
  return regExp;
}
function matchHasValue(value, pattern) {
  if (!value)
    return false;
  if (!pattern)
    return true;
  const candidate = Array.isArray(value) ? value.at(-1) : value;
  return candidate !== void 0 && getCompiledRegExp(`^${pattern}$`).test(candidate);
}
function getHostname(headers) {
  return headers.host?.split(":", 1)[0].toLowerCase();
}
function getSafeParamName(name) {
  return name.replaceAll(/[^a-zA-Z]/g, "");
}
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return matchHasValue(headers[redirect.key.toLowerCase()], redirect.value);
    case "cookie":
      return matchHasValue(cookies[redirect.key], redirect.value);
    case "query":
      return matchHasValue(query[redirect.key], redirect.value);
    case "host":
      return matchHasValue(getHostname(headers), redirect.value);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value) {
    let key;
    let value;
    switch (has.type) {
      case "header":
        key = has.key.toLowerCase();
        value = headers[key];
        break;
      case "cookie":
        key = has.key;
        value = cookies[key];
        break;
      case "query":
        key = has.key;
        value = query[key];
        break;
      case "host":
        return {};
    }
    return value ? { [getSafeParamName(key)]: value } : {};
  }
  const matcher = getCompiledRegExp(`^${has.value}$`);
  const fromSource = (value, implicitKey) => {
    const matches = value.match(matcher);
    if (matches?.groups)
      return matches.groups;
    return implicitKey && matches?.[0] ? { [implicitKey]: matches[0] } : {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return fromSource(Array.isArray(query[has.key]) ? query[has.key].at(-1) ?? "" : query[has.key] ?? "");
    case "host":
      return fromSource(getHostname(headers) ?? "", "host");
  }
};
function compileNonPath(value, params) {
  if (!value.includes(":"))
    return value;
  let compiledValue = value;
  for (const key of Object.keys(params)) {
    if (!compiledValue.includes(`:${key}`))
      continue;
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    compiledValue = compiledValue.replace(getCompiledRegExp(`:${escapedKey}\\*`, "g"), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(getCompiledRegExp(`:${escapedKey}\\?`, "g"), `:${key}--ESCAPED_PARAM_QUESTION`).replace(getCompiledRegExp(`:${escapedKey}\\+`, "g"), `:${key}--ESCAPED_PARAM_PLUS`).replace(getCompiledRegExp(`:${escapedKey}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${key}`);
  }
  compiledValue = compiledValue.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replaceAll("--ESCAPED_PARAM_PLUS", "+").replaceAll("--ESCAPED_PARAM_COLON", ":").replaceAll("--ESCAPED_PARAM_QUESTION", "?").replaceAll("--ESCAPED_PARAM_ASTERISKS", "*");
  return compile(`/${compiledValue}`, { validate: false })(params).slice(1);
}
function compileQueryString(queryString, params) {
  return queryString.split("&").map((part) => {
    const separator = part.indexOf("=");
    if (separator === -1)
      return part;
    const key = part.slice(0, separator + 1);
    return `${key}${compileNonPath(part.slice(separator + 1), params)}`;
  }).join("&");
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const computeHas = computeParamHas(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (getCompiledRegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      const params = {
        ..._match ? _match.params : {},
        ...has?.reduce((acc, cur) => {
          return Object.assign(acc, computeHas(cur));
        }, {})
      };
      const hasParams = Object.keys(params).length > 0;
      headers.forEach((h) => {
        try {
          const key = hasParams ? compileNonPath(h.key, params) : h.key;
          const value = hasParams ? compileNonPath(h.value, params) : h.value;
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites, appendParamsToQuery = true) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return getCompiledRegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString, hash } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString, hash });
    const compileOptions = { validate: false };
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }), compileOptions);
    const toDestinationHost = compile(escapeRegex(hostname).replace(/:(\d+)$/, "\\:$1"), { ...compileOptions, encode: encodeURIComponent });
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    const queryParams = Object.fromEntries(Object.entries(params).filter(([key]) => key !== "nextInternalLocale"));
    const destinationParams = [
      ...parse2(escapeRegex(`${pathname}${hash}`, { isPath: true })),
      ...hostname ? parse2(escapeRegex(hostname).replace(/:(\d+)$/, "\\:$1")) : []
    ].flatMap((token) => typeof token === "string" ? [] : [String(token.name)]);
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenHash = hash;
    let rewrittenPath = unescapeRegex(toDestinationPath(params));
    if (pathname.startsWith("/") && !rewrittenPath.startsWith("/")) {
      rewrittenPath = `/${rewrittenPath}`;
    }
    if (isUsingParams) {
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = compileQueryString(queryString, params);
      rewrittenHash = compileNonPath(hash, params);
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(getCompiledRegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    const destinationQuery = convertFromQueryString(rewrittenQuery);
    finalQuery = {
      ...query,
      ...!appendParamsToQuery || Object.keys(queryParams).some((key) => destinationParams.includes(key)) ? {} : queryParams,
      ...destinationQuery
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    rewrittenUrl += rewrittenHash;
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleBeforeFilesRewrites(event, rewrites) {
  let result = {
    internalEvent: event,
    __rewrite: void 0,
    isExternalRewrite: false
  };
  for (const rewrite of rewrites) {
    const rewriteResult = handleRewrites(result.internalEvent, [rewrite]);
    if (!rewriteResult.__rewrite)
      continue;
    result = rewriteResult;
    if (result.isExternalRewrite)
      break;
  }
  return result;
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && // Data requests (`/_next/data/<buildId>/*.json`) are never redirected, as with Next.js.
  // The header is set by `fixDataPage`, a client supplied value is removed by the routing handler.
  // The `__nextDataReq` query parameter can not be used as it is set by the client.
  event.headers["x-nextjs-data"] !== "1" && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal), false);
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      headers: {
        ...internalEvent.headers,
        "x-nextjs-data": "1"
      },
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => getCompiledRegExp(routeRegex).test(rawPath));
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_util();
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var MIDDLEWARE_SET_COOKIE_HEADER2 = "x-middleware-set-cookie";
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_nodeMiddlewareHandler(), nodeMiddlewareHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers[ISR_HEADER] && headers[PRERENDER_REVALIDATE_HEADER] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch {
  }
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath) || decodedPath !== void 0 && r.test(decodedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  let middlewareSetCookie;
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();
    if (normalizedKey.startsWith(xMiddlewareKey)) {
      const k = normalizedKey.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(normalizedKey))
        return;
      if (normalizedKey === MIDDLEWARE_SET_COOKIE_HEADER2) {
        middlewareSetCookie = value;
        return;
      }
      if (normalizedKey === "set-cookie")
        return;
      if (REDIRECTS.has(statusCode) && normalizedKey === "location") {
        resHeaders[normalizedKey] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[normalizedKey] = value;
      }
    }
  });
  const setCookies = responseHeaders.getSetCookie().flatMap((maybeCompoundCookie) => parseSetCookieHeader(maybeCompoundCookie));
  if (setCookies.length > 0) {
    resHeaders["set-cookie"] = setCookies;
  }
  const overrideHeaders = responseHeaders.get("x-middleware-override-headers");
  const overriddenHeaders = overrideHeaders === null ? void 0 : new Set(overrideHeaders.split(",").map((key) => key.trim().toLowerCase()));
  const newHeaders = Object.fromEntries([...Object.entries(internalEvent.headers), ...Object.entries(reqHeaders)].map(([key, value]) => [key.toLowerCase(), value]).filter(([key]) => !overriddenHeaders || overriddenHeaders.has(key)));
  if (middlewareSetCookie !== void 0) {
    newHeaders[MIDDLEWARE_SET_COOKIE_HEADER2] = middlewareSetCookie;
  }
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: newHeaders,
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routing/routeParamPlaceholder.js
var PLACEHOLDER_REGEX = /\[\[\.\.\.[^\]]+\]\]|\[(?:\.\.\.)?[^\]]+\]/g;
var OPENING_BRACKET_REGEX = /\[|%5b/i;
function hasRouteParamPlaceholder(pathname) {
  if (!OPENING_BRACKET_REGEX.test(pathname)) {
    return false;
  }
  const placeholders = new Set(dynamicRouteMatcher(pathname).filter(({ type }) => type === "app").flatMap(({ route }) => route.match(PLACEHOLDER_REGEX) ?? []));
  return placeholders.size > 0 && pathname.split("/").some((segment) => placeholders.has(safeDecode(segment)));
}
function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return "";
  }
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleBeforeFilesRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    let resolvedRoutes = [
      ...staticRouteMatcher(eventOrResult.rawPath),
      ...dynamicRouteMatcher(eventOrResult.rawPath)
    ];
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0) || // Next.js versions before 16.4.5 treat a param whose value is its placeholder (e.g. `[slug]`) as unresolved.
    // Next.js receives both the rawPath and the URL pathname, which is normalized (e.g. dot segments).
    !isExternalRewrite && [eventOrResult.rawPath, new URL(eventOrResult.url).pathname].some(hasRouteParamPlaceholder)) {
      resolvedRoutes = [];
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": NO_STORE_CACHE_CONTROL
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isExternalRewrite && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult, resolvedRoutes);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/.pnpm/@opennextjs+aws@4.1.15_next@16.4.5_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0_/node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers[ISR_HEADER] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
