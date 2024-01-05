import { component$ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";
import { FormularioInscripcion } from "~/routes/( root )/inscripciones/[taller]/index";

export default component$(() => {
  return (
    <>
      <nav class="nav_breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link href="/talleres/lista/" class="enlaces">
              Talleres
            </Link>
          </li>
          <li class="breadcrumb-item active">Inscribir</li>
        </ol>
      </nav>
      <FormularioInscripcion es_publico={false} />
    </>
  );
});

export const head: DocumentHead = {
  title: "Inscribir persona",
  meta: [
    {
      name: "description",
      content: "Descripción",
    },
  ],
};
