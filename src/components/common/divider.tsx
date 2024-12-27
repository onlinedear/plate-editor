type DividerProps = {
  direction?: 'horizontal' | 'vertical';
} & React.HTMLAttributes<HTMLDivElement>;

const Divider = ({ direction = 'horizontal', ...props }: DividerProps) => {
  if (direction === 'vertical') {
    return (
      <div className="w-[1px] h-auto bg-border mx-1 my-1" {...props}></div>
    );
  }
  return <div className="w-auto h-[1px] bg-border mx-1 my-1" {...props}></div>;
};

export default Divider;
