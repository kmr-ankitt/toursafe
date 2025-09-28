# Emergency Alert System

## Overview

The Emergency Alert System provides a comprehensive, app-wide emergency response mechanism for the TourSafe application. It allows users to trigger emergency alerts from anywhere in the app and maintains state across all screens.

## Features

- **Global State Management**: Emergency state is managed through React Context and persists across all screens
- **Real-time Location Tracking**: Captures and sends current GPS coordinates when emergency is triggered
- **Visual Feedback**: Animated buttons with pulsing effects when emergency is active
- **Multiple Trigger Points**: Emergency alerts can be triggered from dashboard, map, or floating buttons
- **Cancellation Support**: Users can cancel false alarms
- **Confirmation Dialogs**: Prevents accidental emergency triggers

## Components

### EmergencyContext

- Manages global emergency state
- Handles location capture
- Provides trigger/cancel functions
- Simulates backend communication

### EmergencyAlert Component

- Reusable emergency button component
- Configurable size (small/medium/large)
- Configurable position (bottom-right/bottom-center/top-right/custom)
- Visual animations and status indicators
- Optional labels

## Usage

### Basic Implementation

```tsx
import { EmergencyAlert } from "../components/EmergencyAlert";
import { useEmergency } from "../contexts/EmergencyContext";

// Use the hook to access emergency state
const { isEmergencyActive, triggerEmergency, cancelEmergency } = useEmergency();

// Add floating emergency button
<EmergencyAlert position="bottom-right" size="medium" showLabel={true} />;
```

### Current Implementations

1. **Dashboard**: Large emergency button + small floating button
2. **Map Screen**: Large floating emergency button
3. **Available globally**: Through context provider

## Configuration Options

### EmergencyAlert Props

- `position`: 'bottom-right' | 'bottom-center' | 'top-right' | 'custom'
- `size`: 'small' | 'medium' | 'large'
- `showLabel`: boolean
- `style`: Custom styling (when position='custom')

### Emergency States

- `isEmergencyActive`: Boolean indicating if emergency is currently active
- `emergencyLocation`: Current GPS location when emergency was triggered
- `emergencyTimestamp`: When the emergency was triggered
- `emergencyId`: Unique identifier for the emergency session

## Backend Integration

The system is designed to integrate with:

- Emergency contact notifications
- Local authorities
- Backend logging and tracking
- Real-time location updates

_Currently uses simulated backend calls - replace `sendEmergencyAlert` function in EmergencyContext.tsx with actual API calls._

## Security Considerations

- Location permissions are requested before emergency trigger
- Confirmation dialogs prevent accidental triggers
- Emergency state is cleared when app is restarted
- Unique emergency IDs for tracking and cancellation

## Future Enhancements

- SMS/Call integration for emergency contacts
- Audio/voice recording during emergencies
- Photo capture and transmission
- Integration with local emergency services APIs
- Offline emergency mode with location caching
