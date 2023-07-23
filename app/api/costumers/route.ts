import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const costumerBody = z.object({
      name: z.string().min(2).max(25),
      surname: z.string().min(2).max(40),
      phone: z.string().min(2).max(15),
      email: z.string().email({ message: "Invalid email address" }),
      address: z.string().min(2).max(60),
      state: z.string().max(2, {message: "Invalid state"}),
    });

    const { name, surname, phone, email, address, state } = costumerBody.parse(
      await req.json()
    );

    const costumer = await prisma.costumers.findUnique({ where: { email } });

    if (costumer) {
      return NextResponse.json(
        {
          status: "Error",
          message: "This email has already been used!",
        },
        { status: 500 }
      );
    }

    const newCostumer = await prisma.costumers.create({
      data: {
        name,
        surname,
        email,
        phone: phone,
        address: address,
        state: state,
      },
    });

    return NextResponse.json({
      status: "sucess",
      newCostumer,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
