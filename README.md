# 🚀 LegacyKeep Mobile App

## 📱 Overview

LegacyKeep Mobile is a cross-platform React Native application that helps families preserve and share their stories, memories, and family tree information. Built with modern technologies and following best practices for scalability, performance, and maintainability.

## 🏗️ Architecture

### **Technology Stack**
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Navigation**: React Navigation v6
- **Backend**: Spring Boot Microservices
- **Database**: PostgreSQL + MongoDB
- **Authentication**: JWT + Firebase Auth
- **Storage**: AWS S3
- **Payments**: Stripe
- **Maps**: Google Maps
- **Notifications**: Firebase Cloud Messaging

### **Project Structure**
```
legacykeep-frontend/
├── 📱 LegacyKeepMobile/          # Main React Native project
├── 📁 docs/                      # Documentation
├── 📁 scripts/                   # Build and deployment scripts
└── README.md                     # This file
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Git

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd legacykeep-frontend

# Install dependencies
cd LegacyKeepMobile
npm install

# Start the development server
npm start
```

### **Environment Setup**
1. Copy `.env.example` to `.env`
2. Configure environment variables for:
   - Firebase configuration
   - AWS S3 credentials
   - Stripe keys
   - Google Maps API key
   - Backend service URLs

## 📚 Documentation

### **Development Guidelines**
- [Development Rules](docs/DEVELOPMENT_RULES.md) - Coding principles and best practices
- [API Integration Guide](docs/API_INTEGRATION_GUIDE.md) - Backend API integration
- [Third-Party Integrations](docs/THIRD_PARTY_INTEGRATIONS.md) - Firebase, AWS, Stripe, etc.
- [Environment Configuration](docs/ENVIRONMENT_CONFIGURATION.md) - Environment management
- [UI Structure Plan](docs/UI_STRUCTURE_PLAN.md) - Comprehensive UI architecture
- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed project architecture

### **Key Features**
- **Authentication**: Email/password, phone number, social login
- **Family Tree**: Interactive family tree visualization
- **Stories**: Create, share, and preserve family stories
- **Chat**: Real-time family communication
- **Media**: Photo and video sharing with AWS S3
- **Payments**: Premium features with Stripe
- **Maps**: Location-based family member discovery

## 🧪 Testing

### **Run Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### **Test Coverage**
- **Components**: 80%+ coverage
- **Utils**: 90%+ coverage
- **Services**: 85%+ coverage
- **Critical flows**: 100% coverage

## 🚀 Deployment

### **Build Commands**
```bash
# Build for Android
npm run build:android

# Build for iOS
npm run build:ios

# Build for web
npm run build:web
```

### **Environment-Specific Builds**
- **Development**: Local development with mock services
- **QA**: Testing environment with real services
- **Staging**: Pre-production environment
- **Production**: Live environment with production services

## 🔧 Development

### **Code Quality**
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Git hooks for quality checks

### **Performance Targets**
- **Bundle Size**: < 50MB
- **App Size**: < 100MB
- **Startup Time**: < 3 seconds
- **Memory Usage**: < 150MB

### **File Size Limits**
- **Components**: 50-200 lines
- **Screens**: 150-300 lines
- **Functions**: < 20 lines
- **Files**: < 200 lines

## 🔌 Third-Party Services

### **Firebase**
- Phone authentication
- Push notifications
- Analytics
- Crashlytics

### **AWS S3**
- Media storage
- CDN for images/videos
- Secure file uploads

### **Stripe**
- Payment processing
- Subscription management
- Premium features

### **Google Maps**
- Location services
- Family member discovery
- Geocoding

## 📱 Platform Support

### **iOS**
- iOS 13.0+
- iPhone and iPad support
- Native iOS design patterns

### **Android**
- Android 8.0+ (API level 26)
- Phone and tablet support
- Material Design guidelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the development rules
4. Write tests for new features
5. Submit a pull request

### **Development Workflow**
1. **Plan**: Define the feature and its requirements
2. **Design**: Create component interfaces and types
3. **Test**: Write tests first (TDD approach)
4. **Code**: Implement following our guidelines
5. **Review**: Self-review before committing
6. **Test**: Run tests and check performance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the development guidelines

---

**Built with ❤️ for families to preserve their legacy** 🚀✨
