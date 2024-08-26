import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 5) * 5;
        return new Array(5).fill().map((_, idx) => start + idx + 1).filter(num => num <= totalPages);
    };

    return (
        <div className="pagination">
            <button
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {getPaginationGroup().map((item, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(item)}
                    className={`pagination-item ${currentPage === item ? 'active' : null}`}
                >
                    {item}
                </button>
            ))}

            <button
                className={`next ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
