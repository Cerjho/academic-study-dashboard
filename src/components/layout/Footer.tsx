import Link from 'next/link';

/**
 * Footer Component
 *
 * Global footer with links, copyright, and accessibility information.
 */

const footerLinks = {
  study: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Ethics & Privacy', href: '/ethics' },
    { name: 'References', href: '/references' },
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
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8">
            <div>
              <span className="text-2xl font-bold flex items-center gap-2">
                <span className="text-regular-400">📊</span>
                <span>Mabini College</span>
              </span>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Computer Science Program Academic Study
              </p>
              <p className="text-sm text-gray-400">
                Analyzing enrollment status impact on academic achievement
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Study</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.study.map((item) => (
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
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">About</h3>
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
                Academic Year 2024-2025 | n=73 respondents
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              This dashboard is designed with accessibility in mind. If you
              experience any issues, please{' '}
              <Link href="/about#contact" className="underline hover:text-gray-300">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
