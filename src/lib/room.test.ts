import { describe, it, expect } from 'vitest';
import { parseSession, parseHatStance, hatRotation, rotationDefects, conductorCadence, panelDefects } from './room';

// The model name belongs to the TURN, as of that turn's stamp — never to a
// participant as a standing label. These are the tests for that: a name is
// parsed per turn, it can change mid-transcript without the record lying,
// and a turn that records none says none rather than inheriting one.
const FILE = `---
id: 1
title: An exchange
opened: 2026-09-06
state: closed
---

## The house side · 2026-09-06 · model: Opus · carried by hand

The opening prompt.

## The far side · 2026-09-06 · model: Gemini · carried by hand · about an hour later

The reply.

## The house side · 2027-01-04 · model: Something Else · carried by hand

A year later, behind the same seat.

## Watson · 2026-09-06

A turn with no model recorded.
`;

describe('per-turn model', () => {
  const session = parseSession(FILE, { n: 0 });

  it('reads the model out of the heading, per turn', () => {
    expect(session.turns.map(t => t.model)).toEqual(['Opus', 'Gemini', 'Something Else', null]);
  });

  it('keeps the model out of the note, so the transport stays readable', () => {
    expect(session.turns[1].note).toBe('carried by hand · about an hour later');
    expect(session.turns[0].note).toBe('carried by hand');
  });

  it('lets one speaker carry different models at different stamps', () => {
    const house = session.turns.filter(t => t.speaker === 'The house side');
    expect(house.map(t => [t.stamp, t.model])).toEqual([
      ['2026-09-06', 'Opus'],
      ['2027-01-04', 'Something Else'],
    ]);
  });

  it('records no model rather than inheriting the previous turn’s', () => {
    expect(session.turns[3].model).toBeNull();
  });
});

// The hat rotation. A hat is a called stance — no new schema, no picker — so
// these tests read the rotation back out of the record the same way a reader
// would, and prove the defect report fires on the thing it exists to catch:
// a model that owns a hat.
const HATS_FILE = `---
id: 2
title: A session with hats
opened: 2026-09-06
state: closed
---

## Stance · black hat, round one — called by the conductor

Under black you may only attack.

## Astra · 2026-09-06 · model: Astra

An attack.

## Stance ends · black hat, round one

It attacked.

## Stance · green hat, round one — called by the conductor

Under green you may only generate.

## Watson · 2026-09-06 · model: Opus

A leap.

## Stance ends · green hat, round one

It leapt.

## Stance · black hat, round two — called by the conductor

Under black you may only attack.

## Watson · 2026-09-06 · model: Opus

Another attack.

## Stance ends · black hat, round two

## Stance · how might we — called by the selector

Not a hat at all.

## Watson · 2026-09-06 · model: Opus

An ordinary turn under an ordinary stance.

## Stance ends · how might we
`;

describe('hat rotation', () => {
  const session = parseSession(HATS_FILE, { n: 0 });

  it('reads a hat and its round out of the stance name', () => {
    expect(parseHatStance('black hat, round two')).toEqual({ hat: 'black', round: 2 });
    expect(parseHatStance('Green hat, round 3')).toEqual({ hat: 'green', round: 3 });
    expect(parseHatStance('red hat')).toEqual({ hat: 'red', round: null });
  });

  it('does not mistake an ordinary stance for a hat', () => {
    expect(parseHatStance('how might we')).toBeNull();
    expect(parseHatStance('black on the numbers')).toBeNull();
  });

  it('reports who wore which hat in which round', () => {
    expect(hatRotation([session]).map(w => [w.round, w.hat, w.model])).toEqual([
      [1, 'black', 'Astra'],
      [1, 'green', 'Opus'],
      [2, 'black', 'Opus'],
    ]);
  });

  it('leaves ordinary stances out of the rotation entirely', () => {
    expect(hatRotation([session]).some(w => w.hat === undefined)).toBe(false);
    expect(hatRotation([session])).toHaveLength(3);
  });

  it('passes a rotation that actually rotated', () => {
    expect(rotationDefects([session])).toEqual([]);
  });

  // The whole room wears one hat at a time, so there is no per-model
  // assignment and nothing to rotate. A model in the same hat two rounds
  // running is ordinary, and the check that used to fail it is gone.
  it('does not fail a model for wearing one hat in consecutive rounds', () => {
    const owned = parseSession(HATS_FILE.replace(
      '## Stance · black hat, round two — called by the conductor\n\nUnder black you may only attack.\n\n## Watson · 2026-09-06 · model: Opus',
      '## Stance · black hat, round two — called by the conductor\n\nUnder black you may only attack.\n\n## Astra · 2026-09-06 · model: Astra',
    ), { n: 0 });
    expect(rotationDefects([owned])).toEqual([]);
  });

  // The whole room in one hat: many models, many turns, one stance.
  it('reads a whole room under one hat', () => {
    const together = parseSession(`---
id: 6
title: The room in green
---

## Stance · green hat, round one — called by Blue

Everyone in it at once.

## Watson · 2026-09-06 · model: Opus

A leap.

## Astra · 2026-09-06 · model: Astra

Another leap.

## 環 RBF · 2026-09-06 · model: Fable

A third.

## Stance ends · green hat, round one
`, { n: 0 });
    expect(hatRotation([together]).map(w => [w.round, w.hat, w.model])).toEqual([
      [1, 'green', 'Opus'],
      [1, 'green', 'Astra'],
      [1, 'green', 'Fable'],
    ]);
    expect(rotationDefects([together])).toEqual([]);
  });

  it('catches a hat turn that records no model', () => {
    const anon = parseSession(HATS_FILE.replace('## Astra · 2026-09-06 · model: Astra', '## Astra · 2026-09-06'), { n: 0 });
    expect(rotationDefects([anon])).toContain(
      'the black hat turn by Astra records no model, so the rotation cannot be read there',
    );
  });

  it('catches a hat that was called and never worn', () => {
    const empty = parseSession(`---
id: 3
title: An empty hat
---

## Stance · red hat, round one — called by the conductor

Nobody said anything.

## Stance ends · red hat, round one
`, { n: 0 });
    expect(rotationDefects([empty])).toEqual([
      'the stance "red hat, round one" was called and no turn was taken under it',
    ]);
  });
});

// Added after session 002 published with two hats left open. A hat is a
// refusal with a timer on it, and a refusal nobody ends is not a refusal.
describe('an unclosed hat', () => {
  const FILE = `---
id: 4
title: A hat left on
---

## Stance · yellow hat, round one — called by the conductor

Under yellow you may only build the case.

## Yellow · 2026-09-06 · model: Opus

A case.

## Stance · black hat, round two — called by the conductor

Under black you may only attack.

## Black · 2026-09-06 · model: Astra

An attack.

## Stance ends · black hat, round two
`;
  const session = parseSession(FILE, { n: 0 });

  it('still reads the rotation across the unclosed stance', () => {
    expect(hatRotation([session]).map(w => [w.round, w.hat, w.model])).toEqual([
      [1, 'yellow', 'Opus'],
      [2, 'black', 'Astra'],
    ]);
  });

  it('reports the hat the room left on', () => {
    expect(rotationDefects([session])).toEqual([
      'the stance "yellow hat, round one" was never closed — the room left a hat on',
    ]);
  });
});

// The conductor calls one hat at a time, live, or it timetabled the round.
// The difference is visible in the record — a live call leaves a conductor's
// turn in front of every hat — so the page can say which it was rather than
// letting a reader assume.
describe('conductor cadence', () => {
  const hat = (name: string, speaker: string, model: string) =>
    `## Stance · ${name} — called by Blue\n\nThe refusal.\n\n## ${speaker} · 2026-09-06 · model: ${model}\n\nA turn.\n\n## Stance ends · ${name}\n\nIt ran.\n\n`;
  const call = '## Blue · 2026-09-06 · model: Fable\n\nWhy this hat now.\n\n';
  const head = '---\nid: 5\ntitle: A session\n---\n\n';

  it('reads a live call in front of every hat', () => {
    const s = parseSession(
      head + call + hat('white hat, round one', 'White', 'Opus') +
             call + hat('black hat, round one', 'Black', 'Astra'), { n: 0 });
    expect(conductorCadence(s)).toEqual({ hats: 2, called: 2, cadence: 'live' });
  });

  it('reads a timetabled round as scheduled, not conducted', () => {
    const s = parseSession(
      head + call + hat('white hat, round one', 'White', 'Opus') +
                    hat('black hat, round one', 'Black', 'Astra') +
                    hat('green hat, round one', 'Green', 'Fable'), { n: 0 });
    expect(conductorCadence(s)).toEqual({ hats: 3, called: 1, cadence: 'mixed' });
  });

  it('does not count a conductor wearing a hat as a call', () => {
    const s = parseSession(
      head + hat('red hat, round one', 'Blue', 'Fable') +
             hat('black hat, round one', 'Black', 'Astra'), { n: 0 });
    expect(conductorCadence(s)).toEqual({ hats: 2, called: 0, cadence: 'scheduled' });
  });

  it('says nothing about a session that ran no hats', () => {
    const s = parseSession(head + '## Watson · 2026-09-06 · model: Opus\n\nA turn.\n', { n: 0 });
    expect(conductorCadence(s)).toEqual({ hats: 0, called: 0, cadence: 'none' });
  });
});

// The panel is sequenced and the hats are improvised: once each, in the
// announced order, with the starting position shifted by one for each new hat
// so that speaking last is not always the same agent's advantage.
describe('the panel takes its turns', () => {
  const build = (hats: [string, string[]][]) => parseSession(
    `---\nid: 7\ntitle: A panel\npanel: Opus, Astra, Fable\n---\n\n` +
    hats.map(([name, models]) =>
      `## Stance · ${name} — called by Blue\n\nThe refusal.\n\n` +
      models.map(m => `## ${m} · 2026-09-06 · model: ${m}\n\nA turn.\n`).join('\n') +
      `\n## Stance ends · ${name}\n`).join('\n'),
    { n: 0 });

  it('reads the panel off the frontmatter, in the announced order', () => {
    expect(build([['green hat', ['Opus', 'Astra', 'Fable']]]).panel).toEqual(['Opus', 'Astra', 'Fable']);
  });

  it('passes a panel that shifts its start by one for each new hat', () => {
    expect(panelDefects(build([
      ['green hat', ['Opus', 'Astra', 'Fable']],
      ['black hat', ['Astra', 'Fable', 'Opus']],
      ['red hat', ['Fable', 'Opus', 'Astra']],
      ['white hat', ['Opus', 'Astra', 'Fable']],
    ]))).toEqual([]);
  });

  it('catches a hat that did not shift the start', () => {
    expect(panelDefects(build([
      ['green hat', ['Opus', 'Astra', 'Fable']],
      ['black hat', ['Opus', 'Astra', 'Fable']],
    ]))).toEqual([
      'under "black hat" the panel spoke Opus, Astra, Fable — the announced order, started one place on for this hat, is Astra, Fable, Opus',
    ]);
  });

  it('catches a skip, because there is no pass and no skip', () => {
    expect(panelDefects(build([['green hat', ['Opus', 'Fable']]]))).toEqual([
      'under "green hat" the panel of 3 spoke 2 times — the panel speaks once each, with no pass and no skip',
    ]);
  });

  it('catches a voice that is not on the panel', () => {
    expect(panelDefects(build([['green hat', ['Opus', 'Astra', 'Gemini']]]))).toEqual([
      'under "green hat" the speakers were Opus, Astra, Gemini, which is not the announced panel Opus, Astra, Fable',
    ]);
  });

  it('says nothing about a session that ran before the rule', () => {
    const old = parseSession(`---\nid: 8\ntitle: No panel\n---\n\n## Stance · green hat — called by Blue\n\nThe refusal.\n\n## Watson · 2026-09-06 · model: Opus\n\nA turn.\n\n## Stance ends · green hat\n`, { n: 0 });
    expect(old.panel).toEqual([]);
    expect(panelDefects(old)).toEqual([]);
  });
});
