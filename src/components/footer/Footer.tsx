import Image from "next/image";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-sm my--16">
      <Container>
        <div className="
            flex 
            flex-col 
            sm:flex-row
            justify-between
            pt-4
            pb-2
            items-center
            "
        >
            <Image 
                src="/icon.svg" 
                alt="THA Logo"
                width={25}
                height={25}
            />
            <p className="font-semibold">
                {" "}
                The Hashgraph Association {new Date().getFullYear()}
            </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
