# Orbit Tech Indo - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Features](#features)
6. [Technical Implementation](#technical-implementation)
7. [Code Snippets](#code-snippets)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [Contributing](#contributing)
11. [License](#license)

## Project Overview

Orbit Tech Indo is a modern web application built with Next.js, focusing on providing a robust and user-friendly interface for movie discovery and management. The application allows users to search for movies, filter results, save favorites, and manage their profiles.

### Key Features
- User authentication and authorization
- Movie search and filtering
- Movie details and information
- User profiles and favorites
- Responsive design
- Dark/light mode support
- Modern UI components
- Real-time updates

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or pnpm package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/orbittechindo.git
cd orbittechindo
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key
```

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technology Stack

### Frontend Framework
- Next.js 15.1.0
- React 19
- TypeScript
- SWR/React Query for data fetching

### UI Components & Styling
- Radix UI (comprehensive UI component library)
- Tailwind CSS for styling
- Framer Motion for animations
- Shadcn UI
- CSS Modules for component-specific styling

### State Management
- Zustand (lightweight state management)
- Immer (for immutable state updates)
- React Context for theme and localization

### Form Handling
- React Hook Form
- Zod for validation
- @hookform/resolvers
- Custom form components

### Additional Libraries
- date-fns for date manipulation
- recharts for data visualization
- next-themes for theme management
- lucide-react for icons
- i18next for internationalization
- react-query for data fetching
- axios for HTTP requests
- jwt-decode for token handling

## Project Structure

```
├── app/                 # Next.js app directory (pages and routes)
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   ├── movies/          # Movie-related pages
│   └── profile/         # User profile pages
├── components/          # Reusable UI components
│   ├── ui/              # Basic UI components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
│   ├── api/             # API client functions
│   ├── auth/            # Authentication utilities
│   ├── utils/           # Helper functions
│   └── constants/       # Constants and configurations
├── public/              # Static assets
├── store/               # State management (Zustand stores)
├── styles/              # Global styles and Tailwind configurations
├── types/               # TypeScript type definitions
└── docs/                # Project documentation
```

## Features

### Authentication
- User registration with email and password
- User login with JWT authentication
- Password reset functionality
- Session management
- Protected routes
- Social login integration (planned)
- Two-factor authentication (planned)

### Movie Management
- Search movies by title
- Filter movies by type and year
- View movie details
- Save favorite movies
- Movie recommendations
- Rate and review movies (planned)
- Create watchlists (planned)
- Share movies with friends (planned)

### User Profile
- View and edit user profile
- Update user preferences
- View saved movies
- Manage account settings
- View watch history (planned)
- Manage notifications (planned)
- Privacy settings (planned)

### Search and Filtering
- Advanced search functionality
- Filter by multiple criteria
- Sort results
- Pagination support
- Search history (planned)
- Saved searches (planned)
- Search suggestions (planned)

## Technical Implementation

### State Management with Zustand
The project uses Zustand for state management, chosen for its:
- Simpler API compared to Redux
- Less boilerplate code
- Built-in persistence middleware
- Better TypeScript support
- Smaller bundle size

### API Integration
- OMDB API for movie data
- RESTful API design
- Error handling
- Loading states
- Caching strategies
- Retry mechanisms
- Request cancellation
- Data transformation

### Authentication System
- JWT-based authentication
- Middleware protection
- Token management
- Route protection
- Session handling
- Refresh token mechanism
- Secure storage
- Logout handling

### Form Validation
- React Hook Form
- Zod schemas
- Custom validation logic
- Error handling
- Field-level validation
- Form-level validation
- Async validation
- Accessibility

## Code Snippets

### Authentication Components

#### Login Form Implementation
```typescript
// components/login-form.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/store/auth-store"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login } = useAuthStore()
  const { toast } = useToast()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(data.email, data.password)

      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })

        router.push("/")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")

      toast({
        title: "Login failed",
        description: "An error occurred during login.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </Form>
  )
}
```

### Movie Components

#### Movie Carousel Implementation
```typescript
// components/movie-carousel.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { searchMovies } from "@/lib/api"
import type { Movie } from "@/types/movie"
import { motion, AnimatePresence } from "framer-motion"

export default function MovieCarousel() {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        // Fetch some popular movies for the carousel
        const featuredTitles = ["Avengers", "Star Wars", "Jurassic Park", "Harry Potter", "Lord of the Rings"]
        const results = await Promise.all(featuredTitles.map((title) => searchMovies(title, "movie", "")))

        const movies = results
          .flatMap((result) => result.Search || [])
          .filter((movie) => movie.Poster && movie.Poster !== "N/A")
          .slice(0, 5)

        setFeaturedMovies(movies)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching featured movies:", error)
        setLoading(false)
      }
    }

    fetchFeaturedMovies()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [featuredMovies.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredMovies.length) % featuredMovies.length)
  }

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (featuredMovies.length === 0) {
    return null
  }

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={featuredMovies[currentIndex].Poster}
            alt={featuredMovies[currentIndex].Title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <Card className="absolute bottom-0 left-0 right-0 m-4 border-0 bg-transparent">
            <CardContent className="p-4">
              <h2 className="mb-2 text-2xl font-bold text-white">
                {featuredMovies[currentIndex].Title}
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{featuredMovies[currentIndex].Year}</Badge>
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm text-white">Featured</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
```

### State Management

#### Auth Store Implementation
```typescript
// store/auth-store.ts
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (email: string, name: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  checkAuth: () => boolean
}

// Mock user database for demonstration
const MOCK_USERS: Record<string, { id: string; email: string; name: string; password: string }> = {
  "demo@example.com": {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    password: "demo123",
  },
}

// JWT-like token generation
function generateJWT(payload: any): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const data = btoa(JSON.stringify(payload))
  const signature = btoa("mock-signature")
  return `${header}.${data}.${signature}`
}

// Token validation
function isValidToken(token: string): boolean {
  try {
    const [, data] = token.split(".")
    const payload = JSON.parse(atob(data))
    const expiration = new Date(payload.exp * 1000)
    return expiration > new Date()
  } catch {
    return false
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Check if user exists in our mock database
        const user = MOCK_USERS[email.toLowerCase()]

        if (user && user.password === password) {
          const token = generateJWT({
            id: user.id,
            email: user.email,
            name: user.name,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
          })

          set({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
            isAuthenticated: true,
            token,
          })

          return { success: true, message: "Login successful" }
        }

        return { success: false, message: "Invalid email or password" }
      },

      register: async (email: string, name: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Check if user already exists
        if (MOCK_USERS[email.toLowerCase()]) {
          return { success: false, message: "User already exists" }
        }

        // Create new user
        const newUser = {
          id: String(Object.keys(MOCK_USERS).length + 1),
          email: email.toLowerCase(),
          name,
          password,
        }

        MOCK_USERS[email.toLowerCase()] = newUser

        const token = generateJWT({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        })

        set({
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          },
          isAuthenticated: true,
          token,
        })

        return { success: true, message: "Registration successful" }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        })
      },

      checkAuth: () => {
        const { token } = get()
        return token ? isValidToken(token) : false
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

### API Integration

#### Movie Search Implementation
```typescript
// lib/api.ts
export async function searchMovies(term: string, type: string, year: string) {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY
  const baseUrl = "https://www.omdbapi.com"
  
  const params = new URLSearchParams({
    apikey: apiKey || "",
    s: term,
    type: type || "",
    y: year || "",
  })

  const response = await fetch(`${baseUrl}?${params.toString()}`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch movies")
  }

  return response.json()
}
```

### Middleware Implementation

#### Authentication Middleware
```typescript
// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function isValidToken(token: string): boolean {
  try {
    const [, data] = token.split(".")
    const payload = JSON.parse(atob(data))
    const expiration = new Date(payload.exp * 1000)
    return expiration > new Date()
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === "/auth/login" || path === "/auth/register"

  if (isPublicPath) {
    const authStorage = request.cookies.get("auth-storage")?.value
    let isAuthenticated = false

    if (authStorage) {
      try {
        const parsedStorage = JSON.parse(authStorage)
        const token = parsedStorage.state?.token
        isAuthenticated = token ? isValidToken(token) : false
      } catch (error) {
        isAuthenticated = false
      }
    }

    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/movies/:path*", "/auth/login", "/auth/register"],
}
```

### UI Components

#### Custom Button Component
```typescript
// components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Custom Hooks

#### Toast Hook Implementation
```typescript
// hooks/use-toast.ts
import { useState, useCallback } from "react"
import { Toast } from "@/components/ui/toast"

interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([])

  const toast = useCallback(
    ({ title, description, variant = "default" }: ToastOptions) => {
      const id = Date.now()
      setToasts((prev) => [...prev, { id, title, description, variant }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    },
    []
  )

  return { toast, toasts }
}
```

### Types

#### Movie Type Definition
```typescript
// types/movie.ts
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Plot?: string
  Director?: string
  Actors?: string
  Genre?: string
  Runtime?: string
  Rating?: string
  Votes?: string
}
```

### Configuration

#### Next.js Configuration
```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["m.media-amazon.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### Styling

#### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

## Deployment

### Production Build
1. Build the application:
```bash
npm run build
# or
pnpm build
```

2. Start the production server:
```bash
npm run start
# or
pnpm start
```

### Deployment Platforms
- Vercel (recommended)
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Heroku

### Environment Variables
Required environment variables for production:
```env
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key
```

## Testing

### Unit Testing
```bash
npm run test
# or
pnpm test
```

### Testing Tools
- Jest for unit testing
- React Testing Library for component testing
- Cypress for end-to-end testing
- MSW for API mocking

### Test Coverage
```bash
npm run test:coverage
# or
pnpm test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 