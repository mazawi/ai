
const menu = document.getElementById('menu');
const mobile = document.getElementById('mobile');

function rebuildMenu() {
  if (!menu) return;
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const items = [
    ['about.html','About'],
    ['about.html#work-experience','Work Experience'],
    ['certificates.html','Certificates'],
    ['leadership.html','Leadership'],
    ['research.html','Research'],
    ['teaching.html','Teaching'],
    ['activities.html','Activities'],
    ['professional.html','Professional'],
    ['contact.html','Contacts']
  ];
  menu.innerHTML = items.map(([href,label]) => {
    const active = page === href;
    const classes = [
      href === 'contact.html' ? 'nav-cta' : '',
      active ? 'active' : ''
    ].filter(Boolean).join(' ');
    return `<a class="${classes}" href="${href}">${label}</a>`;
  }).join('');
}

function addWorkExperience() {
  if (!document.body || !window.location.pathname.endsWith('about.html')) return;
  if (document.getElementById('work-experience')) return;
  const footer = document.querySelector('footer');
  if (!footer) return;
  const section = document.createElement('section');
  section.id = 'work-experience';
  section.className = 'paper';
  section.innerHTML = `
    <div class="wrap">
      <div class="kicker">Career</div>
      <h2 class="section-title">Work experience</h2>
      <p class="lead">A higher education career spanning academic leadership, quality assurance, research, teaching and programme development across Oman, Jordan and Iraq.</p>
      <div class="timeline">
        <article class="t-item reveal"><small>2024–Present</small><h3>Associate Professor of AI · Deputy Dean for Academic Affairs, Research and Innovation</h3><p>Gulf College, Oman</p></article>
        <article class="t-item reveal"><small>2023–2024</small><h3>Associate Professor of AI · Quality Assurance Specialist</h3><p>Al-Buraimi University College, Oman</p></article>
        <article class="t-item reveal"><small>2021–2023</small><h3>Associate Professor</h3><p>Oman College of Management and Technology, Oman</p></article>
        <article class="t-item reveal"><small>2017–2021</small><h3>Assistant Dean for Academic Affairs and Scientific Research · Head of Quality Assurance Department · Assistant Professor</h3><p>Oman College of Management and Technology, Oman</p></article>
        <article class="t-item reveal"><small>2016–2017</small><h3>Acting Dean · Assistant Dean for Academic Affairs · Assistant Professor</h3><p>Oman College of Management and Technology, Oman</p></article>
        <article class="t-item reveal"><small>2011–2016</small><h3>Head of Department, Computer Science and Management Information Systems · Assistant Professor</h3><p>Oman College of Management and Technology, Oman</p></article>
        <article class="t-item reveal"><small>2008–2011</small><h3>Full-time Lecturer</h3><p>Oman College of Management and Technology, Oman</p></article>
        <article class="t-item reveal"><small>2006–2008</small><h3>Full-time Lecturer, Computing Department</h3><p>Gulf College, Oman</p></article>
        <article class="t-item reveal"><small>2001–2005</small><h3>Full-time Lecturer, Computer Engineering Department</h3><p>Yarmouk University, Jordan</p></article>
        <article class="t-item reveal"><small>2001</small><h3>Assistant Professor, Computer Engineering Department</h3><p>Al-Mustansiriyah University, Iraq</p></article>
        <article class="t-item reveal"><small>1997–1998</small><h3>Lecturer, Computer Engineering Department</h3><p>Al-Mustansiriyah University, Iraq</p></article>
      </div>
    </div>`;
  footer.parentNode.insertBefore(section, footer);
}

function mergePublications() {
  // Research and Publications are intentionally separate pages.
}


function renderProfileFooter() {
  const profiles = [
    {name:'Google Scholar', url:'https://scholar.google.com/citations?user=gZkc7AEAAAAJ&hl=en', domain:'scholar.google.com'},
    {name:'ORCID', url:'https://orcid.org/0000-0003-3073-610X', domain:'orcid.org'},
    {name:'ResearchGate', url:'https://www.researchgate.net/profile/Mohammad_Al-Azawi', domain:'researchgate.net'},
    {name:'LinkedIn', url:'https://www.linkedin.com/in/mohammad-al-azawi-phd-28158438/', domain:'linkedin.com'},
    {name:'IEEE', url:'https://ieeexplore.ieee.org/author/37085379418', domain:'ieeexplore.ieee.org'},
    {name:'Scopus', url:'https://www.scopus.com/authid/detail.uri?authorId=56042117800', domain:'scopus.com'},
    {name:'ACM Digital Library', url:'https://dl.acm.org/profile/99658973055', domain:'dl.acm.org'},
    {name:'Semantic Scholar', url:'https://www.semanticscholar.org/author/Mohammad-Al-Azawi/1409108448', domain:'semanticscholar.org'},
    {name:'GitHub', url:'https://github.com/mazawi/', domain:'github.com'},
    {name:'Kaggle', url:'https://www.kaggle.com/mohammadalazawi', domain:'kaggle.com'}
  ];

  document.querySelectorAll('.footer .social').forEach(social => {
    social.classList.add('footer-profile-icons');
    social.innerHTML = profiles.map(profile => `
      <a class="footer-profile-icon"
         href="${profile.url}"
         target="_blank"
         rel="noopener"
         aria-label="${profile.name}"
         title="${profile.name}">
        <img src="https://www.google.com/s2/favicons?domain=${profile.domain}&sz=64"
             alt=""
             loading="lazy">
      </a>
    `).join('');
  });
}

rebuildMenu();
renderProfileFooter();
addWorkExperience();
mergePublications();

if (mobile && menu) {
  mobile.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('visible');
}), {threshold:.12});

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
