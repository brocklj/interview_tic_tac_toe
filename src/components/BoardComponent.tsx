import * as React from "react";
import { Board } from "../utils/BoardValidator/Board";
import { CellEnum } from "../common-types/Cell.d";

export function BoardComponent(props: {
  board: Board | null;
  onCellClick: (posX: number, posY: number) => void;
}) {
  const { board, onCellClick } = props;

  return (
    <>
      <div>
        {board?.value.map((row, x) => (
          <div
            key={`${x}`}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {row.map((cell, y) => (
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
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
