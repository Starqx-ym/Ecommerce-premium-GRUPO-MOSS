"use client";
import { useState } from 'react';

export default function AdminPanel() {
  // Datos locales para simular la base de datos por ahora
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Billetera Minimalista", precio: 120, categoria: "Billeteras" },
    { id: 2, nombre: "Correa Classic Brown", precio: 85, categoria: "Correas" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR DEL ADMIN */}
      <div className="w-64 bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-10 tracking-tighter">MOSS ADMIN</h1>
        <nav className="space-y-4">
          <a href="#" className="block text-yellow-500 font-bold tracking-widest text-xs uppercase">Productos</a>
          <a href="#" className="block text-gray-400 hover:text-white transition text-xs uppercase">Configuración General</a>
          <a href="/" className="block text-gray-400 hover:text-white transition text-xs uppercase pt-10">Ver Sitio Web</a>
        </nav>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold italic font-serif">Gestión de Productos</h2>
          <button className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-yellow-600 transition">
            + Nuevo Producto
          </button>
        </div>

        {/* TABLA DE PRODUCTOS */}
        <div className="bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-xs uppercase tracking-widest text-gray-500 font-medium">Producto</th>
                <th className="p-4 text-xs uppercase tracking-widest text-gray-500 font-medium">Categoría</th>
                <th className="p-4 text-xs uppercase tracking-widest text-gray-500 font-medium">Precio</th>
                <th className="p-4 text-xs uppercase tracking-widest text-gray-500 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-sm">{p.nombre}</td>
                  <td className="p-4 text-sm text-gray-600">{p.categoria}</td>
                  <td className="p-4 text-sm font-serif">${p.precio}</td>
                  <td className="p-4 text-right space-x-4">
                    <button className="text-xs uppercase text-blue-600 hover:underline">Editar</button>
                    <button className="text-xs uppercase text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}