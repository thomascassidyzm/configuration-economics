# From circular to helical — the same loop, with a rise

_Published live (2026-11-24); the drawing was animated and §1–§3 extended the same day. Enters at `forming`. A picture and the argument it carries: the circular economy keeps materials going round; this note asks what changes if every turn of the loop also comes back higher. It prints its strongest objections (§6) and says what it has not checked (§7). Nothing in `propositions.ts` changes because of this note; a climb there is a separate event._

_Provenance. Tom Cassidy, 2026-11-24, in conversation. His words are quoted and marked as his. Everything else is the note's own assembly and is marked [ASSEMBLER], following the convention of the canonical nodes._

---

## 1. The drawing

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 760" role="img" aria-labelledby="c2h-t c2h-d" style="display:block;width:100%;max-width:520px;margin:2rem auto;font-family:Sora,Helvetica,Arial,sans-serif"><title id="c2h-t">Linear, circular, helical</title><desc id="c2h-d">Three moving figures, one under the other. Linear: an arrow pointing diagonally upward; atoms travel up it once and fall away at the end. Circular: a closed ring; the same five atoms go round and round at the same height. Helical: a coil; the same five atoms go round and each lap is higher than the last, leaving the coil drawn behind them, grey at the bottom and blue at the top.</desc><style>.c2h-d{fill:#f4f4fa;offset-rotate:0deg}.c2h-l{offset-path:path('M72 205L250 92C292 66 306 120 300 196');animation:c2h-l 4s linear infinite}.c2h-c{offset-path:path('M80 345a95 50 0 1 1 190 0a95 50 0 1 1 -190 0');animation:c2h-c 4s linear infinite}.c2h-h{offset-path:path('M141.1 735.1L130.2 732.0L120.1 728.4L110.9 724.3L102.8 719.8L96.0 714.9L90.5 709.7L86.5 704.2L84.0 698.6L83.0 692.9L83.6 687.2L85.8 681.6L89.6 676.1L94.8 670.8L101.4 665.9L109.2 661.3L118.2 657.1L128.1 653.3L138.9 650.1L150.3 647.5L162.1 645.4L174.1 644.0L186.2 643.1L198.0 642.8L209.5 643.1L220.3 644.0L230.4 645.4L239.5 647.2L247.6 649.5L254.3 652.2L259.7 655.2L263.7 658.4L266.1 661.7L267.0 665.2L266.3 668.6L264.0 672.0L260.2 675.2L254.9 678.2L248.3 680.9L240.3 683.2L231.3 685.1L221.3 686.6L210.5 687.5L199.1 687.9L187.3 687.6L175.3 686.8L163.2 685.4L151.4 683.4L140.0 680.8L129.1 677.7L119.1 674.0L110.0 669.8L102.1 665.3L95.3 660.3L90.0 655.1L86.1 649.6L83.8 644.0L83.0 638.3L83.8 632.6L86.2 627.0L90.1 621.5L95.4 616.3L102.1 611.4L110.1 606.8L119.2 602.6L129.2 599.0L140.1 595.8L151.5 593.3L163.3 591.3L175.4 589.8L187.4 589.0L199.2 588.8L210.6 589.2L221.4 590.1L231.4 591.6L240.4 593.5L248.3 595.8L255.0 598.5L260.2 601.5L264.0 604.7L266.3 608.1L267.0 611.5L266.1 615.0L263.7 618.3L259.7 621.5L254.3 624.5L247.5 627.2L239.4 629.5L230.3 631.3L220.2 632.7L209.3 633.6L197.9 633.9L186.0 633.6L174.0 632.7L162.0 631.2L150.2 629.2L138.8 626.5L128.0 623.3L118.1 619.6L109.1 615.4L101.3 610.8L94.7 605.8L89.5 600.5L85.8 595.0L83.6 589.4L83.0 583.7L84.0 578.0L86.5 572.4L90.6 567.0L96.1 561.8L102.9 556.9L111.0 552.3L120.2 548.2L130.3 544.6L141.3 541.5L152.7 539.0L164.6 537.1L176.7 535.7L188.7 535.0L200.5 534.8L211.8 535.3L222.5 536.2L232.4 537.7L241.3 539.7L249.1 542.1L255.6 544.8L260.7 547.8L264.3 551.1L266.4 554.5L267.0 557.9L265.9 561.3L263.3 564.7L259.2 567.9L253.6 570.8L246.7 573.4L238.5 575.7L229.3 577.5L219.1 578.8L208.2 579.6L196.6 579.9L184.8 579.5L172.7 578.6L160.7 577.0L148.9 574.9L137.6 572.2L126.9 568.9L117.1 565.2L108.2 560.9L100.5 556.3L94.1 551.3L89.1 546.0L85.5 540.5L83.5 534.8L83.0 529.1L84.2 523.4L86.9 517.8L91.1 512.4L96.7 507.2L103.7 502.4L111.9 497.9L121.2 493.8L131.5 490.3L142.4 487.3L154.0 484.8L165.9 482.9L177.9 481.6L189.9 480.9L201.7 480.9L213.0 481.3L223.6 482.4L233.4 483.9L242.2 485.9L249.8 488.3L256.2 491.1L261.2 494.2L264.6 497.4L266.6 500.8L266.9 504.3L265.7 507.7L263.0 511.0L258.7 514.2L252.9 517.1L245.9 519.7');animation:c2h-h 15s linear infinite}.c2h-w{stroke-dasharray:1;animation:c2h-w 15s linear infinite}@keyframes c2h-l{0%{offset-distance:0%;opacity:0}8%{opacity:1}62%{opacity:1}100%{offset-distance:100%;opacity:0}}@keyframes c2h-c{from{offset-distance:0%}to{offset-distance:100%}}@keyframes c2h-h{0%{offset-distance:var(--s);opacity:0}4%{opacity:1}80.00%{offset-distance:var(--e);opacity:1}92%{offset-distance:var(--e);opacity:1}100%{offset-distance:var(--e);opacity:0}}@keyframes c2h-w{0%{stroke-dashoffset:0.7895;opacity:0}4%{opacity:1}80.00%{stroke-dashoffset:0;opacity:1}92%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}@media (prefers-reduced-motion:reduce){.c2h-d,.c2h-w{animation:none}.c2h-w{stroke-dasharray:none}.c2h-l{offset-distance:calc(12% + var(--k)*11%)}.c2h-c{offset-distance:calc(var(--k)*20%)}.c2h-h{offset-distance:var(--e)}}</style><defs><linearGradient id="c2h-g" gradientUnits="userSpaceOnUse" x1="0" y1="735" x2="0" y2="481"><stop offset="0" stop-color="#7d86a8"/><stop offset="1" stop-color="#4a9eff"/></linearGradient></defs><rect width="780" height="760" fill="#0a0a0c"/><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M72 205L250 92M222 84L252 91L240 119" stroke="#7d86a8" stroke-width="12"/><path d="M80 345a95 50 0 1 1 190 0a95 50 0 1 1 -190 0" stroke="#7d86a8" stroke-width="12"/><path d="M141.1 735.1L130.2 732.0L120.1 728.4L110.9 724.3L102.8 719.8L96.0 714.9L90.5 709.7L86.5 704.2L84.0 698.6L83.0 692.9L83.6 687.2L85.8 681.6L89.6 676.1L94.8 670.8L101.4 665.9L109.2 661.3L118.2 657.1L128.1 653.3L138.9 650.1L150.3 647.5L162.1 645.4L174.1 644.0L186.2 643.1L198.0 642.8L209.5 643.1L220.3 644.0L230.4 645.4L239.5 647.2L247.6 649.5L254.3 652.2L259.7 655.2L263.7 658.4L266.1 661.7L267.0 665.2L266.3 668.6L264.0 672.0L260.2 675.2L254.9 678.2L248.3 680.9L240.3 683.2L231.3 685.1L221.3 686.6L210.5 687.5L199.1 687.9L187.3 687.6L175.3 686.8L163.2 685.4L151.4 683.4L140.0 680.8L129.1 677.7L119.1 674.0L110.0 669.8L102.1 665.3L95.3 660.3L90.0 655.1L86.1 649.6L83.8 644.0L83.0 638.3L83.8 632.6L86.2 627.0L90.1 621.5L95.4 616.3L102.1 611.4L110.1 606.8L119.2 602.6L129.2 599.0L140.1 595.8L151.5 593.3L163.3 591.3L175.4 589.8L187.4 589.0L199.2 588.8L210.6 589.2L221.4 590.1L231.4 591.6L240.4 593.5L248.3 595.8L255.0 598.5L260.2 601.5L264.0 604.7L266.3 608.1L267.0 611.5L266.1 615.0L263.7 618.3L259.7 621.5L254.3 624.5L247.5 627.2L239.4 629.5L230.3 631.3L220.2 632.7L209.3 633.6L197.9 633.9L186.0 633.6L174.0 632.7L162.0 631.2L150.2 629.2L138.8 626.5L128.0 623.3L118.1 619.6L109.1 615.4L101.3 610.8L94.7 605.8L89.5 600.5L85.8 595.0L83.6 589.4L83.0 583.7L84.0 578.0L86.5 572.4L90.6 567.0L96.1 561.8L102.9 556.9L111.0 552.3L120.2 548.2L130.3 544.6L141.3 541.5L152.7 539.0L164.6 537.1L176.7 535.7L188.7 535.0L200.5 534.8L211.8 535.3L222.5 536.2L232.4 537.7L241.3 539.7L249.1 542.1L255.6 544.8L260.7 547.8L264.3 551.1L266.4 554.5L267.0 557.9L265.9 561.3L263.3 564.7L259.2 567.9L253.6 570.8L246.7 573.4L238.5 575.7L229.3 577.5L219.1 578.8L208.2 579.6L196.6 579.9L184.8 579.5L172.7 578.6L160.7 577.0L148.9 574.9L137.6 572.2L126.9 568.9L117.1 565.2L108.2 560.9L100.5 556.3L94.1 551.3L89.1 546.0L85.5 540.5L83.5 534.8L83.0 529.1L84.2 523.4L86.9 517.8L91.1 512.4L96.7 507.2L103.7 502.4L111.9 497.9L121.2 493.8L131.5 490.3L142.4 487.3L154.0 484.8L165.9 482.9L177.9 481.6L189.9 480.9L201.7 480.9L213.0 481.3L223.6 482.4L233.4 483.9L242.2 485.9L249.8 488.3L256.2 491.1L261.2 494.2L264.6 497.4L266.6 500.8L266.9 504.3L265.7 507.7L263.0 511.0L258.7 514.2L252.9 517.1L245.9 519.7" stroke="#7d86a8" stroke-width="12" opacity="0.16"/><path class="c2h-w" d="M141.1 735.1L130.2 732.0L120.1 728.4L110.9 724.3L102.8 719.8L96.0 714.9L90.5 709.7L86.5 704.2L84.0 698.6L83.0 692.9L83.6 687.2L85.8 681.6L89.6 676.1L94.8 670.8L101.4 665.9L109.2 661.3L118.2 657.1L128.1 653.3L138.9 650.1L150.3 647.5L162.1 645.4L174.1 644.0L186.2 643.1L198.0 642.8L209.5 643.1L220.3 644.0L230.4 645.4L239.5 647.2L247.6 649.5L254.3 652.2L259.7 655.2L263.7 658.4L266.1 661.7L267.0 665.2L266.3 668.6L264.0 672.0L260.2 675.2L254.9 678.2L248.3 680.9L240.3 683.2L231.3 685.1L221.3 686.6L210.5 687.5L199.1 687.9L187.3 687.6L175.3 686.8L163.2 685.4L151.4 683.4L140.0 680.8L129.1 677.7L119.1 674.0L110.0 669.8L102.1 665.3L95.3 660.3L90.0 655.1L86.1 649.6L83.8 644.0L83.0 638.3L83.8 632.6L86.2 627.0L90.1 621.5L95.4 616.3L102.1 611.4L110.1 606.8L119.2 602.6L129.2 599.0L140.1 595.8L151.5 593.3L163.3 591.3L175.4 589.8L187.4 589.0L199.2 588.8L210.6 589.2L221.4 590.1L231.4 591.6L240.4 593.5L248.3 595.8L255.0 598.5L260.2 601.5L264.0 604.7L266.3 608.1L267.0 611.5L266.1 615.0L263.7 618.3L259.7 621.5L254.3 624.5L247.5 627.2L239.4 629.5L230.3 631.3L220.2 632.7L209.3 633.6L197.9 633.9L186.0 633.6L174.0 632.7L162.0 631.2L150.2 629.2L138.8 626.5L128.0 623.3L118.1 619.6L109.1 615.4L101.3 610.8L94.7 605.8L89.5 600.5L85.8 595.0L83.6 589.4L83.0 583.7L84.0 578.0L86.5 572.4L90.6 567.0L96.1 561.8L102.9 556.9L111.0 552.3L120.2 548.2L130.3 544.6L141.3 541.5L152.7 539.0L164.6 537.1L176.7 535.7L188.7 535.0L200.5 534.8L211.8 535.3L222.5 536.2L232.4 537.7L241.3 539.7L249.1 542.1L255.6 544.8L260.7 547.8L264.3 551.1L266.4 554.5L267.0 557.9L265.9 561.3L263.3 564.7L259.2 567.9L253.6 570.8L246.7 573.4L238.5 575.7L229.3 577.5L219.1 578.8L208.2 579.6L196.6 579.9L184.8 579.5L172.7 578.6L160.7 577.0L148.9 574.9L137.6 572.2L126.9 568.9L117.1 565.2L108.2 560.9L100.5 556.3L94.1 551.3L89.1 546.0L85.5 540.5L83.5 534.8L83.0 529.1L84.2 523.4L86.9 517.8L91.1 512.4L96.7 507.2L103.7 502.4L111.9 497.9L121.2 493.8L131.5 490.3L142.4 487.3L154.0 484.8L165.9 482.9L177.9 481.6L189.9 480.9L201.7 480.9L213.0 481.3L223.6 482.4L233.4 483.9L242.2 485.9L249.8 488.3L256.2 491.1L261.2 494.2L264.6 497.4L266.6 500.8L266.9 504.3L265.7 507.7L263.0 511.0L258.7 514.2L252.9 517.1L245.9 519.7" pathLength="1" stroke="url(#c2h-g)" stroke-width="12"/></g><circle class="c2h-d c2h-l" r="8" style="--k:0;animation-delay:-0.00s"/><circle class="c2h-d c2h-l" r="8" style="--k:1;animation-delay:-0.80s"/><circle class="c2h-d c2h-l" r="8" style="--k:2;animation-delay:-1.60s"/><circle class="c2h-d c2h-l" r="8" style="--k:3;animation-delay:-2.40s"/><circle class="c2h-d c2h-l" r="8" style="--k:4;animation-delay:-3.20s"/><circle class="c2h-d c2h-c" r="8" style="--k:0;animation-delay:-0.00s"/><circle class="c2h-d c2h-c" r="8" style="--k:1;animation-delay:-0.80s"/><circle class="c2h-d c2h-c" r="8" style="--k:2;animation-delay:-1.60s"/><circle class="c2h-d c2h-c" r="8" style="--k:3;animation-delay:-2.40s"/><circle class="c2h-d c2h-c" r="8" style="--k:4;animation-delay:-3.20s"/><circle class="c2h-d c2h-h" r="8" style="--s:21.05%;--e:100.00%"/><circle class="c2h-d c2h-h" r="8" style="--s:15.79%;--e:94.74%"/><circle class="c2h-d c2h-h" r="8" style="--s:10.53%;--e:89.47%"/><circle class="c2h-d c2h-h" r="8" style="--s:5.26%;--e:84.21%"/><circle class="c2h-d c2h-h" r="8" style="--s:0.00%;--e:78.95%"/><text x="340" y="140" font-size="30" font-weight="500" fill="#e8e8f0">linear</text><text x="340" y="178" font-size="22" fill="#a0a0b8">upward, used once</text><text x="340" y="338" font-size="30" font-weight="500" fill="#e8e8f0">circular</text><text x="340" y="376" font-size="22" fill="#a0a0b8">reused, no higher</text><text x="340" y="588" font-size="30" font-weight="500" fill="#4a9eff">helical</text><text x="340" y="626" font-size="22" fill="#a0a0b8">both: materials round, know-how up</text></svg>

[ASSEMBLER] Three shapes, moving. On each one the white dots are atoms.

- **Linear.** The arrow points diagonally upward, because linear growth is supposed to go up. The atoms travel along it once and fall away at the end, so new ones are always needed.
- **Circular.** The same five atoms go round and round. Nothing is lost, and the ring stays at the same height.
- **Helical.** The same five atoms go round at the same speed as on the ring, and each lap is higher than the last. The coil drawn behind them is what has been learned so far.

The captions beside each shape are the assembler's, drawn from Tom's words in §2; they are not yet his wording. With reduced motion switched on, the figure is still.

---

## 2. The premise, in Tom's words

Tom, 2026-11-24:

> "each turn is a new configuration of atoms"
>
> "the daily solar flux is just a constant thing"
>
> "the new configurations are the result of wisdom, pattern spotting, imagination, creativity etc, technology used well"
>
> "The whole global estate of atoms is constant"
>
> "It's always in a configuration state - the current one"
>
> "same atoms x constant solar flux x pattern intelligence = better configurations"

And on what the picture is for:

> "I kind of want the idea of parlaying the circular economy into a helical one. With value increasing in every materials loop, every project success and so on"

And on how the three shapes relate:

> "Linear is supposedly upward … Circular is expressly about reuse … Helical is both. Looping the materials onwards and upwards in terms of know how"

His own example was the phone in his hand and the network behind it: "The atoms were all in the ground."

---

## 3. What the helix adds to the circle

[ASSEMBLER] Take the three shapes one at a time.

- **Linear.** There is no loop. Atoms are dug up, used once and scattered. What the line does have is a direction: it is meant to go up.
- **Circular.** The loop closes. The atoms come back round. But a circle returns to exactly where it began: it keeps what there is, and the shape itself has nowhere to put improvement.
- **Helical.** Both at once, in Tom's phrase. It keeps the loop of the circle and the upward direction of the line. Seen from above, a helix *is* a circle: the same atoms, going round. Seen from the side, it climbs. The loop is closed in atoms and open in value.

So the helix is not a third thing set against the other two. It takes what each of them is right about. The line is right that things should get better; it is wrong about what has to be spent to get there. The circle is right that the atoms must come back; it has no place for getting better. What climbs on the helix is know-how, not tonnage.

"Closed in atoms and open in value" is the premise of §2 restated as geometry. The plan view is the fixed estate of atoms. The rise is what pattern intelligence adds on each pass. The sun is not in the middle of the loop (that would make it an orbit); it is the constant that shines on the whole thing.

A turn does not have to be a recycling loop. In Tom's phrasing it is "every materials loop, every project success and so on": any pass that ends with the same matter in a new arrangement. The Ogwen application already on this site is written in turns for the same reason (`NOTES-dna-economy-ogwen`).

---

## 4. The rise per turn is where selection lives

[ASSEMBLER] A helix has a pitch: how far it rises in one turn. That gives the framework's ethics a place in the picture.

- A pitch of zero is the circle. Everything is kept, nothing is gained.
- A positive pitch is a loop that ends with more reachable than it began with.
- A negative pitch is possible too. A coil can wind downward: each pass leaves less reachable than the last.

CE says ethics is selection over configurations. On this drawing, that selection is the choice of pitch, made again at every turn.

One caution from this site's own record. `NOTES-recursive-fitness-and-bridge-test` warns against reading this as "leave the campsite better than you found it", which it calls single-decision thinking at a scale where local virtue is a rounding error. The helix is the stronger version only if the pitch is judged trajectory-long (as `NOTES-razor-blade-case` argues), and only if the method that chooses the pitch is itself improving. `configuration-generates-configuration` (contested) is the proposition that says why the pitch might grow: each configuration makes further ones reachable.

---

## 5. Fuller

Tom, 2026-11-24, on Buckminster Fuller's "doing more with less" (ephemeralisation): it "is the same thing", and it "is good. But it's an understatement and it's incomplete".

[ASSEMBLER] One reading of why, offered as the assembler's and not as his:

- **Understatement.** "More with less" describes efficiency: the same job with fewer atoms. A phone is not a more efficient heap of ore. It does things that were not possible at all. And the premise here does not say *less*; it says *the same* atoms.
- **Incomplete.** The phrase has no direction. More harm can be done with less, too. Fuller supplied the direction separately, in his statement of purpose; the phrase alone does not carry it. On the drawing, direction is the sign of the pitch.

---

## 6. The strongest objections

[ASSEMBLER]

**1. The circular economy already says this.** The Ellen MacArthur Foundation gives three principles: "eliminate waste and pollution, circulate products and materials (at their highest value), and regenerate nature" ([overview](https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview), fetched 2026-11-24). "At their highest value" and "regenerate" are both more than going round in a circle, so drawing the circular economy as a flat ring is partly a caricature. The honest difference is narrower than the picture suggests: circularity counts materials kept in use at the value they have; CE counts what becomes reachable that was not before. Whether that is a new idea or a change of emphasis is open.

**2. The vertical axis is not measured.** The drawing has an up. CE's central open problem (`option-space-measurability`, status `open`) is that nobody can yet measure option space. Until that moves, "higher" on this picture is asserted, not read off an instrument. A helix with no scale on its axis could be anybody's idea of progress.

**3. Real loops leak.** The drawing has the same radius on every turn, as if nothing were lost. In practice recycling loses material and quality on each pass, and every turn spends energy. The phone that serves as the example was made by a great deal of mining, with costs that landed on other people and places (`displaced-costs`). "The atoms were all in the ground" is true, and so is the fact that many of them are now dispersed where nothing can gather them again.

**4. Higher for whom?** A turn can raise what is reachable for one group and lower it for another (`asymmetry-of-option-space-change`). One coil with one height hides that.

**5. "Constant" is an approximation.** Earth is very nearly closed to matter, not perfectly: meteoric dust arrives, light gases escape, and radioactive decay turns some atoms into others. The sun's output varies a little over its cycle and drifts over geological time. None of this touches the argument at human timescales, but "nobody can disagree" is only earned if the note says so first.

**6. The shape can be misread.** With the sun in the middle the drawing reads as an orbit (Tom's objection to an earlier sketch, and the reason the sun is not in it). Drawn with many turns it reads as a mechanical spring, which stores a push and gives it back. And "circular economy" and "Configuration Economics" share an abbreviation.

---

## 7. What this note does and does not show

[ASSEMBLER]

- **It shows** a way to state the premise of §2 in one picture that sits next to a picture people already know.
- **It does not show** that any real loop has a positive pitch. That needs a worked case with a measured before and after. The Ogwen turns are described, not measured.
- **Not checked:** the history of spiral and helix diagrams in ecological and circular-economy writing. Others have very likely drawn an "upward spiral" before; this note has not searched for them and claims no priority.
- **Not settled:** the wording under each shape, and whether a small coil can serve as a mark for the whole work.
