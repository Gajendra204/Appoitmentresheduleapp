import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import type React from "react";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../components/Button";
import { MOCK_APPOINTMENTS } from "../../constants/mockData";
import {
  BORDER_RADIUS,
  COLORS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";
import { useApp } from "../../contexts/AppContext";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.text.disabled}
      keyboardType={keyboardType}
    />
  </View>
);

interface DropdownFieldProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor={COLORS.text.secondary}
      >
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  </View>
);

export default function EditBasicInfoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id);
  const { dispatch } = useApp();

  const [gender, setGender] = useState("prefer_not_to_say");
  const [age, setAge] = useState("28");
  const [height, setHeight] = useState("171");
  const [weight, setWeight] = useState("63");

  const genderOptions = [
    { label: "Prefer not to say", value: "prefer_not_to_say" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const handleConfirm = () => {
    if (!appointment) return;
    // Update the user info in global user state
    dispatch({
      type: "UPDATE_USER",
      payload: {
        gender,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
      },
    });
    router.back();
  };

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Appointment not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={COLORS.text.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Basic Info</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Doctor Info Card */}
        <View style={styles.doctorCard}>
          <Image
            source={{ uri: appointment.doctor.avatar }}
            style={styles.doctorAvatar}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>Dr. Prerna</Text>
            <Text style={styles.doctorSpecialization}>
              Gynecology + 2 others
            </Text>
            <Text style={styles.consultationType}>Instant Call - ₹ 15/min</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>
            Please confirm your basic information
          </Text>

          <DropdownField
            label="Gender"
            selectedValue={gender}
            onValueChange={setGender}
            options={genderOptions}
          />

          <InputField
            label="Age"
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
          />

          <InputField
            label="Height"
            value={height}
            onChangeText={setHeight}
            placeholder="Enter height in cms"
            keyboardType="numeric"
          />

          <InputField
            label="Weight"
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter weight in kg"
            keyboardType="numeric"
          />
        </View>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            style={styles.confirmButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  formTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
    fontWeight: "500",
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  textInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
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
  buttonContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  confirmButton: {
    width: "100%",
  },
  errorText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});
    
