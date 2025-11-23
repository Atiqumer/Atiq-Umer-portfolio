"use client";

import { useState } from "react";
import { useChat } from "./useChat";

export default function AvatarChat() {
  const [input, setInput] = useState("");
  const { messages, loading, sendMessage } = useChat();

  return (
    <div className="w-[360px] bg-white text-black p-4 border border-gray-300 rounded-md shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <img
          src="/avatar.jpg"
          className="w-16 h-16 rounded-md object-cover"
          alt="Avatar"
        />
        <h3 className="text-xl font-semibold">AI Assistant</h3>
      </div>

      <div className="h-64 overflow-y-auto border border-gray-200 p-2 rounded-md">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.from === "user" ? "text-right" : "text-left"}`}>
            <p className="text-sm">
              <strong>{m.from === "user" ? "You" : "AI"}:</strong> {m.text}
            </p>
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full mt-3 p-2 border border-gray-300 rounded"
        placeholder="Type here..."
      />

      <button
        disabled={loading}
        onClick={() => {
          sendMessage(input);
          setInput("");
        }}
        className="w-full mt-3 p-2 bg-black text-white rounded"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
