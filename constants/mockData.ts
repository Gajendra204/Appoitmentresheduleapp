import type { Appointment, Doctor, RescheduleReason, User } from "./types"

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Deepa Godara",
    specialization: "Orthodontist",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    experience: "8+ years",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialization: "Cardiologist",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    experience: "12+ years",
  },
]

export const MOCK_USER: User = {
  id: "1",
  name: "Mayank Singh",
  phone: "81782-49347",
  email: "mayank@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  profileCompletion: 60,
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    doctor: MOCK_DOCTORS[0],
    date: "13/09/2025",
    time: "10:30 AM",
    status: "upcoming",
    type: "video",
    canJoin: true,
    duration: 30,
  },
  {
    id: "2",
    doctor: MOCK_DOCTORS[1],
    date: "13/09/2025",
    time: "10:30 AM",
    status: "upcoming",
    type: "video",
    canJoin: false,
    countdown: "Your video consultation starts in 3:52 hour",
    duration: 30,
  },
]

export const RESCHEDULE_REASONS: RescheduleReason[] = [
  {
    id: "1",
    title: "Emergency work",
    icon: "work",
    description: "Urgent work commitment",
  },
  {
    id: "2",
    title: "Financial issues",
    icon: "attach-money",
    description: "Payment related concerns",
  },
  {
    id: "3",
    title: "Scheduling conflict",
    icon: "schedule",
    description: "Time slot conflict",
  },
  {
    id: "4",
    title: "Other",
    icon: "more-horiz",
    description: "Other reasons",
  },
]
