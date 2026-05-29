import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-white/60 text-sm">

        {/* Brand */}
        <div>
          <p className="text-white text-base font-bold tracking-widest uppercase mb-3">
            Yeah Tattoo
          </p>
          <p className="leading-relaxed">
            Ink the Moment.<br />
            Japanese & Woodblock Print studio<br />
            based in Auckland, NZ.
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white text-xs tracking-widest uppercase mb-3">Contact</p>
          <address className="not-italic leading-loose">
            15c Anthony Place<br />
            Pakuranga, Auckland 2010<br />
            <a href="tel:02108115162" className="hover:text-white transition-colors">
              021 081 15162
            </a><br />
            <a href="mailto:newzealand.yeah.tattoo@gmail.com" className="hover:text-white transition-colors break-all">
              newzealand.yeah.tattoo@gmail.com
            </a>
          </address>
        </div>

        {/* Links */}
        <div>
          <p className="text-white text-xs tracking-widest uppercase mb-3">Follow</p>
          <a
            href="https://www.instagram.com/maomao_tattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors block mb-2"
          >
            Instagram — @maomao_tattoo
          </a>
          <div className="flex flex-col gap-1 mt-4">
            <Link to="/appointments" className="hover:text-white transition-colors">Book an Appointment</Link>
            <Link to="/about" className="hover:text-white transition-colors">About the Studio</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Find Us</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-white/30 text-xs py-4">
        &copy; {new Date().getFullYear()} Yeah Tattoo. All rights reserved.
      </div>
    </footer>
  );
}
