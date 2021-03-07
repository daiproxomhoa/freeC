import React from "react";
import Profile from "../components/Profile";
import HomeSkeleton from "../components/HomeSkeleton";
import { useSelector } from "react-redux";

const Home = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  const [data, setData] = React.useState();

  const fetchData = React.useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setData(userData);
  }, [userData]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return <HomeSkeleton />;
  }
  return <Profile data={data} />;
};

export default Home;
