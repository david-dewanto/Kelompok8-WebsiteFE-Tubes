import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateSequence(sequence: string): { isValid: boolean; error?: string } {
  if (!sequence || sequence.length === 0) {
    return { isValid: false, error: 'Please enter a sequence' }
  }

  const cleanSequence = sequence.toUpperCase().replace(/\s/g, '')
  const validChars = /^[ACDEFGHIKLMNPQRSTVWY]+$/

  if (!validChars.test(cleanSequence)) {
    return {
      isValid: false,
      error: 'Sequence contains invalid characters. Only standard amino acid letters are allowed.',
    }
  }

  if (cleanSequence.length < 5) {
    return {
      isValid: false,
      error: 'Sequence is too short. Please enter at least 5 amino acids.',
    }
  }

  if (cleanSequence.length > 5000) {
    return {
      isValid: false,
      error: 'Sequence is too long. Maximum length is 5000 amino acids.',
    }
  }

  return { isValid: true }
}

export const sampleSequences = [
  {
    name: 'Mycobacterium tuberculosis Fragment',
    sequence: 'LANAYNDTRRKVVPPEEIAANREER',
    description: 'TB pathogen sequence linked to multi-drug resistance mechanisms',
  },
  {
    name: 'MRSA Efflux Pump Domain',
    sequence: 'DRYRHLVALSITDFGAAGPRSSWRA',
    description: 'Methicillin-resistant Staphylococcus aureus drug transport region',
  },
  {
    name: 'E. coli Regulatory Sequence',
    sequence: 'FPVVTHDEVLRLVGRRRLWGRG',
    description: 'Pathogenic E. coli sequence controlling resistance gene expression',
  },
  {
    name: 'Pneumonia Pathogen Fragment',
    sequence: 'EQRRRAARVARNPRTGETVK',
    description: 'Streptococcus pneumoniae cell wall component sequence',
  },
]

export const antibioticInfo = [
  {
    key: 'amikacin',
    name: 'Amikacin',
    class: 'Aminoglycoside',
    description: 'Broad-spectrum antibiotic used for serious infections',
    color: 'blue',
  },
  {
    key: 'amoxicillin',
    name: 'Amoxicillin',
    class: 'Beta-lactam',
    description: 'Common antibiotic for various bacterial infections',
    color: 'green',
  },
  {
    key: 'capreomycin',
    name: 'Capreomycin',
    class: 'Polypeptide',
    description: 'Used to treat tuberculosis',
    color: 'purple',
  },
  {
    key: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    class: 'Fluoroquinolone',
    description: 'Broad-spectrum antibiotic',
    color: 'orange',
  },
  {
    key: 'ethambutol',
    name: 'Ethambutol',
    class: 'Antimycobacterial',
    description: 'First-line treatment for tuberculosis',
    color: 'teal',
  },
  {
    key: 'isoniazid',
    name: 'Isoniazid',
    class: 'Antimycobacterial',
    description: 'Primary treatment for tuberculosis',
    color: 'indigo',
  },
  {
    key: 'kanamycin',
    name: 'Kanamycin',
    class: 'Aminoglycoside',
    description: 'Used for serious bacterial infections',
    color: 'pink',
  },
  {
    key: 'moxifloxacin',
    name: 'Moxifloxacin',
    class: 'Fluoroquinolone',
    description: 'Fourth-generation fluoroquinolone',
    color: 'yellow',
  },
  {
    key: 'pyrazinamide',
    name: 'Pyrazinamide',
    class: 'Antimycobacterial',
    description: 'Essential tuberculosis medication',
    color: 'red',
  },
  {
    key: 'rifampin',
    name: 'Rifampin',
    class: 'Rifamycin',
    description: 'Key antibiotic for tuberculosis treatment',
    color: 'amber',
  },
  {
    key: 'streptomycin',
    name: 'Streptomycin',
    class: 'Aminoglycoside',
    description: 'First antibiotic effective against tuberculosis',
    color: 'cyan',
  },
]

export function formatSequence(sequence: string): string {
  return sequence.toUpperCase().replace(/[^A-Z]/g, '')
}

export function getResistanceColor(status: 'Resistant' | 'Susceptible'): string {
  return status === 'Resistant' ? 'danger' : 'accent'
}

export function calculateResistancePercentage(predictions: any): number {
  const values = Object.values(predictions)
  const resistantCount = values.filter((status) => status === 'Resistant').length
  return Math.round((resistantCount / values.length) * 100)
}