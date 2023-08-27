import Footer from "@/src/components/Footer";
import Main from "@/src/content/Main";

import "@/app/global.css";
import Header from "@/src/components/Header";
import Sidebar from "@/src/components/Siderbar";
import Contact from "@/src/content/Contact";

const Home = () => {
  return (
    <div id="content">
      <Header />
      <Main />
      <Contact />
      <Sidebar orientation="left" />
      <Sidebar orientation="right" />
      <Footer />
    </div>
  );
};

export default Home;
