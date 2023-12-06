import { FunctionComponent } from "react";
import Directory from "../components/directory/Directory";
import { Outlet } from "react-router-dom";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="w-full">
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
