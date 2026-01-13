import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Home, MessageCircle, Ghost   } from 'lucide-react';
import {
  getHomePage,
  getMessagesWithUserPage,
  getLoginPage
} from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthUserSelector } from '@/entities';
const GhostWithEyes = () => (
  <div className="relative inline-block">
    <Ghost size={96} className="text-gray-400" />
    <div className="absolute left-1/3 top-1/3 w-2 h-2 bg-white rounded-full" />
    <div className="absolute right-1/3 top-1/3 w-2 h-2 bg-white rounded-full" />
  </div>
)

export const NotFound = () => {
  const user = useAuthUserSelector()
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        {/* Floating icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-blue-100 text-blue-600"
        >
          <GhostWithEyes />
        </motion.div>

        <h1 className="text-2xl font-semibold text-gray-900">
          Page not found
        </h1>

        <p className="mt-2 text-gray-500">
          The page you’re looking for doesn’t exist or was removed.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {user ? (
            <>
              <Link
                to={getHomePage()}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
              >
                <Home size={18} />
                Home
              </Link>

              <Link
                to={getMessagesWithUserPage(user.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <MessageCircle size={18} />
                Messages
              </Link>
            </>
          ) : (
            <Link
              to={getLoginPage()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              <Home size={18} />
              Go to auth Page
            </Link>
          )}

        </div>
      </motion.div>
    </div>
  );
};
