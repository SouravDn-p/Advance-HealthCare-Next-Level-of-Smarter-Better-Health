This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication System

This project implements a complete authentication system with the following features:

### Features
- User registration and login with email/password
- Access token and refresh token management
- Protected routes for authenticated users
- Role-based access control (RBAC)
- Automatic token refresh
- Logout functionality

### Implementation Details

The authentication system is built with:
- **Context API**: For managing authentication state across the application
- **Redux**: For persistent state management
- **RTK Query**: For API calls and caching
- **ProtectedRoute Component**: For protecting pages that require authentication
- **LoginRedirect Component**: For redirecting authenticated users away from login/register pages

### Key Components

1. **AuthContext** (`contexts/AuthContext.tsx`): 
   - Provides authentication state and methods throughout the app
   - Wraps the entire application in `app/layout.tsx`

2. **ProtectedRoute** (`components/ProtectedRoute.tsx`): 
   - HOC for protecting pages that require authentication
   - Supports role-based access control

3. **LoginRedirect** (`components/LoginRedirect.tsx`): 
   - Redirects authenticated users away from login/register pages

4. **LogoutButton** (`components/LogoutButton.tsx`): 
   - Provides a reusable logout button component

5. **Auth Pages**:
   - Login: `app/(LandingPage)/auth/login/page.tsx`
   - Register: `app/(LandingPage)/auth/register/page.tsx`

### Usage Examples

#### Protecting a Page
```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Your protected content here</div>
    </ProtectedRoute>
  );
}
```

#### Protecting a Page with Role Requirements
```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin-only content</div>
    </ProtectedRoute>
  );
}
```

#### Using Authentication in Components
```tsx
import { useAuth } from "@/contexts/AuthContext";

export default function UserProfile() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.