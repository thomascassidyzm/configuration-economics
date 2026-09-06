// The world computer room — the publish-time allowlist.
//
// The wall the room lives behind: CONCEPTS ARE COMPRESSIONS (derivable,
// universal, language-independent) and FACTS ARE AGREEMENTS (arbitrary,
// social, local — names, ids, paths, people, repos, prices, dates). The
// compression is the publishable half by construction. Proper nouns, paths,
// ids and numbers-with-provenance are the tells.
//
// This file is the mechanism that keeps the guard usable rather than
// switched off. Extend it in one line. Everything here is a fact that is
// ALREADY public: participants who consented to be named, thinkers whose
// books are in libraries, frameworks published on this site.
//
// THE WALL EXISTS TO STOP ESTATE FACTS LEAKING, NEVER TO STOP A CITED NAME
// OR A FOREIGN VOICE. This is not a nicety; it is a correction paid for in
// data. The proper-noun rule cannot tell a private fact from a cited author
// or a named move, and on the first pass of the carried arm that was met by
// writing AROUND the names — which rewrote a foreign model's words into this
// house's register and destroyed the very thing the control arm exists to
// measure. An outside read caught it. So: when a real name legitimately
// needs to pass, THE ALLOWLIST GROWS BY A LINE. Never a bypass, never a
// per-file exemption, never a weakened rule in the guard, and never a
// paraphrase to dodge the check.

/** Capitalised words the room may say. Matched case-sensitively, whole word. */
export const ALLOWED_PROPER_NOUNS = [
  // The participants.
  'Watson', 'RBF', 'Astra', 'Tom', 'Cassidy',
  // The model families. A FAMILY NAME IS PUBLISHABLE; the routing around it
  // is not. Which family answered a turn is what lets a reader weigh the
  // record at all — "Gemini, in a browser tab, carried by hand" can be
  // weighed and "a foreign model" cannot. Which account, which tier, which
  // effort level, which version, and how work is allocated between them are
  // the genuinely one-way facts, and the `model-version` and
  // `routing-detail` rules in the guard block them by name. So these two
  // words pass, and nothing after them does.
  'Opus', 'Gemini', 'Fable',
  // The thinkers the room stands on.
  'Buckminster', 'Fuller', 'Edward', 'de', 'Bono', 'David', 'Deutsch',
  'James', 'Carse', 'Bucky', 'Grove', 'Sinek',
  // The moves this record names. A move's name is a compression the room or
  // the far side coined and published here; it points at no private object.
  'Anchor', 'Fuse', 'Deletion', 'Test', 'Orthogonal', 'Inversion',
  'Exhumation', 'Binary', 'Ledger', 'Minimum', 'Viable', 'Witness',
  'Structured', 'Friction', 'Compliance', 'Trap', 'House', 'Register',
  'Filter', 'Layer', 'Specification',
  // The frameworks and the public objects.
  'Configuration', 'Economics', 'Distinction', 'Physics', 'AlphaGo', 'Go',
  'Assembly', 'Theory', 'Option', 'Space',
  // Ordinary capitalised English that is not a name.
  'I', 'The', 'A', 'An', 'And', 'But', 'So', 'If', 'It', 'That', 'This',
  'There', 'These', 'Those', 'What', 'When', 'Where', 'Which', 'Who', 'Why',
  'How', 'Yes', 'No', 'Not', 'Now', 'Then', 'You', 'We', 'They', 'He', 'She',
  'One', 'Two', 'Three', 'Every', 'Each', 'Both', 'Either', 'Neither',
  'Published', 'Sanitised', 'Descendant', 'Reversibility', 'Detectability',
  'Persistence', 'English',
  // Weekdays and months are agreements about time, but they carry no
  // provenance on their own and reading dates out of a public page is fine.
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

/** Hosts the room may name, because they are the public site itself. */
export const ALLOWED_HOSTS = [
  'configurationeconomics.com',
];
