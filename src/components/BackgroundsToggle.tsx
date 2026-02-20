
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {
  value: boolean;
  onChange: (checked: boolean) => void;
};

const BackgroundsToggle = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2 cursor-target">
      <Label htmlFor="backgroundsToggle">Enable Backgrounds</Label>
      <Switch id="backgroundsToggle" checked={value} onCheckedChange={onChange} />
    </div>
  );
};

export default BackgroundsToggle;
