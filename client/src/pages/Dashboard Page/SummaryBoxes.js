import React from 'react';
import './SummaryBoxes.css';

const SummaryBoxes = ({ caseData = [] }) => {
    const totalCases = caseData.length;
    const activeCases = caseData.filter(caseItem => caseItem.status === 'Active').length;
    const completedCases = caseData.filter(caseItem => caseItem.status === 'Completed').length;

    return (
        <div className="summary-boxes">
            <div className="summary-box">
                <div className="summary-box-content">
                    <p>Total Cases</p>
                    <h2>{totalCases}</h2>
                </div>
            </div>
            <div className="summary-box">
                <div className="summary-box-content">
                    <p>Active Cases</p>
                    <h2>{activeCases}</h2>
                </div>
            </div>
            <div className="summary-box">
                <div className="summary-box-content">
                    <p>Completed Cases</p>
                    <h2>{completedCases}</h2>
                </div>
            </div>
        </div>
    );
};

export default SummaryBoxes;
