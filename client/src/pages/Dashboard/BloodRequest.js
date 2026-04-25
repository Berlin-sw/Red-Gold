import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";
import { toast } from "react-hot-toast";

const BloodRequest = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [fulfilledData, setFulfilledData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);

  // Get hospital's blood needs
  const getNeeds = async () => {
    try {
      setLoading(true);
      const res1 = await API.get("/need/get-needs");
      if (res1.data?.success) {
        const myNeeds = res1.data.needs.filter((n) => n.hospital?._id === user?._id);
        setData(myNeeds);
      }
      const res2 = await API.get("/need/get-fulfilled-needs");
      if (res2.data?.success) {
        const myFulfilled = res2.data.needs.filter((n) => n.hospital?._id === user?._id);
        setFulfilledData(myFulfilled);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNeeds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!bloodGroup || quantity <= 0) {
        return toast.error("Please provide all fields");
      }
      const { data } = await API.post("/need/create-need", {
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        toast.success(data.message);
        getNeeds();
        setBloodGroup("");
        setQuantity(0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in creating blood request");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await API.delete(`/need/delete-need/${id}`);
      if (data?.success) {
        toast.success(data.message);
        getNeeds();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting blood request");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 bg-dark text-white">
              <h4 className="mb-4">Request Blood</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                  <select
                    className="form-select bg-secondary text-white border-0"
                    id="bloodGroup"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">Quantity (ml)</label>
                  <input
                    type="number"
                    className="form-control bg-secondary text-white border-0"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit Request</button>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <h4 className="mb-4 text-white">Your Pending Requests</h4>
            {loading ? (
              <div className="d-flex justify-content-center">
                <ProgressBar height="100" width="100" color="#4fa94d" />
              </div>
            ) : (
              <div className="table-responsive mb-5">
                <table className="table table-dark table-hover shadow-sm">
                  <thead>
                    <tr>
                      <th>Blood Group</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((record) => (
                        <tr key={record._id}>
                          <td>{record.bloodGroup}</td>
                          <td>{record.quantity} ml</td>
                          <td>
                            <span className="badge bg-warning text-dark">{record.status}</span>
                          </td>
                          <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this request?")) {
                                  handleDelete(record._id);
                                }
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No pending requests found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <h4 className="mb-4 text-white">Fulfilled Requests</h4>
            <div className="table-responsive">
                <table className="table table-dark table-hover shadow-sm">
                  <thead>
                    <tr>
                      <th>Blood Group</th>
                      <th>Quantity</th>
                      <th>Fulfilled By</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fulfilledData.length > 0 ? (
                      fulfilledData.map((record) => (
                        <tr key={record._id}>
                          <td>{record.bloodGroup}</td>
                          <td>{record.quantity} ml</td>
                          <td>
                            {record.donar ? `Donor (${record.donar.name || "Anonymous"})` : `Organisation (${record.organisation?.organisationName || "Direct"})`}
                          </td>
                          <td>{moment(record.updatedAt).format("DD/MM/YYYY hh:mm A")}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No fulfilled requests found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BloodRequest;
