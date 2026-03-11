"use client";

import React, { useState, useCallback, useRef, memo } from "react";
import { Sparkles, Upload, Linkedin, Mail, Briefcase, User, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";

interface FormState {
  name: string;
  jobTitle: string;
  linkedinProfile: string;
  email: string;
  message: string;
}

interface FieldError {
  name?: string;
  message?: string;
  linkedinProfile?: string;
  email?: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  jobTitle: "",
  linkedinProfile: "",
  email: "",
  message: "",
};

function ReviewForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMsg, setSubmitMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── handlers ── */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      // Clear error on typing
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const handleImgChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setSubmitStatus("error");
      setSubmitMsg("Image must be smaller than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const clearImage = useCallback(() => {
    setImgPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: FieldError = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters.";
    if (!form.message.trim() || form.message.trim().length < 20)
      newErrors.message = "Review must be at least 20 characters.";
    if (form.message.trim().length > 1000)
      newErrors.message = "Review cannot exceed 1000 characters.";
    if (
      form.linkedinProfile &&
      !/^(https?:\/\/)?(www\.)?linkedin\.com\/.+/.test(form.linkedinProfile)
    )
      newErrors.linkedinProfile = "Must be a valid linkedin.com URL.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Must be a valid email address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      setSubmitStatus("idle");
      setSubmitMsg("");

      try {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            jobTitle: form.jobTitle.trim(),
            linkedinProfile: form.linkedinProfile.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
            profileImage: imgPreview ?? "",
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setSubmitStatus("success");
          setSubmitMsg("Thank you! Your review has been submitted.");
          setForm(INITIAL_FORM);
          setImgPreview(null);
          if (fileRef.current) fileRef.current.value = "";
        } else {
          setSubmitStatus("error");
          setSubmitMsg(data.error || "Submission failed. Please try again.");
        }
      } catch {
        setSubmitStatus("error");
        setSubmitMsg("Network error. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, imgPreview, validate]
  );

  /* ── render ── */
  return (
    <div className="rf-wrapper">
      <h3 className="rf-title">Add Your Review</h3>
      <p className="rf-subtitle">Share your experience working with me</p>

      {/* Status Banner */}
      {submitStatus !== "idle" && (
        <div className={`rf-banner rf-banner--${submitStatus}`} role="alert">
          {submitStatus === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span>{submitMsg}</span>
        </div>
      )}

      <form className="rf-form" onSubmit={handleSubmit} noValidate>
        {/* Top row: Image + fields */}
        <div className="rf-top-row">
          {/* Profile Image Upload */}
          <div className="rf-img-col">
            <label className="rf-img-label" title="Upload profile photo">
              {imgPreview ? (
                <div className="rf-img-preview-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgPreview} alt="Preview" className="rf-img-preview" />
                  <button
                    type="button"
                    className="rf-img-clear"
                    onClick={clearImage}
                    aria-label="Remove photo"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="rf-img-placeholder">
                  <Upload size={18} />
                  <span>Photo</span>
                  <span className="rf-img-hint">optional</span>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImgChange}
                hidden
              />
            </label>
          </div>

          {/* Name + Job Title */}
          <div className="rf-fields-col">
            <div className="rf-field">
              <label htmlFor="rf-name" className="rf-label">
                <User size={13} /> Name <span className="rf-req">*</span>
              </label>
              <input
                id="rf-name"
                name="name"
                type="text"
                className={`rf-input ${errors.name ? "rf-input--err" : ""}`}
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                maxLength={100}
                required
              />
              {errors.name && <span className="rf-err">{errors.name}</span>}
            </div>
            <div className="rf-field">
              <label htmlFor="rf-jobTitle" className="rf-label">
                <Briefcase size={13} /> Job Title
              </label>
              <input
                id="rf-jobTitle"
                name="jobTitle"
                type="text"
                className="rf-input"
                placeholder="e.g. Senior Engineer"
                value={form.jobTitle}
                onChange={handleChange}
                maxLength={150}
              />
            </div>
          </div>
        </div>

        {/* LinkedIn + Email row */}
        <div className="rf-row">
          <div className="rf-field">
            <label htmlFor="rf-linkedin" className="rf-label">
              <Linkedin size={13} /> LinkedIn Profile
            </label>
            <input
              id="rf-linkedin"
              name="linkedinProfile"
              type="url"
              className={`rf-input ${errors.linkedinProfile ? "rf-input--err" : ""}`}
              placeholder="https://linkedin.com/in/yourprofile"
              value={form.linkedinProfile}
              onChange={handleChange}
              maxLength={300}
            />
            {errors.linkedinProfile && (
              <span className="rf-err">{errors.linkedinProfile}</span>
            )}
          </div>
          <div className="rf-field">
            <label htmlFor="rf-email" className="rf-label">
              <Mail size={13} /> Email <span className="rf-opt">(optional)</span>
            </label>
            <input
              id="rf-email"
              name="email"
              type="email"
              className={`rf-input ${errors.email ? "rf-input--err" : ""}`}
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              maxLength={200}
            />
            {errors.email && <span className="rf-err">{errors.email}</span>}
          </div>
        </div>

        {/* Message */}
        <div className="rf-field">
          <label htmlFor="rf-message" className="rf-label">
            Review <span className="rf-req">*</span>
            <span className="rf-char-count">
              {form.message.length}/1000
            </span>
          </label>
          <textarea
            id="rf-message"
            name="message"
            className={`rf-input rf-textarea ${errors.message ? "rf-input--err" : ""}`}
            placeholder="What was it like working with me? (min. 20 characters)"
            value={form.message}
            onChange={handleChange}
            rows={4}
            maxLength={1000}
            required
          />
          {errors.message && <span className="rf-err">{errors.message}</span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary rf-submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="rf-spin" /> Submitting…
            </>
          ) : (
            <>
              <Sparkles size={16} /> Submit My Review
            </>
          )}
        </button>
      </form>

      <style>{`
        .rf-wrapper {
          background: linear-gradient(135deg, rgba(6,182,212,0.04) 0%, rgba(139,92,246,0.04) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          backdrop-filter: blur(12px);
          margin-top: 3rem;
        }
        .rf-title {
          font-size: clamp(1.25rem, 2.5vw, 1.6rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .rf-subtitle {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          margin-bottom: 1.5rem;
        }
        .rf-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
        }
        .rf-banner--success {
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.3);
          color: #10b981;
        }
        .rf-banner--error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
        }
        .rf-form { display: flex; flex-direction: column; gap: 1.1rem; }
        .rf-top-row { display: flex; gap: 1.25rem; align-items: flex-start; }
        .rf-img-col { flex-shrink: 0; }
        .rf-img-label { cursor: pointer; display: block; }
        .rf-img-placeholder {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          border: 2px dashed rgba(6,182,212,0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: rgba(255,255,255,0.4);
          font-size: 0.72rem;
          transition: border-color 0.2s, color 0.2s;
        }
        .rf-img-placeholder:hover { border-color: rgba(6,182,212,0.7); color: rgba(255,255,255,0.7); }
        .rf-img-hint { font-size: 0.65rem; opacity: 0.6; }
        .rf-img-preview-wrap { position: relative; width: 88px; height: 88px; }
        .rf-img-preview {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(6,182,212,0.5);
        }
        .rf-img-clear {
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(239,68,68,0.8);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .rf-fields-col { flex: 1; display: flex; flex-direction: column; gap: 0.9rem; min-width: 0; }
        .rf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .rf-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .rf-label {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .rf-req { color: #f87171; }
        .rf-opt { color: rgba(255,255,255,0.3); font-weight: 400; text-transform: none; letter-spacing: 0; }
        .rf-char-count { margin-left: auto; font-weight: 400; text-transform: none; letter-spacing: 0; color: rgba(255,255,255,0.3); }
        .rf-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 0.65rem 0.9rem;
          color: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .rf-input::placeholder { color: rgba(255,255,255,0.25); }
        .rf-input:focus {
          border-color: rgba(6,182,212,0.5);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.12);
        }
        .rf-input--err { border-color: rgba(239,68,68,0.5); }
        .rf-input--err:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }
        .rf-textarea { resize: vertical; min-height: 100px; }
        .rf-err { font-size: 0.775rem; color: #f87171; }
        .rf-submit {
          align-self: flex-start;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        .rf-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .rf-spin { animation: rfSpin 0.8s linear infinite; }
        @keyframes rfSpin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .rf-top-row { flex-direction: column; align-items: center; }
          .rf-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default memo(ReviewForm);
