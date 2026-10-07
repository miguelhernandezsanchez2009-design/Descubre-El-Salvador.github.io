//SCROLL DEL NAVBAR
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

// Calcula la ruta correcta 

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

  //  la lista de resultados

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

//FAVORITOS

        const botonesCategoria = document.querySelectorAll(".categorias button");
        const tarjetasDestino = [...document.querySelectorAll(".tarjeta")];
        const contenedorDestinos = document.querySelector(".destinos");

        tarjetasDestino.forEach((tarjeta, indice) => {
            tarjeta.dataset.orden = indice;
        });

        function ordenarFavoritos() {
            [...tarjetasDestino]
                .sort((a, b) => Number(b.classList.contains("es-favorito")) - Number(a.classList.contains("es-favorito")) || Number(a.dataset.orden) - Number(b.dataset.orden))
                .forEach((tarjeta) => contenedorDestinos.appendChild(tarjeta));
        }

        document.querySelectorAll(".favorito").forEach((corazon) => {
            corazon.addEventListener("click", () => {
                const tarjeta = corazon.closest(".tarjeta");
                const activo = tarjeta.classList.toggle("es-favorito");
                corazon.classList.toggle("activo", activo);
                corazon.textContent = activo ? "♥" : "♡";
                corazon.setAttribute("aria-pressed", activo);
                ordenarFavoritos();
            });
        });

        //TARJETA CLICABLE 
        tarjetasDestino.forEach((tarjeta) => {
            const destino = tarjeta.dataset.href;
            if (!destino) return;

            tarjeta.style.cursor = "pointer";

            tarjeta.addEventListener("click", (evento) => {
                if (evento.target.closest(".favorito")) return;
                window.location.href = destino;
            });

            tarjeta.addEventListener("keydown", (evento) => {
                if ((evento.key === "Enter" || evento.key === " ") && !evento.target.closest(".favorito")) {
                    evento.preventDefault();
                    window.location.href = destino;
                }
            });
        });

        botonesCategoria.forEach((boton) => {
            boton.addEventListener("click", () => {
                const filtro = boton.dataset.filtro;

                botonesCategoria.forEach((item) => item.classList.remove("seleccionado"));
                boton.classList.add("seleccionado");

                tarjetasDestino.forEach((tarjeta) => {
                    const mostrar = filtro === "todos" || tarjeta.dataset.categoria === filtro;
                    tarjeta.classList.toggle("oculta", !mostrar);
                });
            });
        });

        //CARRUSEL
        
      const imagenesHero = [
        '../IMG/lago de coatepeque1.jpeg',
        '../IMG/joya de ceren.jpeg',
        '../IMG/crater.jpeg'
      ];

      const heroSection = document.querySelector('.hero');
      const heroSlider = document.getElementById('heroSlider');
      const dotsWrap = document.querySelector('.hero-dots');
      let indiceActual = 0;
      let temporizador;

      imagenesHero.forEach((ruta, i) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide' + (i === 0 ? ' is-active' : '');
        slide.style.backgroundImage = `url('${ruta}')`;
        heroSlider.appendChild(slide);

        const punto = document.createElement('button');
        punto.type = 'button';
        punto.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
        if (i === 0) punto.classList.add('is-active');
        punto.addEventListener('click', () => irASlide(i));
        dotsWrap.appendChild(punto);
      });

      const slides = Array.from(heroSlider.children);
      const puntos = Array.from(dotsWrap.children);

      function irASlide(indice) {
        slides[indiceActual].classList.remove('is-active');
        puntos[indiceActual].classList.remove('is-active');
        indiceActual = indice;
        slides[indiceActual].classList.add('is-active');
        puntos[indiceActual].classList.add('is-active');
      }

      function siguienteSlide() {
        irASlide((indiceActual + 1) % slides.length);
      }

      function iniciarCarrusel() {
        temporizador = setInterval(siguienteSlide, 3000);
      }
      function pausarCarrusel() {
        clearInterval(temporizador);
      }

      iniciarCarrusel();
      heroSection.addEventListener('mouseenter', pausarCarrusel);
      heroSection.addEventListener('mouseleave', iniciarCarrusel);

      //whatsApp
      const WHATSAPP_CONFIG = {
            numero: "50368691065", 
            mensaje: "Hola, quiero más información sobre Descubre El Salvador"
        };

        (function () {
            const boton = document.getElementById("whatsappFlotante");
            const numero = WHATSAPP_CONFIG.numero.replace(/\D/g, "");
            const mensaje = encodeURIComponent(WHATSAPP_CONFIG.mensaje);
            boton.href = `https://wa.me/${numero}?text=${mensaje}`;
        })();

        // SESIÓN DE USUARIO (mini tarjeta en el ícono de login)
const btnUsuario = document.getElementById("btnUsuario");
const tarjetaSesion = document.getElementById("tarjetaSesion");
const nombreUsuarioTarjeta = document.getElementById("nombreUsuarioTarjeta");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

if (btnUsuario && tarjetaSesion) {
    function haySesionActiva() {
        return localStorage.getItem("sesionActiva") === "true";
    }

    btnUsuario.addEventListener("click", (e) => {
        if (!haySesionActiva()) return;
        e.preventDefault();
        e.stopPropagation();
        nombreUsuarioTarjeta.textContent = localStorage.getItem("usuarioNombre") || "Usuario";
        tarjetaSesion.classList.toggle("oculto");
    });

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("sesionActiva");
            localStorage.removeItem("usuarioNombre");
            window.location.reload();
        });
    }

    document.addEventListener("click", (e) => {
        if (!tarjetaSesion.contains(e.target) && e.target !== btnUsuario) {
            tarjetaSesion.classList.add("oculto");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") tarjetaSesion.classList.add("oculto");
    });
}

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