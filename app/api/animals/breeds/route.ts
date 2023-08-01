import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {

    const res = await prisma.animalBreed.findMany();

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

export async function POST(req: Request) {
  try {
    const { breed, specieId } = await req.json();

    const hasBreed = await prisma.animalBreed.findUnique({
      where: { breed },
    });

    if (hasBreed) {
      return NextResponse.json({
        status: "Error",
        message: "This specie already exists.",
      });
    }

    const res = await prisma.animalBreed.create({
      data: {
        breed,
        specieId,
      },
    });

    return NextResponse.json({
      status: "success",
      breed: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error,
    });
  }
}
