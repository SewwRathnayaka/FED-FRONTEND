# E-Commerce Frontend Application

## Overview
A modern, fully responsive React-based frontend for an e-commerce platform with comprehensive features including mobile-first design, real-time cart management, secure payments, and admin capabilities.

## 🚀 Key Features

### 🛍️ Core E-Commerce Features
- **Product Browsing & Filtering** - Browse products with category filtering and search
- **Shopping Cart Management** - Add, remove, and update items with real-time updates
- **User Authentication** - Secure login/signup with Clerk authentication
- **Order Processing** - Complete order flow with order tracking
- **Admin Dashboard** - Product management and order oversight
- **Payment Integration** - Secure Stripe checkout with embedded payment forms

### 📱 Mobile-First Design
- **Fully Responsive** - Optimized for all screen sizes (mobile, tablet, desktop)
- **Touch-Friendly Interface** - Mobile-optimized navigation and interactions
- **Adaptive Layouts** - Dynamic grid systems and component sizing
- **Mobile Navigation** - Hamburger menu with smooth animations

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Modern backdrop blur effects and transparency
- **Smooth Animations** - Hover effects and transition animations
- **Loading States** - Skeleton loaders and loading indicators
- **Error Handling** - User-friendly error messages and fallbacks

## 🛠️ Tech Stack

### Core Technologies
- **React.js 18** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with RTK Query for API calls
- **React Router DOM** - Client-side routing and navigation
- **TypeScript** - Type-safe development (configuration ready)

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework with responsive design
- **Lucide React** - Modern icon library
- **Custom Components** - Reusable UI components with shadcn/ui base

### Authentication & Payments
- **Clerk Authentication** - Secure user authentication and session management
- **Stripe** - Payment processing with embedded checkout
- **React Hook Form** - Form validation and management

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   ├── Navigation.jsx   # Main navigation with mobile menu
│   ├── CartItem.jsx     # Individual cart item component
│   └── ImageUpload.jsx  # Image upload component
├── pages/               # Route components
│   ├── home/            # Homepage components
│   │   ├── Hero.jsx     # Hero section with responsive design
│   │   ├── Products.jsx # Product listing with filtering
│   │   └── ProductCard.jsx # Individual product card
│   ├── shop/            # Shop page with advanced filtering
│   ├── cart.page.jsx    # Shopping cart page
│   ├── checkout.page.jsx # Checkout process
│   ├── payment.page.jsx # Payment processing
│   └── admin/           # Admin-only pages
├── layouts/             # Layout components
│   ├── Protected.jsx    # Authentication wrapper
│   ├── AdminProtected.jsx # Admin access wrapper
│   └── main.layout.jsx  # Main app layout
├── lib/                 # Utilities and configurations
│   ├── api.js          # API configuration
│   ├── store.js        # Redux store setup
│   └── utils.js        # Helper functions
└── store/              # Redux state management
    └── api/            # RTK Query API slices
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Clerk account for authentication
- Stripe account for payments

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd FED-FRONTEND
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
# Clerk Authentication
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# API Configuration
REACT_APP_API_URL=http://localhost:5000

# Stripe Payments
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile (< 640px)**: Single column layouts, hamburger navigation
- **Tablet (640px - 1024px)**: Two-column grids, expanded navigation
- **Desktop (> 1024px)**: Multi-column layouts, full navigation

### Key Responsive Features
- Dynamic grid systems (1-4 columns based on screen size)
- Responsive typography with fluid scaling
- Touch-friendly button sizes and spacing
- Horizontal scrolling for category tabs on mobile
- Adaptive image sizing and aspect ratios

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Navigation
- Responsive navigation bar with mobile hamburger menu
- Cart indicator with real-time quantity updates
- User authentication status display

### Product Management
- Product cards with hover effects and animations
- Category filtering with horizontal scroll on mobile
- Search and sorting capabilities
- Skeleton loading states

### Shopping Cart
- Real-time cart updates
- Quantity management
- Responsive cart item layout
- Checkout flow integration

### Admin Features
- Product creation and management
- Image upload with Vercel Blob integration
- Order management and tracking

## 🔐 Authentication & Security

- **Clerk Integration**: Secure user authentication
- **Protected Routes**: Role-based access control
- **Admin Protection**: Separate admin-only sections
- **Session Management**: Automatic token refresh

## 💳 Payment Integration

- **Stripe Checkout**: Embedded payment forms
- **Secure Processing**: PCI-compliant payment handling
- **Order Management**: Complete order lifecycle tracking

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **Render**
- Any static hosting service

### Build for Production
```bash
npm run build
```

The built files will be in the `dist` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on multiple screen sizes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**