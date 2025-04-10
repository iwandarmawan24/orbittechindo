# Orbit Tech Indo Native - Project Documentation

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

Orbit Tech Indo Native is a mobile application built with React Native, focusing on providing a robust and user-friendly interface for movie discovery and management. The application allows users to search for movies, filter results, save favorites, and manage their profiles, all optimized for mobile devices.

### Key Features
- User authentication and authorization
- Movie search and filtering
- Movie details and information
- User profiles and favorites
- Responsive design for mobile
- Dark/light mode support
- Modern UI components
- Offline capabilities

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn package manager
- React Native CLI
- Expo CLI (if using Expo)
- iOS Simulator (for Mac) or Android Emulator
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iwandarmawan24/orbittechindo-native.git
cd orbittechindo-native
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
OMDB_API_KEY=your_omdb_api_key
```

4. Start the development server:
```bash
# For Expo
npx expo start

# For React Native CLI
npx react-native run-android
# or
npx react-native run-ios
```

5. Open the app on your device or emulator.

### Available Scripts

- `npm start` - Start the Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run build` - Build the app for production

## Technology Stack

### Core Framework
- React Native
- TypeScript
- Expo (optional)

### UI Components & Styling
- React Native Paper
- React Native Vector Icons
- React Native Reanimated
- React Native Gesture Handler
- React Native Safe Area Context
- React Native Screens

### State Management
- Zustand (lightweight state management)
- Immer (for immutable state updates)
- React Context for theme and localization

### Navigation
- React Navigation
- React Navigation Stack
- React Navigation Bottom Tabs
- React Navigation Drawer

### Form Handling
- React Hook Form
- Zod for validation
- Custom form components

### Additional Libraries
- date-fns for date manipulation
- react-native-chart-kit for data visualization
- react-native-theme-provider for theme management
- i18next for internationalization
- react-query for data fetching
- axios for HTTP requests
- jwt-decode for token handling
- AsyncStorage for local storage

## Project Structure

```
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Basic UI components
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Layout components
│   │   └── features/     # Feature-specific components
│   ├── screens/          # App screens
│   ├── navigation/       # Navigation configuration
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   │   ├── api/          # API client functions
│   │   ├── auth/         # Authentication utilities
│   │   ├── utils/        # Helper functions
│   │   └── constants/    # Constants and configurations
│   ├── store/            # State management (Zustand stores)
│   ├── styles/           # Global styles and theme configurations
│   ├── types/            # TypeScript type definitions
│   └── assets/           # Images, fonts, and other static assets
├── android/              # Android-specific code
├── ios/                  # iOS-specific code
├── docs/                 # Project documentation
└── tests/                # Test files
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

### Offline Support
- Cache movie data
- Access to favorites without internet
- Sync when back online
- Background data refresh

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
- Secure token storage
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

### Offline Support
- AsyncStorage for local data
- Background sync
- Conflict resolution
- Data versioning
- Cache invalidation

## Code Snippets

### Authentication Components

#### Login Form Implementation
```typescript
// src/components/forms/LoginForm.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/auth-store';
import { useToast } from '../../hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const { showToast } = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        showToast({
          title: 'Login successful',
          message: 'Welcome back!',
          type: 'success',
        });
      } else {
        showToast({
          title: 'Login failed',
          message: result.message,
          type: 'error',
        });
      }
    } catch (error) {
      showToast({
        title: 'Login failed',
        message: 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
            {errors.email && (
              <HelperText type="error" visible={!!errors.email}>
                {errors.email.message}
              </HelperText>
            )}
          </View>
        )}
      />
      
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
            />
            {errors.password && (
              <HelperText type="error" visible={!!errors.password}>
                {errors.password.message}
              </HelperText>
            )}
          </View>
        )}
      />
      
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      
      <Text style={styles.registerText}>
        Don't have an account?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 16,
  },
  registerText: {
    marginTop: 16,
    textAlign: 'center',
  },
  registerLink: {
    color: '#6200ee',
  },
});
```

### Movie Components

#### Movie Carousel Implementation
```typescript
// src/components/features/MovieCarousel.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { searchMovies } from '../../lib/api';
import { Movie } from '../../types/movie';
import { useNavigation } from '@react-navigation/native';

export default function MovieCarousel() {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        // Fetch some popular movies for the carousel
        const featuredTitles = ['Avengers', 'Star Wars', 'Jurassic Park', 'Harry Potter', 'Lord of the Rings'];
        const results = await Promise.all(featuredTitles.map((title) => searchMovies(title, 'movie', '')));

        const movies = results
          .flatMap((result) => result.Search || [])
          .filter((movie) => movie.Poster && movie.Poster !== 'N/A')
          .slice(0, 5);

        setFeaturedMovies(movies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured movies:', error);
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  const renderItem = ({ item }: { item: Movie }) => {
    return (
      <Card
        style={styles.card}
        onPress={() => navigation.navigate('MovieDetails', { movieId: item.imdbID })}
      >
        <Card.Cover source={{ uri: item.Poster }} style={styles.poster} />
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.title}>
            {item.Title}
          </Text>
          <Text variant="bodyMedium" style={styles.year}>
            {item.Year}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (featuredMovies.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.sectionTitle}>
        Featured Movies
      </Text>
      <Carousel
        data={featuredMovies}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 80}
        autoplay
        autoplayInterval={5000}
        loop
        enableMomentum={false}
        lockScrollWhileSnapping
        useScrollView={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginLeft: 16,
    marginBottom: 8,
  },
  card: {
    marginHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    height: 200,
  },
  cardContent: {
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  year: {
    color: '#666',
  },
});
```

### State Management

#### Auth Store Implementation
```typescript
// src/store/auth-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, name: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkAuth: () => boolean;
}

// Mock user database for demonstration
const MOCK_USERS: Record<string, { id: string; email: string; name: string; password: string }> = {
  'demo@example.com': {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'demo123',
  },
};

// JWT-like token generation
function generateJWT(payload: any): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const data = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature');
  return `${header}.${data}.${signature}`;
}

// Token validation
function isValidToken(token: string): boolean {
  try {
    const [, data] = token.split('.');
    const payload = JSON.parse(atob(data));
    const expiration = new Date(payload.exp * 1000);
    return expiration > new Date();
  } catch {
    return false;
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
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Check if user exists in our mock database
        const user = MOCK_USERS[email.toLowerCase()];

        if (user && user.password === password) {
          const token = generateJWT({
            id: user.id,
            email: user.email,
            name: user.name,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
          });

          set({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
            isAuthenticated: true,
            token,
          });

          return { success: true, message: 'Login successful' };
        }

        return { success: false, message: 'Invalid email or password' };
      },

      register: async (email: string, name: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Check if user already exists
        if (MOCK_USERS[email.toLowerCase()]) {
          return { success: false, message: 'User already exists' };
        }

        // Create new user
        const newUser = {
          id: String(Object.keys(MOCK_USERS).length + 1),
          email: email.toLowerCase(),
          name,
          password,
        };

        MOCK_USERS[email.toLowerCase()] = newUser;

        const token = generateJWT({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        });

        set({
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          },
          isAuthenticated: true,
          token,
        });

        return { success: true, message: 'Registration successful' };
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        });
      },

      checkAuth: () => {
        const { token } = get();
        return token ? isValidToken(token) : false;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### API Integration

#### Movie Search Implementation
```typescript
// src/lib/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Cache for API responses
const cache = new Map();

export async function searchMovies(term: string, type: string, year: string) {
  const cacheKey = `search:${term}:${type}:${year}`;
  
  // Check cache first
  const cachedData = await AsyncStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    // Cache valid for 1 hour
    if (Date.now() - timestamp < 60 * 60 * 1000) {
      return data;
    }
  }
  
  try {
    const params = {
      s: term,
      type: type || '',
      y: year || '',
    };
    
    const response = await api.get('', { params });
    
    // Cache the response
    await AsyncStorage.setItem(cacheKey, JSON.stringify({
      data: response.data,
      timestamp: Date.now(),
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
}

export async function getMovieDetails(imdbID: string) {
  const cacheKey = `movie:${imdbID}`;
  
  // Check cache first
  const cachedData = await AsyncStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    // Cache valid for 24 hours
    if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
      return data;
    }
  }
  
  try {
    const params = {
      i: imdbID,
      plot: 'full',
    };
    
    const response = await api.get('', { params });
    
    // Cache the response
    await AsyncStorage.setItem(cacheKey, JSON.stringify({
      data: response.data,
      timestamp: Date.now(),
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details');
  }
}
```

### Navigation Implementation

#### App Navigator
```typescript
// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/auth-store';
import { IconButton } from 'react-native-paper';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Types
import { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <IconButton icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          // Auth screens
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // App screens
          <>
            <Stack.Screen
              name="MainTabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MovieDetails"
              component={MovieDetailsScreen}
              options={{ title: 'Movie Details' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### UI Components

#### Custom Button Component
```typescript
// src/components/ui/Button.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.disabled;
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.secondary;
    if (variant === 'outline') return 'transparent';
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.onDisabled;
    if (variant === 'primary') return theme.colors.onPrimary;
    if (variant === 'secondary') return theme.colors.onSecondary;
    if (variant === 'outline') return theme.colors.primary;
    return theme.colors.primary;
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.disabled;
    if (variant === 'outline') return theme.colors.primary;
    return 'transparent';
  };

  const getHeight = () => {
    if (size === 'small') return 36;
    if (size === 'large') return 56;
    return 48;
  };

  const getFontSize = () => {
    if (size === 'small') return 14;
    if (size === 'large') return 18;
    return 16;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          height: getHeight(),
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: getFontSize(),
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  text: {
    fontWeight: '600',
    marginLeft: 8,
  },
});
```

### Custom Hooks

#### Toast Hook Implementation
```typescript
// src/hooks/use-toast.ts
import { useState, useCallback } from 'react';
import { Toast } from '../components/ui/Toast';

interface ToastOptions {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const showToast = useCallback(
    ({ title, message, type = 'info', duration = 3000 }: ToastOptions) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, title, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  return { showToast, toasts };
}
```

### Types

#### Movie Type Definition
```typescript
// src/types/movie.ts
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Runtime?: string;
  Rating?: string;
  Votes?: string;
}

export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieDetailsResponse extends Movie {
  Rated: string;
  Released: string;
  Writer: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}
```

## Deployment

### Building for Production

1. For Android:
```bash
# Generate a release build
cd android
./gradlew assembleRelease
```

2. For iOS:
```bash
# Open the project in Xcode
cd ios
pod install
open OrbitTechIndo.xcworkspace
```

### Deployment Platforms
- Google Play Store
- Apple App Store
- Expo (if using Expo)

### Environment Variables
Required environment variables for production:
```env
OMDB_API_KEY=your_omdb_api_key
```

## Testing

### Unit Testing
```bash
npm run test
# or
yarn test
```

### Testing Tools
- Jest for unit testing
- React Native Testing Library for component testing
- Detox for end-to-end testing
- MSW for API mocking

### Test Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
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