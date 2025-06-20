"use client"

import { useState } from "react"

interface RescheduleData {
  appointmentId: string
  reasonId: string
  notes?: string
}

export const useReschedule = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitRescheduleRequest = async (data: RescheduleData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate random success/failure for demo
      const success = Math.random() > 0.1 // 90% success rate

      if (!success) {
        throw new Error("Failed to submit reschedule request")
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return false
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    loading,
    error,
    submitRescheduleRequest,
    clearError,
  }
}
