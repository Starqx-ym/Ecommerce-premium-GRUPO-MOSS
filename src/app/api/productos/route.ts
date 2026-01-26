import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET() {
  const productos = await prisma.producto.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(productos);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const nombre = formData.get("nombre") as string;
    const precio = formData.get("precio") as string;
    const categoria = formData.get("categoria") as string;

    let imagenPath = "/placeholder.png";

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Crear un nombre único para el archivo
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), "public/productos", fileName);
      
      await writeFile(filePath, buffer);
      imagenPath = `/uploads/${fileName}`;
    }

    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        precio: parseFloat(precio),
        categoria,
        imagen: imagenPath,
      },
    });

    return NextResponse.json(nuevoProducto);
  } catch (error) {
    return NextResponse.json({ error: "Error al subir producto" }, { status: 500 });
  }
}

// Nueva función para eliminar
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  await prisma.producto.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: "Eliminado" });
}