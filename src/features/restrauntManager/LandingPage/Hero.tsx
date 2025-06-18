import { CheckCircle, Star, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/manager/register");
  };
  const handleLogin = () => {
    navigate("/manager/login");
  };

  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-red-50 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              0% commission for first month!
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Partner with <span className="text-orange-500">Foodify</span> and
              grow your business
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of restaurants already delivering with us. Reach
              new customers, increase orders, and grow your revenue with our
              powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleLogin}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 font-medium text-lg shadow-lg"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 font-medium text-lg shadow-lg"
              >
                Signup
              </button>
              {/* <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors font-medium text-lg">
                Learn More
              </button> */}
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Quick 10-minute setup
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                24/7 support
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:rotate-3 transition-transform duration-500">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-100 rounded-lg p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">150%</div>
                  <div className="text-sm text-gray-600">Revenue Growth</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">5K+</div>
                  <div className="text-sm text-gray-600">New Customers</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Join 10,000+ Restaurants
                </div>
                <div className="text-gray-600">
                  Already growing with Foodify
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
