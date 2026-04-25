import React, { useEffect, useState } from "react";
import API from "../../../services/API";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const NeedAlert = () => {
  const [needs, setNeeds] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getNeeds = async () => {
    try {
      const { data } = await API.get("/need/get-needs");
      if (data?.success) {
        setNeeds(data.needs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.role === "organisation" || user?.role === "donar") {
      getNeeds();
    }
  }, [user]);

  const handleFulfill = async (needId) => {
    try {
      const { data } = await API.post("/need/fulfill-need", { needId });
      if (data?.success) {
        toast.success("Blood need fulfilled successfully");
        getNeeds();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error in fulfilling blood need");
    }
  };

  if (needs.length === 0) return null;

  return (
    <div className="container mt-3">
      {needs.map((need) => (
        <div key={need._id} className="alert alert-danger d-flex justify-content-between align-items-center shadow-sm" role="alert">
          <div>
            <i className="fa-solid fa-triangle-exclamation me-2"></i>
            <strong>Urgent Need:</strong> {need.bloodGroup} blood required ({need.quantity}ml) by <strong>{need.hospital?.hospitalName}</strong>
          </div>
          {(user?.role === "organisation" || user?.role === "donar") && (
            <button className="btn btn-outline-danger btn-sm" onClick={() => handleFulfill(need._id)}>
              Fulfill Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NeedAlert;
