const Wrap = ({children }: {children: React.ReactNode}) => {
    return ( 
        <div className="
      min-h-fit
      h-full
      flex
      items-center
      justify-center
      pb-4
      pt-4
      ">
        <div className="max-w-[650px]
        w-full
        flex
        flex-col
        gap-6
        items-center
        p-4
        md:p-8
        ">
          {children}
          </div>
      </div>
     );
}
 
export default Wrap;