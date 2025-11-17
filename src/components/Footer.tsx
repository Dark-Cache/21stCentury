import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">The Power Ministry</h3>
            <p className="text-gray-400">
              Empowering lives through faith, hope, and the transformative power of God's love.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Our Mission</li>
              <li>Contact</li>
              <li>Prayer Requests</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <p className="text-gray-400 mb-2">
              Join us in worship and fellowship
            </p>
            <p className="text-gray-400">
              Email: info@powerministry.org
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> by The Power Ministry Team
          </p>
          <p className="mt-2">© {new Date().getFullYear()} The Power Ministry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
