import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiArrowRight, FiFilter } from 'react-icons/fi';
import api from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/api/events');
        if (Array.isArray(res.data) && res.data.length > 0) {
          setEvents(res.data);
        } else {
          setEvents([
            {
              _id: 'sample-1',
              title: 'Annual Sports & Athletics Day',
              description: 'Annual sports day featuring track and field events, relay races, and team sports showcasing student fitness.',
              date: new Date().toISOString(),
              location: 'School Sports Ground',
              organizer: 'Physical Education Dept',
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);
  
  // Logic for displaying events based on pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-20 pb-16">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 py-14 text-white text-center border-b-4 border-orange-400">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-2.5 inline-block">
            Campus Calendar
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2.5 text-white">Events & Co-Curriculars</h1>
          <div className="w-16 h-1 bg-white/80 mx-auto mb-3 rounded-full"></div>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto leading-relaxed">
            Stay updated with all the athletic meets, cultural programs, and academic competitions throughout the year.
          </p>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Filter Controls */}
          <div className="mb-10 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4 md:mb-0">
              Upcoming Events
            </h2>
            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <FiFilter className="text-gray-500 ml-2" />
              <select
                className="bg-transparent py-2 px-3 text-gray-700 focus:outline-none"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Events</option>
                <option value="academic">Academic</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
                <option value="community">Community</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : currentEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentEvents.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                >
                  <Link to={`/events/${event._id}`}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sm text-primary-600 font-medium">
                          <FiCalendar className="mr-2" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FiClock className="mr-1" />
                          {event.time}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FiMapPin className="mr-2" />
                        {event.location}
                      </div>
                      <div className="text-primary-600 font-medium inline-flex items-center">
                        View Event Details <FiArrowRight className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No events found matching your filter.</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                View All Events
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredEvents.length > eventsPerPage && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-md border ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 border-t border-b ${
                      currentPage === index + 1
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => 
                    paginate(
                      currentPage < Math.ceil(filteredEvents.length / eventsPerPage) 
                        ? currentPage + 1 
                        : currentPage
                    )
                  }
                  disabled={currentPage === Math.ceil(filteredEvents.length / eventsPerPage)}
                  className={`px-3 py-1 rounded-r-md border ${
                    currentPage === Math.ceil(filteredEvents.length / eventsPerPage)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Calendar Download Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
              Download Our Academic Calendar
            </h2>
            <p className="text-gray-600 mb-6">
              Get all important dates and events for the academic year in one place. Our calendar includes all holidays, examination schedules, and special events.
            </p>
            <button className="px-8 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors">
              Download Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Host an Event with Us?
          </h2>
          <p className="text-primary-100 max-w-3xl mx-auto mb-6">
            Our facilities are available for educational seminars, workshops, and community events. Get in touch with us to discuss your requirements.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Events;