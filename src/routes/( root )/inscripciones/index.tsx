import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { useRecuperarTalleres } from "../layout";

import styles from "./index.css?inline";
import Swal from "sweetalert2";

interface TallerProp {
  id_doc: number;
  nombre: string;
  mes: string;
  dias: string;
  cupo: number;
}

const TallerInscripcion = component$<TallerProp>((taller) => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  return (
    <div class="taller" key={taller.id_doc}>
      <p>
        <strong>Nombre:</strong> {taller.nombre}
      </p>
      <p>
        <strong>Fecha:</strong> {`${taller.dias}/${taller.mes}`}/23
      </p>
      <p>
        <strong>Cupo disponible: </strong> {taller.cupo}
      </p>
      <span
        class="btn_inscribirse"
        onClick$={() => {
          if (taller.cupo <= 0) {
            Swal.fire({
              title: "Taller lleno",
              text: "No es posible que se inscriban mas personas",
              icon: "error",
              showConfirmButton: true,
              confirmButtonColor: "#d43b69",
            });
          } else {
            nav(`/inscripciones/${taller.id_doc}`);
          }
        }}
      >
        <p>Inscribirse</p>
      </span>
    </div>
  );
});

const lista_talleres = (talleres: object) => {
  const talleresJSX = [];
  for (let i = 0; i < talleres.length; i++) {
    let tallerJSX = (
      <TallerInscripcion
        id_doc={talleres[i].id_doc}
        nombre={talleres[i].nombre}
        mes={talleres[i].mes}
        dias={talleres[i].dias}
        cupo={talleres[i].cupo - talleres[i].participantes}
      />
    );
    talleresJSX.push(tallerJSX);
  }
  return talleresJSX;
};

export default component$(() => {
  useStylesScoped$(styles);
  const talleres = useRecuperarTalleres().value;
  // console.log(talleres);

  return <main>{lista_talleres(talleres)}</main>;
});

export const head: DocumentHead = {
  title: "Inscripción a talleres",
  meta: [
    {
      name: "description",
      content: "",
    },
  ],
};
