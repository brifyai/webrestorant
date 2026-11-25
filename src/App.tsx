import { useState } from 'react';
import { OrderProvider } from './order';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Carta } from './components/Carta';
import { RollBuilder } from './components/RollBuilder';
import { Promos } from './components/Promos';
import { CartaImpresa } from './components/CartaImpresa';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';

export type Mode = 'sushi' | 'sanguche';

export function App() {
  const [mode, setMode] = useState<Mode>('sushi');

  return (
    <OrderProvider>
      {/* data-mode swaps the accent palette across the whole page */}
      <div className="site" data-mode={mode}>
        <Header />
        <main>
          <Hero mode={mode} onModeChange={setMode} />
          <Ticker />
          <Carta mode={mode} />
          <RollBuilder />
          <Promos />
          <CartaImpresa />
        </main>
        <Footer />
        <OrderDrawer />
      </div>
    </OrderProvider>
  );
}
