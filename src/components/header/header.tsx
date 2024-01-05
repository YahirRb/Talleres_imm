import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./header.css?inline";
import IMMLogo from "~/media/assets/logo.png?jsx";

interface BannerProps {
  puede_salir?: null | boolean
}

export const Header = component$<BannerProps>((props) => {
  useStylesScoped$(styles);
  return (
    <header class="banner">
      <div
        class="identificador"
        onClick$={() => {
          if (props.puede_salir === null || props.puede_salir === undefined || props.puede_salir){
            window.location.href = "/login";
          }
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
