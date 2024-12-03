import headerData from "./data"
function Header() {

  return (
    <header className="bg-blue-500 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="/">
            <h1 className="text-white text-3xl font-bold">FE Task</h1>
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            {headerData.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              className="text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <nav className="hidden px-2 pt-2 pb-4 space-y-2">
          {headerData.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-white hover:bg-blue-600 rounded-lg px-3 py-2 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
export default Header;