import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import TestimoniesPage from './pages/TestimoniesPage';
import TestimonyPage from './pages/TestimonyPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import { BlogPost } from './lib/supabase';

type Page = 'home' | 'about' | 'blog' | 'blog-post' | 'testimonies' | 'testimony' | 'admin' | 'admin-login' | 'admin-dashboard' | 'login';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleNavigate = (page: string, data?: unknown) => {
    setCurrentPage(page as Page);
    if (page === 'blog-post' && data) {
      setSelectedPost(data as BlogPost);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'blog-post':
        return selectedPost ? (
          <BlogPostPage post={selectedPost} onNavigate={handleNavigate} />
        ) : (
          <BlogPage onNavigate={handleNavigate} />
        );
      case 'testimonies':
        return <TestimoniesPage />;
      case 'testimony':
        return <TestimonyPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPage />;
      case 'admin-login':
        return <AdminLoginPage onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {!['login', 'admin-login', 'admin-dashboard'].includes(currentPage) && (
          <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        )}
        <main className="flex-grow">{renderPage()}</main>
        {!['login', 'admin-login', 'admin-dashboard'].includes(currentPage) && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
