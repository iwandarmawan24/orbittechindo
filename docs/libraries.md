# Library Documentation

This document provides an overview of the libraries used in the project and how they are integrated.

## Zustand

Zustand is used for state management in the project. It is implemented in various stores to manage different aspects of the application's state.

- **Movie Store**: Manages movie-related state, including search functionality.
  ```typescript
  // store/movie-store.ts
  import { create } from "zustand";
  // ... existing code ...
  export const useMovieStore = create<MovieState>((set, get) => ({
    movies: [],
    searchTerm: "",
    // ... existing code ...
  }));
  ```

- **Auth Store**: Manages authentication state, including user information and token management.
  ```typescript
  // store/auth-store.ts
  import { create } from "zustand";
  // ... existing code ...
  export const useAuthStore = create<AuthState>()(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        // ... existing code ...
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
  ```

## Other Libraries

- **Radix UI:** A set of accessible and customizable components for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **React Hook Form:** A library for managing form state and validation.
- **Framer Motion:** A library for creating animations in React.

For more detailed information on each library, please refer to their official documentation.

## Radix UI

Radix UI is used to create accessible and customizable components. Here are some examples:

- **Radio Group**: Implements a radio group using Radix UI's `RadioGroup` component.
  ```typescript
  // components/ui/radio-group.tsx
  import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
  // ... existing code ...
  export { RadioGroup, RadioGroupItem };
  ```

- **Navigation Menu**: Implements a navigation menu using Radix UI's `NavigationMenu` component.
  ```typescript
  // components/ui/navigation-menu.tsx
  import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
  // ... existing code ...
  export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    // ... existing code ...
  };
  ```

- **Dropdown Menu**: Implements a dropdown menu using Radix UI's `DropdownMenu` component.
  ```typescript
  // components/ui/dropdown-menu.tsx
  import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
  // ... existing code ...
  export {
    DropdownMenu,
    DropdownMenuTrigger,
    // ... existing code ...
  };
  ```

## Tailwind CSS

Tailwind CSS is used for styling components throughout the project. It provides utility-first classes to style elements directly in the JSX.

## React Hook Form

React Hook Form is used for managing form state and validation. It is integrated with Zod for schema validation.

- **Login Form**: Uses React Hook Form to manage login form state and validation.
  ```typescript
  // components/login-form.tsx
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  // ... existing code ...
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  ```

## Framer Motion

Framer Motion is used for creating animations in React components. It is typically used to animate component transitions and interactions.