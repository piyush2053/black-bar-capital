import './App.css'

function App() {
  return (
    <main>
      <header><a className="brand" href="#home" aria-label="Black Bar home"><span />BLACK BAR</a><span className="label">INDEPENDENT PERSPECTIVE.</span></header>
      <section id="home">
        <p className="eyebrow">BLACK BAR / CAPITAL</p>
        <h1>A clear vision.<br /><span>A lasting impact.</span></h1>
        <p className="intro">Built on conviction. Focused on what comes next.</p>
        <a className="button" href="#about">Discover Black Bar <span aria-hidden="true">?</span></a>
      </section>
      <section id="about" className="about"><p className="eyebrow">OUR PERSPECTIVE</p><h2>Clarity in a complex world.</h2><p>We believe progress starts with a fresh perspective, thoughtful decisions, and a long-term view.</p></section>
      <footer><span>© {new Date().getFullYear()} Black Bar</span><a href="#home">Back to top ?</a></footer>
    </main>
  )
}

export default App
