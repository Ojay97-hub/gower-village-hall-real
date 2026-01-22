import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Building2, Coffee, Church, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import churchImg from "../assets/pennard-church.png";
import torbayImg from "../assets/torbay.jpeg";

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Split Design */}
      <section className="relative h-[600px] grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Landscape with Text Overlay */}
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517348678194-ca7addd87931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJlZSUyMGNsaWZmcyUyMGJheSUyMHdhbGVzfGVufDF8fHx8MTc2NDYwNDA4MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Three Cliffs Bay"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 flex items-center">
            <div className="px-8 md:px-12 lg:px-16 text-white max-w-2xl">
              <h1 className="mb-4 text-white text-4xl md:text-5xl">
                Welcome to Penmaen and Nicholaston Village Hall
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                Your community hub on the beautiful Gower Peninsula, serving our villages near Tor Bay and 3 Cliffs
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/hall"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Book the Hall
                </Link>
                <Link
                  to="/churches"
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors border border-white/40"
                >
                  Support Our Churches
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Village Hall Image */}
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={churchImg}
            alt="Local Church"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-orange-800/30"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-6">About Our Community</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Penmaen and Nicholaston Village Hall is at the heart of our beautiful Gower
              community. Managed by a dedicated committee of trustees, the hall serves as a
              vibrant hub for local residents and visitors alike. From monthly coffee mornings
              to community events, art classes, and choir rehearsals, our hall brings people
              together in this stunning corner of Wales.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <ImageWithFallback
                src={torbayImg}
                alt="Tor Bay"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white">Tor Bay</p>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1720179470710-53e31f83d593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwY2xpZmZzJTIwZ293ZXJ8ZW58MXx8fHwxNzY0NjA0MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Three Cliffs"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white">Three Cliffs</p>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1693040775922-6aa218c689ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYWtlcyUyMHBhc3RyaWVzfGVufDF8fHx8MTc2NDYwNDA4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Coffee morning cakes"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white">Coffee Morning Treats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Cards */}
      <section className="py-16 bg-primary-50 pt-[64px] pr-[0px] pb-[32px] pl-[0px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Book the Hall Card */}
            <Link
              to="/hall"
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="mb-3">Book the Hall</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Available for events, meetings, and celebrations
              </p>
              <span className="text-primary-600 text-sm inline-flex items-center group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            {/* Coffee Mornings Card */}
            <Link
              to="/hall"
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <Coffee className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="mb-3">Coffee Mornings</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Join us every Thursday for coffee and cake
              </p>
              <span className="text-primary-600 text-sm inline-flex items-center group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            {/* Local Churches Card */}
            <Link
              to="/churches"
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <Church className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="mb-3">Local Churches</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                St John's Penmaen & St Nicholas Nicholaston
              </p>
              <span className="text-primary-600 text-sm inline-flex items-center group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            {/* Committee Info Card */}
            <Link
              to="/committee"
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="mb-3">Committee Info</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Meet our trustees and learn about our work
              </p>
              <span className="text-primary-600 text-sm inline-flex items-center group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Coffee Morning Highlight */}
      <section className="py-16 bg-primary-50 pt-[32px] pr-[0px] pb-[64px] pl-[0px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Coffee className="w-8 h-8 text-primary-600" />
              </div>
              <div className="flex-1">
                <h2 className="mb-3">Monthly Coffee Mornings</h2>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Join us for our friendly village coffee mornings, held on the first Saturday
                  of each month from 10:30 to 12:30. Enjoy homemade cakes, good company, and
                  catch up with neighbours old and new.
                </p>
                <p className="text-primary-600">First Saturday each month, 10:30 - 12:30</p>
              </div>
              <Link
                to="/hall"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
              >
                Find Out More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}