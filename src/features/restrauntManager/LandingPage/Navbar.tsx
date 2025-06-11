import { ChefHat, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMobileMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/restaurant-manager/info");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={scrollToTop}
          >
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">Foodify</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={scrollToTop}
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("success-stories")}
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Success Stories
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={handleRegister}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Register Your Restaurant
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={scrollToTop}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("success-stories")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
              >
                Success Stories
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
              >
                Contact
              </button>
              <button
                className="w-full mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                onClick={handleRegister}
              >
                Register Your Restaurant
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;