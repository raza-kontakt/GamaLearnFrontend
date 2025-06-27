# GamaLearn Frontend

A modern React-based frontend application for managing educational assessments, student submissions, and tracking academic progress. This project provides an intuitive dashboard for educators to monitor student performance and manage assessment workflows.

## 🎯 Why This Project Was Made

GamaLearn Frontend was developed to address the need for a comprehensive educational management system that enables:

- **Real-time Assessment Monitoring**: Track student submissions and assessment progress in real-time
- **Multilingual Support**: Support for multiple languages (English/Arabic) to serve diverse educational environments
- **Student Performance Analytics**: Detailed insights into student engagement and assessment completion
- **Seamless Assessment Management**: Easy synchronization and management of educational assessments
- **Responsive Design**: Modern, accessible interface that works across all devices

## 🚀 How This Project Is Made

This project is built using modern web development practices and follows a component-based architecture:

### Architecture Patterns
- **Component-based Architecture**: Modular React components for maximum reusability
- **Custom Hooks**: Reusable logic for state management, data fetching, and UI interactions
- **Context API**: Global state management for authentication and user preferences
- **Query-based Data Management**: Efficient data fetching and caching with React Query
- **Type-safe Development**: Full TypeScript implementation for robust code quality

### Key Features
- 🔐 **Authentication System**: Secure login and protected routes
- 📊 **Assessment Dashboard**: Comprehensive view of all assessments and their status
- 👥 **Student Tracking**: Real-time monitoring of student submissions and progress
- 🔄 **Data Synchronization**: Seamless sync between frontend and backend systems
- 🌍 **Internationalization**: Multi-language support with react-i18next
- 📱 **Responsive Design**: Mobile-first approach with Material-UI components
- ⚡ **Performance Optimized**: Code splitting, lazy loading, and efficient rendering
- 🧪 **Comprehensive Testing**: Unit and integration tests with Jest and React Testing Library

## 🛠️ Tech Stack

### Frontend Framework & Libraries
- **React 19** - Modern React with latest features and hooks
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - Comprehensive React component library
- **Styled Components** - CSS-in-JS styling solution

### State Management & Data Fetching
- **React Query (TanStack)** - Powerful data synchronization for React
- **React Context** - Global state management for authentication
- **React Router** - Client-side routing and navigation

### Internationalization & Utilities
- **react-i18next** - Internationalization framework
- **Moment.js** - Date and time manipulation
- **Axios** - HTTP client for API requests

### Development & Testing
- **ESLint** - Code linting and quality assurance
- **Jest** - JavaScript testing framework
- **React Testing Library** - Testing utilities for React components
- **TypeScript** - Static type checking

### Build & Development Tools
- **Vite** - Next generation frontend tooling
- **TSConfig** - TypeScript configuration
- **PostCSS** - CSS post-processing

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd GamaLearnFrontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file and add your API configurations
cp .env.example .env
```

## 📜 Available Scripts

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Start development server (alternative)
npm start
```

### Build Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Testing Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality Commands

```bash
# Run ESLint to check code quality
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Type check with TypeScript
npm run type-check
```

## 🌐 Features Overview

### 📚 Assessment Management
- View and manage educational assessments
- Filter assessments by area, program, course, and status
- Real-time synchronization with backend systems
- Detailed assessment information and scheduling

### 👨‍🎓 Student Tracking
- Monitor student submission progress
- Track assessment start times and completion status
- View detailed student profiles and performance metrics
- Real-time status updates for active assessments

### 🔧 Admin Dashboard
- Comprehensive overview of all system activities
- Advanced filtering and search capabilities
- Bulk operations for assessment management
- Export capabilities for reporting

### 🌍 Multilingual Support
- Full support for English and Arabic languages
- RTL (Right-to-Left) layout support for Arabic
- Localized date/time formatting
- Cultural-appropriate UI adaptations

## 📁 Project Structure

```
src/
├── app/                    # Main application logic
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context providers
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── data-layer/        # API integration layer
│   └── locales/           # Internationalization files
├── assets/                # Static assets
└── test/                  # Test utilities and setup
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
