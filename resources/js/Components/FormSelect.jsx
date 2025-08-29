import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FormSelect = ({
    id,
    label,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    labelKey = "label",
    getOptionLabel,
    disabled = false,
    error,
    required = false,
    className,
}) => {
    return (
        <div className={cn("flex flex-col gap-1", className)}>
            {label && <Label htmlFor={id}>{label}</Label>}

            <Select
                value={value}
                onValueChange={onChange}
                disabled={disabled}
                required={required}
            >
                <SelectTrigger
                    id={id}
                    className={cn(
                        "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring",
                        error && "border-red-500 focus:ring-red-500"
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.id} value={String(option.id)}>
                            {getOptionLabel
                                ? getOptionLabel(option)
                                : option[labelKey] ||
                                  option.name ||
                                  option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default FormSelect;
