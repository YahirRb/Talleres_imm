import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";

import styles from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  const expandido = useSignal(false);

  const taller_ejemplo = {
    mes: "Diciembre",
    nombre: "Taller ejemplo",
    instructor: "Jane Doe",
    dias: "31",
    cupoMaximo: 5,
  };

  return (
    <>
      <section class="lista_talleres">
        <article class="taller_registro">
          <div class="info_taller" id="info_taller">
            <span class="datos_registro_taller">
              <p>Nombre: {taller_ejemplo.mes}</p>
              <p>Imparte: {taller_ejemplo.instructor}</p>
              <p>Fecha: {taller_ejemplo.dias}/02/2023 </p>
              <p>Cupo actual: {taller_ejemplo.cupoMaximo} personas </p>
            </span>
            <span
              class="boton_taller abrir_opciones"
              onClick$={() => {
                const info_taller = document.getElementById(
                  "info_taller"
                ) as HTMLElement;
                const opciones_taller = document.getElementById(
                  "opciones_taller"
                ) as HTMLElement;
                const icono_expandido = document.getElementById(
                  "abrir_opciones"
                ) as HTMLElement;
                if (expandido.value) {
                  expandido.value = false;

                  info_taller.style.borderRadius = "25px";

                  opciones_taller.style.width = "0";
                  opciones_taller.style.height = "0";
                  opciones_taller.style.padding = "0";
                  opciones_taller.style.border = "none";

                  icono_expandido.classList.remove("bi-arrow-bar-left");
                  icono_expandido.classList.add("bi-arrow-bar-right");
                } else {
                  expandido.value = true;

                  info_taller.style.borderRadius = "25px 0 0 25px";

                  opciones_taller.style.width = "auto";
                  opciones_taller.style.height = "auto";
                  opciones_taller.style.padding = "15px";
                  opciones_taller.style.border =
                    "1px solid var(--color_principal)";
                  opciones_taller.style.borderLeft = "none";

                  icono_expandido.classList.remove("bi-arrow-bar-right");
                  icono_expandido.classList.add("bi-arrow-bar-left");
                }
              }}
            >
              <p>Opciones</p>
              <i class="bi bi-arrow-bar-right" id="abrir_opciones"></i>
            </span>
          </div>
          <div class="opciones_taller" id="opciones_taller">
            <span
              class="boton_taller"
              onClick$={() =>
                nav(`/talleres/${JSON.stringify(taller_ejemplo)}/editar`)
              }
            >
              <p>Editar taller</p>
              <i class="bi bi-pencil-square"></i>
            </span>
            <span class="boton_taller">
              <p>Ver lista de asistentes</p>
              <i class="bi bi-person"></i>
            </span>
            <span class="boton_taller">
              <p>Agregar asistente</p>
              <i class="bi bi-person-add"></i>
            </span>
            <span class="boton_taller">
              <p>Eliminar taller</p>
              <i class="bi bi-trash3-fill"></i>
            </span>
          </div>
        </article>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Lista de talleres",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
