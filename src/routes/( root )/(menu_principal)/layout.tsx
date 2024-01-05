import {
  component$,
  Signal,
  Slot,
  useSignal,
  useStylesScoped$,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate, type RequestHandler } from "@builder.io/qwik-city";
import Swal from "sweetalert2";

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

function expandirNavbar(menu_expandido: Signal, responsive = false) {
  const main = document.querySelector("main") as HTMLElement;
  const navbar = document.querySelector(".navbar_lateral") as HTMLElement;
  const btn_expandir = document.getElementById("btn_expandMenu") as HTMLElement;
  if (menu_expandido.value) {
    if (responsive) {
      navbar.style.width = "0px";
      navbar.style.padding = "0px";
      main.style.overflow = "hidden";
      const overlay = document.getElementById("overlay") as HTMLDivElement;
      overlay.style.display = "none";
    } else {
      navbar.style.width = "54px";
    }
    btn_expandir.classList.remove("bi-arrow-bar-left");
    btn_expandir.classList.add("bi-arrow-bar-right");
    menu_expandido.value = false;
  } else {
    if (responsive) {
      navbar.style.padding = "10px";
      main.style.overflow = "hidden";
      const overlay = document.getElementById("overlay") as HTMLDivElement;
      overlay.style.display = "block";
    }
    navbar.style.width = "250px";
    btn_expandir.classList.remove("bi-arrow-bar-right");
    btn_expandir.classList.add("bi-arrow-bar-left");
    menu_expandido.value = true;
  }
}

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  const ancho = useSignal(0);
  const responsive = useSignal(false);
  const menu_expandido = useSignal(false);
  const navbar = useSignal<HTMLElement>();
  useVisibleTask$(() => {
    ancho.value = window.innerWidth;
    window.addEventListener("resize", () => {
      ancho.value = window.innerWidth;
    });
  });
  useTask$(({ track }) => {
    track(() => ancho.value);
    responsive.value = ancho.value < 612 ? true : false;
  });
  useTask$(({ track }) => {
    track(() => responsive.value);
  });

  return (
    <>
      <main>
        <nav class="navbar_lateral" ref={navbar}>
          <span
            class="navbar_lateral_item"
            id="agregar_taller"
            onClick$={() => {
              if (!responsive.value || menu_expandido.value) {
                seleccionarOpcion("agregar_taller");
                nav("/talleres/agregar");
                if (responsive.value) {
                  expandirNavbar(menu_expandido, true);
                }
              }
            }}
          >
            <i class="bi bi-plus-square-fill"></i>
            <p>Añadir taller</p>
          </span>
          <span
            class="navbar_lateral_item"
            id="lista_talleres"
            onClick$={() => {
              if (!responsive.value || menu_expandido.value) {
                seleccionarOpcion("lista_talleres");
                nav("/talleres/lista");
                if (responsive.value) {
                  expandirNavbar(menu_expandido, true);
                }
              }
            }}
          >
            <i class="bi bi-list-task"></i>
            <p>Lista de talleres</p>
          </span>
          <span
            class="navbar_lateral_item"
            onClick$={(event) => {
              if (!responsive.value || menu_expandido.value) {
                const ventana = window.open("/inscripciones", "_blank");
                const boton = event.target as HTMLElement;
                boton.blur();
                ventana?.focus();
                if (responsive.value) {
                  expandirNavbar(menu_expandido, true);
                }
              }
            }}
          >
            <i class="bi bi-person-fill-add"></i>
            <p>Pagina de inscripciones</p>
          </span>
          <span
            class="navbar_lateral_item"
            id="tomar_asistencias"
            onClick$={() => {
              if (!responsive.value || menu_expandido.value) {
                seleccionarOpcion("tomar_asistencias");
                nav("/toma_asistencia");
                if (responsive.value) {
                  expandirNavbar(menu_expandido, true);
                }
              }
            }}
          >
            <i class="bi bi-qr-code-scan"></i>
            <p>Tomar asistencias</p>
          </span>
          <span
            class="navbar_lateral_item"
            onClick$={() => {
              // if (!responsive.value || menu_expandido.value) {
              //   if (responsive.value) {
              //     expandirNavbar(menu_expandido, true);
              //   }
              //   Swal.showLoading();
              //   fetch("https://talleres-imm.onrender.com/api/logout", {
              //     method: "GET",
              //     headers: {
              //       "Content-Type": "application/json",
              //     },
              //   }).then((response) => {
              //     Swal.close();
              //     if (response.ok && response.status == 200) {
              //       nav("/login");
              //     } else {
              //       Swal.fire({
              //         title: "Ha ocurrido un error",
              //         text: "Intente de nuevo mas tarde",
              //         confirmButtonText: "Ok",
              //         confirmButtonColor: "#d43b69",
              //       });
              //     }
              //   });
              // }
              localStorage.removeItem("usuario");
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
              const responsive = ancho.value < 612 ? true : false;
              expandirNavbar(menu_expandido, responsive);
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
