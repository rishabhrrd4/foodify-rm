import { Clock, TrendingUp, Users } from "lucide-react";

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Users className="h-12 w-12" />,
      title: "Attract New Customers",
      description:
        "Reach millions of hungry customers actively searching for food delivery options in your area.",
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Boost Your Revenue",
      description:
        "Increase your sales with our powerful analytics, promotional tools, and customer insights.",
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Streamline Operations",
      description:
        "Manage orders, track deliveries, and handle customer service all from one simple dashboard.",
    },
  ];

  return (
    <section id="benefits" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why should you partner with Foodify?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful restaurants that have transformed their
            business with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-orange-500 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
