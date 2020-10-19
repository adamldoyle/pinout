import { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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
    <Tooltip title="change favorite status" aria-label="change favorite status">
      <IconButton onClick={changeFavorite} aria-label="change favorite status">
        {favorited ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}
