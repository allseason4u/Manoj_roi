import { queryDB } from "@/lib/db";
import { encryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";

export async function POST() {
  try {
    // Get authenticated user
    const memberid = await getAuthUser();

    // Fetch profile data
    const result = await queryDB(
      "EXEC [dbo].[getprofile] @memberid = @memberid",
      { memberid }
    );
    if (!result || !result.length) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    let jsonKey = Object.keys(result[0])[0];
    let dataObj = JSON.parse(result[0][jsonKey]);
    let data = dataObj[0];

    // Encrypt and return first row
    return NextResponse.json(encryptData(JSON.stringify(data)));
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
