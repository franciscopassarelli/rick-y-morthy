
// Define TypeScript interfaces for API responses
export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface FilterOptions {
  name?: string;
  status?: "alive" | "dead" | "unknown" | "";
  species?: string;
  type?: string;
  gender?: "female" | "male" | "genderless" | "unknown" | "";
}

const API_BASE_URL = "https://rickandmortyapi.com/api";

export const api = {
  // Fetch characters with optional filters
  async getCharacters(page = 1, filters: FilterOptions = {}): Promise<ApiResponse<Character>> {
    // Build query parameters
    const params = new URLSearchParams({ page: page.toString() });
    
    // Add filters if they exist
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await fetch(`${API_BASE_URL}/character?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Fetch a single character by ID
  async getCharacter(id: number): Promise<Character> {
    const response = await fetch(`${API_BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Fetch episodes
  async getEpisodes(page = 1): Promise<ApiResponse<Episode>> {
    const response = await fetch(`${API_BASE_URL}/episode?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Fetch a single episode
  async getEpisode(id: number): Promise<Episode> {
    const response = await fetch(`${API_BASE_URL}/episode/${id}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Fetch multiple episodes by IDs
  async getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
    const response = await fetch(`${API_BASE_URL}/episode/${ids.join(',')}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    // If only one episode is returned, wrap it in an array
    return Array.isArray(data) ? data : [data];
  },
  
  // Helper function to extract episode ID from URL
  getEpisodeIdFromUrl(url: string): number {
    const match = url.match(/\/episode\/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
  }
};
