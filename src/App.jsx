import React from 'react'
import Homepage from './Pages/Homepage/Homepage'
import Data from './Pages/Datapage/Data'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/data' element={<Data/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
