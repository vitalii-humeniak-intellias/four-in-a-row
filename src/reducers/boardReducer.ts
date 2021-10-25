import { createReducer } from '@reduxjs/toolkit';
import { dropCoin, resetBoard } from '../actions/boardActions';
import { COLS, ROWS, WIN_COINS_COUNT } from '../constants';
import IBoard from '../models/Board';
import ICoordinates from '../models/Coordinates';

const getBoard = (): IBoard => {
  return Array.from({ length: COLS }, () => {
    return Array.from({ length: ROWS }, () => 0);
  });
};

const getDirectionWinCoordinates = (
  board: IBoard,
  playerId: number,
  coordinates: ICoordinates,
  conditionFn: (coordinates: ICoordinates) => boolean,
  mapFn: (coordinates: ICoordinates) => ICoordinates
): ICoordinates[] | undefined => {
  let result: ICoordinates[] = [];

  while (conditionFn(coordinates)) {
    const { x, y } = coordinates;
    const col = board[x];

    if (col && col[y] === playerId) {
      result.push(coordinates);

      if (result.length >= WIN_COINS_COUNT) {
        return result;
      }
    } else {
      result = [];
    }

    coordinates = mapFn(coordinates);
  }
};

const getWinCoordinates = (board: IBoard, x: number, y: number): ICoordinates[] | undefined => {
  const playerId = board[x][y];
  const c = WIN_COINS_COUNT - 1;
  const fromX = x - c;
  const toX = x + c;
  const fromY = y - c;
  const toY = y + c;

  const _getDirectionWinCoordinates = getDirectionWinCoordinates.bind(undefined, board, playerId);

  const paramsArr: Parameters<typeof _getDirectionWinCoordinates>[] = [
    [
      { x: fromX, y },
      ({ x }) => x <= toX,
      ({ x, y }) => ({ x: x + 1, y }),
    ],
    [
      { x, y: fromY },
      ({ y }) => y <= toY,
      ({ x, y }) => ({ x, y: y + 1 }),
    ],
    [
      { x: fromX, y: fromY },
      ({ x, y }) => x <= toX && y <= toY,
      ({ x, y }) => ({ x: x + 1, y: y + 1 }),
    ],
    [
      { x: fromX, y: toY },
      ({ x, y }) => x <= toX && y >= fromY,
      ({ x, y }) => ({ x: x + 1, y: y - 1 }),
    ],
  ];

  for (let params of paramsArr) {
    const result = _getDirectionWinCoordinates(...params);

    if (result) {
      return result;
    }
  }
};

const initialState = {
  board: getBoard(),
  coinsCount: 0,
  filledCols: {} as { [key: number]: boolean },
  winnerId: undefined as number | undefined,
};

const boardReducer = createReducer(initialState, builder => {
  builder.addCase(resetBoard, state => {
    state.board = getBoard();
    state.coinsCount = 0;
    state.filledCols = {};
    state.winnerId = undefined;
  });

  builder.addCase(dropCoin, (state, action) => {
    const { x, playerId } = action.payload;

    const y = state.board[x].findIndex((_, _y, col) => {
      const nextValue = col[_y + 1];

      return nextValue === undefined || nextValue > 0;
    });

    state.board[x][y] = playerId;
    state.coinsCount++;

    if (!y) {
      state.filledCols[x] = true;
    }

    const winCoordinates = getWinCoordinates(state.board, x, y);

    if (winCoordinates) {
      winCoordinates.forEach(({ x, y }) => {
        state.board[x][y] = Infinity;
      });

      state.winnerId = playerId;
    }
  });
});

export default boardReducer;
