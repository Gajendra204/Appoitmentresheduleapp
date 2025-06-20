"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { Button } from "./Button"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../constants/theme"

interface OtherReasonModalProps {
  visible: boolean
  onClose: () => void
  onSave: (reason: string) => void
}

export const OtherReasonModal: React.FC<OtherReasonModalProps> = ({ visible, onClose, onSave }) => {
  const [reason, setReason] = useState("")

  const handleSave = () => {
    if (reason.trim()) {
      onSave(reason.trim())
      setReason("")
    }
  }

  const handleCancel = () => {
    setReason("")
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Other</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={COLORS.text.secondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Let the doctor know why you're cancelling</Text>
          <TextInput
            style={styles.textInput}
            value={reason}
            onChangeText={setReason}
            placeholder="Power cut"
            placeholderTextColor={COLORS.text.disabled}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={styles.actions}>
            <Button title="Cancel" variant="outline" onPress={handleCancel} style={styles.cancelButton} />
            <Button title="Save" onPress={handleSave} disabled={!reason.trim()} style={styles.saveButton} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.md,
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    width: "100%",
    maxWidth: 400,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    minHeight: 100,
    marginBottom: SPACING.lg,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
})
