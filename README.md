# LearnX - Online Learning Platform

A comprehensive online learning platform built with React, TypeScript, and Tailwind CSS. Features include course management, user authentication, progress tracking, gamification, and more.

## Features

- 🎓 Course discovery and enrollment
- 👤 User authentication and profiles
- 📊 Progress tracking and analytics
- 🏆 Gamification with badges and achievements
- 💬 Discussion forums and live chat
- 📱 Responsive design for all devices
- 🎯 Skill gap analysis and career recommendations
- 📄 Resume feedback and optimization
- 🔒 GDPR compliance and privacy settings
- 👨‍💼 Admin dashboard and audit logs

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: AWS Amplify

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd learnx-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Testing the Production Build

```bash
npx serve dist
```

## Deployment

### AWS Amplify

This project is configured for AWS Amplify deployment with the included `amplify.yml` file.

1. Connect your repository to AWS Amplify
2. The build will automatically use the configuration in `amplify.yml`
3. The site will be deployed from the `dist/` directory

### Manual Deployment

You can deploy the `dist/` folder to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## Project Structure

```
src/
├── components/          # React components
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles

public/
├── _redirects         # Netlify/Amplify redirects
└── index.html         # HTML template
```

## Key Components

- **Navbar**: Navigation with authentication
- **Hero**: Landing page hero section
- **SearchAndDiscovery**: Course search and filtering
- **ProgressTracker**: Learning progress visualization
- **GamificationUI**: Badges and achievements
- **AdminDashboard**: Administrative interface
- **NotFound**: 404 error page with navigation

## Features Overview

### Authentication
- Mock authentication system
- Role-based access (Student, Instructor, Admin)
- Persistent login state with localStorage

### Course Management
- Course discovery and search
- Detailed course pages
- Progress tracking
- Quiz interface
- Assignment submission

### User Experience
- Responsive design
- Dark/light theme support
- Accessibility features
- Progressive web app capabilities

### Admin Features
- User management
- Course moderation
- Analytics dashboard
- Audit logging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the repository.