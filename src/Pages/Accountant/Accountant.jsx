import { AccountantDashBoard } from "./Components/AccountantDashboard";
import { AccountantNavLink } from "./AccountantNavLink";
import { AccountList } from "./Components/AccountList";
import { AccountantNavBar } from "./Components/AccountantNavBar";

export function Accountant() {
  return (
    <div>
      <AccountantDashBoard
        requiredRole={"Accountant"}
        linkList={AccountantNavLink}
      >
        <AccountantNavBar></AccountantNavBar>
        <AccountList></AccountList>
      </AccountantDashBoard>
    </div>
  );
}
