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
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleRegister = () => navigate("/manager/register");
  const handleLogin = () => navigate("/manager/login");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={scrollToTop}
          >
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">Foodify</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Benefits", "Success Stories", "FAQ", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    item === "Home"
                      ? scrollToTop()
                      : scrollToSection(item.toLowerCase().replace(" ", "-"))
                  }
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                >
                  {item}
                </button>
              )
            )}

            {/* Auth Buttons */}
            <div className="flex gap-3 ml-4">
              <button
                onClick={handleLogin}
                className="px-5 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Signup
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
            <div className="px-4 pt-4 pb-5 space-y-2">
              {["Home", "Benefits", "Success Stories", "FAQ", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      item === "Home"
                        ? scrollToTop()
                        : scrollToSection(item.toLowerCase().replace(" ", "-"))
                    }
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    {item}
                  </button>
                )
              )}

              <div className="pt-3 space-y-2 border-t border-gray-200">
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Register Your Restaurant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
