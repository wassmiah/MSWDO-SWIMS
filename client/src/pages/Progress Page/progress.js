import React, { useState, useEffect } from 'react';
import './progress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../../components/Pagination';

function Progress() {
    const [caseData, setCaseData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const caseCategory = params.get('caseCategory')?.trim() || ''; // Trimming here directly

        if (caseCategory) {
            setCategoryFilter(caseCategory); // Ensure trimming
        }
        setCaseData([]); // Clear existing case data
        setCurrentPage(1); // Reset to the first page when a new category is selected
        fetchCases(1, statusFilter, searchQuery, caseCategory); // Fetch cases immediately on category change
    }, [location.search]); // Listen to location changes (i.e., when the category changes)

    useEffect(() => {
        fetchCases(currentPage, statusFilter, searchQuery, categoryFilter);
    }, [currentPage, statusFilter, searchQuery, categoryFilter]); 

    const fetchCases = (page, status = '', query = '', caseCategory = '') => {
        let url = `http://localhost:5000/api/v1/cases?page=${page}&limit=5`;
        if (status) {
            url += `&status=${status}`;
        }
        if (query) {
            url += `&search=${query}`;
        }
        if (caseCategory) {
            url += `&caseCategory=${encodeURIComponent(caseCategory)}`; // Only add this if caseCategory is set
        }

        console.log("Fetching cases with URL:", url); // Debugging log

        const token = localStorage.getItem('token');

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched cases:', data);
            if (data.success) {
                setCaseData(data.cases || []);
                setTotalPages(data.totalPages || 1);
            } else {
                console.error('Failed to fetch cases:', data.message);
                setCaseData([]); // Set empty array if fetching cases fails
            }
        })
        .catch(error => {
            console.error('Error fetching cases:', error);
            setCaseData([]); // Set empty array if there is an error
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const navigateToAddCase = () => {
        navigate('/add');
    };

    return (
        <div className='progresswhole'>
            <div className="case-reports-container">
                <header className="case-reports-header">
                    <h1>Case Reports</h1>
                </header>

                <div className="case-reports-controls">
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="search-input" 
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <FaSearch className="search-icon" />
                    </div>

                    <select className="filter-dropdown">
                        <option>Case ID</option>
                    </select>

                    <select className="filter-dropdown" onChange={handleStatusFilterChange} value={statusFilter}>
                        <option value="">Filter by Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Completed">Completed</option>
                    </select>
                    
                    <button className="add-case-btn" onClick={navigateToAddCase}>Add Cases</button>
                    <button className="import-btn">Import</button>
                </div>

                <table className="case-reports-table">
                    <thead>
                        <tr>
                            <th>Case No</th>
                            <th>Case Description</th>
                            <th>Priority</th>
                            <th>Case Status</th>
                            <th>Last Activity</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {caseData.length > 0 ? (
                            caseData.map((caseItem) => (
                                <tr key={caseItem._id}>
                                    <td>{caseItem.caseNumber}</td>
                                    <td>{caseItem.description}</td>
                                    <td>{caseItem.priority}</td>
                                    <td className={`status ${caseItem.status.toLowerCase().replace(' ', '-')}`}>{caseItem.status}</td>
                                    <td>{new Date(caseItem.date).toLocaleDateString()}</td>
                                    <td><button className="details-btn">Details</button></td>
                                    <td><button className="print-btn">Print</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No cases found for the selected category.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}

export default Progress;
