export default function Home() {
  // 1. Datos de prueba
  const PRODUCTOS_PREMIUM = [
    { id: 1, nombre: "Reloj Minimalista Gold", precio: 250.00, imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 2, nombre: "Bolso de Cuero Artesanal", precio: 180.00, imagen: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" },
    { id: 3, nombre: "Lentes de Sol Aviador", precio: 120.00, imagen: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500" },
  ];

  return (
    <main className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A]">
      
      {/* NAVBAR */}
      <nav className="p-6 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-serif font-bold tracking-widest">LUXO</h1>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider">
          <a href="#" className="hover:text-gray-400">Catálogo</a>
          <a href="#" className="hover:text-gray-400">Nosotros</a>
          <a href="#" className="hover:text-gray-400">Carrito (0)</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="h-[70vh] flex flex-col justify-center items-center text-center px-4 bg-white border-b border-gray-100">
        <h2 className="text-5xl md:text-7xl font-serif mb-6">Calidad en cada detalle</h2>
        <p className="text-gray-500 max-w-md mb-8">Artesanía premium para quienes buscan lo extraordinario.</p>
        <button className="bg-black text-white px-10 py-4 hover:bg-gray-800 transition uppercase text-xs tracking-widest">
          Explorar Colección
        </button>
      </section>

      {/* CATÁLOGO DE PRODUCTOS (Revisa que esté dentro del main) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-xl font-serif mb-16 text-center tracking-[0.2em] uppercase">Nuestra Colección</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {PRODUCTOS_PREMIUM.map((producto) => (
            <div key={producto.id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-in-out"
                />
              </div>
              <div className="mt-8 text-center">
                <h4 className="text-base font-light tracking-tight uppercase">{producto.nombre}</h4>
                <p className="text-gray-400 mt-2 text-sm">${producto.precio.toFixed(2)}</p>
                <div className="mt-4 inline-block border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] group-hover:text-gray-400 group-hover:border-gray-400 transition">
                  Ver detalle
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTÓN WHATSAPP */}
      <a 
        href="https://wa.me/tu_numero" 
        target="_blank" 
        className="fixed bottom-8 right-8 bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition z-50"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.67-1.613-.918-2.213-.242-.588-.487-.508-.67-.517-.172-.008-.37-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754a8.962 8.962 0 01-4.415-1.161l-.317-.188-3.272.859.873-3.19-.205-.326A8.91 8.91 0 014.12 7.712c0-4.947 4.021-8.967 8.968-8.967 2.4 0 4.655.933 6.35 2.628a8.887 8.887 0 012.625 6.342c0 4.95-4.02 8.968-8.97 8.968" />
        </svg>
      </a>

    </main>
  );
}