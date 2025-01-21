"use client";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

interface CopyBlockProps {
  text: string;
}

const CopyBlock: React.FC<CopyBlockProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-100">
      <pre><code className="text-gray-800 text-sm" >{text}</code></pre>
      <button
        onClick={handleCopy}
        className="p-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
      >
        <span
          className={`transition-transform duration-200 ease-in-out ${
            copied ? "scale-110 text-green-500" : "text-gray-500"
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </span>
      </button>
    </div>
  );
};

export default CopyBlock;
