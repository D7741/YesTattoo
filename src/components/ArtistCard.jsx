import { Link } from 'react-router-dom';

export default function ArtistCard({ artist }) {
  const { id, name, specialty, profileImage, instagram } = artist;

  return (
    <div className="group border border-white/10 hover:border-white/30 transition-colors duration-300">
      <Link to={`/artists/${id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden bg-white/5">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-xs tracking-widest uppercase">
              Photo
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="text-white font-semibold text-lg tracking-wide">{name}</p>
          <p className="text-white/40 text-xs tracking-widest uppercase mt-1">{specialty}</p>
        </div>
      </Link>

      {instagram && (
        <div className="px-5 pb-5">
          <a
            href={`https://www.instagram.com/${instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors duration-200"
          >
            {instagram}
          </a>
        </div>
      )}
    </div>
  );
}
