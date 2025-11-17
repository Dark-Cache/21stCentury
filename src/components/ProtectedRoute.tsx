import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  onNavigate, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 to-blue-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600">
              Please sign in to access this content and share your testimony with our community.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('login')}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
            >
              Sign In
            </button>
            
            <button
              onClick={() => onNavigate('home')}
              className="w-full border-2 border-purple-200 text-purple-600 hover:bg-purple-50 py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}