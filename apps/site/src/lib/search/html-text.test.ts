import { describe, expect, it } from "vitest";
import { htmlToText } from "./html-text";

describe("htmlToText", () => {
  it("separates blocks and joins inline runs", () => {
    expect(htmlToText("<h2>Title</h2><p>One <em>abr</em>band and <strong>two</strong>.</p><ul><li>a</li><li>b</li></ul>")).toBe(
      "Title One abrband and two. a b",
    );
  });

  it("decodes entities", () => {
    expect(htmlToText("<p>Tom &amp; Jerry &lt;3 &quot;x&quot; &#39;y&#39; &#x41;&#66;&nbsp;c</p>")).toBe(
      "Tom & Jerry <3 \"x\" 'y' AB c",
    );
  });

  it("drops the MathML twin KaTeX renders next to the visible glyphs", () => {
    const html =
      '<p>Energy <span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>E</mi></mrow>' +
      '<annotation encoding="application/x-tex">E=mc^2</annotation></semantics></math></span>' +
      '<span class="katex-html" aria-hidden="true"><span class="mord">E</span><span>=</span></span></span> holds.</p>';
    expect(htmlToText(html)).toBe("Energy E= holds.");
  });

  it("drops footnote markers", () => {
    expect(htmlToText('<p>A claim<sup><a href="#fn-1">1</a></sup> stands.</p>')).toBe("A claim stands.");
  });

  it("is not fooled by > inside an attribute", () => {
    expect(htmlToText('<p>Pipeline <img src="x.png" alt="data -> model" title="a > b"> and <a href="/" title="p > q">link</a> ok.</p>')).toBe(
      "Pipeline and link ok.",
    );
  });

  it("keeps code", () => {
    expect(htmlToText("<pre><code>bun run build\n</code></pre>")).toBe("bun run build");
  });
});
