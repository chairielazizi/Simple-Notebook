function App() {
  return (
    <div className="header">
      <div className="container">
        <a href="https://aku.airiel.space" target="_blank">
          <img src="./logo.png" alt="website logo" className="w-17" />
        </a>
        {/* <a href="/" className="text-3xl text-green-700">
          <i className="fa-solid fa-book-open"></i>
        </a> */}
        <a
          href="/"
          className="text-3xl text-green-700 font-semibold header-text"
        >
          Simple NoteBook
        </a>
      </div>
    </div>
  );
}

export default App;
