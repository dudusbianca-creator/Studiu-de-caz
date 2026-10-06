"use client";

import { useState, type FormEvent } from "react";
import { db } from "@/lib/db";
import { uid } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/** Formular de părere: datele se salvează în localStorage și se afișează în consolă. */
export function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (name.length < 2) return setError("Scrie un nume de cel puțin 2 caractere.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Adresa de email nu pare corectă.");
    if (message.length < 5) return setError("Mesajul este prea scurt.");

    setError("");
    const row = { id: uid("fb"), name, email, rating, message, createdAt: new Date().toISOString() };
    db.upsert("feedback", row);
    db.track("feedback.sent", `${name} · ${rating}/5`);
    console.table([row]);
    form.reset();
    setRating(5);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="fb-name">Nume</label>
        <input id="fb-name" name="name" type="text" autoComplete="name" placeholder="Ana Popescu" />
      </div>
      <div className="form-row">
        <label htmlFor="fb-email">Email</label>
        <input id="fb-email" name="email" type="email" autoComplete="email" placeholder="ana@exemplu.ro" />
      </div>
      <div className="form-row">
        <span id="fb-rating-label" className="label">Cât de util a fost site-ul?</span>
        <div className="rating" role="radiogroup" aria-labelledby="fb-rating-label">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              className={n <= rating ? "rating-on" : ""}
              onClick={() => setRating(n)}
              aria-label={`${n} din 5`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="fb-message">Mesaj</label>
        <textarea id="fb-message" name="message" rows={4} placeholder="Ce ți-a plăcut și ce ai schimba?" />
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      {sent && <p className="form-ok" role="status">Mulțumim! Mesajul a fost salvat în baza locală și afișat în consolă.</p>}
      <Button type="submit" size="lg">Trimite mesajul</Button>
    </form>
  );
}
