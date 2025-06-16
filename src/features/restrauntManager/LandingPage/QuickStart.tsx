import { CheckCircle, Play } from "lucide-react";
import { useNavigate } from "react-router";

const QuickStart: React.FC = () => {
  const requirements = [
    { title: "Business License", completed: true },
    { title: "Menu & Food Images", completed: true },
    { title: "Bank Account Details", completed: true },
    { title: "Contact Information", completed: true },
  ];

  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/manager/register");
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get Started - It only takes 10 minutes
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Keep these documents and details ready for a smooth sign-up
              process
            </p>

            <div className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{req.title}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleRegister}
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Apply Now
            </button>
          </div>

          <div className="relative">
            <div className="bg-gray-900 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-medium">
                  How to onboard your restaurant
                </div>
                <Play className="h-12 w-12 text-white bg-orange-500 rounded-full p-3 cursor-pointer hover:bg-orange-600 transition-colors" />
              </div>
              <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="h-16 w-16 mx-auto mb-2 opacity-80" />
                  <div className="text-sm">Watch Tutorial Video</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStart;
