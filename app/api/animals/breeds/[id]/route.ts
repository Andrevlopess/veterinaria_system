import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const specieId = params.id;

  try {
    const res = await prisma.animalBreed.findMany({
      where: {
        specieId,
      },
    });

    return NextResponse.json({
      status: "success",
      breeds: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: error,
    });
  }
}
