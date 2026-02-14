import { useState } from "react";

const features = [
  {
    title: "Session-Based Authentication",
    desc: "Uses secure HTTP-only cookies and server-side sessions to manage user authentication safely."
  },
  {
    title: "Brute-Force Protection",
    desc: "Prevents repeated login attempts using rate limiting and automatic account lockout."
  },
  {
    title: "Security Activity Dashboard",
    desc: "Displays recent login, logout, and failed attempts to help users monitor suspicious behavior."
  }
];

export default function Features() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-16 px-6 m-15">
      <h2 className="text-3xl font-bold text-center mb-10">Features</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className="cursor-pointer bg-green-950 shadow-lg p-6 rounded-xl transition hover:scale-105"
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            {active === i && (
              <p className="mt-4 text-green-100">{f.desc}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
