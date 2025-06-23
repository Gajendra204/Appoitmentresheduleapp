# Appointment Reschedule App

A modern, full-featured appointment booking and management app built with [Expo](https://expo.dev) and React Native. This project demonstrates a complete flow for booking, rescheduling, and cancelling appointments, including refund tracking, user profile management, and more.

## Features

- **Book Appointments:** Schedule appointments with doctors, select concerns, and choose available time slots.
- **Reschedule & Cancel:** Easily reschedule or cancel appointments with reason selection and custom input.
- **Refund Tracking:** Track refund status for cancelled appointments.
- **User Profile:** View and edit user profile, track profile completion.
- **Doctor Profiles:** View doctor details, experience, and ratings.
- **Appointment Overview:** Review and edit appointment details before confirmation.
- **Modern UI:** Clean, responsive, and accessible design with custom theming.
- **Demo Data:** Uses mock data for doctors, appointments, and users for easy testing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, for global usage)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Gajendra204/Appoitmentresheduleapp
   cd AppointmentRescheduleApp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npx expo start
   # or
   yarn expo start
   ```

4. **Run on your device:**
   - Use the QR code in your terminal or browser to open the app in [Expo Go](https://expo.dev/go) on your mobile device.
   - Or run on an emulator/simulator using:
     - `npx expo start --android`
     - `npx expo start --ios`
     - `npx expo start --web`

## Project Structure

- **/app**: All screens and navigation (file-based routing via Expo Router)
- **/components**: Reusable UI components (Button, Modals, Cards, etc.)
- **/constants**: Theme, mock data, and utility constants
- **/contexts**: Global app context (state management)
- **/hooks**: Custom React hooks for business logic
- **/services**: API simulation and business logic
- **/utils**: Validation and helper functions

## Customization

- **Theming:** Easily adjust colors, typography, and spacing in `/constants/theme.ts`.
- **Mock Data:** Update `/constants/mockData.ts` to change demo doctors, users, or appointments.
- **Navigation:** Modify `/app/_layout.tsx` and `/app/(tabs)/_layout.tsx` for navigation structure.

**Made with ❤️ using Expo, React Native, and TypeScript.**
