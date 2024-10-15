// app/result/page.js
"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import results from "../data/result";
import Papa from "papaparse";

export default function ResultPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [exporting, setExporting] = useState(false); // Exporting state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error } = await supabase
          .from("off-the-record")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setData(fetchedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch survey results.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize the number of questions based on data
  const numberOfQuestions = useMemo(() => {
    if (data.length === 0) return 10; // Default to 10 if no data
    const firstEntry = data[0];
    try {
      const answers = JSON.parse(firstEntry.answers);
      return Math.max(...answers.map((ans) => ans.question));
    } catch {
      return 10;
    }
  }, [data]);

  const getTraitTitle = (slug) => {
    const trait = Object.values(results).find((result) => result.slug === slug);
    return trait ? trait.title : "Unknown";
  };

  const exportToCSV = async () => {
    if (data.length === 0) {
      alert("No data available to export.");
      return;
    }

    setExporting(true);

    try {
      const headers = ["Created At", "Trait"];
      for (let i = 1; i <= numberOfQuestions; i++) {
        headers.push(`Q${i}`);
      }

      const rows = data.map((entry) => {
        const answers = JSON.parse(entry.answers);
        const answerMap = {};
        answers.forEach((answer) => {
          answerMap[`Q${answer.question}`] = answer.choice;
        });

        const row = {
          "Created At": new Date(entry.created_at).toLocaleString(),
          Trait: getTraitTitle(entry.trait),
        };

        for (let i = 1; i <= numberOfQuestions; i++) {
          row[`Q${i}`] = answerMap[`Q${i}`] || "N/A";
        }

        return row;
      });

      const csv = Papa.unparse({
        fields: headers,
        data: rows.map((row) => headers.map((header) => row[header])),
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const currentDate = new Date().toISOString().slice(0, 10);
      const filename = `survey_results_${currentDate}.csv`;

      if (navigator.msSaveBlob) {
        // For IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement("a");
        if (link.download !== undefined) {
          // Feature detection
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (err) {
      console.error("Error exporting CSV:", err);
      alert("Failed to export CSV.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading survey results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Survey Results</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportToCSV}
          className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none ${
            exporting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={exporting}
        >
          {exporting ? "Exporting..." : "Export to CSV"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className={thClass}>Created At</th>
              <th className={thClass}>Trait</th>
              {Array.from({ length: numberOfQuestions }, (_, i) => (
                <th key={i} className={thClass}>{`Q${i + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => {
              let answers = [];
              try {
                answers = JSON.parse(entry.answers);
              } catch (err) {
                console.error("Error parsing answers JSON:", err);
              }

              const answerMap = {};
              answers.forEach((answer) => {
                answerMap[`Q${answer.question}`] = answer.choice;
              });

              return (
                <tr key={entry.id} className="hover:bg-gray-100">
                  <td className={tdClass}>
                    {new Date(entry.created_at).toLocaleString()}
                  </td>
                  <td className={tdClass}>{getTraitTitle(entry.trait)}</td>
                  {Array.from({ length: numberOfQuestions }, (_, i) => (
                    <td key={i} className={tdClass}>
                      {answerMap[`Q${i + 1}`] || "N/A"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No survey results found.
        </p>
      )}
    </div>
  );
}

const thClass =
  "border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-100";

const tdClass = "border border-gray-200 px-4 py-2 text-sm text-gray-700";
