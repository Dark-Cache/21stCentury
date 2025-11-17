import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Eye } from 'lucide-react';
import { supabase, BlogPost, Comment, Testimony } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function AdminPage() {
  const { isAdmin, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'testimonies'>('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    published: false,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin]);

  const fetchAllData = async () => {
    try {
      const [postsData, commentsData, testimoniesData] = await Promise.all([
        supabase.from('blog_posts').select('*, profiles(full_name)').order('created_at', { ascending: false }),
        supabase.from('comments').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonies').select('*').order('created_at', { ascending: false }),
      ]);

      if (postsData.error) throw postsData.error;
      if (commentsData.error) throw commentsData.error;
      if (testimoniesData.error) throw testimoniesData.error;

      setPosts(postsData.data || []);
      setComments(commentsData.data || []);
      setTestimonies(testimoniesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const slug = generateSlug(postForm.title);
      const postData = {
        ...postForm,
        slug,
        author_id: profile.id,
        published_at: postForm.published ? new Date().toISOString() : null,
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(postData);
        if (error) throw error;
      }

      setPostForm({ title: '', content: '', excerpt: '', featured_image: '', published: false });
      setShowPostForm(false);
      setEditingPost(null);
      fetchAllData();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleApproveComment = async (id: string, approved: boolean) => {
    try {
      const { error } = await supabase.from('comments').update({ approved }).eq('id', id);
      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleApproveTestimony = async (id: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonies')
        .update({ approved, approved_at: approved ? new Date().toISOString() : null })
        .eq('id', id);
      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error updating testimony:', error);
    }
  };

  const handleDeleteTestimony = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimony?')) return;

    try {
      const { error } = await supabase.from('testimonies').delete().eq('id', id);
      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error deleting testimony:', error);
    }
  };

  const startEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      featured_image: post.featured_image || '',
      published: post.published,
    });
    setShowPostForm(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage your ministry content</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 px-6 py-4 font-semibold ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Blog Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 px-6 py-4 font-semibold ${
                activeTab === 'comments'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Comments ({comments.filter((c) => !c.approved).length} pending)
            </button>
            <button
              onClick={() => setActiveTab('testimonies')}
              className={`flex-1 px-6 py-4 font-semibold ${
                activeTab === 'testimonies'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Testimonies ({testimonies.filter((t) => !t.approved).length} pending)
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
                  <button
                    onClick={() => {
                      setShowPostForm(!showPostForm);
                      setEditingPost(null);
                      setPostForm({ title: '', content: '', excerpt: '', featured_image: '', published: false });
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    {showPostForm ? 'Cancel' : 'New Post'}
                  </button>
                </div>

                {showPostForm && (
                  <form onSubmit={handlePostSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-bold mb-4">{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                          type="text"
                          required
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                        <textarea
                          required
                          rows={2}
                          value={postForm.excerpt}
                          onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                        <textarea
                          required
                          rows={10}
                          value={postForm.content}
                          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                        <input
                          type="url"
                          value={postForm.featured_image}
                          onChange={(e) => setPostForm({ ...postForm, featured_image: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="published"
                          checked={postForm.published}
                          onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-gray-700">
                          Publish immediately
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        {editingPost ? 'Update Post' : 'Create Post'}
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                post.published
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                          <p className="text-xs text-gray-500">
                            By {post.profiles?.full_name || 'Admin'} • {new Date(post.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => startEditPost(post)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{comment.author_name}</h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                comment.approved
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {comment.approved ? 'Approved' : 'Pending'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{comment.content}</p>
                          <p className="text-xs text-gray-500">
                            {comment.author_email} • {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleApproveComment(comment.id, !comment.approved)}
                            className={`p-2 rounded ${
                              comment.approved
                                ? 'text-gray-600 hover:bg-gray-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {comment.approved ? <Eye className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-5 h-5" />
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Testimonies</h2>
                <div className="space-y-4">
                  {testimonies.map((testimony) => (
                    <div key={testimony.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{testimony.title}</h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                testimony.approved
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {testimony.approved ? 'Approved' : 'Pending'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{testimony.content}</p>
                          <p className="text-xs text-gray-500">
                            {testimony.author_name} ({testimony.author_email}) •{' '}
                            {new Date(testimony.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleApproveTestimony(testimony.id, !testimony.approved)}
                            className={`p-2 rounded ${
                              testimony.approved
                                ? 'text-gray-600 hover:bg-gray-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {testimony.approved ? <Eye className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => handleDeleteTestimony(testimony.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
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
