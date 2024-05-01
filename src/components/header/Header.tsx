"use client";

import Container from "../Container";

import useNetworkSelection from "../../../hooks/useNetworkSelection";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

// Define the values of each network along with labels
const networks = [
  {
    value: "mainnet",
    label: "MainNet",
  },
  {
    value: "testnet",
    label: "TestNet",
  },
  {
    value: "previewnet",
    label: "PreviewNet",
  },
];

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { selectedNetwork, updateNetworkSelection }= useNetworkSelection();
  return (
    <div
      className="
        sticky
        top-0
        w-full
        z-30
        shadow-sm
        bg-greyCool-100
        py-4
        px-2
    "
    >
      <Container>
        <div
          className="
                flex
                items-center
                justify-between
                gap-3
                md:gap-0
            "
        >
          {/* Logo and redirect to home page on click */}
          <Link href="/">
            <Image
              src="/hederaLogoLight.svg"
              alt="The Hashgraph Association Logo"
              width={300}
              height={300}
            />
          </Link>
          {/* Popover Button */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="
                            w-[200px] 
                            justify-between 
                            shadow-[0_2px_2px_rgba(0,0,0,0.3)]
                            "
              >
                {selectedNetwork
                  ? networks.find((network) => network.value === selectedNetwork)?.label
                  : "Select a network"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <Command>
                {/* Iterates through networks */}
                <CommandGroup>
                  <CommandList>
                    {networks.map((network) => (
                      <CommandItem
                        key={network.value}
                        value={network.value}
                        onSelect={(currentNetwork: string) => {
                          updateNetworkSelection(
                            currentNetwork === selectedNetwork 
                            ? "" 
                            : currentNetwork
                          );
                          router.refresh();
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedNetwork === network.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {network.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </Container>
    </div>
  );
};

export default Header;
