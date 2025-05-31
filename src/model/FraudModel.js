// Dummy data for fraud summary and alerts (replace with real API calls)
export async function fetchFraudSummary() {
  return {
    totalCases: 45,
    suspiciousPercentage: 12.5,
    fraudTypesCount: { "Identity Theft": 15, "Fake Claims": 20, "Duplicate Claims": 10 },
  };
}

export async function fetchAlertList() {
  return [
    { id: 'C1234', person: 'John Doe', fraudType: 'Identity Theft', riskScore: 92 },
    { id: 'C5678', person: 'Jane Smith', fraudType: 'Fake Claim', riskScore: 85 },
    // more alerts
  ];
}
