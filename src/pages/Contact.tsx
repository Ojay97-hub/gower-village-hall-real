import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden bg-primary-600">
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-white">Contact Us</h1>
            <p className="text-xl mt-2">
              Get in touch with the village hall
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="01234 567890"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="What is your message about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-6">Contact Information</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-1">Address</h4>
                    <p className="text-gray-600 text-sm">
                      Penmaen Parish Hall
                      <br />
                      Penmaen
                      <br />
                      Gower, Swansea
                      <br />
                      SA3 2HH
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-1">Email</h4>
                    <a
                      href="mailto:info@penmaenvillagehall.org"
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      info@penmaenvillagehall.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-1">Phone</h4>
                    <a
                      href="tel:01792123456"
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      01792 123 456
                    </a>
                  </div>
                </div>
              </div>

              {/* What3Words */}
              <div className="bg-primary-50 rounded-2xl p-6 mb-8">
                <h3 className="mb-3">What3Words Location</h3>
                <p className="text-gray-700 mb-2 text-sm">
                  For easy navigation, you can find us using
                  What3Words:
                </p>
                <p className="text-primary-600">
                  ///example.words.location
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Map location</p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-700 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  * Hall bookings available outside these hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}