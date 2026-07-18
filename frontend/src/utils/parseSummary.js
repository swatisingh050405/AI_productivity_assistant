// Lightweight parser for the AI summary's markdown-ish output.
// Turns "## Heading" + "- item" lines into structured sections
// instead of rendering raw "##" / "-" characters as plain text.

export function parseSummarySections(text) {
  if (!text) return [];

  const lines = text.split("\n").map((l) => l.trim());
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (!line) continue;

    if (line.startsWith("##")) {
      current = { heading: line.replace(/^#+\s*/, ""), items: [] };
      sections.push(current);
    } else if (/^[-*]\s+/.test(line)) {
      if (!current) {
        current = { heading: "", items: [] };
        sections.push(current);
      }
      current.items.push(line.replace(/^[-*]\s+/, ""));
    } else {
      if (!current) {
        current = { heading: "", items: [] };
        sections.push(current);
      }
      current.items.push(line);
    }
  }

  return sections;
}

// Splits an item like "Jordan : Upload design specs by 2:00 PM today."
// into { who: "Jordan", text: "Upload design specs by 2:00 PM today." }
// Falls back gracefully if there's no "Name :" prefix.
export function splitAssignee(item) {
  const match = item.match(/^([A-Za-z][A-Za-z\s]{0,24}?)\s*:\s*(.+)$/);
  if (match) {
    return { who: match[1].trim(), text: match[2].trim() };
  }
  return { who: null, text: item };
}