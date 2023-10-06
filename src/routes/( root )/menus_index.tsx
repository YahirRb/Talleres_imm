import { component$, useSignal } from "@builder.io/qwik";

import "./menus_index.css";

export const MenuDefault = component$(() => {
  const nombre = "{nombre del empleado}";
  return (
    <>
      <div class="cont_bienvenida">
        <p class="bienvenida">Buen dia {nombre}</p>
      </div>
    </>
  );
});

interface MesesProps {
  value: number;
  mes: string;
  selected?: boolean;
}

const Mes = component$<MesesProps>((props) => {
  if (props.selected)
    return (
      <option value={props.value} selected>
        {props.mes}
      </option>
    );
  return <option value={props.value}>{props.mes}</option>;
});

const meses = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const OptsMeses = Object.entries(meses).map(([numeroMes, nombreMes]) => {
  if (new Date().getMonth() + 1 == Number(numeroMes))
    return (
      <Mes
        key={numeroMes}
        value={Number(numeroMes)}
        mes={nombreMes}
        selected={true}
      />
    );
  return (
    <Mes
      key={numeroMes}
      value={Number(numeroMes)}
      mes={nombreMes}
      selected={false}
    />
  );
});

export const AgregarTaller = component$(() => {

  return (
    <>
      <form class="form_talleres" preventdefault:submit onSubmit$={() => {}}>
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

export const ListaTalleres = component$(() => {
  const expandido = useSignal(false);

  return (
    <>
      <section class="lista_talleres" >
        <article class="taller_registro" >
          <div class="info_taller" id="info_taller">
            <span class="datos_registro_taller" >
              <p>Nombre: John Doe</p>
              <p>Imparte: Jane Doe </p>
              <p>Fecha: 31/02/2023 </p>
              <p>Cupo actual: 5 personas </p>
            </span>
            <span class="boton_taller abrir_opciones" onClick$={() => {
              const info_taller = document.getElementById("info_taller") as HTMLElement;
              const opciones_taller = document.getElementById("opciones_taller") as HTMLElement;
              const icono_expandido = document.getElementById("abrir_opciones") as HTMLElement;
              if (expandido.value) {
                expandido.value = false;

                info_taller.style.borderRadius = "25px"

                opciones_taller.style.width = "0";
                opciones_taller.style.height = "0";
                opciones_taller.style.padding = "0";
                opciones_taller.style.border = "none"

                icono_expandido.classList.remove("bi-arrow-bar-left")
                icono_expandido.classList.add("bi-arrow-bar-right")
              } else {
                expandido.value = true;

                info_taller.style.borderRadius = "25px 0 0 25px"

                opciones_taller.style.width = "auto";
                opciones_taller.style.height = "auto";
                opciones_taller.style.padding = "15px";
                opciones_taller.style.border = "1px solid var(--color_principal)"
                opciones_taller.style.borderLeft = "none"

                icono_expandido.classList.remove("bi-arrow-bar-right")
                icono_expandido.classList.add("bi-arrow-bar-left")
              }
            }} >
              <p>Opciones</p>
              <i class="bi bi-arrow-bar-right" id="abrir_opciones"></i>
            </span>
          </div>
          <div class="opciones_taller" id="opciones_taller" >
            <span class="boton_taller">
              <p>Editar taller</p>
              <i class="bi bi-pencil-square"></i>
            </span>
            <span class="boton_taller">
              <p>Ver lista de asistentes</p>
              <i class="bi bi-person"></i>
            </span>
            <span class="boton_taller">
              <p>Agregar asistente</p>
              <i class="bi bi-person-add"></i>
            </span>
            <span class="boton_taller">
              <p>Eliminar taller</p>
              <i class="bi bi-trash3-fill"></i>
            </span>
          </div>
        </article>
      </section>
    </>
  )
})