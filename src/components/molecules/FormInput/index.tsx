"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  Input,
  Skeleton,
} from "@/components/atoms";
import React, { useEffect, useRef, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

interface Props<T extends FieldValues> {
  title: string;
  placeholder: string;
  field?: ControllerRenderProps<T, Path<T>>;
  isRequired: boolean;
  id: Path<T>;
  form: UseFormReturn<T>;
  prefix?: string;
  disabled?: boolean;
  type?: string;
  error?: string;
  maxLength?: number;
  isLoading?: boolean;
}

function FormInput<T extends FieldValues>({
  id,
  title,
  placeholder,
  field,
  isRequired = false,
  form,
  prefix,
  disabled,
  type = "text",
  error,
  maxLength,
  isLoading,
}: Props<T>) {
  const fieldValue = field?.value ?? "";

  const classNameNumber =
    type === "number"
      ? "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      : "";

  const prefixRef = useRef<HTMLSpanElement>(null);
  const [prefixWidth, setPrefixWidth] = useState(0);

  useEffect(() => {
    if (prefixRef.current) {
      setPrefixWidth(prefixRef.current.offsetWidth + 12);
    }
  }, [prefix]);

  const BLOCKED_KEYS = ["e", "E", "+", "-", ".", ","];

  // Enhanced handler for number inputs
  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Block navigation keys and invalid characters
    if (
      ["ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(
        e.key
      ) ||
      BLOCKED_KEYS.includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  // Prevent wheel/scroll events on number inputs
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Additional event handler for better scroll prevention
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (type === "number") {
      // Add passive: false wheel listener when focused
      const element = e.currentTarget;
      const wheelHandler = (event: WheelEvent) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
      };

      element.addEventListener("wheel", wheelHandler, { passive: false });

      // Clean up on blur
      const blurHandler = () => {
        element.removeEventListener("wheel", wheelHandler);
        element.removeEventListener("blur", blurHandler);
      };

      element.addEventListener("blur", blurHandler, { once: true });
    }
  };

  // Enhanced input handler for number type
  const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let value = target.value;

    if (type === "number") {
      // Remove leading zeros (except for single zero)
      if (
        value.startsWith("0") &&
        value.length > 1 &&
        !value.startsWith("0.")
      ) {
        value = value.slice(1);
      }

      // Remove negative values
      if (value.startsWith("-")) {
        value = value.slice(1);
      }

      // Apply max length restriction
      if (maxLength && value.length > maxLength) {
        value = value.slice(0, maxLength);
      }

      // Only allow numbers and decimal point
      value = value.replace(/[^0-9.]/g, "");

      // Ensure only one decimal point
      const decimalCount = (value.match(/\./g) || []).length;
      if (decimalCount > 1) {
        const parts = value.split(".");
        value = parts[0] + "." + parts.slice(1).join("");
      }

      target.value = value;
    } else if (maxLength && value.length > maxLength) {
      target.value = value.slice(0, maxLength);
    }
  };

  // Enhanced change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (type === "number") {
      // Additional validation for number type
      if (value !== "" && isNaN(Number(value))) {
        return; // Don't update if not a valid number
      }
    }

    form.setValue(id, value as PathValue<T, Path<T>>);
  };

  return (
    <FormItem className="mb-3">
      <FormLabel className="text-label dark:text-white">
        {title}
        {isRequired ? <span className="text-red-500"> *</span> : <></>}
      </FormLabel>
      <FormControl>
        {prefix ? (
          <div className="flex flex-col">
            <div className="relative mt-1">
              {prefix && (
                <span
                  ref={prefixRef}
                  className="absolute inset-y-0 left-0 flex items-center pl-3 border-r-2 
         dark:border-r-monochrome-100 pr-3 text-monochrome-400 dark:text-white 
         font-semibold text-sm leading-4.5 opacity-80"
                >
                  {type === "email" ? <FaEnvelope /> : prefix}
                </span>
              )}

              {isLoading ? (
                <Skeleton className="h-14 w-full rounded-md" />
              ) : (
                <Input
                  disabled={disabled}
                  {...field}
                  id={String(id)}
                  value={fieldValue ?? ""}
                  type={type}
                  placeholder={placeholder}
                  onKeyDown={
                    type === "number" ? handleNumberKeyDown : undefined
                  }
                  onWheel={handleWheel}
                  onFocus={handleFocus}
                  onInput={handleNumberInput}
                  style={{
                    paddingLeft: prefixWidth ? `${prefixWidth}px` : "12px",
                  }}
                  onChange={handleChange}
                  className={`${
                    error ? "!border-red-500" : "border-gray-300"
                  } ${
                    disabled
                      ? "bg-monochrome-100 dark:!text-monochrome-800"
                      : ""
                  } ${classNameNumber}`}
                />
              )}

              {error && (
                <span className="form-error-icon bottom-5 right-2 peer-placeholder-shown:visible">
                  <IoIosAlert height={"16px"} width={16} color="#FF6D55" />
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="relative">
            {isLoading ? (
              <Skeleton className="h-14 w-full rounded-md" />
            ) : (
              <Input
                type={type}
                onKeyDown={type === "number" ? handleNumberKeyDown : undefined}
                onInput={handleNumberInput}
                onWheel={handleWheel}
                onFocus={handleFocus}
                disabled={disabled}
                id={String(id)}
                {...field}
                value={fieldValue}
                placeholder={placeholder}
                className={
                  disabled
                    ? `bg-monochrome-100 dark:!text-monochrome-800 ${classNameNumber} ${
                        error
                          ? "!border-red-500"
                          : `border-gray-300 ${
                              error ? "!border-red-500" : "border-gray-300"
                            }`
                      }`
                    : `border-monochrome-100 ${classNameNumber} ${
                        error ? "!border-red-500" : "border-gray-300"
                      }`
                }
                onChange={handleChange}
              />
            )}

            {error && (
              <span className="form-error-icon top-3 md:top-5 right-2  peer-placeholder-shown:visible">
                <IoIosAlert height={"16px"} width={16} color="#FF6D55" />
              </span>
            )}
          </div>
        )}
      </FormControl>
    </FormItem>
  );
}

export default FormInput;
