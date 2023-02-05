import PaletteContainer from "./components/PaletteContainer";

function App() {
  return (
    <div className="App">
      <div>
        <header>
          <img src="./images/palette.png" alt="palette icon" />
          <h1>Color palette generator</h1>
        </header>
        <main>
          <PaletteContainer />
        </main>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
