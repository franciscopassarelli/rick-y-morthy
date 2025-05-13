
import React, { useState } from 'react';
import { useCharacters } from '../context/CharacterContext';
import CharacterCard from '../components/CharacterCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import CharacterDetails from '../components/CharacterDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

const Characters = () => {
  const { characters, loading, error, favorites } = useCharacters();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('todos');
  
  // Handle selecting a character
  const handleCharacterClick = (character) => {
    selectCharacter(character);
    setDetailsOpen(true);
  };
  
  const { selectCharacter } = useCharacters();
  
  // Filter characters for favorites tab
  const favoriteCharacters = characters.filter(character => 
    favorites.includes(character.id)
  );
  
  // Display content based on the active tab
  const getDisplayedCharacters = () => {
    return activeTab === 'favoritos' ? favoriteCharacters : characters;
  };
  
  // Show loading state
  if (loading && characters.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Logo size="small" />
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Volver al inicio
            </Link>
          </div>
          
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rickgreen"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error && characters.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Logo size="small" />
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Volver al inicio
            </Link>
          </div>
          
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-xl font-medium text-red-500 mb-2">Oh no!</div>
            <p className="text-muted-foreground">¡Pareces perdido en tu viaje!</p>
            <button 
              className="mt-4 px-4 py-2 bg-rickgreen text-white rounded-md hover:bg-rickgreen-dark"
              onClick={() => window.location.reload()}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo size="small" />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Volver al inicio
          </Link>
        </div>
        
        <Tabs 
          defaultValue="todos" 
          className="mb-8"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos">
            <Filters />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map(character => (
                <CharacterCard 
                  key={character.id} 
                  character={character} 
                  onClick={() => handleCharacterClick(character)} 
                />
              ))}
            </div>
            
            {characters.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-xl font-medium mb-2">Oh no!</div>
                <p className="text-muted-foreground">No se encontraron personajes con esos filtros</p>
                <button 
                  className="mt-4 px-4 py-2 bg-rickgreen text-white rounded-md hover:bg-rickgreen-dark"
                  onClick={() => window.location.reload()}
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <Pagination />
            )}
          </TabsContent>
          
          <TabsContent value="favoritos">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteCharacters.map(character => (
                <CharacterCard 
                  key={character.id} 
                  character={character} 
                  onClick={() => handleCharacterClick(character)} 
                />
              ))}
            </div>
            
            {favoriteCharacters.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-xl font-medium mb-2">No tienes favoritos</div>
                <p className="text-muted-foreground">Agrega personajes a favoritos haciendo clic en el corazón</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <CharacterDetails 
          open={detailsOpen} 
          onClose={() => setDetailsOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Characters;
 