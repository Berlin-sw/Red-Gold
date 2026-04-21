import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container mt-4">
        <div className="glass-panel p-5 text-center admin-hero">
          <div className="admin-badge mb-3">Administrator</div>
          <h1 className="display-4 fw-bold mb-2">
            Welcome, <span className="text-primary">{user?.name}</span>
          </h1>
          <div className="admin-divider mx-auto mb-4"></div>

          <div className="slogan-container mt-5">
            <h2 className="advanced-slogan">
              Saving <span className="highlight">Lives</span> Through Every <span className="highlight">Drop</span>
            </h2>
            <p className="text-muted mt-3 fs-5">
              Manage and monitor the blood bank operations with precision and care.
            </p>
          </div>

          <div className="row mt-5 g-4 justify-content-center">
            <div className="col-md-4">
              <div className="admin-info-card p-3 glass-panel">
                <i className="fa-solid fa-users-gear fs-3 mb-2 text-primary"></i>
                <h5>User Management</h5>
                <p className="small text-muted">Control and verify platform users</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="admin-info-card p-3 glass-panel">
                <i className="fa-solid fa-chart-line fs-3 mb-2 text-primary"></i>
                <h5>Platform Growth</h5>
                <p className="small text-muted">Track donations and hospital needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;