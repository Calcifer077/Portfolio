// app/contact/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Send,
  CheckCircle,
  Loader2,
  Clock,
  Zap,
  MessageSquare,
  Code2,
  CircleAlert,
} from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { FaXTwitter as Twitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// ─── Static data ─────────────────────────────────────────
const SOCIALS = [
  {
    label: "GitHub",
    handle: "github.com/Calcifer077",
    href: "https://github.com/Calcifer077/",
    icon: Github,
    description: "Check out my work",
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/mahesh-nashier-b05691249",
    href: "https://www.linkedin.com/in/mahesh-nashier-b05691249/",
    icon: Linkedin,
    description: "Professional background & experience",
  },
  {
    label: "Twitter",
    handle: "@nash54644",
    href: "https://x.com/nash54644",
    icon: Twitter,
    description: "Thoughts on systems & software",
  },
  {
    label: "Email",
    handle: "maheshnashier14@gmail.com",
    href: "mailto:maheshnashier14@gmail.com",
    icon: Mail,
    description: "Best for inquiries",
  },
];

const AVAILABILITY = [
  {
    icon: Zap,
    label: "Response time",
    value: "< 24 hours",
  },
  {
    icon: Clock,
    label: "Timezone",
    value: "IST (UTC+5:30)",
  },
  {
    icon: MessageSquare,
    label: "Open to",
    value: "Full-time, Freelance",
  },
  {
    icon: Code2,
    label: "Interests",
    value: "Full Stack, AI/ML",
  },
];

// const CONTRIBUTION_COLORS = [
//   "bg-surface-container-high",
//   "bg-primary/15",
//   "bg-primary/35",
//   "bg-primary/60",
//   "bg-primary",
// ];

// ─── Contribution graph ───────────────────────────────────
// function ContributionGraph() {
//   const cells = Array.from({ length: 364 }, (_, i) => {
//     // weighted random — more low values for realism
//     const seed = Math.sin(i * 12.9898) * 43758.5453;
//     const rand = seed - Math.floor(seed);

//     const intensity =
//       rand < 0.45 ? 0 : rand < 0.65 ? 1 : rand < 0.8 ? 2 : rand < 0.92 ? 3 : 4;
//     return intensity;
//   });

//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   return (
//     <div className="space-y-3">
//       {/* Month labels */}
//       <div className="flex justify-between px-0.5">
//         {months.map((m) => (
//           <span key={m} className="font-mono text-[9px] text-text-muted/60">
//             {m}
//           </span>
//         ))}
//       </div>

//       {/* Grid */}
//       <div
//         className="grid gap-0.75"
//         style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
//       >
//         {cells.map((intensity, i) => (
//           <div
//             key={i}
//             title={`${intensity} contributions`}
//             className={`aspect-square rounded-xs ${CONTRIBUTION_COLORS[intensity]} transition-opacity hover:opacity-80`}
//           />
//         ))}
//       </div>

//       {/* Legend */}
//       <div className="flex items-center gap-2 justify-end">
//         <span className="font-mono text-[9px] text-text-muted/60">Less</span>
//         {CONTRIBUTION_COLORS.map((c, i) => (
//           <div key={i} className={`w-2.5 h-2.5 rounded-xs ${c}`} />
//         ))}
//         <span className="font-mono text-[9px] text-text-muted/60">More</span>
//       </div>
//     </div>
//   );
// }

// ─── Stats bar ────────────────────────────────────────────
// function StatBar({
//   label,
//   value,
//   percent,
//   color,
// }: {
//   label: string;
//   value: string;
//   percent: number;
//   color: string;
// }) {
//   return (
//     <div className="space-y-1.5">
//       <div className="flex justify-between items-center">
//         <span className="font-mono text-xs text-text-secondary">{label}</span>
//         <span className="font-mono text-xs text-text-muted">{value}</span>
//       </div>
//       <div className="w-full h-1 rounded-full bg-surface-container-high overflow-hidden">
//         <motion.div
//           className={`h-full rounded-full ${color}`}
//           initial={{ width: 0 }}
//           whileInView={{ width: `${percent}%` }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//         />
//       </div>
//     </div>
//   );
// }

// ─── Contact Form ─────────────────────────────────────────
function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // console.log("Form submitted:", formData);

    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("API response:", data);

    // Simulate API call — replace with your actual endpoint
    if (data.success) {
      setFormState("success");
    } else {
      setFormState("error");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setFormState("idle");
  };

  const inputBase =
    "w-full bg-bg-deep border rounded px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted/40 outline-none transition-all duration-200";
  const inputIdle = "border-border-subtle hover:border-primary/30";
  const inputFocused =
    "border-primary/60 shadow-[0_0_0_3px_rgba(173,198,255,0.08)]";

  if (formState === "error") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-center space-y-5 py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
            className="w-16 h-16 rounded-full bg-primary/10 border border-destructive/30 flex items-center justify-center"
          >
            <CircleAlert size={28} className="text-destructive" />
          </motion.div>
          <div>
            <h3 className="font-display font-bold text-xl text-text-primary mb-1">
              Something went wrong.
            </h3>
            <p className="text-text-muted text-sm font-sans">
              Looks like there was some error. Please try again later.
            </p>
          </div>
          <button className="font-mono text-xs text-primary hover:underline underline-offset-4">
            Try again
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {formState === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-center space-y-5 py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
            className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
          >
            <CheckCircle size={28} className="text-primary" />
          </motion.div>
          <div>
            <h3 className="font-display font-bold text-xl text-text-primary mb-1">
              Message sent.
            </h3>
            <p className="text-text-muted text-sm font-sans">
              I&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="font-mono text-xs text-primary hover:underline underline-offset-4"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="Alex Chen"
                required
                className={`${inputBase} ${focused === "name" ? inputFocused : inputIdle}`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="alex@company.com"
                required
                className={`${inputBase} ${focused === "email" ? inputFocused : inputIdle}`}
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocused("subject")}
              onBlur={() => setFocused(null)}
              required
              className={`${inputBase} ${focused === "subject" ? inputFocused : inputIdle} cursor-pointer`}
            >
              <option value="" disabled>
                Select a topic...
              </option>
              <option value="fulltime">Full-time opportunity</option>
              <option value="freelance">Freelance / Contract</option>
              <option value="opensource">Open source collaboration</option>
              <option value="consulting">Technical consulting</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              placeholder="Tell me about your project or role..."
              required
              rows={5}
              className={`${inputBase} resize-none ${focused === "message" ? inputFocused : inputIdle}`}
            />
          </div>

          {/* Character count */}
          <div className="flex justify-end">
            <span
              className={`font-mono text-[10px] transition-colors ${
                formData.message.length > 450
                  ? "text-primary"
                  : "text-text-muted/40"
              }`}
            >
              {formData.message.length} / 500
            </span>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={formState === "loading"}
            className="w-full flex items-center justify-center gap-2 py-3 rounded bg-brand-primary text-brand-on-primary font-mono text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formState === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={15} />
                Send Message
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 pb-24 space-y-16">
      {/* ── Page Header ── */}
      <header className="space-y-4 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs text-primary uppercase tracking-widest"
        >
          Get in touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="font-display font-black text-4xl md:text-6xl text-text-primary tracking-tighter leading-none"
        >
          Let&apos;s build something
          <br />
          <span className="text-primary">together.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-text-muted text-sm leading-relaxed max-w-lg"
        >
          Available for full-time roles, freelance contracts, and open-source
          collaboration. Reach out — I respond to every message.
        </motion.p>
      </header>

      {/* ── Main bento grid ── */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="border border-border-subtle rounded-xl bg-bg-surface p-6 md:p-8 h-full">
            <div className="mb-6 text-center">
              <h2 className="font-display font-bold text-xl text-text-primary">
                Send a message
              </h2>
              <p className="font-mono text-xs text-text-muted mt-1">
                I read every message personally.
              </p>
            </div>
            <ContactForm />
          </div>
        </motion.div>
      </div>

      {/* ── Availability strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {AVAILABILITY.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="border border-border-subtle rounded-xl bg-bg-surface p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={14} className="text-primary" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  {item.label}
                </p>
                <p className="font-display font-bold text-sm text-text-primary mt-0.5">
                  {item.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Socials ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          Find me online
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOCIALS.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="group flex items-start gap-3 p-4 border border-border-subtle rounded-xl bg-bg-surface hover:border-primary/40 hover:bg-bg-elevated transition-all duration-200"
              >
                <div className="w-9 h-9 rounded bg-bg-deep border border-border-subtle flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:text-primary transition-all duration-200">
                  <Icon
                    size={16}
                    className="text-text-muted group-hover:text-primary transition-colors"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm text-text-primary group-hover:text-primary transition-colors">
                    {social.label}
                  </p>
                  <p className="font-mono text-[10px] text-text-muted truncate mt-0.5">
                    {social.handle}
                  </p>
                  <p className="font-sans text-[11px] text-text-muted/60 mt-1 leading-snug">
                    {social.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </motion.section>

      {/* ── Bottom CTA strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border border-border-subtle rounded-xl bg-bg-surface p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">
            Prefer email?
          </p>
          <p className="font-display font-bold text-lg text-text-primary">
            maheshnashier14@gmail.com
          </p>
        </div>
        <a
          href="mailto:maheshnashier14@gmail.com"
          className="flex items-center gap-2 px-6 py-3 rounded bg-brand-primary text-brand-on-primary font-mono text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all duration-200 shrink-0"
        >
          <Mail size={15} /> Open Mail
        </a>
      </motion.div>
    </div>
  );
}
