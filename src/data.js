import syllabus from './syllabus.json'

export const routes = ['/', '/courses', '/about', '/services']
export const labels = ['Home', 'Courses', 'About Us', 'Services']
export const levels = ['BEGINNER', 'INTERMEDIATE', 'GLOBAL MARKETS', 'LONG-TERM INVESTING']

export const programs = syllabus
  .split(/\r?\n(?=\d\. )/)
  .slice(1)
  .map((block, i) => {
    const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
    const end = lines.indexOf('Program Comparison Summary')
    if (end !== -1) lines.splice(end)
    return {
      id: i + 1,
      title: lines[0].replace(/^\d\. /, ''),
      fee: lines[1].replace('Fee:', '').trim(),
      audience: lines[2].replace('Target Audience:', '').trim(),
      description: lines[3],
      topics: lines.slice(4),
    }
  })

export const shortAudience = ['Beginners & novices', 'Intermediate traders', 'Advanced / global traders', 'Long-term investors']
export const coreFocus = [
  'Basics, support/resistance, candlesticks, patterns',
  'Indicators, FnO, option Greeks, SMC, swing trading',
  'Forex instruments, news trading, lot sizing, SMC',
  'P&L, ratio analysis, valuations, cash flow',
]

export const officeImages = [
  ['office-insights-01-study-desk.jpg', 'Study desk'],
  ['office-insights-02-trader-at-work.jpg', 'Trader at work'],
  ['office-insights-03-team-analysis.jpg', 'Team analysis'],
  ['office-insights-04-reception.jpg', 'Reception'],
  ['office-insights-05-workspace.jpg', 'Workspace'],
]

// Add a `photo` path (e.g. '/founders/raj.jpg') or a `bio` to any founder and it will show up automatically.
export const founders = [
  { name: 'Raj Bothra', role: 'Co-Founder', photo: '/founders/raj.png' },
  { name: 'Rishi Soni', role: 'Co-Founder', photo: '/founders/rishi.png' },
  { name: 'Varun Bhati', role: 'Co-Founder', photo: '/founders/varun.png' },
]

export const values = [
  ['Clarity before complexity', 'Start with market structure, instruments, and price action before moving into advanced frameworks.'],
  ['Risk at every step', 'Connect execution with position sizing, drawdown management, and capital discipline.'],
  ['A long-term mindset', 'Bring trading psychology and fundamental business analysis into your wider market perspective.'],
]

export const services = [
  ['Technical analysis education', 'Learn market structure, candlesticks, support and resistance, and chart patterns. Progress into indicators, volume profiles, supply and demand, and Smart Money Concepts.', 1],
  ['Derivatives & strategy education', 'Study futures and options mechanics, option buying and selling, Greeks, Open Interest, swing setups, and the role of leverage.', 2],
  ['Global market education', 'Explore forex and commodity market sessions, lot sizing, liquidity cycles, economic calendars, and global technical frameworks.', 3],
  ['Fundamental analysis education', 'Build a framework for evaluating business models, financial statements, ratios, sector strength, and valuation.', 4],
  ['Risk management & trading psychology', 'Understand position sizing, risk-per-trade rules, drawdown phases, behavioral discipline, and the emotional demands of trading.', 2],
]

export const marketTags = ['EQUITIES', 'TECHNICAL ANALYSIS', 'FUTURES & OPTIONS', 'GLOBAL MARKETS', 'FOREX', 'SMART MONEY CONCEPTS', 'VALUE INVESTING', 'RISK MANAGEMENT']
