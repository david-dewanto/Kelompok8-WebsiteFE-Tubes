export type ResistanceStatus = 'Resistant' | 'Susceptible'

export interface Predictions {
  amikacin: ResistanceStatus
  amoxicillin: ResistanceStatus
  capreomycin: ResistanceStatus
  ciprofloxacin: ResistanceStatus
  ethambutol: ResistanceStatus
  isoniazid: ResistanceStatus
  kanamycin: ResistanceStatus
  moxifloxacin: ResistanceStatus
  pyrazinamide: ResistanceStatus
  rifampin: ResistanceStatus
  streptomycin: ResistanceStatus
}

export interface PredictionResponse {
  predictions: Predictions
}

export interface HealthCheckResponse {
  status: string
  model_loaded: boolean
}

export interface ApiError {
  detail: string
}

export interface Antibiotic {
  name: string
  key: keyof Predictions
  description: string
  class: string
  color: string
}