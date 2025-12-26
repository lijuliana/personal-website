

"use client";

import { useState } from "react";
import { personalInfo } from "@/data/personal";

const EnvelopeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v16H4z" />
    <path d="m4 4 8 8 8-8" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function ContactPage() {
  const { contact } = personalInfo;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Reset status when user starts typing
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <div className="space-y-5 -mt-4">
      <div className="card p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-indigo-500">
            <EnvelopeIcon />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">CONTACT</h1>
        </div>

        <p className="mb-6 text-sm text-muted">
          Contact me by filling out the form below, or by emailing{" "}
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
            {contact.email}
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-white/80 px-4 py-3 text-sm placeholder:text-muted focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-900/70 dark:text-slate-100"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-white/80 px-4 py-3 text-sm placeholder:text-muted focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-900/70 dark:text-slate-100"
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              required
              rows={6}
              className="w-full resize-y rounded-lg border border-[var(--border)] bg-white/80 px-4 py-3 text-sm placeholder:text-muted focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-900/70 dark:text-slate-100"
            />
          </div>

          {submitStatus === "error" && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
              {errorMessage || "Failed to send message. Please try again."}
            </div>
          )}

          {submitStatus === "success" && (
            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200 flex items-center gap-2">
              <CheckIcon />
              Message sent successfully! I'll get back to you soon.
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              {isSubmitting ? "Sending..." : "Send"}
              {!isSubmitting && <ArrowIcon />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

