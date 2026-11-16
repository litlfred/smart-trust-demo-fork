This page lists every place where the site's journeys differ from the policy-maker track's shared story deck, *The Immunization Journey: End-to-End Use Case Narrative* (M1, 30 November and 1 December 2026, 30 slides). The deck is the reference for names, countries and story.

### Decisions (owner, 16 November 2026)

Every row below was decided on the review cards:

- **Accepted as proposed:** all of A1–A16, B1–B14, D1–D10 and E1–E9.
- **A17:** follows the site.
- **C1:** noted.
- **C2:** to discuss.

What was done:

- **The deck:** B1–B14, A2, A4, A5, A12, A13, A15 and A17 are applied in the updated deck *The Immunization Journey*, with a slide-by-slide changelog. Slide 26 (Journey 4, "If you don't have it yet") was also rewritten for the IPS story.
- **The site** (this change):
  - A1 and D1, the journey titles: *Vaccinated and recorded*, *Found and registered*, *A foreign record used for the next vaccine*, *Continuity across a border*.
  - A2: Khamla works in Taifafeki and brings Somsak home.
  - A6 and A7: Journey 2 at 7 weeks, Journey 3 at 10 weeks. The 6-week doses are overdue and given at the Journey 3 visit (catch-up), in the FHIR examples, scenarios and device screens.
  - A8: Village 04 is Khamla's village.
  - A16: Journey 4 is at a paediatric clinic.
- **Still to do:** the site changes that need new process steps (A4 hospital identifier, A9 national-ID search, A10 late birth registration, A11 reminder, B11 coverage denominator), the canvas file (D2–D10), the glossary additions (E3, E6–E8) and C2. They are listed with the demo-application changes they need in *Technical track and demo applications: what changed, what is needed*.

The names and countries already match. Both tell the story of Khamla, Somsak and Bounmy, Vilay, Nurse Chanthason and Dr Anan, in Onesa and Taifafeki, with Hep B and BCG birth doses, a GDHCN trust list and a 12-month return to Taifafeki. Somsak's birth date on the site, 2025-10-28, is a Tuesday, as the deck says.

The editable [Country Canvas](country-canvas.html) (A3) and the policy-maker track's [glossary](glossary.html) are reviewed in sections D and E.

### A. The site differs from the deck

| # | Topic | Deck (reference) | Site today | Proposed resolution |
|---|---|---|---|---|
| A1 | Journey titles | J1 *Recorded and vaccinated*, J2 *Found and registered at home*, J3 *A foreign record used for the next vaccine*, J4 *Continuity across border* | J1 *Born abroad*, J2 *Found at home*, J3 *Made official*, J4 *One family, one phone, a history abroad* (“Crossing back”), split into J4.0 and J4.1 | Retitle the site's journeys to the deck's titles once B1 to B3 settle the deck's own wording. Keep J4.0 and J4.1 as two parts of the deck's J4 |
| A2 | Where Khamla lives | A citizen of Onesa, **working in** neighbouring Taifafeki | An Onesan national **living in Onesa** who gave birth in Taifafeki, “away from home” | Decide which is true. If she works in Taifafeki, the J2 “back in Onesa” return needs a reason |
| A3 | Who gives the birth doses | Slide 4: Dr Anan. Slide 8: “the midwife” | Dr Anan | See B4. The site matches slide 4 |
| A4 | Somsak's identifier at birth | “Has an identifier from birth”; found “through the mother's record” | “He has no Taifafeki identity number”; no identity document needed for the DVC | Decide. The site's version is what the library tests (DVCMinPreQual, STT-PAY-005) |
| A5 | What Khamla leaves hospital with | “A paper card that carries a QR code”, plus the same record in Taifafeki's citizen app | **Two** paper DVCs, one per dose; no Taifafeki citizen app | Keep two cards (one HCERT per dose is how the DVC works) and change the deck to “cards”, or add a note. Decide whether an Onesan mother has a Taifafeki citizen app |
| A6 | J2 timing | Somsak is **7 weeks** old | “3 weeks later” | Use 7 weeks on the site |
| A7 | J3 timing | Somsak is **10 weeks** old | “4 weeks later” (about 7 weeks) | Use 10 weeks on the site. Pentavalent 1, bOPV 1 and PCV 1 were due at 6 weeks, so J3 becomes a catch-up |
| A8 | J2 location | “Khamla village” | Village 04 | Pick one place name |
| A9 | How Vilay finds Somsak's family | Searches the client registry by **Khamla's national ID**, registers Somsak as her child | Adds Somsak to the Sengmany household with a temporary id; **Bounmy** confirms as head of household | Add the national-ID search to J2b; decide whether Bounmy (deck: not in J2) or Khamla confirms |
| A10 | Late birth registration | J2 notifies the civil registry (late birth registration, born abroad) | Not in the story | Add a CRVS notification to J2b (a FHIR message or task), or say the site leaves it out |
| A11 | Reminder | The CHW app schedules a reminder | A referral to the district health center; the reminder comes in J3 | Add a J2 reminder, or move the deck's reminder to the referral |
| A12 | Where “reported, not verified” happens | J3, at the health centre | J2, on the CHW phone; J3 replaces the reported doses with verified ones | Decide. The site's split is the “key trust boundary” its workshop teaches (discussion q2, M4) |
| A13 | What Khamla shows in J3 | The paper card **and the record on her phone** | The two paper cards only; the family's one phone is Bounmy's (J4) | See B5 |
| A14 | The Hep B product with no mapping | Not in the story: the schedule runs | Nurse Chanthason makes the clinical call; it is added to the national map (J3b) | Keep on the site (it drives M3 and M6), or drop it to match the deck |
| A15 | J4 mechanism | The family shares Somsak's **IPS** with consent; Dr Anan reads it | The same, through a passcode-protected **Verifiable Health Link** (4 digits, 14 days), every view logged in Onesa | Compatible. Mention the link and the audit in the deck, or keep it out of the policy story |
| A16 | Where J4 takes place | A paediatrician in Taifafeki | A primary care clinic in Kesaro, Taifafeki | Compatible. Pick “paediatrician” or “primary care” |
| A17 | Onesa's FHIR | “No national FHIR implementation guide yet” | A national FHIR server and gateway issue the family's links (J4) | Decide. If Onesa has no IG yet, J4's portal is part of the first move, not the baseline |

### B. The deck is inconsistent with itself

| # | Slide(s) | Inconsistency | Proposed fix to the deck |
|---|---|---|---|
| B1 | 7, 8 | J1 is “Recorded and vaccinated” on the divider, “Vaccinated and recorded” on the story | One title |
| B2 | 17, 18 | J3 is “A foreign record used for the next vaccine” on the divider, “A foreign record trusted at the clinic” on the story | One title |
| B3 | 22, 23 | “Continuity across border” and “Continuity across a border” | “across a border” |
| B4 | 4, 8 | Dr Anan gives the birth doses (4); the midwife does (8) | Dr Anan, as on the site and in J4 (the same doctor sees him a year later) |
| B5 | 4, 18 | Khamla holds records “on paper and on her phone”; Bounmy holds the phone with the digital record | One phone, Bounmy's, as on the site (J4.0's equity point depends on it) |
| B6 | 4, 8 | Somsak is “he” (3, 13) but “her birth doses” and “gives her the birth doses” (4, 8) | “his” |
| B7 | 24, 25 | J4's *What must be true* and *What this journey draws on* describe a **digital ICVP issued and checked by a port health verifier** (IHR, designated issuing authority). The J4 story is an IPS shared with a doctor | Rewrite both slides for the IPS story, or bring the ICVP back into the J4 story |
| B8 | 24 | “A verifier can check it without access to Onesa's systems” | True for a signed certificate, not for the IPS, which is fetched from Onesa. Rewrite with B7 |
| B9 | 29 | M4 “who verifies (Journeys 3 and **5**)” | There is no Journey 5: “Journeys 3 and 4” |
| B10 | 29 | M3 “data elements in Journeys 1 and 4” | J4 has no data-capture step. Probably “Journeys 1 and 3” |
| B11 | 27 | HMIS (coverage indicators) is marked for J3 only | The site counts a child born abroad into the coverage denominator at J2 (M2). Mark J2 too, or say why not |
| B12 | 6 | “At a glance” is a placeholder: “To attach the scenario and illustration from git webpage” | Use the journeys viewer's overview, `en/smart-trust-demo/journeys/` |
| B13 | 8, 26 | “Taifafekis health authority” (no apostrophe); “Both countries is connected” | “Taifafeki's”; “Both countries are” |
| B14 | Throughout | *immunization* and *immunisation* both used | One spelling. WHO uses *immunization* |

### C. Not a discrepancy, worth a check

| # | Note |
|---|---|
| C1 | Slide 26 names real countries (Saudi Arabia, Malaysia, Indonesia, Oman) as examples of a narrow start. That is fine for a policy deck. The site's own pilgrimage journey keeps to the two fictional countries |
| C2 | The deck's four journeys map to the site's steps as J1 → J1; J2 → J2a, J2b; J3 → J3a, J3b; J4 → J4.0a, J4.0b, J4.1. The [module × journey map](module-journey-map.html) uses the site's steps |

### D. The Country Canvas

The canvas now replaces the viewer's table sheets: the sheet titles and write-in fields, the cover, the three patterns, the legal bases and the cost drivers were aligned to it, and modules M6 and M7 take the canvas's (and the deck's) names. What is left:

| # | Where | Discrepancy | Proposed resolution |
|---|---|---|---|
| D1 | Sheet 1, journey | Touchpoint titles *Vaccinated and recorded*, *Found and registered*, *A foreign record used for the next vaccine*, *Continuity across border*: these settle B1 (J1) but differ again from the deck for J2 (*…at home*) and J3 (the deck's story slide says *…trusted at the clinic*) | Take the canvas's four titles everywhere (deck, site, viewer) |
| D2 | Sheet 1, capabilities | The *Touchpoints* column offers 1 · 2 · 3 · 4 · **5**; there are four touchpoints (compare B9, "Journey 5") | Drop 5, or add the fifth touchpoint it was meant for |
| D3 | Sheet 1, touchpoint 1 | "Vaccinated abroad, and leaves with a paper card and a QR code" (one card) | See A5: the site issues one signed card per dose |
| D4 | Sheet 1, touchpoint 4 | "Checked at a paediatrician office … any verifier can check it": the IPS story fetches the record from Onesa, so a verifier needs Onesa's gateway | See B7, B8 |
| D5 | Sheet 1, touchpoint 3 | "…can be read here. the schedule logic…" | Capitalise "The" |
| D6 | Sheets 1 to 6, header | "Bangkok · [Dates]" is a placeholder; the cover has "30 Nov & 1 Dec 2026" | Fill in the dates |
| D7 | Sheet 4, legal basis | Three rows (data protection, cross-border, consent for minors); the workshop had two | Done: the workshop's legal-bases table now has the canvas's three |
| D8 | Sheet 6, cost drivers | Six drivers, including *Training and change management*; the workshop had five, and called the last *The cost of not doing it once* (regionally), where the canvas says *The cost of not doing it* | Training added; decide whether the last driver means "not at all" or "not once, together" |
| D9 | Sheet 2 | The capability list on Sheet 1 has no notifications or consent block, but Sheet 2 and the deck's J2 (reminder) use them | Add them to Sheet 1, or leave Sheet 1 short on purpose |
| D10 | Throughout | Sheet titles are in Title Case (*Our Journey and Where It Breaks*), the *How the canvas works* table in sentence case | One case; the site uses sentence case |

### E. The glossary

77 terms. Where the DPI-H RA (smart-ra) defines the same or a close concept, the glossary now uses the RA's term and definition, word for word, and drops the handout's (owner, 2026-11-16): 18 terms. The rest keep the handout's wording, linked to smart-ra and DTH-PHC (dth-phc) where they have the term. The DTH-PHC glossary is linked from litlfred/dth-phc until it moves to WorldHealthOrganization/dth-phc.

| # | Term | Discrepancy | Proposed resolution |
|---|---|---|---|
| E1 | Client registry (MPI) | The handout made MPI the client registry's acronym; the DPI-H RA has Client Registry and Master Patient Index as two concepts | Done: the term now uses the RA's Client Registry and its definition; MPI stays an alternative label |
| E2 | AEFI | Now uses the RA's term, whose definition is only an expansion ("Adverse effects following immunisation"); the handout's was a real definition ("Any health problem after vaccination, reported for safety monitoring") | Propose a fuller definition to the RA glossary |
| E3 | Missing terms the journeys use | DVC (digital vaccination certificate), HCERT, VHL (Verifiable Health Link), DSC (document signer certificate), trust network participant, provenance: the site's step pages use them; the handout does not | Add a short "in the demonstrator" block to the glossary, or map each to its nearest handout term (DVC → VC, VHL → consent + IPS) |
| E4 | Facility, workforce and product registries | One handout term for three RA concepts | Keep; it is linked to all three (*covers*) |
| E5 | Decision support engine | The RA's term is *Computable Decision Support Engine* | Done: the term now uses the RA's concept and definition |
| E6 | Core data set | No RA or DTH-PHC term; nearest are *National Health Data Dictionary* and *Data Dictionary* | Propose *core data set* to the RA glossary |
| E7 | Trust anchor, trust list, verifiable credential, digital wallet | No RA or DTH-PHC term; the SMART Trust guide defines them | Link to SMART Trust's definitions when its glossary is published as SKOS |
| E8 | Organisations | ADB, World Bank, CSIRO, UNICC, MoPH Thailand, SNOMED International and the openEHR Foundation are in neither glossary | Propose them to smart-ra's organizations scheme |
| E9 | API, PHR, HIE, CRVS, DAK, IG, IPS, ICVP, IHR, PKI, GDHCN, DIIG, TWG | The DPI-H RA has each concept but no definition yet, so the handout's wording is kept | Propose the handout's wording to the RA glossary, or wait for the RA's own; switch when it lands |
