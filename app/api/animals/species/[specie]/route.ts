import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { specie: string } }
) {
  try {
    const specie = params.specie;

    const specieId = await prisma.animalSpecie.findUnique({
      where: {
        specie: specie.toLocaleLowerCase(),
      },
      select: {
        id: true,
      },
    });

    if (!specieId) return;

    const animals = await prisma.animal.findMany({
      where: { specieId: specieId.id},
    });

    return NextResponse.json({
      status: "success",
      animals: animals,
    });

  } catch (error) {
    return NextResponse.json({ error });
  }
}
