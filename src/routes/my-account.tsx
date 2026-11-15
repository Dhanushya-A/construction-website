
import { useEffect, useState, type FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import './MyAccount.css'

export const Route = createFileRoute('/my-account')({
  component: MyAccount,
})

type Notice = {
  type: 'success' | 'error'
  message: string
} | null

function getErrorMessage(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String(error.code)
      : ''

  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered. Please log in.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Please use a stronger password.',
    'auth/user-not-found': 'No account was found with this email.',
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your internet connection.',
    'auth/operation-not-allowed': 'Email/password login is not enabled in Firebase.',
    'auth/invalid-api-key': 'Firebase API key is invalid. Check your .env.local file.',
  }

  return messages[code] || 'Something went wrong. Please try again.'
}

function MyAccount() {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [notice, setNotice] = useState<Notice>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoadingUser(false)
    })

    return unsubscribe
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice(null)

    const cleanEmail = email.trim()

    if (!cleanEmail || !password) {
      setNotice({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setNotice({ type: 'error', message: 'Please enter your name.' })
        return
      }

      if (password.length < 6) {
        setNotice({ type: 'error', message: 'Password must contain at least 6 characters.' })
        return
      }

      if (password !== confirmPassword) {
        setNotice({ type: 'error', message: 'Passwords do not match.' })
        return
      }
    }

    setSubmitting(true)

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence,
      )

      if (mode === 'register') {
        const result = await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          password,
        )

        await updateProfile(result.user, {
          displayName: name.trim(),
        })

        setNotice({
          type: 'success',
          message: 'Your account has been created successfully.',
        })
      } else {
        await signInWithEmailAndPassword(auth, cleanEmail, password)

        setNotice({
          type: 'success',
          message: 'You are now logged in.',
        })
      }

      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setNotice({ type: 'error', message: getErrorMessage(error) })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleForgotPassword() {
    setNotice(null)

    if (!email.trim()) {
      setNotice({
        type: 'error',
        message: 'Enter your email address first.',
      })
      return
    }

    setSubmitting(true)

    try {
      await sendPasswordResetEmail(auth, email.trim(), {
        url: `${window.location.origin}/my-account`,
      })

      setNotice({
        type: 'success',
        message: 'If an account exists for this email, a password reset link has been sent. Please check your inbox.',
      })
    } catch (error) {
      setNotice({ type: 'error', message: getErrorMessage(error) })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLogout() {
    setSubmitting(true)
    setNotice(null)

    try {
      await signOut(auth)
      setNotice({ type: 'success', message: 'You have logged out successfully.' })
    } catch (error) {
      setNotice({ type: 'error', message: getErrorMessage(error) })
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingUser) {
    return (
      <main className="account-page">
        <div className="account-loading">Loading your account...</div>
      </main>
    )
  }

  if (user) {
    return (
      <main className="account-page">
        <section className="account-card account-logged-in">
          <div className="account-brand-mark">✓</div>
          <p className="account-eyebrow">MY ACCOUNT</p>
          <h1>Welcome{user.displayName ? `, ${user.displayName}` : ''}!</h1>
          <p className="account-description">
            You are successfully signed in to your account.
          </p>

          <div className="account-profile">
            <span>Account email</span>
            <strong>{user.email}</strong>
            <span>Account status</span>
            <strong>Active</strong>
          </div>

          {notice && (
            <div className={`account-notice ${notice.type}`}>
              {notice.message}
            </div>
          )}

          <button
            className="account-button"
            type="button"
            onClick={handleLogout}
            disabled={submitting}
          >
            {submitting ? 'Logging out...' : 'Logout'}
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="account-page">
      <section className="account-card">
        <div className="account-heading">
          <p className="account-eyebrow">YOUR CONSTRUCTION PARTNER</p>
          <h1>{mode === 'login' ? 'Welcome Back' : 'Create Your Account'}</h1>
          <p className="account-description">
            {mode === 'login'
              ? 'Sign in to access your account and manage your projects.'
              : 'Register to get started with your account.'}
          </p>
        </div>

        <div className="account-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => {
              setMode('login')
              setNotice(null)
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => {
              setMode('register')
              setNotice(null)
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="account-field">
              <label htmlFor="account-name">Full name</label>
              <input
                id="account-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="account-field">
            <label htmlFor="account-email">Email address</label>
            <input
              id="account-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="account-field">
            <label htmlFor="account-password">Password</label>
            <div className="account-password-wrap">
              <input
                id="account-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
              <button
                type="button"
                className="account-show-password"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="account-field">
              <label htmlFor="account-confirm-password">Confirm password</label>
              <input
                id="account-confirm-password"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          )}

          <div className="account-options">
            <label className="account-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Remember me</span>
            </label>

            {mode === 'login' && (
              <button
                type="button"
                className="account-text-button"
                onClick={handleForgotPassword}
                disabled={submitting}
              >
                Forgot password?
              </button>
            )}
          </div>

          {notice && (
            <div className={`account-notice ${notice.type}`}>
              {notice.message}
            </div>
          )}

          <button
            className="account-button"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? 'Please wait...'
              : mode === 'login'
                ? 'Login to Account'
                : 'Create Account'}
          </button>
        </form>

        <p className="account-switch">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login')
              setNotice(null)
            }}
          >
            {mode === 'login' ? 'Register now' : 'Login'}
          </button>
        </p>
      </section>
    </main>
  )
}
