import { queryDB } from "@/lib/db";
import { encryptData, decryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";

export async function POST(req) {
  try {
    // Get authenticated memberid (same as dashboard code)
    const memberid = await getAuthUser();

    // Parse form data
    const body = await req.formData();
    const encryptedData = body.get("data");
    if (!encryptedData) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Decrypt and parse form data
    const formpara = JSON.parse(decryptData(encryptedData));
    const { name, mobileno, email } = formpara;

    if (!name || !mobileno || !email) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const country = "+1";

    // Call stored procedure
    const result = await queryDB(
      "EXEC [dbo].[updateprofile] @memberid=@memberid, @name=@name, @country=@country, @mobileno=@mobileno, @email=@email",
      { memberid, name, country, mobileno, email }
    );

    let jsonKey = Object.keys(result[0])[0];
    let dataObj = JSON.parse(result[0][jsonKey]);
    let data = dataObj[0];

    // Return encrypted response
    return NextResponse.json(encryptData(JSON.stringify(data)));
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
