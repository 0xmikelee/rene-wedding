"use client";

import { useActionState } from "react";
import { unlockSite, type UnlockState } from "@/app/unlock/actions";

const initialState: UnlockState = {};

export function PasswordGate({
  nextPath,
  isConfigured,
}: {
  nextPath: string;
  isConfigured: boolean;
}) {
  const [state, action, isPending] = useActionState(unlockSite, initialState);
  const error = state.error;

  return (
    <form action={action} className="flex w-full max-w-[360px] flex-col gap-6">
      <input type="hidden" name="next" value={nextPath} />
      <div className="flex flex-col gap-2">
        <label htmlFor="site-password" className="text-xs tracking-[0.04em] text-ink uppercase">
          Password
        </label>
        <input
          id="site-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required={isConfigured}
          disabled={!isConfigured}
          placeholder="Invitation password"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={error ? "site-password-error" : undefined}
          className="w-full rounded-md border border-line bg-field px-3 py-3 font-display text-[15px] font-light text-ink outline-none placeholder:text-ink/50 focus:border-ink disabled:opacity-60 lg:rounded-lg lg:px-4 lg:py-4 lg:text-base"
        />
        {error ? (
          <p id="site-password-error" role="alert" className="text-xs text-[#8a3d3d]">
            {error}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={isPending || !isConfigured}
        className="w-full rounded-md bg-dark px-4 py-3.5 text-[13px] tracking-[0.13px] text-white uppercase disabled:opacity-60 lg:rounded-lg lg:py-4"
      >
        {isPending ? "Entering" : "Enter"}
      </button>
    </form>
  );
}
