// SCROLL DEL NAVBAR
        const barraNav = document.querySelector("nav.menu");

        const alCambiarScroll = () => {
            barraNav.classList.toggle("nav-scroll", window.scrollY > 40);
        };

        alCambiarScroll();
        window.addEventListener("scroll", alCambiarScroll);

       // BUSCADOR DEL NAVBAR
       

/*  ÍNDICE DEL SITIO  */
const INDICE_SITIO = [
  { titulo: "Inicio",              categoria: "Sección",      url: "index.html",                     texto: "Bienvenido a El Salvador, el pulgarcito de América, playas volcanes y pueblos" },
  { titulo: "Destinos",            categoria: "Sección",      url: "HTML/Destinos.html",             texto: "Todos los destinos turísticos de El Salvador, filtrar por categoría" },
  { titulo: "Lugares destacados",  categoria: "Sección",      url: "HTML/lugaresdestacados.html",    texto: "Los lugares más visitados y recomendados del país" },
  { titulo: "Gastronomía",         categoria: "Sección",      url: "HTML/gastronomia.html",          texto: "Comida típica salvadoreña, comidas y bebidas tradicionales" },
  { titulo: "Eventos",             categoria: "Sección",      url: "HTML/eventos.html",              texto: "Fiestas, festivales, tradiciones y celebraciones de El Salvador" },
 
  // --- Destinos (Destinos.html y lugaresdestacados.html) ---
  { titulo: "Volcán de Santa Ana",   categoria: "Volcanes",  url: "HTML/volcansantaana.html",       texto: "El volcán más alto del país, ideal para senderismo, Ilamatepec, Santa Ana" },
  { titulo: "Playa El Tunco",        categoria: "Playas",    url: "HTML/Playa el tunco.html",       texto: "Perfecta para surfear y disfrutar del atardecer, La Libertad, surf, mar" },
  { titulo: "Suchitoto",             categoria: "Pueblos",   url: "HTML/Suchitoto.html",            texto: "Arte, cultura y tradición, Cuscatlán, encanto colonial" },
  { titulo: "Lago de Coatepeque",    categoria: "Lagos",     url: "HTML/Lagodecoatepeque.html",     texto: "Lago de origen volcánico con aguas cristalinas, Santa Ana" },
  { titulo: "Playa Los Cobanos",     categoria: "Playas",    url: "HTML/loscobanos.html",           texto: "Aguas tranquilas, arena cálida, ambiente familiar" },
  { titulo: "Parque El Imposible",   categoria: "Parques",   url: "HTML/parqueelImposible.html",    texto: "Biodiversidad única, cascadas y senderos, Ahuachapán" },
  { titulo: "Cascada Los Tercios",   categoria: "Cascadas",  url: "HTML/cascacadat.html",           texto: "Paisaje natural escondido, formaciones rocosas, Suchitoto" },
  { titulo: "Ruta de las Flores",    categoria: "Pueblos",   url: "HTML/RutadelasFlores.html",      texto: "Café, artesanías y pueblos llenos de color, Juayúa, Ataco, Apaneca, Salcoatitán" },
 
  // --- Gastronomía: comidas ---
  { titulo: "Pupusas",           categoria: "Comida",   url: "HTML/pupusas.html",       texto: "Platillo más emblemático de El Salvador, maíz, queso, frijoles, chicharrón" },
  { titulo: "Tamales",           categoria: "Comida",   url: "HTML/tamales.html",       texto: "Masa de maíz, carne y vegetales" },
  { titulo: "Yuca Frita",        categoria: "Comida",   url: "HTML/YucaFrita.html",     texto: "Crujiente por fuera, suave por dentro" },
 
  // --- Gastronomía: bebidas ---
  { titulo: "Horchata",          categoria: "Bebida",   url: "HTML/Horchata.html",      texto: "Bebida de arroz con canela" },
  { titulo: "Tamarindo",         categoria: "Bebida",   url: "HTML/tamarindo.html",     texto: "Bebida agridulce y refrescante" },
  { titulo: "Fresco de Jocote",  categoria: "Bebida",   url: "HTML/FrescoDeJocote.html",texto: "Bebida tropical elaborada con jocotes frescos" },
 
  // --- Eventos ---
  { titulo: "Semana Santa",              categoria: "Eventos", url: "HTML/semanasanta.html",            texto: "Procesiones y tradición en todo el país" },
  { titulo: "Fiestas Agostinas",         categoria: "Eventos", url: "HTML/fiestasAgostinas.html",       texto: "Celebraciones en honor al Divino Salvador, agosto, San Salvador" },
  { titulo: "Festival del Jocote",       categoria: "Eventos", url: "HTML/FestivaldelJocote.html",      texto: "Evento donde se comercializan derivados del jocote" },
  { titulo: "Fiestas Julias",            categoria: "Eventos", url: "HTML/FiestasJulias.html",          texto: "Tradición y alegría en las calles de Santa Ana" },
  { titulo: "Fiestas de los Farolitos",  categoria: "Eventos", url: "HTML/FestivaldelosFarolitos.html", texto: "Miles de faroles artesanales de colores, Suchitoto" },
  { titulo: "Bolas de Fuego de Nejapa",  categoria: "Eventos", url: "HTML/BolasdeFuego.html",           texto: "Tradición donde los participantes lanzan bolas de fuego" },
];

/*  UTILIDADES  */

// Quita tildes y pasa a minúsculas

function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Calcula la ruta correcta según dónde esté la página actual

const RAIZ = window.location.pathname.includes("/HTML/") ? "../" : "./";

// Resalta en negrita la parte que coincide

function resaltar(texto, consulta) {
  const i = normalizar(texto).indexOf(normalizar(consulta));
  if (i === -1) return texto;
  return (
    texto.slice(0, i) +
    "<mark>" + texto.slice(i, i + consulta.length) + "</mark>" +
    texto.slice(i + consulta.length)
  );
}

/*  BÚSQUEDA  */

function buscar(consulta) {
  const q = normalizar(consulta.trim());
  if (q.length < 2) return [];

  return INDICE_SITIO
    .map((item) => {
      const titulo = normalizar(item.titulo);
      const todo = normalizar(item.titulo + " " + item.categoria + " " + item.texto);
      let puntaje = 0;
      if (titulo.startsWith(q)) puntaje = 3;        // empieza igual = lo mejor
      else if (titulo.includes(q)) puntaje = 2;     // está en el título
      else if (todo.includes(q)) puntaje = 1;       // está en la descripción
      return { ...item, puntaje };
    })
    .filter((item) => item.puntaje > 0)
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, 6);
}

/* CONEXIÓN CON EL NAVBAR */

document.addEventListener("DOMContentLoaded", () => {
  const buscadorNav = document.querySelector(".buscador-nav");
  const botonBuscar = document.querySelector(".icono-buscador");
  const input = document.querySelector(".buscador-input");
  const form = document.querySelector(".buscador-form");
  if (!buscadorNav || !input) return;

  // Creamos la lista de resultados

  const lista = document.createElement("ul");
  lista.className = "buscador-resultados";
  lista.setAttribute("role", "listbox");
  buscadorNav.appendChild(lista);

  let seleccionado = -1;
  let resultados = [];

  function pintar() {
    if (!resultados.length) {
      lista.innerHTML = input.value.trim().length >= 2
        ? '<li class="sin-resultados">Sin resultados</li>'
        : "";
      lista.classList.toggle("visible", input.value.trim().length >= 2);
      return;
    }

    lista.innerHTML = resultados
      .map((r, i) => `
        <li role="option" class="${i === seleccionado ? "activo" : ""}">
          <a href="${RAIZ}${r.url}">
            <span class="r-titulo">${resaltar(r.titulo, input.value.trim())}</span>
            <span class="r-categoria">${r.categoria}</span>
          </a>
        </li>`)
      .join("");
    lista.classList.add("visible");
  }

  // Escribir = buscar en vivo

  input.addEventListener("input", () => {
    resultados = buscar(input.value);
    seleccionado = -1;
    pintar();
  });

  // Flechas + Enter

  input.addEventListener("keydown", (e) => {
    if (!resultados.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      seleccionado = (seleccionado + 1) % resultados.length;
      pintar();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      seleccionado = (seleccionado - 1 + resultados.length) % resultados.length;
      pintar();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const destino = resultados[seleccionado === -1 ? 0 : seleccionado];
      window.location.href = RAIZ + destino.url;
    }
  });

  // Evita que el form recargue la página

  if (form) form.addEventListener("submit", (e) => e.preventDefault());

  // Abrir / cerrar con la lupa

  if (botonBuscar) {
    botonBuscar.addEventListener("click", () => {
      const activo = buscadorNav.classList.toggle("activo");
      botonBuscar.setAttribute("aria-expanded", activo);
      if (activo) input.focus();
      else lista.classList.remove("visible");
    });
  }

  // Cerrar al hacer clic fuera o con Escape

  document.addEventListener("click", (e) => {
    if (!buscadorNav.contains(e.target)) {
      buscadorNav.classList.remove("activo");
      lista.classList.remove("visible");
      if (botonBuscar) botonBuscar.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      buscadorNav.classList.remove("activo");
      lista.classList.remove("visible");
      if (botonBuscar) botonBuscar.setAttribute("aria-expanded", "false");
    }
  });
});

// MENÚ HAMBURGUESA

document.addEventListener("DOMContentLoaded", () => {
  const barra = document.querySelector(".menu");
  const boton = document.getElementById("menuToggle");
  const panel = document.getElementById("menuLinks");
  if (!barra || !boton || !panel) return;

  function abrir() {
    panel.classList.add("abierto");
    barra.classList.add("menu-abierto");
    boton.classList.add("activo");
    boton.setAttribute("aria-expanded", "true");
    boton.setAttribute("aria-label", "Cerrar menú");
  }

  function cerrar() {
    panel.classList.remove("abierto");
    barra.classList.remove("menu-abierto");
    boton.classList.remove("activo");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú");
  }

  boton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (panel.classList.contains("abierto")) cerrar();
    else abrir();
  });

  // Cerrar al elegir un enlace
  panel.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", cerrar);
  });

  // Cerrar al hacer clic fuera o con Escape
  document.addEventListener("click", (e) => {
    if (!barra.contains(e.target)) cerrar();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar();
  });

  // Si se agranda la ventana, volver al menú normal
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) cerrar();
  });
});

// RESERVAS

const RESERVAS_KEY = "reservas";

const carritoLista = document.getElementById("carritoLista");
const carritoVacio = document.getElementById("carritoVacio");
const carritoCantidad = document.getElementById("carritoCantidad");
const carritoTotalEl = document.getElementById("carritoTotal");
const resumenLineas = document.getElementById("resumenLineas");
const btnProcederPago = document.getElementById("btnProcederPago");
const btnVaciar = document.getElementById("btnVaciar");

function cargarReservas() {
    try {
        const datos = JSON.parse(localStorage.getItem(RESERVAS_KEY));
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        return [];
    }
}

let reservas = cargarReservas();

function guardarReservas() {
    try {
        localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));
    } catch (error) {
        // si el navegador bloquea el almacenamiento
    }
    if (window.actualizarContadorCarrito) window.actualizarContadorCarrito();
}

function formatearPrecio(valor) {
    return "$" + Number(valor).toFixed(2);
}

function escapar(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
}

// "2026-10-15" -> "15 de octubre de 2026" 
function formatearFecha(texto) {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
        "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const partes = String(texto || "").split("-");
    if (partes.length !== 3) return texto || "Sin fecha";
    return `${Number(partes[2])} de ${meses[Number(partes[1]) - 1]} de ${partes[0]}`;
}

// El total se calcula con precio, unidad y personas
function totalReserva(item) {
    const precio = Number(item.precio) || 0;
    const personas = Number(item.personas) || 1;
    return item.unidad === "persona" ? precio * personas : precio;
}

function calcularTotal() {
    return reservas.reduce((suma, item) => suma + totalReserva(item), 0);
}

function renderizarCarrito() {
    const hayItems = reservas.length > 0;

    carritoCantidad.textContent = reservas.length;
    carritoVacio.hidden = hayItems;
    btnVaciar.hidden = !hayItems;
    btnProcederPago.disabled = !hayItems;

    // Lista de reservas
    carritoLista.innerHTML = "";
    reservas.forEach((item) => {
        const personas = Number(item.personas) || 1;
        const etiquetaPersonas = personas === 1 ? "1 persona" : `${personas} personas`;
        const imagen = item.imagen
            ? `<img src="${escapar(item.imagen)}" alt="" class="carrito-item-img">`
            : `<div class="carrito-item-img sin-imagen" aria-hidden="true">🌋</div>`;

        const fila = document.createElement("div");
        fila.className = "carrito-item";
        fila.innerHTML = `
            ${imagen}
            <div class="carrito-item-info">
                <span class="carrito-item-categoria">${escapar(item.tipo || "Servicio")}</span>
                <h3>${escapar(item.nombre)}</h3>
                <div class="carrito-item-detalles">
                    <span>📍 ${escapar(item.lugar || "El Salvador")}</span>
                    <span>📅 ${escapar(formatearFecha(item.fecha))}</span>
                    <span>👥 ${etiquetaPersonas}</span>
                </div>
                <span class="carrito-item-precio">${formatearPrecio(item.precio)} por ${escapar(item.unidad || "reserva")}</span>
            </div>
            <span class="carrito-item-total">${formatearPrecio(totalReserva(item))}</span>
            <button type="button" class="carrito-item-eliminar" data-id="${escapar(item.id)}" data-fecha="${escapar(item.fecha)}" aria-label="Eliminar ${escapar(item.nombre)} del carrito">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                </svg>
            </button>
        `;
        carritoLista.appendChild(fila);
    });

    // Resumen por tipo de servicio
    const porTipo = {};
    reservas.forEach((item) => {
        const tipo = item.tipo || "Servicio";
        porTipo[tipo] = (porTipo[tipo] || 0) + totalReserva(item);
    });

    resumenLineas.innerHTML = hayItems
        ? Object.keys(porTipo).map((tipo) =>
            `<div class="resumen-linea"><span>${escapar(tipo)}</span><span>${formatearPrecio(porTipo[tipo])}</span></div>`
        ).join("")
        : `<p class="resumen-vacio">Tu carrito está vacío.</p>`;

    const total = calcularTotal();
    carritoTotalEl.textContent = formatearPrecio(total);
    document.getElementById("pagoTotalTexto").textContent = formatearPrecio(total);
    document.getElementById("btnPagarTotal").textContent = formatearPrecio(total);
}

// Eliminar una reserva
carritoLista.addEventListener("click", (evento) => {
    const botonEliminar = evento.target.closest(".carrito-item-eliminar");
    if (!botonEliminar) return;

    const { id, fecha } = botonEliminar.dataset;
    reservas = reservas.filter((item) => !(String(item.id) === id && String(item.fecha) === fecha));
    guardarReservas();
    renderizarCarrito();
});

// Vaciar todo el carrito
btnVaciar.addEventListener("click", () => {
    if (!reservas.length) return;
    if (!confirm("¿Quieres quitar todas las reservas del carrito?")) return;
    reservas = [];
    guardarReservas();
    renderizarCarrito();
});

// Si se agrega algo desde otra pestaña, se actualiza aquí
window.addEventListener("storage", (evento) => {
    if (evento.key === RESERVAS_KEY) {
        reservas = cargarReservas();
        renderizarCarrito();
    }
});

// CONTADOR DEL CARRITO + LÍMITE DE FECHA DE RESERVA


const RESERVA_ANIO_LIMITE = 2027;
const RESERVA_FECHA_MAX = `${RESERVA_ANIO_LIMITE}-12-31`;
const MENSAJE_LIMITE_FECHA = `Solo puedes reservar desde hoy hasta el 31 de diciembre de ${RESERVA_ANIO_LIMITE}.`;

// Fecha de hoy en formato AAAA-MM-DD usando la hora local

function fechaHoyISO() {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
}

// true si la fecha es "AAAA-MM-DD", no es pasada y no pasa del 2027
window.fechaReservaValida = function (fecha) {
    return /^\d{4}-\d{2}-\d{2}$/.test(fecha || "")
        && fecha >= fechaHoyISO()
        && fecha <= RESERVA_FECHA_MAX;
};

// Pone min  y max  a un input de fecha
window.limitarInputFecha = function (input) {
    input.min = fechaHoyISO();
    input.max = RESERVA_FECHA_MAX;
};

// Número de reservas en el carrito = número del ícono del carrito
window.actualizarContadorCarrito = function () {
    const contador = document.getElementById("carritoContador");
    if (!contador) return;

    let total = 0;
    try {
        const datos = JSON.parse(localStorage.getItem("reservas"));
        total = Array.isArray(datos) ? datos.length : 0;
    } catch (error) {
        total = 0;
    }
    contador.textContent = total;
};

document.addEventListener("DOMContentLoaded", () => {
    window.actualizarContadorCarrito();

    // Todos los inputs de fecha de la página quedan limitados hasta 2027
    document.querySelectorAll('input[type="date"]').forEach((input) => {
        window.limitarInputFecha(input);

        // Por si escriben la fecha a mano fuera del rango
        input.addEventListener("change", () => {
            if (input.value && !window.fechaReservaValida(input.value)) {
                alert(MENSAJE_LIMITE_FECHA);
                input.value = "";
            }
        });
    });
});

// Si se reserva algo en otra pestaña, el número se actualiza aquí
window.addEventListener("storage", (evento) => {
    if (evento.key === "reservas") window.actualizarContadorCarrito();
});

// ======================================================
// SESIÓN (para poder pagar)
// ======================================================
function haySesionActiva() {
    return localStorage.getItem("sesionActiva") === "true";
}

// ======================================================
// MODAL DE PAGO
// ======================================================
const pagoOverlay = document.getElementById("pagoOverlay");
const pagoModal = document.getElementById("pagoModal");
const cerrarPagoBtn = document.getElementById("cerrarPago");
const formPago = document.getElementById("formPago");
const numeroTarjetaInput = document.getElementById("numeroTarjeta");
const vencimientoInput = document.getElementById("vencimientoTarjeta");
const cvvInput = document.getElementById("cvvTarjeta");
const pagoErrorMsg = document.getElementById("pagoErrorMsg");
const pagoFormularioWrap = document.getElementById("pagoFormularioWrap");
const pagoExito = document.getElementById("pagoExito");
const btnConfirmarPago = document.getElementById("btnConfirmarPago");
const btnCerrarExito = document.getElementById("btnCerrarExito");

function abrirPago() {
    pagoModal.classList.add("activo");
    pagoOverlay.classList.add("activo");
    pagoModal.setAttribute("aria-hidden", "false");
}

function cerrarPago() {
    pagoModal.classList.remove("activo");
    pagoOverlay.classList.remove("activo");
    pagoModal.setAttribute("aria-hidden", "true");
}

btnProcederPago.addEventListener("click", () => {
    if (btnProcederPago.disabled) return;

    // Todas las reservas deben tener fecha entre hoy y el 31/12/2027
    const reservaConFechaInvalida = reservas.find((item) => !window.fechaReservaValida(item.fecha));
    if (reservaConFechaInvalida) {
        alert(`La reserva "${reservaConFechaInvalida.nombre}" tiene una fecha no válida. ${MENSAJE_LIMITE_FECHA} Elimínala y vuelve a reservar.`);
        return;
    }

    if (!haySesionActiva()) {
        alert("Debes iniciar sesión para continuar con el pago");
        window.location.href = "login.html";
        return;
    }

    abrirPago();
});
cerrarPagoBtn.addEventListener("click", cerrarPago);
pagoOverlay.addEventListener("click", cerrarPago);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarPago();
});

// Formato automático: número de tarjeta en grupos de 4
numeroTarjetaInput.addEventListener("input", () => {
    const valor = numeroTarjetaInput.value.replace(/\D/g, "").slice(0, 16);
    numeroTarjetaInput.value = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
});

// Formato automático: MM/AA
vencimientoInput.addEventListener("input", () => {
    let valor = vencimientoInput.value.replace(/\D/g, "").slice(0, 4);
    if (valor.length >= 3) {
        valor = valor.slice(0, 2) + "/" + valor.slice(2);
    }
    vencimientoInput.value = valor;
});

// Solo números en el CVV
cvvInput.addEventListener("input", () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 4);
});

formPago.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const numeroLimpio = numeroTarjetaInput.value.replace(/\s/g, "");
    const nombreValido = document.getElementById("nombreTarjeta").value.trim().length > 2;
    const numeroValido = numeroLimpio.length >= 15 && numeroLimpio.length <= 16;
    const vencimientoValido = /^\d{2}\/\d{2}$/.test(vencimientoInput.value);
    const cvvValido = cvvInput.value.length >= 3;

    if (!nombreValido || !numeroValido || !vencimientoValido || !cvvValido) {
        pagoErrorMsg.textContent = "Revisa que todos los datos de la tarjeta estén completos y correctos.";
        pagoErrorMsg.hidden = false;
        return;
    }

    pagoErrorMsg.hidden = true;
    btnConfirmarPago.disabled = true;
    document.getElementById("btnPagarTexto").textContent = "Procesando...";

    // Simulación de procesamiento de pago (aquí iría la integración real con una pasarela de pago)
    setTimeout(() => {
        pagoFormularioWrap.hidden = true;
        pagoExito.hidden = false;

        // Limpiar el carrito y el formulario tras el pago
        reservas = [];
        guardarReservas();
        renderizarCarrito();
        formPago.reset();
        btnConfirmarPago.disabled = false;
        document.getElementById("btnPagarTexto").textContent = "Pagar";
    }, 1400);
});

btnCerrarExito.addEventListener("click", () => {
    cerrarPago();
    setTimeout(() => {
        pagoFormularioWrap.hidden = false;
        pagoExito.hidden = true;
    }, 300);
});

//TARJETA DE SESIÓN EN EL NAVBAR

(function () {
    const btnUsuario = document.getElementById("btnUsuario");
    const tarjetaSesion = document.getElementById("tarjetaSesion");
    const nombreTarjeta = document.getElementById("nombreUsuarioTarjeta");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (!btnUsuario || !tarjetaSesion) return;

    btnUsuario.addEventListener("click", (e) => {
        if (!haySesionActiva()) return; // sin sesión: navega normal a login.html

        e.preventDefault();
        e.stopPropagation();
        nombreTarjeta.textContent = localStorage.getItem("usuarioNombre") || "Usuario";
        tarjetaSesion.classList.toggle("oculto");
    });

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("sesionActiva");
            localStorage.removeItem("usuarioNombre");
            window.location.reload();
        });
    }

    // Cerrar la tarjeta al hacer clic afuera o con Escape
    document.addEventListener("click", (e) => {
        if (!tarjetaSesion.contains(e.target) && e.target !== btnUsuario) {
            tarjetaSesion.classList.add("oculto");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") tarjetaSesion.classList.add("oculto");
    });
})();

// Mostrar el carrito guardado al abrir la página
renderizarCarrito();