import { describe, expect, it } from "vitest";
import { readingMinutes, renderMarkdown } from "./markdown";

const render = (md: string) => renderMarkdown(md, { mediaOrigin: "https://media.oylab.uz" });

describe("renderMarkdown", () => {
  it("renders a GFM table", async () => {
    expect((await render("| a | b |\n|---|---|\n| 1 | 2 |")).html).toContain("<table>");
  });
  it("renders a footnote whose anchors resolve", async () => {
    const { html } = await render("x[^1]\n\n[^1]: note");
    expect(html).toContain('class="footnotes"');
    const hrefs = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
    const ids = [...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(ids).toContain(href);
  });
  it("drops images whose source the sanitizer removed", async () => {
    const { html } = await render("![a](javascript:alert(1))");
    expect(html).not.toContain("<img");
  });
  it("renders inline and block math with KaTeX", async () => {
    // Display math needs the $$ fences on their own lines; a one-line $$x$$ is inline.
    const { html } = await render("$e^{i\\pi}$\n\n$$\n\\int_0^1 x\\,dx\n$$");
    expect(html).toContain('class="katex"');
    expect(html).toContain('class="katex-display"');
  });
  it("strips script and event handlers", async () => {
    const { html } = await render(
      '<script>alert(1)</script>\n\n<img src="https://media.oylab.uz/a.png" onerror="x()">',
    );
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
  });
  it("keeps media-host images with lazy loading, drops others", async () => {
    const { html } = await render(
      "![a](https://media.oylab.uz/2026/11/x.png)\n\n![b](https://evil.example/x.png)",
    );
    expect(html).toContain('loading="lazy"');
    expect(html).toContain("media.oylab.uz/2026/11/x.png");
    expect(html).not.toContain("evil.example");
  });
  it("gives headings ids", async () => {
    expect((await render("## Hello World")).html).toContain('id="hello-world"');
  });
  it("keeps language class on code blocks", async () => {
    expect((await render("```python\nprint(1)\n```")).html).toContain('class="language-python"');
  });
  it("returns reading minutes with the html", async () => {
    expect((await render("w ".repeat(401))).readingMinutes).toBe(3);
  });
});

describe("readingMinutes", () => {
  it("is at least one minute", () => {
    expect(readingMinutes("")).toBe(1);
  });
  it("rounds up at 200 words a minute", () => {
    expect(readingMinutes("w ".repeat(401))).toBe(3);
  });
});
