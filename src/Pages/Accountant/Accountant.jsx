import { AccountantDashBoard } from "./Components/AccountantDashboard";
import { AccountantNavLink } from "./AccountantNavLink";

export function Accountant() {
  return (
    <div>
      <AccountantDashBoard
        requiredRole={"Accountant"}
        linkList={AccountantNavLink}
      ></AccountantDashBoard>
      Accountant
    </div>
  );
}
