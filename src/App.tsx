// import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Dashboard from '../src/pages/Dashboard.jsx'
import SupaAuth from '../src/pages/SupaAuth.jsx'
import ProtectedRoute from '../src/components/ProtectedRoutes.jsx'
import MemberDetails from '../src/pages/MemberDetails.jsx'
import CreateSub from '../src/pages/CreateSub.jsx'
import Edit from '../src/pages/Edit.jsx'
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
<>
<Routes>
<Route path='/login' element={
        <SupaAuth/>
        }/>

<Route path='/' element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>}/>
<Route path='/members/create' element={<ProtectedRoute><CreateSub/></ProtectedRoute>}/>

      <Route path='/members/details/:id' element={<ProtectedRoute>
        <MemberDetails/>
 
        </ProtectedRoute>}/>
      <Route path='/members/edit/:id' element={<ProtectedRoute><Edit/></ProtectedRoute>}/>  
</Routes>
<Analytics />
</>
  )
}

export default App
