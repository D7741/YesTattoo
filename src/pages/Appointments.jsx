import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

const SIZES = ['Small (under 5cm)', 'Medium (5–10cm)', 'Large (10–20cm)', 'Extra Large (20cm+)'];

const PLACEMENTS = [
  'Forearm', 'Upper Arm', 'Shoulder', 'Back', 'Chest',
  'Ribs', 'Leg', 'Ankle', 'Foot', 'Hand', 'Neck', 'Other',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  idea: '',
  preferredArtist: '',
  placement: '',
  size: '',
};

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs tracking-widest uppercase text-white/50">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

const inputClass =
  'bg-transparent border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors duration-200 placeholder:text-white/20';

export default function Appointments() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.idea.trim()) e.idea = 'Please describe your tattoo idea';
    if (!form.size) e.size = 'Please select a size';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...form,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please email us directly at newzealand.yeah.tattoo@gmail.com');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="w-12 h-px bg-white/30 mb-8" />
        <h2 className="text-3xl font-bold uppercase tracking-tight mb-4">Request Received</h2>
        <p className="text-white/50 text-sm leading-relaxed max-w-md mb-8">
          Thank you, {form.name}. We've received your booking request and will be in touch via email within 2–3 business days to confirm your appointment.
        </p>
        <p className="text-white/30 text-xs tracking-widest uppercase">
          newzealand.yeah.tattoo@gmail.com
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Page header */}
      <div className="border-b border-white/10 py-20 px-6 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Yeah Tattoo</p>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">Book an Appointment</h1>
        <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
          Fill in the form below. No date needed right now — we'll confirm a time via email once we review your request.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

          <Field label="Full Name *" error={errors.name}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Email *" error={errors.email}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="Phone *" error={errors.phone}>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="02X XXX XXXX"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Tattoo Idea *" error={errors.idea}>
            <textarea
              name="idea"
              value={form.idea}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your tattoo idea — subject, style, references, mood..."
              className={`${inputClass} resize-none`}
            />
          </Field>

          <Field label="Preferred Artist" error={errors.preferredArtist}>
            <input
              type="text"
              name="preferredArtist"
              value={form.preferredArtist}
              onChange={handleChange}
              placeholder="e.g. Maomao (or leave blank)"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Body Placement" error={errors.placement}>
              <select
                name="placement"
                value={form.placement}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Select placement</option>
                {PLACEMENTS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>

            <Field label="Approx. Size *" error={errors.size}>
              <select
                name="size"
                value={form.size}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Select size</option>
                {SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          {submitError && (
            <p className="text-red-400 text-sm text-center">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 py-4 border border-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send Request'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs tracking-widest uppercase mt-8">
          Or email us directly — newzealand.yeah.tattoo@gmail.com
        </p>
      </div>
    </div>
  );
}
