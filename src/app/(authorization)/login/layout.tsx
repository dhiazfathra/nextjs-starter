import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full bg-white dark:bg-monochrome-600 min-h-dvh content-center">
      {children}
    </div>
  );
};

export default Layout;
