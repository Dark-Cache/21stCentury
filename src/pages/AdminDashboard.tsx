import { useState, useEffect } from 'react';
import { 
  PenTool, 
  FileText, 
  Users, 
  Bell, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  status: 'draft' | 'published';
  createdAt: string;
}

interface Testimony {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'blogs' | 'testimonies'>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [notifications, setNotifications] = useState(3);

  // Check admin authentication
  useEffect(() => {
    const isAdminAuth = localStorage.getItem('adminAuth');
    if (!isAdminAuth) {
      onNavigate('admin-login');
    }
  }, [onNavigate]);

  // Mock data
  useEffect(() => {
    setBlogs([
      {
        id: '1',
        title: 'The Power of Faith in Modern Times',
        content: 'Faith remains as powerful today as it has ever been...',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        status: 'published',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Understanding Divine Purpose',
        content: 'Every person has a divine calling...',
        imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        status: 'draft',
        createdAt: '2024-01-10'
      }
    ]);

    setTestimonies([
      {
        id: '1',
        title: 'Healing from Depression',
        content: 'I was struggling with severe depression when I found this ministry...',
        author: 'Sarah Johnson',
        status: 'pending',
        submittedAt: '2024-01-16'
      },
      {
        id: '2',
        title: 'Financial Breakthrough',
        content: 'After months of prayer and faith, I received an unexpected job offer...',
        author: 'Michael Chen',
        status: 'approved',
        submittedAt: '2024-01-14'
      },
      {
        id: '3',
        title: 'Family Restoration',
        content: 'My marriage was falling apart, but through prayer and guidance...',
        author: 'Maria Rodriguez',
        status: 'pending',
        submittedAt: '2024-01-17'
      }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    onNavigate('home');
  };

  const pendingTestimonies = testimonies.filter(t => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">
                <span className="text-gray-900">Admin</span>
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text"> Dashboard</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {pendingTestimonies > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingTestimonies}
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Blogs</p>
                <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved Testimonies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {testimonies.filter(t => t.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{pendingTestimonies}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('blogs')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'blogs'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4" />
                  Blog Management
                </div>
              </button>
              <button
                onClick={() => setActiveTab('testimonies')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'testimonies'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Testimonies
                  {pendingTestimonies > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingTestimonies}
                    </span>
                  )}
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'blogs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Blog Posts</h2>
                  <button
                    onClick={() => setShowBlogForm(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    New Blog Post
                  </button>
                </div>

                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              blog.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {blog.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{blog.content.substring(0, 100)}...</p>
                          <p className="text-xs text-gray-500">Created: {blog.createdAt}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setEditingBlog(blog)}
                            className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonies' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Testimony Management</h2>
                
                <div className="space-y-4">
                  {testimonies.map((testimony) => (
                    <div key={testimony.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{testimony.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              testimony.status === 'approved' 
                                ? 'bg-green-100 text-green-800'
                                : testimony.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {testimony.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{testimony.content.substring(0, 150)}...</p>
                          <p className="text-xs text-gray-500">
                            By: {testimony.author} • Submitted: {testimony.submittedAt}
                          </p>
                        </div>
                        {testimony.status === 'pending' && (
                          <div className="flex items-center gap-2 ml-4">
                            <button className="p-2 bg-green-100 text-green-600 hover:bg-green-200 rounded-lg transition-colors">
                              <Check className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}