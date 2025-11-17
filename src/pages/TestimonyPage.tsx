import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Heart, Calendar, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

interface TestimonyPageProps {
  onNavigate: (page: string) => void;
}

interface Testimony {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
}

export default function TestimonyPage({ onNavigate }: TestimonyPageProps) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'healing'
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Mock approved testimonies
    setTestimonies([
      {
        id: '1',
        title: 'Healing from Depression',
        content: 'I was struggling with severe depression for over two years. Nothing seemed to help until I found this ministry. Through prayer, community support, and divine intervention, I found complete healing. Today, I wake up with joy and purpose. God truly works miracles in our modern world.',
        author: 'Sarah J.',
        publishedAt: '2024-01-14',
        category: 'healing'
      },
      {
        id: '2',
        title: 'Financial Breakthrough',
        content: 'After months of unemployment and financial struggle, I was about to lose my home. I joined the prayer group and surrendered my situation to God. Within two weeks, I received three job offers! The salary was more than I had ever earned. God\'s provision is real and abundant.',
        author: 'Michael C.',
        publishedAt: '2024-01-12',
        category: 'provision'
      },
      {
        id: '3',
        title: 'Marriage Restoration',
        content: 'My marriage was falling apart after 15 years. We were headed for divorce when we decided to seek spiritual guidance. Through counseling, prayer, and forgiveness, our marriage was completely restored. We\'re now stronger and more in love than ever before.',
        author: 'Maria R.',
        publishedAt: '2024-01-10',
        category: 'relationships'
      },
      {
        id: '4',
        title: 'Addiction Recovery',
        content: 'I battled alcohol addiction for 10 years. Multiple rehab attempts failed. When I surrendered my life to God and joined this community, everything changed. I\'ve been sober for 18 months now and have never felt more free and alive.',
        author: 'David L.',
        publishedAt: '2024-01-08',
        category: 'deliverance'
      }
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setSuccess('Your testimony has been submitted for review. Thank you for sharing your story!');
      setFormData({ title: '', content: '', category: 'healing' });
      setSubmitting(false);
      setShowForm(false);
      
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    }, 1500);
  };

  const categories = [
    { value: 'healing', label: 'Healing & Health' },
    { value: 'provision', label: 'Financial Provision' },
    { value: 'relationships', label: 'Relationships & Family' },
    { value: 'deliverance', label: 'Deliverance & Freedom' },
    { value: 'guidance', label: 'Divine Guidance' },
    { value: 'other', label: 'Other Miracle' }
  ];

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Testimonies</h1>
                <p className="text-gray-600 mt-1">Stories of faith, hope, and transformation</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Share Your Story
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="max-w-6xl mx-auto px-4 pt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          </div>
        )}

        {/* Testimony Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Share Your Testimony</h2>
                <p className="text-gray-600 mt-1">Your story could inspire and encourage others</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Testimony Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Healing from Depression, Financial Breakthrough"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Story
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                    rows={8}
                    placeholder="Share your testimony in detail. How did God work in your situation? What was the outcome? How has it impacted your life?"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 100 characters. Your testimony will be reviewed before publication.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Testimony'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Testimonies Grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonies.map((testimony) => (
              <article
                key={testimony.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {testimony.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {testimony.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {testimony.publishedAt}
                      </div>
                    </div>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {categories.find(c => c.value === testimony.category)?.label}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {testimony.content}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">Inspiring</span>
                  </button>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Verified Testimony
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Have a Testimony to Share?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Your story of faith, healing, and transformation could be the encouragement someone else needs today. 
              Share how God has worked in your life and inspire others in their journey.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}