import React from "react";
import "./ReportsLayout.css";

const reportsData = [
  { id: 1, doctorName: "Dr. John Doe", speciality: "Cardiology" },
  { id: 2, doctorName: "Dr. Jane Smith", speciality: "Dermatology" },
];

// Because the file is in /public, you can just refer to it by path:
const REPORT_URL = "/patient_report.pdf";

const ReportsLayout = () => {
  const handleViewReport = (e) => {
    e.preventDefault();
    window.open(REPORT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <a
                  href={REPORT_URL}
                  onClick={handleViewReport}
                  className="report-btn"
                >
                  View
                  <br />
                  Report
                </a>
              </td>
              <td>
                <a href={REPORT_URL} download className="report-btn">
                  Download
                  <br />
                  Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
