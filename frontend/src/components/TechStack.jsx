export default function TechStack() {
  return (
    <section className="bg-neutral-950 py-16 px-6 m-15">
      <h2 className="text-3xl font-bold text-center mb-8">
        Libraries Used
      </h2>

      <table className="max-w-4xl mx-auto w-full border">
        <thead className="bg-green-950">
          <tr>
            <th className="p-3 border">Library</th>
            <th className="p-3 border">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-green-100">React</td>
            <td className="p-3 border">UI development</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">Node.js</td>
            <td className="p-3 border">JavaScript runtime</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">Tailwind CSS</td>
            <td className="p-3 border">Styling and layout</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">Express.js</td>
            <td className="p-3 border">Web framework</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">Axios</td>
            <td className="p-3 border">API communication</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">Prisma ORM</td>
            <td className="p-3 border">Database access & schema management</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">SQLite</td>
            <td className="p-3 border">Relational database</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">bcryptjs</td>
            <td className="p-3 border">Secure password hashing</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">csurf</td>
            <td className="p-3 border">CSRF protection</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">express-session</td>
            <td className="p-3 border">Session-based authentication</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">express-rate-limit</td>
            <td className="p-3 border">Brute-force protection</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">express-validator</td>
            <td className="p-3 border">Input validation</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">helmet</td>
            <td className="p-3 border">Secure HTTP headers</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">xss-clean</td>
            <td className="p-3 border">XSS attack mitigation</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">cors</td>
            <td className="p-3 border">Controlled cross-origin requests</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">winston</td>
            <td className="p-3 border">Structured logging</td>
          </tr>
          <tr>
            <td className="p-3 border text-green-100">dotenv</td>
            <td className="p-3 border">Environment variable management</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
