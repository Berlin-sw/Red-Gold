import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Layout.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="sidebar p-3">
        <div className="menu mt-4">
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item d-flex align-items-center p-3 ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-cubes me-3 fs-5"></i>
                <Link to="/" className="text-decoration-none text-inherit fw-medium">Inventory</Link>
              </div>
              <div
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical me-3 fs-5"></i>
                <Link to="/donar" className="text-decoration-none text-inherit fw-medium">Donors</Link>
              </div>
              <div
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-truck-medical me-3 fs-5"></i>
                <Link to="/hospital" className="text-decoration-none text-inherit fw-medium">Hospitals</Link>
              </div>
            </>
          )}
          
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical me-3 fs-5"></i>
                <Link to="/donar-list" className="text-decoration-none text-inherit fw-medium">Donor List</Link>
              </div>
              <div
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-truck-medical me-3 fs-5"></i>
                <Link to="/hospital-list" className="text-decoration-none text-inherit fw-medium">Hospital List</Link>
              </div>
              <div
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital me-3 fs-5"></i>
                <Link to="/org-list" className="text-decoration-none text-inherit fw-medium">Organisation List</Link>
              </div>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <>
              <div
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/organisation" && "active"
                }`}
              >
                <i className="fa-solid fa-building-ngo me-3 fs-5"></i>
                <Link to="/organisation" className="text-decoration-none text-inherit fw-medium">Organisations</Link>
              </div>
            </>
          )}
          {user?.role === "hospital" && (
            <>
              <div
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/consumer" && "active"
                }`}
              >
                <i className="fa-solid fa-users-between-lines me-3 fs-5"></i>
                <Link to="/consumer" className="text-decoration-none text-inherit fw-medium">Consumer</Link>
              </div>
              <div
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/blood-request" && "active"
                }`}
              >
                <i className="fa-solid fa-notes-medical me-3 fs-5"></i>
                <Link to="/blood-request" className="text-decoration-none text-inherit fw-medium">Blood Request</Link>
              </div>
            </>
          )}
          {user?.role === "donar" && (
            <div
              className={`menu-item d-flex align-items-center p-3 ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-solid fa-book-medical me-3 fs-5"></i>
              <Link to="/donation" className="text-decoration-none text-inherit fw-medium">Donations Log</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
