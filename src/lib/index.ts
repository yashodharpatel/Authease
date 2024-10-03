import { setConfig } from "./config";
import { signup } from "./modules/auth";
import { hello } from "./modules/index";
import { getUser } from "./modules/user";

const initializeApp = ({
  owner,
  projectAssigned,
}: {
  owner: string;
  projectAssigned: string;
}) => {
  setConfig({ owner, projectAssigned });

  const auth = () => {
    return { signup, getUser };
  };

  const greet = () => {
    return { hello };
  };

  return { auth, greet };
};

const authease = {
  initializeApp,
};

export default authease;