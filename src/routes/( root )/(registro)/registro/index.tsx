import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import styles from "../registro.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <main class="main_registro">
        <form
          class="formulario"
          id="form_registro"
          onSubmit$={(event) => {
            // event.preventDefault()
            // const contrasena = event.target.contrasena
            // const confContrasena = event.target.confContrasena
            // if (contrasena.value != confContrasena.value) {
            //   mostrarSnacks("inferior", "Las contraseñas ingresadas deben ser iguales")
            // } else {
            //   mostrarSnacks("superior", "Normalmente el empleado sería registrado.")
            // }
          }}
        >
          <span class="campo_formulario" id="campo_nombres">
            <label for="nombres">Nombre(s)*:</label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              min="3"
              placeholder="Jane"
              onBlur$={(event) => {
                // if (event.target.value.length === 0) {
                //   setAlertaNombres(true)
                // } else {
                //   setAlertaNombres(false)
                // }
              }}
              onChange$={(event) => {
                // if (event.target.value.length >= 3) {
                //   if (alertaNombres) setAlertaNombres(false);
                // }
              }}
              required
            />
            <p class="advertencia_campo" id="advertencia_nombres">
              *Campo requerido
            </p>
          </span>
          <span class="campo_formulario" id="campo_apellidos">
            <label for="apellidos">Apellidos*:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              min="3"
              placeholder="Doe"
              onBlur$={(event) => {
                // if (event.target.value.length === 0) {
                //   setAlertaApellidos(true)
                // } else {
                //   setAlertaApellidos(false)
                // }
              }}
              onChange$={(event) => {
                // if (event.target.value.length >= 3) {
                //   if (alertaApellidos) setAlertaApellidos(false);
                // }
              }}
              required
            />
            <p class="advertencia_campo" id="advertencia_apellidos">
              *Campo requerido
            </p>
          </span>
          <span class="campo_formulario" id="campo_nombreUsuario">
            <label for="nombreUsuario">Nombre de usuario*:</label>
            <input
              id="nombreUsuario"
              name="nombreUsuario"
              placeholder="Ej. usuario123"
              onBlur$={(event) => {
                // if (event.target.value.length < 5) {
                //   setAlertaClave(true)
                // } else {
                //   setAlertaClave(false)
                // }
              }}
              onChange$={(event) => {
                // if (event.target.value.length >= 5) {
                //   if (alertaClave) setAlertaClave(false);
                // }
              }}
              required
            />
            <p class="advertencia_campo" id="advertencia_clave">
              *El usuario deber debe ser minimo de 3 caracteres
            </p>
          </span>
          <span class="campo_formulario" id="campo_correo">
            <label for="correo">Correo electrónico*:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="ejemplo@email.com"
              onBlur$={(event) => {
                // if (event.target.value.length === 0) {
                //   setAlertaCorreo(true)
                // } else {
                //   setAlertaCorreo(false)
                // }
              }}
              onChange$={(event) => {
                // if (event.target.value.length > 0) {
                //   if (alertaCorreo) setAlertaCorreo(false);
                // }
              }}
              required
            />
            <p class="advertencia_campo" id="advertencia_correo">
              *Campo requerido
            </p>
          </span>
          <span class="campo_formulario" id="campo_contrasena">
            <label for="contrasena">Contraseña*:</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              min="6"
              placeholder="******"
              onBlur$={(event) => {
                //   const advertencia = document.getElementById("advertencia_contrasena")
                //   if (event.target.value.length === 0) {
                //     advertencia.innerText = "*Campo requerido"
                //     setAlertaContrasena(true)
                //   } else {
                //     setAlertaContrasena(false)
                //     advertencia.innerText = ""
                //   }
                // }} onChange$={(event) => {
                //   if (alertaContrasena && event.target.value.length > 0) {
                //     setAlertaContrasena(false);
                //   }
              }}
              required
            />
            <p class="advertencia_campo" id="advertencia_contrasena"></p>
          </span>
          <span class="campo_formulario" id="campo_confContrasena">
            <label for="confContrasena">Confirmar contraseña*:</label>
            <input
              type="password"
              id="confContrasena"
              name="confContrasena"
              min="6"
              placeholder="******"
              onBlur$={(event) => {
                // const advertencia = document.getElementById("advertencia_confContrasena")
                // if (event.target.value.length === 0) {
                //   advertencia.innerText = "*Campo requerido"
                //   setAlertaConfContrasena(true)
                // } else {
                //   setAlertaConfContrasena(false)
                //   advertencia.innerText = ""
                // }
              }}
              onChange$={(event) => {
                // if (alertaConfContrasena && event.target.value.length > 0) {
                //   setAlertaConfContrasena(false);
                // }
              }}
              required
            />
            <p class="advertencia_campo" id="advertencia_confContrasena"></p>
          </span>
          <input type="submit" class="btn_submit" value="Registrarse" />
        </form>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Registrarse",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
