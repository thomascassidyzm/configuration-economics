import { describe, it, expect } from 'vitest';
import { parseSession } from './room';

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
