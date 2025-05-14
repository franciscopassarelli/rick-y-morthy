
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, Character, ApiResponse, FilterOptions } from "../services/api";
import { useToast } from "@/components/ui/use-toast";

interface CharacterContextProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  filters: FilterOptions;
  favorites: number[];
  selectedCharacter: Character | null;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: FilterOptions) => void;
  toggleFavorite: (id: number) => void;
  selectCharacter: (character: Character | null) => void;
  loadCharacters: () => Promise<void>;
  filteredCount: number;
}

const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCount, setFilteredCount] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const { toast } = useToast();

  const loadCharacters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data: ApiResponse<Character> = await api.getCharacters(currentPage, filters);
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setFilteredCount(data.info.count);
    } catch (err) {
      setError(`Failed to load characters: ${err instanceof Error ? err.message : 'Unknown error'}`);
      toast({
        title: "Error",
        description: "Failed to load characters. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, [currentPage, filters]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("rickAndMortyFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rickAndMortyFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectCharacter = (character: Character | null) => {
    setSelectedCharacter(character);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        loading,
        error,
        totalPages,
        currentPage,
        filters,
        favorites,
        selectedCharacter,
        filteredCount,
        setCurrentPage,
        setFilters,
        toggleFavorite,
        selectCharacter,
        loadCharacters
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacters = (): CharacterContextProps => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacters must be used within a CharacterProvider");
  }
  return context;
};
 