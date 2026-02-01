import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Sun, Waves, Fish } from "lucide-react";

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
          <nav className="hidden md:flex gap-8">
            <Link href="#tours" className="text-sm font-medium hover:text-teal-600 transition-colors">Tours</Link>
            <Link href="#about" className="text-sm font-medium hover:text-teal-600 transition-colors">About</Link>
            <Link href="#reviews" className="text-sm font-medium hover:text-teal-600 transition-colors">Reviews</Link>
          </nav>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg">
            Book Now
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Placeholder for Hero Image */}
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
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6 animate-fade-in-up">
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
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Explore Tours
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1">
                Watch Video
              </button>
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
              {/* Tour Card 1 */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src="https://placehold.co/600x400/2dd4bf/ffffff?text=Island+Hopping" 
                    alt="Island Hopping" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-teal-700 shadow-sm">
                    Best Seller
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-yellow-500 mb-3 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-slate-900">4.9</span>
                    <span className="text-slate-400">(128 reviews)</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">Island Hopping Adventure</h4>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                    Visit the most beautiful islands in Mactan. Snorkel in crystal clear waters and enjoy a BBQ lunch.
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <div>
                      <span className="text-xs text-slate-400 block">Starting from</span>
                      <span className="text-xl font-bold text-teal-600">$45</span>
                    </div>
                    <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tour Card 2 */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src="https://placehold.co/600x400/0f766e/ffffff?text=Whale+Sharks" 
                    alt="Whale Shark Watching" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-yellow-500 mb-3 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-slate-900">4.8</span>
                    <span className="text-slate-400">(85 reviews)</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">Oslob Whale Shark Watching</h4>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                    A once-in-a-lifetime experience swimming with the gentle giants of the sea in Oslob.
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <div>
                      <span className="text-xs text-slate-400 block">Starting from</span>
                      <span className="text-xl font-bold text-teal-600">$60</span>
                    </div>
                    <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tour Card 3 */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src="https://placehold.co/600x400/14b8a6/ffffff?text=Kawasan+Falls" 
                    alt="Kawasan Falls Canyoneering" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-rose-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                    Thrilling
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-yellow-500 mb-3 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-slate-900">5.0</span>
                    <span className="text-slate-400">(210 reviews)</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">Kawasan Falls Canyoneering</h4>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                    Jump, slide, and swim through the canyons of Badian ending at the majestic Kawasan Falls.
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <div>
                      <span className="text-xs text-slate-400 block">Starting from</span>
                      <span className="text-xl font-bold text-teal-600">$55</span>
                    </div>
                    <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Why Choose Us */}
        <section className="py-24 bg-teal-900 text-white relative overflow-hidden">
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

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
               <Fish className="absolute top-10 right-10 w-32 h-32 opacity-10 rotate-12" />
               <div className="relative z-10 max-w-3xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready for your Cebu adventure?</h2>
                 <p className="text-teal-100 text-lg mb-10">
                   Book your tour now and get a special 10% discount for early bird reservations. Limited slots available!
                 </p>
                 <button className="bg-white text-teal-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition-colors shadow-lg">
                   Book Your Trip Now
                 </button>
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
                <li><Link href="#" className="hover:text-teal-500 transition-colors">Island Hopping</Link></li>
                <li><Link href="#" className="hover:text-teal-500 transition-colors">Whale Shark Watching</Link></li>
                <li><Link href="#" className="hover:text-teal-500 transition-colors">Canyoneering</Link></li>
                <li><Link href="#" className="hover:text-teal-500 transition-colors">City Tour</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-teal-500 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-teal-500 transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-teal-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-teal-500 transition-colors">Terms of Service</Link></li>
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
