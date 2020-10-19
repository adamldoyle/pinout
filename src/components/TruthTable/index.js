import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';

const useStyles = makeStyles({
  table: {
    width: 'auto',
  },
  headerColumn: {
    borderBottom: '1px solid black',
  },
  leftBorder: {
    borderLeft: '1px solid black',
  },
});

function buildCellValue(cell) {
  if (typeof cell === 'object') {
    return (
      <span style={{ textDecoration: cell.negate ? 'overline' : 'none' }}>
        {cell.value}
      </span>
    );
  }
  return cell;
}

export default function TruthTable({ headers, data }) {
  const classes = useStyles();
  const dataCopy = data.map((row) => [...row]);
  return (
    <Table className={classes.table} size="small" aria-label="truth table">
      <TableHead>
        <TableRow>
          {headers.map((section, idx) => (
            <TableCell
              key={section.label}
              colSpan={section.cells.length}
              align="center"
              className={idx !== 0 ? classes.leftBorder : null}
            >
              {buildCellValue(section)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          {headers.map((section, sectionIdx) =>
            section.cells.map((cell, idx) => (
              <TableCell
                key={cell}
                align="center"
                className={clsx(
                  classes.headerColumn,
                  sectionIdx !== 0 && idx === 0 ? classes.leftBorder : null,
                )}
              >
                {buildCellValue(cell)}
              </TableCell>
            )),
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIdx) => (
          <TableRow key={JSON.stringify(row)} hover>
            {headers.map((section, sectionIdx) =>
              section.cells.map((cell, idx) => (
                <TableCell
                  key={cell}
                  align="center"
                  className={
                    sectionIdx !== 0 && idx === 0 ? classes.leftBorder : null
                  }
                >
                  {buildCellValue(dataCopy[rowIdx].shift())}
                </TableCell>
              )),
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
