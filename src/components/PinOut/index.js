import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';

const chipBorder = '1px solid black';

const ChipPositions = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
};

const useStyles = makeStyles({
  pinMiddle: {
    width: '20px',
  },
  pinTop: {
    borderTop: chipBorder,
  },
  pinBottom: {
    borderBottom: chipBorder,
  },
  pinLeft: {
    borderLeft: chipBorder,
    paddingLeft: '10px',
  },
  pinRight: {
    borderRight: chipBorder,
    textAlign: 'right',
    paddingRight: '10px',
  },
  pinNumber: {
    fontSize: '.8em',
    width: '20px',
    color: '#777',
  },
  pinName: {
    fontSize: '1.2em',
  },
  leftPinName: {
    textAlign: 'right',
  },
  rightPinName: {
    textAlign: 'left',
  },
  notch: {
    width: '20px',
    height: '10px',
    margin: '0 auto',
    border: chipBorder,
    borderTop: 'none',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
  },
});

function buildPinName(pin, position) {
  let name = pin.name;
  if (pin.description) {
    if (position === ChipPositions.LEFT) {
      name = `•${name}`;
    } else {
      name = `${name}•`;
    }
  }

  const nameElm = !pin.negate ? (
    <span>{name}</span>
  ) : (
    <span style={{ textDecoration: 'overline' }}>{name}</span>
  );
  return pin.description ? (
    <Tooltip title={pin.description} aria-label="info">
      {nameElm}
    </Tooltip>
  ) : (
    nameElm
  );
}

export default function PinOut({ pins }) {
  const classes = useStyles();

  const height = pins.length / 2;
  const leftPins = pins.slice(0, height);
  const rightPins = pins.slice(height).reverse();

  const chipBorderClasses = (index, height, position) => {
    const borderClasses = [];
    if (index === height - 1) {
      borderClasses.push(classes.pinBottom);
    }
    if (position === ChipPositions.LEFT) {
      borderClasses.push(classes.pinLeft);
    }
    if (position === ChipPositions.RIGHT) {
      borderClasses.push(classes.pinRight);
    }
    return borderClasses;
  };

  return (
    <table cellSpacing="0" cellPadding="0">
      <tbody>
        <tr>
          <td></td>
          <td className={clsx(classes.pinTop, classes.pinLeft)}></td>
          <td className={classes.pinTop}>
            <div className={classes.notch}></div>
          </td>
          <td className={clsx(classes.pinTop, classes.pinRight)}></td>
          <td></td>
        </tr>
        {leftPins.map((leftPin, pinIndex) => (
          <tr key={pinIndex}>
            <td className={clsx(classes.pinName, classes.leftPinName)}>
              {buildPinName(leftPin, ChipPositions.LEFT)} &mdash;
            </td>
            <td
              className={clsx(
                classes.pinNumber,
                ...chipBorderClasses(pinIndex, height, ChipPositions.LEFT),
              )}
            >
              {pinIndex + 1}
            </td>
            <td
              className={clsx(
                classes.pinMiddle,
                ...chipBorderClasses(pinIndex, height, ChipPositions.MIDDLE),
              )}
            ></td>
            <td
              className={clsx(
                classes.pinNumber,
                ...chipBorderClasses(pinIndex, height, ChipPositions.RIGHT),
              )}
            >
              {pins.length - pinIndex}
            </td>
            <td className={clsx(classes.pinName, classes.rightPinName)}>
              &mdash; {buildPinName(rightPins[pinIndex], ChipPositions.RIGHT)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
