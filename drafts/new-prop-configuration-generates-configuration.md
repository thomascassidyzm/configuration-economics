# Proposed proposition: configuration-generates-configuration

Working title: **"Configuration Generates Configuration"**

Companion to `asymmetry-of-option-space-change` (shipped 2026-05-18). That proposition is the destruction-side account: option-space loss is fast and local. This one is the expansion-side account: each configured arrangement makes further configurations reachable that were not reachable before, and the rate at which new configurations become reachable grows with accumulated configuration. Together they close the loop on how option space actually changes.

Draft for voice-review. Do not promote without Tom's pass.

---

## Why now

`value-option-space` defines value in terms of configurations that expand future option space, but it does not say *how* expansion happens. `asymmetry-of-option-space-change` gives a sharp structural account of contraction. Expansion, in the current canon, is a definitional gesture: a property a configuration can have, with no mechanism behind it. The result is lopsided. The framework has a precise account of what closes the future and only a hand-wave at what opens it.

The mechanism is not exotic. Each configured arrangement enables nearby configurations that were not reachable from the prior state — the chemistry that becomes accessible once an enzyme exists, the engineering that becomes accessible once a transistor exists, the proofs that become accessible once a notation exists. Accumulated configuration lowers the cost of further configuration. This is Kauffman's adjacent possible at the local scale and the Walker / Cronin reading of Assembly Theory at the structural scale; it is Fuller's ephemeralisation observed in tech-economics; it is Arthur's combinatorial technology and Beinhocker's evolutionary economy.

Without this proposition stated, the canon describes a one-way valve — option space drains and never refills. With it stated, the canon describes the actual structure: a slow generative process and a fast destructive one, neither symmetric with the other.

---

## Proposed TypeScript object

Honest status call: **`contested`**. The defensible core — that configurations enable further configurations and that the rate of enabling grows with accumulation — is solid but not standard in economics. The stronger version available in the predecessor architecture, that the arrow of time itself emerges from accumulating assembly (Walker and Cronin, 2023–24), is metaphysically contested in physics. The proposition should stand on the weaker claim and surface the stronger as a live development, not depend on it. `contested` reflects this dual status honestly. `derived` would overclaim; `open` would understate where the structural argument has reached.

```typescript
{
  id: 'configuration-generates-configuration',
  title: 'Configuration Generates Configuration',
  epistemicStatus: 'contested',
  surface: `Each configured arrangement makes further configurations reachable that were not reachable before.

An enzyme makes a reaction accessible that chemistry alone did not provide. A notation makes a proof accessible that the same idea, unwritten, did not. A road makes a settlement accessible that geography alone did not. A standard makes an interoperation accessible that two compatible systems, unstandardised, did not.

Once enough configuration has accumulated, the rate at which new configurations become reachable grows with what is already there. This is not a moral observation. It is a structural one — the same mechanism that makes destruction fast and local, run in reverse, makes expansion slow but compounding. Each addition opens a neighbourhood of further additions that the prior state did not contain.

The compounding is not unlimited and it is not always benign. Configurations that expand option space for one observer can contract it for another. Substrates that took long build-up can be removed faster than they accrued. The asymmetry of rates between expansion and destruction is what makes the slow generative process structurally vulnerable to the fast destructive one.

Where this generativity holds, value is not stored in configurations as a stock; it is produced by configurations as a flow into the adjacent possible.`,
  logic: {
    claim: 'Each configured arrangement enables further configurations that were not reachable from the prior state. The rate at which new configurations become reachable grows with accumulated configuration. This is the generative counterpart to the asymmetry of option-space change: destruction is fast and local; expansion is slow, conditional on substrate, and compounding.',
    premises: [
      'Configurations are not isolated points in configuration space; each occupies a position from which certain further configurations are reachable and others are not (Kauffman, adjacent possible).',
      'The set of configurations reachable from a given configuration is larger than the set reachable from a less-configured prior state, for the configurations that constitute relevant substrate (tools, institutions, knowledge, biological complexity, infrastructural and notational scaffolds).',
      'The cost of assembling new configurations falls as accumulated configuration grows, because new configurations can recruit existing ones as components rather than re-deriving them (Fuller, ephemeralisation; Arthur, combinatorial technology).',
      'The asymmetry-of-option-space-change proposition holds in reverse: build-up is gradient-following, integrates many small adjustments across many parts of a system, and requires continuous exergy input over its build-time. Where the substrate persists, the build-up compounds.'
    ],
    conclusion: 'Option-space expansion is not a property a configuration can incidentally possess; it is the structural consequence of configurations being able to recruit other configurations. The runaway character of expansion — apparent in biological evolution, technological accumulation, language, and mathematics — is the same mechanism observed at scale. It is slow at any single step, compounding across steps, and conditional on the substrate not being removed faster than it accrues.',
    predictive: 'Domains where the substrate of accumulated configuration is preserved will show compounding expansion of reachable configurations on long timescales (biological diversification under stable conditions, technological capability under maintained scientific and industrial substrate, mathematical and notational depth under preserved transmission). Domains where the substrate is removed — by collapse, extinction, censorship, infrastructural loss — will show that the apparent generative process halts and does not resume on the timescale of the loss. The runaway is conditional, not automatic.'
  },
  layers: {
    coreClaim: 'Each configured arrangement makes new configurations reachable that were not reachable before. The more configuration accumulates, the more new configurations become reachable per step. This is how option space actually expands.',
    formalDefinition: 'For a configuration C with accumulated structure S(C), the reachable set R_living(C, B, T) under a fixed exergy budget B and horizon T strictly contains R_living(C\', B, T) for any C\' with S(C\') ⊂ S(C), where the configurations in S(C) function as substrate for further assembly. The marginal cost of reaching a new configuration C\'\' from C falls as S(C) grows, because C\'\' can recruit elements of S(C) as components rather than re-deriving them from the unconfigured state. The proposition is the structural counterpart to asymmetry-of-option-space-change: τ_expand at any single step remains long relative to τ_break, but the number of steps available per unit time grows with S(C), so cumulative expansion compounds where the substrate is preserved.',
    implications: 'Value as defined in value-option-space stops being a static property of configurations and becomes a function of the generative process they participate in. Configurations that preserve and extend substrate are value-positive not only by what they themselves enable but by the further configurations they make reachable. Configurations that consume substrate without replacing it are value-negative on the same axis. The "runaway" of capability that Fuller named ephemeralisation, that Arthur and Beinhocker formalise as combinatorial recursion, that biology exhibits as evolutionary diversification, and that Kauffman names as the adjacent possible — these are not separate phenomena but instances of the same structural mechanism. The proposition also clarifies an asymmetry within the canon: prevention-over-repair, complexity-maintenance, and care-as-configuration are not just defensive postures; they are the conditions under which the generative process continues at all.',
    openQuestions: 'Whether the rate-of-rate-growth is genuinely structural or is an empirical regularity over specific substrates (biology, post-Enlightenment technology, written mathematics) is open. The strongest articulation available — Walker and Cronin\'s reading of Assembly Theory as a forward arrow, in which the universe\'s trajectory through configuration space is what time is — would make the generativity metaphysical rather than empirical. That move is contested in physics and the proposition does not depend on it. The weaker claim — that configurations enable configurations and the rate grows with accumulation — is defensible without the metaphysics. Whether the proposition adds anything to endogenous-growth theory (Romer) beyond physical grounding is also open; the substantive overlap is real but the framing here is configurational rather than knowledge-as-input-to-production.'
  },
  revisedAt: '2026-05-18',
  linksTo: ['value-option-space', 'asymmetry-of-option-space-change', 'option-space-measurability', 'structural-memory', 'complexity-maintenance', 'care-as-configuration', 'option-space-as-chess-moves']
}
```

---

## Examples (the runaway in operation, and where it hit walls)

The pattern is consistent across substrates that are very different from each other. The point of running the examples is to show the same mechanism — accumulated configuration lowers the cost of further configuration — operating at different scales. The honest counterpart is that the runaway has hit walls before, and the walls are themselves informative.

### Biological combinatorics

The number of distinct gene products, regulatory circuits, and morphological forms in the biosphere is not a flat random walk through chemistry. Each major innovation — the cell, the eukaryote, multicellularity, the nervous system, language — opened a neighbourhood of further configurations that the prior state did not contain. The compounding is visible in the fossil record as long plateaux punctuated by radiations after each new substrate stabilises. The Cambrian radiation, the mammalian radiation after the K-Pg extinction, the avian radiation: each rides on a prior substrate of accumulated configuration that had become reusable.

Walls observed: five mass extinctions remove substrate faster than the diversification rate can re-build it; recovery to comparable functional diversity takes 10^6 to 10^7 years. The generative process is real, the substrate's vulnerability to fast removal is also real, and the asymmetry between the two is what `asymmetry-of-option-space-change` names.

### Technology stacks

A vacuum tube made the diode-pentode-amplifier chain reachable. The transistor made integrated circuits reachable. The integrated circuit made microprocessors reachable. The microprocessor made personal computers reachable. The personal computer made the web reachable. The web made platform services reachable. Each step took less time than the one before. The cost per unit capability fell across the entire chain — the empirical content of Fuller's ephemeralisation. The chain is not a single innovation but a substrate that recruits its own prior layers as components.

Walls observed: Roman engineering capability — concrete, hydraulic infrastructure, surveying, road construction — was substantially lost in Western Europe for the better part of a millennium after the Western Empire's fragmentation. The substrate was removable. Cuneiform mathematics and Babylonian astronomy were partially lost across regime transitions. The pre-Galenic medical corpus was lost and partially recovered; some of it remains lost. The runaway is conditional on transmission, not automatic.

### Language and mathematical notation

Positional notation with zero made arithmetic reachable that Roman numerals did not. Algebraic notation made identities reachable that prose mathematics did not. Calculus notation made physical reasoning reachable that geometric demonstration did not. Set-theoretic notation made foundations reachable that informal mathematics did not. Each step lowered the cost of the next; each new generation of mathematicians inherited the prior substrate and operated on it. The proofs reachable from the substrate of 1900 were inaccessible from the substrate of 1500, not because the people were less able but because the configuration they inherited contained more.

The same observation holds for natural languages — a written tradition with stable orthography enables a literature; a literature enables a critical apparatus; a critical apparatus enables a science. The compounding is configurational, not biological.

Walls observed: extinct languages take their idioms with them; some configurations of thought that were reachable from one language are not reachable from any successor. The loss of a notation can postpone an entire line of work for centuries. The loss of a critical tradition is harder to recover than its loss looks at the time.

### Scientific instrumentation chains

The microscope made cell biology reachable. The achromatic objective made cytology reachable. Electron microscopy made organelles reachable. X-ray crystallography made structural biology reachable. Cryo-electron microscopy made dynamic macromolecular structure reachable. Sequencing instruments at successive cost-per-base reductions made comparative genomics, then personalised genomics, then ancient DNA reachable. Each instrument is a configuration. Each configuration recruits its predecessors as components. The reachable set of biological questions grows with the substrate of available instruments, and the time-to-next-instrument falls.

The pattern is the same in astronomy (telescope → spectroscope → interferometer → space-based instrument → multi-messenger), in particle physics (cyclotron → synchrotron → colliding-beam → LHC-scale), in computational science (mechanical → vacuum-tube → transistor → integrated → distributed). It is not coincidence; it is the mechanism.

Walls observed: instrument-dependence is also instrument-vulnerability. The substrate of working instruments requires continuous maintenance, supply chains, expert operators, and replacement parts. Where any link fails, the capability fails. Some Cold War nuclear-test instrumentation cannot now be rebuilt; some Apollo-era manufacturing capability has been lost and would require re-derivation rather than re-application of preserved configuration.

### Cultural and institutional configuration

Written law makes legal reasoning reachable that customary law did not. A judicial precedent system makes a body of doctrine reachable that case-by-case adjudication did not. A constitutional framework makes a federation reachable that bilateral treaties between sovereigns did not. Each layer is a configuration. Each layer recruits its predecessors.

Walls observed: the institutional substrate is removable on civilisational timescales — the loss of municipal continuity in post-Roman Western Europe; the loss of the Library of Alexandria's tradition (gradual, not single-event); the loss of the trust-in-institutions substrate that some present polities exhibit. The recovery time is empirically very long, and recovery is not guaranteed.

### Counter-pattern — selection effects

Be honest: we observe the substrates that survived to be observable. The biological substrates we count — DNA, cells, eukaryotes — are the ones that did not get removed. The technological substrates we count — transistors, the web — are the ones currently in operation. Lines of configuration that did not compound, or that compounded for a while and then failed, are less visible. The runaway as observed in retrospect is partly selection bias. The proposition's claim is structurally about the mechanism, not statistically about the dominance of the mechanism over all substrates that have ever existed.

For the cases the framework cares about — biospheric integrity, soils, languages, institutions, scientific and technological substrate — the mechanism is observable in operation now and the substrate is observably vulnerable to removal at faster timescales than its accumulation. That is what the proposition is for. It is not a general claim that any configured arrangement leads to compounding expansion; many do not.

---

## Lineage notes (for Tom)

Honest about what each prior author claimed and what would be a stretch.

### Walker and Cronin (Sharma, Czégel, Lachmann, Kempes, Walker, Cronin 2023, *Nature*; Walker, *Life as No One Knows It* 2024)

Load-bearing structural predecessor. Cronin's Assembly Theory was originally framed in the 2017–2021 papers as a backward-looking measure: the assembly index of an object is the minimum number of recursive joining operations required to construct it from primitives, given that already-assembled sub-objects can be reused. CE has, since 2025, cited Cronin as a backward complexity measure and contrasted it with the framework's need for a forward-looking measure of option space. That citation is now under-credited.

The 2023 *Nature* paper ("Assembly theory explains and quantifies selection and evolution") and Walker's 2024 book *Life as No One Knows It* read assembly forward as well as backward. The argument is that the universe's trajectory through configuration space is the substrate of time itself — that what we call "the arrow of time" is the direction in which assembled configurations accumulate, and that this accumulation is a physical quantity with conservation-like and growth-like properties rather than a backdrop against which physics happens. On their reading, assembly is not just a measure applied to objects after the fact; it is the structural mechanism by which configuration space gets explored, and the universe's location in configuration space at any moment determines what is reachable from it. This is precisely the forward-looking framing CE had been declaring it needed.

Honest accounting: the 2023–24 work closes the gap CE had been pointing at from the other side. CE's framing of Cronin as backward-only was right for the 2017–2021 papers and is no longer right for the 2023–24 framework. The proposition should cite Walker and Cronin as the strongest articulation currently available of the generativity claim, and should note the framing was reformulated by Cronin's group in the same period CE was developing the option-space programme. The two programmes are convergent rather than competing.

What the proposition does not depend on: Walker and Cronin's strong metaphysical claim that time itself is emergent from assembly. That claim is contested in physics. The proposition states the structural claim — configurations enable configurations, the rate grows with accumulation — without requiring the metaphysics. If the time-emergent-from-assembly view stabilises, the proposition gets stronger; if it does not, the proposition still holds on the empirical-structural ground.

### Stuart Kauffman (*The Origins of Order* 1993, *Investigations* 2000, "adjacent possible")

Broader conceptual ancestor. Kauffman's adjacent possible names the local mechanism that the proposition is the structural account of: from any configuration, certain new configurations are reachable in one step that were not reachable in zero steps, and the accumulation of such steps over time generates a tree of possibility that grows with what has already been explored. Kauffman developed the concept first in autocatalytic-set theory and later extended it to biology, technology, and the economy. The framing is closer to a research programme than a single theorem — Kauffman is candid that the adjacent possible is harder to formalise than to observe in operation — and the proposition inherits that stance.

What Kauffman supplies: the local mechanism. Each configuration has a neighbourhood of reachable next-configurations; the neighbourhood is not the same as the global configuration space; exploration grows the substrate that defines further neighbourhoods. This is the proposition's premise structure.

What Kauffman does not supply: the metaphysical move about time itself. Kauffman's adjacent possible is a local enabling-relation between configurations; it is not a claim about the structure of physical time. The 2023–24 Walker / Cronin reformulation is a separate move that goes further than Kauffman did. Cite Kauffman as the local-mechanism ancestor; cite Walker and Cronin for the structural extension.

### Buckminster Fuller (*Operating Manual for Spaceship Earth* 1969, *Critical Path* 1981, "ephemeralisation")

Operational case in tech-economics. Fuller's ephemeralisation names the observed pattern that capability-per-unit-input grows over time across technological domains: a given function requires less material, less energy, and less labour to deliver as the substrate of accumulated configuration grows. *Operating Manual* states the claim as a structural property of technological civilisation; *Critical Path* develops it with the long historical examples. Fuller frames it as "doing more with less," which is the runaway looking back at itself — the same mechanism the proposition names, observed at the scale of a civilisation's tool-base over centuries.

What Fuller supplies: the observed pattern in tech-economics, articulated in language that aligns with the framework's "value as expansion of future option space." Fuller's instinct was structural and physically-grounded; the proposition is compatible with his framing and extends it from tech-economics to the general configurational case.

What Fuller does not supply: a measure, a formal definition, or a treatment of when ephemeralisation fails. Fuller is largely silent on the walls — Roman engineering, the loss of capability under collapse — and is in places naively optimistic about the runaway's stability. The proposition inherits Fuller's pattern-observation and is more honest than Fuller was about substrate-vulnerability.

### W. Brian Arthur (*The Nature of Technology* 2009) and Eric Beinhocker (*The Origin of Wealth* 2006)

Complexity-economics extension. Arthur's central claim in *The Nature of Technology* is that technologies are combinations of prior technologies, and that new technologies become reachable as the combinatorial substrate grows — a configurational restatement of Fuller, with explicit attention to the recursive-combination mechanism. Beinhocker's *The Origin of Wealth* frames the economy as an evolutionary algorithm running over technologies and business models, in which the diversity of available configurations grows over time through variation, selection, and amplification. Both works share the proposition's structural commitment that configuration recruits configuration and that the substrate of what is available shapes what becomes reachable next.

Cite briefly. Neither work is load-bearing for the proposition's claim — Kauffman's adjacent possible and Walker / Cronin's assembly-as-arrow are the deeper ancestors — but both extend the local mechanism into economics specifically, which is the application context the framework occupies.

### What none of the lineage gives, individually

No single predecessor states the proposition in this form: that configuration enabling configuration is the structural counterpart to the asymmetry of option-space change, and that the runaway character of expansion is the same mechanism observed at scale across very different substrates. Kauffman supplies the local enabling-relation; Walker and Cronin supply the strongest current structural account; Fuller supplies the tech-economics observation; Arthur and Beinhocker supply the combinatorial economics. The proposition's contribution is to unify them into a single structural claim and pair it with `asymmetry-of-option-space-change` so the framework has both sides of how option space changes.

---

## Where it could go wrong (steelman against)

### Objection 1: The runaway is selection bias — we only see the substrates that survived

True, and important. The pattern of "each configuration enables further configurations" is observed on the substrates that did not get removed before they could compound. The biological substrates we count are the ones that did not get extinguished; the technological substrates we count are the ones currently in operation; the linguistic and mathematical substrates we count are the ones currently transmitted. Lines of configuration that did not compound — or that compounded briefly and then failed — are less visible because they are not present to be observed.

*Response sketch:* the proposition concedes the selection effect at the empirical-frequency level. Its claim is not statistical (that any configured arrangement leads to compounding expansion) but structural (where the substrate persists and is recruitable, configurations enable further configurations). The mechanism is observable in operation on present substrates; the asymmetry-of-option-space proposition handles the question of how often substrates get removed before they compound. The two propositions together describe the actual structure: a slow generative process that compounds where it can and a fast destructive process that often prevents it from compounding. Selection bias is the explanation for why expansion has historically been less dominant than the mechanism would suggest at peak; it is not a refutation of the mechanism.

### Objection 2: Time-emergent-from-assembly is contested physics, not consensus

True. Walker and Cronin's 2023–24 reformulation of Assembly Theory as a forward-running structural mechanism — with time itself as a property of accumulating assembly — is one position in a contested debate. Several alternative views are on the table (Carlo Rovelli's relational time, Sean Carroll's emergent-from-entropy time, the standard-model treatment of time as a background parameter). The proposition's surface text cites Walker and Cronin as the strongest articulation; a critic can reasonably say "strongest articulation of a contested view is not consensus, do not lean on it."

*Response sketch:* the proposition is explicitly designed to stand on the weaker claim. The defensible core — that configurations enable further configurations and that the rate grows with accumulated configuration — is independent of whether time itself is emergent from assembly. The Walker / Cronin framing is the strongest current articulation of where the structural claim has reached, and is cited as such. If the metaphysical view stabilises in physics, the proposition gets stronger. If it does not, the proposition still holds on Kauffman's adjacent possible plus the empirical observation of substrate-dependent expansion across biology, technology, language, and mathematics. The status `contested` reflects this dual basis honestly.

### Objection 3: "Configuration enables configuration" is unfalsifiable if read generously, trivial if read strictly

The objection runs in two directions. Read generously — every state is followed by some state, so every configuration "enables" the next one — the claim is empty. Read strictly — only configurations that demonstrably enable specifically novel subsequent configurations count — the claim becomes hard to falsify against any specific example, because demonstrating that a future configuration was *not* reachable from the prior state requires a counterfactual.

*Response sketch:* the proposition's claim is neither the generous reading nor the strict one. It is the structural reading: where a configuration functions as substrate — where it can be recruited as a component of further configurations rather than merely preceding them in time — the reachable set of further configurations grows. This is testable against specific cases: the transistor functions as substrate for the integrated circuit (the IC recruits transistors as components, not merely as predecessors); the printing press functions as substrate for vernacular literacy (the literacy programme recruits printed material as a component, not merely as a prior event). The substrate-relation is empirically distinguishable from mere temporal precedence, and the proposition is falsifiable against cases where apparent substrate fails to enable further configurations. The framework's connection to Assembly Theory makes this rigorous: assembly counts substrate-recruitment explicitly, so the structural reading is operationalisable in principle even if the global measure remains open.

### Objection 4: The runaway has hit walls before, so its generative character is overstated

True and incorporated in the proposition itself. Roman engineering capability was substantially lost for centuries; pre-Galenic medical knowledge was lost in parts; some Apollo-era manufacturing capability cannot now be rebuilt without re-derivation; antibiotic discovery has slowed despite a hugely-grown scientific substrate; several major civilisations have collapsed and required centuries to recover what they had. A reader can argue from these that the "runaway" is a recent and possibly local pattern, not a structural feature of configuration.

*Response sketch:* the proposition does not claim the runaway is automatic, universal, or stable. The mechanism — configurations enable configurations, the rate grows with accumulated substrate — operates where the substrate is preserved and is recruitable. The walls are cases where the substrate was removed faster than it accrued, which is the asymmetry-of-option-space proposition. The proposition pair describes the actual structure: a generative process and a destructive one, neither symmetric with the other, with the destructive one historically dominant often enough to make the generative one look weaker than it is at the mechanism level. The walls are evidence for the asymmetry, not against the generativity. The proposition's predictive claim already concedes that the runaway is conditional, not automatic; the walls are instances of the condition failing.

### Objection 5: Endogenous growth theory (Romer) already has this implicit; the proposition adds nothing economists do not have

Romer's endogenous growth theory (1986, 1990) is the closest standard-economics framing of the same phenomenon: knowledge is a non-rival input that accumulates over time, lowers the cost of producing further knowledge, and drives long-run growth. The mathematical machinery handles much of what the proposition describes in configurational language. A standard-economics critic can reasonably say: this is endogenous growth in physical-grounding clothes; the substantive economic content is already known.

*Response sketch:* the overlap is real and worth conceding. Romer's framework supplies a tractable formalisation of the rate-of-rate-growth property over a specific substrate (codifiable knowledge as input to production). What the proposition adds — and what endogenous growth theory does not have — is the configurational frame that makes the mechanism continuous with biology, technology, language, and institutions rather than confined to the production-function context, and the explicit pairing with `asymmetry-of-option-space-change` so the destruction side is in the same accounting. The physical grounding does not replace Romer's formal apparatus; it sits underneath it and connects it to the rest of the framework. The proposition's predictive claim is consistent with endogenous-growth predictions on the cases where they overlap. The substantive difference is that endogenous growth treats the substrate as durable in normal operation and abstracts away from substrate-removal; the proposition treats substrate-vulnerability as central. Where the two diverge — substrate collapse, civilisational discontinuity, irreversibility — the proposition has things to say that the Romer framework does not address.

---

## Voice match check

Existing — `asymmetry-of-option-space-change` (companion proposition) surface text, opening:

> Option-space change is not symmetric in time or in scale.
>
> A configuration that took millennia to assemble — a soil profile, a language community, a coral reef, a trust-bearing institution — can be dismantled in years or hours. The reverse rarely holds. The arrangements that expand future possibility are typically built slowly, through processes that integrate many small adjustments across many parts of a system. The arrangements that contract it are typically broken quickly, through processes that need only one well-placed failure.
>
> This is not a moral observation. It is a structural one.

Proposed — `configuration-generates-configuration` surface text, opening:

> Each configured arrangement makes further configurations reachable that were not reachable before.
>
> An enzyme makes a reaction accessible that chemistry alone did not provide. A notation makes a proof accessible that the same idea, unwritten, did not. A road makes a settlement accessible that geography alone did not. A standard makes an interoperation accessible that two compatible systems, unstandardised, did not.
>
> Once enough configuration has accumulated, the rate at which new configurations become reachable grows with what is already there. This is not a moral observation. It is a structural one — the same mechanism that makes destruction fast and local, run in reverse, makes expansion slow but compounding.

Same shape: declarative opening, concrete examples in apposition rather than narration, the structural claim stated as observation, the explicit "this is not a moral observation" register that the companion proposition uses. The two propositions read as a pair because they share the cadence: a structural claim, a concrete instantiation, a refusal to dramatise the consequence. The closing of the companion ("the no-regret stance is not conservatism by temperament; it is the operationally tighter rule under the asymmetry") and the closing of the proposed ("value is not stored in configurations as a stock; it is produced by configurations as a flow into the adjacent possible") both land their structural points without raising the volume.

The slight stylistic worry: the proposed proposition has more concrete examples in the opening paragraph than the companion does. The examples are doing necessary work — without them the abstract claim ("each configuration enables further configurations") reads as definitional rather than substantive — but the density might tip the register from observation toward enumeration. If Tom finds it too list-like, the fix is to keep the first two examples and drop the second two, trusting the reader to extend the pattern.

---

## Section-mapping suggestion (for if Tom promotes)

If this proposition lands, sections to consider for `SECTION_PROPOSITIONS`:
- Wherever `value-option-space` currently appears — this proposition supplies the mechanism `value-option-space` defines without.
- Wherever `asymmetry-of-option-space-change` currently appears — the pair belongs together; the destruction account and the expansion account read as one structural picture.
- Wherever `option-space-measurability` currently appears — Assembly Theory's 2023–24 forward-running reformulation is now part of the lineage for forward-looking measures, and the proposition is the natural place to surface that.
- Wherever `structural-memory` or `complexity-maintenance` currently appear — both depend on the substrate-recruitment mechanism this proposition names.

Status mapping if promoted: would land in `contested`. Current v0.7 counts (1 established / 19 derived / 8 contested / 1 open) would become 1 / 19 / 9 / 1.

---

## Judgment calls for Tom

1. **Working title.** Picked "Configuration Generates Configuration" over "The Runaway of Configuration," "Generative Asymmetry," and "Adjacent-Possible Expansion." The chosen title is the most voice-matched to the canon — declarative, structural, paired with "Asymmetry of Option-Space Change" without dramatising. "Runaway" reads as too punchy for the register; "Generative Asymmetry" is accurate but reads as paired-by-name to the companion rather than standing on its own; "Adjacent-Possible Expansion" cites Kauffman before the proposition has earned the citation. If Tom prefers a different working title the surface text and id should re-anchor to it; the substantive content survives the swap.

2. **Status: `contested` or `derived`?** I called `contested` because the strongest articulation of the structural claim (Walker / Cronin's time-emergent-from-assembly) is metaphysically contested in physics, and the standard-economics framing (Romer's endogenous growth) is empirically defensible but does not in itself license the broader configurational claim the proposition makes. `derived` would overclaim — the proposition is not a straightforward consequence of any single established claim in the canon. `contested` is the honest call. If Tom reads the structural claim as well enough supported by Kauffman + Fuller + observed cross-substrate evidence to be `derived`, that is a defensible alternative; I went with `contested` for the same reason the `value-option-space` and `viable-objective` propositions did.

3. **Walker / Cronin credit.** The lineage section accepts that CE's prior framing of Cronin as backward-only was right for 2017–2021 and no longer right for 2023–24, and credits the 2023 *Nature* paper and *Life as No One Knows It* explicitly. This is a substantive update to how the framework has been treating Assembly Theory. Tom should verify the framing is honest in both directions — that the under-credit is real and the new credit is proportionate. The proposition treats Walker and Cronin as the strongest current articulation of the structural claim, not as load-bearing for the weaker version of the proposition; that distinction matters and I want Tom to verify it lands cleanly.

4. **Pairing with `asymmetry-of-option-space-change`.** The proposition is designed to read as the destruction-side proposition's structural counterpart. The opening paragraph of the surface text explicitly mirrors the companion's opening ("this is not a moral observation; it is a structural one"). If the pairing is too on-the-nose — if it reads as imitation rather than parallelism — the fix is to soften the explicit echo and let the structural correspondence do its own work. If the pairing reads correctly, no change needed.

5. **Examples density.** Five worked examples (biological combinatorics, technology stacks, language and mathematical notation, scientific instrumentation, cultural and institutional configuration) plus a counter-pattern section on selection effects. The companion proposition had six worked examples plus a counter-examples section. Roughly the same scale. If Tom finds the examples too long for the canon's typical proposition density, the cuts that survive the structural point intact are: drop the cultural-and-institutional example (it overlaps with the technology-stacks example in mechanism) and shorten the scientific-instrumentation example to one paragraph rather than three. The biology, technology, and notation examples are load-bearing for the structural claim and should stay.

6. **Status of the strong claim.** The proposition explicitly carries Walker and Cronin's time-emergent-from-assembly view as a live development without depending on it. This is the briefed structure and I think it is right; the weaker claim is defensible and the stronger one is too contested in physics to hang the framework on. If Tom wants to lean further into the strong claim, the lineage section and the `openQuestions` layer are the places to do so. If Tom wants to lean further away from it — to mention Walker and Cronin as an adjacent development without making the strong claim visible at all — the lineage section can be shortened and the strong-claim reference in `openQuestions` removed. I went with the briefed middle position.
