import { useState, useEffect, useCallback } from 'react'
import { doc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export function useProgress(uid) {
  const [profile,  setProfile]  = useState(null)
  const [progress, setProgress] = useState({})
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!uid) { setLoading(false); return }

    const profileRef  = doc(db, 'users', uid, 'data', 'profile')
    const progressRef = doc(db, 'users', uid, 'data', 'progress')

    let profileReady  = false
    let progressReady = false

    const unsubProfile = onSnapshot(profileRef, snap => {
      setProfile(snap.exists() ? snap.data() : null)
      profileReady = true
      if (progressReady) setLoading(false)
    })

    const unsubProgress = onSnapshot(progressRef, snap => {
      setProgress(snap.exists() ? snap.data() : {})
      progressReady = true
      if (profileReady) setLoading(false)
    })

    return () => { unsubProfile(); unsubProgress() }
  }, [uid])

  const saveProfile = useCallback(async (data) => {
    await setDoc(doc(db, 'users', uid, 'data', 'profile'), data, { merge: true })
  }, [uid])

  const toggleAssignment = useCallback(async (courseId, week) => {
    const ref = doc(db, 'users', uid, 'data', 'progress')
    const current = progress[courseId]?.assignments?.[week] ?? false
    await setDoc(ref, {
      [courseId]: { assignments: { [week]: !current } }
    }, { merge: true })
  }, [uid, progress])

  const toggleSpecial = useCallback(async (courseId, itemId) => {
    const ref = doc(db, 'users', uid, 'data', 'progress')
    const current = progress[courseId]?.special?.[itemId] ?? false
    await setDoc(ref, {
      [courseId]: { special: { [itemId]: !current } }
    }, { merge: true })
  }, [uid, progress])

  return { profile, progress, loading, saveProfile, toggleAssignment, toggleSpecial }
}
