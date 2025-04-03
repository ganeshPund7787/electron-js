import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Versions from './components/Versions'

function App(): JSX.Element {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 space-y-8">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<SignIn />} /> {/* Default route */}
        </Routes>

        <Versions />
      </div>
    </Router>
  )
}

export default App
