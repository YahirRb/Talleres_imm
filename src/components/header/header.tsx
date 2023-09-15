import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./header.css?inline";
import IMMLogo from "~/media/assets/logo.png?jsx";

export const Header = component$(() => {
  useStylesScoped$(styles);
  return (
    <header class="banner">
      <div
        class="identificador"
        onClick$={() => {
          window.location.href = "/";
        }}
      >
        <span class="logo">
          <IMMLogo />
        </span>
        <h1 class="titulo_principal">INSTITUTO MUNICIPAL DE LA MUJER</h1>
      </div>
    </header>
  );
});
