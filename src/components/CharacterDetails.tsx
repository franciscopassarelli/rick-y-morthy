
import React, { useEffect, useState } from 'react';
import { useCharacters } from '../context/CharacterContext';
import { Character, Episode, api } from '../services/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';

interface CharacterDetailsProps {
  open: boolean;
  onClose: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ open, onClose }) => {
  const { selectedCharacter, toggleFavorite, favorites } = useCharacters();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  const isFavorite = selectedCharacter ? favorites.includes(selectedCharacter.id) : false;
  
  useEffect(() => {
    if (selectedCharacter) {
      fetchEpisodes(selectedCharacter);
    }
  }, [selectedCharacter]);

  const fetchEpisodes = async (character: Character) => {
    setLoading(true);
    try {
      // Extract episode IDs from the URLs
      const episodeIds = character.episode.map(url => {
        const match = url.match(/\/episode\/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      }).filter(id => id > 0);
      
      if (episodeIds.length > 0) {
        const episodeData = await api.getMultipleEpisodes(episodeIds);
        setEpisodes(episodeData);
      }
    } catch (error) {
      console.error('Failed to fetch episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (selectedCharacter) {
      toggleFavorite(selectedCharacter.id);
    }
  };

  if (!selectedCharacter) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={selectedCharacter.image} alt={selectedCharacter.name} />
                <AvatarFallback>{selectedCharacter.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{selectedCharacter.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle();
              }}
              className="ml-auto"
            >
              <Heart 
                className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
              />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg">
              <img 
                src={selectedCharacter.image} 
                alt={selectedCharacter.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Información</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Género:</span>
                  <span className="font-medium">{selectedCharacter.gender}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className="font-medium">{selectedCharacter.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Especie:</span>
                  <span className="font-medium">{selectedCharacter.species}</span>
                </div>
                {selectedCharacter.type && (
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="font-medium">{selectedCharacter.type}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Origen:</span>
                  <span className="font-medium">{selectedCharacter.origin.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Ubicación:</span>
                  <span className="font-medium">{selectedCharacter.location.name}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Episodios</h3>
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rickgreen"></div>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {episodes.map(episode => (
                  <div key={episode.id} className="p-3 bg-secondary rounded-md">
                    <div className="font-medium">{episode.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {episode.episode} • {episode.air_date}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="bg-muted p-4 rounded-lg mt-4">
              <h3 className="text-lg font-medium mb-2">Personajes relacionados</h3>
              <div className="text-muted-foreground text-sm">
                Funcionalidad disponible próximamente
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDetails;
