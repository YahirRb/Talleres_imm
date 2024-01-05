import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";

import styles from "./index.css?inline";

export const useEmpleadoDatos = routeLoader$(async (requestEvent) => {});

export default component$(() => {
  useStylesScoped$(styles);

  const empleado = useSignal({
    nombre: "",
    apellidos: "",
  });
  useVisibleTask$(() => {
    try {
      empleado.value = JSON.parse(localStorage.getItem("usuario")!);
      if (!empleado.value) {
        throw new Error();
      }
    } catch (exception) {
      window.location.href = "/login";
    }
  });

  return (
    <>
      <div class="cont_bienvenida">
        <p class="bienvenida">
          Buen dia {empleado.value.nombre} {empleado.value.apellidos}
        </p>
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
