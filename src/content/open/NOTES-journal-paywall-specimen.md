# The journal paywall — a specimen of enclosure that only freezes

_Published live (2026-11-23). A worked specimen for the line that `coordination-bounds-reachability` and `held-value-not-reachable` both stall on, which the register calls "the deep line": how to tell enclosure that **funds** the building of a capability from enclosure that only **freezes** a capability already built. One case, run end to end, with its strongest objections printed. It does not draw the line in general (§6 says what it does and does not show). Nothing in `propositions.ts` changes because of this note; a climb there is a separate event._

_Provenance. Tom Cassidy, 2026-11-23, called paywalled academic journals **"frozen value"**, and said: **"The notion that you have to pay to access academic work that's printed in journals is an abomination."** Those are the only words of his in this note. Everything else is the note's own assembly and is marked [ASSEMBLER], following the convention of the canonical nodes. Figures carry their source inline; anything not verified says so._

---

## 1. The specimen, stated plainly

[ASSEMBLER] The subscription journal is the configuration in which a finished capability (a peer-reviewed research result) is built almost wholly upstream of the party that encloses it, and is then held behind a price. Taking the chain one link at a time:

**Who pays for the research.** Mostly the public, directly or through institutions it funds.
- In the United States, government sources supplied about **55%** of higher-education R&D funding in 2018; the institutions themselves supplied about **28%**, and those institutional funds are in turn largely tuition, state money and endowment, not publishers ([NSB, *Academic R&D: International Comparisons*, fig. URD-17](https://ncses.nsf.gov/pubs/nsb20213/figure/URD-17)). The same source puts the government share higher in 8 of the top 10 R&D nations.
- UK: UKRI says public funding (government, UKRI, funding councils) is "almost 50 per cent" of all R&D performed in the public, university and non-profit sectors together ([UKRI research financial sustainability data pack](https://www.ukri.org/wp-content/uploads/2023/11/UKRI-201123-ResearchFinancialSustainabilityDataPack.pdf)). **Unverified:** a clean current figure for the public share of UK *university* research income alone; this note did not find one and does not guess it. Charities (Wellcome, Cancer Research UK) are a large non-public, non-publisher source in the UK, which matters for the argument only in that they are not the publisher either.

**What authors are paid.** Nothing, by the publisher. Authors of journal articles are not paid by journal publishers; on the open-access route they often pay the publisher instead ([Cambridge Core paper on the publishing model](https://www.cambridge.org/core/product/213FF8F42CBA85A4B8C58F5A7041A481/core-reader)). This is structural practice rather than a figure, and the note treats it as verified.

**What reviewers are paid.** Nothing, as a rule. Aczel, Szaszi and Holcombe estimate reviewers worldwide spent **over 100 million hours** on peer review in 2020 — more than 15,000 years of work — worth roughly **US$1.5 billion** for US-based reviewers alone, **$626 million** for China-based and **$391 million** for UK-based reviewers, and they call their figures likely underestimates ([*A billion-dollar donation*, Research Integrity and Peer Review, 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8591820)). Journal editors are a mixed case: many academic editors are unpaid or paid a stipend; **unverified** as an estate-wide figure.

**What access costs.**
- Per article: Elsevier's ScienceDirect pay-per-view is **US$31.50 per article or chapter for most content**, with select titles from $19.95 to $39.95 ([Elsevier, pay-per-view](https://www.elsevier.com/solutions/sciencedirect/journals/pay-per-view), fetched 2026-11-23).
- Per sector: UK universities spend about **£112 million a year** with the five largest publishers, and in 2025 were seeking cuts of 5–15% as those deals expired; several (Lancaster, Sheffield, Surrey among them) then declined the renewed Jisc–Elsevier deal on cost grounds ([Times Higher Education, 2025](https://www.timeshighereducation.com/news/new-offers-big-five-still-too-costly-uk-universities); [THE on opt-outs](https://www.timeshighereducation.com/news/three-more-uk-universities-opt-out-new-elsevier-deal)). An earlier FOI-based estimate put UK subscriptions and publishing charges at **more than £1 billion over the decade to 2020** ([THE](https://www.timeshighereducation.com/node/689536)).
- Per author, on the open-access route: Nature-branded journals have charged an article processing charge of **€9,500** since 2020 ([The Scientist](https://www.the-scientist.com/for-a-hefty-fee-nature-journals-offer-open-access-publishing-68181)). **Unverified:** whether that is still the 2026 list price; the note did not find a current Springer Nature price page that confirms it.

**What the encloser keeps.**
- RELX's Scientific, Technical & Medical segment (Elsevier) reported a **38.1% adjusted operating margin** for 2025, up from a restated 37.4% ([RELX 2025 results](https://www.relx.com/media/press-releases/year-2026/relx-2025-results); [results presentation](https://www.relx.com/~/media/Files/R/RELX-Group/documents/results/results-presentations/2025-results-presentation.pdf)).
- Taylor & Francis (Informa) reported a **36.6% adjusted operating margin** for 2025, flat on 2024 ([Informa 2025 full-year results](https://www.informa.com/globalassets/documents/investor-relations/2026/informa-2025-full-year-results-statement.pdf)). Informa's own five-year summary page shows a different basis (35.2%); the note uses the results statement.
- **Unverified here:** comparable segment margins for Springer Nature and Wiley. Not searched to a primary source; not stated.

**How much is already open.** About **40%** of the roughly 3.9 million articles, reviews and conference papers published in 2024 were gold open access (immediately free as the version of record), up from 14% in 2014; counting green and bronze too, about **46%** ([STM OA dashboard](https://www.stm-assoc.org/oa-dashboard/uptake-of-open-access/); [Springer Nature 2024 OA report](https://stories.springernature.com/oa-report-2024/)). Dimensions-based counts give a different curve; the two are not directly comparable ([Scholarly Kitchen, 2025](https://scholarlykitchen.sspnet.org/2025/11/17/the-global-transition-has-already-happened-its-just-not-the-one-you-expected-part-1-of-2/)). On these figures, the majority of new research is still published behind some wall at the version of record.

---

## 2. The deep line, drawn on this case

[ASSEMBLER] The test the register asks for is: **what does the enclosure pay to bring into being, and what does it merely fence?** Run it link by link.

| Link in the chain | Who pays | Does the enclosure fund it? |
|---|---|---|
| The research itself (labs, salaries, equipment) | Public funders, institutions, charities | **No** |
| Writing the paper | The author's employer (salary) | **No** |
| Peer review — the judgement itself | Reviewers' employers (salary), unpaid to the reviewer | **No** |
| Running peer review — finding reviewers, chasing, deciding | Publisher (managing editors, systems), partly unpaid academic editors | **Partly** |
| Copy-editing, typesetting, XML, DOIs, indexing | Publisher | **Yes** |
| Hosting and long-term archiving | Publisher (dark archives such as CLOCKSS and Portico also exist; their funding mix is **unverified** here) | **Yes** |
| The brand — the journal name as a trust signal | Built over decades by the community's submissions and reviews, maintained by the publisher | **Contested** |
| The result reaching a reader | The reader's library, or the reader at ~$31.50 | The enclosure **stands here** |

The fair reading of the table: publishers fund real things. Coordination of review is work; typesetting and permanent archiving are work; a functioning submission system is infrastructure. None of that is nothing, and this note does not say it is.

The line falls between the cost of those services and the price of the enclosure. The capability the enclosure fences — the finished result — was assembled upstream at public and charitable expense, with the judgement donated. What the enclosure funds is the **last mile and the stamp**. A 36–38% operating margin is the measure of the gap: it is what the enclosure collects over and above the cost of everything it does fund, including the things that are genuinely its own.

So, in the vocabulary the register uses: on this specimen, the enclosure is **mostly freezing, with a thin funding layer on top**. It is not the patent case. A patent's monopoly is the price society pays for an R&D spend the patentee actually carried. Here the encloser carried a small fraction of the build and holds a monopoly over the whole result — and, unlike a patent, the monopoly does not expire after twenty years. Copyright on the version of record runs far longer than the result stays scientifically live.

The `held-value-not-reachable` reading follows directly: a result behind a $31.50 wall is held value. It sits on a balance sheet as a subscription asset while not reaching the clinician in a hospital without a deal, the independent researcher, or the reader in a country whose institutions cannot pay. That is the shape the forming node names — "value frozen with no contingent return" — in one of its cleanest available forms, because it is hard to name any contingency the wall keeps the result safe for.

---

## 3. The sharpest objections, shipped with this specimen

### 3.1 Journals supply the selector — and CE itself says the selector is the scarce thing

This is the strongest objection and it uses CE's own words. The canon says distinction is cheap and selection is dear (`docs/canonical/the-selection-primitive.md`). A journal is a selector: it tells a reader what to trust out of a firehose. If selection is the scarce thing, then the publisher's brand is not a fence round a built capability; it is the capability, and the price is its price.

**[ASSEMBLER] Response.** Separate the selection from who does it. The selecting is done by reviewers and academic editors, nearly all on salaries paid upstream (§1). What the publisher owns is the **name the selection is stamped under**. The brand is a store of accumulated selection — built by decades of the community's best submissions and unpaid judgement — and the enclosure charges rent on that store. That is closer to a held asset than a funded build.

**Concession, printed in full.** The objection is partly right and the note does not dissolve it. Coordinating review at scale is selector infrastructure, and the publisher does fund it. A recent example cuts against an easy dismissal: arXiv, the largest open preprint server, capped authors at two submissions a month in autumn 2026 after a record 40,363 submissions in September and a further record 42,152 in October, widely reported as a flood of low-quality and AI-generated work ([Times Higher Education](https://www.timeshighereducation.com/node/745975); figures from secondary reporting, **arXiv's own stats page not opened**). Removing the wall does not supply the selector, and an open firehose with no selector is not obviously better than a walled one with one. The defensible claim is narrower: the selector is real, mostly donated, and does not need the reader-side paywall to exist (diamond open-access journals run review with no fee to reader or author). Whether it can run *at the scale and quality* of the commercial system without that revenue is not shown here.

### 3.2 Author-pays open access moves the enclosure, it does not remove it

Gold open access with article processing charges frees the reader and charges the author. €9,500 for a Nature-branded paper (§1) is a toll at the door rather than the exit. The margin need not fall at all: the same rent is collected on the supply side, and it now filters *who gets to publish* in the top venues by their institution's budget — a freeze on the authoring side of the reachable set rather than the reading side.

**[ASSEMBLER] Response.** Accepted as stated. On CE's terms this is not a thaw but a relocation, and it is the same pattern the autonomous-fleet run found: "the thaw and the re-freeze are the same motion." What the specimen supports is not "open access fixes it" but the narrower test in §2: **follow the margin**. If the price at the gate still sits far above the cost of what the encloser funds, the enclosure is still freezing, whichever side the gate is on.

### 3.3 The problem is already dissolving

Preprint servers, the NIH's zero-embargo public-access policy (in force for manuscripts accepted from 1 July 2025 ([MIT Libraries](https://libraries.mit.edu/scholarly/2025/updated-nih-public-access-policy-goes-into-effect-july-1))), funder mandates in the UK and Europe, and a 46% open share (§1) all point one way. A specimen of a problem in the middle of being solved is a weak foundation for a claim.

**[ASSEMBLER] Response.** Partly conceded: the reading side is thawing, fast, and much of the thaw is mandate-driven rather than market-driven, which is itself evidence for `coordination-bounds-reachability` — the result was reachable all along; a coordination change (funders acting together) made it reached. But two things survive. First, the version of record — the one courts, clinicians and citation counts treat as the paper — is still majority-walled in 2024. Second, the margins in §1 are 2025 figures and did not fall; RELX's STM margin rose. A dissolving enclosure that keeps its margin has moved, not melted (§3.2). **Unverified:** UK and EU mandate details were not checked to primary sources for this note.

---

## 4. What CE's own design answers with — an instance, not a solution

[ASSEMBLER] This work faces the same problem in miniature and answers it one way. Every proposition enters at `forming`, published and free, with no fee and no wall at either side. Merit is not decided at the door; it is decided by the **climb, in public**, on the settledness spine, with the sharpest objection printed beside each claim (`NOTES-four-candidates-and-the-capture-rule.md`: "the threshold for capture is existence, not merit"). Entry is promiscuous; selection is structural and visible.

That separates the two things the journal bundles: **access** (free, at once) and **the selector** (a public, versioned record of what has survived attack). It is offered as one instance of the arrangement, not as a design for scholarly publishing. It runs at the scale of one author's body of work, its selector is a method plus a handful of readers rather than a field's review community, and nothing in it shows that the same separation holds when millions of papers a year want selecting. It is evidence that the separation can be built, not that it scales.

---

## 5. What would have to be true for either proposition to climb

[ASSEMBLER] Stated as conditions, not as claims that they are met.

**For `held-value-not-reachable` (forming).** The node's own sharpest objection is that a thaw may only redistribute option space rather than add to it. This specimen would help it climb only if someone measured a thaw that **demonstrably expanded the reachable set** — for example, a field where a result went from walled to open and new uses followed that were absent before (downstream citations or clinical uptake from readers outside subscribing institutions), net of what the closed system would have produced anyway. The open-access citation-advantage literature is the obvious place to look; it is **not reviewed here**, and it is known to be confounded by self-selection, so it would have to be read with care.

**For `coordination-bounds-reachability` (established; the undone part is the funds/freezes line).** The specimen helps draw the line only if the §2 table can be **costed**: what fraction of the access price pays for what the encloser actually funds. The margins give a ceiling on the rent (a 36–38% operating margin is the share above all costs, including the funded ones), but the split between funded services and pure enclosure inside the remaining cost base is not in public filings. Until it is, the line on this case is drawn qualitatively, link by link, and not as a number.

**For the line in general.** One clean case is one clean case. The journal paywall is useful precisely because it is extreme — the encloser funds almost none of the build — and extreme cases do not settle the hard middle. The test that would generalise is a **second specimen at the other pole** (an enclosure that clearly funds the build, such as a drug patent where the patentee carried the trials) **and a third in the middle** (software, or a standards body's licensed patents), all run through the same table. If the "follow the margin against what was funded" test sorts all three in a way that agrees with considered judgement, it has earned a gate. If it does not, it has not.

---

## 6. What this specimen does not show

[ASSEMBLER]
- It does not show that the line between funding and freezing is drawn in general. It shows it can be drawn on one case where the answer is unusually clear.
- It does not show that publishers fund nothing. They fund the last mile, the archive and the coordination of review, and those are real.
- It does not show that open access is a thaw. Author-pays open access may be the same freeze moved to the other gate (§3.2).
- It does not show that the selector survives without the enclosure at scale. The arXiv cap is a live counter-signal (§3.1).
- It does not measure an option-space gain. Every figure here is a price, a margin or a share; none is a count of newly reachable configurations.

_Sits at `forming` by the capture rule. Not a proposition; not in `propositions.ts`. The climb, if any, belongs to the two nodes it serves, and happens there._
