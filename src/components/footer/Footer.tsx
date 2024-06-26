import Image from "next/image";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-greyCool-100 text-sm my--16">
      <Container>
        <div
          className="
            flex 
            flex-col 
            sm:flex-row
            justify-between
            pt-4
            pb-2
            "
        >
          <div className="flex items-center">
            <Image src="/icon.svg" alt="THA Logo" width={25} height={25} />
            <p className="font-semibold">
              {" "}
              The Hashgraph Association {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
