import { describe, it, expect } from 'vitest';
import { parseSession, parseHatStance, hatRotation, rotationDefects } from './room';

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

  it('catches a model wearing the same hat in consecutive rounds', () => {
    const owned = parseSession(HATS_FILE.replace(
      '## Stance · black hat, round two — called by the conductor\n\nUnder black you may only attack.\n\n## Watson · 2026-09-06 · model: Opus',
      '## Stance · black hat, round two — called by the conductor\n\nUnder black you may only attack.\n\n## Astra · 2026-09-06 · model: Astra',
    ), { n: 0 });
    expect(rotationDefects([owned])).toEqual([
      'Astra wore the black hat in round 1 and again in round 2 — no model owns a hat',
    ]);
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
