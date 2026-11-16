#!/usr/bin/env bun
/**
 * The DPI-H policy-maker track's glossary, on the IG and in the journeys.
 *
 * | input | what it gives |
 * |---|---|
 * | `glossary/dpi-h-policy-track.glossary.json` | the terms (folio-glossary/v1, SKOS), with their matches in smart-ra and dth-phc |
 * | `workshops/glossary-use.json` | each term's glossary section and canvas sheets, and the terms met at each journey step |
 * | `workshops/dpi-h-policy-track.workshop.json` | the journey steps, and where the per-step resources are written |
 *
 * Writes `input/pagecontent/glossary.md`, and one `glossary-<step>` resource
 * per journey step into the workshop. The journeys viewer shows that resource
 * on the step under "Job aids and resources", and the workshop page prints its
 * term list. `--check` fails if either is stale.
 */
import { readFileSync, writeFileSync } from "node:fs";

type Term = {
  id: string;
  prefLabel: string;
  notation?: string;
  altLabel?: string[];
  definition?: string;
  exactMatch?: string[];
  closeMatch?: string[];
  narrowMatch?: string[];
  broadMatch?: string[];
  related?: string[];
  iri?: string;
};
const G = "glossary/dpi-h-policy-track.glossary.json";
const USE = "workshops/glossary-use.json";
const WS = "workshops/dpi-h-policy-track.workshop.json";
const PAGE = "input/pagecontent/glossary.md";
const IG = "https://worldhealthorganization.github.io/smart-trust-demo/";
const PDF = "dpi-h-glossary-policy-maker-track.pdf";

const g = JSON.parse(readFileSync(G, "utf8"));
const use = JSON.parse(readFileSync(USE, "utf8"));
const wsText = readFileSync(WS, "utf8");
const ws = JSON.parse(wsText);
const terms: Term[] = g.terms;
const byId = new Map(terms.map((t) => [t.id, t]));
const stepScenario = new Map<string, string>((ws.steps as { scenario: string; step: string }[]).map((s) => [s.step, s.scenario]));

const errors: string[] = [];
for (const t of terms) if (!use.terms[t.id]) errors.push(`${USE}: no section for ${t.id}`);
for (const [step, ids] of Object.entries(use.steps as Record<string, string[]>)) {
  if (!stepScenario.has(step)) errors.push(`${USE}: ${step} is not a workshop step`);
  for (const id of ids) if (!byId.has(id)) errors.push(`${USE}: step ${step} names no term ${id}`);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

/** Where a matched concept's page is published, and which glossary it is. */
const SOURCES: { ns: string; name: string; page: (rest: string) => string | undefined }[] = [
  {
    ns: "https://litlfred.github.io/smart-ra/v0/ns/glossary/",
    name: "DPI-H RA",
    page: (rest) => `https://worldhealthorganization.github.io/smart-ra/en/folio-assistant-core/glossary/instance/dpi-h-ra/${rest}/`,
  },
  {
    ns: "https://litlfred.github.io/dth-phc/v0/ns/glossary/dth-phc/",
    name: "DTH-PHC",
    page: (rest) => `https://litlfred.github.io/dth-phc/en/folio-assistant-core/glossary/instance/dth-phc/dth-phc/${rest}/`,
  },
  {
    // The SMART Trust guide's own glossary (Concepts), one heading per term; the IRI is the heading's anchor.
    ns: "https://smart.who.int/trust/concepts.html#",
    name: "SMART Trust",
    page: (rest) => `https://smart.who.int/trust/concepts.html#${rest}`,
  },
];
/** How a matched concept is named on the page: SMART Trust's headings as the guide prints them, else the concept id in words. */
const SMART_TRUST_LABELS: Record<string, string> = {
  "trust-lists": "Trust Lists",
  "gdhcn-trust-network": "GDHCN Trust Network",
  "public-key-infrastructure-pki": "Public Key Infrastructure (PKI)",
  holder: "Holder",
  issuer: "Issuer",
  receiver: "Receiver",
  "document-signer": "Document Signer",
  "trust-network-gateway---trust-anchor--tngta": "Trust Network Gateway – Trust Anchor",
  "verifiable-digital-health-certificate": "Verifiable Digital Health Certificate",
  "trust-network-participant-tnp": "Trust Network Participant",
};
const conceptLabel = (rest: string): string => {
  const id = rest.split("/").pop()!;
  if (SMART_TRUST_LABELS[id]) return SMART_TRUST_LABELS[id];
  const words = id.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
};
const KIND: Record<string, string> = { exactMatch: "same as", closeMatch: "close to", narrowMatch: "covers", broadMatch: "within", related: "related" };
/** Where the definition shown comes from: smart-ra's concept (the term's `iri`), or the handout. */
const definedBy = (t: Term): string => {
  const s = t.iri ? SOURCES.find((x) => t.iri!.startsWith(x.ns)) : undefined;
  if (!s) return `[Handout](${PDF})`;
  const rest = t.iri!.slice(s.ns.length);
  return `[${s.name}](${s.page(rest)})`;
};
const links = (t: Term): string =>
  (["exactMatch", "closeMatch", "narrowMatch", "broadMatch", "related"] as const)
    .flatMap((k) =>
      (t[k] ?? []).map((iri) => {
        const s = SOURCES.find((x) => iri.startsWith(x.ns));
        if (!s) return `${KIND[k]} <${iri}>`;
        const rest = iri.slice(s.ns.length);
        return `${KIND[k]} [${s.name}: ${conceptLabel(rest)}](${s.page(rest)})`;
      }),
    )
    .join("<br/>");
const label = (t: Term) => (t.notation && t.notation !== t.prefLabel ? `${t.prefLabel} (${t.notation})` : t.prefLabel);
const anchor = (id: string) => `term-${id}`;
const stepAnchor = (step: string) => `step-${step.replace(/\./g, "-").toLowerCase()}`;
const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

// ── the IG page ──────────────────────────────────────────────────────────
const L: string[] = [];
L.push(
  "<!-- Generated by tools/workshop/glossary.ts from glossary/dpi-h-policy-track.glossary.json and workshops/glossary-use.json. Do not edit by hand. -->",
  "",
  `The terms the DPI-H for Health workshop's policy-maker track hands every table, in plain language. Where the [DPI-H Reference Architecture](https://worldhealthorganization.github.io/smart-ra/en/dpi-h-ra/index.html) glossary (smart-ra) defines the same or a close concept, the term is smart-ra's and so is the definition, word for word; elsewhere the definition is the handout's ([the handout, PDF](${PDF})). Each term also links to the Digital Transformation Handbook for Primary Health Care glossary (dth-phc) where it has one.`,
  "",
  "*Definition from* says whose words the definition is, and links to them: the handout (PDF) or the DPI-H RA glossary. *Also defined in* links the same concept in the DPI-H RA, DTH-PHC and SMART Trust glossaries. *same as*: both glossaries mean the same thing. *close to*: nearly the same. *covers*: this term covers several of theirs. *related*: it only touches theirs. Every term is a candidate until a person adopts it.",
  "",
  "### Terms at each journey step",
  "",
  "The journeys viewer shows these on each step, under *Job aids and resources*.",
  "",
  "| Step | Terms |",
  "|---|---|",
);
for (const [step, ids] of Object.entries(use.steps as Record<string, string[]>)) {
  L.push(`| <a id="${stepAnchor(step)}"></a>**${step}** | ${ids.map((id) => `[${byId.get(id)!.notation ?? byId.get(id)!.prefLabel}](#${anchor(id)})`).join(", ")} |`);
}
L.push("{: .grid }", "");

const sections: string[] = [];
for (const t of terms) {
  const s = use.terms[t.id].section;
  if (!sections.includes(s)) sections.push(s);
}
for (const sec of sections) {
  L.push(`### ${sec}`, "", "| Term | Definition | Definition from | Sheet | Also defined in |", "|---|---|---|---|---|");
  for (const t of terms.filter((x) => use.terms[x.id].section === sec)) {
    const sh: number[] = use.terms[t.id].sheets;
    L.push(`| <a id="${anchor(t.id)}"></a>**${cell(label(t))}** | ${cell(t.definition ?? "")} | ${definedBy(t)} | ${sh.join(", ")} | ${links(t)} |`);
  }
  L.push("{: .grid }", "");
}
L.push(
  "### Sources",
  "",
  `The handout: *DPI-H for Health Workshop, Policy-maker track, Glossary: Terms You Will Hear* (2 sides), which cites the WHO/ITU Reference Architecture for DPI-H (Draft v1.0), WHO SMART Guidelines, the digital ICVP specification and the WHO DIIG. The SKOS scheme is \`${G}\`. The dth-phc glossary is linked where litlfred/dth-phc publishes it, until it moves to WorldHealthOrganization/dth-phc.`,
  "",
);
const page = L.join("\n");

// ── the per-step resources in the workshop ───────────────────────────────
const resources: any[] = (ws.resources ?? []).filter((r: { id: string }) => !r.id.startsWith("glossary"));
const glossaryResources = [
  {
    id: "glossary",
    title: "Glossary: terms you will hear",
    kind: "reading",
    href: `${IG}glossary.html`,
    modules: ws.modules.map((m: { id: string }) => m.id),
    description: "The policy-maker track's glossary, each term linked to the DPI-H RA and DTH-PHC glossaries.",
  },
  ...Object.entries(use.steps as Record<string, string[]>).map(([step, ids]) => ({
    id: `glossary-${step.replace(/\./g, "-").toLowerCase()}`,
    title: `Terms at ${step}`,
    kind: "reading",
    href: `${IG}glossary.html#${stepAnchor(step)}`,
    steps: [`${stepScenario.get(step)}#${step}`],
    body: ids
      .map((id) => {
        const t = byId.get(id)!;
        return `- **${label(t)}**${t.definition ? `: ${t.definition}` : ""}`;
      })
      .join("\n"),
  })),
];
ws.resources = [...resources, ...glossaryResources];
const wsOut = JSON.stringify(ws, null, 2) + "\n";

if (process.argv.includes("--check")) {
  let bad = 0;
  const cur = (() => {
    try {
      return readFileSync(PAGE, "utf8");
    } catch {
      return "";
    }
  })();
  if (cur !== page) (console.error(`${PAGE} is stale`), bad++);
  if (wsText !== wsOut) (console.error(`${WS}: the glossary resources are stale`), bad++);
  if (bad) {
    console.error("run bun tools/workshop/glossary.ts");
    process.exit(1);
  }
  console.log("glossary page and step resources are current");
} else {
  writeFileSync(PAGE, page);
  writeFileSync(WS, wsOut);
  console.log(`wrote ${PAGE} and ${glossaryResources.length} resources in ${WS}`);
}
