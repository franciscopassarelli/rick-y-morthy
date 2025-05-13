 import React from 'react';
import Logo from '../components/Logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
        {/* Fondo Rick and Morty */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://wallpapercave.com/wp/wp2783339.jpg')] bg-cover bg-center mix-blend-soft-light opacity-50"></div>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="max-w-3xl mx-auto z-10">
          <Logo size="large" className="mb-6" />

          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Bienvenido a Rick and Morty
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explora el multiverso de Rick and Morty, descubre personajes y sus detalles, marca tus favoritos y filtra por características.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 shadow-lg"
            >
              <Link to="/characters">Explorar personajes</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-black hover:bg-black/10 shadow-md"
            >
              <Link to="/favorites">Ver favoritos</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Index;
