
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {
  value: boolean;
  onChange: (checked: boolean) => void;
};

const CursorToggle = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2 cursor-target">
      <Label htmlFor="cursorToggle">Enable Custom Cursor</Label>
      <Switch id="cursorToggle" checked={value} onCheckedChange={onChange} />
    </div>
  );
};

export default CursorToggle;
