// Essay 1 Section Content
// "Value under Physical Constraint" - Full text

export interface Section {
  id: string;
  content: string;
  keyPoints?: string[];  // For overview mode
}

export const SECTIONS: Section[] = [
  {
    id: 'orientation',
    keyPoints: [
      'Economics traditionally assumes scarce labour, cheap energy, and growth through extraction',
      'Those assumptions no longer hold simultaneously',
      'This essay examines what value accounting remains coherent when physics is taken seriously',
      'Value is proposed as configuration that preserves future option space under bounded energy flux',
    ],
    content: `Economics has traditionally asked a simple question: *how should scarce resources be allocated?*
For most of its history, this question rested on a set of background assumptions that rarely needed to be stated: that human labour was scarce, that energy was cheap, that material throughput correlated with value, and that growth through extraction was both possible and desirable.

Those assumptions no longer hold simultaneously.

Automation has reduced the need for human labour in many domains. Energy systems are approaching hard physical and ecological limits. The costs of complexity maintenance are rising, while the benefits of additional throughput are diminishing. At the same time, many of the activities most central to human flourishing—care, learning, coordination, meaning-making—do not map cleanly onto wage labour or conventional productivity metrics.

This essay does not propose a political programme, a welfare policy, or a new moral doctrine. It does not argue for what people *should* want, nor does it attempt to legislate values. Its purpose is more limited and more fundamental: to examine what kinds of value accounting remain coherent once physical reality is taken seriously.

The claim is simple: when the underlying constraints change, the proxies used to coordinate economic life must change with them. This essay explores what follows when value is understood not as throughput or labour, but as **configuration that preserves and expands future option space under bounded energy flux**.`,
  },
  {
    id: 'physical-envelope',
    keyPoints: [
      'Every economy operates inside physical constraints that cannot be negotiated',
      'Atoms are conserved, energy flows are bounded, entropy increases globally',
      'An economy on energy income can persist; one depleting savings cannot',
      'This is accounting, not ideology',
    ],
    content: `Every economy operates inside a physical envelope that is not subject to negotiation.

Atoms are conserved.
Energy flows are bounded.
Entropy increases globally, even where local order is temporarily created.

These facts do not prescribe how humans must live, but they strictly limit how any system of value exchange can persist over time. Economic theories that ignore this envelope may function briefly, but they accumulate hidden fragility that eventually dominates outcomes.

For most of human history, this envelope was invisible at the scale of daily life. Energy flows were small, populations limited, and the distinction between renewable income and finite savings was not sharply felt. Today, that distinction defines the economic landscape.

An economy that lives on continuous energy income can, in principle, persist indefinitely. An economy that depends on drawing down finite energy savings cannot.

This is not ideology. It is accounting.`,
  },
  {
    id: 'accounting-error',
    keyPoints: [
      'Modern economies treat energy savings (fossil fuels) as income',
      'Fossil fuels are a one-time inheritance, not a revenue stream',
      'This produces false signals of productivity and growth',
      'Growth slows because savings decline, not because of policy failure',
    ],
    content: `Modern industrial economies are built on a profound and largely unexamined accounting error: the treatment of **energy savings as income**.

Fossil fuels are not a revenue stream. They are a one-time inheritance—dense stores of energy accumulated over geological time and released over a few human generations. Treating this inheritance as ordinary income produces a false signal of productivity, abundance, and growth.

The apparent success of industrial economics is inseparable from this drawdown. Productivity gains, GDP expansion, and rising material standards of living are amplified by spending energy savings while externalising the future costs of depletion, pollution, and system maintenance.

Once this distinction is made explicit, many puzzles dissolve. Growth slows not primarily because of policy failure, but because savings decline. Productivity appears to stagnate because easy energy has already been spent. Increasing effort yields diminishing returns because complexity maintenance rises as energy inheritance shrinks.

An economy that confuses savings with income will inevitably misprice risk, undervalue durability, and overproduce activities that narrow future option space.`,
  },
  {
    id: 'throughput-proxy',
    keyPoints: [
      'In apparent abundance, throughput became an acceptable proxy for value',
      'More energy, labour, money exchanged implied more prosperity',
      'Energy surplus masked the flaws in these correlations',
      'Throughput is a cost, not a measure of success',
    ],
    content: `In a world of apparent abundance, **throughput** became an acceptable proxy for value.

More energy consumed implied more work done.
More labour hours implied more contribution.
More money exchanged implied more prosperity.

For a time, these correlations held well enough to coordinate large societies. They were never perfect, but the underlying energy surplus masked their flaws.

That masking is now gone.

Throughput is a cost, not a measure of success. It represents energy dissipated and materials transformed—necessary inputs, but not intrinsic goods. When energy savings are plentiful, wasteful configurations can persist unnoticed. When savings decline, the same configurations become destabilising.

At the same time, the most valuable human activities increasingly involve **configuration rather than throughput**: learning rather than extraction, care rather than replacement, coordination rather than production, reuse rather than disposal, meaning rather than volume.

The failure is not moral. It is categorical. Throughput-based proxies are being asked to do work they were never designed to perform.`,
  },
  {
    id: 'configuration-value',
    keyPoints: [
      'Configuration is the patterning of matter across time',
      'It distinguishes a book from paper, a skill from calories',
      'Configuration can compound without proportional energy increase',
      'Failing to recognise this undervalues learning, care, prevention, coordination',
    ],
    content: `Atoms persist.
Energy flows.
Configuration accumulates.

What distinguishes a book from paper, a skill from calories, a culture from a crowd, is not the amount of matter involved but the **patterning of matter across time**. Configuration is the arrangement of elements such that future actions become easier, richer, or more varied.

Biological evolution is the most familiar example. Over billions of years, the same atoms have been reconfigured into increasingly complex organisms, not by increasing throughput indefinitely, but by refining structures that store, transmit, and reuse information. Culture, language, science, and technology are continuations of this process by other means.

Configuration differs from throughput in three crucial ways. It can compound without proportional energy increase. It can be copied and transmitted at low marginal cost. And it can expand future option space rather than merely satisfy present demand.

An economy that fails to recognise configuration as a primary source of value will systematically undervalue learning, care, prevention, coordination, and meaning—while overvaluing extraction, churn, and short-lived production.

This is not a moral oversight. It is a measurement failure.`,
  },
  {
    id: 'configuration-not-information',
    keyPoints: [
      'Configuration is often mistaken for information or data alone',
      'It includes bodies, skills, relationships, institutions, infrastructures',
      'Configuration always has a maintenance cost and can be good or bad',
      'Valuable configuration reduces future throughput while expanding option space',
    ],
    content: `Configuration is often mistaken for information, symbols, or data. This mistake leads to a shallow optimism: the belief that digitalisation alone can resolve physical constraint.

Configuration is broader and more demanding. It includes bodies, skills, relationships, institutions, infrastructures, and ecological arrangements. It always has a **maintenance cost**, and it can be good or bad.

Some configurations are brittle, requiring continuous high throughput to sustain. Others entrench dependency, reduce autonomy, or concentrate risk. Configuration is valuable only insofar as it **reduces future throughput requirements while expanding future option space**.

There is no guarantee that configuration trends toward goodness. The distinction between productive and destructive configuration must be made explicit. Without it, societies risk replacing one form of waste with another—burning energy not on extraction, but on maintaining fragile arrangements.`,
  },
  {
    id: 'work-wrong-question',
    keyPoints: [
      'Work historically served two functions: production and access to resources',
      'Automation breaks that coincidence',
      'Many valuable activities do not map to wage labour',
      'The question becomes how to ensure participation, not how to ensure work',
    ],
    content: `For most of human history, work served two functions simultaneously: it produced necessary goods and services, and it acted as the gate through which individuals accessed resources.

As long as these functions coincided, tying survival to labour appeared natural and efficient.

That coincidence is breaking.

Automation, computation, and accumulated configuration increasingly allow societies to meet material needs with less human labour. At the same time, many of the most valuable human activities—raising children, caring for others, learning, maintaining social coherence—do not map cleanly onto wage labour or market exchange.

When access to resources remains conditional on "having a job" under these conditions, societies are forced to invent work that satisfies accounting proxies rather than real needs. The result is not productivity but performative activity: effort expended to justify entitlement rather than to expand option space.

The question, therefore, is no longer how to ensure everyone works, but how to ensure everyone remains a participant in the configuration process.`,
  },
  {
    id: 'universal-participation',
    keyPoints: [
      'Participation must be bounded honestly within physical limits',
      'No promise of unlimited consumption or infinite growth',
      'Everyone retains the right to exist, learn, care, and contribute',
      'Exclusion as a control mechanism disappears; scarcity and trade-offs remain',
    ],
    content: `If participation is foundational, it must be bounded honestly.

A stable economy cannot promise unlimited consumption, infinite growth, or unconditional abundance. It can promise access to a fair share of what the system can sustainably provide.

Universal participation means that every person retains the right to exist, learn, care, and contribute within the physical envelope defined by energy income, material limits, and ecological stability. It does not guarantee comfort, equality of outcome, or freedom from trade-offs.

Scarcity remains. Choices remain. What disappears is **exclusion as a control mechanism**—the use of deprivation as a means of coordination.

Within this baseline, differentiated contribution remains possible and desirable. Scarce, difficult, or necessary work can still be rewarded. What changes is that rewards are no longer the price of admission to life itself.

Participation is primary. Labour is instrumental.`,
  },
  {
    id: 'viable-objective',
    keyPoints: [
      'Growth as throughput collides with physical reality',
      'Growth as configuration quality changes the picture',
      'Objective: maximise durable flourishing per unit of constrained throughput',
      'Resilience, learning, care, time affluence over speed, accumulation, consumption',
    ],
    content: `When growth is measured primarily as increased throughput, it eventually collides with physical reality. When it is measured as increased configuration quality, the picture changes.

A viable economic objective under constraint is the maximisation of **durable human flourishing per unit of constrained throughput**.

This reframes success away from volume and toward qualities such as resilience rather than speed, learning rather than accumulation, care rather than replacement, time affluence rather than consumption, and option preservation rather than short-term yield.

Under this framing, many familiar trade-offs resolve themselves. Activities that burn energy savings for transient benefit are revealed as expensive. Activities that increase coherence, capability, and future possibility become central, even when they produce little measurable output.

The economy does not grow or shrink in any absolute sense. It **reorients**.`,
  },
  {
    id: 'what-replaces',
    keyPoints: [
      'Replaces: GDP as primary measure, labour as gatekeeper, throughput as progress',
      'Leaves intact: markets, trade, ambition, innovation, disagreement',
      'Configuration economics re-situates existing mechanisms within physical reality',
    ],
    content: `This framework replaces:

* GDP as a primary measure of success
* Labour as the gatekeeper of legitimacy
* Throughput growth as progress
* Energy-blind pricing and accounting

It leaves intact:

* markets as coordination tools
* trade and exchange
* ambition and differentiation
* experimentation and innovation
* disagreement about values within constraints

Configuration economics does not abolish existing mechanisms. It re-situates them within a reality they can no longer ignore.`,
  },
  {
    id: 'inevitability',
    keyPoints: [
      'This framework depends only on physics, not on agreement or virtue',
      'Societies will adopt reality-respecting accounting or burn option space',
      'The transition is not guaranteed, but the failure of throughput-blind economics is',
      'The next task is not persuasion, but accounting',
    ],
    content: `Nothing in this framework depends on universal agreement, moral enlightenment, or political virtue.

It depends only on the interaction between bounded energy income, accumulated configuration capacity, and the physics of living systems.

As old proxies fail, societies will either adopt accounting systems that respect these realities or continue to burn option space to preserve familiar categories. Both paths are available. Only one is stable.

The transition to configuration economics is not guaranteed.
But the failure of throughput-blind economics is.

If value is configuration and cost is throughput, then any serious economics must make those quantities visible. The next task, therefore, is not persuasion, but accounting.`,
  },
];

export function getSectionById(id: string): Section | undefined {
  return SECTIONS.find(s => s.id === id);
}

export function getAllSections(): Section[] {
  return SECTIONS;
}
