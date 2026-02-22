"use client";

import { useRef, useState } from "react";

export function SubmitButtonExample() {
  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ✅ Hard lock
    if (submittingRef.current) return;
    submittingRef.current = true;

    setIsSubmitting(true);
    try {
      await fetch("/api/submit", { method: "POST" });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}