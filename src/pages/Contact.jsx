import { Link } from 'react-router-dom';

const contactDetails = [
  {
    label: 'Address',
    lines: ['15c Anthony Place', 'Pakuranga, Auckland 2010'],
    href: 'https://maps.google.com/?q=15c+Anthony+Place+Pakuranga+Auckland+2010',
  },
  {
    label: 'Phone',
    lines: ['021 081 15162'],
    href: 'tel:02108115162',
  },
  {
    label: 'Email',
    lines: ['newzealand.yeah.tattoo@gmail.com'],
    href: 'mailto:newzealand.yeah.tattoo@gmail.com',
  },
  {
    label: 'Instagram',
    lines: ['@maomao_tattoo'],
    href: 'https://www.instagram.com/maomao_tattoo',
  },
];

export default function Contact() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Page header */}
      <div className="border-b border-white/10 py-20 px-6 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Yeah Tattoo</p>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Find Us</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — contact details */}
          <div>
            <div className="flex items-center gap-6 mb-10">
              <span className="w-8 h-px bg-white/30" />
              <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">Contact Details</h2>
            </div>

            <div className="flex flex-col gap-8 mb-12">
              {contactDetails.map(({ label, lines, href }) => (
                <div key={label}>
                  <p className="text-xs tracking-widest uppercase text-white/30 mb-2">{label}</p>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-white/70 hover:text-white transition-colors duration-200 leading-relaxed block"
                  >
                    {lines.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </a>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Studio Hours</p>
              <p className="text-white/60 text-sm leading-relaxed">
                By appointment only.<br />
                Get in touch to arrange a consultation.
              </p>
            </div>

            <div className="mt-8">
              <Link
                to="/appointments"
                className="inline-block px-8 py-3 border border-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200"
              >
                Book an Appointment
              </Link>
            </div>
          </div>

          {/* Right — Google Map */}
          <div>
            <div className="flex items-center gap-6 mb-10">
              <span className="w-8 h-px bg-white/30" />
              <h2 className="text-xs tracking-[0.4em] uppercase text-white/50">Location</h2>
            </div>
            <div className="w-full h-80 lg:h-[480px] overflow-hidden border border-white/10 grayscale">
              <iframe
                title="Yeah Tattoo location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.7!2d174.9!3d-36.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d4b8e0a1d1a1d%3A0x1a1d1a1d1a1d1a1d!2s15c+Anthony+Place%2C+Pakuranga%2C+Auckland+2010!5e0!3m2!1sen!2snz!4v1700000000000!5m2!1sen!2snz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-white/20 text-xs mt-3 tracking-wide">
              15c Anthony Place, Pakuranga, Auckland 2010
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
