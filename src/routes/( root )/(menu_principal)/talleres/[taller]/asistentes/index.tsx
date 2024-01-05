import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./index.css?inline";
import {
  useNavigate,
  Link,
  routeLoader$,
  DocumentHead,
} from "@builder.io/qwik-city";

interface AsistenteProps {
  nombre: string;
  telefono: string;
  edad: number;
  sexo: string;
  correo: string;
}

const Asistente = component$<AsistenteProps>((asistente) => {
  useStylesScoped$(styles);

  return (
    <div class="registro_asistente">
      <p>
        <strong>Nombre: </strong>
        {asistente.nombre}
      </p>
      <p>
        <strong>Telefono: </strong>
        {asistente.telefono}
      </p>
      <p>
        <strong>Edad: </strong>
        {asistente.edad}
      </p>
      <p>
        <strong>Sexo: </strong>
        {asistente.sexo}
      </p>
      <p>
        <strong>Correo: </strong>
        {asistente.correo}
      </p>
    </div>
  );
});

function iterarAsistentes(lista_asistentes: any) {
  const asistentes_jsx = [];
  for (let i = 0; i < lista_asistentes.length; i++) {
    let asistente: AsistenteProps = lista_asistentes[i];
    asistentes_jsx.push(
      <Asistente
        nombre={asistente.nombre}
        telefono={asistente.telefono}
        edad={asistente.edad}
        sexo={asistente.sexo}
        correo={asistente.correo}
      />
    );
  }
  return asistentes_jsx;
}

const useListaAsistentes = routeLoader$(async (requestEvent) => {
  const response = await fetch(
    `https://talleres-imm-aziv.onrender.com/participantes/${requestEvent.params.taller}`
  );
  const asistentes = await response.json();
  return asistentes;
});

const ListaAsistentes = component$(() => {
  useStylesScoped$(styles);

  const asistentes = useListaAsistentes().value;

  let componenteAMostrar;
  if (asistentes.length == 0 || asistentes == null) {
    componenteAMostrar = (
      <p style={{ width: "250px", height: "50px", margin: "auto" }}>
        No hay asistentes registrados
      </p>
    );
  } else {
    componenteAMostrar = iterarAsistentes(asistentes);
  }

  return <section class="lista_asistentes">{componenteAMostrar}</section>;
});

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  return (
    <>
      <nav class="nav_breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link href="/talleres/lista/" class="enlaces">
              Talleres
            </Link>
          </li>
          <li class="breadcrumb-item active">Asistentes</li>
        </ol>
      </nav>
      <ListaAsistentes />
    </>
  );
});

export const head: DocumentHead = {
  title: "Lista de asistentes",
  meta: [
    {
      name: "description",
      content: "Descripción",
    },
  ],
};
