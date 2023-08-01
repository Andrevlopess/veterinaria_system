import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await prisma.animalSpecie.findMany();

    return NextResponse.json({
      status: "success",
      species: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: error,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { specie } = await req.json();

    const hasSpecie = await prisma.animalSpecie.findUnique({
      where: { specie },
    });

    if (hasSpecie) {
      return NextResponse.json({
        status: "Error",
        message: "This specie already exists.",
      });
    }

    const res = await prisma.animalSpecie.create({
      data: {
        specie,
      },
    });

    return NextResponse.json({
      status: "success",
      specie: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error,
    });
  }
}
