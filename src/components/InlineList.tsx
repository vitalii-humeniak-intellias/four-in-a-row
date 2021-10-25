import React from 'react';
import IBaseItem from '../models/BaseItem';

interface IProps<T> {
  items: T[];
  itemClassNameFn?: (item: T) => string;
  isItemActiveFn?: (item: T) => boolean;
}

const InlineList = <T extends IBaseItem>(props: IProps<T>) => {
  const { items, itemClassNameFn, isItemActiveFn } = props;

  const getItemClassName = (item: T): string => {
    const classList = ['col-auto'];

    if (itemClassNameFn) {
      classList.push(itemClassNameFn(item));
    }

    if (isItemActiveFn && isItemActiveFn(item)) {
      classList.push('fw-bold');
    }

    return classList.join(' ');
  };

  return (
    <div className="row">
      {items.map(item => (
        <div
          key={item.id}
          className={getItemClassName(item)}
        >{item.name}</div>
      ))}
    </div>
  );
};

export default InlineList;
