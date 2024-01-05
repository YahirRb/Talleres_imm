import { component$, useStylesScoped$ } from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";

import styles from "./index.css?inline";
import Swal from "sweetalert2";

interface FormularioInscripcionProps {
  es_publico?: null | boolean;
}

const comprobar_es_publico = (props) => {
  if (
    props.es_publico === null ||
    props.es_publico === undefined ||
    props.es_publico
  ) {
    return (
      <Link
        href="/inscripciones"
        style={{
          position: "absolute",
          top: "15px",
          color: "var(--color_principal)",
          transition: "color 0.3s ease-out",
          cursor: "pointer",
        }}
      >
        {"<"} Regresar
      </Link>
    );
  } else {
    return <></>;
  }
};

export const FormularioInscripcion = component$<FormularioInscripcionProps>(
  (props) => {
    useStylesScoped$(styles);
    const loc = useLocation();
    const nav = useNavigate();

    return (
      <div class="main_content">
        {comprobar_es_publico(props)}
        <form
          class="form_inscripcion"
          preventdefault:submit
          onSubmit$={(event) => {
            const form = event.target as HTMLFormElement;
            const nombreParticipante = form.nombre_participante.value;
            const apellidosParticipante = form.apellido_participante.value;
            const telefonoParticipante = form.telefono_participante.value;
            const edadParticipante = form.edad_participante.value;
            const sexoParticipante = form.sexo_participante.value;
            const correoParticipante = form.correo_participante.value;

            fetch("https://talleres-imm-aziv.onrender.com/participantes/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                nombre: nombreParticipante,
                apellidos: apellidosParticipante,
                telefono: telefonoParticipante,
                edad: edadParticipante,
                sexo: sexoParticipante,
                correo: correoParticipante,
                taller: loc.params.taller,
              }),
            }).then((response) => {
              if (response.ok) {
                Swal.fire({
                  text: "Inscripcion exitosa",
                  icon: "success",
                  showConfirmButton: true,
                  confirmButtonColor: "#d43b69",
                }).then(() => {
                  if (
                    props.es_publico === null ||
                    props.es_publico === undefined ||
                    props.es_publico
                  ) {
                    nav("/inscripciones");
                  } else {
                    form.reset();
                  }
                });
              } else {
                alert("Error en la inscripcion");
                throw new Error("Error en la peticion de inscripcion");
              }
            });
          }}
        >
          <span class="campo_formulario">
            <label for="nombre_participante" class="etiqueta_form">
              Nombre(s):{" "}
            </label>
            <input
              type="text"
              id="nombre_participante"
              name="nombre_participante"
              class="input_form"
              placeholder="Jane"
              required
            />
          </span>
          <span class="campo_formulario">
            <label for="apellido_participante" class="etiqueta_form">
              Apellidos:{" "}
            </label>
            <input
              type="text"
              id="apellido_participante"
              name="apellido_participante"
              class="input_form"
              placeholder="Doe"
              required
            />
          </span>
          <span class="campo_formulario">
            <label for="telefono_participante" class="etiqueta_form">
              Telefono:{" "}
            </label>
            <input
              type="tel"
              id="telefono_participante"
              name="telefono_participante"
              class="input_form"
              placeholder="9211234567"
              required
            />
          </span>
          <span class="campo_formulario">
            <label for="edad_participante" class="etiqueta_form">
              Edad:{" "}
            </label>
            <input
              type="number"
              id="edad_participante"
              name="edad_participante"
              class="input_form"
              placeholder="18"
              required
            />
          </span>
          <span class="campo_formulario">
            <label for="sexo_participante" class="etiqueta_form">
              Sexo:{" "}
            </label>
            <select
              id="sexo_participante"
              name="sexo_participante"
              class="input_form"
              required
            >
              <option value="M">Masculino</option>
              <option value="F" selected>
                Femenino
              </option>
              <option value="X">Otro</option>
            </select>
          </span>
          <span class="campo_formulario">
            <label for="correo_participante" class="etiqueta_form">
              Correo:{" "}
            </label>
            <input
              type="email"
              id="correo_participante"
              name="correo_participante"
              class="input_form"
              placeholder="ejemplo@email.com"
              required
            />
          </span>
          <input type="submit" class="btn_submit" value="Inscribir" />
        </form>
      </div>
    );
  }
);

export default FormularioInscripcion;

export const head: DocumentHead = {
  title: "Inscripción al taller",
  meta: [
    {
      name: "description",
      content: "Descripción",
    },
  ],
};
