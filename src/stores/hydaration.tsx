"use client";

import * as React from "react";
import useTaskStore from "./taskStore";

const Hydration = () => {
  React.useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);
  return null;
};

export default Hydration;
