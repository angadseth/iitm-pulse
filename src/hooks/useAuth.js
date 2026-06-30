import { useState, useEffect } from 'react'
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth'
import { auth } from '../firebase'

const ALLOWED_DOMAINS = ['ds.study.iitm.ac.in', 'study.iitm.ac.in']

function isIITMEmail(email) {
  return ALLOWED_DOMAINS.some(domain => email.endsWith('@' + domain))
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser && !isIITMEmail(fbUser.email)) {
        await fbSignOut(auth)
        setError('Only IITM email addresses are allowed.')
        setUser(null)
      } else {
        setUser(fbUser)
        setError(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function signIn() {
    setError(null)
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ hd: 'study.iitm.ac.in' })
    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      setError(err.message)
    }
  }

  async function signOut() {
    await fbSignOut(auth)
  }

  return { user, loading, signIn, signOut, error }
}
