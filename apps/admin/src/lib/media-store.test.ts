import { afterEach, describe, expect, it, vi } from "vitest";
import { r2Store } from "./media-store";

const config = { accountId: "acct", accessKeyId: "AKIA", secretAccessKey: "secret", bucket: "b" };

afterEach(() => vi.unstubAllGlobals());

describe("r2Store.put", () => {
  it("sends the raw bytes as the body so Node's fetch adds Content-Length (R2 answers 411 to chunked uploads)", async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const bytes = new Uint8Array([1, 2, 3]).buffer;

    await r2Store(config).put("2026/11/x.png", bytes, "image/png", "public, max-age=1");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(String(url)).toBe("https://acct.r2.cloudflarestorage.com/b/2026/11/x.png");
    expect(init.method).toBe("PUT");
    expect(init.body).toBe(bytes);
    const headers = new Headers(init.headers);
    expect(headers.get("authorization")).toMatch(/^AWS4-HMAC-SHA256 /);
    expect(headers.get("x-amz-content-sha256")).toBe("UNSIGNED-PAYLOAD");
    expect(headers.get("content-type")).toBe("image/png");
    expect(headers.get("cache-control")).toBe("public, max-age=1");
  });

  it("throws with the status and body when R2 rejects the object", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("<Error>nope</Error>", { status: 403 })));
    await expect(r2Store(config).put("k", "snapshot", "application/json", "no-cache")).rejects.toThrow("R2 put k: 403 <Error>nope</Error>");
  });
});
