import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//obtener productos
export async function GET() {
  try {
    const productos = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return NextResponse.json(productos);
  } catch (error: any) {
    console.error("ERROR EN GET PRODUCTOS:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

//añadir
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Datos recibidos:", body);

    // 🔎 Validaciones básicas
    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const nuevoProducto = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        
        // ✅ IMPORTANTE: Decimal debe enviarse como string
        price: body.price.toString(),

        categoryId: Number(body.categoryId),

        // Aseguramos que sea array
        images: Array.isArray(body.images) ? body.images : [],
      },
    });

    return NextResponse.json(nuevoProducto);
  } catch (error: any) {
    console.error("ERROR DETALLADO EN POST:", error);

    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
//eliminar
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID requerido" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Producto eliminado correctamente",
    });
  } catch (error: any) {
    console.error("ERROR EN DELETE:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}