import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const UUIDPattern =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

    const animalbody = z.object({
      microchip: z.number(),
      name: z.string().min(2).max(50),
      specieId: z.string().refine((val) => {
        return UUIDPattern.test(val);
      }),
      breedId: z.string().refine((val) => {
        return UUIDPattern.test(val);
      }),
      age: z.number(),
      gender: z.literal("male").or(z.literal("female")),
      weight: z.number(),
      neutered: z.boolean(),
      vaccinated: z.boolean(),
      ownerId: z.string().refine((val) => {
        return UUIDPattern.test(val);
      }),
    });

    const {
      age,
      gender,
      microchip,
      name,
      neutered,
      vaccinated,
      weight,
      breedId,
      ownerId,
      specieId,
    } = animalbody.parse(await req.json());

    const existingMicrochip = await prisma.animal.findUnique({
      where: {
        microchip,
      },
    });

    if (existingMicrochip) {
      return NextResponse.json({
        status: "error",
        message: "This microchip has already been used!",
      });
    }

    const res = await prisma.animal.create({
      data: {
        age,
        gender,
        microchip,
        name,
        neutered,
        vaccinated,
        weight,
        breedId,
        ownerId,
        specieId,
      },
    });

    return NextResponse.json({
      status: "sucess",
      res,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error,
      },
      { status: 500 }
    );
  }
}
