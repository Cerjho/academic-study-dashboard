import Link from 'next/link';

/**
 * Footer Component
 *
 * Global footer with links, copyright, and accessibility information.
 */

const footerLinks = {
  study: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Ethics & Privacy', href: '/ethics' },
    { name: 'Literature', href: '/literature' },
  ],
  about: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/about#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/ethics#privacy' },
    { name: 'Accessibility', href: '#accessibility' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-700" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-regular-500 to-blue-600 shadow-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Mabini College
                </span>
              </div>
              <p className="mt-3 text-base leading-6 text-gray-300 font-medium">
                Computer Science Program Academic Study
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Analyzing enrollment status impact on academic achievement
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-bold leading-6 text-white mb-2">Study</h3>
                <ul role="list" className="mt-6 space-y-3">
                  {footerLinks.study.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-regular-400 transition-all duration-200 flex items-center gap-2 group"
                      >
                        <span className="h-1 w-1 rounded-full bg-regular-500 group-hover:w-2 transition-all"></span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-bold leading-6 text-white mb-2">About</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.about.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-700 pt-8 sm:mt-20 lg:mt-24">
          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Mabini College. All rights
              reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-xs leading-5 text-gray-400">
                Academic Year 2024-2025 | n=73 respondents | Preliminary Data Presentation
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              This dashboard is for interactive data presentation purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
