import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./header.css?inline";

export const Header = component$(() => {
  useStylesScoped$(styles);
  return (
    <header class="banner">
      <span
        class="identificador"
        onClick$={() => {
          window.location.href = "/";
        }}
      >
        <img class="logo" src="/assets/logo.png" alt="Logo" />
        <h1 class="titulo_principal">INSTITUTO MUNICIPAL DE LA MUJER</h1>
      </span>
    </header>
  );
});
