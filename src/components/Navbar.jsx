import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/artists', label: 'Artists' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Yeah Tattoo"
            className="h-8 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'block';
            }}
          />
          <span
            className="hidden text-white text-xl font-bold tracking-widest uppercase"
            style={{ display: 'none' }}
          >
            Yeah Tattoo
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm tracking-widest uppercase transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Book Now CTA */}
        <div className="hidden md:flex">
          <Link
            to="/appointments"
            className="px-5 py-2 text-sm tracking-widest uppercase border border-white text-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px bg-white mb-1.5" />
          <span className="block w-6 h-px bg-white mb-1.5" />
          <span className="block w-6 h-px bg-white" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm tracking-widest uppercase ${
                  isActive ? 'text-white' : 'text-white/60'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/appointments"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-2 text-sm tracking-widest uppercase border border-white text-white text-center hover:bg-white hover:text-black transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
