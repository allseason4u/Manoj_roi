import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "mysecretkey";

export async function getAuthUser() {
  const cookieStore = await cookies(); // Await cookies()
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded.user; // Return memberid
  } catch (err) {
    throw new Error("Invalid token");
  }
}
