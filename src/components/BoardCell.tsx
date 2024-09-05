import { CellEnum, CellType } from "../common-types/Cell.d";

export function BoardCell(props: {
  x: number;
  y: number;
  cell: CellType;
  onCellClick: (x: number, y: number) => void;
}) {
  const { x, y, cell, onCellClick } = props;

  return (
    <a
      key={`${x};${y}`}
      style={{
        color: `${cell == CellEnum.X ? "green" : "red"}`,
        width: "1.5rem",
        height: "1.5rem",
        border: "#571b1b solid 1px",
        cursor: "pointer",
      }}
      id={`${x}|${y}`}
      href={`#${x};${y}`}
      onClick={() => {
        // TODO: Disable pointer cursor
        // TODO: move this click handling condition higher
        if (cell == CellEnum.empty) {
          onCellClick(x, y);
        }
      }}
    >
      {cell}
    </a>
  );
}
