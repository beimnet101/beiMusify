import { twMerge } from "tailwind-merge";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    const classes = twMerge(`
        bg-neutral-900
        rounded-lg
        h-fit
        w-full
        ${className || ''}
    `);

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Box;
