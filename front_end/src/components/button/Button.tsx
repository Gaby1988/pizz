import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

export function Button(props: ButtonProps) {
  const { children, handleClick } = props;
  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}
