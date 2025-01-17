import React, { memo } from "react";
import { Banner, News, Recommened, TopSellers } from "../../components";

const Home = () => {
  return (
    <>
      <Banner />
      <TopSellers />
      <Recommened />
      <News />
    </>
  );
};

export default memo(Home);
