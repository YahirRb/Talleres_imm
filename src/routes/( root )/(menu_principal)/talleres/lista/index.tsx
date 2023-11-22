import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

import styles from "./index.css?inline";
import { useRecuperarTalleres } from "~/routes/( root )/layout";

interface TallerProps {
  id: number;
  nombre: string;
  instructor: string;
  dias: string;
  mes: string;
  cupo: number;
}

const TallerElemento = component$<TallerProps>((taller) => {
  useStylesScoped$(styles)
  const nav = useNavigate();
  const expandido = useSignal(false);

  return (
    <article class="taller_registro">
      <div class="info_taller" id="info_taller">
        <span class="datos_registro_taller">
          <p>Nombre: {taller.nombre}</p>
          <p>Imparte: {taller.instructor}</p>
          <p>Fecha: {taller.dias}/{taller.mes}/2023 </p>
          <p>Cupo actual: {taller.cupo} personas </p>
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

              opciones_taller.style.width = "150px";
              opciones_taller.style.height = "225px";
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
            nav(`/talleres/${taller.id}/editar`)
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
  )
})

const lista_talleres = (talleres: object) => {
  console.log(talleres);
  const talleresJSX = [];
  for (let i = 0; i < talleres.length; i++) {
    let tallerJSX = (
      <TallerElemento
        id={talleres[i].id}
        nombre={talleres[i].nombre}
        mes={talleres[i].mes}
        instructor={talleres[i].nombre}
        dias={talleres[i].dias}
        cupo={talleres[i].cupo}
      />
    )
    talleresJSX.push(tallerJSX);
  }
  return talleresJSX;
}

export default component$(() => {
  useStylesScoped$(styles);
  const talleres = useRecuperarTalleres().value

  return (
    <>
      <section class="lista_talleres">
        {lista_talleres(talleres)}
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
