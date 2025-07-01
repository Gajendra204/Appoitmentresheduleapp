// Core Types for the Application
export interface Doctor {
  id: string
  name: string
  specialization: string
  avatar: string
  rating?: number
  experience?: string
}

export interface Appointment {
  id: string
  doctor: Doctor
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled" | "rescheduled"
  type: "video" | "in-person"
  canJoin?: boolean
  countdown?: string
  duration?: number
  notes?: string
  // Add concern property to match usage in edit-concern and overview screens
  concern?: {
    type: string
    severity: string
    duration: string
    durationUnit: string
  }
}

import { MaterialIcons } from "@expo/vector-icons";

export interface RescheduleReason {
  id: string
  title: string
  icon: React.ComponentProps<typeof MaterialIcons>["name"]
  description?: string
}

export interface User {
  id: string
  name: string
  phone: string
  email?: string
  avatar: string
  profileCompletion: number
}

export interface AppointmentDetails {
  id: string
  appointment: Appointment
  symptoms?: string[]
  medicalHistory?: string
  prescriptions?: Prescription[]
}

export interface Prescription {
  id: string
  medicine: string
  dosage: string
  frequency: string
  duration: string
}

// Expo Router doesn't need these navigation types, but keeping for reference
export type RootStackParamList = {
  Home: undefined
  Profile: undefined
  AppointmentDetails: { appointmentId: string }
  RescheduleReason: { appointmentId: string }
}
