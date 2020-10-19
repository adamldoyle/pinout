import { createContext, useState, useCallback } from 'react';
import allChips from '../../chips.json';

const FavoritesContext = createContext({
  favorites: {},
  toggleFavorite: (chipName) => null,
  isFavorite: (chipName) => false,
});

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState(() =>
    allChips.reduce((acc, chip) => {
      acc[chip.name] = false;
      return acc;
    }, {}),
  );

  const toggleFavorite = useCallback((chipName) => {
    setFavorites((prev) => ({
      ...prev,
      [chipName]: !prev[chipName],
    }));
  }, []);

  const isFavorite = useCallback((chipName) => favorites[chipName], [
    favorites,
  ]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
