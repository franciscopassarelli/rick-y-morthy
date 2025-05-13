 
import React, { useState, useEffect } from 'react';
import { useCharacters } from '../context/CharacterContext';
import { Character, api } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import CharacterDetails from '../components/CharacterDetails';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, selectCharacter } = useCharacters();
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  useEffect(() => {
    if (favorites.length > 0) {
      fetchFavoriteCharacters();
    }
  }, [favorites]);
  
  const fetchFavoriteCharacters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const characterPromises = favorites.map(id => api.getCharacter(id));
      const characters = await Promise.all(characterPromises);
      setFavoriteCharacters(characters);
    } catch (err) {
      setError(`Error al cargar personajes favoritos: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCharacterClick = (character: Character) => {
    selectCharacter(character);
    setDetailsOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo size="small" />
          <div className="flex space-x-4">
            <Link to="/characters" className="text-sm text-muted-foreground hover:text-foreground">
              Ver todos los personajes
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Volver al inicio
            </Link>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Tus personajes favoritos</h1>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rickgreen"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-xl font-medium text-red-500 mb-2">Oh no!</div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : favoriteCharacters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteCharacters.map(character => (
              <CharacterCard 
                key={character.id} 
                character={character} 
                onClick={() => handleCharacterClick(character)} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-xl font-medium mb-2">No tienes favoritos</div>
            <p className="text-muted-foreground mb-4">Agrega personajes a favoritos haciendo clic en el corazón</p>
            <Link 
              to="/characters" 
              className="px-4 py-2 bg-rickgreen text-white rounded-md hover:bg-rickgreen-dark"
            >
              Explorar personajes
            </Link>
          </div>
        )}
        
        <CharacterDetails 
          open={detailsOpen} 
          onClose={() => setDetailsOpen(false)} 
        />
      </div>
    </div>
  );
}; 

export default Favorites;
