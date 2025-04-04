// components/ProtectedRoute.tsx
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <div className="text-center mt-10 text-red-600">Access Denied. Please log in.</div>
  }

  return <>{children}</>
}
