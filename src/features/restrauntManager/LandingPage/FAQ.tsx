import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What documents do I need to get started?",
      answer:
        "You'll need your business license, FSSAI license (if applicable), menu with images, bank account details, and basic contact information.",
    },
    {
      question: "How long does it take to go live after registration?",
      answer:
        "Once you submit all required documents, it typically takes 24-48 hours for verification and approval to go live on our platform.",
    },
    {
      question: "What commission does Foodify charge?",
      answer:
        "Our commission structure is competitive and varies by location and volume. New partners get 0% commission for the first month!",
    },
    {
      question: "How do I get support if I need help?",
      answer:
        "We provide 24/7 support through phone, email, and live chat. You'll also have a dedicated account manager to help you succeed.",
    },
    {
      question: "How and when do I receive payments?",
      answer:
        "Payments are processed weekly and deposited directly into your registered bank account. You can track all transactions in your dashboard.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
