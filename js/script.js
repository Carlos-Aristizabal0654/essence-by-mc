/* =========================================================
   Essence by M&C — Render + filtros del catálogo
   ========================================================= */

(function () {
  const generos = ["mujer", "hombre"];

  const state = {
    mujer: { q: "", marca: "", momento: "", nota: "" },
    hombre: { q: "", marca: "", momento: "", nota: "" },
  };

  function itemsDe(genero) {
    // "unisex" aparece en ambas colecciones
    return PERFUMES.filter(p => p.genero === genero || p.genero === "unisex");
  }

  function poblarFiltros(genero) {
    const items = itemsDe(genero);
    const filtersEl = document.querySelector(`.filters[data-genero="${genero}"]`);

    // Marcas (orden alfabético, sin duplicados)
    const marcas = [...new Set(items.map(p => p.marca))].sort((a, b) => a.localeCompare(b));
    const select = filtersEl.querySelector('[data-filter="marca"]');
    marcas.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => {
      state[genero].marca = select.value;
      render(genero);
    });

    // Notas / familias olfativas
    const notas = [...new Set(items.flatMap(p => p.notas))].sort((a, b) => a.localeCompare(b));
    const notasGroup = filtersEl.querySelector('.notas-group');
    const todasBtn = document.createElement("button");
    todasBtn.className = "chip active";
    todasBtn.dataset.value = "";
    todasBtn.textContent = "Todas las notas";
    notasGroup.appendChild(todasBtn);

    notas.forEach(n => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.dataset.value = n;
      btn.textContent = n;
      notasGroup.appendChild(btn);
    });

    notasGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      notasGroup.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      state[genero].nota = btn.dataset.value;
      render(genero);
    });

    // Momento (día / noche)
    const momentoGroup = filtersEl.querySelector('[data-filter="momento"]');
    momentoGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      momentoGroup.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      state[genero].momento = btn.dataset.value;
      render(genero);
    });

    // Buscador
    const search = filtersEl.querySelector(".search");
    search.addEventListener("input", () => {
      state[genero].q = search.value.trim().toLowerCase();
      render(genero);
    });
  }

  function render(genero) {
    const { q, marca, momento, nota } = state[genero];
    const grid = document.getElementById(`grid-${genero}`);
    const emptyState = document.getElementById(`empty-${genero}`);

    const filtrados = itemsDe(genero).filter(p => {
      const matchQ = !q || p.nombre.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q);
      const matchMarca = !marca || p.marca === marca;
      const matchMomento = !momento || p.momento === momento;
      const matchNota = !nota || p.notas.includes(nota);
      return matchQ && matchMarca && matchMomento && matchNota;
    });

    grid.innerHTML = filtrados.map(cardHTML).join("");
    emptyState.hidden = filtrados.length > 0;
  }

  function cardHTML(p) {
    const destacadoClass = p.destacado ? " destacado" : "";
    const momentoLabel = p.momento === "dia" ? "Día" : "Noche";
    const mlHTML = p.ml && p.ml.trim() !== "" ? `<span class="ml-badge">${escapeHTML(p.ml)}</span>` : "";

    return `
      <article class="card${destacadoClass}">
        ${imagenHTML(p)}
        <div class="card-top">
          <span class="card-marca">${escapeHTML(p.marca)}</span>
          <span class="momento-badge ${p.momento}">${momentoLabel}</span>
        </div>
        <h3 class="card-nombre">${escapeHTML(p.nombre)}</h3>
        ${mlHTML ? `<div class="card-meta">${mlHTML}</div>` : ""}
        <div class="card-notas">
          ${p.notas.map(n => `<span class="nota-tag">${escapeHTML(n)}</span>`).join("")}
        </div>
      </article>
    `;
  }

  function imagenHTML(p) {
    if (p.imagen && p.imagen.trim() !== "") {
      return `
        <div class="card-img">
          <img src="img/${escapeHTML(p.imagen)}" alt="${escapeHTML(p.nombre)} — ${escapeHTML(p.marca)}" loading="lazy">
        </div>
      `;
    }
    // Placeholder: espacio reservado para cuando aún no hay foto
    return `
      <div class="card-img card-img-placeholder">
        <span class="placeholder-icon">✦</span>
        <span class="placeholder-text">Agregar foto</span>
      </div>
    `;
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Ajusta la altura del hilo dorado (SVG) a la altura real de la página
  function ajustarHilo() {
    const thread = document.querySelector(".thread");
    if (!thread) return;
    const h = document.body.scrollHeight;
    thread.setAttribute("viewBox", `0 0 100 ${h}`);
    thread.style.minHeight = h + "px";
    const path = document.getElementById("threadPath");
    path.setAttribute(
      "d",
      `M50,0 C 15,${h * 0.18} 85,${h * 0.32} 50,${h * 0.48} C 15,${h * 0.62} 85,${h * 0.8} 50,${h}`
    );
  }

  generos.forEach(g => {
    poblarFiltros(g);
    render(g);
  });

  window.addEventListener("load", ajustarHilo);
  window.addEventListener("resize", ajustarHilo);
})();
