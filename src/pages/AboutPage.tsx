import { Users, Heart, Book, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 text-center">About The Power Ministry</h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Discover our story, mission, and the vision that drives us forward in faith
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              The Power Ministry was founded with a simple yet profound vision: to bring the
              life-changing message of Jesus Christ to individuals and communities around the
              world. What began as a small gathering of believers has grown into a vibrant
              community dedicated to worship, teaching, and service.
            </p>
            <p className="mb-4">
              We believe that the power of God is not just a historical truth but a present
              reality that transforms lives today. Through the Holy Spirit, we have witnessed
              countless miracles, healings, and life transformations that testify to God's
              ongoing work in our midst.
            </p>
            <p>
              Our ministry is built on the foundation of biblical truth, passionate worship,
              and genuine fellowship. We are committed to creating an environment where
              people can encounter God, grow in their faith, and discover their purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Biblical Truth</h3>
              <p className="text-gray-600">
                We stand firmly on the Word of God as our foundation for faith and practice,
                teaching sound doctrine with clarity and conviction.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Love & Compassion</h3>
              <p className="text-gray-600">
                We demonstrate Christ's love through genuine care, showing compassion to all
                people regardless of their background or circumstances.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600">
                We believe in the power of fellowship and unity, fostering meaningful
                relationships that encourage spiritual growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Purpose</h3>
              <p className="text-gray-600">
                We help individuals discover and fulfill their God-given purpose, equipping
                them to make a lasting impact in their spheres of influence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Our Leadership</h2>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pastor John & Jane Doe</h3>
              <p className="text-blue-600 font-semibold">Lead Pastors</p>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Pastor John and Jane Doe have been serving in ministry for over 20 years,
                with a heart to see lives transformed by the power of God. Their passionate
                preaching, genuine love for people, and commitment to biblical truth have
                inspired thousands to grow deeper in their relationship with Christ.
              </p>
              <p>
                Together, they lead The Power Ministry with wisdom, integrity, and a clear
                vision for the future. Their ministry is marked by a powerful anointing,
                signs and wonders, and a deep commitment to raising up the next generation
                of believers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission Statement</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            "To empower believers with the truth of God's Word, equip them with spiritual
            tools for victorious living, and expand God's kingdom through passionate worship,
            biblical teaching, and genuine community. We exist to see lives transformed by
            the power of the Holy Spirit and to raise up a generation of believers who will
            impact the world for Christ."
          </p>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us</h2>
          <p className="text-xl mb-8 text-blue-100">
            We would love to have you join our community and experience the power of God in your life
          </p>
          <div className="bg-white text-gray-900 p-8 rounded-xl inline-block">
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="mb-2">Email: info@powerministry.org</p>
            <p className="mb-2">Phone: (555) 123-4567</p>
            <p>Address: 123 Faith Street, Hope City, HC 12345</p>
          </div>
        </div>
      </section>
    </div>
  );
}
