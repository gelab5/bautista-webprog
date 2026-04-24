import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-pink-400 bg-pink-400 text-white'
      : 'border-transparent text-gray-500 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-500',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-pink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-9 h-9">
            <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#f9a8d4" strokeWidth="2.5" />
            <polygon points="20,10 30,20 20,30 10,20" fill="#f9a8d4" />
            <circle cx="20" cy="20" r="3" fill="white" />
          </svg>
          <p className="text-base font-bold tracking-widest uppercase text-pink-400 leading-none self-center">
            A.M.FOLIO
          </p>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}

          {/* Divider */}
          <span className="mx-1 h-5 w-px bg-pink-200" />

          {/* Sign In */}
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              [
                'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
                isActive
                  ? 'border-pink-400 bg-pink-400 text-white'
                  : 'border-transparent text-gray-500 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-500',
              ].join(' ')
            }
          >
            Sign In
          </NavLink>

          {/* Sign Up - solid CTA */}
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              [
                'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
                isActive
                  ? 'border-pink-600 bg-pink-600 text-white'
                  : 'border-pink-400 bg-pink-400 text-white hover:bg-pink-500 hover:border-pink-500',
              ].join(' ')
            }
          >
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;