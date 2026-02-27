import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, ChevronRight, Stethoscope, HeartPulse, 
  Activity, Building2, Users, ShieldCheck, CheckCircle2, Clock, 
  ChevronDown, Briefcase, Award, Star, Home, Heart, Building, 
  Upload, Calendar, User, ClipboardList, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LOGO CONFIGURATION FOR LOCAL VS PREVIEW:
 * * LOCAL PROJECT: Use the import line below for your local project.
 * * PREVIEW: We use the live URL here so the site compiles in this window.
 */
import logo from './assets/logo.png'; 
// const logo = "https://www.chinnygloagency.com/wp-content/uploads/2021/04/cropped-logo.png";

// --- Layout Components ---

const TopBar = () => (
  <div className="bg-blue-900 text-blue-50 py-2 hidden md:block text-sm">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-left">
      <div className="flex space-x-6">
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
  };

  const navLinks = [
    { name: 'Home', action: () => setCurrentPage('home') },
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
                    <button onClick={() => { if(!link.subLinks) { link.action(); setMobileMenuOpen(false); } }} className="w-full text-left text-gray-600 text-lg font-medium flex justify-between items-center">
                      {link.name}
                    </button>
                    {link.subLinks && (
                      <div className="pl-4 mt-3 space-y-3 border-l-2 border-blue-100 mb-2">
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

// --- Home Components ---

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
          Chinnyglo Agency is one of the fastest-growing medical staffing agencies in the UK. We supply both temporary and permanent professionals to the NHS and private sectors.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={() => { setCurrentPage('doctor-reg'); window.scrollTo(0,0); }} className="bg-blue-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-700 transition-all shadow-lg text-center">Register Now</button>
          <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-white text-blue-900 border border-blue-200 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 text-center">Request Staff</button>
        </div>
      </motion.div>
      <div className="hidden lg:block">
        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" alt="Professionals" className="rounded-2xl shadow-2xl border-4 border-white h-[500px] w-full object-cover" />
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-20 bg-white text-left">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center text-left">
      <img src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800" alt="Medical Team" className="rounded-2xl shadow-lg w-full" />
      <div>
        <h2 className="text-blue-600 font-bold uppercase text-sm mb-3 text-left">Welcome to Chinnyglo</h2>
        <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 text-left">Dedicated to Excellence</h3>
        <p className="text-gray-600 leading-relaxed mb-6 text-left">Our success and growth are based on our unique customer-focused approach which underpins our services. We ensure all candidates are up to date with compliance requirements.</p>
        <div className="grid sm:grid-cols-2 gap-4 text-left">
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
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Healthcare Providers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {list.map((p) => {
            const IconComponent = p.icon;
            return (
              <div key={p.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all text-left">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6"><IconComponent size={24} /></div>
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
    { id: 'doctors', title: "Doctors", icon: Stethoscope, img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" },
    { id: 'nurses', title: "Nurses / HCA", icon: Activity, img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=600" },
    { id: 'care-support', title: "Care Workers", icon: HeartPulse, img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600" }
  ];
  return (
    <section id="candidates" className="py-20 bg-blue-900 text-white text-left">
      <div className="max-w-7xl mx-auto px-6 text-left">
        <h3 className="text-3xl font-extrabold mb-12 text-left">Find Regular Jobs</h3>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div key={role.id} className="bg-white rounded-xl overflow-hidden shadow-lg text-gray-900 text-left">
                <img src={role.img} alt={role.title} className="w-full h-48 object-cover" />
                <div className="p-8 text-left">
                  <div className="flex items-center space-x-3 text-blue-800 mb-4 text-left">
                    <IconComponent size={24} />
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

const Contact = () => (
  <section id="contact" className="py-20 bg-white text-left">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-left">
        <div className="bg-blue-600 p-10 text-white text-left">
          <h3 className="text-3xl font-bold mb-6 text-left">Get in Touch</h3>
          <div className="space-y-8 text-left">
            <div className="flex items-start space-x-4 text-left"><MapPin size={24} /><div><p>20 Highland Avenue, Dagenham Essex, RM10 7AS</p></div></div>
            <div className="flex items-start space-x-4 text-left"><Phone size={24} /><div><p>020 3949 7333</p></div></div>
            <div className="flex items-start space-x-4 text-left"><Mail size={24} /><div><p>admin@chinnygloagency.com</p></div></div>
          </div>
        </div>
        <div className="p-10 text-left">
          {/* Netlify Form for Contact Us */}
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true" 
            className="space-y-6 text-left" 
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const formData = new FormData(form);
              fetch("/", {
                method: "POST",
                body: formData,
              }).then(() => {
                alert("Thank you! Your message has been sent.");
                form.reset();
              }).catch((error) => alert(error));
            }}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="text-left">
              <label className="block text-sm font-bold mb-2 text-left">Name *</label>
              <input name="name" type="text" className="w-full p-3 border rounded-lg outline-none text-gray-900" required />
            </div>
            <div className="text-left">
              <label className="block text-sm font-bold mb-2 text-left">Email *</label>
              <input name="email" type="email" className="w-full p-3 border rounded-lg outline-none text-gray-900" required />
            </div>
            <div className="text-left">
              <label className="block text-sm font-bold mb-2 text-left">Message *</label>
              <textarea name="message" rows="4" className="w-full p-3 border rounded-lg outline-none text-gray-900" required></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const RegistrationForm = ({ 
  type, 
  grades, 
  statusLabel, 
  statusOptions, 
  availabilityOptions, 
  rightToWorkOptions, 
  experienceOptions 
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  
  const formName = `${type.toLowerCase()}-registration`.replace(/\s+/g, '-');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files.slice(0, 3)); // Limit to 3 files
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      body: formData,
    })
    .then(() => {
      setSubmitted(true);
      window.scrollTo(0,0);
    })
    .catch((error) => {
      console.error(error);
      alert("There was an error submitting your registration. Please try again.");
    });
  };

  if (submitted) return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
      <h2 className="text-3xl font-bold mb-2 text-gray-900 text-center">Success!</h2>
      <p className="text-gray-600 text-center">Thank you for registering. Our compliance team will review your application and get in touch shortly.</p>
    </div>
  );

  return (
    <div className="bg-gray-50 py-16 px-6 text-left">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-left">
        <div className="bg-blue-600 p-8 text-white text-left">
          <h2 className="text-3xl font-bold mb-2 text-left">{type} Registration</h2>
          <p className="text-blue-100">Please complete the form below to join our network. All fields marked with * are mandatory.</p>
        </div>
        
        {/* Netlify Form for Registration */}
        <form 
          name={formName}
          method="POST"
          data-netlify="true"
          encType="multipart/form-data"
          className="p-10 space-y-10 text-left" 
          onSubmit={handleSubmit}
        >
          {/* Required for Netlify React Forms */}
          <input type="hidden" name="form-name" value={formName} />
          <input type="hidden" name="registration_type" value={type} />
          
          {/* Section: Personal Details */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center">
              <User className="mr-2 text-blue-600" size={20} /> Personal Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block font-bold text-sm mb-1 text-gray-900">First Name *</label><input name="first_name" className="w-full p-2 border rounded text-gray-900" required /></div>
              <div><label className="block font-bold text-sm mb-1 text-gray-900">Last Name *</label><input name="last_name" className="w-full p-2 border rounded text-gray-900" required /></div>
              <div><label className="block font-bold text-sm mb-1 text-gray-900">Date of Birth *</label><input name="dob" type="date" className="w-full p-2 border rounded text-gray-900" required /></div>
              <div>
                <label className="block font-bold text-sm mb-1 text-gray-900">Gender *</label>
                <select name="gender" className="w-full p-2 border rounded text-gray-900" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div><label className="block font-bold text-sm mb-1 text-gray-900">Nationality *</label><input name="nationality" className="w-full p-2 border rounded text-gray-900" required /></div>
              <div><label className="block font-bold text-sm mb-1 text-gray-900">Email Address *</label><input name="email" type="email" className="w-full p-2 border rounded text-gray-900" required /></div>
            </div>
          </div>

          {/* Section: Contact Details */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center">
              <Phone className="mr-2 text-blue-600" size={20} /> Contact Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block font-bold text-sm mb-1 text-gray-900">Home Tel No *</label><input name="tel_home" type="tel" className="w-full p-2 border rounded text-gray-900" required /></div>
              <div><label className="block font-bold text-sm mb-1 text-gray-900">Mobile No *</label><input name="tel_mobile" type="tel" className="w-full p-2 border rounded text-gray-900" required /></div>
              <div className="md:col-span-2"><label className="block font-bold text-sm mb-1 text-gray-900">Address Line 1 *</label><input name="address_1" className="w-full p-2 border rounded text-gray-900" required /></div>
              <div className="md:col-span-2"><label className="block font-bold text-sm mb-1 text-gray-900">Address Line 2</label><input name="address_2" className="w-full p-2 border rounded text-gray-900" /></div>
              <div><label className="block font-bold text-sm mb-1 text-gray-900">City *</label><input name="city" className="w-full p-2 border rounded text-gray-900" required /></div>
              <div><label className="block font-bold text-sm mb-1 text-gray-900">Postcode *</label><input name="postcode" className="w-full p-2 border rounded text-gray-900" required /></div>
            </div>
          </div>

          {/* Section: Professional Details */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center">
              <Briefcase className="mr-2 text-blue-600" size={20} /> Professional Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-sm mb-1 text-gray-900">What is your Grade? *</label>
                <select name="grade" className="w-full p-2 border rounded text-gray-900" required>
                  <option value="">Select Grade</option>
                  {grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div><label className="block font-bold text-sm mb-1 text-gray-900">What is your Speciality? *</label><input name="speciality" className="w-full p-2 border rounded text-gray-900" required /></div>
              
              <div>
                <label className="block font-bold text-sm mb-1 text-gray-900">What is your Availability?</label>
                <select name="availability" className="w-full p-2 border rounded text-gray-900">
                  <option value="">Select Availability</option>
                  {availabilityOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-gray-900">{statusLabel}</label>
                <select name="status" className="w-full p-2 border rounded text-gray-900">
                  <option value="">Select Status</option>
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div><label className="block font-bold text-sm mb-1 text-gray-900">{statusLabel.replace('Status', 'Number')} *</label><input name="registration_number" className="w-full p-2 border rounded text-gray-900" required /></div>
              
              <div>
                <label className="block font-bold text-sm mb-1 text-gray-900">Right to Work Status</label>
                <select name="right_to_work" className="w-full p-2 border rounded text-gray-900">
                  <option value="">Select Status</option>
                  {rightToWorkOptions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-gray-900">UK Experience</label>
                <select name="uk_experience" className="w-full p-2 border rounded text-gray-900">
                  <option value="">Select Experience</option>
                  {experienceOptions.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* CV Upload - Integrated with actual file input */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6 flex items-center">
              <Upload className="mr-2 text-blue-600" size={20} /> Attachments
            </h3>
            <div 
              onClick={handleUploadClick}
              className="border-2 border-dashed rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Upload className="mx-auto text-gray-400 mb-4" size={40} />
              <p className="font-bold text-gray-600">
                {selectedFiles.length > 0 ? "Change selected files" : "Click or drag files here to upload CV"}
              </p>
              <p className="text-xs text-gray-400 mt-2">Maximum 3 files (PDF, DOC, DOCX)</p>
              
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-center space-x-2 text-sm text-blue-700 bg-blue-50 py-1 px-3 rounded-full inline-flex">
                      <FileText size={14} />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <input 
                ref={fileInputRef}
                name="cv_upload"
                type="file" 
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded font-bold hover:bg-blue-700 shadow-md transition-colors text-lg">Submit Registration</button>
        </form>
      </div>
    </div>
  );
};

const ContentPageTemplate = ({ title, children, image }) => (
  <div className="bg-white text-left">
    <section className="bg-blue-900 text-white pt-20 pb-24 text-center">
      <div className="max-w-7xl mx-auto px-6 text-center"><h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-center">{title}</h1></div>
    </section>
    <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center text-left text-gray-900">
      <div className="text-left">{children}</div>
      {image && <img src={image} className="rounded-xl shadow-lg w-full h-[400px] object-cover" alt={title} />}
    </section>
  </div>
);

const ProviderPage = ({ title, icon: IconComponent, desc, setCurrentPage }) => {
  const handleRequestInfo = () => {
    setCurrentPage('home');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-white text-left">
      <section className="bg-blue-900 text-white pt-20 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6 flex justify-center text-center"><div className="p-4 bg-white/10 rounded-full"><IconComponent size={48} className="text-blue-300" /></div></div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-center">{title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto text-center">{desc}</p>
        </div>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center text-left text-gray-900">
        <div className="text-left">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-left">Reliable & Short-Notice Staffing</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-left">Supplying highly vetted professionals at a very short notice to sustain quality patient care.</p>
          <button 
            onClick={handleRequestInfo}
            className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors"
          >
            Request Information
          </button>
        </div>
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" className="rounded-xl shadow-lg w-full h-[300px] object-cover" alt="Healthcare" />
      </section>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Shared Data Options
  const rightToWorkOptions = [
    "UK/EC National", "Ancestry Visa", "Bulgarian Blue Card", "Bulgarian Yellow Card", 
    "EEA Family Member", "HSMP", "Indefinite Leave to Remain", "Limited Leave to Remain", 
    "No UK visa", "Right of Abode", "Romanian Blue Card", "Romanian Yellow Card", 
    "Tier 1 Visa", "Tier 2 Visa", "Tier 4 Visa", "Tier 5 Visa"
  ];
  const experienceOptions = ["None", "0 - 6 months", "6 - 12 months", "1 - 2 years", "2 + years"];
  const availabilityOptions = ["Annual Leave", "Evenings and Weekends", "Evenings, Weekends and Annual Leave", "Full Time"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-left">
      <Navbar setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <About />
            <Providers setCurrentPage={setCurrentPage} />
            <CandidatesGrid setCurrentPage={setCurrentPage} />
            <Contact />
          </>
        )}
        {currentPage === 'doctors' && (
          <ContentPageTemplate 
            title="Doctors Opportunities" 
            image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
          >
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 text-left">Advancing Your Medical Career</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-left">At Chinnyglo Agency, we understand the dedication required to be a medical doctor. We work tirelessly to match your skills with the right opportunities.</p>
              <ul className="space-y-3 font-medium text-left">
                {["Excellent Pay Rates", "Flexible Hours", "Personal Consultant", "Appraisal Support"].map((t) => (
                  <li key={t} className="flex items-center space-x-3 text-gray-900 text-left"><CheckCircle2 className="text-green-500" size={20} /><span>{t}</span></li>
                ))}
              </ul>
            </div>
          </ContentPageTemplate>
        )}
        {currentPage === 'nurses' && (
          <ContentPageTemplate 
            title="Nursing & HCA Roles" 
            image="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800"
          >
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 text-left">Global Nursing Recruitment</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-left text-gray-900">We have over a decade of experience placing competent nurses in NHS and private health organisations in the UK. We help with visa applications and relocation options.</p>
              <button onClick={() => { setCurrentPage('nurse-reg'); window.scrollTo(0,0); }} className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors">Register Now</button>
            </div>
          </ContentPageTemplate>
        )}
        {currentPage === 'care-support' && (
          <ContentPageTemplate 
            title="Care & Support Workers" 
            image="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800"
          >
            <div className="text-left text-gray-900">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 text-left">Deliver Outstanding Care</h2>
              <p className="text-gray-600 leading-relaxed text-left">Join us for a fantastic career in delivering care services to vulnerable people. We offer good hourly pay shifts with excellent rates.</p>
              <button onClick={() => { setCurrentPage('hca-reg'); window.scrollTo(0,0); }} className="mt-8 bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors">Register Now</button>
            </div>
          </ContentPageTemplate>
        )}
        
        {/* Doctor Registration */}
        {currentPage === 'doctor-reg' && (
          <RegistrationForm 
            type="Doctor" 
            grades={[
              "Associate Specialist", "Clinical Assistant", "Consultant", "Core Training Year 1", 
              "Core Training Year 2", "Core Training Year 3", "Foundation Year 1", "Foundation Year 2", 
              "Junior House Officer", "Medical Officer", "RMO - NHS", "RMO - Private", 
              "Senior House Officer", "Specialist Registrar", "Specialist Training Year 1", 
              "Specialist Training Year 2", "Specialist Training Year 3", "Specialist Training Year 4", 
              "Specialist Training Year 5", "Specialist Training Year 6", "Specialist Training Year 7", "Staff Grade"
            ]} 
            statusLabel="GMC Status" 
            statusOptions={[
              "GMC Full Registration/Full Licence to practise", "GMC Full Registration/GP Licence to practise", 
              "GMC Full Registration/Specialist Licence to practise", "GMC/Full/Approved Practise Setting", 
              "GMC/Provisional", "No GMC Registration"
            ]} 
            availabilityOptions={availabilityOptions}
            rightToWorkOptions={rightToWorkOptions}
            experienceOptions={experienceOptions}
          />
        )}
        
        {/* Nurse Registration */}
        {currentPage === 'nurse-reg' && (
          <RegistrationForm 
            type="Nurse" 
            grades={["RGN (General)", "RMN (Mental Health)", "RNLD (Learning Disability)", "Midwife", "Theatre Nurse"]} 
            statusLabel="NMC Status" 
            statusOptions={["Registered (Active Pin)", "Pending", "Not Registered"]} 
            availabilityOptions={availabilityOptions}
            rightToWorkOptions={rightToWorkOptions}
            experienceOptions={experienceOptions}
          />
        )}

        {/* HCA Registration */}
        {currentPage === 'hca-reg' && (
          <RegistrationForm 
            type="Healthcare Assistant" 
            grades={["HCA Grade 1", "HCA Grade 2", "Senior Support Worker", "Residential Care Worker"]} 
            statusLabel="Right to Work" 
            statusOptions={rightToWorkOptions} 
            availabilityOptions={availabilityOptions}
            rightToWorkOptions={rightToWorkOptions}
            experienceOptions={experienceOptions}
          />
        )}

        {currentPage === 'nhs-hospital' && <ProviderPage title="NHS Hospitals" icon={Building2} desc="Maintaining high standards across UK NHS Trusts." setCurrentPage={setCurrentPage} />}
        {currentPage === 'private-hospitals' && <ProviderPage title="Private Hospitals" icon={Building} desc="Elite staff for private healthcare excellence." setCurrentPage={setCurrentPage} />}
        {currentPage === 'nursing-homes' && <ProviderPage title="Nursing Homes" icon={Users} desc="Staffing for residential nursing environments." setCurrentPage={setCurrentPage} />}
        {currentPage === 'care-homes' && <ProviderPage title="Care Homes" icon={Home} desc="Support for residential care communities." setCurrentPage={setCurrentPage} />}
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800 text-left">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12 items-start text-left">
          <div className="text-left">
            <img src={logo} alt="Chinnyglo Agency Logo" className="h-12 w-auto mb-6" />
            <p className="max-w-sm text-left">Highly compliant medical staffing agency serving the UK for over a decade.</p>
          </div>
          <div className="flex space-x-12 text-left">
            <div className="text-left">
              <h6 className="text-white font-bold mb-4 text-left">Quick Links</h6>
              <ul className="space-y-2 text-left">
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className="hover:text-white transition-colors text-left">Home</button></li>
                <li><button onClick={() => { setCurrentPage('doctors'); window.scrollTo(0,0); }} className="hover:text-white transition-colors text-left">Doctors</button></li>
                <li><button onClick={() => { setCurrentPage('nurses'); window.scrollTo(0,0); }} className="hover:text-white transition-colors text-left">Nurses / HCA</button></li>
              </ul>
            </div>
          </div>
          <div className="text-left">
            <h6 className="text-white font-bold mb-4 text-left">Policies</h6>
            <ul className="space-y-2 text-left">
              <li>
                <a 
                  href="https://drive.google.com/file/d/1R4cs4kDkvapLofdjDwz9OOoDYglrXMi8/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Data Protection Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://drive.google.com/file/d/1Wf0vZypbuvtsQS9vcrvJRFkxrMjH0toV/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Carbon Reduction Policy / CRP
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-xs">
          <p>© {new Date().getFullYear()} Chinnyglo Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}