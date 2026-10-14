import data from "../../content/profile.json";

export type Profile = typeof data;
export type CaseStudy = Profile["caseStudies"][number];
export type Metric = Profile["metrics"][number];
export type Build = Profile["builds"][number];

export const profile: Profile = data;

export const SITE_URL = (process.env.SITE_URL ?? "https://smithdavedesign.herokuapp.com").replace(/\/$/, "");
export const BASE = "/v4";
export const MCP_URL = `${SITE_URL}${BASE}/mcp`;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return profile.caseStudies.find((c) => c.slug === slug);
}

export function getBuild(slug: string): Build | undefined {
  return profile.builds.find((b) => b.slug === slug);
}
