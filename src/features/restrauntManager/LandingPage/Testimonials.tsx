interface TestimonialProps {
  name: string;
  restaurant: string;
  image: string;
  quote: string;
  growth: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  restaurant,
  quote,
  growth,
}) => (
  <div className="bg-white rounded-xl p-8 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="ml-4">
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-gray-600">{restaurant}</div>
      </div>
    </div>
    <p className="text-gray-700 mb-6 italic">"{quote}"</p>
    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block font-medium">
      {growth} revenue growth
    </div>
  </div>
);

export default Testimonial;
