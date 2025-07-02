"use client"

import { useState, useEffect } from "react"
import type { Appointment } from "../constants/types"
import { MOCK_APPOINTMENTS } from "../constants/mockData"

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setAppointments(MOCK_APPOINTMENTS)
      } catch (err) {
        setError("Failed to fetch appointments")
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const getAppointmentById = (id: string): Appointment | undefined => {
    return appointments.find((appointment) => appointment.id === id)
  }

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status } : apt)))
  }

  const refreshAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAppointments(MOCK_APPOINTMENTS)
    } catch (err) {
      setError("Failed to refresh appointments")
    } finally {
      setLoading(false)
    }
  }

  return {
    appointments,
    loading,
    error,
    getAppointmentById,
    updateAppointmentStatus,
    refreshAppointments,
  }
}
