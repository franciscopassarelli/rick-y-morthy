import React from 'react';
import Logo from '../components/Logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-8 py-16 text-white overflow-hidden isolate">
      {/* Fondo con imagen + gradiente */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/rik.png')`,
        }}
      />

      {/* Contenido principal */}
      <div className="max-w-3xl mx-auto text-center">
       
<img src="/rick.png" alt="" />
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg mb-4">
          Bienvenido a Rick and Morty
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Explora el multiverso de Rick and Morty, descubre personajes y sus detalles, marca tus favoritos y filtra por características.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button
  asChild
  size="lg"
  className="w-[119px] h-[44px] bg-[#8BC547] hover:bg-[#76aa3e] text-white font-bold rounded-xl shadow-lg"
>
  <Link to="/characters">Comenzar</Link>
</Button>

       
        </div>
      </div>
    </div>
  );
};

export default Index;

