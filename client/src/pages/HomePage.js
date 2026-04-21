import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from 'moment'

const HomePage = () => {
  const [data,setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error,user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getBloodRecords= async()=>{
    try {
      const {data} = await API.get('/inventory/get-inventory');
      if(data?.success){
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getBloodRecords();
  },[])

  // Calculate summary stats
  const totalIn = data.filter(r => r.inventoryType === 'in').reduce((acc, curr) => acc + curr.quantity, 0);
  const totalOut = data.filter(r => r.inventoryType === 'out').reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAvailable = totalIn - totalOut;

  // Filter records based on search
  const filteredData = data.filter(record => 
    record.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {user?.role === 'admin' && navigate('/admin')}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <div className="d-flex w-100 h-100 align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <DNA visible={true} height="150" width="150" ariaLabel="dna-loading" wrapperClass="dna-wrapper" />
        </div>
      ) : (
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h2 className="text-white fw-bold mb-0">Dashboard Overview</h2>
            <button
              className="btn btn-primary-glass d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ width: 'auto' }}
            >
              <i className="fa-solid fa-plus me-2"></i>
              Add Record
            </button>
          </div>

          <div className="row mb-5">
            <div className="col-md-4 mb-3">
              <div className="glass-panel stat-card" style={{ borderLeftColor: '#2ed573' }}>
                <div className="stat-label">Total Blood In</div>
                <div className="stat-value text-success">{totalIn} <span className="fs-5 text-muted fw-normal">ml</span></div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="glass-panel stat-card" style={{ borderLeftColor: '#E63946' }}>
                <div className="stat-label">Total Blood Out</div>
                <div className="stat-value text-danger">{totalOut} <span className="fs-5 text-muted fw-normal">ml</span></div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="glass-panel stat-card" style={{ borderLeftColor: '#FFD700' }}>
                <div className="stat-label">Net Available</div>
                <div className="stat-value text-warning">{totalAvailable} <span className="fs-5 text-muted fw-normal">ml</span></div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-white m-0">Recent Inventory</h4>
              <div className="search-wrapper m-0" style={{ minWidth: '300px' }}>
                <i className="fa-solid fa-search search-icon"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search by blood group or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donor Email</th>
                    <th scope="col">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((record)=>(
                    <tr key={record._id}>
                      <td>
                        <span className="fw-bold" style={{ color: 'white' }}>{record.bloodGroup}</span>
                      </td>
                      <td>
                        <span className={record.inventoryType.toLowerCase() === 'in' ? 'badge-in' : 'badge-out'}>
                          {record.inventoryType.toUpperCase()}
                        </span>
                      </td>
                      <td>{record.quantity} ml</td>
                      <td className="text-muted">{record.email}</td>
                      <td className="text-muted">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">No records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Modal />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
