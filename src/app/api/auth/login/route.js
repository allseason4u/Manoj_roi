import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { queryDB } from "@/lib/db";
import { encryptData, decryptData } from "@/utils/cryptoUtils";

const SECRET = process.env.JWT_SECRET || "mysecret";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const encryptedData = formData.get("data");
    const { identifier, password, ip } = JSON.parse(decryptData(encryptedData));

    // Call stored procedure
    const result = await queryDB(
      "EXEC [dbo].[reg_isfound] @identifier=@identifier,  @password=@password, @ip=@ip",
      { identifier, password, ip }
    );

    let jsonKey = Object.keys(result[0])[0];
    let dataObj = JSON.parse(result[0][jsonKey]);
    let data = dataObj[0];

    console.log(data);

    if (data?.memberid?.length === 8) {
      if (data.isadd === "y") {
        const token = jwt.sign({ user: data.memberid }, SECRET, {
          expiresIn: "7d",
        });

        // Set token as HttpOnly Secure Cookie
        const response = NextResponse.json(
          encryptData(JSON.stringify({ ...data, token: "ok" }))
        );
        response.cookies.set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Secure only on HTTPS
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return response;
      } else {
        data.token = "n";
      }
    }

    return NextResponse.json(encryptData(JSON.stringify(data)));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      encryptData(JSON.stringify({ error: "Server Error" })),
      { status: 500 }
    );
  }
}
