# From circular to helical — the same loop, with a rise

_Published live (2026-11-24); the drawing was animated and §1–§3 extended the same day. Enters at `forming`. A picture and the argument it carries: the circular economy keeps materials going round; this note asks what changes if every turn of the loop also comes back higher. It prints its strongest objections (§6) and says what it has not checked (§7). Nothing in `propositions.ts` changes because of this note; a climb there is a separate event._

_Provenance. Tom Cassidy, 2026-11-24, in conversation. His words are quoted and marked as his. Everything else is the note's own assembly and is marked [ASSEMBLER], following the convention of the canonical nodes._

---

## 1. The drawing

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 760" role="img" aria-labelledby="c2h-t c2h-d" style="display:block;width:100%;max-width:520px;margin:2rem auto;font-family:Sora,Helvetica,Arial,sans-serif"><title id="c2h-t">Linear, circular, helical</title><desc id="c2h-d">Three moving figures, one under the other. Linear: an arrow pointing diagonally upward; atoms travel up it once and fall away at the end. Circular: a closed ring; the same five atoms go round and round at the same height. Helical: a coil; the same five atoms go round and each lap is higher than the last by a little more each time, leaving the coil drawn behind them, grey at the bottom and blue at the top.</desc><style>.c2h-d{fill:#f4f4fa;offset-rotate:0deg}.c2h-l{offset-path:path('M72 205L250 92C292 66 306 120 300 196');animation:c2h-l 4s linear infinite}.c2h-c{offset-path:path('M80 345a95 50 0 1 1 190 0a95 50 0 1 1 -190 0');animation:c2h-c 4s linear infinite}.c2h-h{offset-path:path('M141.1 736.4L130.2 733.7L120.1 730.5L110.9 726.8L102.8 722.7L96.0 718.2L90.5 713.4L86.5 708.3L84.0 703.1L83.0 697.8L83.6 692.4L85.8 687.2L89.6 682.0L94.8 677.1L101.4 672.5L109.2 668.3L118.2 664.4L128.1 661.0L138.9 658.2L150.3 655.9L162.1 654.1L174.1 653.0L186.2 652.4L198.0 652.4L209.5 653.1L220.3 654.2L230.4 655.9L239.5 658.1L247.6 660.6L254.3 663.6L259.7 666.8L263.7 670.3L266.1 673.9L267.0 677.7L266.3 681.4L264.0 685.0L260.2 688.5L254.9 691.7L248.3 694.6L240.3 697.2L231.3 699.3L221.3 701.0L210.5 702.1L199.1 702.7L187.3 702.7L175.3 702.1L163.2 700.9L151.4 699.1L140.0 696.7L129.1 693.7L119.1 690.2L110.0 686.3L102.1 681.9L95.3 677.1L90.0 672.0L86.1 666.7L83.8 661.2L83.0 655.7L83.8 650.1L86.2 644.6L90.1 639.3L95.4 634.2L102.1 629.4L110.1 625.0L119.2 620.9L129.2 617.4L140.1 614.4L151.5 611.9L163.3 610.0L175.4 608.6L187.4 607.9L199.2 607.8L210.6 608.2L221.4 609.2L231.4 610.7L240.4 612.7L248.3 615.1L255.0 617.9L260.2 620.9L264.0 624.2L266.3 627.6L267.0 631.1L266.1 634.6L263.7 637.9L259.7 641.2L254.3 644.1L247.5 646.8L239.4 649.1L230.3 651.0L220.2 652.4L209.3 653.2L197.9 653.5L186.0 653.2L174.0 652.3L162.0 650.8L150.2 648.7L138.8 646.0L128.0 642.8L118.1 639.0L109.1 634.8L101.3 630.1L94.7 625.1L89.5 619.7L85.8 614.2L83.6 608.5L83.0 602.7L84.0 596.9L86.5 591.2L90.6 585.7L96.1 580.4L102.9 575.4L111.0 570.7L120.2 566.5L130.3 562.8L141.3 559.6L152.7 557.0L164.6 554.9L176.7 553.4L188.7 552.5L200.5 552.2L211.8 552.5L222.5 553.3L232.4 554.7L241.3 556.5L249.1 558.7L255.6 561.2L260.7 564.1L264.3 567.1L266.4 570.3L267.0 573.6L265.9 576.8L263.3 580.0L259.2 582.9L253.6 585.7L246.7 588.1L238.5 590.1L229.3 591.7L219.1 592.8L208.2 593.4L196.6 593.4L184.8 592.8L172.7 591.6L160.7 589.8L148.9 587.4L137.6 584.4L126.9 580.9L117.1 576.8L108.2 572.3L100.5 567.4L94.1 562.1L89.1 556.5L85.5 550.7L83.5 544.8L83.0 538.8L84.2 532.8L86.9 526.8L91.1 521.1L96.7 515.6L103.7 510.4L111.9 505.6L121.2 501.2L131.5 497.3L142.4 493.9L154.0 491.1L165.9 488.9L177.9 487.2L189.9 486.2L201.7 485.7L213.0 485.8L223.6 486.5L233.4 487.6L242.2 489.3L249.8 491.3L256.2 493.7L261.2 496.3L264.6 499.1L266.6 502.1L266.9 505.2L265.7 508.2L263.0 511.1L258.7 513.8L252.9 516.3L245.9 518.4');animation:c2h-h 15s linear infinite}.c2h-w{stroke-dasharray:1;animation:c2h-w 15s linear infinite}@keyframes c2h-l{0%{offset-distance:0%;opacity:0}8%{opacity:1}62%{opacity:1}100%{offset-distance:100%;opacity:0}}@keyframes c2h-c{from{offset-distance:0%}to{offset-distance:100%}}@keyframes c2h-h{0%{offset-distance:var(--s);opacity:0}4%{opacity:1}80.00%{offset-distance:var(--e);opacity:1}92%{offset-distance:var(--e);opacity:1}100%{offset-distance:var(--e);opacity:0}}@keyframes c2h-w{0%{stroke-dashoffset:0.7895;opacity:0}4%{opacity:1}80.00%{stroke-dashoffset:0;opacity:1}92%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}@media (prefers-reduced-motion:reduce){.c2h-d,.c2h-w{animation:none}.c2h-w{stroke-dasharray:none}.c2h-l{offset-distance:calc(12% + var(--k)*11%)}.c2h-c{offset-distance:calc(var(--k)*20%)}.c2h-h{offset-distance:var(--e)}}</style><defs><linearGradient id="c2h-g" gradientUnits="userSpaceOnUse" x1="0" y1="736" x2="0" y2="486"><stop offset="0" stop-color="#7d86a8"/><stop offset="1" stop-color="#4a9eff"/></linearGradient></defs><rect width="780" height="760" fill="#0a0a0c"/><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M72 205L250 92M222 84L252 91L240 119" stroke="#7d86a8" stroke-width="12"/><path d="M80 345a95 50 0 1 1 190 0a95 50 0 1 1 -190 0" stroke="#7d86a8" stroke-width="12"/><path d="M141.1 736.4L130.2 733.7L120.1 730.5L110.9 726.8L102.8 722.7L96.0 718.2L90.5 713.4L86.5 708.3L84.0 703.1L83.0 697.8L83.6 692.4L85.8 687.2L89.6 682.0L94.8 677.1L101.4 672.5L109.2 668.3L118.2 664.4L128.1 661.0L138.9 658.2L150.3 655.9L162.1 654.1L174.1 653.0L186.2 652.4L198.0 652.4L209.5 653.1L220.3 654.2L230.4 655.9L239.5 658.1L247.6 660.6L254.3 663.6L259.7 666.8L263.7 670.3L266.1 673.9L267.0 677.7L266.3 681.4L264.0 685.0L260.2 688.5L254.9 691.7L248.3 694.6L240.3 697.2L231.3 699.3L221.3 701.0L210.5 702.1L199.1 702.7L187.3 702.7L175.3 702.1L163.2 700.9L151.4 699.1L140.0 696.7L129.1 693.7L119.1 690.2L110.0 686.3L102.1 681.9L95.3 677.1L90.0 672.0L86.1 666.7L83.8 661.2L83.0 655.7L83.8 650.1L86.2 644.6L90.1 639.3L95.4 634.2L102.1 629.4L110.1 625.0L119.2 620.9L129.2 617.4L140.1 614.4L151.5 611.9L163.3 610.0L175.4 608.6L187.4 607.9L199.2 607.8L210.6 608.2L221.4 609.2L231.4 610.7L240.4 612.7L248.3 615.1L255.0 617.9L260.2 620.9L264.0 624.2L266.3 627.6L267.0 631.1L266.1 634.6L263.7 637.9L259.7 641.2L254.3 644.1L247.5 646.8L239.4 649.1L230.3 651.0L220.2 652.4L209.3 653.2L197.9 653.5L186.0 653.2L174.0 652.3L162.0 650.8L150.2 648.7L138.8 646.0L128.0 642.8L118.1 639.0L109.1 634.8L101.3 630.1L94.7 625.1L89.5 619.7L85.8 614.2L83.6 608.5L83.0 602.7L84.0 596.9L86.5 591.2L90.6 585.7L96.1 580.4L102.9 575.4L111.0 570.7L120.2 566.5L130.3 562.8L141.3 559.6L152.7 557.0L164.6 554.9L176.7 553.4L188.7 552.5L200.5 552.2L211.8 552.5L222.5 553.3L232.4 554.7L241.3 556.5L249.1 558.7L255.6 561.2L260.7 564.1L264.3 567.1L266.4 570.3L267.0 573.6L265.9 576.8L263.3 580.0L259.2 582.9L253.6 585.7L246.7 588.1L238.5 590.1L229.3 591.7L219.1 592.8L208.2 593.4L196.6 593.4L184.8 592.8L172.7 591.6L160.7 589.8L148.9 587.4L137.6 584.4L126.9 580.9L117.1 576.8L108.2 572.3L100.5 567.4L94.1 562.1L89.1 556.5L85.5 550.7L83.5 544.8L83.0 538.8L84.2 532.8L86.9 526.8L91.1 521.1L96.7 515.6L103.7 510.4L111.9 505.6L121.2 501.2L131.5 497.3L142.4 493.9L154.0 491.1L165.9 488.9L177.9 487.2L189.9 486.2L201.7 485.7L213.0 485.8L223.6 486.5L233.4 487.6L242.2 489.3L249.8 491.3L256.2 493.7L261.2 496.3L264.6 499.1L266.6 502.1L266.9 505.2L265.7 508.2L263.0 511.1L258.7 513.8L252.9 516.3L245.9 518.4" stroke="#7d86a8" stroke-width="12" opacity="0.16"/><path class="c2h-w" d="M141.1 736.4L130.2 733.7L120.1 730.5L110.9 726.8L102.8 722.7L96.0 718.2L90.5 713.4L86.5 708.3L84.0 703.1L83.0 697.8L83.6 692.4L85.8 687.2L89.6 682.0L94.8 677.1L101.4 672.5L109.2 668.3L118.2 664.4L128.1 661.0L138.9 658.2L150.3 655.9L162.1 654.1L174.1 653.0L186.2 652.4L198.0 652.4L209.5 653.1L220.3 654.2L230.4 655.9L239.5 658.1L247.6 660.6L254.3 663.6L259.7 666.8L263.7 670.3L266.1 673.9L267.0 677.7L266.3 681.4L264.0 685.0L260.2 688.5L254.9 691.7L248.3 694.6L240.3 697.2L231.3 699.3L221.3 701.0L210.5 702.1L199.1 702.7L187.3 702.7L175.3 702.1L163.2 700.9L151.4 699.1L140.0 696.7L129.1 693.7L119.1 690.2L110.0 686.3L102.1 681.9L95.3 677.1L90.0 672.0L86.1 666.7L83.8 661.2L83.0 655.7L83.8 650.1L86.2 644.6L90.1 639.3L95.4 634.2L102.1 629.4L110.1 625.0L119.2 620.9L129.2 617.4L140.1 614.4L151.5 611.9L163.3 610.0L175.4 608.6L187.4 607.9L199.2 607.8L210.6 608.2L221.4 609.2L231.4 610.7L240.4 612.7L248.3 615.1L255.0 617.9L260.2 620.9L264.0 624.2L266.3 627.6L267.0 631.1L266.1 634.6L263.7 637.9L259.7 641.2L254.3 644.1L247.5 646.8L239.4 649.1L230.3 651.0L220.2 652.4L209.3 653.2L197.9 653.5L186.0 653.2L174.0 652.3L162.0 650.8L150.2 648.7L138.8 646.0L128.0 642.8L118.1 639.0L109.1 634.8L101.3 630.1L94.7 625.1L89.5 619.7L85.8 614.2L83.6 608.5L83.0 602.7L84.0 596.9L86.5 591.2L90.6 585.7L96.1 580.4L102.9 575.4L111.0 570.7L120.2 566.5L130.3 562.8L141.3 559.6L152.7 557.0L164.6 554.9L176.7 553.4L188.7 552.5L200.5 552.2L211.8 552.5L222.5 553.3L232.4 554.7L241.3 556.5L249.1 558.7L255.6 561.2L260.7 564.1L264.3 567.1L266.4 570.3L267.0 573.6L265.9 576.8L263.3 580.0L259.2 582.9L253.6 585.7L246.7 588.1L238.5 590.1L229.3 591.7L219.1 592.8L208.2 593.4L196.6 593.4L184.8 592.8L172.7 591.6L160.7 589.8L148.9 587.4L137.6 584.4L126.9 580.9L117.1 576.8L108.2 572.3L100.5 567.4L94.1 562.1L89.1 556.5L85.5 550.7L83.5 544.8L83.0 538.8L84.2 532.8L86.9 526.8L91.1 521.1L96.7 515.6L103.7 510.4L111.9 505.6L121.2 501.2L131.5 497.3L142.4 493.9L154.0 491.1L165.9 488.9L177.9 487.2L189.9 486.2L201.7 485.7L213.0 485.8L223.6 486.5L233.4 487.6L242.2 489.3L249.8 491.3L256.2 493.7L261.2 496.3L264.6 499.1L266.6 502.1L266.9 505.2L265.7 508.2L263.0 511.1L258.7 513.8L252.9 516.3L245.9 518.4" pathLength="1" stroke="url(#c2h-g)" stroke-width="12"/></g><circle class="c2h-d c2h-l" r="8" style="--k:0;animation-delay:-0.00s"/><circle class="c2h-d c2h-l" r="8" style="--k:1;animation-delay:-0.80s"/><circle class="c2h-d c2h-l" r="8" style="--k:2;animation-delay:-1.60s"/><circle class="c2h-d c2h-l" r="8" style="--k:3;animation-delay:-2.40s"/><circle class="c2h-d c2h-l" r="8" style="--k:4;animation-delay:-3.20s"/><circle class="c2h-d c2h-c" r="8" style="--k:0;animation-delay:-0.00s"/><circle class="c2h-d c2h-c" r="8" style="--k:1;animation-delay:-0.80s"/><circle class="c2h-d c2h-c" r="8" style="--k:2;animation-delay:-1.60s"/><circle class="c2h-d c2h-c" r="8" style="--k:3;animation-delay:-2.40s"/><circle class="c2h-d c2h-c" r="8" style="--k:4;animation-delay:-3.20s"/><circle class="c2h-d c2h-h" r="8" style="--s:21.05%;--e:100.00%"/><circle class="c2h-d c2h-h" r="8" style="--s:15.79%;--e:94.74%"/><circle class="c2h-d c2h-h" r="8" style="--s:10.53%;--e:89.47%"/><circle class="c2h-d c2h-h" r="8" style="--s:5.26%;--e:84.21%"/><circle class="c2h-d c2h-h" r="8" style="--s:0.00%;--e:78.95%"/><text x="340" y="140" font-size="30" font-weight="500" fill="#e8e8f0">linear</text><text x="340" y="178" font-size="22" fill="#a0a0b8">upward, used once</text><text x="340" y="338" font-size="30" font-weight="500" fill="#e8e8f0">circular</text><text x="340" y="376" font-size="22" fill="#a0a0b8">reused, no higher</text><text x="340" y="588" font-size="30" font-weight="500" fill="#4a9eff">helical</text><text x="340" y="626" font-size="22" fill="#a0a0b8">both: materials round, know-how up</text></svg>

[ASSEMBLER] Three shapes, moving. On each one the white dots are atoms.

- **Linear.** The arrow points diagonally upward, because linear growth is supposed to go up. The atoms travel along it once and fall away at the end, so new ones are always needed.
- **Circular.** The same five atoms go round and round. Nothing is lost, and the ring stays at the same height.
- **Helical.** The same five atoms go round at the same speed as on the ring, and each lap is higher than the last. The coil drawn behind them is what has been learned so far. The turns are not evenly spaced: each rises a little more than the one before, because a helix with equal steps would be a staircase, and a staircase is linear. (`configuration-generates-configuration`, contested, is the claim that the rise compounds. Real climbs are also uneven, with turns that barely lift and turns that leap; the drawing shows only the widening.)

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
