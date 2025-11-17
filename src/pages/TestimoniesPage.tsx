import { useEffect, useState } from 'react';
import { Heart, Calendar, Send, CheckCircle } from 'lucide-react';
import { supabase, Testimony } from '../lib/supabase';

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    title: '',
    content: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonies')
        .select('*')
        .eq('approved', true)
        .order('approved_at', { ascending: false });

      if (error) throw error;
      setTestimonies(data || []);
    } catch (error) {
      console.error('Error fetching testimonies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase.from('testimonies').insert({
        author_name: formData.author_name,
        author_email: formData.author_email,
        title: formData.title,
        content: formData.content,
        approved: false,
      });

      if (error) throw error;

      setMessage('Thank you for sharing your testimony! It will be reviewed and published soon.');
      setFormData({ author_name: '', author_email: '', title: '', content: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting testimony:', error);
      setMessage('Failed to submit testimony. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-red-500 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-6">Testimonies</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Real stories of God's transformative power in people's lives
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              {showForm ? 'View Testimonies' : 'Share Your Testimony'}
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {showForm ? (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Share Your Testimony</h2>
              <p className="text-gray-600 mb-6">
                We would love to hear how God has worked in your life. Your testimony will be
                reviewed before being published.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.author_email}
                      onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Testimony Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., God Healed My Marriage"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Testimony *
                  </label>
                  <textarea
                    id="content"
                    required
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Share your story of how God has worked in your life..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                {message && (
                  <div
                    className={`p-4 rounded-lg ${
                      message.includes('Thank you')
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {message}
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                  >
                    {submitting ? 'Submitting...' : 'Submit Testimony'}
                    <Send className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {testimonies.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">
                    No testimonies yet. Be the first to share your story!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonies.map((testimony) => (
                    <div
                      key={testimony.id}
                      className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <h3 className="text-2xl font-bold text-gray-900">{testimony.title}</h3>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                        {testimony.content}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-600">
                        <span className="font-semibold">{testimony.author_name}</span>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(testimony.approved_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {!showForm && (
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Have a Testimony to Share?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Your story could inspire and encourage others in their faith journey
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Share Your Story
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
