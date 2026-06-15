import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import MenuTeaser from '@/components/sections/MenuTeaser';
import Gallery from '@/components/sections/Gallery';
import Press from '@/components/sections/Press';
import Reviews from '@/components/sections/Reviews';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <MenuTeaser />
      <Reviews />
      <About />
      <Gallery />
      <Press />
      <InstagramFeed />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
