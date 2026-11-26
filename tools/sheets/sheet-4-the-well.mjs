// Sheet 4, the well: a full well with the lid on is not the same as water to drink.
// Held value is not reachable value: it can exist, be owned and be counted, and still reach nobody.
// Propositions held-value-not-reachable (forming) and coordination-bounds-reachability;
// the journal-paywall specimen (src/content/open/NOTES-journal-paywall-specimen.md) is one case of it.
import { B, T, soft, gold, lead, titleBlock, sheet } from './kit.mjs';

const tb = titleBlock(4, 'the well');
const G = 620, cx = 300, L = 160, R = 440;
// above ground: the wall, a few bricks, the lid with its padlock, the bucket turned over on top
const wall = `<path d="M${L} 486V${G}M${R} 486V${G}"/><path d="M${L} ${G - 4}Q${cx} ${G + 34} ${R} ${G - 4}" stroke-width="2.4"/>` +
  `<path d="M${L} 546Q${cx} 578 ${R} 546M${L} 584Q${cx} 616 ${R} 584" stroke-width="2" stroke="${B.soft}"/>` +
  `<path d="M206 ${560}V${596}M268 ${566}V${602}M332 ${566}V${602}M394 ${560}V${596}M236 ${524}V${556}M300 ${528}V${564}M364 ${524}V${556}" stroke-width="2" stroke="${B.soft}"/>`;
const lid = `<ellipse cx="${cx}" cy="472" rx="150" ry="30"/><path d="M150 472V486Q${cx} 530 450 486V472" />` +
  `<path d="M290 510Q290 496 300 496Q310 496 310 510" stroke-width="2.6"/><path d="M286 510H314V534H286Z" stroke-width="2.6"/><circle cx="300" cy="521" r="3" stroke-width="2"/>`;
const frame = `<path d="M186 452V352M414 452V352"/><path d="M146 354L300 262L454 354Z"/><path d="M186 384H414M414 384H436V406" stroke-width="3"/>` +
  `<path d="M262 374V394M274 374V394M286 374V394M298 374V394M310 374V394M322 374V394M334 374V394" stroke-width="2" stroke="${B.soft}"/>`;
const bucket = `<path d="M276 410H324L336 458H264Z" stroke-width="2.6"/><path d="M268 452Q300 476 332 452" stroke-width="2" stroke="${B.soft}"/>`;
// below ground: the shaft and the water at the bottom
let w1 = `M${L + 6} 812`, w2 = `M${L + 6} 842`, w3 = `M${L + 6} 872`;
for (let x = L + 6; x < R - 10; x += 24) { w1 += ' q6 -7 12 0 t12 0'; w2 += ' q6 -6 12 0 t12 0'; w3 += ' q6 -6 12 0 t12 0'; }
const shaft = `<path d="M${L} ${G + 14}V904H${R}V${G + 14}"/><path d="${w1}" stroke-width="2.6"/><path d="${w2}" stroke="${B.soft}" stroke-width="2"/><path d="${w3}" stroke="${B.soft}" stroke-width="2"/>`;
// the sign on its stake
const sign = `<path d="M540 ${G}V580"/><path d="M486 540H594V580H486Z" stroke-width="2.6"/>`;
// someone with a cup
const person = `<circle cx="696" cy="442" r="15"/><path d="M696 458V558M696 558L674 ${G}M696 558L718 ${G}M696 486L640 504M696 486L720 530"/>` +
  `<path d="M616 490H640L636 518H620Z" stroke-width="2.6"/>`;
// the way the water would go: up the well, out past the lid, into the cup (gold, dashed, because it does not)
const reach = `<path d="M398 806C404 740 404 640 404 500C404 440 470 420 540 430C590 440 618 462 626 484" stroke="${B.sun}" stroke-dasharray="12 11"/>`;
// the fire bucket, kept full on purpose
const fire = `<path d="M70 1046H124L116 1096Q97 1106 78 1096Z" stroke-width="2.6"/><path d="M72 1046Q97 1016 122 1046" stroke-width="2"/><path d="M60 1016H134" stroke-width="2" stroke="${B.soft}"/><path d="M97 1016V1030" stroke-width="2" stroke="${B.soft}"/>`;

export default sheet({
  title: 'Blueprint sheet 4, the well: a full well with the lid on is not the same as water to drink',
  seed: 5,
  strokes: `<path d="M44 ${G}H${L - 6}M${R + 6} ${G}H736"/>` + frame + wall + lid + bucket + shaft + sign + person + reach +
    lead([[90, 290], [96, 420], [152, 476]]) +
    lead([[470, 684], [500, 640], [520, 582]]) +
    lead([[590, 352], [580, 400], [560, 432]]) +
    lead([[470, 852], [440, 846], [380, 846]]) +
    fire + tb.strokes,
  text: T(50, 78, 'A FULL WELL WITH THE LID ON', 40) + T(50, 112, 'is not the same as water to drink', 25, soft) +
    T(50, 190, 'THE LID', 22) + T(50, 218, 'kept shut. it could be a', 19) + T(50, 242, 'lock, a price, a rule, or', 19) + T(50, 266, 'nobody’s job to open it.', 19) +
    T(494, 566, '1,000 buckets', 15) +
    T(478, 690, 'THE COUNT', 22) + T(478, 718, 'says 1,000 buckets.', 19) + T(478, 742, 'it is true. nobody', 19) + T(478, 766, 'has had one.', 19) +
    T(560, 300, 'WHAT IT IS FOR', 22, gold) + T(560, 326, 'getting to someone', 19, gold) +
    T(478, 830, 'THE WATER', 22) + T(478, 858, 'real, clean, and', 19) + T(478, 882, 'plenty of it.', 19) + T(478, 920, 'one name for this:', 17, soft) + T(478, 942, 'frozen value', 17, soft) +
    T(50, 984, 'NOT ALL KEEPING IS FROZEN', 19, soft) +
    T(150, 1040, 'THE FIRE BUCKET', 20) + T(150, 1066, 'kept full on purpose,', 18) + T(150, 1090, 'for a bad day.', 18) +
    T(50, 1140, 'that is held for someone.', 18, soft) + T(50, 1164, 'telling the two apart', 18, soft) + T(50, 1188, 'is the hard part.', 18, soft) +
    tb.text,
});
