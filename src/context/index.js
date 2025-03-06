import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AntDesignContext = createContext();

export function AntDesignProvider({ children }) {
  const [controller, setController] = useState({
    miniSidenav: false,
    transparentSidenav: true,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
  });

  return (
    <AntDesignContext.Provider value={[controller, setController]}>
      {children}
    </AntDesignContext.Provider>
  );
}

AntDesignProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAntDesignController() {
  return useContext(AntDesignContext);
}

export default AntDesignContext;
