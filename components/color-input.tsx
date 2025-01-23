import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { type CheckedState } from "@radix-ui/react-checkbox";

interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onCheckedChange?: (checked: CheckedState) => void;
}

export function ColorInput({
  label,
  id,
  value,
  disabled,
  onCheckedChange,
  ...rest
}: ColorInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center space-x-2">
        <div
          className="h-10 w-10 rounded border"
          style={{
            backgroundColor: value as string,
          }}
        />
        <div className="relative flex-grow">
          <Input
            type="text"
            id={id}
            value={value}
            disabled={disabled || value === "transparent"}
            className="pr-8"
            {...rest}
          />
        </div>
      </div>
      {onCheckedChange && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`${id}-transparent`}
            name={`${id}-transparent`}
            checked={value === "transparent"}
            onCheckedChange={onCheckedChange}
          />
          <Label htmlFor={`${id}-transparent`}>Transparent</Label>
        </div>
      )}
    </div>
  );
}
