import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { dropCoin } from '../actions/boardActions';
import { resetActivePlayer, switchActivePlayer } from '../actions/playersActions';

const Board = () => {
  const { board, coinsCount, filledCols, winnerId } = useSelector((state: RootState) => state.board);
  const { activePlayerId, players } = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(!coinsCount ? resetActivePlayer() : switchActivePlayer());
  }, [coinsCount, dispatch]);

  const getCoinClassName = (playerId: number): string => {
    switch (playerId) {
      case 0:
        return '';
      case Infinity:
        return `${players[winnerId as number].colorClass} animation-flick`;
      default:
        return `${players[playerId].colorClass} board__coin_dropped`;
    }
  };

  return (
    <div className={`position-relative ${winnerId ? 'pointer-events-none' : ''}`}>
      <div className="board">
        {board.map((row, x) => (
          <div
            key={x}
            className="board__col"
          >
            {row.map((playerId, y) => (
              <div
                key={y}
                className="board__item"
              >
                <div
                  className={`board__coin ${getCoinClassName(playerId)}`}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="board board_front">
        {board.map((row, x) => (
          <div
            key={x}
            className={`board__col ${filledCols[x] ? 'board__col_filled' : ''}`}
          >
            {row.map((_, y) => (
              <div
                key={y}
                className="board__item"
                onClick={() => dispatch(dropCoin(x, activePlayerId))}
              >
                <div className="board__hole"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
