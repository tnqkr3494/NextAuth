import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      /**
       * 하나의 이메일 주소에 여러 제공자를 연결하는 것이 지원되지 않는다.
       * 따라서 기존에 동일한 이메일 주소로 가입된 상태에서 oauth로 또 동일한 메일 주소를 사용해서 로그인하려고 하면 오류발생.
       * 해당 오류 해결방법은 아래 코드 작성하는 것.
       * 추가로 확인해보니 덮어씌울 때 덮어씌워지는 것이 아니라 기존에 user가 유지된다.
       * */
      // allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFileds = LoginSchema.safeParse(credentials);

        if (validatedFileds.success) {
          const { email, password } = validatedFileds.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
