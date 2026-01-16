export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      {/* Aquí irá nuestro contenido */}
      <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-2xl font-serif font-bold tracking-widest">LUXO</h1>
        <div className="space-x-8 text-sm uppercase tracking-wider">
          <a href="#">Catálogo</a>
          <a href="#">Nosotros</a>
          <a href="#">Carrito (0)</a>
        </div>
      </nav>

      <section className="h-[80vh] flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-5xl md:text-7xl font-serif mb-6">Calidad en cada detalle</h2>
        <p className="text-gray-600 max-w-md mb-8">Artesanía premium para quienes buscan lo extraordinario.</p>
        <button className="bg-black text-white px-10 py-4 hover:bg-gray-800 transition">
          Explorar Colección
        </button>
      </section>
    </main>
  );
}