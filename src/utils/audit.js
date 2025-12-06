import fs from "fs";
import path from "path";

const logPath = path.join(process.cwd(), "src/logs/security.log");

export default function audit(userId, action, ip) {
  const entry = `[${new Date().toISOString()}] USER: ${
    userId || "UNKNOWN"
  } | ACTION: ${action} | IP: ${ip}\n`;

  fs.appendFile(logPath, entry, (err) => {
    if (err) {
      console.error("Failed to write audit log:", err);
    }
  });
}
