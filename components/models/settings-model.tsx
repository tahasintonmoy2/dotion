"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { ModeToggle } from "../model-toggle";
import { Label } from "../ui/label";
import { UserButton } from "@clerk/clerk-react";

const SettingsModel = () => {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b">Settings</DialogTitle>
        </DialogHeader>
        <div className='flex justify-between items-center'>
          <div className="flex flex-col gap-y-1">
          <DialogDescription>
           Appearance
          </DialogDescription>
        <Label>
          Appearance
          Customize how Notion looks on your device.
        </Label>
          </div>
        <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModel;
