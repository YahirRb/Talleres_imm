import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { useRecuperarTalleres } from "../layout";

import styles from "./index.css?inline";

interface TallerProp {
  id: number;
  nombre: string;
  mes: string;
  dias: string;
  cupo: number;
}

const TallerInscripcion = component$<TallerProp>((taller) => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  return (
    <div class="taller">
      <p>
        <strong>Nombre:</strong> {taller.nombre}
      </p>
      <p>
        <strong>Fecha:</strong> {`${taller.dias}/${taller.mes}`}/23
      </p>
      <p>
        <strong>Cupo disponible: </strong> {taller.cupo}
      </p>
      <span class="btn_inscribirse" onClick$={() => {
        nav(`/inscripciones/${taller.id}`)
      }} >
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
        id={talleres[i].id}
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
