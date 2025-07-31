import React, { useEffect, useState } from 'react';
import './AttendanceHistory.css';
import axios from 'axios';
import { Base_url } from '../service/Base_Url';


const renderStars = (rating) => {
  if (!rating) return null;
  const filledStars = parseInt(rating);
  const totalStars = 5;
  return (
    <div style={{ color: "#ffc107" }}>
      {Array.from({ length: totalStars }, (_, i) => (
        <span key={i}>{i < filledStars ? '★' : '☆'}</span>
      ))}
    </div>
  );
};

const statusColors = {
  Present: 'green',
  Late: 'orange',
  Absent: 'red',
};

const AttendanceHistory = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 8;

  useEffect(() => {

    const admin = localStorage.getItem("adminData")
    if (!admin) {
      window.location.href = "/admin"
    }
    getHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [history, searchTerm, statusFilter, dateFilter]);

  const getHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${Base_url}/attendlist`);
      console.log('Attendance data:', response.data);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching attendance history:', error);
      alert('Error fetching attendance data');
    } finally {
      setIsLoading(false);
    }
  };

  const filterHistory = () => {
    let filtered = history;

    // Filter by search term (employee name or email)
    if (searchTerm) {
      filtered = filtered.filter(record =>
        (record.userId?.FirstName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (record.userId?.LastName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (record.userId?.Email?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter(record => {
        let recordDateStr = record.date;

        // If it's in DD/MM/YYYY format, convert it to YYYY-MM-DD
        if (recordDateStr.includes('/')) {
          const [day, month, year] = recordDateStr.split('/');
          recordDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        return recordDateStr === dateFilter;
      });
    }




    setFilteredHistory(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const formatTime = (dateString) => {
    if (!dateString) return '- - -';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return '- - -';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '- - -';
    try {
      // If it's already in DD/MM/YYYY format, return as is
      if (dateString.includes('/')) {
        return dateString;
      }
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    } catch (error) {
      return dateString;
    }
  };

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = filteredHistory.slice(startIdx, startIdx + itemsPerPage);

  if (isLoading) {
    return <div className="container"><h2>Loading attendance data...</h2></div>;
  }

  return (
    <div className="container">
      <h2 className="title">
        <span className="title-bar" /> Comprehensive Attendance History
      </h2>

      {/* Filters */}
      <div className="filters" style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by employee name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">All Status</option>
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="Absent">Absent</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <button
          onClick={() => {
            setSearchTerm('');
            setStatusFilter('');
            setDateFilter('');
          }}
          style={{
            padding: '8px 15px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer'
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <strong>Total Records: {filteredHistory.length}</strong>
        {searchTerm && <span> | Filtered by: "{searchTerm}"</span>}
        {statusFilter && <span> | Status: {statusFilter}</span>}
      </div>

      {/* Attendance Cards */}
      <div className="cards">
        {currentData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>No attendance records found</h3>
            <p>Try adjusting your filters or check if attendance data exists.</p>
          </div>
        ) : (
          currentData.map((data, index) => (
            <div className="card border-" key={index} style={{ marginBottom: '15px' }}>
              <div className="card-header">
                <div>
                  <strong>{data.userId?.FirstName} {data.userId?.LastName}</strong>
                  <h6>Working Hours:{data.WorkingHours}</h6>


                  {/* <br /> */}
                  {/* <small style={{ color: '#666' }}>{formatTime(data.WorkingHours)}</small> */}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span>{formatDate(data.date)}</span>
                  <br />
                  <span
                    className="status-text"
                    style={{
                      color: statusColors[data.status] || '#000',
                      fontWeight: 'bold'
                    }}
                  >
                    {data.status}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <strong>Check In </strong>
                  <p>{formatTime(data.Checkin)}</p>
                </div>
                <div>
                  <strong>Check Out </strong>
                  <p>{formatTime(data.Checkout)}</p>
                </div><br />
                {data.Leavetype && (
                  <div>
                    <strong>Leave Type</strong>
                    <p>{data.Leavetype}</p>
                  </div>
                )}
                {data.Reason && (
                  <div>
                    <strong>Reason</strong>
                    <p>{data.Reason}</p>
                  </div>
                )}
              </div>
              <div className="card-body">
                 {data.Rating && (
                  <div>
                    <strong>Rating</strong>
                    {renderStars(data.Rating)}
                  </div>
                )}

                {data.Review && (
                  <div>
                    <strong>Review</strong>
                    <p>{data.Review}</p>
                  </div>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;