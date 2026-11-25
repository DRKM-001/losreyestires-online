'use client';
import { useRouter } from 'next/navigation';
import type { FormHTMLAttributes } from 'react';

/** A GET form that applies itself: a select or checkbox change navigates right away, and empty fields stay out of the URL. Works without JS as a plain form. */
export function FilterForm({ action, children, ...rest }: FormHTMLAttributes<HTMLFormElement> & { action: string }) {
  const router = useRouter();
  const go = (form: HTMLFormElement) => {
    const p = new URLSearchParams();
    new FormData(form).forEach((v, k) => {
      const s = String(v).trim();
      if (s) p.set(k, s);
    });
    const qs = p.toString();
    router.push(`${action}${qs ? `?${qs}` : ''}`, { scroll: false });
  };
  return (
    <form
      {...rest}
      action={action}
      onChange={(e) => {
        const t = e.target as HTMLInputElement;
        if (t.tagName === 'SELECT' || t.type === 'checkbox' || t.type === 'radio') go(e.currentTarget);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        go(e.currentTarget);
      }}
    >
      {children}
    </form>
  );
}
