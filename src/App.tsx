import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainCard from "./components/MainCard/MainCard";

function App() {
  return (
    <>
      <Header />
      <div className="contents">
        <MainCard />
        <AboutMe />
      </div>
      <Footer />
    </>
  );
}

export default App;
