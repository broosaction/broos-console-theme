import { useEffect, useState } from 'react'
import {
  Activity, Bell, Boxes, ChevronDown, CircleHelp, Cloud, Command, Database,
  Globe2, HardDrive, LayoutDashboard, LifeBuoy, Menu, Moon, Search, Server,
  Settings, ShieldCheck, Sparkles, Sun, Users, X, Zap,
} from 'lucide-react'

type Theme = 'light' | 'dark'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Servers', icon: Server, count: '3' },
  { label: 'Sites', icon: Globe2, count: '24' },
  { label: 'Databases', icon: Database },
  { label: 'Containers', icon: Boxes, badge: 'Beta' },
]

const manage = [
  { label: 'Team & access', icon: Users },
  { label: 'Security', icon: ShieldCheck },
  { label: 'Settings', icon: Settings },
]

const services = [
  { name: 'Web services', meta: 'Apache · PHP-FPM', state: 'Operational', tone: 'green' },
  { name: 'Email delivery', meta: 'Postfix · Dovecot', state: 'Operational', tone: 'green' },
  { name: 'DNS services', meta: 'BIND 9', state: 'Operational', tone: 'green' },
  { name: 'System updates', meta: '4 security updates', state: 'Attention', tone: 'amber' },
]

function Logo() {
  return <div className="brand-mark" aria-hidden="true"><span /><span /><span /></div>
}

function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('broos-theme') as Theme) ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  )
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('broos-theme', theme)
  }, [theme])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      {menuOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><Logo /><span>Broos</span><b>Cloud</b></div>
        <button className="mobile-close icon-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button>

        <button className="workspace-picker">
          <span className="workspace-avatar">BA</span>
          <span><strong>Broos Action</strong><small>Production workspace</small></span>
          <ChevronDown size={16} />
        </button>

        <nav aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {navigation.map(({ label, icon: Icon, active, count, badge }) => (
            <a className={active ? 'active' : ''} href="#" key={label} aria-current={active ? 'page' : undefined}>
              <Icon /><span>{label}</span>{count && <small className="nav-count">{count}</small>}{badge && <small className="nav-badge">{badge}</small>}
            </a>
          ))}
          <p className="nav-label">Manage</p>
          {manage.map(({ label, icon: Icon }) => <a href="#" key={label}><Icon /><span>{label}</span></a>)}
        </nav>

        <div className="sidebar-footer">
          <a href="#"><LifeBuoy /><span>Support</span></a>
          <div className="profile"><span>BM</span><div><strong>Bruce M.</strong><small>Administrator</small></div><ChevronDown size={16} /></div>
        </div>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <button className="menu-button icon-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu /></button>
          <button className="search-box"><Search /><span>Search resources</span><kbd><Command size={12} /> K</kbd></button>
          <div className="top-actions">
            <button className="icon-button" aria-label="Help"><CircleHelp /></button>
            <button className="icon-button notification" aria-label="Notifications"><Bell /><i /></button>
            <button className="icon-button" aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
        </header>

        <main id="main">
          <section className="page-heading">
            <div><p className="eyebrow"><span /> All systems operational</p><h1>Good morning, Bruce.</h1><p>Here is what is happening across your infrastructure.</p></div>
            <button className="primary-button"><Zap /> Quick action <ChevronDown /></button>
          </section>

          <section className="metric-grid" aria-label="Infrastructure summary">
            <article><div className="metric-icon mint"><Server /></div><p>Servers</p><strong>3</strong><span className="positive"><Activity /> All healthy</span></article>
            <article><div className="metric-icon blue"><Globe2 /></div><p>Active sites</p><strong>24</strong><span>2 staging</span></article>
            <article><div className="metric-icon violet"><Database /></div><p>Databases</p><strong>18</strong><span>8.2 GB used</span></article>
            <article><div className="metric-icon amber"><HardDrive /></div><p>Storage</p><strong>38%</strong><span>96 of 256 GB</span></article>
          </section>

          <section className="dashboard-grid">
            <article className="panel performance-panel">
              <div className="panel-heading"><div><h2>Server performance</h2><p>broos-production · Live</p></div><button className="tertiary-button">Last 24 hours <ChevronDown /></button></div>
              <div className="chart-legend"><span><i className="cpu" /> CPU <b>24%</b></span><span><i className="memory" /> Memory <b>61%</b></span></div>
              <div className="chart" role="img" aria-label="CPU and memory usage chart for the last 24 hours">
                <span className="axis a100">100%</span><span className="axis a50">50%</span><span className="axis a0">0%</span>
                <svg viewBox="0 0 800 220" preserveAspectRatio="none" aria-hidden="true">
                  <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--chart-green)" stopOpacity=".24"/><stop offset="1" stopColor="var(--chart-green)" stopOpacity="0"/></linearGradient></defs>
                  <path className="gridline" d="M0 15H800M0 110H800M0 205H800" />
                  <path className="area" d="M0 205V146 C55 150 58 119 110 133 S185 120 225 143 S294 147 335 125 S403 141 445 116 S520 131 558 91 S625 111 667 96 S738 112 800 72 V205Z" />
                  <path className="line green" d="M0 146 C55 150 58 119 110 133 S185 120 225 143 S294 147 335 125 S403 141 445 116 S520 131 558 91 S625 111 667 96 S738 112 800 72" />
                  <path className="line purple" d="M0 103 C64 94 92 110 137 94 S210 87 255 101 S324 80 370 91 S449 82 495 89 S570 75 615 84 S700 72 800 82" />
                </svg>
                <div className="chart-times"><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>Now</span></div>
              </div>
            </article>

            <article className="panel service-panel">
              <div className="panel-heading"><div><h2>Service health</h2><p>Core services on production</p></div><button className="dots" aria-label="Service options">•••</button></div>
              <div className="service-list">{services.map(service => (
                <div className="service-row" key={service.name}><span className={`status-dot ${service.tone}`} /><div><strong>{service.name}</strong><small>{service.meta}</small></div><span className={`status-pill ${service.tone}`}>{service.state}</span></div>
              ))}</div>
              <a className="panel-link" href="#">View system health <span>→</span></a>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Changes across your workspace</p></div><a href="#">View all</a></div>
              <div className="event"><span className="event-icon"><ShieldCheck /></span><div><p><b>SSL certificate renewed</b> for broosaction.com</p><small>Automated · 12 minutes ago</small></div></div>
              <div className="event"><span className="event-icon"><Cloud /></span><div><p><b>Backup completed</b> for all production sites</p><small>System · 2 hours ago</small></div></div>
              <div className="event"><span className="event-icon"><Users /></span><div><p><b>Team member invited</b> to Broos Action</p><small>Bruce M. · Yesterday</small></div></div>
            </article>
            <article className="ai-card"><div className="ai-orb"><Sparkles /></div><div><span className="ai-label">Broos AI</span><h2>Your infrastructure, understood.</h2><p>Ask about performance, investigate an issue or plan a safe change.</p><button>Open assistant <span>→</span></button></div></article>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
