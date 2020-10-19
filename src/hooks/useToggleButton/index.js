import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    backgroundColor: '#f8f8f8',
  },
}));

export default function useToggleButton(icon, buttonClass, label) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const handleClick = () => {
    toggleExpanded();
  };

  const button = (
    <Tooltip title={label} aria-label={label}>
      <IconButton
        className={clsx(buttonClass, classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleClick}
        aria-expanded={expanded}
        aria-label={label}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );

  return { button, expanded, toggleExpanded, setExpanded };
}
