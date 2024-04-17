import Container from "@/components/Container";
import TransferLookUp from "@/components/transferLookup/TransferLookup";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div className="items-center">
          <TransferLookUp/>
        </div>
      </Container>
    </div>
  );
}
