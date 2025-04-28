"use server";

import { currnetRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function admin() {
  const role = await currnetRole();
  if (role === UserRole.USER) {
    return { error: "You do not have access to this page." };
  }
  return { success: "You have access to this page." };
}
