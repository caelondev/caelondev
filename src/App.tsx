import Empty from "./components/Empty";
import Sequence from "./components/Sequence";
import Caelondev from "./components/terminal/Caelondev";
import Type from "./components/terminal/Type";
import TypeCommand from "./components/terminal/TypeCommand";

function App() {
  return (
    <Sequence>
      <TypeCommand value="start" speed={150} style={{ margin: "0" }} />
      <Caelondev />
      <Type speed={30}>
        <p className="description">
          Hello, I’m Jericho, also known as caelondev.
        </p>
        <Empty />
        <p className="description">
          I’m a backend developer and low-level systems enthusiast.
        </p>
        <Empty />
        <p className="description">Type 'help' to explore my portfolio.</p>
      </Type>
    </Sequence>
  );
}

export default App;
