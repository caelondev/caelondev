import AboutMe from "./components/AboutMe/AboutMe";
import CoolPeople from "./components/CoolPeople/CoolPeople";
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
      <main id="main">
        <MainCard />
        <AboutMe id="about" />
        <Terminal id="terminal" />
        <Skills id="skills" />
        <Projects id="projects" />
        <CoolPeople id="cool-people" />
      </main>
      <Footer />
    </>
  );
}

export default App;
