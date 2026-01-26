"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  /* ================== STATES ================== */
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  /* ================== FUNCIONES ================== */
  const addToCart = (producto) => {
    setCartItems([...cartItems, producto]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  /* ================== CATEGORÍAS ================== */
  const CATEGORIAS = [
    { id: 1, nombre: "Billeteras", imagen: "/categorias/billeteras.jpg" },
    { id: 2, nombre: "Calzado", imagen: "/categorias/calzado.jpg" },
    { id: 3, nombre: "Carteras", imagen: "/categorias/carteras.jpg" },
    { id: 4, nombre: "Correas", imagen: "/categorias/correas.jpg" },
  ];

  /* ================== PRODUCTOS ================== */
  const PRODUCTOS = [
    {
      id: 1,
      nombre: "Bolso de cuero",
      precio: 420,
      categoria: "Carteras",
      imagen: "/productos/tote.jpg",
    },
    {
      id: 2,
      nombre: "Oxford Clásico",
      precio: 310,
      categoria: "Calzado",
      imagen: "/productos/oxford.jpg",
    },
    {
      id: 3,
      nombre: "Cinturón de cuero",
      precio: 95,
      categoria: "Accesorios",
      imagen: "/productos/belt.jpg",
    },
  ];

  /* ================== DESTACADOS ================== */
  const DESTACADOS = [
    {
      id: 101,
      nombre: "Billetera Minimalista",
      precio: 120,
      imagen: "/destacados/billetera.jpg",
    },
    {
      id: 102,
      nombre: "Correa Classic",
      precio: 85,
      imagen: "/destacados/correa.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      {/* ================== NAVBAR ================== */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center mix-blend-difference text-white">
        <span className="text-xs uppercase tracking-[0.3em]">Menu</span>

        <h1 className="text-3xl font-serif tracking-[0.4em] font-light">
          MOSS
        </h1>

        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="text-xs uppercase tracking-[0.3em]"
        >
          Carrito ({cartItems.length})
        </button>
      </nav>
      {/* ================== CARRITO LATERAL ================== */}
{cartOpen && (
  <div className="fixed inset-0 z-50 flex">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setCartOpen(false)}
    />

    {/* Panel */}
    <aside className="relative ml-auto w-96 max-w-full h-full bg-white shadow-2xl flex flex-col">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-sm uppercase tracking-widest">Tu carrito</h3>
        <button
          onClick={() => setCartOpen(false)}
          className="text-xs uppercase tracking-widest"
        >
          Cerrar
        </button>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-6 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-400 italic text-center">
            Tu carrito está vacío.
          </p>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <h4 className="text-sm font-bold">{item.nombre}</h4>
                  <p className="text-xs text-gray-500">
                    S/. {item.precio}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="text-xs text-red-500 underline"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t">
        <button className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest">
          Finalizar compra
        </button>
      </div>
    </aside>
  </div>
)}


      {/* ================== HERO ================== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Leather craftsmanship"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center text-white">
          <span className="block text-xs uppercase tracking-[0.4em] mb-6">
            Cuero hecho a mano
          </span>

          <h2 className="text-6xl md:text-8xl font-serif italic font-light mb-10">
            Elegancia atemporal
          </h2>

          <button className="border border-white/50 px-14 py-4 text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700">
            Ver colección
          </button>
        </div>
      </section>

      {/* ================== CATEGORÍAS ================== */}
      <section className="py-28 px-10 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4">
            Nuestra colección
          </p>

          <h3 className="text-4xl font-serif italic mb-20">
            Diseñado para durar
          </h3>

          <div className="flex flex-wrap justify-center gap-16">
            {CATEGORIAS.map((cat) => (
              <div key={cat.id} className="group">
                <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-xl mb-6">
                  <Image src={cat.imagen} alt={cat.nombre} fill />
                </div>
                <h4 className="uppercase tracking-widest text-sm">
                  {cat.nombre}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================== PRODUCTOS DESTACADOS ================== */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          {PRODUCTOS.map((p) => (
            <div key={p.id}>
              <div className="relative aspect-[3/4] mb-8">
                <Image src={p.imagen} alt={p.nombre} fill />
                <button
                  onClick={() => addToCart(p)}
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

      {/* ================== SECCIÓN DESTACADOS ================== */}
      <section className="py-20 px-10 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-10 uppercase tracking-widest text-center">
            Destacados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DESTACADOS.map((prod) => (
              <div key={prod.id} className="border p-4 hover:shadow-lg">
                <img
                  src={prod.imagen}
                  className="w-full h-64 object-cover mb-4"
                  alt={prod.nombre}
                />
                <h4 className="font-bold">{prod.nombre}</h4>
                <p className="text-gray-600 mb-4">S/. {prod.precio}</p>
                <button
                  onClick={() => addToCart(prod)}
                  className="w-full bg-black text-white py-2 uppercase text-xs tracking-widest"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
