"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const Settings = () => {
  // client 컴포넌트에서 session을 가져오고 싶을 때
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={onClick}>
        Sign out
      </button>
    </div>
  );
};

export default Settings;
