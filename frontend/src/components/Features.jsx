import { useState } from "react";

const features = [
  {
    title: "CSRF Protection",
    desc: "Secure token-based protection against CSRF attacks."
  },
  {
    title: "Protected Routes",
    desc: "Unauthorized users are redirected safely."
  },
  {
    title: "Secure Logout",
    desc: "Logout requires a fresh CSRF token."
  }
];

export default function Features() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Features</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className="cursor-pointer bg-white shadow-lg p-6 rounded-xl transition hover:scale-105"
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            {active === i && (
              <p className="mt-4 text-gray-600">{f.desc}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
