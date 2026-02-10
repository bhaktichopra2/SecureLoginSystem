export default function TechStack() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Libraries Used
      </h2>

      <table className="max-w-4xl mx-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Library</th>
            <th className="p-3 border">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border">React</td>
            <td className="p-3 border">UI development</td>
          </tr>
          <tr>
            <td className="p-3 border">Node.js</td>
            <td className="p-3 border">JavaScript runtime</td>
          </tr>
          <tr>
            <td className="p-3 border">Tailwind CSS</td>
            <td className="p-3 border">Styling and layout</td>
          </tr>
          <tr>
            <td className="p-3 border">Express.js</td>
            <td className="p-3 border">Web framework</td>
          </tr>
          <tr>
            <td className="p-3 border">Axios</td>
            <td className="p-3 border">API communication</td>
          </tr>
          <tr>
            <td className="p-3 border">Prisma ORM</td>
            <td className="p-3 border">Database access & schema management</td>
          </tr>
          <tr>
            <td className="p-3 border">SQLite</td>
            <td className="p-3 border">Relational database</td>
          </tr>
          <tr>
            <td className="p-3 border">bcryptjs</td>
            <td className="p-3 border">Secure password hashing</td>
          </tr>
          <tr>
            <td className="p-3 border">csurf</td>
            <td className="p-3 border">CSRF protection</td>
          </tr>
          <tr>
            <td className="p-3 border">express-session</td>
            <td className="p-3 border">Session-based authentication</td>
          </tr>
          <tr>
            <td className="p-3 border">express-rate-limit</td>
            <td className="p-3 border">Brute-force protection</td>
          </tr>
          <tr>
            <td className="p-3 border">express-validator</td>
            <td className="p-3 border">Input validation</td>
          </tr>
          <tr>
            <td className="p-3 border">helmet</td>
            <td className="p-3 border">Secure HTTP headers</td>
          </tr>
          <tr>
            <td className="p-3 border">xss-clean</td>
            <td className="p-3 border">XSS attack mitigation</td>
          </tr>
          <tr>
            <td className="p-3 border">cors</td>
            <td className="p-3 border">Controlled cross-origin requests</td>
          </tr>
          <tr>
            <td className="p-3 border">winston</td>
            <td className="p-3 border">Structured logging</td>
          </tr>
          <tr>
            <td className="p-3 border">dotenv</td>
            <td className="p-3 border">Environment variable management</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
