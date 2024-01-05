import { component$, useStylesScoped$ } from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";

import styles from "../../agregar/index.css?inline";
import { Mes } from "../../agregar";
import Swal from "sweetalert2";

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

const OptsMesesModificar = (mesElegido: string) => {
  console.log(mesElegido);
  const mesesJSX = Object.entries(meses).map(([numeroMes, nombreMes]) => {
    if (numeroMes == mesElegido)
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
  return mesesJSX;
};

interface DatosTaller {
  id: number;
  mes: string;
  nombre: string;
  dias: string;
  cupo: string;
  instructor: string;
}

const useDetallesTaller = routeLoader$(async (requestEvent) => {
  const response = await fetch(
    `https://talleres-imm-aziv.onrender.com/talleres/${requestEvent.params.taller}`
  );
  const taller = await response.json();
  return taller as DatosTaller;
});

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  const taller: DatosTaller = useDetallesTaller().value;
  console.log(taller);

  return (
    <>
      <nav class="nav_breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link href="/talleres/lista/" class="enlaces">
              Talleres
            </Link>
          </li>
          <li class="breadcrumb-item active">Editar</li>
        </ol>
      </nav>
      <form
        class="form_talleres"
        preventdefault:submit
        onSubmit$={(event) => {
          const form = event.target as HTMLFormElement;
          const mesTaller = form.mes_taller.value;
          const nombreTaller = form.nombre_taller.value;
          const fechaTaller = form.fecha_taller.value;
          const cupoTaller = form.cupo_taller.value;
          const instructorTaller = form.instructor_taller.value;

          console.log(mesTaller);
          console.log(nombreTaller);
          console.log(fechaTaller);
          console.log(cupoTaller);
          console.log(instructorTaller);

          fetch(
            `https://talleres-imm-aziv.onrender.com/talleres/${taller.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nombre: nombreTaller,
                mes: mesTaller,
                dias: fechaTaller,
                cupo: cupoTaller,
                instructor: instructorTaller,
              }),
            }
          ).then((response) => {
            console.log(response);
            if (response.ok) {
              if (response.status == 201) {
                Swal.fire({
                  text: "Taller agregado correctamente",
                  icon: "success",
                  showConfirmButton: true,
                  confirmButtonColor: "#d43b69",
                }).then(() => {
                  window.location.href = "/talleres/lista/";
                });
              }
            } else {
              throw new Error("Error en la peticion PUT");
            }
          });
        }}
      >
        <span class="campo_formulario">
          <label for="mes_taller" class="etiqueta_form">
            Taller para el mes de:
          </label>
          <select name="mes_taller" id="mes_taller" class="input_form">
            {OptsMesesModificar(taller.mes)}
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
            value={taller.nombre}
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
            value={taller.dias}
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
            value={taller.cupo}
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
            value={taller.instructor}
            required
          />
        </span>
        <input type="submit" class="btn_submit" value="Modificar" />
      </form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Editar taller",
  meta: [
    {
      name: "description",
      content: "Descripción",
    },
  ],
};
