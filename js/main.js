(function () {
  "use strict";

  var CATEGORY_LABEL = {
    psych: "심리",
    data: "데이터",
    mixed: "융합"
  };

  var projects = [];

  /* ---------- 1. 스크롤 진입 애니메이션 ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 2. 프로젝트 렌더링 ---------- */
  var grid = document.getElementById("projectGrid");
  var status = document.getElementById("projectStatus");

  function makeCard(project) {
    var card = document.createElement("article");
    card.className = "card";

    var badge = document.createElement("span");
    badge.className = "card__badge";
    badge.textContent = CATEGORY_LABEL[project.category] || "프로젝트";
    card.appendChild(badge);

    var title = document.createElement("h3");
    title.className = "card__title";
    title.textContent = project.title;
    card.appendChild(title);

    if (project.summary) {
      var desc = document.createElement("p");
      desc.className = "card__desc";
      desc.textContent = project.summary;
      card.appendChild(desc);
    }

    var metaKeys = [
      ["problem", "문제"],
      ["data", "데이터"],
      ["method", "방법"],
      ["result", "결과"]
    ];

    if (metaKeys.some(function (pair) { return project[pair[0]]; })) {
      var meta = document.createElement("dl");
      meta.className = "card__meta";
      metaKeys.forEach(function (pair) {
        if (!project[pair[0]]) return;
        var row = document.createElement("div");
        var key = document.createElement("b");
        key.textContent = pair[1] + " · ";
        row.appendChild(key);
        row.appendChild(document.createTextNode(project[pair[0]]));
        meta.appendChild(row);
      });
      card.appendChild(meta);
    }

    return card;
  }

  function makePlaceholder(index) {
    var card = document.createElement("article");
    card.className = "card";

    var badge = document.createElement("span");
    badge.className = "card__badge card__badge--muted";
    badge.textContent = "준비 중";
    card.appendChild(badge);

    var title = document.createElement("h3");
    title.className = "card__title";
    title.textContent = "프로젝트 " + (index + 1);
    card.appendChild(title);

    var desc = document.createElement("p");
    desc.className = "card__desc";
    desc.textContent = "문제 정의부터 결과 해석까지 정리되면 이 자리에 올라갑니다.";
    card.appendChild(desc);

    return card;
  }

  function renderProjects(filter) {
    if (!grid || !status) return;
    grid.textContent = "";

    var list = projects.filter(function (project) {
      return filter === "all" || project.category === filter;
    });

    if (list.length > 0) {
      list.forEach(function (project) { grid.appendChild(makeCard(project)); });
      status.textContent = list.length + "개의 프로젝트";
      return;
    }

    if (filter === "all") {
      for (var i = 0; i < 3; i += 1) grid.appendChild(makePlaceholder(i));
      status.textContent = "프로젝트 3건 준비 중입니다.";
      return;
    }

    var empty = document.createElement("article");
    empty.className = "card card--empty";
    var emptyTitle = document.createElement("h3");
    emptyTitle.className = "card__title";
    emptyTitle.textContent = "아직 " + (CATEGORY_LABEL[filter] || "") + " 프로젝트가 없습니다";
    var emptyDesc = document.createElement("p");
    emptyDesc.className = "card__desc";
    emptyDesc.textContent = "다른 카테고리를 보거나 전체 보기를 선택해 주세요.";
    empty.appendChild(emptyTitle);
    empty.appendChild(emptyDesc);
    grid.appendChild(empty);
    status.textContent = "해당 카테고리의 프로젝트 0건";
  }

  /* ---------- 4. 카테고리 필터 ---------- */
  var filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (other) {
        other.classList.remove("is-active");
        other.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
      renderProjects(button.getAttribute("data-filter"));
    });
  });

  renderProjects("all");

  /* ---------- 2. 앵커 이동 + 현재 섹션 강조 ---------- */
  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.getElementById(link.getAttribute("data-nav"));
  }).filter(Boolean);

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("data-nav") === id;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- 6. 모바일 메뉴 ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "메뉴 열기");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    });

    navMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!navMenu.classList.contains("is-open")) return;
      if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* ---------- 기타 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
