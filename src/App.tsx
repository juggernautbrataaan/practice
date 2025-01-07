
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product/new" element={<ProductPage />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App

