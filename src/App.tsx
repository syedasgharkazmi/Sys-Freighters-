/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Route as RouteIcon, 
  Menu, 
  X, 
  ChevronRight, 
  BarChart3, 
  Headphones, 
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  FileText,
  CreditCard,
  Search,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { cn } from './lib/utils';

// --- Shared Components ---

const Logo = ({ className, light = false }: { className?: string, light?: boolean }) => (
  <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
    <div className="relative">
      <div className="absolute inset-0 bg-orange-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
      <div className="relative bg-slate-900 p-2.5 rounded-2xl shadow-2xl transform group-hover:rotate-6 transition-transform border border-white/10">
        <Truck className="text-orange-500 w-7 h-7" />
      </div>
      <div className="absolute -bottom-1 -right-1 bg-orange-600 w-4 h-4 rounded-full border-2 border-white" />
    </div>
    <div className="flex flex-col -space-y-1">
      <span className={cn(
        "font-black text-3xl tracking-tighter italic",
        light ? "text-white" : "text-slate-900"
      )}>
        SYS
      </span>
      <div className="flex items-center gap-1">
        <div className="h-[2px] w-4 bg-orange-600" />
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-600">
          FREIGHTERS
        </span>
      </div>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h3>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('Dispatch');
  const [selectedDate, setSelectedDate] = useState('2026-03-28');
  const [selectedTime, setSelectedTime] = useState('0:00');

  const timeSlots = [
    '0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00'
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final booking logic here
    onClose();
    setStep(1); // Reset for next time
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => { onClose(); setStep(1); }} 
      title={step === 1 ? "Booking" : "Contact Info"}
    >
      <div className="relative">
        {step === 2 && (
          <button 
            onClick={handleBack}
            className="absolute -top-14 left-0 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
        )}

        {step === 1 ? (
          <form className="space-y-6" onSubmit={handleNext}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select a Service</label>
                <div className="relative">
                  <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 appearance-none"
                  >
                    <option>Dispatch</option>
                    <option>Consultation</option>
                    <option>Paperwork Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time</label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 appearance-none"
                  >
                    {timeSlots.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <MapPin className="w-3 h-3" />
                <span>(GMT-04:00) Eastern Time - New York</span>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Please choose a time below</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-2 rounded-lg text-sm font-bold transition-all border",
                        selectedTime === time 
                          ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" 
                          : "bg-white border-slate-200 text-slate-600 hover:border-orange-600 hover:text-orange-600"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all mt-4">
              Continue
            </button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-6 mb-6">
              <div className="text-center border-r border-slate-200 pr-6">
                <div className="text-sm font-black text-slate-900">{selectedDate.split('-')[2]}</div>
                <div className="text-[10px] font-black uppercase text-slate-400">
                  {new Date(selectedDate).toLocaleString('default', { month: 'short' })}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Truck className="w-3 h-3 text-orange-600" />
                  <span>{selectedService}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{selectedTime}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your name *</label>
                <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20" placeholder="John Doe" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">E-mail *</label>
                  <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20" placeholder="john@example.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone number</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20" placeholder="(555) 000-0000" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your message</label>
                <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20" placeholder="Any special requirements?"></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" required id="terms" className="mt-1 rounded border-slate-300 text-orange-600 focus:ring-orange-600" />
                <label htmlFor="terms" className="text-[10px] text-slate-500 leading-tight">
                  I agree with the <Link to="/terms-and-conditions" className="text-orange-600 hover:underline">Terms & Conditions</Link> and the <Link to="/privacy-policy" className="text-orange-600 hover:underline">Privacy & Cookies Policy</Link>.
                </label>
              </div>
            </div>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all mt-4">
              Book
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Us">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
          <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20" placeholder="John Doe" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
          <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20" placeholder="john@example.com" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
          <textarea rows={4} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20" placeholder="How can we help you?"></textarea>
        </div>
        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all mt-4">
          Send Message
        </button>
      </form>
    </Modal>
  );
};

const Navbar = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled || !isHome ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <Logo light={!isScrolled && isHome} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-orange-600 transition-colors",
                isScrolled || !isHome ? "text-slate-700" : "text-white/90"
              )}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onOpenBooking}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-orange-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white absolute top-full left-0 right-0 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-800 font-medium hover:text-orange-600"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="bg-orange-600 text-white py-3 rounded-xl font-bold"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <Logo light />
            </Link>
            <p className="text-slate-500 leading-relaxed mb-6">
              Professional trucking and dispatch services providing reliable logistics solutions across the USA. We drive your success.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="bg-white/5 p-2 rounded-lg hover:bg-orange-600 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6">Quick Links</h5>
            <ul className="space-y-4 text-slate-500">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><a href="/#about" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="/#services" className="hover:text-orange-500 transition-colors">Our Services</a></li>
              <li><a href="/#contact" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6">Legal & Policies</h5>
            <ul className="space-y-4 text-slate-500">
              <li><Link to="/merchant-policies" className="hover:text-orange-500 transition-colors">Merchant Policies</Link></li>
              <li><Link to="/legal-notice" className="hover:text-orange-500 transition-colors">Legal Notice</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/return-and-refund-policy" className="hover:text-orange-500 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6">Contact Info</h5>
            <ul className="space-y-4 text-slate-500">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-600" />
                <span>(614) 615-7517</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-600" />
                <span className="break-all">Contact@sysfreighter.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-600 mt-1" />
                <span>5149 Meadowfield ln. Hilliard OHIO 43026</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-sm">
          <div>© 2026 SYS FREIGHTERS. All rights reserved.</div>
          <div className="flex gap-8">
            <span>Powered by SYS FREIGHTERS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const Home = ({ onOpenBooking, onOpenContact }: { onOpenBooking: () => void, onOpenContact: () => void }) => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Semi Truck on Highway" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 border border-orange-500/20 rounded-full">
              Reliable • Efficient • Professional
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight">
              SYS <br />
              <span className="text-orange-600">FREIGHTERS</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light">
              Empowering carriers and owner-operators with top-tier dispatch solutions. We handle the paperwork, you handle the road.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 group"
              >
                Book Availability <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onOpenContact}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 py-10 bg-gradient-to-t from-slate-950 to-transparent">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Loads Dispatched', value: '50k+' },
              { label: 'Active Carriers', value: '1.2k+' },
              { label: 'States Covered', value: '48' },
              { label: 'Support', value: '24/7' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=1000" 
                  alt="Logistics Hub" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-orange-600 p-8 rounded-3xl shadow-2xl hidden md:block max-w-xs border-4 border-white">
                <p className="text-white font-medium italic text-lg leading-tight">
                  "We don't just find loads, we build partnerships that drive success."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                      alt="CEO" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">CEO, SYS Trucking</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 mb-4">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
                Your Strategic Partner in <br />
                <span className="text-orange-600">Freight Logistics</span>
              </h3>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                At SYS FREIGHTERS, we understand that the backbone of the American economy is the trucking industry. Our mission is to simplify the lives of owner-operators and small fleets by providing professional, high-paying dispatch services.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Based in the heart of the USA, we leverage cutting-edge technology and deep industry relationships to ensure your trucks are always moving with the best possible rates.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  'Professional Load Finding & Negotiation',
                  'Comprehensive Paperwork & Billing',
                  'Broker Credit Checks & Factoring Setup',
                  '24/7 Dedicated Dispatch Support'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-orange-600 w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg">
                Get Started Today
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 mb-4">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Comprehensive Solutions for <br /> Modern Logistics
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Dispatching',
                desc: 'We find the highest paying loads on the market and negotiate the best rates for you.',
                icon: <RouteIcon className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Carrier Packets & Setup',
                desc: 'We handle all carrier packets and broker setup forms, ensuring you are ready to haul immediately.',
                icon: <FileText className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Paperwork Management',
                desc: 'No more headaches with BOLs, rate confirmations, or invoicing. We handle the back-office.',
                icon: <BarChart3 className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Route Planning',
                desc: 'Optimized routing to save fuel and time, ensuring your drivers stay safe and efficient.',
                icon: <MapPin className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Broker Credit Checks',
                desc: 'We verify every broker to ensure you get paid on time, every time.',
                icon: <ShieldCheck className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Factoring Assistance',
                desc: 'We help you set up factoring services to get your cash flow moving faster.',
                icon: <CreditCard className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Load Searching',
                desc: 'Continuous monitoring of multiple load boards to find the perfect match for your equipment.',
                icon: <Search className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Quick Pay Setup',
                desc: 'We coordinate with brokers to set up quick pay options whenever available.',
                icon: <Zap className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: '24/7 Support',
                desc: 'Our dispatchers are available around the clock to assist with any issues on the road.',
                icon: <Headphones className="w-8 h-8" />,
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600'
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 bg-orange-600 text-white p-3 rounded-xl shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-600 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500 mb-4">Why Choose Us</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tighter">
                We Drive Your Business <br />
                <span className="text-orange-500 italic">Forward</span>
              </h3>
              
              <div className="space-y-8">
                {[
                  {
                    title: 'Higher Rates per Mile',
                    desc: 'Our expert negotiators consistently secure rates 15-20% above market average.'
                  },
                  {
                    title: 'No Forced Dispatch',
                    desc: 'You choose where you want to go. We provide the options, you make the final call.'
                  },
                  {
                    title: 'Dedicated Dispatcher',
                    desc: 'A single point of contact who knows your preferences and your business.'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-orange-500/30 flex items-center justify-center text-orange-500 font-black">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800" 
                    alt="Modern Truck" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="aspect-square rounded-3xl bg-orange-600 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-20 h-20" />
                  </div>
                  <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-black mb-1">98%</div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-90 mb-2">Retention Rate</div>
                    <p className="text-[10px] leading-tight opacity-70 font-medium">Our carriers stay because we deliver on our promises every single day.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-3xl bg-white/10 backdrop-blur-md p-8 flex flex-col justify-between border border-white/10 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Headphones className="w-20 h-20" />
                  </div>
                  <div className="bg-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-black mb-1">24/7</div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-90 mb-2">Live Support</div>
                    <p className="text-[10px] leading-tight opacity-70 font-medium">Real people, real solutions, anytime you're on the road.</p>
                  </div>
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
                    alt="Logistics Operations" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-20">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 mb-4">Get In Touch</h2>
                <h3 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">Ready to hit the road?</h3>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                      <input type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Phone Number</label>
                    <input type="tel" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all" placeholder="(555) 000-0000" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Message</label>
                    <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all" placeholder="Tell us about your fleet..."></textarea>
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all">
                    Send Message
                  </button>
                </form>
              </div>

              <div className="relative bg-slate-900 p-12 md:p-20 text-white flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                  <img 
                    src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Trucking Background" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/80" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-10">Contact Information</h4>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                        <Phone className="text-orange-500 w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Call Us</div>
                        <div className="text-xl font-bold">(614) 615-7517</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                        <Mail className="text-orange-500 w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Email Us</div>
                        <div className="text-xl font-bold break-all">Contact@sysfreighter.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                        <MapPin className="text-orange-500 w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Location</div>
                        <div className="text-xl font-bold">5149 Meadowfield ln. Hilliard OHIO 43026</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-12">
                  <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Follow Us</div>
                  <div className="flex gap-4">
                    {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="bg-white/10 p-3 rounded-xl hover:bg-orange-600 transition-colors border border-white/10">
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const PolicyPage = ({ title, content }: { title: string, content: React.ReactNode }) => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 tracking-tighter">{title}</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
          {content}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const { pathname } = useLocation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-600 selection:text-white">
      <Navbar onOpenBooking={() => setIsBookingModalOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={
            <Home 
              onOpenBooking={() => setIsBookingModalOpen(true)} 
              onOpenContact={() => setIsContactModalOpen(true)} 
            />
          } />
          <Route path="/merchant-policies" element={
            <PolicyPage 
              title="Merchant Policies" 
              content={
                <>
                  <p>At SYS FREIGHTERS, we maintain strict merchant policies to ensure the highest quality of service for our carriers and partners.</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8">Service Standards</h2>
                  <p>We commit to professional representation of your brand to brokers and shippers. Our dispatchers are trained to negotiate fairly and maintain clear communication throughout the load lifecycle.</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8">Carrier Requirements</h2>
                  <p>All carriers in our network must maintain valid authority, insurance, and safety ratings as required by FMCSA regulations. We perform regular audits to ensure compliance.</p>
                </>
              } 
            />
          } />
          <Route path="/legal-notice" element={
            <PolicyPage 
              title="Legal Notice" 
              content={
                <>
                  <p>SYS FREIGHTERS is a registered logistics service provider. This website and its content are protected by copyright laws.</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8">Disclaimer</h2>
                  <p>While we strive for accuracy, we are not responsible for errors in load information provided by third-party brokers or shippers. All rates and terms are subject to final confirmation via rate confirmation documents.</p>
                </>
              } 
            />
          } />
          <Route path="/terms-and-conditions" element={
            <PolicyPage 
              title="Terms & Conditions" 
              content={
                <>
                  <p>By using our services, you agree to the following terms and conditions.</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8">1. Dispatch Agreement</h2>
                  <p>We act as your agent for the purpose of finding and booking freight. We do not own the trucks or the freight.</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8">2. Payment Terms</h2>
                  <p>Service fees are due upon receipt of the rate confirmation or as otherwise agreed in your specific service contract.</p>
                </>
              } 
            />
          } />
          <Route path="/privacy-policy" element={
            <PolicyPage 
              title="Privacy Policy" 
              content={
                <>
                  <p>Your privacy is important to us. We collect only the information necessary to provide our dispatch services.</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8">Data Collection</h2>
                  <p>We collect carrier authority documents, insurance information, and contact details. This information is shared only with brokers and shippers for the purpose of booking freight.</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8">Security</h2>
                  <p>We implement industry-standard security measures to protect your sensitive business data.</p>
                </>
              } 
            />
          } />
          <Route path="/return-and-refund-policy" element={
            <PolicyPage 
              title="Return & Refund Policy" 
              content={
                <>
                  <p>Due to the nature of dispatch services, our refund policy is as follows:</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8">Service Fees</h2>
                  <p>Once a load is booked and a rate confirmation is signed, the dispatch fee is non-refundable. If a load is cancelled by the broker or shipper, we will work to find a replacement load at no additional initial fee.</p>
                </>
              } 
            />
          } />
        </Routes>
      </main>
      <Footer />
      
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
