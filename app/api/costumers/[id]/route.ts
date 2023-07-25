import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const deletedCostumer = await prisma.costumers.delete({
      where: { id },
    });

    return NextResponse.json({ deletedCostumer });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
