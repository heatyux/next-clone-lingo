"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const Wrapper = () => {
  return <App />;
};

export default Wrapper;
