# Antibiotic Resistance Predictor Frontend

A beautiful, modern web application for predicting antibiotic resistance from epitope sequences using AI. Built with Next.js 14, TypeScript, Tailwind CSS, and featuring stunning 3D animations.

![Antibiotic Resistance Predictor](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## 🚀 Features

- **AI-Powered Predictions**: Get instant antibiotic resistance predictions for 11 different antibiotics
- **Beautiful UI/UX**: Modern, responsive design with dark mode support
- **3D Visualizations**: Interactive DNA helix animations using Three.js
- **Real-time Validation**: Instant feedback on epitope sequence input
- **Data Visualization**: Beautiful charts showing resistance profiles using Recharts
- **Educational Content**: Learn about antibiotic resistance and how the prediction works
- **Sample Sequences**: Quick-start with pre-loaded example sequences
- **Export Results**: Download predictions as CSV files
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized loading with lazy loading and code splitting

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, Three.js, Lottie
- **Charts**: Recharts
- **API Client**: Axios
- **State Management**: React Hooks
- **Theme**: next-themes
- **Icons**: React Icons
- **Toast Notifications**: react-hot-toast

## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Git

## 🏃‍♂️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/antibiotic-resistance-predictor.git
cd antibiotic-resistance-predictor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://api.predictresistantibiotics.site
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
antibiotic-resistance-predictor/
├── app/
│   ├── components/        # React components
│   │   ├── Hero.tsx      # Hero section with 3D DNA animation
│   │   ├── Navigation.tsx # Top navigation with theme toggle
│   │   ├── SequenceInput.tsx # Epitope sequence input form
│   │   ├── PredictionResults.tsx # Results visualization
│   │   ├── EducationalContent.tsx # Educational accordion
│   │   ├── FloatingParticles.tsx # Background particle animation
│   │   ├── LoadingAnimation.tsx # Loading states
│   │   └── Footer.tsx    # Footer component
│   ├── lib/              # Utility functions and API
│   │   ├── api.ts        # API client configuration
│   │   └── utils.ts      # Helper functions
│   ├── types/            # TypeScript type definitions
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # Context providers
├── public/               # Static assets
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
└── vercel.json          # Vercel deployment config
```

## 🎨 Key Features Implementation

### 1. Epitope Sequence Input
- Real-time validation with visual feedback
- Character counter
- Copy to clipboard functionality
- Sample sequences for quick testing
- Uppercase conversion and special character filtering

### 2. Prediction Results
- Overall resistance percentage calculation
- Individual antibiotic cards with status indicators
- Interactive pie chart showing resistance distribution
- Radar chart for resistance profile visualization
- CSV export functionality
- Detailed information on click

### 3. 3D DNA Animation
- WebGL-based DNA helix using Three.js
- Smooth rotation and particle effects
- Responsive and performance-optimized
- Fallback for mobile devices

### 4. Dark Mode
- System preference detection
- Smooth theme transitions
- Persistent theme selection
- Custom color schemes for both themes

### 5. Educational Content
- Accordion-style information sections
- Statistics about antibiotic resistance
- How the prediction model works
- Clinical importance

## 📊 API Integration

The app integrates with the Antibiotic Resistance Prediction API:

- **Base URL**: `https://api.predictresistantibiotics.site`
- **Main Endpoint**: `POST /predict`
- **Health Check**: `GET /health`

### Example Request:
```javascript
{
  "epitope_sequence": "ESSALAAAQAMASAAAFETA"
}
```

### Example Response:
```javascript
{
  "predictions": {
    "amikacin": "Susceptible",
    "amoxicillin": "Susceptible",
    "rifampin": "Resistant",
    // ... other antibiotics
  }
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/antibiotic-resistance-predictor)

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🎯 Performance Optimizations

- Lazy loading for heavy components
- Image optimization with Next.js Image
- Code splitting and dynamic imports
- Memoization for expensive calculations
- Debounced API calls
- Progressive enhancement
- Responsive images and animations

## 🔒 Security

- Input sanitization
- HTTPS only
- Security headers configured
- No sensitive data in client
- Rate limiting ready

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- API powered by advanced machine learning models
- UI inspiration from modern bioinformatics tools
- Three.js community for 3D visualization examples
- Next.js team for the amazing framework

## 📞 Support

For support, email support@predictresistantibiotics.site or open an issue on GitHub.

---

Built with ❤️ for the scientific community