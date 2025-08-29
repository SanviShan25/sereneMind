/**
 * Yahan tum apna real chatbot mount kar do.
 * Abhi ke liye ek placeholder: text area → “Summarize” button.
 * Tumhare existing bot se summary aati ho to `onSummarize(summaryText)` call kar dena.
 */
import { useState } from "react";

export default function Chatbot({ onSummarize }) {
  const [text, setText] = useState("");

  function makeSummary() {
    const s = text.trim()
      ? `User shared: ${text.slice(0, 200)}${text.length > 200 ? "…" : ""}`
      : "No conversation captured.";
    onSummarize?.(s);
    alert("Summary updated on the right!");
  }

  return (
    <div>
      <h3 className="panel-title">Chat</h3>
      <textarea
        className="chatbox"
        rows={12}
        placeholder="Type here or embed your chatbot UI in place of this area…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="cta" onClick={makeSummary}>Summarize →</button>
    </div>
  );
}