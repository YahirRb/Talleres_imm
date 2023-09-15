import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <ul>
        <p style={"margin: auto"}>Inscripciones</p>
      </ul>
    </>
  );
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
