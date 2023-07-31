import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const costumerBody = z.object({
      name: z.string().min(2).max(35),
      surname: z.string().min(2).max(60),
      phone: z.string().min(2).max(15),
      email: z.string().email({ message: "Invalid email address" }),
      cpf: z.string().min(11).max(11, { message: "Please enter a valid cpf" }),
      address: z.string().min(2).max(60),
      state: z.string().max(2, { message: "Invalid state" }),
      cep: z.number(),
    });

    const { name, surname, phone, email, cpf, address, state, cep } =
      costumerBody.parse(await req.json());

    const costumerEmail = await prisma.costumers.findUnique({
      where: { email, NOT: { id: id } },
    });
    const costumerCPF = await prisma.costumers.findUnique({
      where: { cpf, NOT: { id: id } },
    });

    if (costumerEmail) {
      return NextResponse.json(
        {
          status: "Error",
          target: "email",
          message: "This email has already been used!",
        },
        { status: 500 }
      );
    }
    if (costumerCPF) {
      return NextResponse.json(
        {
          status: "Error",
          target: "cpf",
          message: "This CPF has already been used!",
        },
        { status: 500 }
      );
    }

    const updatedCostumer = await prisma.costumers.update({
      where: { id },
      data: {
        name,
        surname,
        email,
        cpf,
        phone,
        address,
        state,
        cep,
      },
    });

    return NextResponse.json(
      {
        status: "Sucess",
        updatedCostumer,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "Error",
        message: error,
      },
      { status: 500 }
    );
  }
}
