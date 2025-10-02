import { queryDB } from "@/lib/db";
import { encryptData, decryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";

export async function POST(req) {
  try {
    // Get authenticated memberid
    const memberid = await getAuthUser();

    // Parse form data
    const body = await req.formData();
    const encryptedData = body.get("data");
    if (!encryptedData) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Decrypt and parse form data
    const formpara = JSON.parse(decryptData(encryptedData));
    const { oldPassword, newPassword, confirmPassword } = formpara;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Call stored procedure for changing password
    const result = await queryDB(
      "EXEC [dbo].[changepassword] @memberid=@memberid, @oldPassword=@oldPassword, @newPassword=@newPassword",
      { memberid, oldPassword, newPassword }
    );

    // Procedure returns something like:
    // [{ result: 'y' }]  or  [{ result: 'n', message: 'Old password is incorrect' }]
    const data = result[0];

    // Encrypt response
    return NextResponse.json(encryptData(JSON.stringify(data)));
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
