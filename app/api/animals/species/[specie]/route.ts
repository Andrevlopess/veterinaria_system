import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { specie: string } }
) {

  const specie = params.specie;

  try {
    const res = await prisma.animalSpecie.findUnique({
     where: {
        specie: specie.toLocaleLowerCase()
     }
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
