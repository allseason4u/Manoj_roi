import { queryDB } from "@/lib/db";
import { encryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";
import { getAuthAdmin } from "@/utils/getAuthAdmin";

export async function POST() {
  try {
    const memberid = await getAuthAdmin();

    const dataRaw = await queryDB(
      "EXEC [dbo].[admindashboard] @memberid = @memberid",
      { memberid }
    );

    let data = [];
    if (dataRaw.length > 0 && dataRaw[0][""]) {
      data = JSON.parse(dataRaw[0][""]);
    }

    console.log(data[0]);

    if (!data || !data.length) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    data[0].walletid = memberid;
    return NextResponse.json(encryptData(JSON.stringify(data[0])));
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
