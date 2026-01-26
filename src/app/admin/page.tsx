"use client";
import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState<number | null>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ nombre: "", precio: "", categoria: "Billeteras" });

  const cargarProductos = async () => {
    const res = await fetch("/api/productos");
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => { cargarProductos(); }, []);

  const guardarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("nombre", form.nombre);
    formData.append("precio", form.precio);
    formData.append("categoria", form.categoria);

    const response = await fetch("/api/productos", { method: "POST", body: formData });
    
    if (response.ok) {
      setMostrarModal(false);
      setFile(null);
      cargarProductos();
    }
  };

  const eliminarProducto = async (id: number) => {
    await fetch(`/api/productos?id=${id}`, { method: "DELETE" });
    setConfirmarEliminar(null);
    cargarProductos();
  };

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <div className="flex justify-between items-center mb-10 border-b pb-5">
        <h1 className="text-3xl font-bold uppercase tracking-tighter">Inventario MOSS </h1>
        <button onClick={() => setMostrarModal(true)} className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest">
          + Nuevo Producto
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400">
          <tr>
            <th className="p-4">Vista</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Categoría</th>
            <th className="p-4">Precio</th>
            <th className="p-4 text-right">Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p: any) => (
            <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="p-4"><img src={p.imagen} className="w-12 h-12 object-cover rounded" /></td>
              <td className="p-4 font-medium">{p.nombre}</td>
              <td className="p-4 text-gray-400">{p.categoria}</td>
              <td className="p-4">S/ {p.precio}</td>
              <td className="p-4 text-right">
                <button 
                  onClick={() => setConfirmarEliminar(p.id)}
                  className="text-red-500 text-[10px] font-bold uppercase hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL ELIMINAR */}
      {confirmarEliminar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110]">
          <div className="bg-white p-8 rounded shadow-2xl max-w-sm text-center">
            <h3 className="text-lg font-bold mb-4 uppercase">¿Estás seguro?</h3>
            <p className="text-gray-500 text-sm mb-6">Esta acción no se puede deshacer. El producto será borrado permanentemente.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setConfirmarEliminar(null)} className="text-xs uppercase text-gray-400">Cancelar</button>
              <button onClick={() => eliminarProducto(confirmarEliminar)} className="bg-red-600 text-white px-6 py-2 text-xs uppercase">Sí, Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NUEVO PRODUCTO */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white p-10 w-full max-w-md">
            <h2 className="text-xl font-bold mb-6 uppercase">Añadir a la Colección</h2>
            <form onSubmit={guardarProducto} className="space-y-4">
              <input type="text" placeholder="Nombre" className="w-full p-3 border border-gray-200 outline-none focus:border-black" onChange={(e) => setForm({...form, nombre: e.target.value})} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Precio" className="w-full p-3 border border-gray-200 outline-none focus:border-black" onChange={(e) => setForm({...form, precio: e.target.value})} required />
                <select className="w-full p-3 border border-gray-200 bg-white" onChange={(e) => setForm({...form, categoria: e.target.value})}>
                  <option value="Billeteras">Billeteras</option>
                  <option value="Correas">Correas</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-gray-200 p-4 text-center">
                <label className="cursor-pointer">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    {file ? file.name : "Seleccionar Imagen Local"}
                  </span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
                </label>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setMostrarModal(false)} className="text-xs uppercase text-gray-400">Cerrar</button>
                <button type="submit" className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}