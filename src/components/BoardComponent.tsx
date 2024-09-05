import { Board } from "../utils/BoardValidator/Board";
import { BoardCell } from "./BoardCell";

export function BoardComponent(props: {
  board: Board | null;
  onCellClick: (posX: number, posY: number) => void;
}) {
  const { board, onCellClick } = props;

  return (
    <>
      {board?.value.map((row, x) => (
        <div
          key={`${x}`}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {row.map((cell, y) => (
            <BoardCell key={y} cell={cell} x={x} y={y} onCellClick={onCellClick} />
          ))}
        </div>
      ))}
    </>
  );
}
