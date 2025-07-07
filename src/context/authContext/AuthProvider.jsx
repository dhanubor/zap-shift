import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

import { auth } from '../../firebase/firebase.config'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const googleProvide = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const sineGoogle = ()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvide)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log('the state', currentUser)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    sineGoogle,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
