# BuildEstate AI Coding Instructions

## Architecture Overview

BuildEstate is a **monorepo real estate platform** with three distinct applications:
- **Backend** (`/backend`): Express.js API with AI services (Port 4000)
- **Frontend** (`/frontend`): React user interface with Framer Motion animations (Port 5173)  
- **Admin** (`/admin`): React dashboard for property management (Port 5174)

### Key Architectural Patterns

**Workspace Structure**: Root `package.json` uses npm workspaces with centralized scripts:
```bash
npm run setup    # Install all dependencies
npm run dev      # Start all 3 apps concurrently
```

**AI Integration**: Backend integrates Azure AI (`/backend/services/aiService.js`) and Firecrawl (`/backend/services/firecrawlService.js`) for property analysis and web scraping. AI responses are cached and rate-limited.

**Authentication Flow**: JWT tokens stored in localStorage, with Context API (`/frontend/src/context/AuthContext.jsx`) managing auth state across components. Backend uses middleware authentication for protected routes.

## Development Workflows

### Environment Setup
Each app requires separate `.env` files:
- Backend: MongoDB URI, JWT secret, AI API keys (Azure, Firecrawl)
- Frontend: `VITE_API_BASE_URL=http://localhost:4000`
- Admin: `VITE_BACKEND_URL=http://localhost:4000`

### API Patterns
Backend follows RESTful patterns with dedicated controllers:
- `/api/products` - Property CRUD operations
- `/api/properties/search` - AI-powered property search
- `/api/users` - Authentication and user management
- `/api/admin` - Dashboard analytics and management

### Animation Standards
Frontend uses **Framer Motion** with consistent patterns:
- `containerVariants` with `staggerChildren` for list animations
- `itemVariants` with spring transitions for individual elements
- Reusable animation objects (e.g., `floatingAnimation`, `sparkleAnimation`)
- Dark/light theme support with `motion.div` conditional styling

Example pattern from `Notfound.jsx`:
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
```

## Project-Specific Conventions

### Component Structure
- **Frontend**: Components use React 18 patterns with Context API for state
- **Error Boundaries**: `ErrorFallback.jsx` for graceful error handling
- **Route Protection**: `ProtectedRoute.jsx` wrapper for authenticated routes
- **SEO**: Structured data components (`/components/SEO/`) for schema markup

### Data Flow
- **Properties**: MongoDB → Express controllers → React components
- **AI Analysis**: User input → Firecrawl scraping → Azure AI analysis → formatted response
- **Image Management**: ImageKit integration for optimized property photos
- **Email**: Nodemailer with Brevo SMTP for appointment notifications

### Backend Middleware Stack
```javascript
// Security & performance (server.js)
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));
app.use(helmet());
app.use(compression());
app.use(trackAPIStats); // Custom analytics middleware
```

### Frontend State Management
- **Auth Context**: Global authentication state with localStorage persistence
- **API Base URL**: Centralized in `App.jsx` as `export const Backendurl`
- **Toast Notifications**: react-toastify for user feedback
- **Responsive Design**: Tailwind CSS with mobile-first approach

## Integration Points

### AI Service Dependencies
- **Azure AI**: Property analysis and recommendations (`/backend/services/aiService.js`)
- **Firecrawl**: Web scraping for real-time property data
- **Fallback Strategy**: Mock data when AI services unavailable

### Deployment Configuration
- **Containerization**: Docker configs in each app directory
- **CORS**: Configured for Vercel frontend + Render backend
- **Environment Variables**: Production values in deployment configs

### Database Schema
MongoDB models use Mongoose with validation:
- `propertymodel.js`: Core property data with image arrays
- `Usermodel.js`: User authentication and preferences  
- `appointmentModel.js`: Booking system with user/property relations

## Testing & Debugging

### Development Servers
Start individual apps for focused development:
```bash
cd backend && npm run dev    # Nodemon auto-reload
cd frontend && npm run dev   # Vite hot reload
cd admin && npm run dev      # Vite admin dashboard
```

### Common Issues
- **CORS Errors**: Update origins array in `backend/server.js`
- **AI Service Failures**: Check API keys and implement fallback responses
- **Animation Performance**: Use `transform` properties for smooth 60fps animations
- **Build Failures**: Ensure all environment variables are set for production

### API Testing
Backend includes status endpoint (`GET /status`) for health checks and error handling middleware with development stack traces.
