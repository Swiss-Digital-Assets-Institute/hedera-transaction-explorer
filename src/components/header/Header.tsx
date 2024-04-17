"use client";

import Link from "next/link";
import Container from "../Container";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

import React from "react";
import Image from "next/image";
import { Command, CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = React.useState(false);
  // TODO change value into change network hook
  const [value, setValue] = React.useState("");
  return (
    <div
      className="
        sticky
        top-0
        w-full
        z-30
        shadow-sm
        bg-slate-100
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
                            w-[2 200px] justify-between shadow-[0_2px_2px_rgba(0,0,0,0.3)]
                            "
              >
                {/* TODO Add function to iterate through networks with the Hooks */}
                {value
                  ? networks.find((network) => network.value === value)?.label
                  : "Select a Network..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <Command>
                {/* Iterates through networks */}
                {networks.map((network) => (
                  <CommandItem
                    key={network.value}
                    value={network.value}
                    onSelect={(currentNetwork: string) => {
                      setValue(currentNetwork === value ? "" : currentNetwork);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === network.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {network.label}
                  </CommandItem>
                ))}
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </Container>
    </div>
  );
};

export default Header;
