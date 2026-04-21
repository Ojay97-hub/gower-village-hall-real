import { useState, FormEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Clock, MapPin, Calendar, Users, X, CheckCircle, Loader2, Mail, Quote } from "lucide-react";
import stJohnsChurchImg from "../assets/st-johns-church.png";
import stNicholastonChurchImg from "../assets/st-nicholas-church.png";

export function Churches() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleJoinSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim() || "",
          email: email.trim(),
          group: "churches",
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
        setEmail("");
        setName("");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSubmitted(false);
      setError("");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col font-sans">
      {/* Immersive Hero Section */}
      <section className="relative overflow-hidden w-full bg-primary-800">
        
        <div className={`relative z-10 flex min-h-[40vh] items-center px-4 sm:px-6 lg:px-12 py-20 lg:py-32 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-7xl mx-auto w-full text-center md:text-left flex flex-col items-center md:items-start pl-4">
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 drop-shadow-md">
              Our Churches
            </h1>
            <p className="text-xl md:text-2xl text-blue-50/90 max-w-2xl font-light leading-relaxed mb-10">
              Historic places of worship serving our community through generations
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-white text-gray-900 hover:bg-gray-50 px-8 py-3 text-lg shadow-lg"
            >
              <Users className="w-5 h-5 text-primary-600" />
              Join Friends
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 flex-1 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* St Johns Church Card */}
          <div className={`bg-white rounded-3xl border border-gray-100 transition-all duration-500 overflow-hidden transform group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="overflow-hidden h-80 sm:h-96 lg:h-auto lg:min-h-[500px]">
                <ImageWithFallback
                  src={stJohnsChurchImg}
                  alt="St Johns Church, Penmaen"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              </div>
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 drop-shadow-sm">
                  St Johns Church, Penmaen
                </h2>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
                  A beautiful historic church serving the Penmaen community for centuries. St Johns welcomes all visitors and continues to be a place of worship, reflection, and community gathering.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-primary-50 p-3 rounded-xl flex-shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                      <Clock className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Service Times</h3>
                      <p className="text-gray-500 text-base leading-relaxed">
                        Sunday services at 9:30 AM<br />
                        Special services for festivals and occasions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-primary-50 p-3 rounded-xl flex-shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                      <Calendar className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visiting</h3>
                      <p className="text-gray-500 text-base leading-relaxed">
                        The church welcomes visitors throughout the year.<br />
                        Please contact us to arrange a visit or for more<br />
                        information about the church history.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-primary-50 p-3 rounded-xl flex-shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                      <MapPin className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-500 text-base leading-relaxed">
                        Penmaen, Gower, Swansea SA3 2HH
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* St Nicholaston Church Card */}
          <div className={`bg-white rounded-3xl border border-gray-100 transition-all duration-500 overflow-hidden transform group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="order-1 lg:order-2 overflow-hidden h-80 sm:h-96 lg:h-auto lg:min-h-[500px]">
                <ImageWithFallback
                  src={stNicholastonChurchImg}
                  alt="St Nicholaston Church"
                  className="w-full h-full object-cover object-bottom transition-transform duration-700"
                />
              </div>

              <div className="order-2 lg:order-1 p-10 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 drop-shadow-sm">
                  St Nicholas Church
                </h2>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
                  Set in the picturesque village of Nicholaston, this historic church has served the local community for generations. The church features beautiful architecture and a peaceful atmosphere for worship and contemplation.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-primary-50 p-3 rounded-xl flex-shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                      <Clock className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Service Times</h3>
                      <p className="text-gray-500 text-base leading-relaxed">
                        Sunday services at 11:00 AM<br />
                        Evening prayer on Wednesdays at 6:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-primary-50 p-3 rounded-xl flex-shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                      <Calendar className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visiting</h3>
                      <p className="text-gray-500 text-base leading-relaxed">
                        Visitors are always welcome. The church is typically<br />
                        open during daylight hours, and guided tours<br />
                        can be arranged by appointment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-primary-50 p-3 rounded-xl flex-shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                      <MapPin className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-500 text-base leading-relaxed">
                        Nicholaston, Gower, Swansea SA3 2HL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Callouts: Join Friends & Community Worship */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 my-24 items-stretch">
            
            {/* Join Friends Delicate Card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-10 lg:p-12 text-center relative mt-8 md:mt-0 flex flex-col justify-between">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer">
                  <div className="bg-primary-50 text-primary-700 rounded-full w-14 h-14 flex items-center justify-center">
                     <Users className="w-6 h-6 fill-current opacity-60" />
                  </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-gray-900 mb-6 mt-4 leading-tight">Join Friends of<br />St. John's & St. Nicholas</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light mx-auto">
                  Become part of our dedicated community. Stay informed about events, services, and meaningful ways to offer your support to our historic churches.
                </p>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 active:shadow-inner hover:shadow-lg bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 text-lg shadow-md"
                >
                  <Mail className="w-5 h-5 text-white" />
                  Join Our Community
                </button>
              </div>
            </div>

            {/* Elegant Community Notice */}
            <div className="bg-white border border-gray-100 rounded-3xl p-10 lg:p-12 text-center relative mt-8 md:mt-0 flex flex-col justify-between">
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer">
                   <div className="bg-primary-50 text-primary-700 rounded-full w-14 h-14 flex items-center justify-center">
                      <Quote className="w-6 h-6 fill-current opacity-60" />
                   </div>
               </div>
              <div>
                <h3 className="text-2xl font-serif text-gray-900 mb-6 mt-4">Community Worship</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light mx-auto">
                  Both churches are part of the wider Gower community and work together to serve local residents and visitors. All are welcome to attend services, events, and community activities. For more information about either church, please visit during service times.
                </p>
              </div>
              {/* Empty div for flex space-between alignment */}
              <div className="mt-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Styled Join Friends Modal */}
      {showModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Enhanced Backdrop */}
          <div
            onClick={handleCloseModal}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100">
            {/* Rich Header strip */}
            <div className="px-8 py-10 text-center relative bg-[#3a4435] overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#111827] via-[#2F3A29] to-[#6b7564] opacity-90 mix-blend-multiply" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-[40px] opacity-10" />

              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white/80 hover:text-white" />
              </button>

              <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="relative z-10 text-2xl font-serif text-white mb-2 leading-tight">
                Welcome to Friends of<br />St. John's & St. Nicholas
              </h3>
              <p className="relative z-10 text-blue-50/80 text-sm font-light">
                Join our community and stay connected
              </p>
            </div>

            {/* Form area */}
            <div className="px-8 py-10 bg-white">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-serif text-gray-900 mb-3">
                    Welcome Aboard!
                  </h4>
                  <p className="text-gray-600 leading-relaxed font-light mb-8">
                    Thank you for your interest! We'll be in touch soon with more information about upcoming events and how you can get involved.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full bg-gray-900 text-white font-medium rounded-full py-4 transition-transform transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-center text-gray-600 font-light leading-relaxed mb-8">
                    Enter your details below and we'll keep you updated on services, events, and community news.
                  </p>

                  {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"/>
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleJoinSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="join-name" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="join-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="join-email" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="join-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        required
                        disabled={submitting}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-3 bg-[#6b7564] hover:bg-[#5c6555] text-white font-medium rounded-full py-4 mt-2 transition-all transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Join Friends Community
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-center mt-6 text-xs text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
