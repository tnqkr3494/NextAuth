"use client";

import { useTransition } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";

const Settings = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: "John Doe",
      }).then(() => {
        update();
      });
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔐 Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update name
        </Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
