import Footer from "@/src/components/Footer";
import Main from "@/src/content/Main";

import "@/app/global.css";
import Header from "@/src/components/Header";
import Sidebar from "@/src/components/Siderbar";

const Home = () => {
  return (
    <div id="content">
      <Header />
      <Main />
      <Sidebar orientation="left" />
      <Sidebar orientation="right" />
      <Footer />
    </div>
  );
};

export default Home;
