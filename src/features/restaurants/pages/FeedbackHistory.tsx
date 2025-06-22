import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

interface Complaint {
  _id: string; // complaintId
  orderId: string;
  description: string;
  status: "pending" | "resolved";
}

const FeedbackHistory: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:3005/complaints/manager");
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // ✅ Mark as resolved
  const handleResolve = async (complaintId: string) => {
    try {
      await axios.patch(
        `http://localhost:3005/complaints/status/${complaintId}`,
        { status: "resolved" }
      );
      toast.success("Complaint marked as resolved.");

      // update UI
      setComplaints((prev) =>
        prev.map((comp) =>
          comp._id === complaintId ? { ...comp, status: "resolved" } : comp
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster />
      <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
        Manager Complaint Dashboard
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading complaints...</div>
      ) : complaints.length === 0 ? (
        <div className="text-center text-gray-500">No complaints found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 space-y-2"
            >
              <div className="text-sm text-gray-500 font-semibold">
                🆔 Complaint ID:{" "}
                <span className="text-gray-700">{complaint._id}</span>
              </div>

              <div className="text-sm text-gray-500 font-medium">
                📦 Order ID:{" "}
                <span className="text-gray-700">{complaint.orderId}</span>
              </div>

              <div className="text-gray-600 text-sm">
                📝 {complaint.description}
              </div>

              <div className="flex justify-between items-center mt-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    complaint.status === "resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {complaint.status.toUpperCase()}
                </span>

                {complaint.status === "pending" && (
                  <button
                    onClick={() => handleResolve(complaint._id)}
                    className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackHistory;
