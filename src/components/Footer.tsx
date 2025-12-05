import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Grid3X3,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";

const services = [
  { label: "Dashboard Home", path: "/dashboard" },
  { label: "Transparency Hub", path: "/transparency-hub" },
  { label: "CRM Snapshot", path: "/crm-snapshot" },
  { label: "Meet Your Grid", path: "/meet-your-grid" },
  { label: "Client Portal", path: "/client-portal" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Problem Resolved", href: "/process-flow" },
  { label: "Brand Story", href: "/about" },
  { label: "Our Team", href: "/meet-your-grid" },
  { label: "Careers", href: "/contact" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

const support = [
  { label: "Help Center", href: "/knowledge-base" },
  { label: "Contact Us", href: "/contact" },
];

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToProtected = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login", { state: { from: path } });
    }
  };

  return (
    <footer className="relative bg-black text-white border-t border-[#5A00B0]/30 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="grid-pattern w-full h-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="/home-logo.png"
                alt="Purple Grid Marketing logo"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Revolutionizing business operations with our Human as a Service
              model. AI-augmented professionals delivering exceptional results
              at cost-effective rates.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/purple-grid-marketing/' },
                { Icon: Facebook, href: 'https://www.facebook.com/people/Purple-Grid-Marketing/61583351070628/' },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1B0032] p-2 rounded-lg hover:bg-[#5A00B0] transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <button
                    type="button"
                    onClick={() => goToProtected(service.path)}
                    className="text-left text-gray-300 hover:text-purple-300 transition-colors"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => navigate(item.href)}
                    className="text-left text-gray-300 hover:text-purple-300 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact & Support</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-purple-400 flex-shrink-0" />
                <a
                  href="mailto:info@purplegridmarketing.com"
                  className="text-gray-300 hover:text-purple-200 transition-colors"
                >
                  info@purplegridmarketing.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-purple-400 flex-shrink-0" />
                <a
                  href="tel:+447304322465"
                  className="text-gray-300 hover:text-purple-200 transition-colors"
                >
                  +44 (7304) 322-465
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-purple-400 flex-shrink-0" />
                <a
                  href="tel:+16468143137"
                  className="text-gray-300 hover:text-purple-200 transition-colors"
                >
                  +1 (646) 814-3137
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 leading-tight">
                  Unit A and B Farringdon Avenue Business Center, Romford East
                  London RM3 8EN
                </span>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-300">
                {support.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => navigate(item.href)}
                      className="text-left hover:text-purple-300 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#5A00B0]/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Purple Grid Marketing. All
              rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                type="button"
                onClick={() => navigate('/privacy')}
                className="text-gray-400 hover:text-purple-300 text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => navigate('/terms')}
                className="text-gray-400 hover:text-purple-300 text-sm transition-colors"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => navigate('/cookie-policy')}
                className="text-gray-400 hover:text-purple-300 text-sm transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
