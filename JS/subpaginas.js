/* ===== Barra de navegación: scroll, buscador, sesión y contador ===== */
(function () {

// SCROLL DEL NAVBAR
const barraNav = document.querySelector("nav.menu");

if (barraNav) {
  const alCambiarScroll = () => {
    barraNav.classList.toggle("nav-scroll", window.scrollY > 40);
  };

  alCambiarScroll();
  window.addEventListener("scroll", alCambiarScroll);
}

// CONTADOR DEL CARRITO (cantidad de reservas guardadas)
window.actualizarContadorCarrito = function () {
  const contador = document.getElementById("carritoContador");
  if (!contador) return;
  try {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    contador.textContent = reservas.length;
  } catch (e) {
    contador.textContent = 0;
  }
};

window.actualizarContadorCarrito();

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

// SESIÓN DE USUARIO 

        document.addEventListener("DOMContentLoaded", () => {
            const btnUsuario = document.getElementById("btnUsuario");
            const tarjetaSesion = document.getElementById("tarjetaSesion");
            const nombreTarjeta = document.getElementById("nombreUsuarioTarjeta");
            const btnCerrarSesion = document.getElementById("btnCerrarSesion");
            if (!btnUsuario || !tarjetaSesion) return;

            function haySesionActiva() {
                return localStorage.getItem("sesionActiva") === "true";
            }

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
        });

})();

/* Reservas: se guardan en localStorage con la clave "reservas"
          . */
        (function () {
            var CLAVE = "reservas";
            var aviso = document.getElementById("aviso-reserva");
            var temporizador;

            function leerReservas() {
                try {
                    return JSON.parse(localStorage.getItem(CLAVE)) || [];
                } catch (e) {
                    return [];
                }
            }

            // Misma clave que usa la sesión de usuario (login)
            function haySesionIniciada() {
                try {
                    return localStorage.getItem("sesionActiva") === "true";
                } catch (e) {
                    return false;
                }
            }

            function guardarReservas(lista) {
                try {
                    localStorage.setItem(CLAVE, JSON.stringify(lista));
                    return true;
                } catch (e) {
                    return false;
                }
            }

            function mostrarAviso(texto, error) {
                aviso.textContent = texto;
                aviso.className = "aviso-reserva visible" + (error ? " error" : "");
                clearTimeout(temporizador);
                temporizador = setTimeout(function () {
                    aviso.className = "aviso-reserva";
                }, 3500);
            }

            // No permitir fechas pasadas
            var hoy = new Date();
            hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
            var hoyTexto = hoy.toISOString().split("T")[0];

            document.querySelectorAll(".reserva-fecha").forEach(function (campo) {
                campo.min = hoyTexto;
            });

            document.querySelectorAll(".reserva-card").forEach(function (tarjeta) {
                var boton = tarjeta.querySelector(".boton-reservar");
                var fecha = tarjeta.querySelector(".reserva-fecha");
                var cantidad = tarjeta.querySelector(".reserva-cantidad");

                boton.addEventListener("click", function () {
                    // Sin sesión iniciada no se puede reservar
                    if (!haySesionIniciada()) {
                        mostrarAviso("Primero debes iniciar sesión para poder reservar.", true);
                        return;
                    }

                    var personas = parseInt(cantidad.value, 10);
                    var max = parseInt(cantidad.max, 10);

                    if (!fecha.value) {
                        fecha.focus();
                        mostrarAviso("Elige una fecha para tu reserva.", true);
                        return;
                    }

                    if (fecha.value < hoyTexto) {
                        fecha.focus();
                        mostrarAviso("La fecha no puede ser anterior a hoy.", true);
                        return;
                    }

                    if (!personas || personas < 1 || personas > max) {
                        cantidad.focus();
                        mostrarAviso("Indica entre 1 y " + max + " personas.", true);
                        return;
                    }

                    var imagenTarjeta = tarjeta.querySelector(".reserva-imagen img");
                    var precio = parseFloat(tarjeta.dataset.precio);
                    var unidad = tarjeta.dataset.unidad;
                    var total = unidad === "persona" ? precio * personas : precio;

                    var reserva = {
                        id: tarjeta.dataset.id,
                        tipo: tarjeta.dataset.tipo,
                        nombre: tarjeta.dataset.nombre,
                        lugar: "Volcán de Santa Ana",
                        fecha: fecha.value,
                        personas: personas,
                        precio: precio,
                        unidad: unidad,
                        total: total,
                        imagen: imagenTarjeta ? imagenTarjeta.getAttribute("src") : ""
                    };

                    var lista = leerReservas();

                    // Si ya existe la misma reserva en esa fecha, se actualiza
                    var indice = lista.findIndex(function (r) {
                        return r.id === reserva.id && r.fecha === reserva.fecha;
                    });

                    if (indice >= 0) {
                        lista[indice] = reserva;
                    } else {
                        lista.push(reserva);
                    }

                    if (guardarReservas(lista)) {
                        if (window.actualizarContadorCarrito) window.actualizarContadorCarrito();
                        mostrarAviso("Reserva agregada: " + reserva.nombre + ".", false);
                    } else {
                        mostrarAviso("No se pudo guardar la reserva. Intenta de nuevo.", true);
                    }
                });
            });
        })();

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

// true si la fecha  no es pasada y no pasa del 2027
window.fechaReservaValida = function (fecha) {
    return /^\d{4}-\d{2}-\d{2}$/.test(fecha || "")
        && fecha >= fechaHoyISO()
        && fecha <= RESERVA_FECHA_MAX;
};

// Pone min  y max a un input de fecha
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

        //whatsApp
const WHATSAPP_CONFIG = {
    numero: "50368691065",
    mensaje: "Hola, quiero más información sobre Descubre El Salvador"
};

(function () {
    const boton = document.getElementById("whatsappFlotante");
    if (!boton) return;

    const numero = WHATSAPP_CONFIG.numero.replace(/\D/g, "");
    const mensaje = encodeURIComponent(WHATSAPP_CONFIG.mensaje);
    boton.href = `https://wa.me/${numero}?text=${mensaje}`;
})();