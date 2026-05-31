/* ═══════════════════════════════════════════════
   PHÙNG ĐỨC TÀI — PORTFOLIO v2
   Interactive Effects + Mini Games
   ═══════════════════════════════════════════════ */

(function () {
  "use strict";

  // Initialize everything on DOM ready
  document.addEventListener("DOMContentLoaded", initAllEffects);

  function initAllEffects() {
    initCursorGlow();
    initNavbar();
    initScrollReveal();
    initTypingEffect();
    initCountUp();
    initSkillBars();
    initParticles();
    initCardGlow();
    initBackToTop();
    initSmoothScroll();

    // Mini Games
    initMemoryGame();
    initClickSpeedGame();
    initStarCatchGame();

    // Music Player
    initMusicPlayer();
  }

  /* ══════════════════════════════════════════════
     CURSOR GLOW (desktop only)
     ══════════════════════════════════════════════ */
  function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow || window.matchMedia("(max-width: 768px)").matches) return;

    let mouseX = 0,
      mouseY = 0,
      glowX = 0,
      glowY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.classList.add("active");
    });
    document.addEventListener("mouseleave", () =>
      glow.classList.remove("active"),
    );

    function animate() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ══════════════════════════════════════════════
     NAVBAR
     ══════════════════════════════════════════════ */
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("navHamburger");
    const navLinks = document.getElementById("navLinks");
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    function checkScroll() {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    function closeMenu() {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
    }

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("open");
      hamburger.classList.toggle("active", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
    });

    links.forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    // Block scroll-through on iOS when menu open
    navLinks.addEventListener("touchmove", (e) => {
      e.preventDefault();
    }, { passive: false });

    function updateActiveLink() {
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 150) current = s.id;
      });
      links.forEach((l) =>
        l.classList.toggle("active", l.dataset.section === current),
      );
    }
    window.addEventListener("scroll", updateActiveLink, { passive: true });
  }

  /* ══════════════════════════════════════════════
     SCROLL REVEAL
     ══════════════════════════════════════════════ */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  /* ══════════════════════════════════════════════
     TYPING EFFECT
     ══════════════════════════════════════════════ */
  function initTypingEffect() {
    const el = document.getElementById("typingText");
    if (!el) return;

    const words = [
      "Web Designer",
      "React Developer",
      "Content Creator",
      "UI/UX Designer",
      "Next.js Developer",
      "TikToker 200K+",
      "Video Editor",
      "Full-stack Dev",
      "Sinh viên CNTT",
    ];

    let wordIdx = 0,
      charIdx = 0,
      deleting = false,
      speed = 100;

    function type() {
      const word = words[wordIdx];
      if (deleting) {
        el.textContent = word.substring(0, --charIdx);
        speed = 50;
      } else {
        el.textContent = word.substring(0, ++charIdx);
        speed = 100;
      }

      if (!deleting && charIdx === word.length) {
        speed = 2000;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }
    type();
  }

  /* ══════════════════════════════════════════════
     COUNT UP ANIMATION
     ══════════════════════════════════════════════ */
  function initCountUp() {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(
              e.target,
              0,
              parseInt(e.target.dataset.count, 10),
              1800,
            );
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.5 },
    );
    document
      .querySelectorAll(".stat-number[data-count]")
      .forEach((c) => observer.observe(c));
  }

  function animateCount(el, start, end, duration) {
    const t0 = performance.now();
    function update(t) {
      const p = Math.min((t - t0) / duration, 1);
      el.textContent = Math.round(
        start + (end - start) * (1 - Math.pow(1 - p, 3)),
      );
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ══════════════════════════════════════════════
     SKILL BARS
     ══════════════════════════════════════════════ */
  function initSkillBars() {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.style.width = e.target.dataset.level + "%";
            }, 200);
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.3 },
    );
    document
      .querySelectorAll(".tech-bar-fill[data-level]")
      .forEach((b) => observer.observe(b));
  }

  /* ══════════════════════════════════════════════
     FLOATING PARTICLES
     ══════════════════════════════════════════════ */
  function initParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    const count = window.matchMedia("(max-width: 768px)").matches ? 15 : 30;
    const colors = [
      "rgba(192,132,252,0.4)",
      "rgba(34,211,238,0.3)",
      "rgba(236,72,153,0.3)",
      "rgba(124,58,237,0.4)",
    ];

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.classList.add("particle");
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.setProperty("--duration", 5 + Math.random() * 10 + "s");
      p.style.setProperty("--delay", Math.random() * 8 + "s");
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      const size = 2 + Math.random() * 3 + "px";
      p.style.width = size;
      p.style.height = size;
      container.appendChild(p);
    }
  }

  /* ══════════════════════════════════════════════
     CARD GLOW (mouse tracking)
     ══════════════════════════════════════════════ */
  function initCardGlow() {
    document.querySelectorAll(".glass-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", e.clientX - r.left + "px");
        card.style.setProperty("--mouse-y", e.clientY - r.top + "px");
      });
    });
  }

  /* ══════════════════════════════════════════════
     BACK TO TOP
     ══════════════════════════════════════════════ */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      () => btn.classList.toggle("visible", window.scrollY > 600),
      { passive: true },
    );
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  /* ══════════════════════════════════════════════
     SMOOTH SCROLL
     ══════════════════════════════════════════════ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     ██████   █████  ███    ███ ███████ ███████
    ██       ██   ██ ████  ████ ██      ██
    ██   ███ ███████ ██ ████ ██ █████   ███████
    ██    ██ ██   ██ ██  ██  ██ ██           ██
     ██████  ██   ██ ██      ██ ███████ ███████
     ══════════════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════
     GAME 1: MEMORY CARDS
     ══════════════════════════════════════════════ */
  function initMemoryGame() {
    const board = document.getElementById("memoryBoard");
    const movesEl = document.getElementById("memoryMoves");
    const matchesEl = document.getElementById("memoryMatches");
    const restartBtn = document.getElementById("memoryRestart");
    if (!board) return;

    const iconPool = [
      "html5",
      "css",
      "javascript",
      "github",
      "canva",
      "capcut",
      "figma",
      "tiktok",
      "instagram",
      "youtube",
      "discord",
      "spotify",
      "react",
      "nodejs",
      "tailwindcss",
      "nextjs",
      "shadcn-ui",
      "vercel",
    ];

    let cards = [];
    let flipped = [];
    let matched = 0;
    let moves = 0;
    let locked = false;
    const pairCount = 6;

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function createBoard() {
      board.innerHTML = "";
      flipped = [];
      matched = 0;
      moves = 0;
      locked = false;
      updateUI();

      // Pick random icons and double them
      const chosen = shuffle([...iconPool]).slice(0, pairCount);
      cards = shuffle([...chosen, ...chosen]);

      cards.forEach((icon, idx) => {
        const cell = document.createElement("div");
        cell.classList.add("memory-cell");
        cell.dataset.icon = icon;
        cell.dataset.index = idx;

        cell.innerHTML = `
          <div class="memory-cell-inner">
            <div class="memory-front"></div>
            <div class="memory-back">
              <img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${icon}/default.svg" alt="${icon}" />
            </div>
          </div>
        `;

        cell.addEventListener("click", () => flipCard(cell));
        board.appendChild(cell);
      });
    }

    function flipCard(cell) {
      if (
        locked ||
        cell.classList.contains("flipped") ||
        cell.classList.contains("matched")
      )
        return;

      cell.classList.add("flipped");
      flipped.push(cell);

      if (flipped.length === 2) {
        moves++;
        locked = true;
        updateUI();

        const [a, b] = flipped;
        if (a.dataset.icon === b.dataset.icon) {
          a.classList.add("matched");
          b.classList.add("matched");
          matched++;
          flipped = [];
          locked = false;
          updateUI();

          if (matched === pairCount) {
            setTimeout(() => {
              restartBtn.textContent = "🎉 Hoàn thành! Chơi lại";
            }, 500);
          }
        } else {
          setTimeout(() => {
            a.classList.remove("flipped");
            b.classList.remove("flipped");
            flipped = [];
            locked = false;
          }, 800);
        }
      }
    }

    function updateUI() {
      movesEl.textContent = "Lượt: " + moves;
      matchesEl.textContent = "Đúng: " + matched + "/" + pairCount;
    }

    restartBtn.addEventListener("click", () => {
      restartBtn.innerHTML = "<span>Chơi lại</span>";
      createBoard();
    });

    createBoard();
  }

  /* ══════════════════════════════════════════════
     GAME 2: CLICK SPEED TEST
     ══════════════════════════════════════════════ */
  function initClickSpeedGame() {
    const area = document.getElementById("clickArea");
    const countEl = document.getElementById("clickCount");
    const timerEl = document.getElementById("clickTimer");
    const cpsEl = document.getElementById("clickCPS");
    const startBtn = document.getElementById("clickStart");
    if (!area) return;

    let clicks = 0;
    let timeLeft = 5;
    let running = false;
    let timer = null;

    function reset() {
      clicks = 0;
      timeLeft = 5;
      running = false;
      clearInterval(timer);
      countEl.textContent = "0";
      timerEl.textContent = "Thời gian: 5s";
      cpsEl.textContent = "CPS: 0";
      startBtn.disabled = false;
      startBtn.innerHTML = "<span>Bắt đầu</span>";
      area.classList.remove("active");
    }

    function start() {
      reset();
      running = true;
      startBtn.disabled = true;
      area.classList.add("active");

      timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = "Thời gian: " + timeLeft + "s";

        if (timeLeft <= 0) {
          clearInterval(timer);
          running = false;
          area.classList.remove("active");
          const cps = (clicks / 5).toFixed(1);
          cpsEl.textContent = "CPS: " + cps;

          let msg = "Chơi lại";
          if (clicks >= 50) msg = "🔥 Siêu nhanh! " + msg;
          else if (clicks >= 35) msg = "⚡ Tốt lắm! " + msg;
          else if (clicks >= 20) msg = "👍 Khá tốt! " + msg;
          else msg = "💪 Cố thêm! " + msg;

          startBtn.disabled = false;
          startBtn.innerHTML = "<span>" + msg + "</span>";
        }
      }, 1000);
    }

    area.addEventListener("click", (e) => {
      if (!running) return;
      clicks++;
      countEl.textContent = clicks;

      // Ripple effect
      const ripple = document.createElement("div");
      ripple.classList.add("click-ripple");
      const rect = area.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";
      area.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });

    startBtn.addEventListener("click", start);
  }

  /* ══════════════════════════════════════════════
     GAME 3: CATCH THE STAR
     ══════════════════════════════════════════════ */
  function initStarCatchGame() {
    const arena = document.getElementById("starArena");
    const target = document.getElementById("starTarget");
    const scoreEl = document.getElementById("starScore");
    const timerEl = document.getElementById("starTimer");
    const startBtn = document.getElementById("starStart");
    if (!arena) return;

    let score = 0;
    let timeLeft = 20;
    let running = false;
    let gameTimer = null;
    let starTimer = null;

    const starEmojis = ["⭐", "🌟", "✨", "💫", "🔥", "💎", "🎯"];

    function reset() {
      score = 0;
      timeLeft = 20;
      running = false;
      clearInterval(gameTimer);
      clearTimeout(starTimer);
      scoreEl.textContent = "Điểm: 0";
      timerEl.textContent = "Thời gian: 20s";
      target.classList.remove("visible");
      startBtn.disabled = false;
      startBtn.innerHTML = "<span>Bắt đầu</span>";
    }

    function moveStar() {
      if (!running) return;

      const arenaRect = arena.getBoundingClientRect();
      const maxX = arenaRect.width - 40;
      const maxY = arenaRect.height - 40;
      const x = Math.random() * maxX + 10;
      const y = Math.random() * maxY + 10;

      target.textContent =
        starEmojis[Math.floor(Math.random() * starEmojis.length)];
      target.style.left = x + "px";
      target.style.top = y + "px";
      target.classList.add("visible");
      target.style.animation = "none";
      // Force reflow
      void target.offsetWidth;
      target.style.animation = "starPop .3s ease";

      // Star disappears after random interval
      const disappearTime = Math.max(600, 1200 - score * 30);
      starTimer = setTimeout(() => {
        if (running) {
          target.classList.remove("visible");
          setTimeout(() => moveStar(), 200);
        }
      }, disappearTime);
    }

    function start() {
      reset();
      running = true;
      startBtn.disabled = true;
      moveStar();

      gameTimer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = "Thời gian: " + timeLeft + "s";

        if (timeLeft <= 0) {
          clearInterval(gameTimer);
          clearTimeout(starTimer);
          running = false;
          target.classList.remove("visible");

          let msg = "Chơi lại";
          if (score >= 25) msg = "🏆 Huyền thoại! " + msg;
          else if (score >= 18) msg = "🔥 Xuất sắc! " + msg;
          else if (score >= 10) msg = "⚡ Tốt lắm! " + msg;
          else msg = "💪 Cố thêm! " + msg;

          startBtn.disabled = false;
          startBtn.innerHTML = "<span>" + msg + "</span>";
        }
      }, 1000);
    }

    target.addEventListener("click", (e) => {
      if (!running) return;
      e.stopPropagation();

      score++;
      scoreEl.textContent = "Điểm: " + score;
      clearTimeout(starTimer);

      // Catch effect
      const effect = document.createElement("span");
      effect.classList.add("star-catch-effect");
      effect.textContent = "+1";
      effect.style.left = target.style.left;
      effect.style.top = target.style.top;
      arena.appendChild(effect);
      setTimeout(() => effect.remove(), 600);

      target.classList.remove("visible");
      setTimeout(() => moveStar(), 150);
    });

    startBtn.addEventListener("click", start);
  }
  /* ══════════════════════════════════════════════
     MUSIC PLAYER (Inline Section)
     ──────────────────────────────────────────────
     ☞  ĐỂ THÊM BÀI HÁT: chỉ cần sửa mảng `playlist` bên dưới.
         Bỏ file .mp3 và ảnh bìa vào thư mục music/
         Nếu không có ảnh bìa, để cover: "" (sẽ hiện icon mặc định)
     ══════════════════════════════════════════════ */
  function initMusicPlayer() {
    const player = document.getElementById("musicPlayer");
    const playBtn = document.getElementById("mpPlayPause");
    const prevBtn = document.getElementById("mpPrev");
    const nextBtn = document.getElementById("mpNext");
    const progressWrap = document.getElementById("mpProgressWrap");
    const progressFill = document.getElementById("mpProgressFill");
    const currentTimeEl = document.getElementById("mpCurrentTime");
    const durationEl = document.getElementById("mpDuration");
    const titleEl = document.getElementById("mpTitle");
    const artistEl = document.getElementById("mpArtist");
    const volSlider = document.getElementById("mpVolSlider");
    const volBtn = document.getElementById("mpVolBtn");
    const playlistEl = document.getElementById("mpPlaylist");
    const coverImg = document.getElementById("mpCover");

    if (!player) return;

    /* ╔══════════════════════════════════════════╗
       ║  👇  THÊM / SỬA BÀI HÁT Ở ĐÂY  👇    ║
       ║  title  : Tên bài hát                   ║
       ║  artist : Tên ca sĩ                     ║
       ║  src    : Đường dẫn file MP3             ║
       ║  cover  : Đường dẫn ảnh bìa (hoặc "")   ║
       ╚══════════════════════════════════════════╝ */
    const playlist = [
      {
        title: "Exit Sign",
        artist: "Hiếu Thứ Hai",
        src: "./music/exitsign.mp3",
        cover: "./music/Exit Sign.jpg",
      },
      // ─── Thêm bài hát khác ở đây ───
      // {
      //   title: "Tên bài hát",
      //   artist: "Ca sĩ",
      //   src: "./music/ten-file.mp3",
      //   cover: "./music/ten-file-cover.jpg",
      // },
    ];

    let currentTrack = 0;
    let audio = new Audio();
    audio.volume = 0.6;
    audio.preload = "metadata";

    // ── Build playlist UI dynamically ──
    function buildPlaylistUI() {
      playlistEl.innerHTML = "";
      playlist.forEach((track, i) => {
        const num = String(i + 1).padStart(2, "0");
        const item = document.createElement("div");
        item.className = "mp-pl-item" + (i === 0 ? " active" : "");
        item.dataset.index = i;

        // Cover thumbnail or Spotify icon
        const thumbSrc = track.cover
          ? track.cover
          : "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/spotify/default.svg";
        const thumbClass = track.cover
          ? "mp-pl-cover"
          : "mp-pl-cover mp-pl-cover-icon";

        item.innerHTML =
          '<span class="mp-pl-num font-mono">' +
          num +
          "</span>" +
          '<img src="' +
          thumbSrc +
          '" alt="" class="' +
          thumbClass +
          '" />' +
          '<div class="mp-pl-info">' +
          '<span class="mp-pl-name font-heading">' +
          track.title +
          "</span>" +
          '<span class="mp-pl-artist font-mono">' +
          track.artist +
          "</span>" +
          "</div>" +
          '<span class="mp-pl-dur font-mono">—</span>';

        // Click to play
        item.addEventListener("click", () => {
          if (i === currentTrack && !audio.paused) {
            pause();
          } else {
            loadTrack(i);
            play();
          }
        });

        playlistEl.appendChild(item);
      });
    }

    function updatePlaylistUI() {
      const items = playlistEl.querySelectorAll(".mp-pl-item");
      items.forEach((item, i) => {
        item.classList.toggle("active", i === currentTrack);
      });
    }

    function updateCover(track) {
      if (track.cover) {
        coverImg.src = track.cover;
        player.classList.add("has-cover");
      } else {
        coverImg.src = "";
        player.classList.remove("has-cover");
      }
    }

    function loadTrack(index) {
      currentTrack = index;
      const track = playlist[currentTrack];
      audio.src = track.src;
      titleEl.textContent = track.title;
      artistEl.textContent = track.artist;
      progressFill.style.width = "0%";
      currentTimeEl.textContent = "0:00";
      durationEl.textContent = "0:00";
      updateCover(track);
      updatePlaylistUI();
    }

    function formatTime(sec) {
      if (isNaN(sec) || !isFinite(sec)) return "0:00";
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return m + ":" + (s < 10 ? "0" : "") + s;
    }

    function updateProgress() {
      if (audio.duration) {
        progressFill.style.width =
          (audio.currentTime / audio.duration) * 100 + "%";
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
      }
    }

    function play() {
      audio
        .play()
        .then(() => {
          player.classList.add("is-playing");
        })
        .catch(() => {});
    }

    function pause() {
      audio.pause();
      player.classList.remove("is-playing");
    }

    function togglePlay() {
      if (audio.paused) play();
      else pause();
    }

    function nextTrack() {
      const wasPlaying = !audio.paused;
      loadTrack((currentTrack + 1) % playlist.length);
      if (wasPlaying) play();
    }

    function prevTrack() {
      const wasPlaying = !audio.paused;
      if (audio.currentTime > 3) {
        audio.currentTime = 0;
      } else {
        loadTrack((currentTrack - 1 + playlist.length) % playlist.length);
      }
      if (wasPlaying) play();
    }

    // Core events
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", nextTrack);
    audio.addEventListener("loadedmetadata", () => {
      durationEl.textContent = formatTime(audio.duration);
      const items = playlistEl.querySelectorAll(".mp-pl-item");
      if (items[currentTrack]) {
        const durSpan = items[currentTrack].querySelector(".mp-pl-dur");
        if (durSpan) durSpan.textContent = formatTime(audio.duration);
      }
    });

    playBtn.addEventListener("click", togglePlay);
    nextBtn.addEventListener("click", nextTrack);
    prevBtn.addEventListener("click", prevTrack);

    // Progress seek
    const progressBar = progressWrap.querySelector(".mp-progress-bar");
    progressBar.addEventListener("click", (e) => {
      if (!audio.duration) return;
      const rect = progressBar.getBoundingClientRect();
      audio.currentTime =
        ((e.clientX - rect.left) / rect.width) * audio.duration;
    });

    // Volume
    volSlider.addEventListener("input", () => {
      const val = volSlider.value / 100;
      audio.volume = val;
      audio.muted = false;
      player.classList.toggle("muted", val === 0);
    });

    volBtn.addEventListener("click", () => {
      audio.muted = !audio.muted;
      player.classList.toggle("muted", audio.muted);
      volSlider.value = audio.muted ? 0 : audio.volume * 100;
    });

    // Preload all track durations
    playlist.forEach((track, i) => {
      const tmp = new Audio();
      tmp.preload = "metadata";
      tmp.src = track.src;
      tmp.addEventListener("loadedmetadata", () => {
        const items = playlistEl.querySelectorAll(".mp-pl-item");
        if (items[i]) {
          const d = items[i].querySelector(".mp-pl-dur");
          if (d) d.textContent = formatTime(tmp.duration);
        }
      });
    });

    // Init
    buildPlaylistUI();
    loadTrack(0);
  }
})();
