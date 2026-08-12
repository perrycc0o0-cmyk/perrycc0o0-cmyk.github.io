'use strict';

const topics = [
  ['biology', 'Biology', '生命科学知识、公开论文与通用概念'],
  ['computation', 'Computation', 'Python · R · Linux · Data'],
  ['ai', 'Artificial Intelligence', '模型、工具与学习过程中的思考'],
  ['papers', 'Papers', '论文阅读、证据链与写作笔记'],
  ['methods', 'Methods', '公开、通用、可复现的方法与教程'],
  ['life', 'Notes & Life', '学习记录、科研生活与日常思考']
];

const exploreItems = [
  ['01', 'Biology', '生命科学相关知识、论文阅读与思考', '/categories/文章研读/'],
  ['02', 'Computation', '编程、数据分析、机器学习与实用工具', '/categories/方法分享/'],
  ['03', 'Papers', '沿着问题、证据与边界整理一篇论文', '/tags/文献阅读/'],
  ['04', 'Methods', '可以复用的公开方法、教程与工作流', '/categories/方法分享/'],
  ['05', 'Notes', '持续更新的学习记录与碎片化思考', '/categories/研究笔记/'],
  ['06', 'Life', '科学之外，关于阅读、写作与生活的记录', '/categories/研究笔记/']
];

const exploreHtml = exploreItems.map(([number, title, copy, href]) => `
  <a class="explore-card rg-reveal" href="${href}">
    <span class="explore-number">${number}</span>
    <span class="explore-orbit" aria-hidden="true"></span>
    <h3>${title}</h3>
    <p>${copy}</p>
    <span class="explore-link">Explore <b>↗</b></span>
  </a>`).join('');

const topicsHtml = topics.map(([id, title, copy], index) => `
  <a class="topic-row rg-reveal" href="/research/#${id}">
    <span>${String(index + 1).padStart(2, '0')}</span>
    <h3>${title}</h3>
    <p>${copy}</p>
    <b aria-hidden="true">↗</b>
  </a>`).join('');

const escapeHtml = value => String(value || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const normalizeCollectionName = value => {
  if (!value) return '';
  if (Array.isArray(value)) return normalizeCollectionName(value[0]);
  return value.name || String(value);
};

const stripContent = value => String(value || '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/[`*_>#\[\](){}|~-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const estimateWords = value => {
  const text = stripContent(value);
  const han = (text.match(/[\u3400-\u9fff]/g) || []).length;
  const latin = (text.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g) || []).length;
  return han + latin;
};

function getPosts() {
  const collection = hexo.locals.get('posts');
  return collection ? collection.toArray().filter(post => post.published !== false) : [];
}

function renderSeriesNavigator(page) {
  const series = normalizeCollectionName(page && page.series);
  if (!series) return '';
  const posts = getPosts()
    .filter(post => normalizeCollectionName(post.series) === series)
    .sort((a, b) => Number(a.series_order || 999) - Number(b.series_order || 999));
  if (!posts.length) return '';
  const currentIndex = posts.findIndex(post => post.path === page.path || post._id === page._id);
  const items = posts.map((post, index) => {
    const current = index === currentIndex;
    return `<li${current ? ' class="is-current"' : ''}><a href="/${post.path}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(post.title)}</a></li>`;
  }).join('');
  const previous = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  return `<nav class="post-series" aria-label="同系列文章">
    <header><div><span>LEARNING SERIES</span><h3>${escapeHtml(series)}</h3></div><b>${Math.max(currentIndex + 1, 1)} / ${posts.length}</b></header>
    <ol>${items}</ol>
    <div class="post-series-switch">
      ${previous ? `<a href="/${previous.path}"><span>上一篇</span>${escapeHtml(previous.title)}</a>` : '<i></i>'}
      ${next ? `<a href="/${next.path}"><span>下一篇</span>${escapeHtml(next.title)}</a>` : '<i></i>'}
    </div>
  </nav>`;
}

function renderStats() {
  const posts = getPosts();
  const categoryCounts = new Map();
  const seriesCounts = new Map();
  const tagNames = new Set();
  let words = 0;
  posts.forEach(post => {
    words += estimateWords(post.raw || post.content);
    const categories = post.categories && post.categories.toArray ? post.categories.toArray() : [];
    const tags = post.tags && post.tags.toArray ? post.tags.toArray() : [];
    categories.forEach(category => categoryCounts.set(category.name, (categoryCounts.get(category.name) || 0) + 1));
    tags.forEach(tag => tagNames.add(tag.name));
    const series = normalizeCollectionName(post.series);
    if (series) seriesCounts.set(series, (seriesCounts.get(series) || 0) + 1);
  });
  const maxCategory = Math.max(1, ...categoryCounts.values());
  const bars = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]).map(([name, count]) => `
    <div class="stats-bar"><div><span>${escapeHtml(name)}</span><b>${count} 篇</b></div><i><em style="width:${Math.max(12, Math.round(count / maxCategory * 100))}%"></em></i></div>`).join('');
  const series = Array.from(seriesCounts.entries()).map(([name, count]) => `
    <a class="stats-series-item" href="/series/"><span>${escapeHtml(name)}</span><b>${count} chapters</b></a>`).join('');
  const recent = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(post => `
    <a class="stats-recent-item" href="/${post.path}"><time>${post.date.format('YYYY.MM.DD')}</time><span>${escapeHtml(post.title)}</span></a>`).join('');
  return `<section class="stats-overview">
      <article><strong>${posts.length}</strong><span>公开文章</span></article>
      <article><strong>${categoryCounts.size}</strong><span>知识主题</span></article>
      <article><strong>${tagNames.size}</strong><span>关键词</span></article>
      <article><strong>${words.toLocaleString('zh-CN')}</strong><span>约计字词</span></article>
    </section>
    <section class="stats-grid">
      <article class="stats-panel"><span class="panel-kicker">DISTRIBUTION</span><h2>内容分布</h2>${bars}</article>
      <article class="stats-panel"><span class="panel-kicker">SERIES</span><h2>学习系列</h2>${series}</article>
      <article class="stats-panel stats-recent"><span class="panel-kicker">RECENT SIGNALS</span><h2>最近更新</h2>${recent}</article>
    </section>`;
}

const homepageIntro = `
<div id="research-galaxy-home" class="galaxy-home">
  <section class="galaxy-hero" aria-labelledby="galaxy-title">
    <div class="galaxy-sky" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="galaxy-coordinate" aria-hidden="true">OBSERVATORY 00 · PERRY / DEEP SPACE NOTES</div>
    <div class="galaxy-hero-inner">
      <p class="galaxy-eyebrow"><span></span> Private observatory · public notes</p>
      <h1 id="galaxy-title"><strong>PERRY</strong><em>Research Galaxy</em></h1>
      <p class="galaxy-subtitle">Biology · Computation · Curiosity</p>
      <p class="galaxy-copy">在生命、计算与未知之间持续探索。</p>
      <div class="galaxy-actions">
        <a class="galaxy-button primary" href="#explore">Explore the Galaxy</a>
        <a class="galaxy-button" href="#latest-notes">Latest Notes</a>
      </div>
      <p class="galaxy-motto">Observe · Think · Build</p>
    </div>
    <div class="galaxy-orbit-mark" aria-hidden="true"><span>P</span><i></i></div>
  </section>

  <section class="galaxy-section galaxy-explore" id="explore">
    <header class="galaxy-section-head rg-reveal">
      <div><span>01 / EXPLORE</span><h2>Explore the Galaxy</h2></div>
      <p>这里记录公开的知识、方法和思考。主题是入口，不是正在进行的研究项目。</p>
    </header>
    <div class="explore-grid">${exploreHtml}</div>
  </section>
</div>

<section class="galaxy-section latest-notes-heading rg-reveal" id="latest-notes">
  <header class="galaxy-section-head">
    <div><span>02 / LATEST NOTES</span><h2>Latest Notes</h2></div>
    <p>论文阅读、方法分享、编程经验与日常思考，按时间缓慢积累。</p>
  </header>
</section>`;

const homepageOutro = `
<section class="galaxy-section galaxy-topics" id="topics">
  <header class="galaxy-section-head rg-reveal">
    <div><span>03 / TOPICS</span><h2>Knowledge Constellations</h2></div>
    <p>一张只指向公开内容的星图：生命、计算、阅读、方法与好奇心。</p>
  </header>
  <div class="topic-list">${topicsHtml}</div>
  <a class="topic-index-link rg-reveal" href="/research/">Open the topic index <b>↗</b></a>
</section>

<section class="galaxy-about rg-reveal">
  <div class="galaxy-about-mark" aria-hidden="true"><span>P</span></div>
  <div><span>04 / ABOUT PERRY</span><h2>Somewhere between biology and computation.</h2></div>
  <p>一个喜欢生命科学、计算、人工智能与探索未知的研究者。这里记录学习、技术与思考。</p>
  <a href="/about/">About Perry <b>↗</b></a>
</section>`;

hexo.extend.filter.register('after_render:html', function (html, data) {
  const siteUrl = (hexo.config.url || '').replace(/\/$/, '');
  const socialImage = `${siteUrl}/img/perrys-galaxy-social.png`;

  html = html
    .replace(/configTitle: 'Perry's Galaxy'/g, "configTitle: 'Perry\\'s Galaxy'")
    .replace(/<div class="console-card-group-reward">[\s\S]*?<div class="console-card-group">/g, '<div class="console-card-group">')
    .replace(/<script src="https:\/\/cdn\.cbd\.int\/qrcodejs@[^>]*><\/script>/g, '')
    .replace(/<meta property="og:image" content="[^"]*">/i, `<meta property="og:image" content="${socialImage}">`)
    .replace(/<meta name="twitter:image" content="[^"]*">/i, `<meta name="twitter:image" content="${socialImage}">`);

  if (data.path === 'stats/index.html') {
    html = html.replace('<!-- PERRY_STATS -->', renderStats());
  }

  if (data.page && data.page.layout === 'post') {
    const navigator = renderSeriesNavigator(data.page);
    if (navigator && html.includes('</article>')) html = html.replace('</article>', `${navigator}</article>`);
  }

  if (data.path !== 'index.html') return html;

  const marker = '<div class="layout" id="content-inner">';
  if (!html.includes(marker) || html.includes('id="research-galaxy-home"')) return html;

  return html
    .replace(marker, `${homepageIntro}${marker}`)
    .replace('</main>', `${homepageOutro}</main>`);
});
