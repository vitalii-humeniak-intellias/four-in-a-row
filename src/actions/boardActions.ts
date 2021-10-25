import { createAction } from '@reduxjs/toolkit';

export const resetBoard = createAction('RESET_BOARD');

export const dropCoin = createAction('DROP_COIN', (x: number, playerId: number) => ({
  payload: { x, playerId },
}));
