
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}


export const formatTime = (timeString: string): string => {
  try {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  } catch {
    return timeString
  }
}


export const getTimeUntilAppointment = (date: string, time: string): string => {
  try {
    const appointmentDateTime = new Date(`${date} ${time}`)
    const now = new Date()
    const diffMs = appointmentDateTime.getTime() - now.getTime()

    if (diffMs <= 0) {
      return "Appointment time has passed"
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHours > 24) {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays} day${diffDays > 1 ? "s" : ""} remaining`
    }

    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m remaining`
    }

    return `${diffMinutes} minutes remaining`
  } catch {
    return "Unable to calculate time"
  }
}


export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
  return phoneRegex.test(phone)
}


export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}


export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}


export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}
