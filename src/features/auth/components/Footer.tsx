import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-900">ZomatoClone</h4>
          <p className="text-sm">Delivering food from the best restaurants near you.</p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 text-gray-900">Company</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-red-600">About Us</a></li>
            <li><a href="#" className="hover:text-red-600">Careers</a></li>
            <li><a href="#" className="hover:text-red-600">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 text-gray-900">Support</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-red-600">Help Center</a></li>
            <li><a href="#" className="hover:text-red-600">Contact Us</a></li>
            <li><a href="#" className="hover:text-red-600">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 text-gray-900">Follow Us</h4>
          <div className="flex space-x-4 text-xl text-red-600">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 py-4 border-t">
        &copy; {new Date().getFullYear()} ZomatoClone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
