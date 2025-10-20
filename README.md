# RES-VA Careers Landing Page

A modern, responsive careers landing page built with React, TypeScript, Vite, and Tailwind CSS v4. This landing page features a comprehensive application form with validation, smooth animations, and an outstanding user experience.

## Features

- ✨ **Modern Design**: Clean and professional UI with subtle animations
- 📱 **Fully Responsive**: Works seamlessly on all device sizes
- ✅ **Form Validation**: Robust client-side validation for all form fields
- 🎙️ **Audio Recording**: Voice introduction recording feature with playback
- 🔥 **Firebase Storage**: Cloud storage for audio recordings
- 📧 **Formspree Integration**: Email notifications with application data
- 🎨 **Tailwind CSS v4**: Utilizes the latest Tailwind CSS features
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🔒 **Type-Safe**: Written in TypeScript for better code quality

## Components

### Main Components
- **Header**: Fixed navigation bar with smooth scrolling
- **Hero**: Eye-catching hero section with call-to-action buttons and company stats
- **WhyJoinUs**: Showcase of company values and culture
- **Benefits**: Display of employee benefits and perks
- **ApplicationForm**: Comprehensive application form with validation for:
  - Full Name
  - Email Address
  - Phone Number / WhatsApp
  - Current Location (City, Country)
  - Notice Period
  - Years of Experience
  - Voice Introduction (Audio Recording)
- **Footer**: Contact information and social media links
- **ScrollToTop**: Floating button for easy navigation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd resva-landing-page
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Formspree Configuration
# Get your endpoint from https://formspree.io/
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Storage**:
   - Go to Storage
   - Click "Get started"
   - Set up security rules as needed
4. Get your Firebase configuration:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Copy the configuration values to your `.env` file

### Formspree Setup

1. Go to [Formspree](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Copy the form endpoint (e.g., `https://formspree.io/f/xxxxxxxx`)
5. Add the endpoint to your `.env` file as `VITE_FORMSPREE_ENDPOINT`

The form will send email notifications with:
- All applicant information
- A direct link to the audio recording stored in Firebase Storage
- Submission timestamp

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Application Form Features

### Form Validation

The application form includes comprehensive validation:

- **Full Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Phone Number**: Required, valid phone format with international support
- **Location**: Required, minimum 3 characters
- **Notice Period**: Required, dropdown selection
- **Experience**: Required, dropdown selection
- **Audio Recording**: Required, 1-2 minutes voice introduction

### Audio Recording

- Record a 1-2 minute voice introduction
- Pause/resume functionality during recording
- Playback recorded audio before submission
- Maximum recording duration: 2 minutes
- Audio format: WebM
- Stored in Firebase Storage with secure access

### Data Flow

When a form is submitted:
1. Audio recording is uploaded to Firebase Storage
2. Form data is sent via Formspree email notification

### Email Notifications

Each submission sends an email via Formspree containing:
- Full Name, Email, Phone, Location
- Notice Period and Experience
- **Direct clickable link to the audio recording** (recipients can click to listen)
- Recording duration (MM:SS format)
- Submission timestamp

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Firebase Storage** - Cloud storage for audio files
- **Formspree** - Email notification service
- **Lucide React** - Icon library
- **ESLint** - Code linting

## Project Structure

```
src/
├── components/
│   ├── ApplicationForm.tsx  # Main form with audio recording
│   ├── Benefits.tsx
│   └── Hero.tsx
├── firebase/
│   └── config.ts           # Firebase Storage configuration
├── App.tsx
├── main.tsx
└── index.css
```

## Customization

### Colors
The design uses a blue color scheme based on the RES-VA brand. To customize colors, modify the Tailwind classes in the components or extend the Tailwind configuration.

### Content
All content is easily customizable within each component file. Simply edit the text, stats, benefits, or any other content to match your needs.

### Animations
Custom animations are defined in `src/index.css` and can be modified or extended as needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary to RES-VA.

## Contributing

For internal team members, please follow the standard Git workflow and create pull requests for any changes.
