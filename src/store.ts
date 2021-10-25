import { createStore, combineReducers } from 'redux';
import boardReducer from './reducers/boardReducer';
import playersReducer from './reducers/playersReducer';

const reducers = combineReducers({
  board: boardReducer,
  players: playersReducer,
});

const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
