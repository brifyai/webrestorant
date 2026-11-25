import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

interface CartValue {
  count: number;
  /** Incremented on every add so the header can replay its bump animation. */
  bumpKey: number;
  add: (name: string, qty: number) => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [bumpKey, setBumpKey] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const add = useCallback((name: string, qty: number) => {
    setCount((c) => c + qty);
    setBumpKey((k) => k + 1);
    setToast(`+${qty} ${name} added to your bag`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const value = useMemo(() => ({ count, bumpKey, add }), [count, bumpKey, add]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <div className={`toast${toast ? ' is-on' : ''}`} aria-live="polite">
        {toast}
      </div>
    </CartContext.Provider>
  );
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
