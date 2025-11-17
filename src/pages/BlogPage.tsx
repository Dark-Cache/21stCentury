import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, MessageCircle, Heart } from 'lucide-react';
import ProtectedRoute from '../components/ProtectedRoute';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  readTime: number;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Mock blog data
    setBlogs([
      {
        id: '1',
        title: 'The Power of Faith in Modern Times',
        content: `Faith remains as powerful today as it has ever been. In our fast-paced, technology-driven world, it's easy to lose sight of the spiritual foundations that have guided humanity for millennia.

        But faith isn't just about believing in something greater than ourselves—it's about finding strength, purpose, and direction in our daily lives. When we face challenges, uncertainties, or moments of doubt, faith becomes our anchor.

        In the 21st century, we have unprecedented access to information, yet many feel more lost than ever. This is where faith steps in, not as a replacement for knowledge, but as a complement to it. Faith gives us the wisdom to discern truth from noise, hope from despair, and love from fear.

        Consider the testimonies we've received from our community members. Sarah found healing from depression through prayer and community support. Michael overcame addiction by surrendering to a higher power. Maria restored her marriage through forgiveness and faith.

        These aren't just stories—they're proof that faith works. It transforms lives, heals relationships, and brings peace to troubled hearts. In our modern world, we need this transformative power more than ever.

        The key is to approach faith not as blind belief, but as an active practice. Pray regularly, study spiritual texts, connect with like-minded believers, and most importantly, put your faith into action through service to others.

        Remember, faith without works is dead. Let your faith be alive, vibrant, and transformative. Let it be the light that guides you through the darkness of modern challenges and into the brightness of divine purpose.`,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'Prophet Johnson',
        publishedAt: '2024-01-15',
        readTime: 5,
        likes: 42,
        comments: [
          {
            id: '1',
            author: 'Sarah M.',
            content: 'This really spoke to my heart. Thank you for sharing this wisdom.',
            createdAt: '2024-01-16'
          },
          {
            id: '2',
            author: 'Michael K.',
            content: 'Powerful message! Faith has truly transformed my life.',
            createdAt: '2024-01-16'
          }
        ]
      },
      {
        id: '2',
        title: 'Understanding Divine Purpose',
        content: `Every person born into this world comes with a divine purpose. This isn't just spiritual rhetoric—it's a fundamental truth that can revolutionize how you see yourself and your place in the world.

        Your divine purpose isn't necessarily about becoming famous or achieving worldly success. It's about discovering the unique way you're meant to serve, love, and contribute to the world around you.

        Many people struggle with questions like: "Why am I here?" "What's my purpose?" "How do I know if I'm on the right path?" These are sacred questions that deserve thoughtful, prayerful consideration.

        The journey to discovering your divine purpose often begins with understanding your gifts and talents. What comes naturally to you? What activities make you lose track of time? What problems in the world break your heart? These are clues to your calling.

        But purpose isn't just about what you do—it's about who you become in the process. Every challenge you face, every lesson you learn, every person you help along the way is shaping you into the person you're meant to be.

        Sometimes, your purpose will be clear and obvious. Other times, it will unfold gradually, like a flower blooming in its season. Trust the process. Trust that the same divine intelligence that created the universe has a plan for your life.

        Prayer and meditation are essential tools for discovering your purpose. In the quiet moments, away from the noise and distractions of daily life, you can hear the still, small voice that guides you toward your destiny.

        Remember, your purpose may evolve throughout your life. What you're called to do in your twenties may be different from your calling in your fifties. Stay open, stay flexible, and stay connected to the divine source of all purpose.`,
        imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'Prophet Johnson',
        publishedAt: '2024-01-10',
        readTime: 4,
        likes: 38,
        comments: [
          {
            id: '3',
            author: 'Maria R.',
            content: 'I needed to read this today. Still searching for my purpose.',
            createdAt: '2024-01-11'
          }
        ]
      },
      {
        id: '3',
        title: 'Miracles in the 21st Century',
        content: `Miracles didn't stop happening when the calendar turned to the modern era. They continue to occur all around us, often in ways we might not immediately recognize as miraculous.

        In our scientific age, we sometimes dismiss the miraculous as coincidence, luck, or natural phenomena. But for those with eyes to see and hearts to believe, miracles are as real today as they were thousands of years ago.

        What is a miracle? It's divine intervention in the natural order of things. It's when the impossible becomes possible, when hope is restored in hopeless situations, when healing comes where medicine has failed.

        We've witnessed countless miracles in our ministry. Marriages restored on the brink of divorce. Addictions broken after years of struggle. Terminal illnesses healed against all medical odds. Financial breakthroughs in times of desperate need.

        But miracles aren't just about dramatic, supernatural events. Sometimes the greatest miracles are the quiet transformations that happen in human hearts. The miracle of forgiveness after deep betrayal. The miracle of peace in the midst of chaos. The miracle of love conquering hate.

        Modern miracles often work through modern means. A doctor's skilled hands, a counselor's wise words, a friend's timely call, a stranger's unexpected kindness—these can all be instruments of divine intervention.

        The key to experiencing miracles is faith. Not blind faith, but active, expectant faith. Faith that believes God is still working in the world today. Faith that trusts in divine timing and divine methods, even when they don't match our expectations.

        If you're facing a situation that seems impossible, don't give up hope. The same power that parted the Red Sea, that raised the dead, that turned water into wine, is still available today. Pray, believe, and watch for the miraculous to unfold in your life.`,
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'Prophet Johnson',
        publishedAt: '2024-01-05',
        readTime: 6,
        likes: 56,
        comments: []
      }
    ]);
  }, []);

  const handleAddComment = (blogId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, comments: [...blog.comments, comment] }
        : blog
    ));

    setNewComment('');
  };

  if (selectedBlog) {
    return (
      <ProtectedRoute onNavigate={onNavigate}>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <button
                onClick={() => setSelectedBlog(null)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </button>
            </div>
          </div>

          {/* Blog Content */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            <article className="bg-white rounded-xl shadow-sm p-8">
              <img
                src={selectedBlog.imageUrl}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedBlog.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedBlog.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {selectedBlog.publishedAt}
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {selectedBlog.likes} likes
                </div>
              </div>

              <div className="prose max-w-none">
                {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comments ({selectedBlog.comments.length})
              </h3>

              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  rows={3}
                />
                <button
                  onClick={() => handleAddComment(selectedBlog.id)}
                  className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {selectedBlog.comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-purple-200 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.createdAt}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Spiritual Insights</h1>
                <p className="text-gray-600 mt-1">Divine wisdom for modern living</p>
              </div>
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

        {/* Blog Grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                onClick={() => setSelectedBlog(blog)}
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{blog.readTime} min read</span>
                      <span>{blog.likes} likes</span>
                    </div>
                    <span>{blog.publishedAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}