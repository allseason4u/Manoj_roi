import { NextResponse } from "next/server";
import { queryDB } from "@/lib/db";

export async function POST(req) {
  try {
    const { referralId, mobile, email } = await req.json();

    const result = await queryDB(
      "EXEC [dbo].[web_checkmember] @refid=@refid, @mobile=@mobile, @email=@email",
      { refid: referralId, mobile, email }
    );

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
