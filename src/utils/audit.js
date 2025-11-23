import { prisma } from "../config/db.js";

export const audit = async (userId, action, ip) => {
  await prisma.auditLog.create({
    data: { userId, action, ip },
  });
};