import React from 'react';

export default function FraudSummary({ summary }) {
  return (
    <div className="fraud-summary">
      <h3>Fraud Summary</h3>
      <p>Total cases detected: {summary.totalCases}</p>
      <p>Suspicious claims: {summary.suspiciousPercentage}%</p>
      <div>
        <h4>Fraud Types</h4>
        <ul>
          {Object.entries(summary.fraudTypesCount).map(([type, count]) => (
            <li key={type}>{type}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
