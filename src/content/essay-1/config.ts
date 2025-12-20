// Essay 1 Configuration
// Version and metadata for "Value under Physical Constraint"

import { VERSION, BUILD } from '../../lib/version';

export const ESSAY_META = {
  id: 'essay-1',
  title: 'Value under Physical Constraint',
  version: VERSION,
  build: BUILD,
  status: 'Working Draft',
  date: 'December 2025',
  lastUpdated: '2025-12-20',
};

export type EpistemicStatus = 'established' | 'derived' | 'contested' | 'open';

export interface SectionMeta {
  id: string;
  number: string;
  title: string;
  epistemicStatus: EpistemicStatus;
  shortTitle: string;
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 'orientation',
    number: '0',
    title: 'Orientation: What This Essay Is Doing',
    shortTitle: 'Orientation',
    epistemicStatus: 'established',
  },
  {
    id: 'physical-envelope',
    number: '1',
    title: 'The Physical Envelope',
    shortTitle: 'Physical Envelope',
    epistemicStatus: 'established',
  },
  {
    id: 'accounting-error',
    number: '2',
    title: 'The Accounting Error at the Heart of Modern Growth',
    shortTitle: 'Accounting Error',
    epistemicStatus: 'derived',
  },
  {
    id: 'throughput-proxy',
    number: '3',
    title: 'Why Throughput Became a Proxy for Value — and Why It Fails Now',
    shortTitle: 'Throughput Proxy',
    epistemicStatus: 'derived',
  },
  {
    id: 'configuration-value',
    number: '4',
    title: 'Configuration as the Primary Source of Value',
    shortTitle: 'Configuration Value',
    epistemicStatus: 'derived',
  },
  {
    id: 'configuration-not-information',
    number: '4.5',
    title: 'Configuration Is Not "Information Alone"',
    shortTitle: 'Not Information Alone',
    epistemicStatus: 'contested',
  },
  {
    id: 'work-wrong-question',
    number: '5',
    title: 'Why "Work" Becomes the Wrong Question',
    shortTitle: 'Work Question',
    epistemicStatus: 'derived',
  },
  {
    id: 'universal-participation',
    number: '6',
    title: 'Universal Participation within Physical Limits',
    shortTitle: 'Universal Participation',
    epistemicStatus: 'contested',
  },
  {
    id: 'viable-objective',
    number: '7',
    title: 'Replacing Growth with a Viable Objective',
    shortTitle: 'Viable Objective',
    epistemicStatus: 'contested',
  },
  {
    id: 'what-replaces',
    number: '7.5',
    title: 'What This Framework Replaces — and What It Leaves Intact',
    shortTitle: 'What Changes',
    epistemicStatus: 'derived',
  },
  {
    id: 'inevitability',
    number: '8',
    title: 'Inevitability Revisited',
    shortTitle: 'Inevitability',
    epistemicStatus: 'open',
  },
];
