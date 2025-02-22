# SlimRyze Prescription Platform

A modern, secure prescription management platform built with React, TypeScript, and Supabase. This platform allows medical practitioners to manage prescriptions digitally while maintaining security and compliance standards.

## 🌟 Features

### Authentication & Authorization
- Secure practitioner signup with detailed information collection
- Email/password authentication using Supabase Auth
- Protected routes for authenticated practitioners
- Role-based access control
- Automatic profile data population
- Dialog-based sign-in and sign-up forms
- Seamless authentication flow

### Practitioner Features
- Comprehensive signup process collecting:
  - Full Name
  - License Number
  - Clinic Name
  - Clinic Address
  - Clinic Phone
  - Email (auto-populated)
- Profile management
- Prescription management dashboard
- View and manage submitted prescriptions
- Print prescriptions directly

### User Interface
- Modern, responsive design using Tailwind CSS
- Clean and intuitive navigation
- Dialog-based authentication
- Loading states and error handling
- Mobile-friendly layout
- Informative tooltips with contextual messages
- Read-only mode for guest users
- Automatic date/time updates
- HIPAA compliance notices
- Conditional UI elements based on auth state
- Profile-aware tooltip messages

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project

### Environment Setup
1. Clone the repository:
```bash
git clone https://github.com/Authority98/slimryze-prescription-platform.git
cd slimryze-prescription-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── PractitionerProfile.tsx
│   │   └── PrescriptionList.tsx
│   ├── auth/
│   │   ├── AuthContext.tsx
│   │   ├── LoginDialog.tsx
│   │   ├── SignUpDialog.tsx
│   │   ├── LoginForm.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── SignUpForm.tsx
│   ├── form-sections/
│   │   ├── FormHeader.tsx
│   │   ├── FormFooter.tsx
│   │   ├── PractitionerSection.tsx
│   │   ├── PatientSection.tsx
│   │   ├── PrescriptionSection.tsx
│   │   └── SignatureSection.tsx
│   ├── ui/
│   │   ├── form-field-tooltip.tsx
│   │   ├── dialog.tsx
│   │   └── ... other UI components
│   └── PrescriptionForm.tsx
├── lib/
│   ├── supabaseClient.ts
│   └── readOnlyStyles.ts
├── App.tsx
└── main.tsx
```

## 🔒 Security Features

- Protected routes using `PrivateRoute` component
- Secure authentication with Supabase
- Environment variables for sensitive data
- Form validation and error handling
- Secure password management

## 🔄 State Management

- React Context for auth state (`AuthContext`)
- Local state management using React hooks
- Form state handling with controlled components

## 🎨 UI/UX Features

- Consistent color scheme using Tailwind's indigo palette
- Responsive design for all screen sizes
- Interactive loading states
- Clear error messages
- Smooth transitions between auth states

## 📱 Responsive Design

The platform is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Authority98 - Initial work and maintenance

## 🙏 Acknowledgments

- Supabase for authentication and database services
- Tailwind CSS for the styling framework
- React community for the excellent ecosystem 