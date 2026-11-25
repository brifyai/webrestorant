import { CartProvider } from './cart';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Tare } from './components/Tare';
import { Press } from './components/Press';
import { Menu } from './components/Menu';
import { Roots } from './components/Roots';
import { Reviews } from './components/Reviews';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';

export function App() {
  return (
    <CartProvider>
      <span id="top" />
      <Header />
      <main>
        <Hero />
        <Marquee tone="white" phrases={['Fresh off the coals', 'Tare bottled weekly', 'Walk-ins welcome', 'Late kitchen Fri & Sat']} />
        <Tare />
        <Press />
        <Menu />
        <Roots />
        <Reviews />
        <Marquee tone="cream" reverse phrases={['Come hungry', 'Leave smoky', 'Bring a friend', 'Order more skewers']} />
        <Visit />
      </main>
      <Footer />
    </CartProvider>
  );
}
