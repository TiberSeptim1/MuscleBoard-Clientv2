import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '../SupabaseClient.js'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../components/useAuth.js'
import { FRONTEND_URL } from '../components/Appurl.js'



const SupaAuth = () => {
  const {user} = useAuth();
  if (user) return <Navigate to='/'/>
  return (
      <div style={{ maxWidth: 420, margin: '96px auto' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          redirectTo={`${FRONTEND_URL}`}
        />
      </div>
  )
}

export default SupaAuth
