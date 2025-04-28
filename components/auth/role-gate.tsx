"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return <FormError message="You do not have access to this page." />;
  }
  return <>{children}</>;
};
