export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export class FormValidator {
  static validateBasicInfo(data: {
    gender: string
    age: string
    height: string
    weight: string
  }): ValidationResult {
    const errors: Record<string, string> = {}

    if (!data.gender || data.gender === "") {
      errors.gender = "Please select a gender"
    }

    const age = Number.parseInt(data.age)
    if (!data.age || isNaN(age) || age < 1 || age > 120) {
      errors.age = "Please enter a valid age (1-120)"
    }

    const height = Number.parseInt(data.height)
    if (!data.height || isNaN(height) || height < 50 || height > 250) {
      errors.height = "Please enter a valid height (50-250 cm)"
    }

    const weight = Number.parseInt(data.weight)
    if (!data.weight || isNaN(weight) || weight < 20 || weight > 300) {
      errors.weight = "Please enter a valid weight (20-300 kg)"
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  static validateConcern(data: {
    concern: string
    severity: string
    duration: string
    durationUnit: string
  }): ValidationResult {
    const errors: Record<string, string> = {}

    if (!data.concern || data.concern === "") {
      errors.concern = "Please select a concern"
    }

    if (!data.severity) {
      errors.severity = "Please select severity level"
    }

    const duration = Number.parseInt(data.duration)
    if (!data.duration || isNaN(duration) || duration < 1) {
      errors.duration = "Please enter a valid duration"
    }

    if (!data.durationUnit) {
      errors.durationUnit = "Please select duration unit"
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  static validateRescheduleReason(reason: string): ValidationResult {
    const errors: Record<string, string> = {}

    if (!reason || reason.trim() === "") {
      errors.reason = "Please select a reason for rescheduling"
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  static validateCustomReason(reason: string): ValidationResult {
    const errors: Record<string, string> = {}

    if (!reason || reason.trim() === "") {
      errors.reason = "Please enter a reason"
    } else if (reason.trim().length < 10) {
      errors.reason = "Reason must be at least 10 characters long"
    } else if (reason.trim().length > 200) {
      errors.reason = "Reason must be less than 200 characters"
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }
}
