import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

import styles from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const nombre = "{nombre del empleado}";
  return (
    <>
      <div class="cont_bienvenida">
        <p class="bienvenida">Buen dia {nombre}</p>
      </div>
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
