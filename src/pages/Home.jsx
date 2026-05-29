import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await getDocs(collection(db, 'artists'));
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setArtists(docs);

        const combined = [];
        for (const artist of docs) {
          if (Array.isArray(artist.artworks)) {
            for (const url of artist.artworks) {
              combined.push({ url, artistName: artist.name, artistId: artist.id });
              if (combined.length === 6) break;
            }
          }
          if (combined.length === 6) break;
        }
        setArtworks(combined);
      } catch {
        // silently handle Firebase not configured yet
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-black text-white">

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-svh text-center px-6"
        style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000 70%)' }}>
        <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-6">
          Auckland, New Zealand
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 uppercase">
          Ink the<br />Moment
        </h1>
        <p className="text-white/50 text-sm md:text-base tracking-widest uppercase mb-10">
          Japanese &amp; Woodblock Print Tattoo Studio
        </p>
        <Link
          to="/appointments"
          className="px-8 py-3 border border-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200"
        >
          Book Now
        </Link>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-white/20">
          <div className="w-px h-12 bg-white/20" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <span className="w-8 h-px bg-white/30" />
            <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">Our Work</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : artworks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {artworks.map(({ url, artistName, artistId }, i) => (
                <Link key={i} to={`/artists/${artistId}`} className="group relative aspect-square overflow-hidden">
                  <img
                    src={url}
                    alt={`Artwork by ${artistName}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 flex items-center justify-center">
                  <span className="text-white/20 text-xs tracking-widest uppercase">Coming Soon</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/artists"
              className="text-sm tracking-widest uppercase text-white/50 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors duration-200"
            >
              View All Artists
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-10">
            <span className="w-8 h-px bg-white/30" />
            <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">About the Studio</h2>
            <span className="w-8 h-px bg-white/30" />
          </div>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
            Yeah Tattoo is an Auckland-based studio specialising in Japanese and woodblock print tattooing.
            Each piece is crafted with intention — rooted in tradition, shaped for the individual.
          </p>
          <Link
            to="/about"
            className="text-sm tracking-widest uppercase text-white/50 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors duration-200"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* Meet the Artists */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <span className="w-8 h-px bg-white/30" />
            <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">Meet the Artists</h2>
          </div>

          {artists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artists/${artist.id}`}
                  className="group block border border-white/10 hover:border-white/30 transition-colors duration-300"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-white/5">
                    {artist.profileImage ? (
                      <img
                        src={artist.profileImage}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-xs tracking-widest uppercase">
                        Photo
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold tracking-wide">{artist.name}</p>
                    <p className="text-white/40 text-xs tracking-widest uppercase mt-1">{artist.specialty}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/30 text-sm tracking-widest uppercase py-12">
              Artists coming soon
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/artists"
              className="text-sm tracking-widest uppercase text-white/50 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors duration-200"
            >
              All Artists
            </Link>
          </div>
        </div>
      </section>

      {/* Book CTA banner */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Ready?</p>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8">
          Start Your Tattoo Journey
        </h2>
        <Link
          to="/appointments"
          className="inline-block px-10 py-4 border border-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200"
        >
          Book an Appointment
        </Link>
      </section>
    </div>
  );
}
