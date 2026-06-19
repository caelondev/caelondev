import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainCard from "./components/MainCard/MainCard";
import Terminal from "./components/Terminal/Terminal";

function App() {
  return (
    <>
      <Header />
      <div className="contents">
        <MainCard />
        <AboutMe />
        <Terminal />
      </div>
      <Footer />
    </>
  );
}

export default App;
