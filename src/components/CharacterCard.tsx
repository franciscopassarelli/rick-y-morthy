 
import React from 'react';
import { Character } from '../services/api';
import { useCharacters } from '../context/CharacterContext';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const { favorites, toggleFavorite } = useCharacters();
  const isFavorite = favorites.includes(character.id);

  const getStatusBadgeClass = () => {
    switch (character.status.toLowerCase()) {
      case 'alive': return 'status-badge alive';
      case 'dead': return 'status-badge dead';
      default: return 'status-badge unknown';
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(character.id);
  };

  return (
    <div 
      className="character-card-hover bg-card rounded-lg shadow-md overflow-hidden cursor-pointer relative"
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={character.image} 
          alt={character.name} 
          className="w-full h-full object-cover"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/70 hover:bg-white/90 rounded-full p-1"
          onClick={handleFavoriteClick}
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
          />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{character.name}</h3>
        <div className="flex flex-col space-y-1 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Last known location:</span>
          </div>
          <div className="font-medium text-foreground truncate">{character.location.name}</div>
          
          <div className="flex items-center justify-between mt-1">
            <span>First seen in:</span>
          </div>
          <div className="font-medium text-foreground truncate">Story Origin</div>
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span className={getStatusBadgeClass()}>{character.status}</span>
      </div>
    </div>
  );
};

export default CharacterCard;
