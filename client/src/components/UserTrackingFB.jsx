import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";

const UserTrackingFB = () => {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMcQs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getScore");
        setMcqs(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getMcQs();
  }, []);

  const getColor = (score) => {
    if (score < 8) return "#FF4C4C";
    if (score >= 8 && score < 10) return "#FFD700";
    return "#32CD32";
  };

  let cumulativeTotal = 0;
  const cumulativeData = mcqs.map((item, index) => {
    cumulativeTotal += item.score;
    return { name: `Attempt ${index + 1}`, cumulativeScore: cumulativeTotal };
  });

  return (
    <div className="bg-slate-300 min-h-screen p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen text-black">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="text-xl font-bold text-center mb-4">Individual Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mcqs} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="studentName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8">
                {mcqs.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <h2 className="text-xl font-bold text-center mt-8 mb-4">Cumulative Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cumulativeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cumulativeScore" stroke="#007bff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

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
                      item.score < 8 ? "Needs Improvement" :
                      item.score >= 8 && item.score < 10 ? "Could Do Better" : "Impressive";

                    return (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                        <th className="border border-gray-200 px-4 py-2 text-left font-bold">{index + 1}</th>
                        <td className="border border-gray-200 px-4 py-2">{item.studentName}</td>
                        <td className="border border-gray-200 px-4 py-2">{item.questionTypes}</td>
                        <td className="border border-gray-200 px-4 py-2 font-bold">{item.score}</td>
                        <td className="border border-gray-200 px-4 py-2">{item.totalAttempts}</td>
                        <td className="border border-gray-200 px-4 py-2">{item.time}</td>
                        <td className="border border-gray-200 px-4 py-2">{new Date(item.timestamp).toLocaleDateString()}</td>
                        <td className="border border-gray-200 px-4 py-2" style={{ color: getColor(item.score) }}>
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

export default UserTrackingFB;
