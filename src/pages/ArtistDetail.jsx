import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export default function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArtist() {
      try {
        const ref = doc(db, 'artists', id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setArtist({ id: snap.id, ...snap.data() });
        } else {
          setError('Artist not found.');
        }
      } catch {
        setError('Unable to load artist.');
      } finally {
        setLoading(false);
      }
    }
    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6 text-white/40">
        <p className="text-sm tracking-widest uppercase">{error}</p>
        <Link to="/artists" className="text-xs tracking-widest uppercase border-b border-white/20 hover:text-white hover:border-white transition-colors">
          Back to Artists
        </Link>
      </div>
    );
  }

  const { name, specialty, bio, instagram, profileImage, artworks = [] } = artist;

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Back link */}
      <div className="border-b border-white/10 px-6 py-4">
        <Link to="/artists" className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-200">
          ← Artists
        </Link>
      </div>

      {/* Artist profile */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

          {/* Profile image */}
          <div className="aspect-[4/5] bg-white/5 overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-xs tracking-widest uppercase">
                Photo
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Artist</p>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2">{name}</h1>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-8">{specialty}</p>

            {bio && (
              <p className="text-white/70 leading-relaxed text-base mb-8">{bio}</p>
            )}

            <div className="flex flex-col gap-4">
              {instagram && (
                <a
                  href={`https://www.instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-widest uppercase text-white/40 hover:text-white border-b border-white/10 hover:border-white pb-1 transition-colors duration-200 w-fit"
                >
                  Instagram — {instagram}
                </a>
              )}
              <Link
                to="/appointments"
                className="mt-4 px-8 py-3 border border-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200 w-fit"
              >
                Book with {name}
              </Link>
            </div>
          </div>
        </div>

        {/* Artwork gallery */}
        {artworks.length > 0 && (
          <div>
            <div className="flex items-center gap-6 mb-10">
              <span className="w-8 h-px bg-white/30" />
              <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">Portfolio</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {artworks.map((url, i) => (
                <div key={i} className="group aspect-square overflow-hidden bg-white/5">
                  <img
                    src={url}
                    alt={`Artwork by ${name} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {artworks.length === 0 && (
          <div className="text-center py-16 border border-white/10">
            <p className="text-white/20 text-sm tracking-widest uppercase">Portfolio coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
