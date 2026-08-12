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
  <p>一个喜欢生命科学、计算、人工智能与探索未知的研究者。这里展示学习、技术与思考，不展示未公开的研究项目。</p>
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

  if (data.path !== 'index.html') return html;

  const marker = '<div class="layout" id="content-inner">';
  if (!html.includes(marker) || html.includes('id="research-galaxy-home"')) return html;

  return html
    .replace(marker, `${homepageIntro}${marker}`)
    .replace('</main>', `${homepageOutro}</main>`);
});
