(function () {
  'use strict';

  var poems = [
    ['路漫漫其修远兮，吾将上下而求索。', '屈原《离骚》'],
    ['纸上得来终觉浅，绝知此事要躬行。', '陆游《冬夜读书示子聿》'],
    ['问渠那得清如许？为有源头活水来。', '朱熹《观书有感》'],
    ['长风破浪会有时，直挂云帆济沧海。', '李白《行路难》'],
    ['不畏浮云遮望眼，自缘身在最高层。', '王安石《登飞来峰》'],
    ['山重水复疑无路，柳暗花明又一村。', '陆游《游山西村》'],
    ['千淘万漉虽辛苦，吹尽狂沙始到金。', '刘禹锡《浪淘沙》'],
    ['欲穷千里目，更上一层楼。', '王之涣《登鹳雀楼》'],
    ['博观而约取，厚积而薄发。', '苏轼《稼说送张琥》'],
    ['会当凌绝顶，一览众山小。', '杜甫《望岳》'],
    ['沉舟侧畔千帆过，病树前头万木春。', '刘禹锡《酬乐天扬州初逢席上见赠》'],
    ['知之者不如好之者，好之者不如乐之者。', '《论语·雍也》']
  ];

  var petLines = ['今天也一起探索。', '累了就看看远处。', '一个问题，一次前进。', '记得保存灵感。', '要不要随机读一篇？'];

  function showPoem() {
    if (document.querySelector('.poem-portal')) return;
    var poem = poems[Math.floor(Math.random() * poems.length)];
    var portal = document.createElement('section');
    portal.className = 'poem-portal';
    portal.setAttribute('aria-label', '今日诗句');
    portal.innerHTML = '<div class="poem-stars"></div><div class="poem-card"><span>PERRY\'S GALAXY · ENTRY</span><blockquote>' + poem[0] + '</blockquote><cite>' + poem[1] + '</cite></div><div class="poem-scroll-cue" aria-hidden="true"><i></i><span>SCROLL TO EXPLORE</span></div>';
    document.body.insertBefore(portal, document.body.firstChild);
  }

  function createPet() {
    if (document.getElementById('perry-pet')) return;
    var pet = document.createElement('button');
    pet.id = 'perry-pet';
    pet.type = 'button';
    pet.setAttribute('aria-label', 'Perry 的星际小宠物，点击与它互动');
    pet.innerHTML = '<span class="pet-bubble">今天也一起探索。</span><span class="pet-antenna"></span><span class="pet-body"><i class="pet-eye left"></i><i class="pet-eye right"></i><i class="pet-mouth"></i></span><span class="pet-tail"></span>';
    document.body.appendChild(pet);
    pet.addEventListener('click', function () {
      var bubble = pet.querySelector('.pet-bubble');
      bubble.textContent = petLines[Math.floor(Math.random() * petLines.length)];
      pet.classList.remove('is-talking');
      void pet.offsetWidth;
      pet.classList.add('is-talking');
    });
  }

  function initToolSearch() {
    var input = document.getElementById('tool-search-input');
    if (!input || input.dataset.ready) return;
    input.dataset.ready = 'true';
    input.addEventListener('input', function () {
      var query = input.value.trim().toLowerCase();
      var visible = 0;
      document.querySelectorAll('.tool-card').forEach(function (card) {
        var match = !query || card.textContent.toLowerCase().indexOf(query) !== -1;
        card.hidden = !match;
        if (match) visible += 1;
      });
      document.querySelectorAll('.tool-group').forEach(function (group) {
        group.hidden = !Array.from(group.querySelectorAll('.tool-card')).some(function (card) { return !card.hidden; });
      });
      var empty = document.querySelector('.tool-empty');
      if (empty) empty.hidden = visible !== 0;
    });
  }

  function boot() {
    createPet();
    initToolSearch();
  }

  document.addEventListener('DOMContentLoaded', function () { showPoem(); boot(); });
  document.addEventListener('pjax:complete', boot);
})();
