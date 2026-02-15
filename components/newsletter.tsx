"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      window.open(
        `https://saianjan.substack.com/subscribe?email=${encodeURIComponent(email)}`,
        "_blank",
      );
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter</CardTitle>
        <CardDescription>
          Subscribe for updates on UX strategy, AI product design, and design engineering.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="h-10"
          />
          <Button type="submit" disabled={status === "loading"} className="sm:w-auto">
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed" : "Subscribe"}
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-3 text-sm text-emerald-600">Redirecting to Substack to complete subscription...</p>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-destructive">Something went wrong. Please try again.</p>
        )}
      </CardContent>
    </Card>
  );
}
