import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

import styles from "../registro.css?inline";
import Swal from "sweetalert2";

const tipos_alertas = {
  nombre: {
    id: "advertencia_nombres",
    campo: "nombres",
    contenedor: "campo_nombres",
  },
  apellidos: {
    id: "advertencia_apellidos",
    campo: "apellidos",
    contenedor: "campo_apellidos",
  },
  usuario: {
    id: "advertencia_usuario",
    campo: "nombreUsuario",
    contenedor: "campo_nombreUsuario",
  },
  correo: {
    id: "advertencia_correo",
    campo: "correo",
    contenedor: "campo_correo",
  },
  contrasena: {
    id: "advertencia_contrasena",
    campo: "contrasena",
    contenedor: "campo_contrasena",
  },
  recuperarContrasena: {
    id: "advertencia_recuperar",
    campo: "confContrasena",
    contenedor: "campo_confContrasena",
  },
};
function manejoAlertas(
  alerta: keyof typeof tipos_alertas,
  advertir: boolean,
  mensaje: string = ""
) {
  const campo = document.getElementById(
    tipos_alertas[alerta].campo
  ) as HTMLElement;
  const contenedor = document.getElementById(
    tipos_alertas[alerta].contenedor
  ) as HTMLElement;
  const advertencia = document.getElementById(
    tipos_alertas[alerta].id
  ) as HTMLElement;

  if (advertir) {
    campo.style.borderColor = "red";
    contenedor.style.marginBottom = "25px";
    advertencia.style.display = "flex";
    if (mensaje !== "") {
      advertencia.innerText = mensaje;
    }
  } else {
    campo.style.borderColor = "#d43b69";
    contenedor.style.marginBottom = "0px";
    advertencia.style.display = "none";
  }
}

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  const validacion_datos = useStore({
    nombre: false,
    apellidos: false,
    nombre_usuario: false,
    correo: false,
    contrasena: false,
    conf_contrasena: false,
  });

  return (
    <>
      <main class="main_registro">
        <form
          class="formulario"
          id="form_registro"
          preventdefault:submit
          onSubmit$={(event) => {
            const form = event.target as HTMLFormElement;
            const nombre = form.nombres.value;
            const apellidos = form.apellidos.value;
            const nombre_usuario = form.nombreUsuario.value;
            const correo = form.correo.value.toLowerCase();
            const contrasena = form.contrasena.value;
            const confirmacion_contrasena = form.confContrasena.value;

            if (contrasena !== confirmacion_contrasena) {
              Swal.fire({
                title: "Contraseñas invalidas",
                text: "Las contraseñas deben coincidir",
                icon: "warning",
                showConfirmButton: true,
                confirmButtonColor: "#d43b69",
              });
            }

            // console.log("Nombre del usuario:" + nombre_Registro);
            // console.log("Apellido del usuario:" + apellido_Registro);
            // console.log("Nickname del usuario:" + usuario_Registro);
            // console.log("Email del usuario:" + email_Registro);
            // console.log("Contraseña del usuario:" + contrasena_Registro);
            // console.log("Conf contrasena: " + confirmacion_contrasena);

            Swal.showLoading();
            fetch("https://talleres-imm-aziv.onrender.com/empleados", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                password: contrasena,
                usuario: nombre_usuario,
              }),
            })
              .then((response) => {
                Swal.close();
                if (response.ok && response.status == 201) {
                  Swal.fire({
                    title: "Registro exitoso",
                    text: "Se le ha enviado un correo de confirmación",
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonColor: "#d43b69",
                  }).then(() => {
                    nav("/login");
                  });
                } else if (response.status == 400) {
                  Swal.fire({
                    title: "Error al registrarse",
                    text: "Intente de nuevo mas tarde",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonColor: "#d43b69",
                  });
                } else {
                  Swal.fire({
                    title: "Error inesperado",
                    text: `Intente de nuevo mas tarde. Codigo de error: ${response.status}`,
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonColor: "#d43b69",
                  });
                  throw new Error("Error en la petición");
                }
              })
              .catch((error) => {
                Swal.fire({
                  title: "Error inesperado",
                  text: "Intente de nuevo mas tarde",
                  icon: "error",
                  showConfirmButton: true,
                  confirmButtonColor: "#d43b69",
                });
              });
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
                if (event.target.value.length === 0) {
                  manejoAlertas("nombre", true);
                } else {
                  manejoAlertas("nombre", false);
                }
              }}
              onInput$={(event) => {
                const input = event.target as HTMLInputElement;
                if (input.value.length >= 3) {
                  manejoAlertas("nombre", false);
                  validacion_datos.nombre = true;
                } else {
                  validacion_datos.nombre = false;
                }
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
                if (event.target.value.length === 0) {
                  manejoAlertas("apellidos", true);
                } else {
                  manejoAlertas("apellidos", false);
                }
              }}
              onInput$={(event) => {
                const input = event.target as HTMLInputElement;
                if (input.value.length >= 3) {
                  manejoAlertas("apellidos", false);
                  validacion_datos.apellidos = true;
                } else {
                  validacion_datos.apellidos = false;
                }
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
                if (event.target.value.length === 0) {
                  manejoAlertas("usuario", true);
                } else {
                  manejoAlertas("usuario", false);
                }
              }}
              onInput$={(event) => {
                const input = event.target as HTMLInputElement;
                if (input.value.length >= 3) {
                  manejoAlertas("usuario", false);
                  validacion_datos.nombre_usuario = true;
                } else {
                  validacion_datos.nombre_usuario = false;
                }
              }}
              required
            />
            <p class="advertencia_campo" id="advertencia_usuario">
              *Campo requerido
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
                if (event.target.value.length === 0) {
                  manejoAlertas("correo", true);
                } else {
                  manejoAlertas("correo", false);
                }
              }}
              onInput$={(event) => {
                const input = event.target as HTMLInputElement;
                if (input.value.length >= 3) {
                  manejoAlertas("correo", false);
                  validacion_datos.correo = true;
                } else {
                  validacion_datos.correo = false;
                }
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
                const input = event.target as HTMLInputElement;
                if (input.value.length === 0) {
                  manejoAlertas("contrasena", true, "*Campo requerido");
                } else if (input.value.length < 6) {
                  manejoAlertas(
                    "contrasena",
                    true,
                    "*La contraseña debe ser minimo de 6 caracteres"
                  );
                } else {
                  manejoAlertas("contrasena", false);
                }
              }}
              onInput$={(event) => {
                const input = event.target as HTMLInputElement;
                if (input.value.length >= 6) {
                  manejoAlertas("contrasena", false);
                  validacion_datos.contrasena = true;
                } else {
                  validacion_datos.contrasena = false;
                }
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
                const input = event.target as HTMLInputElement;
                if (input.value.length === 0) {
                  manejoAlertas(
                    "recuperarContrasena",
                    true,
                    "*Campo requerido"
                  );
                } else if (input.value.length < 6) {
                  manejoAlertas(
                    "recuperarContrasena",
                    true,
                    "*La contraseña debe ser minimo de 6 caracteres"
                  );
                } else {
                  manejoAlertas("recuperarContrasena", false);
                }
              }}
              onInput$={(event) => {
                const input = event.target as HTMLInputElement;
                if (input.value.length >= 6) {
                  manejoAlertas("recuperarContrasena", false);
                  validacion_datos.conf_contrasena = true;
                } else {
                  validacion_datos.conf_contrasena = false;
                }
              }}
              required
            />
            <p class="advertencia_campo" id="advertencia_recuperar"></p>
          </span>
          <input
            type="submit"
            class="btn_submit"
            value="Registrarse"
            disabled={
              !(
                validacion_datos.nombre &&
                validacion_datos.apellidos &&
                validacion_datos.nombre_usuario &&
                validacion_datos.correo &&
                validacion_datos.contrasena &&
                validacion_datos.conf_contrasena
              )
            }
          />
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
