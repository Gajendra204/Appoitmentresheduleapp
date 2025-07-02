import type { Appointment, RefundInfo } from "../contexts/AppContext"
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class AppointmentService {
  static async bookAppointment(appointmentData: {
    doctorId: string
    date: string
    time: string
    type: "video" | "phone" | "in-person"
    concern?: any
    symptoms?: string[]
    userInfo?: any
  }): Promise<Appointment> {
    await delay(2000) 
    
    if (Math.random() < 0.1) {
      throw new Error("Booking failed. Please try again.")
    }

    const newAppointment: Appointment = {
      id: `apt_${Date.now()}`,
      doctor: {
        id: appointmentData.doctorId,
        name: "Dr. Prerna",
        specialization: "Male-Female Infertility",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
        experience: "12+ years",
        fee: 500,
      },
      date: appointmentData.date,
      time: appointmentData.time,
      status: "upcoming",
      type: appointmentData.type,
      canJoin: false,
      duration: 30,
      bookingId: `APPL#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      fee: 500,
      concern: appointmentData.concern,
      symptoms: appointmentData.symptoms,
    }

    return newAppointment
  }

  static async rescheduleAppointment(
    appointmentId: string,
    newDate: string,
    newTime: string,
    reason: string,
  ): Promise<void> {
    await delay(1500)

    if (Math.random() < 0.05) {
      throw new Error("Reschedule failed. Please try again.")
    }
  }

  static async cancelAppointment(appointmentId: string, reason: string): Promise<void> {
    await delay(1000)

    if (Math.random() < 0.02) {
      throw new Error("Cancellation failed. Please try again.")
    }
  }

  static async processRefund(appointmentId: string): Promise<RefundInfo> {
    await delay(3000) // Simulate processing time

    return {
      id: `refund_${appointmentId}`,
      appointmentId,
      amount: 500,
      status: "completed",
      reason: "Appointment cancelled by doctor",
      requestedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      processedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      completedAt: new Date().toISOString(),
    }
  }

  static async getAvailableSlots(doctorId: string, date: string): Promise<string[]> {
    await delay(800)

    const morningSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"]
    const afternoonSlots = ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"]
    const eveningSlots = ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"]

    const allSlots = [...morningSlots, ...afternoonSlots, ...eveningSlots]
    return allSlots.filter(() => Math.random() > 0.3) // 70% availability
  }
}
