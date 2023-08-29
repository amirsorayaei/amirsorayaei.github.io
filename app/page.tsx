import Footer from "@/src/components/Footer";
import Main from "@/src/content/Main";

import "@/app/global.scss";
import "@/app/root.scss";

import Header from "@/src/components/Header";
import Sidebar from "@/src/components/Siderbar";
import SidebarMenu from "@/src/components/SidebarMenu";
import { SidebarProvider } from "@/src/contexts/SidebarContext";

const Home = () => {
  return (
    <div id="content">
      <SidebarProvider>
        <Header />
        <SidebarMenu />
        <Main />
        <Sidebar orientation="left" />
        <Sidebar orientation="right" />
        <Footer />
      </SidebarProvider>
    </div>
  );
};

export default Home;
