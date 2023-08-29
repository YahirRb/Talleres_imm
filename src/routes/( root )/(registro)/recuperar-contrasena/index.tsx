import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import styles from "../registro.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <main class="main_recuperarcontra" onSubmit$={(event) => {}}>
        <form class="formulario" id="form_recuperarcontra">
          <span class="campo_formulario">
            <label for="correo">Correo electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="ejemplo@email.com"
              required
            />
          </span>
          <input type="submit" class="btn_submit" value="Cambiar contraseña" />
        </form>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Recuperar contraseña",
  meta: [
    {
      name: "description",
      content: "Descripción",
    },
  ],
};
