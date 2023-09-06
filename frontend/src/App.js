import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>  
        <Navbar />
        <div className='pages'>
          <Routes>  
            <Route
              path='/signup'
              element={<Signup />}
            />
          </Routes>

          <Routes>  
            <Route
              path='/login'
              element={<Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
