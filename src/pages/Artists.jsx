import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import ArtistCard from '../components/ArtistCard.jsx';

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const snapshot = await getDocs(collection(db, 'artists'));
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setArtists(docs);
      } catch (err) {
        setError('Unable to load artists.');
      } finally {
        setLoading(false);
      }
    }
    fetchArtists();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Page header */}
      <div className="border-b border-white/10 py-20 px-6 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Yeah Tattoo</p>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Our Artists</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-white/10 animate-pulse">
                <div className="aspect-[4/5] bg-white/5" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-white/40 text-center text-sm tracking-widest uppercase py-20">{error}</p>
        )}

        {!loading && !error && artists.length === 0 && (
          <p className="text-white/30 text-center text-sm tracking-widest uppercase py-20">
            Artists coming soon
          </p>
        )}

        {!loading && !error && artists.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
