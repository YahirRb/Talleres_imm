import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import styles from "./index.css?inline";

interface MesesProps {
  value: number;
  mes: string;
  elegido?: boolean;
}

export const Mes = component$<MesesProps>((props) => {
  if (props.elegido)
    return (
      <option value={props.value} selected>
        {props.mes}
      </option>
    );
  return <option value={props.value}>{props.mes}</option>;
});

const meses = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre",
};

const OptsMeses = Object.entries(meses).map(([numeroMes, nombreMes]) => {
  const mesActual = new Date().getMonth();
  if (mesActual + 1 == Number(numeroMes) || mesActual + 1 == 13)
    return (
      <Mes
        key={numeroMes}
        value={Number(numeroMes)}
        mes={nombreMes}
        elegido={true}
      />
    );
  return (
    <Mes
      key={numeroMes}
      value={Number(numeroMes)}
      mes={nombreMes}
      elegido={false}
    />
  );
});


export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <form class="form_talleres" preventdefault: submit onSubmit$={(event) => {
        //Aqui se agrega la LOGICA
        const form = event.target
        const mesTaller = form.mes_taller.value;
        const nombreTaller = form.nombre_taller.value;
        const fechaTaller = form.fecha_taller.value;
        const cupoTaller = form.cupo_taller.value;
        const instructorTaller = form.instructor_taller.value;

        console.log("Mes: ", mesTaller);
        console.log("Nombre: ", nombreTaller);
        console.log("Fecha: ", fechaTaller);
        console.log("Cupo: ", cupoTaller);
        console.log("Instructor: ", instructorTaller);

        fetch("https://talleres-imm.onrender.com/taller/registro", {
          method: "POST", headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify({
                nombre : nombreTaller,
                mes : mesTaller,
                dias : fechaTaller,
                cupo : cupoTaller,
                instructor : instructorTaller
            })
        })
          .then(response => {
            if (response.ok) {
              alert(response.status)
              //nav("/login");
              return response.text();
            } else {
              throw new Error('Error en la petición POST');
            }
          })

      }}>
        <span class="campo_formulario">
          <label for="mes_taller" class="etiqueta_form">
            Taller para el mes de:
          </label>
          <select name="mes_taller" id="mes_taller" class="input_form">
            {OptsMeses}
          </select>
        </span>
        <span class="campo_formulario">
          <label for="nombre_taller" class="etiqueta_form">
            Nombre del taller*:
          </label>
          <input
            type="text"
            id="nombre_taller"
            name="nombre_taller"
            class="input_form"
            placeholder="Ej. Curso para ..."
            required
          />
        </span>
        <span class="campo_formulario">
          <label for="fecha_taller" class="etiqueta_form">
            Dia(s) del taller*:
          </label>
          <input
            type="text"
            id="fecha_taller"
            name="fecha_taller"
            class="input_form"
            placeholder="Ej. 01 o 05,06"
            required
          />
        </span>
        <span class="campo_formulario">
          <label for="cupo_taller" class="etiqueta_form">
            Cantidad de cupo*:
          </label>
          <input
            type="number"
            id="cupo_taller"
            name="cupo_taller"
            class="input_form"
            placeholder="Ej. 20"
            required
          />
        </span>
        <span class="campo_formulario">
          <label for="instructor_taller" class="etiqueta_form">
            Instructor(a)*:
          </label>
          <input
            type="text"
            id="instructor_taller"
            name="instructor_taller"
            class="input_form"
            placeholder="Ej. María Perez"
            required
          />
        </span>
        <input type="submit" class="btn_submit" value="Agregar" />
      </form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Agregar taller",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
