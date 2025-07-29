import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  PawPrint,
} from "lucide-react";
import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#CCC2F2] to-white dark:bg-gradient-to-t dark:text-white dark:from-[#121212] dark:to-[#1F1A33] pt-12 pb-8 px-6 md:px-20 ">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
        {/* Logo & Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Logo/>
          </div>
          <p className="text-lg leading-relaxed font-bold ">
            Connecting hearts with paws. Adopt, love, and give pets a forever
            home through our caring platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/pets" className="hover:text-primary">Browse Pets</a></li>
            <li><a href="/about" className="hover:text-primary">About Us</a></li>
            <li><a href="/contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-primary">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +880 123 456 7890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> hello@petlink.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-primary">Stay Updated</h4>
          <p className="text-sm mb-3">Subscribe for latest pet adoption news.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-300 dark:border-gray-700"></div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-800 dark:text-gray-400 gap-4">
        <p>&copy; {new Date().getFullYear()} PetLink. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-primary">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-primary">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
