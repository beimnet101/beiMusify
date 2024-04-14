import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, children, disabled, type = "button", ...props },
        ref
    ) => {
        return (
            <button
                className={twMerge('w-full rounded-full bg-green-500 border-transparent 0px-3 py-3 disabled:cursor-not-allowed disabled:opacity-75 text-black font-bold hover:opacity-75 transtion', className)}
                disabled={disabled}
                type={type}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
