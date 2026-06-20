import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainCard from "./components/MainCard/MainCard";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Terminal from "./components/Terminal/Terminal";

function App() {
  return (
    <>
      <Header />
      <main>
        <MainCard />
        <AboutMe />
        <Terminal />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
