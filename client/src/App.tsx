import './App.css'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import NewProduct from './components/NewProduct'
import UpdateProduct from './components/UpdateProduct'
import PathNotMatch from './components/PathNotMatch'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to={'/products'} replace />} />
        <Route path='/products' element={<HomePage />} />
        <Route path='/new-product' element={<NewProduct />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
        <Route path='*' element={<PathNotMatch />} />
      </Routes>
    </div>
  )
}

export default App
