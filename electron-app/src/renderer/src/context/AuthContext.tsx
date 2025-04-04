// // context/AuthContext.tsx
// import { createContext, useContext, useEffect, useState } from 'react'

// type AuthContextType = {
//   isAuthenticated: boolean
//   login: (token: string) => void
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | null>(null)

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   const login = (token: string) => {
//     setIsAuthenticated(true)
//   }

//   const logout = async () => {
//     await window.electron.ipcRenderer.invoke('logout-user')
//     setIsAuthenticated(false)
//   }

//   const checkAuthOnLoad = async () => {
//     const token = await window.electron.ipcRenderer.invoke('get-auth-token')
//     if (token) setIsAuthenticated(true)
//   }

//   useEffect(() => {
//     checkAuthOnLoad()
//   }, [])

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) throw new Error('useAuth must be used inside AuthProvider')
//   return context
// }

import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  id: string
  email: string
  name: string
} | null

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>(null)

  const login = (token: string, user: User) => {
    setIsAuthenticated(true)
    setUser(user)
  }

  const logout = async () => {
    await window.electron.ipcRenderer.invoke('logout-user')
    setIsAuthenticated(false)
    setUser(null)
  }

  const checkAuthOnLoad = async () => {
    const authData = await window.electron.ipcRenderer.invoke('get-auth-token')
    if (authData?.token) {
      console.log('authData', authData)
      setIsAuthenticated(true)
      setUser(authData.user._doc)
    }
  }

  useEffect(() => {
    checkAuthOnLoad()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
