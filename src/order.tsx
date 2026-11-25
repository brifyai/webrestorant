import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { clp } from './lib/format';

export interface OrderLine {
  /** Unique key: same product + same variant/extras stack into one line. */
  key: string;
  name: string;
  detail?: string;
  unitPrice: number;
  qty: number;
}

type NewLine = Omit<OrderLine, 'qty'>;

interface OrderValue {
  lines: readonly OrderLine[];
  count: number;
  total: number;
  bump: number;
  isOpen: boolean;
  add: (line: NewLine) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const OrderContext = createContext<OrderValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<OrderLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const add = useCallback((line: NewLine) => {
    setLines((prev) => {
      const found = prev.find((l) => l.key === line.key);
      if (found) return prev.map((l) => (l.key === line.key ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { ...line, qty: 1 }];
    });
    setBump((b) => b + 1);
    setToast(`${line.name} · ${clp(line.unitPrice)} agregado`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))));
  }, []);

  const value = useMemo<OrderValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0);
    return {
      lines,
      count,
      total,
      bump,
      isOpen,
      add,
      setQty,
      clear: () => setLines([]),
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  }, [lines, bump, isOpen, add, setQty]);

  return (
    <OrderContext.Provider value={value}>
      {children}
      <div className={`toast${toast ? ' is-on' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside <OrderProvider>');
  return ctx;
}

/** Plain-text order, ready for WhatsApp or the clipboard. */
export function orderToText(lines: readonly OrderLine[], total: number): string {
  const body = lines
    .map((l) => `• ${l.qty} × ${l.name}${l.detail ? ` (${l.detail})` : ''} — ${clp(l.unitPrice * l.qty)}`)
    .join('\n');
  return `¡Hola Compadres! Quiero pedir:\n${body}\n\nTotal: ${clp(total)}`;
}
