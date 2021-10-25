import { createReducer } from '@reduxjs/toolkit';
import { resetActivePlayer, switchActivePlayer } from '../actions/playersActions';
import Player from '../models/Player';

type PlayersMap = { [key: number]: Player };

const getActivePlayerId = (players: PlayersMap, prevValue?: number) => {
  const sortedPlayers = Object.values(players)
    .sort((a, b) => a.id - b.id)
    .sort((a, b) => a.order - b.order);

  if (!prevValue) {
    return sortedPlayers[0].id;
  }

  const findNextActivePlayer = (mapFn: (player: Player) => number) => {
    return sortedPlayers.find(player => mapFn(player) > mapFn(players[prevValue]));
  };

  const nextActivePlayer = findNextActivePlayer(player => player.order) ?? findNextActivePlayer(player => player.id);

  return (nextActivePlayer ?? sortedPlayers[0]).id;
};

const playersArr = [
  new Player({ colorClass: 'text-warning' }),
  new Player({ colorClass: 'text-danger' }),
  // more players can be added
];

const players: PlayersMap = {};

playersArr.forEach(player => {
  players[player.id] = player;
});

const initialState = {
  activePlayerId: getActivePlayerId(players),
  players,
};

const playersReducer = createReducer(initialState, builder => {
  builder.addCase(resetActivePlayer, state => {
    state.activePlayerId = getActivePlayerId(state.players);
  });

  builder.addCase(switchActivePlayer, state => {
    const { activePlayerId, players } = state;

    state.activePlayerId = getActivePlayerId(players, activePlayerId);
  });
});

export default playersReducer;
