import { queryDB } from "@/lib/db";
import { encryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";

export async function POST() {
  try {
    const memberid = await getAuthUser();

    const dataRaw = await queryDB(
      "EXEC [dbo].[withdrawwallet]  @memberid = @memberid ",
      {
        memberid,
      }
    );
    let data = [];
    if (dataRaw.length > 0 && dataRaw[0]["data"]) {
      data = JSON.parse(dataRaw[0]["data"]);
    }

    console.log(data);
    return NextResponse.json(encryptData(JSON.stringify(data)));
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
