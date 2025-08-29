import { useEffect, useState } from "react";
import Chatbot from "./Chatbot.jsx";
import { generatePdf } from "../utils/generatePdf.js";

export default function ChatbotPage() {
  const [intake, setIntake] = useState({ name: "", email: "", date: "" });

  useEffect(() => {
    const saved = localStorage.getItem("serenemind:intake");
    if (saved) setIntake(JSON.parse(saved));
  }, []);

  // Dummy summary from chatbot – replace with your real data
  const [summary, setSummary] = useState(
    "No summary yet. Chat above and then click 'Create PDF' to export."
  );

  return (
    <div className="wrapper chatbot-wrap">
      <h2 className="page-title">Your Private Check-in</h2>

      <div className="two-col">
        <div className="panel">
          <Chatbot onSummarize={(s) => setSummary(s)} />
        </div>

        <div className="panel">
          <h3 className="panel-title">Session Summary (Preview)</h3>
          <div className="summary">{summary}</div>

          <div className="divider" />

          <h3 className="panel-title">Intake</h3>
          <ul className="summary">
            <li><b>Name:</b> {intake.name || "—"}</li>
            <li><b>Email:</b> {intake.email || "—"}</li>
            <li><b>Date:</b> {intake.date || "—"}</li>
          </ul>

          <button
            className="cta wfull"
            onClick={() => generatePdf({ intake, summary })}
          >
            Create PDF Report
          </button>
          <small className="muted">PDF contains intake + chatbot summary.</small>
        </div>
      </div>
    </div>
  );
}