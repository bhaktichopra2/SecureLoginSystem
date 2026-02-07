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
            <td className="p-3 border">Axios</td>
            <td className="p-3 border">API communication</td>
          </tr>
          <tr>
            <td className="p-3 border">Tailwind CSS</td>
            <td className="p-3 border">Styling</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
