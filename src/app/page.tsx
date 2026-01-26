"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import { configurarCulqi } from "@/utils/culqi";
import CulqiListener from "@/components/CulqiListener";

export default function Home() {
  // Estado para abrir/cerrar carrito lateral
  const [cartOpen, setCartOpen] = useState(false);

  // Estado global del carrito desde Zustand
  const { items, addItem, removeItem, clearCart } = useCart();

  // Total del carrito
  const total = items.reduce((acc, item) => acc + item.precio, 0);

  // Función para iniciar pago
  const manejarPago = () => {
  if (items.length === 0) return alert("Tu carrito está vacío");
  
  // Culqi requiere el monto en céntimos sin decimales
  const montoEnCentimos = Math.round(total * 100); 
  
  configurarCulqi(total, "Compra en MOSS"); 
};

  // Datos de ejemplo
  const CATEGORIAS = [
    { id: 1, nombre: "Billeteras", imagen: "/categorias/billeteras.jpg" },
    { id: 2, nombre: "Calzado", imagen: "/categorias/calzado.jpg" },
    { id: 3, nombre: "Carteras", imagen: "/categorias/carteras.jpg" },
    { id: 4, nombre: "Correas", imagen: "/categorias/correas.jpg" },
  ];

  const PRODUCTOS = [
    { id: 1, nombre: "Bolso de cuero", precio: 420, categoria: "Carteras", imagen: "/productos/tote.jpg" },
    { id: 2, nombre: "Oxford Clásico", precio: 310, categoria: "Calzado", imagen: "/productos/oxford.jpg" },
    { id: 3, nombre: "Cinturón de cuero", precio: 95, categoria: "Accesorios", imagen: "/productos/belt.jpg" },
  ];

  const DESTACADOS = [
    { id: 101, nombre: "Billetera Minimalista", precio: 120, imagen: "/destacados/billetera.jpg" },
    { id: 102, nombre: "Correa Classic", precio: 85, imagen: "/destacados/correa.jpg" },
  ];

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      {/* Listener global de Culqi */}
      <CulqiListener />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center bg-transparent">
        <span className="text-xs uppercase tracking-[0.3em] cursor-pointer bg-transparent">Menu</span>
        <h1 className="text-3xl font-serif tracking-[0.4em] font-light bg-transparent">MOSS</h1>
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="text-xs uppercase tracking-[0.3em]"
        >
          Carrito ({items.length})
        </button>
      </nav>

      {/* CARRITO LATERAL */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <aside className="relative ml-auto w-96 max-w-full h-full bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-sm uppercase tracking-widest">Tu carrito</h3>
              <button onClick={() => setCartOpen(false)} className="text-xs uppercase tracking-widest">
                Cerrar
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-gray-400 italic text-center">Tu carrito está vacío.</p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4 border-b pb-4">
                      <Image src={item.imagen} alt={item.nombre} width={64} height={64} className="object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.nombre}</h4>
                        <p className="text-xs text-gray-500">S/. {item.precio}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 underline"
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-6 border-t">
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total:</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <button
                onClick={manejarPago}
                className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest"
              >
                Finalizar compra
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="/hero.jpg" alt="Leather craftsmanship" fill priority className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <span className="block text-xs uppercase tracking-[0.4em] mb-6">Cuero hecho a mano</span>
          <h2 className="text-6xl md:text-8xl font-serif italic font-light mb-10">Elegancia atemporal</h2>
          <button className="border border-white/50 px-14 py-4 text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700">
            Ver colección
          </button>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="py-28 px-10 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4">Nuestra colección</p>
          <h3 className="text-4xl font-serif italic mb-20">Diseñado para durar</h3>
          <div className="flex flex-wrap justify-center gap-16">
            {CATEGORIAS.map((cat) => (
              <div key={cat.id} className="group">
                <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-xl mb-6">
                  <Image src={cat.imagen} alt={cat.nombre} fill />
                </div>
                <h4 className="uppercase tracking-widest text-sm">{cat.nombre}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          {PRODUCTOS.map((p) => (
            <div key={p.id}>
              <div className="relative aspect-[3/4] mb-8">
                <Image src={p.imagen} alt={p.nombre} fill />
                <button
                  onClick={() => addItem(p)}
                  className="absolute bottom-0 w-full bg-black text-white py-4 text-xs uppercase tracking-[0.4em]"
                >
                  Añadir al carrito
                </button>
              </div>
              <div className="flex justify-between">
                <h4>{p.nombre}</h4>
                <p className="font-serif">S/. {p.precio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="py-20 px-10 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-10 uppercase tracking-widest text-center">Destacados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DESTACADOS.map((prod) => (
              <div key={prod.id} className="border p-4 hover:shadow-lg">
                <Image src={prod.imagen} alt={prod.nombre} width={400} height={256} className="object-cover mb-4" />
                <h4 className="font-bold">{prod.nombre}</h4>
                <p className="text-gray-600 mb-4">S/. {prod.precio}</p>
                <button
                  onClick={() => addItem(prod)}
                  className="w-full bg-black text-white py-2 uppercase text-xs tracking-widest"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
    <div className="col-span-1 md:col-span-2">
      <h2 className="text-3xl font-bold tracking-tighter mb-6">MOSS</h2>
      <p className="text-gray-500 max-w-sm mb-6 uppercase text-[10px] tracking-[0.2em]">
        Artesanía peruana en cuero. Diseños atemporales hechos para durar toda la vida.
      </p>
      <div className="flex space-x-4">
        {/* Íconos de Redes */}
        <a href="#" className="hover:text-yellow-600 transition">Instagram</a>
        <a href="#" className="hover:text-yellow-600 transition">Facebook</a>
        <a href="#" className="hover:text-yellow-600 transition">TikTok</a>
      </div>
    </div>
    <div>
      <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Explorar</h4>
      <ul className="text-sm space-y-4 text-gray-400 font-light">
        <li><a href="#" className="hover:text-black">Colección 2026</a></li>
        <li><a href="#" className="hover:text-black">Billeteras</a></li>
        <li><a href="#" className="hover:text-black">Correas</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Soporte</h4>
      <ul className="text-sm space-y-4 text-gray-400 font-light">
        <li><a href="#" className="hover:text-black">Envíos y Retornos</a></li>
        <li><a href="#" className="hover:text-black">Términos y Condiciones</a></li>
        <li><a href="#" className="hover:text-black">Privacidad</a></li>
      </ul>
    </div>
  </div>
  <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 text-center">
    <p className="text-[10px] text-gray-400 uppercase tracking-widest">© 2026 MOSS-CCORI. TODOS LOS DERECHOS RESERVADOS.</p>
  </div>
</footer>
    </main>
  );
}
