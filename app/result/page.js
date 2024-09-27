// app/result/page.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function ResultPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("offtherecord-survey")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Survey Results</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={thStyle}>Created At</th>
            <th style={thStyle}>Trait</th>
            {Array.from({ length: 10 }, (_, i) => (
              <th key={i} style={thStyle}>{`Q${i + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => {
            const answers = JSON.parse(entry.answers);
            const answerMap = {};
            answers.forEach((answer) => {
              answerMap[`Q${answer.question}`] = answer.choice;
            });

            return (
              <tr key={entry.id}>
                <td style={tdStyle}>
                  {new Date(entry.created_at).toLocaleString()}
                </td>
                <td style={tdStyle}>{entry.trait}</td>
                {Array.from({ length: 10 }, (_, i) => (
                  <td key={i} style={tdStyle}>
                    {answerMap[`Q${i}`] || "N/A"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
  backgroundColor: "#f2f2f2",
};

const tdStyle = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
};
