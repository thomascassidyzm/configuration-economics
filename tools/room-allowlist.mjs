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

/** Capitalised words the room may say. Matched case-sensitively, whole word. */
export const ALLOWED_PROPER_NOUNS = [
  // The participants.
  'Watson', 'RBF', 'Astra', 'Tom', 'Cassidy',
  // The thinkers the room stands on.
  'Buckminster', 'Fuller', 'Edward', 'de', 'Bono', 'David', 'Deutsch',
  'James', 'Carse', 'Bucky',
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
