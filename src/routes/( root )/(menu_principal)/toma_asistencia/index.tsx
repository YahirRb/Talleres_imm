import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

import styles from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <div class="centrado">
        <p>Asistencias</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Toma de asistencias",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
