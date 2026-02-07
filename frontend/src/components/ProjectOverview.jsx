export default function ProjectOverview() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
        <p className="text-gray-700">
          The dashboard validates authenticated users, securely fetches
          CSRF tokens before logout, and prevents unauthorized access.
        </p>
      </div>
    </section>
  );
}
