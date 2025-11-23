"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Substack embed form submission
      // This will redirect to Substack's subscription page
      window.open(
        `https://saianjan.substack.com/subscribe?email=${encodeURIComponent(email)}`,
        "_blank"
      );
      setStatus("success");
      setEmail("");
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="py-16 border-t" style={{ borderColor: 'rgba(15, 91, 70, 0.15)' }}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="animated-heading text-2xl font-light mb-4">Newsletter</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Subscribe to get updates on my latest writing about UX design, product thinking, and design engineering.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="primary-button text-sm disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        
        {status === "success" && (
          <p className="text-sm text-green-600 mt-3">
            Redirecting to Substack to complete subscription...
          </p>
        )}
        
        {status === "error" && (
          <p className="text-sm text-red-600 mt-3">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}

