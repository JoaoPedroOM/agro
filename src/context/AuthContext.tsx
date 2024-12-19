import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

export function AuthContext(){
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter()

}