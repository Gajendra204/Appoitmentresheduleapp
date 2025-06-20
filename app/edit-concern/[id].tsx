"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { MOCK_APPOINTMENTS } from "../../constants/mockData"
import { Button } from "../../components/Button"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants/theme"

interface SeverityOptionProps {
  label: string
  isSelected: boolean
  onPress: () => void
}

const SeverityOption: React.FC<SeverityOptionProps> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.severityOption, isSelected && styles.selectedSeverityOption]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.severityDot, isSelected && styles.selectedSeverityDot]} />
    <Text style={[styles.severityText, isSelected && styles.selectedSeverityText]}>{label}</Text>
  </TouchableOpacity>
)

interface DurationOptionProps {
  label: string
  value: string
  isSelected: boolean
  onPress: () => void
}

const DurationOption: React.FC<DurationOptionProps> = ({ label, value, isSelected, onPress }) => (
  <TouchableOpacity style={styles.durationOption} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.radioButton, isSelected && styles.selectedRadioButton]}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
    <Text style={[styles.durationText, isSelected && styles.selectedDurationText]}>{label}</Text>
  </TouchableOpacity>
)

export default function EditConcernScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id)

  const [concern, setConcern] = useState("diabetes")
  const [severity, setSeverity] = useState("moderate")
  const [duration, setDuration] = useState("28")
  const [durationUnit, setDurationUnit] = useState("days")

  const concernOptions = [
    { label: "Please select a concern", value: "" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Hypertension", value: "hypertension" },
    { label: "Heart Disease", value: "heart_disease" },
    { label: "Anxiety", value: "anxiety" },
    { label: "Depression", value: "depression" },
    { label: "Other", value: "other" },
  ]

  const severityOptions = [
    { label: "Mild", value: "mild" },
    { label: "Moderate", value: "moderate" },
    { label: "Severe", value: "severe" },
  ]

  const durationUnits = [
    { label: "Days", value: "days" },
    { label: "Weeks", value: "weeks" },
    { label: "Months", value: "months" },
    { label: "Year", value: "year" },
  ]

  const handleProceed = () => {
    // Save the concern info and navigate back
    router.back()
  }

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Appointment not found</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Concern</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Doctor Info Card */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: appointment.doctor.avatar }} style={styles.doctorAvatar} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>Dr. Prerna</Text>
            <Text style={styles.doctorSpecialization}>Gynecology + 2 others</Text>
            <Text style={styles.consultationType}>Instant Call - ₹ 15/min</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Concern Selection */}
          <View style={styles.inputContainer}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={concern}
                onValueChange={setConcern}
                style={styles.picker}
                dropdownIconColor={COLORS.text.secondary}
              >
                {concernOptions.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Severity Selection */}
          <View style={styles.severitySection}>
            <Text style={styles.sectionTitle}>Select severity of your concern</Text>
            <View style={styles.severityContainer}>
              {severityOptions.map((option) => (
                <SeverityOption
                  key={option.value}
                  label={option.label}
                  isSelected={severity === option.value}
                  onPress={() => setSeverity(option.value)}
                />
              ))}
            </View>
          </View>

          {/* Duration Selection */}
          <View style={styles.durationSection}>
            <Text style={styles.sectionTitle}>How long have you been facing?</Text>

            <View style={styles.durationInputContainer}>
              <TextInput
                style={styles.durationInput}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                placeholder="28"
                placeholderTextColor={COLORS.text.disabled}
              />
            </View>

            <View style={styles.durationUnitsContainer}>
              {durationUnits.map((unit) => (
                <DurationOption
                  key={unit.value}
                  label={unit.label}
                  value={unit.value}
                  isSelected={durationUnit === unit.value}
                  onPress={() => setDurationUnit(unit.value)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Proceed Button */}
        <View style={styles.buttonContainer}>
          <Button title="Proceed" onPress={handleProceed} style={styles.proceedButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
  },
  placeholder: {
    width: 32,
  },
  doctorCard: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.small,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SPACING.md,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  doctorSpecialization: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  consultationType: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
  },
  formSection: {
    margin: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  pickerContainer: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: COLORS.text.primary,
  },
  severitySection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    fontWeight: "500",
  },
  severityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  severityOption: {
    alignItems: "center",
    flex: 1,
  },
  selectedSeverityOption: {
    // Additional styling for selected state if needed
  },
  severityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.text.disabled,
    marginBottom: SPACING.xs,
  },
  selectedSeverityDot: {
    backgroundColor: COLORS.primary,
  },
  severityText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
  },
  selectedSeverityText: {
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  durationSection: {
    marginBottom: SPACING.xl,
  },
  durationInputContainer: {
    marginBottom: SPACING.md,
  },
  durationInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    textAlign: "center",
  },
  durationUnitsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  durationOption: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.text.disabled,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.xs,
  },
  selectedRadioButton: {
    borderColor: COLORS.primary,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  durationText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
  },
  selectedDurationText: {
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  buttonContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  proceedButton: {
    width: "100%",
  },
  errorText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
})
