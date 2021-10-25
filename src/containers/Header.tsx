import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetBoard } from '../actions/boardActions';
import Button from '../components/Button';
import InlineList from '../components/InlineList';
import { MAX_COINS_COUNT } from '../constants';
import Player from '../models/Player';
import { RootState } from '../store';

const Header = () => {
  const { coinsCount, winnerId } = useSelector((state: RootState) => state.board);
  const { activePlayerId, players } = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();

  const winner = winnerId && players[winnerId];
  const isDraw = coinsCount >= MAX_COINS_COUNT;

  return (
    <div className="row align-items-center">
      <div className="col-4">
        <InlineList<Player>
          items={Object.values(players)}
          itemClassNameFn={player => player.colorClass}
          isItemActiveFn={player => !winner && !isDraw && player.id === activePlayerId}
        />
      </div>
      <div className="col-4 text-center fs-5">
        {winner ? (
          <Fragment>
            Winner: <strong className={`d-inline-block ${winner.colorClass}`}>{winner.name}</strong>
          </Fragment>
        ) : isDraw && 'Draw'}
      </div>
      <div className="col-auto ms-auto">
        <Button
          className={!coinsCount ? 'invisible' : ''}
          onClick={() => dispatch(resetBoard())}
        >Restart game</Button>
      </div>
    </div>
  );
};

export default Header;
