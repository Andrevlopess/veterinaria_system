import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { specie: string } }
) {
  const specie = params.specie;

  try {
    const specieId = await prisma.animalSpecie.findUnique({
      where: {
        specie: specie.toLocaleLowerCase(),
      },
      select: {
        id: true,
      },
    });

    if (!specieId) {
      return NextResponse.json({
        status: "Error while getting specie.",
      });
    }

    const breeds = await prisma.animalBreed.findMany({
      where: {
        specieId: specieId.id,
      },
    });

    return NextResponse.json(
      {
        breeds,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      status: "Error",
      message: error,
    });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { specie: string } }
) {

  try {
    const { breed } = await req.json();

    const specie = params.specie;

    const specieId = await prisma.animalSpecie.findUnique({
      where: {
        specie: specie.toLocaleLowerCase(),
      },
      select: {
        id: true,
      },
    });

    if (!specieId) {
      return NextResponse.json({
        status: "Error while getting specie.",
      });
    }

    const hasBreed = await prisma.animalBreed.findUnique({
      where: { breed },
    });

    if (hasBreed) {
      return NextResponse.json({
        status: "Error",
        message: "This breed already exists.",
      });
    }

    const res = await prisma.animalBreed.create({
      data: {
        breed,
        specieId: specieId.id
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
