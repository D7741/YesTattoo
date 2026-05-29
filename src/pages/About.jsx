import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Rooted in Tradition',
    body: 'Japanese tattooing is one of the oldest and most disciplined art forms in the world. We honour that lineage — studying its history, symbolism, and technique — while making each piece personal to the wearer.',
  },
  {
    title: 'Crafted for the Individual',
    body: 'No two bodies, stories, or visions are the same. Every tattoo begins with a conversation. We listen before we draw, and draw before we ink.',
  },
  {
    title: 'Quality Over Speed',
    body: 'We take only the appointments we can give full attention to. A tattoo is permanent — it deserves the time and care to be done right.',
  },
];

const styles = [
  {
    name: 'Japanese Traditional',
    description:
      'Bold outlines, solid colour fields, and iconic motifs — koi, dragons, peonies, waves. Designed to age gracefully and read powerfully on the skin.',
  },
  {
    name: 'Woodblock Print (版画)',
    description:
      'Inspired by ukiyo-e masters like Hokusai and Hiroshige. Flowing line work, flat colour, and a graphic quality that turns skin into living art.',
  },
  {
    name: 'Neo-Japanese',
    description:
      'Traditional subjects interpreted with a contemporary eye — refined composition, subtle shading, and a lighter touch that bridges old and new.',
  },
];

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Page header */}
      <div className="border-b border-white/10 py-20 px-6 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Yeah Tattoo</p>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">About the Studio</h1>
      </div>

      {/* Studio story */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="flex items-center gap-6 mb-10">
          <span className="w-8 h-px bg-white/30" />
          <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">Our Story</h2>
        </div>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          Yeah Tattoo was born from a simple conviction: that a tattoo should mean something. Not just look good on the day — but carry weight, tell a story, and wear well for a lifetime.
        </p>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          Based in Pakuranga, Auckland, our studio was founded by Maomao — an artist trained in the Japanese and woodblock print tradition. The name "Yeah Tattoo" is an affirmation: yeah, let's do this. Yeah, your idea is worth pursuing. Yeah, this is the moment.
        </p>
        <p className="text-white/70 text-lg leading-relaxed">
          We work with a small number of clients at a time, by appointment only. That's not exclusivity — it's focus. When you sit in our chair, you have our full attention.
        </p>
      </section>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Values */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center gap-6 mb-12">
          <span className="w-8 h-px bg-white/30" />
          <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map(({ title, body }) => (
            <div key={title}>
              <p className="text-white font-semibold tracking-wide mb-3">{title}</p>
              <p className="text-white/50 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/10 bg-[#0a0a0a]">

        {/* Style focus */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex items-center gap-6 mb-12">
            <span className="w-8 h-px bg-white/30" />
            <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">Style Focus — 日式和版画</h2>
          </div>
          <p className="text-white/60 text-base leading-relaxed mb-12 max-w-2xl">
            The Japanese woodblock print tradition — ukiyo-e — is one of the most visually distinctive art forms ever created. Its influence on tattooing runs deep. At Yeah Tattoo, it is the lens through which we see every piece.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {styles.map(({ name, description }) => (
              <div key={name} className="border border-white/10 p-6">
                <p className="text-white text-sm font-semibold tracking-widest uppercase mb-3">{name}</p>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="border-t border-white/10 py-24 px-6 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Ready to begin?</p>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-8">
          Let's Talk About Your Tattoo
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/appointments"
            className="px-8 py-3 border border-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200"
          >
            Book Now
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-white/30 text-white/50 text-sm tracking-widest uppercase hover:border-white hover:text-white transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
