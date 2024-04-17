"use client";

import Wrap from "../Wrap";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const TransferLookUp = () => {
  return (
    <>
      <Card
        className="
            bg-slate-200
            rounded-xl
            shadow-[0_2px_2px]
            shadow-cyan-500
            text-slate-700
            items-center
            min-w-[300px]
        "
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl">
            Hedera Transaction Explorer
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-center text-slate-600">
            Input the Hedera account that you want to search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Wrap>
            <div>
              <Label htmlFor="accountId">Account ID:</Label>
              <Input type="string" placeholder="0.0.XXXX" />
            </div>
            <div>
              <Button>Search</Button>
            </div>
          </Wrap>
        </CardContent>
        <div>
          <CardFooter>
            {/* TODO add the table here */}
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default TransferLookUp;
