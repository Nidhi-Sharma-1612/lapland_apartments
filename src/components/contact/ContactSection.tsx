"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { WhatsAppIcon } from "@/components/layout/SocialIcons";
import { revealViewport, staggerContainer, staggerItem } from "@/lib/motion-variants";

const CONTACT_CARDS = [
  {
    Icon: Mail,
    label: "Email",
    value: "stay@booklapland.fi",
    href: "mailto:stay@booklapland.fi",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+358 40 724 0600",
    href: "tel:+358407240600",
  },
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with our team",
    href: "https://wa.me/358407240600",
  },
  {
    Icon: MapPin,
    label: "Address",
    value: "Koskikatu 22, 96200 Rovaniemi, Finland",
    href: "https://www.google.com/maps?q=Koskikatu+22,+96200+Rovaniemi,+Finland",
  },
];

const OFFICE_HOURS = "Mon – Sun, 10:00 – 22:00";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};
type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!values.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!values.lastName.trim()) next.lastName = "Please enter your last name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_PATTERN.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.message.trim()) next.message = "Please add a short message.";
    if (!values.consent) next.consent = "Please accept the Terms & Privacy Policy.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    // Placeholder submit — wire up to a real endpoint once one exists.
    setTimeout(() => {
      setStatus("success");
    }, 700);
  }

  function resetForm() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus("idle");
  }

  return (
    <Container as="section" className="py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-zinc-900">Send Us a Message</h2>
            <span className="flex items-center gap-1.5 text-sm text-zinc-500">
              <Clock className="h-4 w-4 text-brand-green" aria-hidden />
              Usually replies within 2 hours
            </span>
          </div>

          {status === "success" ? (
            <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" aria-hidden />
              <p className="text-lg font-semibold text-zinc-900">Message sent!</p>
              <p className="text-sm text-zinc-600">
                Thanks, {values.firstName} — our Rovaniemi team will reply to{" "}
                {values.email} within a few hours.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-2 rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  id="firstName"
                  label="First name"
                  placeholder="Jane"
                  value={values.firstName}
                  onChange={(v) => updateField("firstName", v)}
                  error={errors.firstName}
                />
                <Field
                  id="lastName"
                  label="Last name"
                  placeholder="Doe"
                  value={values.lastName}
                  onChange={(v) => updateField("lastName", v)}
                  error={errors.lastName}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  id="email"
                  label="Email address"
                  type="email"
                  placeholder="jane@example.com"
                  value={values.email}
                  onChange={(v) => updateField("email", v)}
                  error={errors.email}
                />
                <Field
                  id="phone"
                  label="Phone"
                  type="tel"
                  placeholder="+358 40 123 4567"
                  value={values.phone}
                  onChange={(v) => updateField("phone", v)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-zinc-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your stay..."
                  value={values.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  className={`resize-none rounded-xl bg-[#F6F7F9] px-4 py-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 ${
                    errors.message ? "ring-2 ring-red-400" : "focus:ring-brand-green"
                  }`}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => updateField("consent", e.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-brand-green focus:ring-brand-green"
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-brand-green underline underline-offset-2"
                    >
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-brand-green underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 self-start rounded-lg bg-brand-green px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-zinc-900">Other Ways to Reach Us</h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-6 flex flex-col gap-4"
          >
            {CONTACT_CARDS.map(({ Icon, label, value, href }) => (
              <motion.a
                key={label}
                variants={staggerItem}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 rounded-2xl border border-zinc-200 p-5 transition-colors hover:border-brand-green"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{label}</p>
                  <p className="mt-1 text-sm text-zinc-500">{value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              variants={staggerItem}
              className="flex items-start gap-4 rounded-2xl border border-zinc-200 p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                <Clock className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Office Hours</p>
                <p className="mt-1 text-sm text-zinc-500">{OFFICE_HOURS}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-zinc-900">Find Us</h2>
        <div className="mt-6 overflow-hidden rounded-2xl">
          <iframe
            title="Lapland Apartments office location"
            src="https://www.google.com/maps?q=Rovaniemi,Finland&z=13&output=embed"
            className="h-95 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Container>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`rounded-xl bg-[#F6F7F9] px-4 py-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 ${
          error ? "ring-2 ring-red-400" : "focus:ring-brand-green"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
