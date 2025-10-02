import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { queryDB } from "@/lib/db";
import { encryptData, decryptData } from "@/utils/cryptoUtils";

const SECRET = process.env.JWT_SECRET || "mysecret";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const encryptedData = formData.get("data");
    const { adminId, password } = JSON.parse(decryptData(encryptedData));

    const result = await queryDB(
      "EXEC [dbo].[admin_login_proc] @admin_id=@adminId, @password=@password",
      { adminId, password }
    );

    if (!result || result.length === 0 || !result[0].result) {
      return NextResponse.json(
        encryptData(JSON.stringify({ error: "Invalid credentials" }))
      );
    }

    const dataObj = JSON.parse(result[0].result)[0]; // Extract admin data

    if (dataObj?.isactive === "y") {
      const token = jwt.sign({ admin: dataObj.admin_id }, SECRET, {
        expiresIn: "7d",
      });

      const response = NextResponse.json(
        encryptData(JSON.stringify({ ...dataObj, token: "ok" }))
      );

      response.cookies.set("admintoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json(
      encryptData(JSON.stringify({ error: "Access denied" }))
    );
  } catch (err) {
    return NextResponse.json(
      encryptData(JSON.stringify({ error: "Server error" })),
      { status: 500 }
    );
  }
}
