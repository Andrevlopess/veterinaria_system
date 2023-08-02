import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const UUIDPattern =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

    const animalbody = z.object({
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
      birthdate: z.string().refine((val) => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        return datePattern.test(val);
      }),
      neutered: z.boolean(),
      vaccinated: z.boolean(),
      ownerId: z.string().refine((val) => {
        return UUIDPattern.test(val);
      }),
    });

    const {
      age,
      birthdate,
      breedId,
      gender,
      name,
      neutered,
      ownerId,
      specieId,
      vaccinated,
      weight,
    } = animalbody.parse(await req.json());

    const res = await prisma.animal.create({
      data: {
        name,
        age,
        
        gender,
        neutered,
        vaccinated,
        weight,
        breedId,
        ownerId,
        specieId,
      },
    });

    return NextResponse.json({
      status: "Teste",
      body,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error,
    });
  }
}

//         const { name, surname, phone, email, cpf, address, state, cep } =
//           costumerBody.parse(await req.json());

//         const costumerEmail = await prisma.costumers.findUnique({ where: { email } });
//         const costumerCPF = await prisma.costumers.findUnique({ where: { cpf } });

//         if (costumerEmail) {
//           return NextResponse.json(
//             {
//               status: "Error",
//               target: "email",
//               message: "This email has already been used!",
//             },
//             { status: 500 }
//           );
//         }

//         if (costumerCPF) {
//           return NextResponse.json(
//             {
//               status: "Error",
//               target: "cpf",
//               message: "This CPF has already been used!",
//             },
//             { status: 500 }
//           );
//         }

//         const newCostumer = await prisma.costumers.create({
//           data: {
//             name,
//             surname,
//             email,
//             cpf,
//             phone,
//             address,
//             state,
//             cep,
//           },
//         });

//         return NextResponse.json({
//           status: "sucess",
//           newCostumer,
//         });

//       } catch (error: any) {

//         return new NextResponse(
//           JSON.stringify({
//             status: "error",
//             message: error,
//           }),
//           { status: 500 }
//         );
//

// 815d7ae3-3e74-4953-abe2-97a8fc6c023a specie
// 7bc372c3-9ad2-4386-b69a-88adc28b191e breed
// 7f3d764b-96f9-4396-a194-b324c0a96ff3 owner

//     }
// }
