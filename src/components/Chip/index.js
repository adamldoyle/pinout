import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PinDropIcon from '@material-ui/icons/PinDrop';
import NotesIcon from '@material-ui/icons/Notes';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import TableChartIcon from '@material-ui/icons/TableChart';
import useToggleButton from '../../hooks/useToggleButton';
import PinOut from '../PinOut';
import TruthTable from '../TruthTable';
import FavoriteButton from '../FavoriteButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '250px',
  },
  description: {
    minHeight: '40px',
  },
  pinOut: {
    margin: 'auto',
  },
  actionButton: {
    marginRight: '4px',
  },
}));

export default memo(function Chip({ chip }) {
  const classes = useStyles();

  const pinOutExpand = useToggleButton(
    <PinDropIcon />,
    classes.actionButton,
    'show pinout',
  );
  const notesExpand = useToggleButton(
    <NotesIcon />,
    classes.actionButton,
    'show notes',
  );

  const truthTableExpand = useToggleButton(
    <TableChartIcon />,
    classes.actionButton,
    'show truth table',
  );

  const showDatasheet = () => {
    window.open(chip.datasheet);
  };

  const truthTableModalSize = () => {
    if (!chip.truthTable) {
      return 'sm';
    }

    const columnCount = chip.truthTable.headers.reduce(
      (acc, header) => acc + header.cells.length,
      0,
    );

    if (columnCount < 4) {
      return 'xs';
    }
    if (columnCount < 8) {
      return 'sm';
    }
    return 'md';
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        avatar={<FavoriteButton chipName={chip.name} />}
        title={chip.name}
        subheader={chip.alias}
      />
      <CardContent>
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {chip.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {chip.pins && pinOutExpand.button}
        {chip.truthTable && truthTableExpand.button}
        {chip.notes && notesExpand.button}
        {chip.datasheet && (
          <Tooltip title="show datasheet" aria-label="show datasheet">
            <IconButton
              className={classes.actionButton}
              onClick={showDatasheet}
              aria-label="show datasheet"
            >
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
      {chip.pins && pinOutExpand.expanded && (
        <Collapse in={pinOutExpand.expanded} timeout="auto">
          <Box display="flex" pb={2}>
            <Box m="auto">
              <PinOut pins={chip.pins} />
            </Box>
          </Box>
        </Collapse>
      )}
      {chip.truthTable && (
        <Dialog
          onClose={truthTableExpand.toggleExpanded}
          aria-labelledby="customized-dialog-title"
          open={truthTableExpand.expanded}
          maxWidth={truthTableModalSize()}
          fullWidth={true}
        >
          <MuiDialogTitle
            id="customized-dialog-title"
            onClose={truthTableExpand.toggleExpanded}
          >
            {chip.name} - {chip.alias}
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Box display="flex" pb={2}>
              <Box m="auto">
                {truthTableExpand.toggleExpanded && (
                  <TruthTable
                    headers={chip.truthTable.headers}
                    data={chip.truthTable.data}
                  />
                )}
              </Box>
            </Box>
          </MuiDialogContent>
        </Dialog>
      )}
      {chip.notes && (
        <Collapse in={notesExpand.expanded} timeout="auto">
          <CardContent>{chip.notes}</CardContent>
        </Collapse>
      )}
    </Card>
  );
});
