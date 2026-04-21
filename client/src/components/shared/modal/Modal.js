import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);
  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content glass-panel" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="modal-header border-bottom-0 pb-0">
              <h1 className="modal-title fs-4 fw-bold" id="staticBackdropLabel" style={{ color: 'white' }}>
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body py-4">
              <div className="d-flex mb-4 align-items-center">
                <span className="text-muted fw-bold small me-3" style={{ letterSpacing: '0.5px' }}>RECORD TYPE:</span>
                <div className="form-check custom-radio me-3">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                    id="inRadioBtn"
                  />
                  <label htmlFor="inRadioBtn" className="form-check-label text-white">
                    IN <span className="badge bg-success ms-1">Donate</span>
                  </label>
                </div>
                <div className="form-check custom-radio">
                  <input
                    type="radio"
                    name="inRadio"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                    id="outRadioBtn"
                  />
                  <label htmlFor="outRadioBtn" className="form-check-label text-white">
                    OUT <span className="badge bg-danger ms-1">Request</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="form-label text-muted small fw-bold mb-1" style={{ letterSpacing: '0.5px' }}>BLOOD GROUP</label>
                <select
                  className="form-select form-control-glass"
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option defaultValue={"Open this select menu"}>
                    Select Blood Group
                  </option>
                  <option value={"O+"}>O+</option>
                  <option value={"O-"}>O-</option>
                  <option value={"AB+"}>AB+</option>
                  <option value={"AB-"}>AB-</option>
                  <option value={"A+"}>A+</option>
                  <option value={"A-"}>A-</option>
                  <option value={"B+"}>B+</option>
                  <option value={"B-"}>B-</option>
                </select>
              </div>

              <InputType
                labelText={"Donor / Hospital Email"}
                labelForm={"donarEmail"}
                inputType={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputType
                labelText={"Quantity (ML)"}
                labelForm={"quantity"}
                inputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-footer border-top-0 pt-0">
              <button
                type="button"
                className="btn btn-outline-light rounded-pill px-4"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary-glass rounded-pill px-4"
                style={{ width: 'auto' }}
                onClick={handleModalSubmit}
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;