export default function HeroSection({ title }) {
  return (
    <section
      className="
        relative
        h-[90vh]
        w-full
        bg-black
        overflow-hidden
      "
    >
      {/* Background Image */}
      <img
        src="/hero.jpg"
        alt="Cyber Security Background"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* Dark overlay for contrast */}
      <div
        className="
          absolute
          inset-0
          bg-black/65
        "
      />

      {/* Bottom fade into black page */}
      <div
        className="
          absolute
          bottom-0
          w-full
          h-56
          bg-gradient-to-b
          from-transparent
          to-black
        "
      />

      {/* Centered content */}
      <div
        className="
          relative
          z-10
          h-full
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div className="text-center max-w-3xl">
          <h1
            className="
              text-4xl
              md:text-6xl
              font-bold
              tracking-wide
              text-white
              drop-shadow-[0_0_20px_rgba(0,255,255,0.35)]
            "
          >
            {title || "Welcome to Secure Authentication Dashboard"}
          </h1>

          <p
            className="
              mt-6
              text-lg
              md:text-xl
              text-gray-300
              leading-relaxed
            "
          >
            A security-first web application implementing CSRF protection,
            protected routes, and OWASP best practices.
          </p>
        </div>
      </div>
    </section>
  );
}
