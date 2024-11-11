import {PropsWithChildren} from "react";

function Layout({children}: PropsWithChildren) {
  return (
    <div className="h-screen w-screen flex overflow-hidden" >
      {children}
    </div>
  );
}

export default Layout;