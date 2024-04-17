interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
    max-w-[1920px]
    mx-auto
    xl:px-10
    md:px-8
    px-4
    items-center
    "
    >
      {children}
    </div>
  );
};

export default Container;
