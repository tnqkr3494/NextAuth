import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

// for server component
export const currnetRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
