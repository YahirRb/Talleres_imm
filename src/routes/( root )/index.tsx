import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

import { MenuDefault, AgregarTaller, ListaTalleres } from "./menus_index";
import styles from "./index.css?inline";

const menus: { [key: string]: JSX.Element } = {
  default: <MenuDefault />,
  agregar_taller: <AgregarTaller />,
  lista_talleres: <ListaTalleres />,
  tomar_asistencias: <></>,
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
  const menu_index = useSignal("agregar_taller");
  const menu: JSX.Element = menus[menu_index.value];

  return (
    <>
      <main>
        <nav class="navbar">
          <span
            class="navbar_item"
            id="agregar_taller"
            onClick$={() => {
              seleccionarOpcion("agregar_taller");
              menu_index.value = "agregar_taller";
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
              menu_index.value = "lista_talleres";
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
              menu_index.value = "tomar_asistencias";
            }}
          >
            <i class="bi bi-qr-code-scan"></i>
            <p>Tomar asistencias</p>
          </span>
          <span
            class="navbar_item"
            onClick$={() => {
              window.location.href = "/login";
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
        <div class="contenido_menu">{menu}</div>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Gestión de talleres IMM",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
