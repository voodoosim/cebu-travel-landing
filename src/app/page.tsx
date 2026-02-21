import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Sun, Waves, Fish, ChevronDown } from "lucide-react";
import MobileMenu from "./components/MobileMenu";

const tours = [
  {
    title: "Island Hopping Adventure",
    description: "Visit the most beautiful islands in Mactan. Snorkel in crystal clear waters and enjoy a BBQ lunch.",
    price: 45,
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    badgeColor: "bg-white/90 text-teal-700",
    image: "https://placehold.co/600x400/2dd4bf/ffffff?text=Island+Hopping",
  },
  {
    title: "Oslob Whale Shark Watching",
    description: "A once-in-a-lifetime experience swimming with the gentle giants of the sea in Oslob.",
    price: 60,
    rating: 4.8,
    reviews: 85,
    image: "https://placehold.co/600x400/0f766e/ffffff?text=Whale+Sharks",
  },
  {
    title: "Kawasan Falls Canyoneering",
    description: "Jump, slide, and swim through the canyons of Badian ending at the majestic Kawasan Falls.",
    price: 55,
    rating: 5.0,
    reviews: 210,
    badge: "Thrilling",
    badgeColor: "bg-rose-500 text-white",
    image: "https://placehold.co/600x400/14b8a6/ffffff?text=Kawasan+Falls",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "The island hopping tour was absolutely incredible! Our guide knew all the best spots away from the crowds. The BBQ lunch on the beach was the cherry on top.",
  },
  {
    name: "Kim Minjun",
    location: "Seoul, Korea",
    rating: 5,
    text: "Whale shark watching in Oslob was a dream come true. The team made sure everything was safe and well-organized. Highly recommend!",
  },
  {
    name: "James & Emily",
    location: "London, UK",
    rating: 5,
    text: "We did the canyoneering at Kawasan Falls for our honeymoon. Best decision ever! The falls are breathtaking and the adventure was unforgettable.",
  },
];

const faqs = [
  {
    q: "When is the best time to visit Cebu?",
    a: "The best time to visit Cebu is during the dry season from November to May. The weather is sunny and perfect for island hopping and diving.",
  },
  {
    q: "How do I get from Cebu airport to the city?",
    a: "From Mactan-Cebu International Airport, it takes about 30-40 minutes by taxi to reach Cebu City. You can use the Grab app or take an airport taxi.",
  },
  {
    q: "Do I need to book whale shark tours in advance?",
    a: "We strongly recommend booking in advance, especially during peak season (December-April). Walk-in slots can be difficult to secure and you need to leave very early in the morning.",
  },
  {
    q: "What is included in the tour packages?",
    a: "All tour packages include a licensed guide, transportation, necessary equipment, and lunch. Specific inclusions vary by tour - check each package for details.",
  },
  {
    q: "How much do Cebu tours cost?",
    a: "Island hopping starts at $45, whale shark watching at $60, and Kawasan Falls canyoneering at $55. All tours include guide, equipment, and lunch.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-teal-600 flex items-center gap-2">
            <Sun className="h-6 w-6" />
            <span>CebuTravel</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex gap-8">
            <Link href="#tours" className="text-sm font-medium hover:text-teal-600 transition-colors">Tours</Link>
            <Link href="#about" className="text-sm font-medium hover:text-teal-600 transition-colors">About</Link>
            <Link href="#reviews" className="text-sm font-medium hover:text-teal-600 transition-colors">Reviews</Link>
            <Link href="#faq" className="text-sm font-medium hover:text-teal-600 transition-colors">FAQ</Link>
          </nav>
          <Link href="#cta" className="hidden md:inline-block bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg">
            Book Now
          </Link>
          <MobileMenu />
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-teal-900 to-slate-900">
              <Image
                src="https://placehold.co/1920x1080/0d9488/ffffff?text=Beautiful+Cebu+Ocean"
                alt="Cebu Ocean Background"
                fill
                className="object-cover opacity-60 mix-blend-overlay"
                priority
              />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6">
              Welcome to Paradise
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-lg">
              Discover the Hidden<br />
              <span className="text-teal-300">Gem of Cebu</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto mb-10 drop-shadow-md">
              Crystal clear waters, white sand beaches, and unforgettable adventures wait for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#tours" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center">
                Explore Tours
              </Link>
              <Link href="#about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1 text-center">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 bg-white shadow-sm relative z-20 -mt-10 container mx-auto rounded-xl max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <p className="text-4xl font-bold text-teal-600">50+</p>
              <p className="text-slate-500 text-sm mt-1">Destinations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-teal-600">10k+</p>
              <p className="text-slate-500 text-sm mt-1">Happy Travelers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-teal-600">4.9</p>
              <p className="text-slate-500 text-sm mt-1">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-teal-600">24/7</p>
              <p className="text-slate-500 text-sm mt-1">Support</p>
            </div>
          </div>
        </section>

        {/* Popular Tours */}
        <section id="tours" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Popular Packages</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Unforgettable Adventures</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Choose from our most popular tour packages, hand-picked for the best experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <div key={tour.title} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {tour.badge && (
                      <div className={`absolute top-4 right-4 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm ${tour.badgeColor}`}>
                        {tour.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-yellow-500 mb-3 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-slate-900">{tour.rating}</span>
                      <span className="text-slate-400">({tour.reviews} reviews)</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">{tour.title}</h4>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">{tour.description}</p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                      <div>
                        <span className="text-xs text-slate-400 block">Starting from</span>
                        <span className="text-xl font-bold text-teal-600">${tour.price}</span>
                      </div>
                      <Link href="#cta" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">
                        Book Now &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / Why Choose Us */}
        <section id="about" className="py-24 bg-teal-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <Waves className="w-[800px] h-[800px] absolute -top-40 -left-40" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-teal-300 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
                <h3 className="text-4xl font-bold mb-6">We Make Your Cebu Trip<br />Hassle-Free & Amazing</h3>
                <p className="text-teal-100 mb-8 text-lg leading-relaxed">
                  From airport pickups to private boat charters, we handle all the logistics so you can focus on making memories. Our local guides are experts in finding the best spots away from the crowds.
                </p>
                <ul className="space-y-4">
                  {[
                    "Professional & Licensed Tour Guides",
                    "Comfortable Private Transportation",
                    "Best Price Guarantee",
                    "Customizable Itineraries"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="bg-teal-500/20 p-1 rounded-full">
                        <MapPin className="w-5 h-5 text-teal-300" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <Image
                    src="https://placehold.co/400x500/0f766e/ffffff?text=Experience"
                    alt="Cebu Experience"
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-2xl transform translate-y-8"
                  />
                  <Image
                    src="https://placehold.co/400x500/14b8a6/ffffff?text=Adventure"
                    alt="Cebu Adventure"
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-2xl transform -translate-y-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">What Our Travelers Say</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Real stories from real travelers who experienced the magic of Cebu with us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">FAQ</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Everything you need to know before your Cebu adventure.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-left font-semibold text-slate-900 hover:text-teal-600 transition-colors">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
              <Fish className="absolute top-10 right-10 w-32 h-32 opacity-10 rotate-12" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready for your Cebu adventure?</h2>
                <p className="text-teal-100 text-lg mb-10">
                  Book your tour now and get a special 10% discount for early bird reservations. Limited slots available!
                </p>
                <a
                  href="mailto:info@cebutravel.com?subject=Tour%20Booking%20Inquiry"
                  className="inline-block bg-white text-teal-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition-colors shadow-lg"
                >
                  Book Your Trip Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Sun className="h-6 w-6 text-teal-500" />
                <span>CebuTravel</span>
              </Link>
              <p className="text-sm leading-relaxed">
                Your trusted partner for exploring the beautiful islands of Cebu, Philippines. We provide safe, fun, and memorable tours.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Tours</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#tours" className="hover:text-teal-500 transition-colors">Island Hopping</Link></li>
                <li><Link href="#tours" className="hover:text-teal-500 transition-colors">Whale Shark Watching</Link></li>
                <li><Link href="#tours" className="hover:text-teal-500 transition-colors">Canyoneering</Link></li>
                <li><Link href="#tours" className="hover:text-teal-500 transition-colors">City Tour</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#about" className="hover:text-teal-500 transition-colors">About Us</Link></li>
                <li><Link href="#faq" className="hover:text-teal-500 transition-colors">FAQ</Link></li>
                <li><Link href="#reviews" className="hover:text-teal-500 transition-colors">Reviews</Link></li>
                <li><Link href="#cta" className="hover:text-teal-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li>info@cebutravel.com</li>
                <li>+63 32 123 4567</li>
                <li>Cebu City, Philippines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            &copy; {new Date().getFullYear()} Cebu Travel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
