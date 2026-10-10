import { profile, SITE_URL } from "@/lib/profile";

export const dynamic = "force-static";

/** Plain-text profile for LLM crawlers (llmstxt.org convention). */
export function GET() {
  const { person, contact, metrics, caseStudies, governance, stack, builds } = profile;
  const body = [
    `# ${person.name}`,
    "",
    `> ${person.title}. ${person.thesis}`,
    "",
    `Roles: ${person.roles.join(", ")}. Current employer: ${person.employer}. Education: ${person.education}.`,
    `Contact: ${contact.email} · ${contact.linkedin} · ${contact.github}`,
    `MCP server (ask about this person from any MCP client): ${SITE_URL}/v4/mcp`,
    "",
    "## Measured impact",
    ...metrics.map((m) => `- ${m.value} — ${m.label}. ${m.context}`),
    "",
    "## Case studies",
    ...caseStudies.map((c) => `- [${c.title}](${SITE_URL}/v4/work/${c.slug}/): ${c.action} Tooling: ${c.tooling.join(", ")}. Result: ${c.metric}`),
    "",
    "## Products built",
    ...builds.map((b) => `- [${b.name}](${SITE_URL}/v4/builds/${b.slug}/): ${b.summary} Stack: ${b.stack.join(", ")}. Source: ${b.github}${b.live ? ` · Live: ${b.live}` : ""}`),
    "",
    "## Governance approach",
    governance.intro,
    ...governance.levels.map((l) => `- ${l.level} ${l.name}: ${l.body} (human checkpoint: ${l.hitl})`),
    "",
    "## Stack",
    stack.map((s) => s.name).join(", "),
    "",
    "## History",
    ...person.history.map((h) => `- ${h.org}: ${h.summary}`),
    "",
    `Resume: ${SITE_URL}/v4/resume`,
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
