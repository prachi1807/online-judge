import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ProblemPage from './components/ProblemPage';
import ProblemSubmission from './components/ProblemSubmission'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>  
        <Navbar />
        <div className='pages'>
          <Routes>  
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to='/login'/>}
            />
            
            <Route
              path='/signup'
              element={user ? <Navigate to='/'/> : <Signup />}
            />

            <Route
              path='/login'
              element={user ? <Navigate to='/'/> : <Login />}
            />

            <Route
              path='/problems/:problemId'
              element={<ProblemPage />}
            />

            <Route
              path='/problems/:problemId/submissions'
              element={<ProblemSubmission />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
