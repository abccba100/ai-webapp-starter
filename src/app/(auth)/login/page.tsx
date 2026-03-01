"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-accent px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "로그인 중..." : "로그인"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState<LoginState | null, FormData>(
    loginAction as (prev: LoginState | null, formData: FormData) => Promise<LoginState>,
    null
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <div className="rounded-card border border-border bg-surface p-8">
        <h1 className="mb-2 text-xl font-semibold text-text">로그인</h1>
        <p className="mb-6 text-sm text-text2">
          이메일과 비밀번호를 입력해 주세요.
        </p>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-text2"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-text placeholder:text-text2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-text2"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-text placeholder:text-text2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          {state && !state.success && (
            <p className="rounded-lg bg-accent3/15 px-3 py-2 text-sm text-accent3">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>

        <p className="mt-6 text-center text-sm text-text2">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-medium text-accent hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
