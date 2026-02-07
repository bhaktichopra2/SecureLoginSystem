export default function OWASP() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">OWASP Top 10 Focus</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Broken Authentication</li>
        <li>CSRF Attacks</li>
        <li>Security Misconfiguration</li>
        <li>Access Control</li>
      </ul>
    </section>
  );
}
