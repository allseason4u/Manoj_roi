import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

const SECRET = process.env.JWT_SECRET || "mysecretkey";

export async function getAuthAdmin() {
  const cookieStore = await cookies(); // Await cookies()
  const token = cookieStore.get("admintoken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded.admin; // Return memberid
  } catch (err) {
    throw new Error("Invalid token");
  }
}
