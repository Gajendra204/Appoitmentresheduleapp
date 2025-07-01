"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

// Types
export interface User {
  id: string
  name: string
  phone: string
  email?: string
  avatar: string
  profileCompletion: number
  gender?: string
  age?: number
  height?: number
  weight?: number
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  avatar: string
  rating?: number
  experience?: string
  fee?: number
  availability?: TimeSlot[]
}

export interface TimeSlot {
  id: string
  time: string
  isAvailable: boolean
}

export interface Appointment {
  id: string
  doctor: Doctor
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled" | "rescheduled"
  type: "video" | "in-person" | "phone"
  canJoin?: boolean
  countdown?: string
  duration?: number
  notes?: string
  symptoms?: string[]
  concern?: {
    type: string
    severity: string
    duration: string
    durationUnit: string
  }
  bookingId?: string
  fee?: number
  refund?: RefundInfo
}

export interface RefundInfo {
  id: string
  appointmentId: string
  amount: number
  status: "requested" | "processing" | "completed"
  reason: string
  requestedAt: string
  processedAt?: string
  completedAt?: string
}

// State
interface AppState {
  user: User | null
  appointments: Appointment[]
  doctors: Doctor[]
  loading: boolean
  error: string | null
}

// Actions
type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "SET_APPOINTMENTS"; payload: Appointment[] }
  | { type: "ADD_APPOINTMENT"; payload: Appointment }
  | { type: "UPDATE_APPOINTMENT"; payload: { id: string; updates: Partial<Appointment> } }
  | { type: "CANCEL_APPOINTMENT"; payload: { id: string; reason: string } }
  | { type: "SET_DOCTORS"; payload: Doctor[] }
  | { type: "PROCESS_REFUND"; payload: { appointmentId: string; refund: RefundInfo } }

// Initial State
const initialState: AppState = {
  user: {
    id: "1",
    name: "Mayank Singh",
    phone: "81782-49347",
    email: "mayank@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    profileCompletion: 60,
    gender: "male",
    age: 28,
    height: 171,
    weight: 63,
  },
  appointments: [
    {
      id: "1",
      doctor: {
        id: "1",
        name: "Dr. Deepa Godara",
        specialization: "Orthodontist",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        experience: "8+ years",
        fee: 500,
      },
      date: "2024-11-19",
      time: "10:30 AM",
      status: "upcoming",
      type: "video",

      
      canJoin: true,
      duration: 30,
      bookingId: "APPL#10247816",
      fee: 500,
    },
  ],
  doctors: [
    {
      id: "1",
      name: "Dr. Deepa Godara",
      specialization: "Orthodontist",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      experience: "8+ years",
      fee: 500,
    },
  ],
  loading: false,
  error: null,
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }

    case "SET_ERROR":
      return { ...state, error: action.payload }

    case "SET_USER":
      return { ...state, user: action.payload }

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }

    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload }

    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      }

    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((apt) =>
          apt.id === action.payload.id ? { ...apt, ...action.payload.updates } : apt,
        ),
      }

    case "CANCEL_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((apt) =>
          apt.id === action.payload.id
            ? {
                ...apt,
                status: "cancelled" as const,
                refund: {
                  id: `refund_${apt.id}`,
                  appointmentId: apt.id,
                  amount: apt.fee || 0,
                  status: "requested" as const,
                  reason: action.payload.reason,
                  requestedAt: new Date().toISOString(),
                },
              }
            : apt,
        ),
      }

    case "SET_DOCTORS":
      return { ...state, doctors: action.payload }

    case "PROCESS_REFUND":
      return {
        ...state,
        appointments: state.appointments.map((apt) =>
          apt.id === action.payload.appointmentId ? { ...apt, refund: action.payload.refund } : apt,
        ),
      }

    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
