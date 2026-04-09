const Footer = () => {
  return (
    <footer className="border-t-2 border-pink-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">

        {/* Brand */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
            Portfolio
          </p>
          <h2 className="mt-1 text-lg font-bold text-gray-900">Angela Mae Bautista</h2>
          <p className="mt-1 text-sm text-gray-400">IT Student · Web Developer · Designer</p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">Navigation</p>
          <a href="/" className="text-sm text-gray-500 hover:text-pink-400 transition-colors">Home</a>
          <a href="/about" className="text-sm text-gray-500 hover:text-pink-400 transition-colors">About</a>
          <a href="/articles" className="text-sm text-gray-500 hover:text-pink-400 transition-colors">Articles</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">Contact</p>
          <p className="text-sm text-gray-500">bautista@email.com</p>
          <p className="text-sm text-gray-500">National University</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t-2 border-pink-100 pt-6 text-center">
        <p className="text-xs text-gray-300">© 2025 Angela Mae Bautista. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;