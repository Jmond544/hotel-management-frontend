import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4 z-30">
      <div className="absolute overflow-hidden h-screen w-screen top-0 left-0 right-0 z-10">
        <video
          className="w-full object-cover h-full"
          autoPlay
          muted
          loop
          src="/video_hotel.mp4"
        ></video>
      </div>
      <header className="flex flex-col gap-2 h-screen text-center justify-center items-center align-middle">
        <h1 className="text-4xl text-slate-900 font-bold z-30 bg-slate-50/50 px-6 py-1 rounded-2xl backdrop-blur">
          Bienvenido a Dolphin Hotel
        </h1>
        <p className="text-lg italic text-slate-950 z-30 bg-slate-400/50 px-6 py-1 rounded-2xl backdrop-blur-sm">
          Su destino ideal para confort y lujo
        </p>
      </header>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">
          Descubre nuestras habitaciones
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          tenetur dolorum eligendi totam dolore blanditiis, aliquid perspiciatis
          accusamus alias placeat omnis illum ex repellat minus dolor quis
          quidem. Nihil, deserunt?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          tenetur dolorum eligendi totam dolore blanditiis, aliquid perspiciatis
          accusamus alias placeat omnis illum ex repellat minus dolor quis
          quidem. Nihil, deserunt?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          tenetur dolorum eligendi totam dolore blanditiis, aliquid perspiciatis
          accusamus alias placeat omnis illum ex repellat minus dolor quis
          quidem. Nihil, deserunt?
        </p>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Ofertas especiales</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          tenetur dolorum eligendi totam dolore blanditiis, aliquid perspiciatis
          accusamus alias placeat omnis illum ex repellat minus dolor quis
          quidem. Nihil, deserunt?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          tenetur dolorum eligendi totam dolore blanditiis, aliquid perspiciatis
          accusamus alias placeat omnis illum ex repellat minus dolor quis
          quidem. Nihil, deserunt?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          tenetur dolorum eligendi totam dolore blanditiis, aliquid perspiciatis
          accusamus alias placeat omnis illum ex repellat minus dolor quis
          quidem. Nihil, deserunt?
        </p>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">
          Explora atracciones locales
        </h2>
        {/* Display information about nearby attractions */}
      </section>

      <footer className="my-8 text-center">
        <p className="text-lg">Contact Us for Reservations:</p>
        <p className="text-gray-600">
          Email: info@[hotelname].com | Phone: [hotel contact number]
        </p>
      </footer>

      {/* Navigation Links */}
      <nav className="flex justify-center space-x-4">
        <Link to="/rooms" className="text-blue-500 hover:underline">
          View Our Rooms
        </Link>
        <Link to="/offers" className="text-blue-500 hover:underline">
          Special Offers
        </Link>
        <Link to="/attractions" className="text-blue-500 hover:underline">
          Local Attractions
        </Link>
        <Link to="/contact" className="text-blue-500 hover:underline">
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Home;
