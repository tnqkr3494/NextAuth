import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return account;
  } catch {
    return null;
  }
};
