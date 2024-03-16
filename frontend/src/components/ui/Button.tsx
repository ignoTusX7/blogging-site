import { MouseEventHandler } from "react";

type TType = "submit" | "reset" | "button" | undefined;

interface IButtonProps {
  label: string;
  type?: TType;
  className?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = ({
  label,
  className,
  type,
  handleClick,
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 duration-150`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
