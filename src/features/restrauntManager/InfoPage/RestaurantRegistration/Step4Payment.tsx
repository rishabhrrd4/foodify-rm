import React from "react";
import type { FormData } from "../../../../types";

interface Step4PaymentProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const Step4Payment: React.FC<Step4PaymentProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Payment & Contract Details
        </h3>
        <p className="text-gray-600 mb-6">
          Provide your bank details for receiving payments
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Bank Account Number*"
            value={formData.bankAccount}
            onChange={(e) => onInputChange("bankAccount", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="IFSC Code*"
            value={formData.ifscCode}
            onChange={(e) => onInputChange("ifscCode", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Account Holder Name*"
            value={formData.accountHolder}
            onChange={(e) => onInputChange("accountHolder", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="GST Number (optional)"
            value={formData.gstNumber}
            onChange={(e) => onInputChange("gstNumber", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Terms & Conditions</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <label className="flex items-start space-x-2">
              <input type="checkbox" className="mt-1" required />
              <span>
                I agree to the platform's terms and conditions for
                restaurant partners
              </span>
            </label>
            <label className="flex items-start space-x-2">
              <input type="checkbox" className="mt-1" required />
              <span>
                I confirm that all provided information is accurate and
                up-to-date
              </span>
            </label>
            <label className="flex items-start space-x-2">
              <input type="checkbox" className="mt-1" required />
              <span>
                I understand the commission structure and payment terms
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Payment;