import React, { SyntheticEvent } from 'react';

interface IProps {
  className?: string;
  onClick: (event: SyntheticEvent) => void;
  children: string;
}

const Button = (props: IProps) => {
  const { className, onClick, children } = props;

  return (
    <button
      type="button"
      className={`btn btn-sm btn-primary ${className ?? ''}`}
      onClick={onClick}
    >{children}</button>
  );
}

export default Button;
