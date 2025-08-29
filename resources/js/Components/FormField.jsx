import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";

const FormField = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    step,
}) => {
    const highlight = type === "number" && parseFloat(value) > 0;

    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                step={step}
                className={cn(
                    "mt-1",
                    highlight && "bg-green-50",
                    error && "border-red-500 focus-visible:ring-red-500"
                )}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default FormField;
