import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
function App(): JSX.Element {
  return (
    <Router>
      <Navbar />
      <div className="min-h-full bg-gray-200 flex flex-col items-center justify-center p-4 space-y-6">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="text-2xl font-bold text-center text-gray-800 mb-6">Home</div>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
