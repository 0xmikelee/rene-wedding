"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { attendanceOptions, menuOptions, rsvpSchema, type RsvpField } from "@/lib/rsvp";

type FieldErrors = Partial<Record<RsvpField, string>>;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  attending: "yes" | "no";
  dietary: string;
  menu: "regular" | "vegan";
  company: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  attending: "yes",
  dietary: "",
  menu: "regular",
  company: "",
};

function firstError(errors: string[] | undefined) {
  return errors?.[0];
}

export function RsvpForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const parsed = rsvpSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        firstName: firstError(flat.firstName),
        lastName: firstError(flat.lastName),
        email: firstError(flat.email),
        attending: firstError(flat.attending),
        dietary: firstError(flat.dietary),
        menu: firstError(flat.menu),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const payload = (await response.json()) as {
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok) {
        setFieldErrors(payload.fieldErrors ?? {});
        setFormError(payload.error || "We couldn’t save your RSVP. Please try again.");
        return;
      }

      setIsComplete(true);
    } catch {
      setFormError("We couldn’t save your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    const isAttending = values.attending === "yes";
    return (
      <div className="rounded-[4px] border border-line bg-cream px-6 py-16 text-center shadow-[0_8px_12px_rgba(0,0,0,0.07)] lg:rounded-[5px] lg:px-12 lg:shadow-none">
        <p className="font-display text-4xl font-light uppercase">Thank you</p>
        <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-ink/80">
          {isAttending
            ? "Your RSVP has been received. We can’t wait to celebrate with you."
            : "Thank you for letting us know. You will be missed."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full flex-col gap-6 rounded-[4px] border border-line bg-cream p-6 shadow-[0_8px_12px_rgba(0,0,0,0.07)] lg:gap-8 lg:rounded-[5px] lg:p-12 lg:shadow-none"
    >
      <div className="flex flex-col gap-5 lg:gap-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
          <Field
            id="first-name"
            label="First Name"
            error={fieldErrors.firstName}
            className="lg:flex-1"
          >
            <input
              id="first-name"
              name="firstName"
              autoComplete="given-name"
              placeholder="First Name"
              value={values.firstName}
              onChange={(event) => update("firstName", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field
            id="last-name"
            label="Last Name"
            error={fieldErrors.lastName}
            className="lg:flex-1"
          >
            <input
              id="last-name"
              name="lastName"
              autoComplete="family-name"
              placeholder="Last Name"
              value={values.lastName}
              onChange={(event) => update("lastName", event.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field id="email" label="Email Address" error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="hello@example.com"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass}
          />
        </Field>

        <fieldset>
          <legend className={labelClass}>Will you be attending?</legend>
          <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:gap-4">
            {attendanceOptions.map((option) => {
              const selected = values.attending === option.value;
              return (
                <label
                  key={option.value}
                  className={`relative flex flex-1 cursor-pointer items-center gap-3 rounded-md border p-3 lg:rounded-lg lg:p-4 ${
                    selected
                      ? "border-dark bg-dark text-white"
                      : "border-line text-ink/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={option.value}
                    checked={selected}
                    onChange={() => update("attending", option.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <RadioDot selected={selected} inverted={selected} />
                  <span className="text-[13px] tracking-[0.13px] uppercase">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
          {fieldErrors.attending ? (
            <p className="mt-2 text-xs text-[#8a3d3d]">{fieldErrors.attending}</p>
          ) : null}
        </fieldset>

        <Field
          id="dietary"
          label={
            <>
              <span className="lg:hidden">Do you have any dietary restrictions?</span>
              <span className="hidden lg:inline">Do you have any food allergies?</span>
            </>
          }
          error={fieldErrors.dietary}
        >
          <textarea
            id="dietary"
            name="dietary"
            rows={3}
            placeholder="Please type ‘NA’ if you have no allergies."
            value={values.dietary}
            onChange={(event) => update("dietary", event.target.value)}
            className={`${inputClass} h-20 resize-none text-xs placeholder:text-xs lg:h-[120px]`}
          />
        </Field>

        <fieldset>
          <legend className={labelClass}>Menu preference</legend>
          <div className="mt-3 flex flex-col gap-2">
            {menuOptions.map((option) => {
              const selected = values.menu === option.value;
              return (
                <label
                  key={option.value}
                  className="relative flex cursor-pointer items-center gap-3 rounded-md border border-line p-3 lg:rounded-lg lg:p-3.5"
                >
                  <input
                    type="radio"
                    name="menu"
                    value={option.value}
                    checked={selected}
                    onChange={() => update("menu", option.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <RadioDot selected={selected} />
                  <span className="font-display text-sm font-light">{option.label}</span>
                </label>
              );
            })}
          </div>
          {fieldErrors.menu ? (
            <p className="mt-2 text-xs text-[#8a3d3d]">{fieldErrors.menu}</p>
          ) : null}
        </fieldset>
      </div>

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </label>
      </div>

      {formError ? (
        <p role="alert" className="text-sm text-[#8a3d3d]">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-dark px-4 py-3.5 text-[13px] tracking-[0.13px] text-white uppercase disabled:opacity-60 lg:rounded-lg lg:py-4"
      >
        {isSubmitting ? "Sending" : "Submit"}
      </button>
    </form>
  );
}

const labelClass =
  "text-xs leading-normal tracking-[0.04em] text-ink uppercase";

const inputClass =
  "w-full rounded-md border border-line bg-field px-3 py-3 font-display text-[15px] font-light text-ink outline-none placeholder:text-ink/50 focus:border-ink lg:rounded-lg lg:px-4 lg:py-4 lg:text-base";

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-[#8a3d3d]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function RadioDot({ selected, inverted = false }: { selected: boolean; inverted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-3.5 shrink-0 place-items-center rounded-full border ${
        inverted ? "border-white" : "border-ink"
      }`}
    >
      {selected ? (
        <span className={`size-2 rounded-full ${inverted ? "bg-white" : "bg-ink"}`} />
      ) : null}
    </span>
  );
}
