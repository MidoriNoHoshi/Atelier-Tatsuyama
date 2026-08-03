// Converts Obsidian-style callouts, e.g.
//
//   > [!note] Optional title
//   > body text
//
// into a `<div class="callout callout-note">` block so they render nicely
// on the website instead of as a plain blockquote. Supports the common
// Obsidian callout types (note, tip, info, warning, danger, quote, etc.)
// and the collapsible `+`/`-` suffix (rendered as a static open/closed state).
import { visit } from "unist-util-visit";

const TYPE_ALIASES = {
  note: "note",
  info: "info",
  tip: "tip",
  hint: "tip",
  important: "important",
  warning: "warning",
  caution: "warning",
  danger: "danger",
  error: "danger",
  bug: "danger",
  success: "success",
  check: "success",
  done: "success",
  question: "question",
  faq: "question",
  quote: "quote",
  cite: "quote",
  example: "example",
  abstract: "abstract",
  summary: "abstract",
  tldr: "abstract",
  todo: "todo",
};

const CALLOUT_RE = /^\[!([a-zA-Z]+)\]([+-]?)\s*(.*)$/;

export default function remarkObsidianCallouts() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const firstChild = node.children?.[0];
      if (!firstChild || firstChild.type !== "paragraph") return;

      const firstText = firstChild.children?.[0];
      if (!firstText || firstText.type !== "text") return;

      // The first paragraph's first text node may contain the rest of the
      // callout body too (remark merges same-paragraph lines into one text
      // node, joined by literal "\n"), so only test/strip the first line.
      const newlineIndex = firstText.value.indexOf("\n");
      const firstLine =
        newlineIndex === -1 ? firstText.value : firstText.value.slice(0, newlineIndex);
      const rest = newlineIndex === -1 ? "" : firstText.value.slice(newlineIndex + 1);

      const match = firstLine.match(CALLOUT_RE);
      if (!match) return;

      const [, rawType, , inlineTitle] = match;
      const type = TYPE_ALIASES[rawType.toLowerCase()] || "note";
      const title =
        inlineTitle?.trim() || rawType.charAt(0).toUpperCase() + rawType.slice(1);

      // Strip the "[!type] Title" marker line. If nothing is left in the
      // first paragraph, drop it entirely (title becomes the header).
      const remainder = firstChild.children.slice(1);
      if (rest.trim()) {
        firstChild.children = [{ type: "text", value: rest }, ...remainder];
      } else if (remainder.length) {
        firstChild.children = remainder;
      } else {
        node.children = node.children.slice(1);
      }

      node.data = node.data || {};
      node.data.hName = "div";
      node.data.hProperties = {
        className: ["callout", `callout-${type}`],
        "data-callout": type,
      };

      // Inject a title node as the first child using raw HTML-ish structure
      // via hChildren so we don't fight remark's AST too much.
      node.children.unshift({
        type: "paragraph",
        data: {
          hName: "div",
          hProperties: { className: ["callout-title"] },
        },
        children: [{ type: "text", value: title }],
      });
    });
  };
}
