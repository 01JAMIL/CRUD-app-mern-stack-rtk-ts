import './App.css'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import NewProduct from './components/NewProduct'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to={'/products'} replace />} />
        <Route path='/products' element={<HomePage />} />
        <Route path='/new-product' element={<NewProduct />} />
      </Routes>
    </div>
  )
}

export default App
