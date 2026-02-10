export default function Learning() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        What I Learned
      </h2>
      <p className="max-w-4xl mx-auto text-gray-700">
        While building this project, I learned that authentication systems are often vulnerable not because of missing features, but because of poor design decisions and incorrect configurations. I gained hands-on experience implementing session-based authentication and understood why it is often preferred over token-based approaches for web applications that require strong CSRF protection and server-side control.

        I also learned how security mechanisms such as rate limiting, account lockout policies, and input validation work together to prevent brute-force attacks, injection attacks, and cross-site scripting. Debugging issues related to middleware order, CSRF handling, and cookie configuration helped me understand how small misconfigurations can introduce serious vulnerabilities.

        Most importantly, this project taught me to think defensively — assuming that users, tools, or attackers will try to bypass frontend checks — and to enforce security rules strictly on the backend. It strengthened my understanding of OWASP Top 10 risks and how real applications mitigate them in practice.
      </p>
    </section>
  );
}
