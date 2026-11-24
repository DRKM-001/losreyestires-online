'use client';
// The cart, kept in this browser (localStorage). Prices are re-checked by
// RavnPro at checkout, so what's stored here is a reference, not the bill.
import { useSyncExternalStore } from 'react';

export type CartLine = { id: string; sku: string; name: string; spec: string; image: string | null; price_cents: number; qty: number; ship_flat_cents: number };

const KEY = 'lrt:cart:v1';
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;

function read(): CartLine[] {
  if (cache) return cache;
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(KEY) : null;
    cache = raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}
function write(lines: CartLine[]) {
  cache = lines;
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {}
  listeners.forEach((l) => l());
}
const EMPTY: CartLine[] = [];

export function useCart(): CartLine[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      const onStorage = (e: StorageEvent) => {
        if (e.key === KEY) {
          cache = null;
          l();
        }
      };
      window.addEventListener('storage', onStorage);
      return () => {
        listeners.delete(l);
        window.removeEventListener('storage', onStorage);
      };
    },
    read,
    () => EMPTY,
  );
}

export const cart = {
  add(line: Omit<CartLine, 'qty'>, qty: number) {
    const lines = read().slice();
    const i = lines.findIndex((l) => l.id === line.id);
    if (i >= 0) lines[i] = { ...lines[i], qty: Math.min(16, lines[i].qty + qty) };
    else lines.push({ ...line, qty: Math.min(16, Math.max(1, qty)) });
    write(lines);
  },
  setQty(id: string, qty: number) {
    write(read().map((l) => (l.id === id ? { ...l, qty: Math.min(16, Math.max(1, qty)) } : l)));
  },
  remove(id: string) {
    write(read().filter((l) => l.id !== id));
  },
  clear() {
    write([]);
  },
};

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);
export const cartSubtotal = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty * l.price_cents, 0);
export const cartShipping = (lines: CartLine[]) => (lines.length ? Math.max(0, ...lines.map((l) => l.ship_flat_cents)) : 0);
