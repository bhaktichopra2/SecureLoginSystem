export default function ProjectOverview() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
        <p className="text-gray-700">
          The Secure Login System is a production-oriented authentication system built using Node.js and Express, designed with a strong emphasis on web security best practices. The project implements secure user registration and login using session-based authentication, CSRF protection, and password hashing. To defend against common attacks, the system includes rate limiting, account lockout mechanisms, input validation, and secure HTTP headers.

          In addition to authentication, the project features an audit logging system and a security dashboard that visualizes recent login activity. This allows users to monitor authentication events and detect suspicious behavior, closely resembling how security monitoring is handled in real-world applications.
        </p>
      </div>
    </section>
  );
}
