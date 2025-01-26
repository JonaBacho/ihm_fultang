import { AccountantNavBar } from "./Components/AccountantNavBar";
import { AccountList } from "./Components/AccountList";

export function Accountant() {
  return (
    /*<div>
      <AccountantDashBoard
        requiredRole={"Accountant"}
        linkList={AccountantNavLink}
      ></AccountantDashBoard>
      Accountant
    </div>*/
    <div>
      <AccountantNavBar></AccountantNavBar>
      <AccountList></AccountList>
    </div>
  );
}
