import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! Página não encontrada</p>
        <a href="/" className="text-ondor-primary hover:text-ondor-primary/80 font-semibold transition-colors">
          Voltar para a Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
