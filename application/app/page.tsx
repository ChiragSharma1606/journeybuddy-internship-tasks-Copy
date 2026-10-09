"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Plan a weekend trip",
  "Find helpful travel tips",
  "Help me organize my itinerary",
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendQuestion(event?: FormEvent<HTMLFormElement>, suggested?: string) {
    event?.preventDefault();
    const text = (suggested ?? question).trim();
    if (!text || loading) return;

    setMessages((current) => [...current, { role: "user", content: text }]);
    setQuestion("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok) throw new Error(data.error ?? "Something went wrong.");
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer ?? "I couldn't create an answer." },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reach the assistant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">J</span><span>JourneyBuddy</span></div>
        <div className="sidebar-label">YOUR SPACE</div>
        <div className="nav-item active"><span>✦</span> Assistant</div>
        <div className="sidebar-note">
          <span className="status-dot" />
          <div><strong>Prototype mode</strong><p>Answers are currently demo responses.</p></div>
        </div>
        <div className="sidebar-footer">Built for the JourneyBuddy internship project</div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div><span className="eyebrow">YOUR PERSONAL HELPER</span><h1>Intelligent Assistant</h1></div>
          <div className="avatar">JB</div>
        </header>

        <div className="conversation">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-icon">✦</div>
              <p className="eyebrow">HELLO, THERE</p>
              <h2>Where would you like<br />to go from here?</h2>
              <p className="welcome-copy">Ask a question and I’ll help you take the next step.</p>
              <div className="suggestions">
                {suggestions.map((item) => (
                  <button className="suggestion" key={item} onClick={() => void sendQuestion(undefined, item)}>
                    <span>↗</span>{item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="message-list">
              {messages.map((message, index) => (
                <div className={`message-row ${message.role}`} key={index}>
                  <div className="message-avatar">{message.role === "user" ? "Y" : "✦"}</div>
                  <div className="message-content">
                    <div className="message-author">{message.role === "user" ? "You" : "JourneyBuddy"}</div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && <div className="typing"><span /><span /><span /> JourneyBuddy is thinking…</div>}
              <div className="end-anchor" />
            </div>
          )}
        </div>

        <div className="composer-wrap">
          {error && <p className="error-message">{error}</p>}
          <form className="composer" onSubmit={(event) => void sendQuestion(event)}>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask JourneyBuddy anything..."
              aria-label="Your question"
              rows={2}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendQuestion();
                }
              }}
            />
            <button className="send-button" type="submit" disabled={!question.trim() || loading} aria-label="Send question">↑</button>
          </form>
          <p className="disclaimer">Prototype only · Don’t enter private or sensitive information</p>
        </div>
      </section>
    </main>
  );
}
