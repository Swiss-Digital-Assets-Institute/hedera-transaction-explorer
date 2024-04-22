import Container from "@/components/Container";
import DisplayTransaction from "./DisplayTransactions";

const TransactionsPage = () => {
    return ( 
        <div className="p-8">
            <Container>
                <div className="
                    flex
                    items-center
                    font-bold
                    text-2xl
                    md:text-3xl
                    lg:text-4xl
                    text-center
                    pb-4
                    text-slate-800
                ">
                    <p>Selected Transactions on Account ID: </p>
                </div>
                <DisplayTransaction/>
            </Container>
        </div>
     );
}
 
export default TransactionsPage;