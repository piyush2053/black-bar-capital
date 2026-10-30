import { useEffect, useRef, useState } from 'react'
import { programs } from './data'

const empty = { name: '', email: '', phone: '', location: '', course: '' }

function validate(v) {
  const e = {}
  const name = v.name.trim()
  if (!name) e.name = 'Please enter your name.'
  else if (name.length < 2 || !/^[\p{L} .'-]+$/u.test(name)) e.name = 'Please enter a valid name (letters only).'

  if (!v.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'

  const phone = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|0091|0)/, '')
  if (!v.phone.trim()) e.phone = 'Please enter your phone number.'
  else if (!/^[6-9]\d{9}$/.test(phone)) e.phone = 'Please enter a valid 10-digit mobile number.'

  const loc = v.location.trim()
  if (!loc) e.location = 'Please enter your city / location.'
  else if (loc.length < 2) e.location = 'Please enter a valid location.'
  return e
}

// Where submitted enquiries go. There is no backend yet: connect this to your
// email service / Google Sheet / CRM endpoint. It must return a Promise.
async function submitEnquiry(data) {
  console.info('Enquiry submitted', data)
}

function Field({ id, label, error, touched, ...props }) {
  const showError = touched && error
  return (
    <div className={`field${showError ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} aria-invalid={showError ? 'true' : 'false'} aria-describedby={showError ? `${id}-error` : undefined} {...props} />
      <p className="field-error" id={`${id}-error`} role={showError ? 'alert' : undefined}>{showError ? error : ''}</p>
    </div>
  )
}

export default function Enquiry({ open, onClose }) {
  const [values, setValues] = useState(empty)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | failed
  const firstRef = useRef(null)
  const errors = validate(values)

  // Reset the form each time the popup opens.
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) { setValues(empty); setTouched({}); setStatus('idle') }
  }

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => firstRef.current?.focus(), 80)
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [open, onClose])

  const set = k => e => setValues(v => ({ ...v, [k]: e.target.value }))
  const blur = k => () => setTouched(t => ({ ...t, [k]: true }))

  const submit = async e => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, location: true })
    if (Object.keys(errors).length) {
      const first = ['name', 'email', 'phone', 'location'].find(k => errors[k])
      document.getElementById(first)?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitEnquiry({ ...values, name: values.name.trim(), email: values.email.trim(), location: values.location.trim() })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <div className={`modal${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet frost" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" inert={!open}>
        <button className="modal-close" onClick={onClose} aria-label="Close enquiry form"><span /><span /></button>
        {status === 'done' ? (
          <div className="enquiry-done">
            <div className="done-check" aria-hidden="true">✓</div>
            <h2 id="enquiry-title">Thank you, {values.name.trim().split(' ')[0]}!</h2>
            <p>We've received your enquiry. Our team will get in touch with you shortly.</p>
            <button className="button" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="eyebrow"><span className="eyebrow-dot" />ENQUIRY</p>
            <h2 id="enquiry-title">Start your journey with Black Bar.</h2>
            <p className="modal-lead">Share your details and our team will reach out to help you pick the right course.</p>
            <div className="field-grid">
              <Field id="name" label="Full name" placeholder="Your name" autoComplete="name" value={values.name} onChange={set('name')} onBlur={blur('name')} error={errors.name} touched={touched.name} ref={firstRef} />
              <Field id="phone" label="Phone number" type="tel" inputMode="tel" placeholder="98765 43210" autoComplete="tel" maxLength={16} value={values.phone} onChange={set('phone')} onBlur={blur('phone')} error={errors.phone} touched={touched.phone} />
              <Field id="email" label="Email" type="email" inputMode="email" placeholder="you@example.com" autoComplete="email" value={values.email} onChange={set('email')} onBlur={blur('email')} error={errors.email} touched={touched.email} />
              <Field id="location" label="City / Location" placeholder="e.g. Jaipur" autoComplete="address-level2" value={values.location} onChange={set('location')} onBlur={blur('location')} error={errors.location} touched={touched.location} />
              <div className="field field-full">
                <label htmlFor="course">Interested in <span className="optional">(optional)</span></label>
                <select id="course" name="course" value={values.course} onChange={set('course')}>
                  <option value="">Not sure yet</option>
                  {programs.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                  <option value="All four courses (offer)">All four courses (offer)</option>
                </select>
              </div>
            </div>
            {status === 'failed' && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
            <button className="button submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Submit enquiry <span className="arrow" aria-hidden="true">↗</span></>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
