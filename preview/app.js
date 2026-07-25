import './preview.css';

const state = {
  active: 'overview',
  expected: 880,
  summary: { account: 2837.32, credit: 6442.2, expense: 9154.2, income: 5430, loan: 1700 },
  trend: [2451.23, 2612.45, 2785.3, 2670.8, 2912, 2945.6, 2837.32]
};

const sections = [
  ['overview', '总览', '', '⌂'],
  ['records', '最近记录', '', '◷'],
  ['expense', '支出', '本月支出金额', '↗'],
  ['account', '账户管理', '可用余额', '▣'],
  ['credit', '信用卡', '信用卡待还', '▤'],
  ['loan', '借出', '借出未收', '♟']
];

const money = value => new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const labels = { overview: '总览', account: '当前账户', credit: '信用卡', expense: '支出', income: '收入', loan: '借出', records: '最近记录' };

function nav() {
  return `<aside class="nav">${sections.map(([id, name, subtitle, icon]) => `
    <button class="nav-item ${state.active === id ? 'active' : ''}" data-section="${id}">
      <span class="nav-icon">${icon}</span><span><b>${name}</b></span>
    </button>`).join('')}</aside>`;
}

function chart() {
  const min = Math.min(...state.trend), max = Math.max(...state.trend), range = max - min || 1;
  const coords = state.trend.map((value, index) => `${28 + index * 92},${35 + (1 - (value - min) / range) * 130}`).join(' ');
  return `<section class="panel chart"><div class="panel-head"><h3>余额趋势</h3><span>近 7 天</span></div>
    <svg viewBox="0 0 610 220" preserveAspectRatio="none"><polyline points="${coords}" />${state.trend.map((value, index) => `<circle cx="${28 + index * 92}" cy="${35 + (1 - (value - min) / range) * 130}" r="5" />`).join('')}${state.trend.map((_, index) => `<text x="${28 + index * 92}" y="204" text-anchor="middle">05-${String(10 + index).padStart(2, '0')}</text>`).join('')}</svg></section>`;
}

function accountPage() {
  const after = state.summary.account - state.expected;
  return `<div class="hero clickable" id="expected-editor"><div><span>可用余额</span><em>${money(state.summary.account)}</em></div><i>▣</i><div class="projection"><div>预计支出： <b>${money(state.expected)}</b></div><hr><div>扣除后预计： <strong>${money(after)}</strong></div></div></div>
  <div class="grid"><section class="panel"><h3>资金明细</h3>${[['当前账户', state.summary.account], ['扣除预计支出后', after], ['信用卡待还', state.summary.credit], ['借出未收', state.summary.loan]].map(([name, value]) => `<div class="row"><span>${name}</span><b>${money(value)}</b></div>`).join('')}</section>${chart()}</div>`;
}

function overviewPage() {
  const cards = [['当前账户', state.summary.account, '▣'], ['信用卡待还', state.summary.credit, '▤'], ['本月支出', state.summary.expense, '↗'], ['本月收入', state.summary.income, '⇩'], ['借出未收', state.summary.loan, '♟']];
  return `<div class="overview-cards">${cards.map(([name, value, icon]) => `<div class="overview-card"><span>${icon}</span><div><small>${name}</small><b>${money(value)}</b></div></div>`).join('')}</div><div class="grid overview-grid"><section class="panel"><div class="panel-head"><h3>最近记录</h3><button class="more" data-section="records">查看全部</button></div>${[['超市购物','支出','-128.50'],['工资收入','收入','+5,430.00'],['信用卡还款','转账','-1,200.00'],['朋友借款','借出','-300.00']].map(([name,type,value]) => `<div class="row"><span>${name}<small>${type}</small></span><b>${value}</b></div>`).join('')}</section>${chart()}</div>`;
}

function metricPage() {
  const value = state.summary[state.active];
  const title = labels[state.active];
  const extra = state.active === 'expense' ? `<div class="projection"><div>预计支出： <b>${money(state.expected)}</b></div><hr><div>含预计支出： <strong>${money(value + state.expected)}</strong></div></div>` : '';
  return `<div class="hero ${state.active === 'expense' ? 'clickable' : ''}" id="expected-editor"><div><span>${title}概览</span><em>${money(value)}</em></div><i>◈</i>${extra}</div><section class="panel full"><h3>相关记录</h3><div class="row"><span>05-16 · 示例记录</span><b>${money(value)}</b></div><div class="row"><span>切换回 Obsidian 可查看真实记录</span><b>—</b></div></section>`;
}

function recordsPage() {
  return `<section class="panel full"><h3>最近记录</h3><p>本地预览只展示界面交互。真实记账、Canvas 和 Markdown 同步请在 Obsidian 中测试。</p><button class="primary" id="add-demo">添加示例记录</button></section>`;
}

function render() {
  const body = state.active === 'overview' ? overviewPage() : state.active === 'account' ? accountPage() : state.active === 'records' ? recordsPage() : metricPage();
  document.querySelector('#app').innerHTML = `<div class="shell">${nav()}<section class="workspace"><header><div class="toolbar"><button class="add" title="记一笔" data-section="records">＋ 记一笔</button><button title="更新">↻</button><button id="language">EN</button></div><h1>${labels[state.active]}</h1><p>${state.active === 'overview' ? '账户与本月收支概览' : state.active === 'account' ? '可用余额与账户明细' : '查看对应的资金概览与明细'}</p></header>${body}</section></div>`;
  document.querySelectorAll('[data-section]').forEach(button => button.onclick = () => { state.active = button.dataset.section; render(); });
  document.querySelector('#expected-editor')?.addEventListener('click', () => {
    const next = window.prompt('设置预计支出', String(state.expected));
    if (next !== null && Number.isFinite(Number(next)) && Number(next) >= 0) { state.expected = Number(next); render(); }
  });
  document.querySelector('#add-demo')?.addEventListener('click', () => window.alert('此功能请在 Obsidian 插件中测试。'));
  document.querySelectorAll('.toolbar button:not(#language):not(.add)').forEach(button => button.addEventListener('click', () => window.alert(`${button.title}：请在 Obsidian 插件中执行。`)));
}

render();
