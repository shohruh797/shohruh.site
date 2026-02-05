/* Mega Portfolio - vanilla JS.
   Shortcuts: T theme, L lang, / search, ? help, Esc close.
*/

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const yearEl = $("#year");
const toast = $("#toast");
const progress = $("#progress");

const themeBtn = $("#themeBtn");
const langBtn = $("#langBtn");
const cmdBtn = $("#cmdBtn");
const menuBtn = $("#menuBtn");

const drawer = $("#drawer");
const drawerClose = $("#drawerClose");

const grid = $("#grid");
const q = $("#q");
const tag = $("#tag");
const sort = $("#sort");
const onlyFavBtn = $("#onlyFavBtn");
const clearFavBtn = $("#clearFavBtn");
const loadBtn = $("#loadBtn");

const kpiProjects = $("#kpiProjects");
const kpiFav = $("#kpiFav");
const kpiStatus = $("#kpiStatus");

const miniTheme = $("#miniTheme");
const miniLang = $("#miniLang");

const skillsWrap = $("#skillsWrap");

const modal = $("#modal");
const mClose = $("#mClose");
const mTitle = $("#mTitle");
const mMeta = $("#mMeta");
const mDesc = $("#mDesc");
const mTags = $("#mTags");
const mLink = $("#mLink");
const mFav = $("#mFav");

const help = $("#help");
const helpClose = $("#helpClose");

const statToday = $("#statToday");
const statStreak = $("#statStreak");

yearEl.textContent = new Date().getFullYear();

function safe(s) {
  return String(s).replace(/[<>&"]/g, (c) => ({ "<":"&lt;", ">":"&gt;", "&":"&amp;", '"':"&quot;" }[c]));
}
function toastMsg(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastMsg._t);
  toastMsg._t = setTimeout(() => toast.classList.remove("show"), 1500);
}

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

/* Theme */
function getTheme(){ return localStorage.getItem("theme") || "auto"; }
function applyTheme(mode){
  if(mode === "auto"){
    document.documentElement.removeAttribute("data-theme");
    themeBtn.textContent = "🌓";
  } else {
    document.documentElement.setAttribute("data-theme", mode);
    themeBtn.textContent = mode === "light" ? "☀️" : "🌙";
  }
  miniTheme.textContent = mode;
}
function cycleTheme(){
  const cur = getTheme();
  const next = cur === "auto" ? "dark" : cur === "dark" ? "light" : "auto";
  localStorage.setItem("theme", next);
  applyTheme(next);
  toastMsg("Theme: " + next);
}

/* Language (very small i18n) */
const I18N = {
  uz: {
    nav_features: "Funksiyalar",
    nav_projects: "Loyihalar",
    nav_skills: "Ko‘nikmalar",
    nav_contact: "Aloqa",
    cta_contact: "Bog‘lanish",
    pill: "⚡ Fullstack yo‘lida: HTML → CSS → JS → JSON",
    hero_title: "Zamonaviy, tez va chiroyli web sahifalar.",
    hero_lead: "Bu demo sayt JSON’dan data yuklaydi, search/filter/sort qiladi, modal ochadi, favorites saqlaydi, tema va til almashtiradi. Ha, hammasi frontend. Backend keyin.",
    hero_btn_projects: "Loyihalarni ko‘rish",
    hero_btn_reload: "Data’ni qayta yuklash",
    kpi_projects: "Loyihalar",
    kpi_favorites: "Saqlangan",
    kpi_status: "Holat",
    features_title: "Funksiyalar",
    features_sub: "“Ko‘p funksiyali” deganing shuni nazarda tutgan bo‘lsa kerak 🙂",
    f1_title: "Search / Filter / Sort",
    f1_desc: "Loyihalarni qidirish, tag bo‘yicha filter, reyting bo‘yicha sort.",
    f2_title: "Modal + Favorites",
    f2_desc: "Kartani bos, modal ochiladi. Yurak bos, saqlanadi.",
    f3_title: "Theme + i18n",
    f3_desc: "Dark/Light/Auto tema va UZ/EN til almashtirish.",
    f4_title: "Keyboard shortcuts",
    f4_desc: "T tema, L til, / qidirish, Esc yopish, ? yordam.",
    f5_title: "Toasts + Validation",
    f5_desc: "Xabarlar (toast) va contact form validatsiya.",
    f6_title: "Active nav + Progress",
    f6_desc: "Scroll progress va qaysi bo‘limdasan ko‘rsatadi.",
    projects_title: "Loyihalar",
    projects_sub: "Hammasi data.jsondan. Qo‘lda azob yo‘q.",
    only_fav: "Faqat saqlangan",
    clear_fav: "Saqlanganlarni tozalash",
    skills_title: "Ko‘nikmalar",
    skills_sub: "Frontend foundation. Backend keyin “urib” keladi 😄",
    contact_title: "Aloqa",
    contact_sub: "Hozir frontend demo. Backend ulasak, real yuboradi.",
    contact_fast: "Tezkor",
    contact_hint: "Xohlasang keyin formani Telegram bot yoki emailga yuboradigan backend ham qilib beramiz.",
    form_title: "Xabar yuborish",
    form_name: "Ism",
    form_msg: "Xabar",
    form_agree: "Spam emasligini va’da qilaman.",
    form_send: "Yuborish",
    modal_open: "Ochish",
    help_title: "Tez tugmalar",
    h_theme: "Tema almashtirish",
    h_lang: "Til almashtirish",
    h_search: "Qidirishga fokus",
    h_esc: "Modal/menyu yopish",
    h_help: "Yordam oynasi",
    help_hint: "Bu “command palette”ning yengil varianti. Backend bo‘lsa, bundan ham ko‘p narsalar qilinadi.",
    drawer_title: "Menyu",
    drawer_hint: "Tez tugmalar: T (tema), L (til), / (qidirish), ? (help)",
    footer: "Internet hamma narsani eslab qoladi."
  },
  en: {
    nav_features: "Features",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_contact: "Contact",
    cta_contact: "Contact",
    pill: "⚡ Fullstack path: HTML → CSS → JS → JSON",
    hero_title: "Modern, fast, and clean web pages.",
    hero_lead: "This demo loads JSON data, supports search/filter/sort, opens modals, stores favorites, and switches theme + language. All frontend. Backend later.",
    hero_btn_projects: "View projects",
    hero_btn_reload: "Reload data",
    kpi_projects: "Projects",
    kpi_favorites: "Saved",
    kpi_status: "Status",
    features_title: "Features",
    features_sub: "So you wanted 'too many features'… here you go 🙂",
    f1_title: "Search / Filter / Sort",
    f1_desc: "Search projects, filter by tag, sort by rating/year.",
    f2_title: "Modal + Favorites",
    f2_desc: "Click a card to open modal. Heart to save.",
    f3_title: "Theme + i18n",
    f3_desc: "Dark/Light/Auto theme and UZ/EN language toggle.",
    f4_title: "Keyboard shortcuts",
    f4_desc: "T theme, L language, / search, Esc close, ? help.",
    f5_title: "Toasts + Validation",
    f5_desc: "Toast notifications and contact form validation.",
    f6_title: "Active nav + Progress",
    f6_desc: "Scroll progress and active section highlight.",
    projects_title: "Projects",
    projects_sub: "Loaded from data.json. No manual pain.",
    only_fav: "Only favorites",
    clear_fav: "Clear favorites",
    skills_title: "Skills",
    skills_sub: "Frontend foundation. Backend will show up later 😄",
    contact_title: "Contact",
    contact_sub: "Frontend demo now. Backend later for real sending.",
    contact_fast: "Quick",
    contact_hint: "Later we can connect this form to Telegram bot or email via backend.",
    form_title: "Send a message",
    form_name: "Name",
    form_msg: "Message",
    form_agree: "I promise it's not spam.",
    form_send: "Send",
    modal_open: "Open",
    help_title: "Shortcuts",
    h_theme: "Toggle theme",
    h_lang: "Toggle language",
    h_search: "Focus search",
    h_esc: "Close modal/menu",
    h_help: "Help window",
    help_hint: "A tiny command palette. With backend, we can do much more.",
    drawer_title: "Menu",
    drawer_hint: "Shortcuts: T (theme), L (lang), / (search), ? (help)",
    footer: "The internet remembers everything."
  }
};
function getLang(){ return localStorage.getItem("lang") || "uz"; }
function applyLang(code){
  const dict = I18N[code] || I18N.uz;
  $$("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (dict[k]) el.textContent = dict[k];
  });
  langBtn.textContent = code.toUpperCase();
  miniLang.textContent = code;
}
function toggleLang(){
  const cur = getLang();
  const next = cur === "uz" ? "en" : "uz";
  localStorage.setItem("lang", next);
  applyLang(next);
  toastMsg("Lang: " + next);
}

/* Drawer */
function openDrawer(){ drawer.classList.add("show"); drawer.setAttribute("aria-hidden", "false"); }
function closeDrawer(){ drawer.classList.remove("show"); drawer.setAttribute("aria-hidden", "true"); }

/* Modal */
function openModal(){ modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); }
function closeModal(){ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); }
function openHelp(){ help.classList.add("show"); help.setAttribute("aria-hidden","false"); }
function closeHelp(){ help.classList.remove("show"); help.setAttribute("aria-hidden","true"); }

function escClose(){
  closeModal(); closeHelp(); closeDrawer();
}

/* Scroll progress + active nav */
function onScroll(){
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  progress.style.width = pct.toFixed(2) + "%";

  // active nav
  const sections = ["features","projects","skills","contact"].map(id => document.getElementById(id)).filter(Boolean);
  const y = window.scrollY + 140;
  let active = "features";
  for(const s of sections){
    if (s.offsetTop <= y) active = s.id;
  }
  $$(".navlink").forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === "#" + active);
  });
}

/* Local stats (today views + streak) */
function isoDate(d=new Date()){
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const dd = String(d.getDate()).padStart(2,"0");
  return `${yyyy}-${mm}-${dd}`;
}
function loadStats(){
  const today = isoDate();
  const last = localStorage.getItem("last_visit") || "";
  let views = Number(localStorage.getItem("views_today") || "0");
  let streak = Number(localStorage.getItem("streak") || "0");

  if (last !== today){
    // new day
    localStorage.setItem("views_today","0");
    views = 0;

    if (last){
      const lastDate = new Date(last);
      const tDate = new Date(today);
      const diffDays = Math.round((tDate - lastDate)/(1000*60*60*24));
      streak = diffDays === 1 ? (streak + 1) : 1;
    } else {
      streak = 1;
    }
    localStorage.setItem("streak", String(streak));
    localStorage.setItem("last_visit", today);
  }

  views += 1;
  localStorage.setItem("views_today", String(views));

  statToday.textContent = String(views);
  statStreak.textContent = String(streak);
}

/* Favorites */
function favKey(){ return "favorites_v1"; }
function getFavs(){
  try { return new Set(JSON.parse(localStorage.getItem(favKey()) || "[]")); }
  catch { return new Set(); }
}
function setFavs(set){
  localStorage.setItem(favKey(), JSON.stringify(Array.from(set)));
  kpiFav.textContent = String(set.size);
}
function isFav(id){ return getFavs().has(id); }
function toggleFav(id){
  const set = getFavs();
  if (set.has(id)) set.delete(id); else set.add(id);
  setFavs(set);
  return set.has(id);
}
function clearFavs(){
  localStorage.setItem(favKey(), "[]");
  setFavs(new Set());
}

/* Data */
let DATA = null;
let PROJECTS = [];
let ONLY_FAV = false;

function buildTagOptions(items){
  const set = new Set();
  items.forEach(p => (p.tags||[]).forEach(t => set.add(t)));
  const tags = ["all", ...Array.from(set).sort()];
  tag.innerHTML = tags.map(t => `<option value="${safe(t)}">${safe(t)}</option>`).join("");
}

function renderSkills(skills){
  skillsWrap.innerHTML = skills.map(s => `
    <div class="card reveal">
      <div class="skillTop">
        <span>${safe(s.name)}</span>
        <span class="muted">${safe(s.level)}%</span>
      </div>
      <div class="bar"><div class="fill" style="width:${clamp(Number(s.level)||0,0,100)}%"></div></div>
    </div>
  `).join("");
  revealNow();
}

function sortProjects(list){
  const v = sort.value;
  const cp = [...list];
  const by = (k, dir) => cp.sort((a,b) => (Number(a[k]) - Number(b[k])) * dir);
  if (v === "rating_desc") return by("rating", -1);
  if (v === "rating_asc") return by("rating", 1);
  if (v === "year_desc") return by("year", -1);
  if (v === "year_asc") return by("year", 1);
  return cp;
}

function applyFilter(){
  let list = PROJECTS;

  const query = (q.value || "").trim().toLowerCase();
  const t = tag.value;

  if (t && t !== "all") list = list.filter(p => (p.tags||[]).includes(t));
  if (query) {
    list = list.filter(p => {
      const text = `${p.title} ${p.desc} ${(p.tags||[]).join(" ")} ${p.status}`.toLowerCase();
      return text.includes(query);
    });
  }
  if (ONLY_FAV){
    const favs = getFavs();
    list = list.filter(p => favs.has(p.id));
  }

  list = sortProjects(list);
  renderProjects(list);
}

function renderProjects(list){
  const favs = getFavs();
  grid.innerHTML = list.map(p => {
    const tagsHtml = (p.tags||[]).map(t => `<span class="tag">#${safe(t)}</span>`).join("");
    const heartOn = favs.has(p.id);
    const statusIcon = p.status === "active" ? "🟢" : p.status === "planned" ? "🟡" : "⚪";
    return `
      <article class="card reveal" data-id="${safe(p.id)}">
        <div class="projectTop">
          <span class="badge">${statusIcon} ${safe(p.status)} · ${safe(p.year)} · ★${safe(p.rating)}</span>
          <button class="heart ${heartOn ? "on":""}" data-fav="${safe(p.id)}" type="button" aria-label="Favorite">${heartOn ? "♥":"♡"}</button>
        </div>
        <h3>${safe(p.title)}</h3>
        <p class="muted">${safe(p.desc)}</p>
        <div class="tags">${tagsHtml}</div>
      </article>
    `;
  }).join("");

  // events
  $$("[data-fav]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-fav");
      const on = toggleFav(id);
      btn.classList.toggle("on", on);
      btn.textContent = on ? "♥" : "♡";
      toastMsg(on ? "Saved" : "Removed");
      applyFilter();
    });
  });

  $$("#grid .card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      const p = PROJECTS.find(x => x.id === id);
      if (p) showProjectModal(p);
    });
  });

  kpiProjects.textContent = String(PROJECTS.length);
  setFavs(getFavs());
  revealNow();
}

function showProjectModal(p){
  mTitle.textContent = p.title;
  mMeta.textContent = `${p.status} · ${p.year} · ★${p.rating}`;
  mDesc.textContent = p.desc;
  mTags.innerHTML = (p.tags||[]).map(t => `<span class="tag">#${safe(t)}</span>`).join("");
  mLink.href = p.url || "#";
  mFav.textContent = isFav(p.id) ? "♥" : "♡";
  mFav.classList.toggle("on", isFav(p.id));
  mFav.onclick = () => {
    const on = toggleFav(p.id);
    mFav.textContent = on ? "♥" : "♡";
    mFav.classList.toggle("on", on);
    toastMsg(on ? "Saved" : "Removed");
    applyFilter();
  };
  openModal();
}

/* Reveal */
function revealNow(){
  const els = $$(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) ent.target.classList.add("show");
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* Load JSON */
async function loadData(){
  kpiStatus.textContent = "…";
  try{
    const res = await fetch("data.json", { cache: "no-store" });
    if(!res.ok) throw new Error("data.json o‘qilmadi");

    DATA = await res.json();
    PROJECTS = DATA.projects || [];
    buildTagOptions(PROJECTS);

    renderProjects(sortProjects(PROJECTS));
    renderSkills(DATA.skills || []);

    kpiStatus.textContent = "ok";
    toastMsg("Data loaded ✅");
  } catch(err){
    kpiStatus.textContent = "err";
    grid.innerHTML = `
      <div class="card">
        <h3>Error</h3>
        <p class="muted">JSON yuklanmadi. Server bilan och: <code>python3 -m http.server 8000</code></p>
        <p class="muted small">${safe(err.message)}</p>
      </div>
    `;
    toastMsg("JSON error ❌");
  }
}

/* Contact form */
function initForm(){
  const form = $("#form");
  const out = $("#formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name")||"").trim();
    const msg = String(fd.get("msg")||"").trim();
    const agree = fd.get("agree");

    if(name.length < 2 || msg.length < 8 || !agree){
      out.textContent = "Formani to‘liq to‘ldir 🙂";
      toastMsg("Validation");
      return;
    }
    form.reset();
    out.textContent = "Qabul qilindi ✅ (backend keyin)";
    toastMsg("Sent ✅");
  });
}

/* Events */
themeBtn.addEventListener("click", cycleTheme);
langBtn.addEventListener("click", toggleLang);

cmdBtn.addEventListener("click", openHelp);

menuBtn.addEventListener("click", () => {
  drawer.classList.contains("show") ? closeDrawer() : openDrawer();
});
drawerClose.addEventListener("click", closeDrawer);
drawer.addEventListener("click", (e) => { if(e.target === drawer) closeDrawer(); });

mClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });

helpClose.addEventListener("click", closeHelp);
help.addEventListener("click", (e) => { if(e.target === help) closeHelp(); });

loadBtn.addEventListener("click", loadData);

q.addEventListener("input", applyFilter);
tag.addEventListener("change", applyFilter);
sort.addEventListener("change", applyFilter);

onlyFavBtn.addEventListener("click", () => {
  ONLY_FAV = !ONLY_FAV;
  onlyFavBtn.classList.toggle("on", ONLY_FAV);
  toastMsg(ONLY_FAV ? "Only favorites" : "All projects");
  applyFilter();
});
clearFavBtn.addEventListener("click", () => {
  clearFavs();
  toastMsg("Favorites cleared");
  applyFilter();
});

window.addEventListener("scroll", onScroll, { passive:true });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") escClose();
  if (e.key === "t" || e.key === "T") cycleTheme();
  if (e.key === "l" || e.key === "L") toggleLang();
  if (e.key === "/") { e.preventDefault(); q.focus(); }
  if (e.key === "?") openHelp();
});

/* Init */
applyTheme(getTheme());
applyLang(getLang());
loadStats();
setFavs(getFavs());
onScroll();
initForm();
loadData();
revealNow();
