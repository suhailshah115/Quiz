import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";

const UserTrackingMtf = () => {
  const [Mtf, setMtf] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMtf = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getScore2");
        setMcqs(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getMtf();
  }, []);

  // Define colors based on score
  const getColor = (score) => {
    if (score < 8) return "#FF4C4C"; // Red - Needs Improvement
    if (score >= 8 && score < 10) return "#FFD700"; // Yellow - Could Do Better
    return "#32CD32"; // Green - Impressive
  };

  // Rank students based on score and prepare cumulative ranking data
  const rankedData = [...Mtf].sort((a, b) => b.score2 - a.score2).map((item, index) => ({
    studentName: item.studentName2,
    rank: index + 1,
    score: item.score2,
  }));

  return (
    <div className="bg-slate-300 min-h-screen p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen text-black">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="w-full">
          {/* Individual Performance Bar Chart */}
          <h2 className="text-xl font-bold text-center mb-4">Individual Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Mtf} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="studentName2" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score2" fill="#8884d8">
                {mcqs.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.score2)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Cumulative Ranking Line Chart */}
          <h2 className="text-xl font-bold text-center mt-8 mb-4">Class Ranking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rankedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="studentName" />
              <YAxis reversed />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rank" stroke="#007bff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

          {/* Table */}
          <div className="overflow-x-auto w-full mt-6">
            <table className="table-auto mx-auto w-full border-collapse border border-gray-200">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">#</th>
                  <th className="border border-gray-200 px-4 py-2">Name</th>
                  <th className="border border-gray-200 px-4 py-2">Question Types</th>
                  <th className="border border-gray-200 px-4 py-2">Total Score</th>
                  <th className="border border-gray-200 px-4 py-2">Total Attempts</th>
                  <th className="border border-gray-200 px-4 py-2">Total Time</th>
                  <th className="border border-gray-200 px-4 py-2">Date</th>
                  <th className="border border-gray-200 px-4 py-2">Performance</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {mcqs.length > 0 ? (
                  mcqs.map((item, index) => {
                    const performanceText =
                      item.score1 < 8 ? "Needs Improvement" :
                      item.score1 >= 8 && item.score1 < 10 ? "Could Do Better" : "Impressive";

                    return (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                        <th className="border border-gray-200 px-4 py-2 text-left font-bold">{index + 1}</th>
                        <td className="border border-gray-200 px-4 py-2">{item.studentName2}</td>
                        <td className="border border-gray-200 px-4 py-2">{item.questionTypes2}</td>
                        <td className="border border-gray-200 px-4 py-2 font-bold">{item.score2}</td>
                        <td className="border border-gray-200 px-4 py-2">{item.totalAttempts2}</td>
                        <td className="border border-gray-200 px-4 py-2">{item.time2}</td>
                        <td className="border border-gray-200 px-4 py-2">{new Date(item.timestamp).toLocaleDateString()}</td>
                        <td className="border border-gray-200 px-4 py-2" style={{ color: getColor(item.score2) }}>
                          {performanceText}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center p-4">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTrackingMtf;
