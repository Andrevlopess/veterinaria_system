import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { breed: string } }
  ) {
    const breedName = params.breed;
  
    try {
      const breed = await prisma.animalBreed.findUnique({
        where: {
          breed: breedName.toLocaleLowerCase(),
        }
      });
  
      if (!breed) {
        return NextResponse.json({
          status: "Error while getting breed.",
        });
      }
  
      return NextResponse.json(
        {
          breed,
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