// src/pages/HomePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart, FaBookOpen, FaUsers } from "react-icons/fa";
import "../styles/animations.css";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const [memberCount, setMemberCount] = useState(0);
  const [testimonyCount, setTestimonyCount] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    if (blogRef.current) {
      observer.observe(blogRef.current);
    }
    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    // Animate counters
    const animateCounter = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      target: number
    ) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 30);
    };

    // Typewriter effect
    const fullText = "Welcome to 21st Century Prophet";
    let currentIndex = 0;

    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, 100);
      } else {
        const cursorBlink = setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 500);
        setTimeout(() => {
          clearInterval(cursorBlink);
          setShowCursor(false);
        }, 3000);
      }
    };

    setTimeout(typeWriter, 500);

    setTimeout(() => {
      animateCounter(setMemberCount, 12500);
      animateCounter(setTestimonyCount, 850);
    }, 1000);

    return () => observer.disconnect();
  }, []);

  // Secret key combination for admin access (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        onNavigate("admin-login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-blue-900 text-white">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 px-4 text-center bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/75 to-blue-900/75"></div>
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-float float-delay-${
                (i % 6) + 1
              } particle-${i}`}
            />
          ))}
        </div>
        <div className="relative z-10">
          <h1 className="mt-4 md:mt-6 text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 animate-fade-in-up">
            {typewriterText.startsWith("Welcome to ") ? (
              <>
                Welcome to{" "}
                {typewriterText.includes("21st") && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                    21st
                  </span>
                )}
                {typewriterText.includes("Century") && (
                  <>
                    <br className="sm:hidden" />{" "}
                    <span className="bg-gradient-to-r from-orange-300 to-orange-500 text-transparent bg-clip-text">
                      Century Prophet
                    </span>
                  </>
                )}
              </>
            ) : (
              typewriterText
            )}
            {showCursor && (
              <span className="text-yellow-400 animate-pulse">|</span>
            )}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto md:mb-10 animate-fade-in-up animation-delay-300">
            Discover divine guidance, inspiring testimonies, and spiritual
            wisdom for modern times
          </p>

          {/* Statistics */}
          <div className="flex justify-center gap-8 mb-8 animate-fade-in-up animation-delay-500">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                {memberCount.toLocaleString()}+
              </div>
              <div className="text-sm text-white/80">Believers Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                {testimonyCount}+
              </div>
              <div className="text-sm text-white/80">Testimonies Shared</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <button
              onClick={() => onNavigate("about")}
              className="min-w-[180px] text-black bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-xl font-bold 
             transition-transform duration-300 ease-in-out 
             hover:scale-105 active:scale-100
             flex items-center justify-center gap-2"
            >
              Learn More{" "}
              <IoIosArrowForward className="inline-block text-base" />
            </button>
            <button
              onClick={() => onNavigate("testimonies")}
              className="min-w-[180px] bg-white/40 hover:bg-white/70 px-6 py-3 rounded-xl font-bold transition border border-white"
            >
              Read Testimonies
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        className="py-12 sm:py-16 bg-gray-50 scroll-animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-black font-bold text-center mb-10 sm:mb-12 scroll-fade-up">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Spiritual Guidance */}
            <div className="relative bg-white p-6 sm:p-7 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 flex flex-col gap-4 scroll-fade-up scroll-delay-1 group">
              <div className="absolute top-4 right-4">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  Popular
                </span>
              </div>
              <div className="text-purple-600 text-4xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <FaRegHeart />
              </div>
              <h3 className="text-xl sm:text-2xl text-black font-bold">
                Spiritual Guidance
              </h3>
              <p className="text-gray-600 text-base flex-grow">
                Connect with divine wisdom and receive guidance for your
                spiritual journey
              </p>
              <button
                type="button"
                onClick={() => onNavigate("guidance")}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 self-start"
              >
                Learn More →
              </button>
            </div>

            {/* Teachings & Blogs */}
            <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-6 sm:p-7 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 flex flex-col gap-4 scroll-fade-up scroll-delay-2 group">
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                  Featured
                </span>
              </div>
              <div className="text-white text-4xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <FaBookOpen />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Teachings & Blogs
              </h3>
              <p className="text-purple-100 text-base flex-grow">
                Explore inspiring teachings and articles about faith in modern
                times
              </p>
              <button
                type="button"
                onClick={() => onNavigate("blog")}
                className="mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 self-start border border-white/30"
              >
                Learn More →
              </button>
            </div>

            {/* Community Support */}
            <div className="relative bg-white p-6 sm:p-7 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 flex flex-col gap-4 scroll-fade-up scroll-delay-3 group">
              <div className="absolute top-4 right-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-purple-600 text-4xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <FaUsers />
              </div>
              <h3 className="text-xl sm:text-2xl text-black font-bold">
                Community Support
              </h3>
              <p className="text-gray-600 text-base flex-grow">
                Join our community and share your testimony with others
              </p>
              <button
                type="button"
                onClick={() => onNavigate("community")}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 self-start"
              >
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="py-12 sm:py-16 bg-white scroll-animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 scroll-fade-up scroll-delay-1">
              <div className="mb-4">
                <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                About 21st Century Prophet
              </h2>
              <p className="mb-6 text-gray-700 text-lg leading-relaxed">
                Our ministry is dedicated to spreading faith, hope, and divine
                guidance in the modern world. We believe that faith remains as
                relevant and powerful today as it has ever been.
              </p>
              <p className="mb-8 text-gray-700 leading-relaxed">
                Through our teachings, testimonies, and community, we help
                individuals discover their divine purpose and transform their
                lives through the power of faith.
              </p>

              {/* Mission Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-gray-600">Years of Ministry</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Countries Reached</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate("about")}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Learn More <IoIosArrowForward className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 w-full scroll-fade-up scroll-delay-2">
              <div className="relative">
                <div className="rounded-2xl w-full h-80 relative overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80"
                    alt="Community gathering in prayer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-semibold">Our Community</div>
                    <div className="text-sm opacity-90">
                      Building faith together
                    </div>
                  </div>
                </div>

                {/* Floating elements around the image */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 w-8 h-8 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 bg-purple-400 w-6 h-6 rounded-full animate-pulse animate-delay-1s"></div>
                <div className="absolute top-1/2 -left-6 bg-indigo-400 w-4 h-4 rounded-full animate-pulse animate-delay-2s"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        ref={blogRef}
        className="py-12 sm:py-16 bg-gray-50 scroll-animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-fade-up">
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
              Latest Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4 text-gray-900">
              Recent Blog Posts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our latest teachings and insights on faith, spirituality,
              and divine guidance
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 scroll-fade-up scroll-delay-${item} group`}
              >
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      item === 1
                        ? "1507003211169-0a1dd7228f2d"
                        : item === 2
                        ? "1544027993-37dbfe43562a"
                        : "1518709268805-4e9042af2ac1"
                    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
                    alt={`Blog post ${item}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`${
                        item === 1
                          ? "bg-red-100 text-red-800"
                          : item === 2
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      } text-xs font-semibold px-2 py-1 rounded-full`}
                    >
                      {item === 1
                        ? "Trending"
                        : item === 2
                        ? "Featured"
                        : "New"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-xs text-gray-500">
                      January {15 - (item - 1) * 5}, 2024
                    </p>
                    <span className="text-gray-300">•</span>
                    <p className="text-xs text-gray-500">{item + 2} min read</p>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item === 1
                      ? "The Power of Faith in Modern Times"
                      : item === 2
                      ? "Understanding Divine Purpose"
                      : "Miracles in the 21st Century"}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {item === 1
                      ? "Discover how faith remains relevant and transformative in our contemporary world."
                      : item === 2
                      ? "Uncover the meaning behind divine calling and how to align your life..."
                      : "Explore contemporary accounts of divine intervention and miraculous events."}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate("blog")}
                    className="text-purple-600 hover:text-purple-800 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Read More <IoIosArrowForward className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 scroll-fade-up scroll-delay-3">
            <button
              type="button"
              onClick={() => onNavigate("blog")}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
            >
              View All Posts <IoIosArrowForward className="text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-12 sm:py-16 bg-white scroll-animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-fade-up">
            <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
              Life Transformations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4 text-gray-900">
              Inspiring Testimonies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories of faith, healing, and transformation from our
              community members
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                text: "My life was at its lowest point when I discovered the ministry. Through prayer and faith, I found healing and restoration that I never thought possible.",
                author: "Sarah Johnson",
                role: "Community Member",
                gradient: "from-purple-500 to-indigo-600",
              },
              {
                text: "I was struggling with addiction for years. The teachings and community support helped me break free and find my true purpose in life.",
                author: "Michael Chen",
                role: "Recovery Testimony",
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                text: "After losing my job, I felt hopeless. The ministry's guidance helped me rebuild my life with faith as my foundation. Now I'm stronger than ever.",
                author: "Maria Rodriguez",
                role: "Faith Journey",
                gradient: "from-purple-600 to-pink-600",
              },
            ].map((testimony, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${
                  testimony.gradient
                } p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 scroll-fade-up scroll-delay-${
                  index + 1
                } group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-4 opacity-50">“</div>
                  <p className="mb-6 italic text-white/95 leading-relaxed">
                    {testimony.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {testimony.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {testimony.author}
                      </p>
                      <p className="text-xs text-white/80">{testimony.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 scroll-fade-up scroll-delay-3">
            <button
              type="button"
              onClick={() => onNavigate("testimonies")}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
            >
              View All Testimonies <IoIosArrowForward className="text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* Share Your Testimony CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
            Share Your Testimony
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Please log in or create an account to share your inspiring testimony
            with our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate("login")}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-white font-semibold transition min-w-[140px]"
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate("testimony")}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-white font-semibold transition min-w-[140px]"
            >
              Share Testimony
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
