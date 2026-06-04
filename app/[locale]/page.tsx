import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import MenuTeaser from '@/components/sections/MenuTeaser';
import Reviews from '@/components/sections/Reviews';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <MenuTeaser />
      <Reviews />
      <InstagramFeed />
      <Contact />
      <Footer />
    </main>
  );
}
