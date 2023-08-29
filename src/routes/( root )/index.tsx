import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div style={"margin: auto; text-align: center"} class="to_do">
        <p>Proximamente...</p>
        <a href="/login" class="enlaces">
          Ir a la pagina de login
        </a>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
