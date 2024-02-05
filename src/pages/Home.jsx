import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold">Bienvenido a Dolphin Hotel</h1>
        <p className="text-lg text-gray-600">
          Su destino ideal para confort y lujo
        </p>
      </header>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Descubre nuestras habitaciones</h2>
        {/* Add room components or display relevant information here */}
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Ofertas especiales</h2>
        {/* Display any special offers or promotions */}
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
