import { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';
import Masonry from 'react-masonry-css';
import Chip from '../Chip';
import FavoritesContext from '../../context/FavoritesContext';
import allChips from '../../chips.json';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  search: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  grid: {
    display: 'flex',
    marginLeft: '-20px',
    width: 'auto',
    justifyContent: 'center',
  },
  gridColumn: {
    paddingLeft: '20px',
    backgroundClip: 'padding-box',
    width: '270px !important',
  },
  gridItem: {
    marginBottom: '20px',
  },
  searchField: {
    marginBottom: '20px',
    width: '50%',
  },
});

export default function ChipGrid() {
  const { isFavorite } = useContext(FavoritesContext);
  const [justFavorites, setJustFavorites] = useState(false);
  const [chipVisibility, setChipVisibility] = useState(allChips);
  const [chipSearch, setChipSearch] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const chipSearchLC = chipSearch.toLowerCase();
    setChipVisibility(
      allChips.reduce((acc, chip) => {
        acc[chip.name] =
          (chip.name.toLowerCase().includes(chipSearchLC) ||
            chip.alias.toLowerCase().includes(chipSearchLC)) &&
          (!justFavorites || isFavorite(chip.name));
        return acc;
      }, {}),
    );
  }, [chipSearch, isFavorite, justFavorites]);

  const changeJustFavorites = () => {
    setJustFavorites((prev) => !prev);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.search}>
        <TextField
          className={classes.searchField}
          placeholder="Search"
          value={chipSearch}
          onChange={(evt) => setChipSearch(evt.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          onClick={changeJustFavorites}
          aria-label="change favorite filter"
        >
          {justFavorites ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </Box>

      <Masonry
        breakpointCols={{ default: 3, 855: 2, 570: 1 }}
        className={classes.grid}
        columnClassName={classes.gridColumn}
      >
        {allChips
          .sort((a, b) => {
            if (chipVisibility[a.name] !== chipVisibility[b.name]) {
              return chipVisibility[a.name] ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
          })
          .map((chip) => (
            <Box
              key={chip.name}
              className={classes.gridItem}
              display={chipVisibility[chip.name] ? 'block' : 'none'}
            >
              <Chip chip={chip} />
            </Box>
          ))}
      </Masonry>
    </Box>
  );
}
