// Shared "ask my resume" tool layer. Consumed by the MCP server (HTTP + stdio) and the on-site chat,
// so the site, the assistant and any visitor's MCP client all answer from portfolio-v4/content/profile.json.
const { z } = require('zod');
const profile = require('../../portfolio-v4/content/profile.json');

const SITE_URL = (process.env.SITE_URL || 'https://smithdavedesign.herokuapp.com').replace(/\/$/, '');
const slugs = profile.caseStudies.map((c) => c.slug);

const caseSummary = (c) => ({
    slug: c.slug,
    title: c.title,
    headline: c.headline,
    metric: c.metric,
    url: `${SITE_URL}/v4/work/${c.slug}/`,
});

const tools = [
    {
        name: 'get_experience_summary',
        description: "Dave Smith's current title, roles, positioning thesis, career history, education and leadership approach. Start here for general questions about who he is.",
        input: z.object({}),
        run: () => ({
            name: profile.person.name,
            title: profile.person.title,
            roles: profile.person.roles,
            employer: profile.person.employer,
            thesis: profile.person.thesis,
            origin: profile.person.origin,
            education: profile.person.education,
            history: profile.person.history,
            pillars: profile.pillars,
            ktSeries: profile.ktSeries,
            governance: profile.governance,
        }),
    },
    {
        name: 'retrieve_roi_metrics',
        description: "Quantified business impact of Dave's AI work (license optimization, operational cost reduction, agent tools shipped, rote work reduced), with context for each number and the ROI formula he uses.",
        input: z.object({}),
        run: () => ({
            metrics: profile.metrics.map(({ value, label, context }) => ({ value, label, context })),
            roiFormula: 'ROI = (Total Value Generated − Total Investment) / Total Investment × 100, where value includes labor cost reduction (hours saved × hourly cost) and productivity lift.',
        }),
    },
    {
        name: 'list_case_studies',
        description: "List Dave's case studies with slug, headline and headline metric. Use get_case_study for detail.",
        input: z.object({}),
        run: () => ({ caseStudies: profile.caseStudies.map(caseSummary) }),
    },
    {
        name: 'get_case_study',
        description: 'Full detail for one case study: problem, approach, tooling, metric, and governance / human-in-the-loop design.',
        input: z.object({ slug: z.enum(slugs).describe('Case study slug from list_case_studies') }),
        run: ({ slug }) => {
            const c = profile.caseStudies.find((x) => x.slug === slug);
            const { image, imageAlt, pipeline, code, ...rest } = c;
            return { ...rest, pipeline, url: `${SITE_URL}/v4/work/${c.slug}/` };
        },
    },
    {
        name: 'get_stack',
        description: "Technologies Dave works with, grouped, with the reason each is in his stack.",
        input: z.object({}),
        run: () => ({ stack: profile.stack }),
    },
    {
        name: 'get_contact',
        description: 'How to contact Dave or view his resume.',
        input: z.object({}),
        run: () => ({ ...profile.contact, resume: `${SITE_URL}/v4/resume`, available: profile.person.available }),
    },
];

const byName = new Map(tools.map((t) => [t.name, t]));

/** Validate input against the tool's schema and run it. Throws on unknown tool or invalid input. */
function runTool(name, input) {
    const tool = byName.get(name);
    if (!tool) throw new Error(`Unknown tool: ${name}`);
    return tool.run(tool.input.parse(input ?? {}));
}

module.exports = { tools, runTool, profile, SITE_URL };
