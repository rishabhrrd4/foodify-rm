import Testimonial from "./Testimonials";

const SuccessStories: React.FC = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      restaurant: "Spice Garden",
      image: "",
      quote:
        "Foodify helped us reach 3x more customers during the pandemic. The platform is easy to use and their support team is amazing.",
      growth: "200%",
    },
    {
      name: "Priya Sharma",
      restaurant: "Healthy Bites",
      image: "",
      quote:
        "We've been using Foodify for 2 years now. Our online orders have increased dramatically and the dashboard makes everything so simple.",
      growth: "150%",
    },
    {
      name: "Mohammed Ali",
      restaurant: "Biryani House",
      image: "",
      quote:
        "The best decision we made was partnering with Foodify. Our delivery business has grown beyond our expectations.",
      growth: "180%",
    },
  ];

  return (
    <section id="success-stories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Restaurant Success Stories
          </h2>
          <p className="text-lg text-gray-600">
            See how restaurants like yours are thriving with Foodify
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
