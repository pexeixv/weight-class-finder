import { Routes, Route } from 'react-router-dom'
import NotFound from '@/pages/NotFound'
import BaseLayout from '@/components/BaseLayout'
import WeightClassFinder from '@/pages/WeightClassFinder'

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout disableHeader disableFooter />}>
        <Route path="/" element={<WeightClassFinder />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
