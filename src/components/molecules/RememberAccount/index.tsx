import { Checkbox, FormControl, FormItem, FormLabel } from "@/components/atoms";
import Link from "next/link";
import React from "react";
import {
  FieldValues,
  ControllerRenderProps,
  Path,
  UseFormReturn,
  PathValue,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  field?: ControllerRenderProps<T, Path<T>>; // Use Path<T> instead of keyof T
  id: Path<T>;
  form: UseFormReturn<T>;
}
function RememberAccount<T extends FieldValues>({ field, id, form }: Props<T>) {
  const isChecked = field ? field.value : false;

  const handleSwitchChange = (checked: boolean) => {
    form.setValue(id, checked as PathValue<T, Path<T>>); // Use type assertion here to ensure it matches the expected type
  };

  return (
    <div className="flex flex-row item-center justify-between">
      <FormItem className="flex flex-row space-x-3 justify-center py-4">
        <FormControl>
          <Checkbox
            checked={isChecked}
            onCheckedChange={handleSwitchChange}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              form.setValue(id, target.checked as PathValue<T, Path<T>>);
            }}
            id="terms1"
            className="self-center border-monochrome-100 border-[0.8px] data-[state=checked]:bg-custom-blue dark:data-[state=checked]:text-white data-[state=checked]:px-0.5"
          />
        </FormControl>
        <FormLabel className="dark:text-white leading-none !mt-0 !mb-0 pointer-events-none">
          <label
            htmlFor="terms1"
            className="text-small-normal text-monochrome-400 flex flex-row gap-2"
          >
            <p className="dark:text-white">Remember for 30 days</p>
          </label>
        </FormLabel>
      </FormItem>
      <Link
        href={"/forgot-password"}
        className="text-custom-blue content-center opacity-[0.74] pointer-events-auto	"
      >
        Forgot password
      </Link>
    </div>
  );
}

export default RememberAccount;
