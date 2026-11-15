
import { useEffect, useState, type FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  confirmPasswordReset,
  verifyPasswordResetCode,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import './MyAccount.css'

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
})

function ResetPassword() {
  const [actionCode, setActionCode] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checking, setChecking] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [validCode, setValidCode] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true

    async function checkCode() {
      const params = new URLSearchParams(window.location.search)
      const mode = params.get('mode')
      const code = params.get('oobCode')

      if (mode !== 'resetPassword' || !code) {
        if (active) {
          setNotice('This password reset link is invalid or incomplete.')
          setChecking(false)
        }
        return
      }

      try {
        const accountEmail = await verifyPasswordResetCode(auth, code)

        if (active) {
          setActionCode(code)
          setEmail(accountEmail)
          setValidCode(true)
        }
      } catch {
        if (active) {
          setNotice('This password reset link has expired or has already been used. Please request a new one.')
        }
      } finally {
        if (active) setChecking(false)
      }
    }

    void checkCode()

    return () => {
      active = false
    }
  }, [])

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('')

    if (newPassword.length < 6) {
      setNotice('Your password must contain at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setNotice('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      await confirmPasswordReset(auth, actionCode, newPassword)
      setValidCode(false)
      setNotice('Your password has been updated successfully. You can now log in.')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      setNotice('Unable to reset your password. The link may have expired. Please request a new one.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="account-page">
      <section className="account-card account-reset-card">
        <p className="account-eyebrow">ACCOUNT SECURITY</p>
        <h1>Reset Password</h1>

        {checking ? (
          <p className="account-description">Verifying your reset link...</p>
        ) : validCode ? (
          <>
            <p className="account-description">
              Create a new password for <strong>{email}</strong>.
            </p>

            <form onSubmit={handleReset}>
              <div className="account-field">
                <label htmlFor="new-password">New password</label>
                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              <div className="account-field">
                <label htmlFor="confirm-new-password">Confirm new password</label>
                <input
                  id="confirm-new-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              {notice && (
                <div className="account-notice error">{notice}</div>
              )}

              <button
                className="account-button"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </>
        ) : (
          <p className="account-description">{notice}</p>
        )}

        {!checking && (
          <a className="account-back-link" href="/my-account">
            Back to My Account
          </a>
        )}
      </section>
    </main>
  )
}
