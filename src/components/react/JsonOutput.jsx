import React, { useState } from "react";
import { ClipboardCopy } from "lucide-react";

export default function JsonOutput({ data }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const text = JSON.stringify(data, null, 2);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <h3 style={{ margin: 0 }}>Generated JSON</h3>

        <button
          type="button"
          onClick={copyToClipboard}
          className="btn btn-sm"
          aria-label="Copy JSON to clipboard"
          style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          <ClipboardCopy size={16} />
          {copied && <span style={{ color: "var(--db-green-dark)" }}>Copied!</span>}
        </button>
      </div>

      <pre className="json-output" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
