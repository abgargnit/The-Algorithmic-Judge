import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Projects from './pages/projects';
import Header from './components/Header';




function App(){
  return (
    <BrowserRouter>
    <Header/> {/* it will add header to all pages */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
