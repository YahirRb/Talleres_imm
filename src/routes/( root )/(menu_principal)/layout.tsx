import {
  component$,
  Slot,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import { useNavigate, type RequestHandler } from "@builder.io/qwik-city";

import styles from "./layout.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

function seleccionarOpcion(id: string) {
  const antiguaOpcion = document.querySelector(
    ".opcion_seleccionada"
  ) as HTMLElement;
  const nuevaOpcion = document.getElementById(id);
  if (antiguaOpcion != null)
    antiguaOpcion.classList.remove("opcion_seleccionada");
  nuevaOpcion?.classList.add("opcion_seleccionada");
}

export default component$(() => {
  useStylesScoped$(styles);

  const menu_expandido = useSignal(false);
  const nav = useNavigate();

  return (
    <>
      <main>
        <nav class="navbar">
          <span
            class="navbar_item"
            id="agregar_taller"
            onClick$={() => {
              seleccionarOpcion("agregar_taller");
              nav("/talleres/agregar");
            }}
          >
            <i class="bi bi-plus-square-fill"></i>
            <p>Añadir taller</p>
          </span>
          <span
            class="navbar_item"
            id="lista_talleres"
            onClick$={() => {
              seleccionarOpcion("lista_talleres");
              nav("/talleres/lista");
            }}
          >
            <i class="bi bi-list-task"></i>
            <p>Lista de talleres</p>
          </span>
          <span
            class="navbar_item"
            onClick$={(event) => {
              const ventana = window.open("/inscripciones", "_blank");
              const boton = event.target as HTMLElement;
              boton.blur();
              ventana?.focus();
            }}
          >
            <i class="bi bi-person-fill-add"></i>
            <p>Pagina de inscripciones</p>
          </span>
          <span
            class="navbar_item"
            id="tomar_asistencias"
            onClick$={() => {
              seleccionarOpcion("tomar_asistencias");
              nav("/toma_asistencia");
            }}
          >
            <i class="bi bi-qr-code-scan"></i>
            <p>Tomar asistencias</p>
          </span>
          <span
            class="navbar_item"
            onClick$={() => {
              nav("/login");
            }}
            onMouseEnter$={() => {
              const icono_puerta = document.getElementById(
                "icono_puerta"
              ) as HTMLElement;
              icono_puerta.classList.remove("bi-door-closed-fill");
              icono_puerta.classList.add("bi-door-open-fill");
            }}
            onMouseLeave$={() => {
              const icono_puerta = document.getElementById(
                "icono_puerta"
              ) as HTMLElement;
              icono_puerta.classList.remove("bi-door-open-fill");
              icono_puerta.classList.add("bi-door-closed-fill");
            }}
          >
            <i class="bi bi-door-closed-fill" id="icono_puerta"></i>
            <p>Cerrar sesión</p>
          </span>
          <button
            class="expandir_navbar"
            onClick$={() => {
              const navbar = document.querySelector(".navbar") as HTMLElement;
              const btn_expandir = document.getElementById(
                "btn_expandMenu"
              ) as HTMLElement;
              if (menu_expandido.value) {
                navbar.style.width = "33px";
                btn_expandir.classList.remove("bi-arrow-bar-left");
                btn_expandir.classList.add("bi-arrow-bar-right");
                menu_expandido.value = false;
              } else {
                navbar.style.width = "225px";
                btn_expandir.classList.remove("bi-arrow-bar-right");
                btn_expandir.classList.add("bi-arrow-bar-left");
                menu_expandido.value = true;
              }
            }}
          >
            <i class="bi bi-arrow-bar-right" id="btn_expandMenu"></i>
          </button>
        </nav>
        <section class="contenido_menu">
          <Slot />
        </section>
      </main>
    </>
  );
});
