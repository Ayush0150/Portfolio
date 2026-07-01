import { useState } from "react";
import { Send, Loader2, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";
import { API_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

const EMPTY = { name: "", email: "", message: "" };

function mailtoFallback(form) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
  const body = encodeURIComponent(
    `${form.message}\n\n— ${form.name} (${form.email})`,
  );
  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      // No mail provider configured → gracefully open the user's mail client.
      if (res.status === 501 || data?.fallback) {
        window.location.href = mailtoFallback(form);
        setStatus("success");
        return;
      }

      if (!res.ok) {
        throw new Error(
          data?.error ?? "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[22rem] flex-col items-center justify-center gap-4 rounded-2xl glass p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-linear-to-br from-primary to-accent text-white">
          <Check className="size-6" />
        </span>
        <h3 className="font-display text-xl font-semibold">
          Message on its way
        </h3>
        <p className="max-w-xs text-sm text-muted">
          Thanks for reaching out — I&apos;ll get back to you at the email you
          provided as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-light"
        >
          <RotateCcw className="size-4" />
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          value={form.name}
          placeholder="Your name"
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />

        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          placeholder="you@company.com"
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell me about the role, project, or idea you have in mind…"
          className="resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary/50 focus:bg-white/[0.04]"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="mt-1 w-full"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-faint">
        Prefer email? Reach me directly at{" "}
        <a
          href={siteConfig.links.email}
          className="text-muted underline-offset-2 hover:text-foreground hover:underline"
        >
          {siteConfig.email}
        </a>
      </p>
    </form>
  );
}

function Field({ label, name, value, placeholder, type = "text", onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-medium text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-primary/50 focus:bg-white/[0.04]",
        )}
      />
    </div>
  );
}
