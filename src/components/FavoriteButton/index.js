import { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoritesContext from '../../context/FavoritesContext';

export default function FavoriteButton({ chipName }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const favorited = isFavorite(chipName);

  const changeFavorite = () => {
    toggleFavorite(chipName);
  };

  return (
    <IconButton onClick={changeFavorite} aria-label="change favorite status">
      {favorited ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
}
