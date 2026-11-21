import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowLeft, FiShare2, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import api from '../services/api';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await api.get('/api/news');
        const selectedNews = response.data.find((item) => item._id === id);
        const related = response.data.filter((item) => item._id !== id).slice(0, 2);

        setNews(selectedNews);
        setRelatedNews(related);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  
  if (loading) {
    return (
      <div className="pt-30 flex justify-center items-center" style={{ minHeight: '50vh' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="pt-30 container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">News article not found</h2>
        <p className="text-gray-600 mb-8">The news article you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/news"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Notice Board
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 py-12 md:py-14 text-white text-center border-b-4 border-orange-400">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block text-orange-200 mb-3">
            <Link to="/news" className="inline-flex items-center text-xs font-semibold hover:text-white transition">
              <FiArrowLeft className="mr-1.5" /> Back to Notice Board
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-3 leading-tight">{news.title}</h1>
          <div className="flex flex-wrap justify-center items-center text-xs font-medium text-orange-100 gap-2">
            <div className="flex items-center">
              <FiCalendar className="mr-1" />
              {new Date(news.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <span>•</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-white">{news.category}</span>
            <span>•</span>
            <span>By {news.author}</span>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md mb-10"
            >
              {/* Featured Image */}
              <div className="h-96 overflow-hidden">
                <img
                  src={'https://m.media-amazon.com/images/I/81Wsge2wb8L.jpg'}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>
              
              {/* Share Buttons */}
              <div className="bg-gray-100 p-4 flex justify-center items-center">

                <Link
                  to="/news"
                  className="inline-flex items-center text-primary-600 hover:underline"
                >
                  Back to Notice Board<FiArrowLeft className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Related News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedNews.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                    >
                      <Link to={`/news/${item._id}`}>
                        <div className="h-48 overflow-hidden">
                          <img
                            src={'https://m.media-amazon.com/images/I/81Wsge2wb8L.jpg'}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <FiCalendar className="mr-2" />
                            {new Date(item.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                            {item.title}
                          </h3>
                          <div className="text-primary-600 font-medium inline-flex items-center">
                            Read More <FiArrowLeft className="ml-1 rotate-180" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;