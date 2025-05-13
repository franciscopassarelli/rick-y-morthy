
import React, { useState } from 'react';
import { FilterOptions } from '../services/api';
import { useCharacters } from '../context/CharacterContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Filters: React.FC = () => {
  const { filters, setFilters, filteredCount } = useCharacters();
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handler for status filter chips
  const handleStatusFilter = (status: FilterOptions['status']) => {
    const newFilters = { ...filters };
    
    if (filters.status === status) {
      // Toggle off if clicked on the same status
      newFilters.status = '';
    } else {
      // Set the clicked status
      newFilters.status = status;
    }
    
    setFilters(newFilters);
  };

  // Handler for name search
  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalFilters(prev => ({ ...prev, name: value }));
  };

  // Apply filters from search
  const applyNameFilter = () => {
    if (localFilters.name !== filters.name) {
      setFilters({ ...filters, name: localFilters.name || '' });
    }
  };

  // Apply search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyNameFilter();
    }
  };

  // Apply advanced filters
  const applyAdvancedFilters = () => {
    setFilters(localFilters);
    setIsDialogOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setLocalFilters({});
    setFilters({});
    setIsDialogOpen(false);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <div className="relative flex-1 w-full md:max-w-md">
          <Input
            type="text"
            placeholder="Buscar personajes por nombre"
            value={localFilters.name || ''}
            onChange={handleNameSearch}
            onKeyPress={handleKeyPress}
            className="pr-12"
          />
          <Button
            onClick={applyNameFilter}
            size="sm"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            Buscar
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Filtros avanzados</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filtros avanzados</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Gender Filter */}
              <div>
                <h3 className="mb-2 font-medium">Género</h3>
                <RadioGroup
                  value={localFilters.gender || ''}
                  onValueChange={(value: string) => 
                    setLocalFilters(prev => ({ 
                      ...prev, 
                      gender: value as FilterOptions['gender'] 
                    }))
                  }
                  className="flex flex-wrap gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Femenino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="genderless" id="genderless" />
                    <Label htmlFor="genderless">Sin género</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unknown" id="unknown-gender" />
                    <Label htmlFor="unknown-gender">Desconocido</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Species Filter */}
              <div>
                <h3 className="mb-2 font-medium">Especie</h3>
                <Input
                  type="text"
                  placeholder="Especie (ej: Human, Alien)"
                  value={localFilters.species || ''}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, species: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={resetFilters}>
                Limpiar filtros
              </Button>
              <Button onClick={applyAdvancedFilters}>
                Aplicar filtros
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div 
          className={`filter-chip ${filters.status === 'alive' ? 'active' : ''}`}
          onClick={() => handleStatusFilter('alive')}
        >
          Vivo
        </div>
        <div 
          className={`filter-chip ${filters.status === 'dead' ? 'active' : ''}`}
          onClick={() => handleStatusFilter('dead')}
        >
          Muerto
        </div>
        <div 
          className={`filter-chip ${filters.status === 'unknown' ? 'active' : ''}`}
          onClick={() => handleStatusFilter('unknown')}
        >
          Desconocido
        </div>
      </div>

      {/* Results counter */}
      <div className="text-sm text-muted-foreground">
        {filteredCount} personajes encontrados
      </div>
    </div>
  );
};

export default Filters;
