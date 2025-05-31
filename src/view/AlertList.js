import React from 'react';

export default function AlertList({ alerts, onViewDetails }) {
  return (
    <div className="alert-list">
      <h3>Alert List</h3>
      <table>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Person</th>
            <th>Fraud Type</th>
            <th>Risk Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id}>
              <td>{alert.id}</td>
              <td>{alert.person}</td>
              <td>{alert.fraudType}</td>
              <td>{alert.riskScore}</td>
              <td><button onClick={() => onViewDetails(alert.id)}>View Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
