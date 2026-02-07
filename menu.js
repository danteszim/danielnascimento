document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const toggle = document.querySelector(".menu-toggle");
  const menuLinks = document.querySelectorAll(".menu a");

  if (!nav || !toggle) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
  // Fecha automaticamente ao clicar em qualquer item
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
});


//---------------------------------------------------------------------------------


// =====================
// LIGHTBOX — MINIATURA → FULL HD
// =====================

const lightbox = document.getElementById("lightbox");
const lightboxContent = lightbox.querySelector(".lightbox-content");
const closeButton = lightbox.querySelector(".lightbox-close");

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxContent.innerHTML = "";
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".lightbox-trigger");
  if (!trigger) return;

  const media = trigger.querySelector("img, video");
  if (!media) return;

  let element;

  // ===== IMAGEM =====
  if (media.tagName === "IMG") {
    element = document.createElement("img");
    element.src = media.dataset.full || media.src; // FULL HD
    element.alt = media.alt || "";
    element.loading = "eager";
  }

  // ===== VÍDEO =====
  if (media.tagName === "VIDEO") {
    element = media.cloneNode(true);
    element.controls = true;
    element.autoplay = true;
    element.playsInline = true;
  }

  if (!element) return;

  lightboxContent.innerHTML = "";
  lightboxContent.appendChild(element);
  lightbox.classList.add("open");
});

/* fechar clicando fora */
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

/* fechar no X */
closeButton.addEventListener("click", closeLightbox);


//---------------------------------------------------------------------------------

/* copiar email */
const emailItem = document.querySelector(".contato-email");
const emailText = emailItem.querySelector(".email-text");

emailItem.addEventListener("click", () => {
  const email = emailItem.dataset.email;
  const originalText = emailText.textContent;

  navigator.clipboard.writeText(email).then(() => {
    emailText.textContent = "Email copiado";

    setTimeout(() => {
      emailText.textContent = originalText;
    }, 2000);
  });
});


//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------


// =====================
// SEÇÃO 2 — TABS (ACCORDION CORRETO)
// =====================

// ---- CATEGORIAS ----
document.querySelectorAll('.categoria-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const alvo = btn.dataset.cat;
    const categoriaClicada = document.getElementById(alvo);
    const jaAtiva = categoriaClicada.classList.contains('active');

    // Fecha todas as categorias e conteúdos
    document.querySelectorAll('.categoria').forEach(cat => {
      cat.classList.remove('active');
      cat.querySelectorAll('.conteudo')
        .forEach(c => c.classList.remove('active'));
    });

    // Abre somente se não estava ativa
    if (!jaAtiva) {
      categoriaClicada.classList.add('active');
    }
  });
});

// ---- SUBTABS / DATAS ----
document.querySelectorAll('.btnData').forEach(btn => {
  btn.addEventListener('click', () => {
    const categoria = btn.closest('.categoria');
    const id = btn.dataset.content;
    const conteudo = categoria.querySelector(`#${id}`);
    const jaAtivo = conteudo.classList.contains('active');

    // Fecha todos os conteúdos da categoria
    categoria.querySelectorAll('.conteudo')
      .forEach(c => c.classList.remove('active'));

    // Abre somente se não estava ativo
    if (!jaAtivo) {
      conteudo.classList.add('active');
    }
  });
});




// ---- carrossel ----

document.querySelectorAll(".obra-carousel").forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const prev = carousel.querySelector(".carousel-btn.prev");
  const next = carousel.querySelector(".carousel-btn.next");

  if (!track || !prev || !next) return;

  const getItemWidth = () =>
    track.querySelector(".carousel-item")?.offsetWidth || 0;

  next.addEventListener("click", () => {
    const itemWidth = getItemWidth();
    const maxScroll = track.scrollWidth - track.clientWidth;

    // se chegou (ou passou) do final → volta pro início
    if (track.scrollLeft + itemWidth >= maxScroll - 1) {
      track.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    } else {
      track.scrollBy({
        left: itemWidth,
        behavior: "smooth"
      });
    }
  });

  prev.addEventListener("click", () => {
    const itemWidth = getItemWidth();

    // se está no início → vai pro final
    if (track.scrollLeft <= 0) {
      track.scrollTo({
        left: track.scrollWidth,
        behavior: "smooth"
      });
    } else {
      track.scrollBy({
        left: -itemWidth,
        behavior: "smooth"
      });
    }
  });
});



document.querySelectorAll('.categoria-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const alvoId = btn.dataset.cat;
    const alvo = document.getElementById(alvoId);

    if (!alvo) return;

    // ativa a categoria (seu código existente pode ficar aqui)

    alvo.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
});

document.querySelectorAll('.btnData').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.content;
    const alvo = document.getElementById(id);

    if (!alvo) return;

    // Se você já ativa o conteúdo em outro trecho, NÃO replique isso aqui

    alvo.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
});



/// DOWNLOAD — CAPTURE (executa antes de tudo)
document.addEventListener(
  "click",
  (e) => {
    const btn = e.target.closest(".download-btn");
    if (!btn) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const url = btn.dataset.download;
    if (!url) return;

    const a = document.createElement("a");
    a.href = url;
    a.rel = "noopener"; // segurança
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },
  true
);

