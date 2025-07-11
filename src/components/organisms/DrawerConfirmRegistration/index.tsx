"use client";

import {
  Button,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Separator,
} from "@/components/atoms";
import React from "react";

interface Props {
  onSubmit: () => void;
}

function DrawerConfirmRegistration({ onSubmit }: Props) {
  return (
    <div className="bg-white md:max-w-sm dark:bg-monochrome-800 dark:text-white">
      <DrawerHeader>
        <DrawerTitle className="mx-auto text-monochrome-400 dark:text-white opacity-[.84] text-center font-medium text-sm leading-4.1">
          Review Pendaftaran
        </DrawerTitle>
        <DrawerDescription />
      </DrawerHeader>
      <Separator className="w-full -my-1 border-monochrome-100" />
      <div className="pt-2 px-4">
        <p className="font-semibold text-base leading-5.5 text-center text-monochrome-400 dark:text-white my-4">
          Yakin untuk Simpan Data Sekarang?
        </p>
        <p className="text-small-normal text-center text-monochrome-400 dark:text-white mb-4">
          Anda sudah mengisi semua data pendaftaran dengan benar
        </p>
      </div>

      <DrawerFooter className="flex flex-row">
        <DrawerClose asChild>
          <Button variant="outline" className="!w-1/2">
            CEK LAGI
          </Button>
        </DrawerClose>
        <Button onClick={onSubmit} className="!w-1/2" type="submit">
          YAKIN
        </Button>
      </DrawerFooter>
    </div>
  );
}

export default DrawerConfirmRegistration;
