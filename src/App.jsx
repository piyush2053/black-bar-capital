import { useEffect, useRef, useState } from 'react'
import {
  routes, labels, levels, programs, shortAudience, coreFocus,
  officeImages, founders, values, services, marketTags,
} from './data'
import { useReveal, useScrollState, usePointerFx } from './motion'
import './App.css'

const Link = ({ to, children, ...props }) => <a href={`#${to}`} {...props}>{children}</a>
const delay = i => ({ '--d': `${i * 90}ms` })
const initials = name => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
const YEAR = new Date().getFullYear()
const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>

/* ---------- Shared pieces ---------- */

function Eyebrow({ children }) {
  return <p className="eyebrow"><span className="eyebrow-dot" />{children}</p>
}

function Intro({ label, title, text }) {
  return (
    <section className="intro wrap">
      <div className="reveal"><Eyebrow>{label}</Eyebrow></div>
      <h1 className="reveal" style={delay(1)}>{title}</h1>
      <p className="lead reveal" style={delay(2)}>{text}</p>
    </section>
  )
}

function SectionHeading({ label, title, text, id }) {
  return (
    <div className="section-heading">
      <div className="reveal">
        <Eyebrow>{label}</Eyebrow>
        <h2 id={id}>{title}</h2>
      </div>
      {text && <p className="reveal" style={delay(1)}>{text}</p>}
    </div>
  )
}

/* ---------- Home ---------- */

const candles = [240, 220, 230, 198, 184, 204, 168, 147, 160, 125, 137, 101, 113, 82, 95, 61, 76, 42]

function Chart() {
  return (
    <div className="chart-stage">
      <div className="chart frost">
        <div className="chart-top">
          <span className="chart-brand"><img src="/logo/white-bull.png" alt="" />THE LEARNING EDGE</span>
          <span className="live-dot">PRICE · PATTERNS · PERSPECTIVE</span>
        </div>
        <svg viewBox="0 0 560 320" role="img" aria-label="Illustrative candlestick chart showing price structure and support levels">
          <defs>
            <pattern id="grid" width="56" height="50" patternUnits="userSpaceOnUse">
              <path d="M56 0H0V50" fill="none" stroke="white" strokeOpacity=".06" />
            </pattern>
            <linearGradient id="trend" x1="0" x2="1">
              <stop offset="0" stopColor="#FF5A00" stopOpacity="0" />
              <stop offset="1" stopColor="#FF8A3D" />
            </linearGradient>
          </defs>
          <rect width="560" height="320" fill="url(#grid)" />
          <path className="level" d="M15 260H545M15 88H545" stroke="#FF5A00" strokeDasharray="5 7" />
          {candles.map((y, i) => {
            const bear = i % 3 === 2
            return (
              <g key={i} className="candle" style={{ '--i': i }} stroke={bear ? '#FFFFFF' : '#FF5A00'} fill={bear ? '#2a2a2a' : '#FF5A00'}>
                <path d={`M${24 + i * 29} ${y - 18}v65`} />
                <rect x={17 + i * 29} y={y} width="14" height={bear ? 29 : 23} rx="2" />
              </g>
            )
          })}
          <path className="trend" d="M22 285Q180 280 280 210T533 120" stroke="url(#trend)" strokeWidth="2.5" fill="none" pathLength="1" />
        </svg>
        <div className="chart-caption">Learn to read the story behind the chart.<small>ILLUSTRATION / NOT LIVE DATA</small></div>
      </div>
      <div className="chip frost chip-a"><span className="chip-icon">01</span>Understand structure</div>
      <div className="chip frost chip-b"><span className="chip-icon">02</span>Define your risk</div>
      <div className="chip frost chip-c"><span className="chip-icon">03</span>Build discipline</div>
    </div>
  )
}

function Hero() {
  const lines = [['Understand', 'markets.'], ['Trade', 'with', <em key="p">purpose.</em>]]
  let n = 0
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="badge frost rise" style={delay(0)}>
          <span className="badge-pulse" />BLACK BAR · RESEARCH AND TRAINING INSTITUTE
        </div>
        <h1 className="hero-title" aria-label="Understand markets. Trade with purpose.">
          {lines.map((words, li) => (
            <span className="line" key={li} aria-hidden="true">
              {words.map((w, wi) => (
                <span className="word-mask" key={wi}>
                  <span className="word" style={{ '--d': `${120 + n++ * 80}ms` }}>{w}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="lead rise" style={delay(6)}>
          From your first candlestick to advanced market structure. Build your knowledge, refine your process, and put risk management first.
        </p>
        <div className="actions rise" style={delay(7)}>
          <Link className="button" to="/courses">Explore our courses <Arrow /></Link>
          <Link className="button ghost" to="/about">Meet the founders →</Link>
        </div>
        <div className="hero-stats rise" style={delay(8)}>
          {[['4', 'Learning paths'], ['B→A', 'Beginner to advanced'], ['100%', 'Process over predictions']].map(([k, v]) => (
            <div className="stat" key={v}><strong>{k}</strong><span>{v}</span></div>
          ))}
        </div>
      </div>
      <div className="rise" style={delay(3)}><Chart /></div>
    </section>
  )
}

function Marquee() {
  const items = [...marketTags, ...marketTags]
  return (
    <div className="marquee" aria-label={marketTags.join(', ')}>
      <div className="marquee-track" aria-hidden="true">
        {items.map((t, i) => <span key={i}>{t}<i className="marquee-dot" /></span>)}
      </div>
    </div>
  )
}

function Card({ p, i }) {
  return (
    <div className="reveal" style={delay(i)}>
      <article className="card glass glow">
        <div className="card-top">
          <span className="pill">{levels[p.id - 1]}</span>
          <span className="number">0{p.id}</span>
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="card-bottom">
          <strong>{p.id === 4 ? 'Included in path' : p.fee.replace('/-', '')}</strong>
          <Link className="card-link" to={`/courses?course=${p.id}`}>View syllabus <Arrow /></Link>
        </div>
      </article>
    </div>
  )
}

function OfficeInsights() {
  return (
    <section className="office-insights section wrap" aria-labelledby="office-insights-title">
      <SectionHeading id="office-insights-title" label="INSIDE BLACK BAR" title="Office Insights" text="A closer look at our workspace, study areas, and team in action." />
      <div className="office-gallery">
        {officeImages.map(([file, caption], i) => (
          <figure key={file} className={`office-photo reveal${i === 0 ? ' office-photo-featured' : ''}`} style={delay(i)}>
            <img src={'/logo/' + file} alt={caption + ' at Black Bar'} loading="lazy" decoding="async" />
            <figcaption className="frost"><span className="office-photo-number">0{i + 1}</span>{caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <section className="section wrap">
        <SectionHeading
          label="FIND YOUR STARTING POINT"
          title={<>A stronger foundation.<br />A clearer next step.</>}
          text="Choose a program that meets you where you are, and takes your market understanding further."
        />
        <div className="course-grid">{programs.map((p, i) => <Card p={p} i={i} key={p.id} />)}</div>
      </section>
      <section className="philosophy wrap">
        <div className="philosophy-card glass">
          <div className="reveal">
            <Eyebrow>THE BLACK BAR APPROACH</Eyebrow>
            <h2>Learn the setup.<br />Understand the risk.<br /><em>Respect the process.</em></h2>
          </div>
          <div className="reveal" style={delay(1)}>
            <p>Markets move. A thoughtful learning framework helps you keep perspective. Our curriculum brings technical knowledge, capital management, and trading psychology together.</p>
            <Link className="text-link" to="/services">Explore what we teach <Arrow /></Link>
          </div>
        </div>
      </section>
      <OfficeInsights />
    </>
  )
}

/* ---------- Courses ---------- */

function Curriculum({ topics, initiallyOpen }) {
  const [open, setOpen] = useState(initiallyOpen)
  return (
    <div className={`acc glass${open ? ' open' : ''}`}>
      <button className="acc-head" aria-expanded={open} onClick={() => setOpen(!open)}>
        Explore the full curriculum <span className="acc-icon" aria-hidden="true" />
      </button>
      <div className="acc-body">
        <div className="acc-inner">
          <div className="topics">
            {topics.map((t, i) => {
              if (!t.startsWith('•')) return <h3 key={i}>{t.replace(/:$/, '')}</h3>
              const text = t.replace(/^•\s*/, '')
              const cut = text.indexOf(': ')
              return (
                <p className="topic" key={i}>
                  {cut > 0 ? <><strong>{text.slice(0, cut)}</strong><span>{text.slice(cut + 2)}</span></> : <strong>{text}</strong>}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function Courses({ selected }) {
  return (
    <>
      <Intro label="OUR PROGRAMS" title={<>Your next chapter<br />in the <em>markets.</em></>} text="A comprehensive curriculum for chart readers, active traders, global market learners, and long-term investors." />
      <section className="wrap course-list">
        {programs.map(p => (
          <article className="syllabus reveal" key={p.id} id={`course-${p.id}`}>
            <div>
              <span className="pill">0{p.id} / {levels[p.id - 1]}</span>
              <h2>{p.title}</h2>
              <strong className="price">{p.fee}</strong>
              {p.id === 4 && <p className="small">Included in Comprehensive Path. Contact the institute to confirm standalone availability and fee.</p>}
              <p>{p.description}</p>
              <div className="audience">
                <span className="eyebrow">WHO IT'S FOR</span>
                <p>{p.audience}</p>
              </div>
            </div>
            <div>
              <Curriculum key={`${selected}-${p.id}`} topics={p.topics} initiallyOpen={selected === p.id || selected === null} />
            </div>
          </article>
        ))}
      </section>
      <section className="section wrap">
        <SectionHeading label="AT A GLANCE" title="Compare your learning paths." />
        <div className="table-scroll glass reveal">
          <table>
            <caption>Program fees, audiences and core focus</caption>
            <thead><tr><th>Program</th><th>Fee</th><th>Target audience</th><th>Core focus</th></tr></thead>
            <tbody>
              {programs.map((p, i) => (
                <tr key={p.id}>
                  <th scope="row">{p.title}</th>
                  <td className="fee">{p.id === 4 ? 'Included in Comprehensive Path' : p.fee.replace('/-', '')}</td>
                  <td>{shortAudience[i]}</td>
                  <td>{coreFocus[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

/* ---------- About ---------- */

function Founders() {
  return (
    <section className="founders section wrap" aria-labelledby="founders-title">
      <div className="founders-glow" aria-hidden="true" />
      <SectionHeading
        id="founders-title"
        label="THE PEOPLE BEHIND BLACK BAR"
        title={<>Meet the <em>founders.</em></>}
        text="Three founders, one shared conviction: market education should build understanding, discipline, and perspective, not promises."
      />
      <div className="founder-grid">
        {founders.map((f, i) => (
          <div className="founder tilt reveal" style={delay(i)} key={f.name}>
            <article className={`founder-card glass glow${f.photo ? ' has-photo' : ''}`}>
              {f.photo ? (
                <div className="founder-photo">
                  <img src={f.photo} alt={`${f.name}, ${f.role} of Black Bar`} loading="lazy" decoding="async" />
                  <div className="founder-top">
                    <span className="number frost">0{i + 1}</span>
                    <span className="pill frost">{f.role.toUpperCase()}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="founder-top">
                    <span className="number">0{i + 1}</span>
                    <span className="pill">{f.role.toUpperCase()}</span>
                  </div>
                  <div className="avatar">
                    <span className="avatar-ring" aria-hidden="true" />
                    <span className="avatar-core">
                      <span className="avatar-initials" aria-hidden="true">{initials(f.name)}</span>
                    </span>
                  </div>
                </>
              )}
              <h3>{f.name}</h3>
              <p className="founder-role">{f.role}, Black Bar</p>
              {f.bio && <p className="founder-bio">{f.bio}</p>}
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <>
      <Intro label="ABOUT BLACK BAR" title={<>Knowledge first.<br /><em>Perspective always.</em></>} text="Black Bar Research and Training Institute brings a structured approach to understanding financial markets, from foundational chart reading to advanced analysis." />
      <section className="about-story wrap">
        <div className="logo-showcase glass reveal">
          <div className="logo-halo" aria-hidden="true" />
          <img src="/logo/Blogo.png" alt="Black Bar Research and Training Institute bull logo" />
        </div>
        <div className="reveal" style={delay(1)}>
          <Eyebrow>OUR LEARNING PHILOSOPHY</Eyebrow>
          <h2>Build understanding.<br />Then build your process.</h2>
          <p>Our curriculum connects the mechanics of markets with the discipline of decision-making. It covers technical analysis, derivatives, global markets, and fundamental business evaluation.</p>
          <p>Whether you are reading your first chart or exploring institutional market structure, the focus remains the same: understand the reasoning, define the risk, and develop a consistent approach.</p>
          <Link className="button" to="/courses">Find your learning path <Arrow /></Link>
        </div>
      </section>
      <Founders />
      <section className="section wrap">
        <SectionHeading label="WHAT GUIDES THE CURRICULUM" title="Three principles. Every lesson." />
        <div className="values">
          {values.map(([title, text], i) => (
            <div className="reveal" style={delay(i)} key={title}>
              <article className="value glass glow">
                <span className="number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- Services ---------- */

function Services() {
  return (
    <>
      <Intro label="WHAT WE TEACH" title={<>Market education.<br /><em>From every angle.</em></>} text="Explore the areas covered by our training programs. Each connects market knowledge with a more considered approach to risk and decision-making." />
      <section className="services-list wrap">
        {services.map(([title, text, id], i) => (
          <div className="reveal" style={delay(i % 3)} key={title}>
            <article className="service glass glow">
              <span className="service-num">0{i + 1}</span>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
              <Link className="text-link" to={`/courses?course=${id}`}>Related curriculum <Arrow /></Link>
            </article>
          </div>
        ))}
      </section>
    </>
  )
}

/* ---------- Shell ---------- */

function Header({ path, scrolled }) {
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    if (!menu) return
    const onKey = e => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])
  return (
    <header className={`header${scrolled ? ' scrolled' : ''}${menu ? ' menu-open' : ''}`}>
      <div className="header-bar frost" onClick={e => e.target.closest('a') && setMenu(false)}>
        <Link to="/" className="brand" aria-label="Black Bar home">
          <img src="/logo/white-bull.png" alt="" />
          <span className="brand-text"><strong>BLACK BAR</strong><small>RESEARCH &amp; TRAINING</small></span>
        </Link>
        <nav id="navigation" className="nav" aria-label="Main navigation">
          <div className="nav-inner">
            {routes.map((to, i) => (
              <Link key={to} to={to} aria-current={path === to ? 'page' : undefined} style={{ '--i': i }}>{labels[i]}</Link>
            ))}
            <Link to="/courses" className="button nav-cta">Find your course <Arrow /></Link>
          </div>
        </nav>
        <Link to="/courses" className="header-cta">Find your course <Arrow /></Link>
        <button className="menu-toggle" aria-controls="navigation" aria-expanded={menu} aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <Link to="/" className="footer-brand">
            <img src="/logo/white-bull.png" alt="Black Bar bull logo" />
            <div><strong>BLACK BAR</strong><p>Research and Training Institute</p></div>
          </Link>
          <nav aria-label="Footer navigation">{routes.map((to, i) => <Link key={to} to={to}>{labels[i]}</Link>)}</nav>
        </div>
        <p className="disclaimer">Our programs provide market education. Trading and investing involve risk, including loss of capital. Examples and chart illustrations are for learning purposes and do not promise returns.</p>
        <div className="footer-bottom">
          <span>© {YEAR} Black Bar. All rights reserved.</span>
          <span>KNOWLEDGE. DISCIPLINE. PERSPECTIVE.</span>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">BLACK BAR</div>
    </footer>
  )
}

function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/')
  const [path, query] = route.split('?')
  const selected = Number(new URLSearchParams(query).get('course')) || null
  const barRef = useRef(null)
  const scrolled = useScrollState(barRef)
  useReveal(route)
  usePointerFx()

  useEffect(() => {
    const change = () => setRoute(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', change)
    return () => window.removeEventListener('hashchange', change)
  }, [])

  useEffect(() => {
    document.title = `${labels[routes.indexOf(path)] || 'Page not found'} | Black Bar`
    if (selected) requestAnimationFrame(() => document.getElementById(`course-${selected}`)?.scrollIntoView({ behavior: 'smooth' }))
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [path, selected])

  const page = path === '/' ? <Home />
    : path === '/courses' ? <Courses selected={selected} />
    : path === '/about' ? <About />
    : path === '/services' ? <Services />
    : <Intro label="404" title="Page not found" text="Use the navigation to explore Black Bar." />

  return (
    <>
      <div className="progress" ref={barRef} aria-hidden="true" />
      <div className="ambient" aria-hidden="true"><i className="orb orb-1" /><i className="orb orb-2" /><i className="orb orb-3" /></div>
      <a href="#main-content" className="skip-link" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a>
      <Header path={path} scrolled={scrolled} />
      <main id="main-content" tabIndex={-1} key={path} className="page">
        {page}
        <section className="closing wrap">
          <div className="closing-card reveal">
            <div>
              <Eyebrow>YOUR LEARNING JOURNEY STARTS HERE</Eyebrow>
              <h2>Bring more understanding<br />to every decision.</h2>
            </div>
            <Link to="/courses" className="button light">Explore the curriculum <Arrow /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
