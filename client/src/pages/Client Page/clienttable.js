import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './clienttable.css';
import Pagination from '../../components/Pagination'; // Import the Pagination component

function ClientTable() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(1); // Total pages state

    useEffect(() => {
        const fetchClientData = async (page = 1) => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/clients?page=${page}&limit=5`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                // Log the response to debug
                console.log('Response Data:', response.data);

                if (response.status === 200) {  // Ensure the request was successful
                    const clients = response.data.data;
                    setData(clients);

                    // Ensure totalPages is set correctly
                    const total = response.data.totalPages || Math.ceil(response.data.totalItems / 5);
                    console.log('Total Pages:', total);
                    setTotalPages(total);

                    setLoading(false); // Set loading to false after data is fetched
                } else {
                    throw new Error(`Request failed with status code ${response.status}`);
                }
            } catch (error) {
                setError(`There was an error fetching the client data! ${error.response?.status === 404 ? 'Clients not found!' : error.message}`);
                setLoading(false); // Set loading to false even if there's an error
                console.error("Error fetching client data:", error.response || error.message);
            }
        };

        fetchClientData(currentPage); // Fetch data for the current page
    }, [currentPage]); // Add currentPage as a dependency to refetch when page changes

    const filteredData = data.filter(item =>
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase()) ||
        (item.caseDetails && item.caseDetails.description.toLowerCase().includes(search.toLowerCase()))
    );

    const handleDetailsClick = (clientId) => {
        // Handle the details button click, e.g., navigate to a client detail page or show a modal
        console.log('Viewing details for client ID:', clientId);
    };

    const handlePageChange = (page) => {
        console.log('Page Change:', page);
        setCurrentPage(page);
    };    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='clienttable-container-custom'>
            <div className='clienttable-content-custom'>
                <h1>Clientele Information</h1>
                <div className="clienttable-search-container-custom">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <table className="clienttable-table-custom">
                    <thead>
                        <tr>
                            <th>Case ID</th>
                            <th>Name</th>
                            <th>Contact No.</th>
                            <th>Case Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.caseDetails ? item.caseDetails.caseId : 'No Case ID'}</td>
                                    <td>{`${item.firstName} ${item.lastName}`}</td>
                                    <td>{item.contactNo}</td>
                                    <td title={item.caseDetails ? item.caseDetails.description : 'No Case Details'}>
                                        {item.caseDetails ? item.caseDetails.description : 'No Case Details'}
                                    </td>
                                    <td>
                                        <button
                                            className="clienttable-details-button-custom"
                                            onClick={() => handleDetailsClick(item.id)}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No clients found.</td>
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

export default ClientTable;
