import axios from 'axios'
import { PredictionResponse, HealthCheckResponse } from '../types'

const API_BASE_URL = 'https://api.predictresistantibiotics.site'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data)
      
      if (error.response.status === 503) {
        throw new Error('The prediction model is not loaded. Please try again later.')
      } else if (error.response.status === 500) {
        throw new Error(error.response.data.detail || 'An error occurred during prediction.')
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request)
      throw new Error('Network error. Please check your connection and try again.')
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message)
      throw new Error('An unexpected error occurred.')
    }
    
    return Promise.reject(error)
  }
)

export async function predictResistance(epitopeSequence: string): Promise<PredictionResponse> {
  try {
    const response = await api.post<PredictionResponse>('/predict', {
      epitope_sequence: epitopeSequence.toUpperCase().replace(/[^A-Z]/g, ''),
    })
    return response.data
  } catch (error) {
    console.error('Prediction error:', error)
    throw error
  }
}

export async function checkHealth(): Promise<HealthCheckResponse> {
  try {
    const response = await api.get<HealthCheckResponse>('/health')
    return response.data
  } catch (error) {
    console.error('Health check error:', error)
    throw error
  }
}

// Retry logic for better reliability
export async function predictResistanceWithRetry(
  epitopeSequence: string,
  maxRetries: number = 3
): Promise<PredictionResponse> {
  let lastError
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await predictResistance(epitopeSequence)
    } catch (error) {
      lastError = error
      if (i < maxRetries - 1) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
      }
    }
  }
  
  throw lastError
}