import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, ChevronRight, Stethoscope, HeartPulse, 
  Activity, Building2, Users, ShieldCheck, CheckCircle2, Clock, 
  ChevronDown, Briefcase, Award, Star, Home, Heart, Building, 
  Upload, Calendar, User, ClipboardList, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logo from './assets/logo.png';

// --- Shared Components ---

const TopBar = () => (
  <div className="bg-blue-900 text-blue-50 py-2 hidden md:block text-sm">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-left">
      <div className="flex space-x-6 text-left">
        <div className="flex items-center space-x-2">
          <Phone size={14} />
          <span>020 3949 7333</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail size={14} />
          <span>admin@chinnygloagency.com</span>
        </div>
      </div>
      <div className="flex space-x-4 italic opacity-90 text-right">
        <span>Highly Compliant & Experienced Healthcare Professionals</span>
      </div>
    </div>
  </div>
);

const Navbar = ({ setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactScroll = () => {
    setCurrentPage('home');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', action: () => { setCurrentPage('home'); window.scrollTo(0,0); } },
    { name: 'About Us', action: () => { setCurrentPage('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { 
      name: 'Candidates', 
      subLinks: [
        { name: 'Doctors', action: () => { setCurrentPage('doctors'); window.scrollTo(0,0); } },
        { name: 'Nurses/HCA', action: () => { setCurrentPage('nurses'); window.scrollTo(0,0); } },
        { name: 'Care / Support Workers', action: () => { setCurrentPage('care-support'); window.scrollTo(0,0); } }
      ]
    },
    { 
      name: 'Healthcare Providers', 
      subLinks: [
        { name: 'NHS Hospital', action: () => { setCurrentPage('nhs-hospital'); window.scrollTo(0,0); } },
        { name: 'Nursing Homes', action: () => { setCurrentPage('nursing-homes'); window.scrollTo(0,0); } },
        { name: 'Care Homes', action: () => { setCurrentPage('care-homes'); window.scrollTo(0,0); } },
        { name: 'Private Hospitals', action: () => { setCurrentPage('private-hospitals'); window.scrollTo(0,0); } }
      ]
    },
    { 
      name: 'Registration', 
      subLinks: [
        { name: 'Doctors Registration', action: () => { setCurrentPage('doctor-reg'); window.scrollTo(0,0); } },
        { name: 'Nurse Registration', action: () => { setCurrentPage('nurse-reg'); window.scrollTo(0,0); } },
        { name: 'Healthcare Assistant Registration', action: () => { setCurrentPage('hca-reg'); window.scrollTo(0,0); } }
      ]
    },
    { name: 'Contact', action: handleContactScroll },
  ];

  return (
    <>
      <TopBar />
      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4 border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
            <img src={logo} alt="Chinnyglo Agency Logo" className="h-10 md:h-14 w-auto" />
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group py-6 -my-6">
                <button 
                  onClick={() => link.action && link.action()}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
                >
                  <span>{link.name}</span>
                  {link.subLinks && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />}
                </button>
                {link.subLinks && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-blue-600 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left">
                    {link.subLinks.map(sub => (
                      <button 
                        key={sub.name} 
                        onClick={() => { sub.action(); }}
                        className="block w-full text-left px-6 py-4 text-white hover:bg-blue-700 transition-colors border-b border-blue-500/30 last:border-0"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button 
              onClick={() => { setCurrentPage('doctor-reg'); window.scrollTo(0,0); }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 shadow-sm"
            >
              Register Now
            </button>
          </div>

          <button className="lg:hidden text-blue-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4 max-h-[70vh] overflow-y-auto text-left text-gray-900">
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-gray-50 pb-2">
                    <button 
                      onClick={() => { if(!link.subLinks) { link.action(); setMobileMenuOpen(false); } }} 
                      className="w-full text-left text-gray-600 text-lg font-medium flex justify-between items-center"
                    >
                      {link.name}
                    </button>
                    {link.subLinks && (
                      <div className="pl-4 mt-3 space-y-3 border-l-2 border-blue-100 mb-2 text-left">
                        {link.subLinks.map(sub => (
                          <button key={sub.name} onClick={() => { sub.action(); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-500 text-base">
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// --- Page Components ---

const Hero = ({ setCurrentPage }) => (
  <section className="relative bg-blue-50 pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden text-left">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100 mb-6 text-blue-700 font-semibold text-sm">
          <ShieldCheck size={16} />
          <span>Highly Compliant & Experienced</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 text-left">
          Connecting Quality <span className="text-blue-600">Healthcare Professionals</span> to the Right Roles
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed text-left">
          Chinnyglo Agency is one of the fastest-growing medical staffing agencies in the UK. We supply temporary and permanent professionals to the NHS and private sectors.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={() => { setCurrentPage('doctor-reg'); window.scrollTo(0,0); }} className="bg-blue-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-700 transition-all shadow-lg text-center">Register Now</button>
          <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-white text-blue-900 border border-blue-200 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 text-center">Request Staff</button>
        </div>
      </motion.div>
      <div className="hidden lg:block">
        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" alt="Healthcare professionals working in a UK hospital" className="rounded-2xl shadow-2xl border-4 border-white h-[500px] w-full object-cover" />
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-20 bg-white text-left">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center text-left">
      <img src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800" alt="Chinnyglo Agency medical staffing team" className="rounded-2xl shadow-lg w-full" loading="lazy" />
      <div className="text-left">
        <h2 className="text-blue-600 font-bold uppercase text-sm mb-3 text-left">Welcome to Chinnyglo</h2>
        <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 text-left">Dedicated to Excellence</h3>
        <p className="text-gray-600 leading-relaxed mb-6 text-left">Our success and growth are based on our unique customer-focused approach. We ensure all candidates are up to date with compliance requirements.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {["Compliant Staff", "Dedicated Support", "Fast Placement", "NHS Verified"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <CheckCircle2 className="text-blue-500" size={20} />
              <span className="font-medium text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Providers = ({ setCurrentPage }) => {
  const list = [
    { id: 'nhs-hospital', icon: Building2, title: "NHS Hospitals", desc: "Maintaining the highest standards of care in NHS Trusts across the UK." },
    { id: 'private-hospitals', icon: Building, title: "Private Hospitals", desc: "Supplying top-tier medical staff to private healthcare facilities." },
    { id: 'nursing-homes', icon: Users, title: "Nursing Homes", desc: "Dedicated nurses and care workers for residential facilities." },
    { id: 'care-homes', icon: Activity, title: "Care Homes", desc: "Compassionate support workers providing daily assistance." }
  ];
  return (
    <section id="providers" className="py-20 bg-gray-50 text-left">
      <div className="max-w-7xl mx-auto px-6 text-left">
        <h3 className="text-3xl font-extrabold text-gray-900 mb-12 text-center text-left">Healthcare Providers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {list.map((p) => {
            const IconComp = p.icon;
            return (
              <div key={p.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all text-left">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6"><IconComp size={24} /></div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-left">{p.title}</h4>
                <p className="text-gray-600 text-sm mb-5 text-left">{p.desc}</p>
                <button onClick={() => { setCurrentPage(p.id); window.scrollTo(0,0); }} className="text-blue-600 font-bold flex items-center">Learn More <ChevronRight size={16} /></button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CandidatesGrid = ({ setCurrentPage }) => {
  const roles = [
    { id: 'doctors', title: "Doctors", icon: Stethoscope, img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600", alt: "Locum doctor jobs UK – apply with Chinnyglo Agency" },
    { id: 'nurses', title: "Nurses / HCA", icon: Activity, img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=600", alt: "Nursing jobs UK – RGN, RMN, HCA roles with Chinnyglo Agency" },
    { id: 'care-support', title: "Care Workers", icon: HeartPulse, img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600", alt: "Care worker and support worker jobs UK with Chinnyglo Agency" }
  ];
  return (
    <section id="candidates" className="py-20 bg-blue-900 text-white text-left">
      <div className="max-w-7xl mx-auto px-6 text-left">
        <h3 className="text-3xl font-extrabold mb-12 text-left text-white">Find Regular Jobs</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComp = role.icon;
            return (
              <div key={role.id} className="bg-white rounded-xl overflow-hidden shadow-lg text-gray-900">
                <img src={role.img} alt={role.alt} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-8 text-left">
                  <div className="flex items-center space-x-3 text-blue-800 mb-4 text-left">
                    <IconComp size={24} />
                    <h4 className="text-xl font-bold">{role.title}</h4>
                  </div>
                  <button onClick={() => { setCurrentPage(role.id); window.scrollTo(0,0); }} className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors">Learn More</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(() => {
        setSuccess(true);
        form.reset();
      })
      .catch((error) => alert("Submission failed: " + error));
  };

  return (
    <section id="contact" className="py-20 bg-white text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-blue-600 p-10 text-white text-left">
            <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-8">
              <div className="flex items-start space-x-4"><MapPin size={24} /><div><p>20 Highland Avenue, Dagenham Essex, RM10 7AS</p></div></div>
              <div className="flex items-start space-x-4"><Phone size={24} /><div><p>020 3949 7333</p></div></div>
              <div className="flex items-start space-x-4"><Mail size={24} /><div><p>admin@chinnygloagency.com</p></div></div>
            </div>
          </div>
          <div className="p-10">
            {success ? (
              <div className="h-full flex flex-col justify-center items-center text-center">
                <CheckCircle2 className="text-green-500 mb-4" size={60} />
                <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                <p className="text-gray-600">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form name="contact" method="POST" data-netlify="true" className="space-y-6 text-left" onSubmit={handleContactSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <div className="text-left text-gray-900">
                  <label className="block text-sm font-bold mb-2 text-left">Name *</label>
                  <input name="name" type="text" className="w-full p-3 border rounded-lg outline-none" required />
                </div>
                <div className="text-left text-gray-900">
                  <label className="block text-sm font-bold mb-2 text-left">Email *</label>
                  <input name="email" type="email" className="w-full p-3 border rounded-lg outline-none" required />
                </div>
                <div className="text-left text-gray-900">
                  <label className="block text-sm font-bold mb-2 text-left">Message *</label>
                  <textarea name="message" rows="4" className="w-full p-3 border rounded-lg outline-none" required></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Registration Logic ---

const RegistrationForm = ({
  type, grades, statusLabel, statusOptions, availabilityOptions, rightToWorkOptions, experienceOptions
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const formName = `${type.toLowerCase()}-registration`.replace(/\s+/g, '-');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    fetch("/", {
      method: "POST",
      body: data,
    })
      .then(() => {
        setSubmitted(true);
        window.scrollTo(0,0);
      })
      .catch((error) => alert("Submission failed: " + error));
  };

  if (submitted) return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Success!</h2>
      <p className="text-gray-600 text-lg">Thank you for registering. Our team will contact you shortly.</p>
    </div>
  );

  return (
    <div className="bg-gray-50 py-16 px-6 text-left">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-left">
        <div className="bg-blue-600 p-8 text-white text-left">
          <h2 className="text-3xl font-bold mb-2">{type} Registration</h2>
          <p className="text-blue-100">Please complete all mandatory fields (*).</p>
        </div>
        <form name={formName} method="POST" data-netlify="true" encType="multipart/form-data" className="p-10 space-y-10" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value={formName} />
          
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center"><User className="mr-2 text-blue-600" size={20} /> Personal Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-gray-900"><label className="block font-bold text-sm mb-1 text-left">First Name *</label><input name="first_name" className="w-full p-2 border rounded" required /></div>
              <div className="text-gray-900"><label className="block font-bold text-sm mb-1 text-left">Last Name *</label><input name="last_name" className="w-full p-2 border rounded" required /></div>
              <div className="text-gray-900"><label className="block font-bold text-sm mb-1 text-left">Email *</label><input name="email" type="email" className="w-full p-2 border rounded" required /></div>
              <div className="text-gray-900"><label className="block font-bold text-sm mb-1 text-left">Mobile *</label><input name="mobile" type="tel" className="w-full p-2 border rounded" required /></div>
            </div>
          </div>

          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center"><Briefcase className="mr-2 text-blue-600" size={20} /> Professional Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-gray-900">
                <label className="block font-bold text-sm mb-1 text-left">Grade *</label>
                <select name="grade" className="w-full p-2 border rounded" required>
                  <option value="">Select Grade</option>
                  {grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="text-gray-900 text-left"><label className="block font-bold text-sm mb-1 text-left">{statusLabel} *</label><input name="registration_number" className="w-full p-2 border rounded" placeholder="Registration No." required /></div>
              <div className="text-gray-900">
                <label className="block font-bold text-sm mb-1 text-left">Right to Work Status *</label>
                <select name="right_to_work" className="w-full p-2 border rounded" required>
                  <option value="">Select Status</option>
                  {rightToWorkOptions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>

          {availabilityOptions && availabilityOptions.length > 0 && (
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center"><Calendar className="mr-2 text-blue-600" size={20} /> Availability</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-gray-900">
                  <label className="block font-bold text-sm mb-1 text-left">Availability *</label>
                  <select name="availability" className="w-full p-2 border rounded" required>
                    <option value="">Select Availability</option>
                    {availabilityOptions.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {experienceOptions && experienceOptions.length > 0 && (
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center"><ClipboardList className="mr-2 text-blue-600" size={20} /> Experience</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-gray-900">
                  <label className="block font-bold text-sm mb-1 text-left">Years of Experience *</label>
                  <select name="experience" className="w-full p-2 border rounded" required>
                    <option value="">Select Experience</option>
                    {experienceOptions.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center"><Upload className="mr-2 text-blue-600" size={20} /> CV Upload</h3>
            <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-4" size={40} />
              <p className="font-bold text-gray-600">{selectedFiles.length > 0 ? "Files Selected" : "Click or drag here to upload CV"}</p>
              {selectedFiles.map((f, i) => <p key={i} className="text-sm text-blue-600 mt-1">{f.name}</p>)}
              <input ref={fileInputRef} name="cv_upload" type="file" multiple className="hidden" onChange={(e) => setSelectedFiles(Array.from(e.target.files))} />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded font-bold hover:bg-blue-700 shadow-md">Submit Registration</button>
        </form>
      </div>
    </div>
  );
};

// --- Page Templates ---

const ContentPageTemplate = ({ title, children, image }) => (
  <div className="bg-white text-left">
    <section className="bg-blue-900 text-white pt-20 pb-24 text-center">
      <div className="max-w-7xl mx-auto px-6 text-center"><h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-center">{title}</h1></div>
    </section>
    <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center text-left text-gray-900">
      <div className="text-left">{children}</div>
      {image && <img src={image} className="rounded-xl shadow-lg w-full h-[400px] object-cover" alt={title} loading="lazy" />}
    </section>
  </div>
);

const ProviderPage = ({ title, icon: IconComp, desc, setCurrentPage }) => {
  const handleRequestInfo = () => {
    setCurrentPage('home');
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  return (
    <div className="bg-white text-left">
      <section className="bg-blue-900 text-white pt-20 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6 flex justify-center text-center"><div className="p-4 bg-white/10 rounded-full"><IconComp size={48} className="text-blue-300" /></div></div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-center">{title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto text-center">{desc}</p>
        </div>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center text-left">
        <div className="text-left text-gray-900">
          <h2 className="text-3xl font-bold mb-6">Reliable & Short-Notice Staffing</h2>
          <p className="text-gray-600 leading-relaxed mb-6">Supplying highly vetted professionals at short notice to sustain patient care.</p>
          <button onClick={handleRequestInfo} className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700">Request Information</button>
        </div>
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" className="rounded-xl shadow-lg w-full h-[300px] object-cover" alt="UK healthcare staffing – hospital corridor" loading="lazy" />
      </section>
    </div>
  );
};

// --- Per-Page SEO Configuration ---

const PAGE_SEO = {
  home: {
    title: 'Chinnyglo Agency | Healthcare Staffing UK – NHS & Private Sector',
    description: "Chinnyglo Agency is one of the UK's fastest-growing medical staffing agencies. We supply compliant Doctors, Nurses, HCAs and Care Workers to the NHS and private sector.",
  },
  doctors: {
    title: 'Doctor Jobs UK – Locum & Permanent Medical Roles | Chinnyglo Agency',
    description: 'Find locum and permanent doctor jobs across the UK with Chinnyglo Agency. We place GPs, Consultants, SHOs, Foundation Doctors and Specialist Registrars in NHS and private hospitals.',
  },
  nurses: {
    title: 'Nursing Jobs UK – RGN, RMN & HCA Roles | Chinnyglo Agency',
    description: 'Nursing and HCA jobs across the UK. Chinnyglo Agency places RGNs, RMNs, RNLDs and Midwives in NHS hospitals, nursing homes and care homes with excellent pay rates.',
  },
  'care-support': {
    title: 'Care Worker & Support Worker Jobs UK | Chinnyglo Agency',
    description: 'Care and support worker jobs across the UK. Earn competitive hourly rates working with Chinnyglo Agency to deliver outstanding care to vulnerable adults and elderly residents.',
  },
  'doctor-reg': {
    title: 'Doctor Registration – Apply to Join Chinnyglo Agency',
    description: 'Register as a doctor with Chinnyglo Agency. Complete our quick online form and our consultants will match you with the best locum and permanent medical positions across the UK.',
  },
  'nurse-reg': {
    title: 'Nurse Registration – Apply to Join Chinnyglo Agency',
    description: 'Register as a nurse with Chinnyglo Agency. We place RGNs, RMNs, RNLDs and Midwives in top NHS and private healthcare settings with competitive pay and flexible shifts.',
  },
  'hca-reg': {
    title: 'Healthcare Assistant Registration | Chinnyglo Agency',
    description: 'Register as a Healthcare Assistant with Chinnyglo Agency. Access flexible shifts in NHS hospitals, nursing homes and care homes across the UK with great pay rates.',
  },
  'nhs-hospital': {
    title: 'NHS Hospital Staffing Agency UK | Chinnyglo Agency',
    description: 'Chinnyglo Agency provides highly compliant, short-notice NHS hospital staffing across the UK. We supply Doctors, Nurses and HCAs to NHS Trusts, maintaining the highest standards of patient care.',
  },
  'private-hospitals': {
    title: 'Private Hospital Staffing Agency UK | Chinnyglo Agency',
    description: 'Supply top-tier medical professionals to your private hospital with Chinnyglo Agency. We source compliant Doctors, Nurses and HCAs at short notice to maintain the highest standard of care.',
  },
  'nursing-homes': {
    title: 'Nursing Home Staffing Agency UK | Chinnyglo Agency',
    description: 'Reliable nursing home staffing from Chinnyglo Agency. We supply qualified nurses and care workers to residential and nursing homes across the UK at short notice.',
  },
  'care-homes': {
    title: 'Care Home Staffing Agency UK | Chinnyglo Agency',
    description: 'Chinnyglo Agency provides experienced care home support workers and carers across the UK. Compassionate, compliant staff placed at short notice to ensure continuous quality care.',
  },
};

// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  const rightToWorkOptions = ["UK/EC National", "Work Permit", "Student Visa", "Tier 2 Visa", "Indefinite Leave to Remain"];
  const availabilityOptions = ["Annual Leave", "Evenings and Weekends", "Full Time"];
  const experienceOptions = ["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "10+ years"];

  // Sync state when user uses browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title and all meta tags on every page change
  useEffect(() => {
    const seo = PAGE_SEO[currentPage] || PAGE_SEO.home;
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', seo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', seo.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content',
      `https://www.chinnygloagency.com/${currentPage === 'home' ? '' : '#' + currentPage}`
    );
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', seo.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', seo.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href',
      `https://www.chinnygloagency.com/${currentPage === 'home' ? '' : '#' + currentPage}`
    );
  }, [currentPage]);

  // Navigate: update URL hash + state (enables browser back/forward)
  const navigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-left">
      <Navbar setCurrentPage={navigate} />
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero setCurrentPage={navigate} />
            <About />
            <Providers setCurrentPage={navigate} />
            <CandidatesGrid setCurrentPage={navigate} />
            <Contact />
          </>
        )}
        {currentPage === 'doctors' && (
          <ContentPageTemplate title="Doctor Jobs UK – Locum & Permanent Medical Roles" image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-left">Advancing Your Medical Career</h2>
            <p className="text-gray-600 mb-6 text-left">At Chinnyglo Agency, we work tirelessly to match your skills with the right opportunities across the NHS and private sector.</p>
            <ul className="space-y-3 font-medium text-left">
              {["Excellent Pay Rates", "Flexible Locum & Permanent Hours", "Dedicated Personal Consultant", "Fast NHS Compliance Checks"].map(t => (
                <li key={t} className="flex items-center space-x-3 text-left"><CheckCircle2 className="text-green-500" size={20} /><span>{t}</span></li>
              ))}
            </ul>
          </ContentPageTemplate>
        )}
        {currentPage === 'nurses' && (
          <ContentPageTemplate title="Nursing & HCA Jobs UK – RGN, RMN & Midwife Roles" image="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-left">Global Nursing Recruitment</h2>
            <p className="text-gray-600 mb-6 text-left">Over a decade of experience placing competent nurses and HCAs across UK NHS hospitals, nursing homes and care homes. We assist with visa applications and NMC compliance.</p>
            <button onClick={() => navigate('nurse-reg')} className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700">Register Now</button>
          </ContentPageTemplate>
        )}
        {currentPage === 'care-support' && (
          <ContentPageTemplate title="Care Worker & Support Worker Jobs UK" image="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-left">Deliver Outstanding Care</h2>
            <p className="text-gray-600 mb-6 text-left">Deliver care services to vulnerable and elderly people across the UK. We offer competitive hourly pay, flexible shift patterns and ongoing support.</p>
            <button onClick={() => navigate('hca-reg')} className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors">Register Now</button>
          </ContentPageTemplate>
        )}
        {currentPage === 'doctor-reg' && <RegistrationForm type="Doctor" grades={["Associate Specialist", "Consultant", "SHO", "Specialist Registrar", "Foundation Year"]} statusLabel="GMC Status" statusOptions={["Full Registration", "Provisional", "None"]} availabilityOptions={availabilityOptions} rightToWorkOptions={rightToWorkOptions} experienceOptions={experienceOptions} />}
        {currentPage === 'nurse-reg' && <RegistrationForm type="Nurse" grades={["RGN", "RMN", "RNLD", "Midwife"]} statusLabel="NMC Status" statusOptions={["Registered (Active Pin)", "Pending"]} availabilityOptions={availabilityOptions} rightToWorkOptions={rightToWorkOptions} experienceOptions={experienceOptions} />}
        {currentPage === 'hca-reg' && <RegistrationForm type="Healthcare Assistant" grades={["HCA 1", "HCA 2"]} statusLabel="Right to Work" statusOptions={rightToWorkOptions} availabilityOptions={availabilityOptions} rightToWorkOptions={rightToWorkOptions} experienceOptions={experienceOptions} />}
        {currentPage === 'nhs-hospital' && <ProviderPage title="NHS Hospital Staffing UK" icon={Building2} desc="Reliable, compliant short-notice staffing for NHS Trusts across the United Kingdom." setCurrentPage={navigate} />}
        {currentPage === 'private-hospitals' && <ProviderPage title="Private Hospital Staffing UK" icon={Building} desc="Top-tier Doctors, Nurses and HCAs for private healthcare facilities across the UK." setCurrentPage={navigate} />}
        {currentPage === 'nursing-homes' && <ProviderPage title="Nursing Home Staffing UK" icon={Users} desc="Qualified nurses and care workers for residential and nursing home environments." setCurrentPage={navigate} />}
        {currentPage === 'care-homes' && <ProviderPage title="Care Home Staffing UK" icon={Home} desc="Compassionate, compliant support workers for care home communities across the UK." setCurrentPage={navigate} />}
      </main>
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800 text-left">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12 items-start text-left text-gray-400">
          <div className="text-left">
            <img src={logo} alt="Chinnyglo Agency – UK Healthcare Staffing" className="h-12 w-auto mb-6" />
            <p className="max-w-sm text-left">Highly compliant medical staffing agency serving the UK for over a decade.</p>
          </div>
          <div className="flex space-x-12 text-left">
            <div className="text-left">
              <h6 className="text-white font-bold mb-4 text-left">Quick Links</h6>
              <ul className="space-y-2 text-left">
                <li><button onClick={() => navigate('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => navigate('doctors')} className="hover:text-white transition-colors">Doctors</button></li>
                <li><button onClick={() => navigate('nurses')} className="hover:text-white transition-colors">Nurses / HCA</button></li>
                <li><button onClick={() => navigate('care-support')} className="hover:text-white transition-colors">Care Workers</button></li>
              </ul>
            </div>
          </div>
          <div className="text-left text-gray-400">
            <h6 className="text-white font-bold mb-4 text-left">Policies</h6>
            <ul className="space-y-2 text-left text-gray-400">
              <li><a href="https://drive.google.com/file/d/1R4cs4kDkvapLofdjDwz9OOoDYglrXMi8/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Data Protection</a></li>
              <li><a href="https://drive.google.com/file/d/1Wf0vZypbuvtsQS9vcrvJRFkxrMjH0toV/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Carbon Reduction / CRP</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}