import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

import styles from "./index.css?inline";
import { useRecuperarTalleres } from "~/routes/( root )/layout";
import Swal from "sweetalert2";

interface TallerProps {
  id_doc: number;
  nombre: string;
  instructor: string;
  dias: string;
  mes: string;
  cupo: number;
}

const TallerElemento = component$<TallerProps>((taller) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const expandido = useSignal(false);

  return (
    <article class="taller_registro">
      <div class="info_taller" id={`info_taller-${taller.id_doc}`}>
        <span class="datos_registro_taller">
          <p>
            <strong>Nombre:</strong> {taller.nombre}
          </p>
          <p>
            <strong>Imparte:</strong> {taller.instructor}
          </p>
          <p>
            <strong>Fecha:</strong> {taller.dias}/{taller.mes}/2023{" "}
          </p>
          <p>
            <strong>Cupo actual:</strong> {taller.cupo} personas{" "}
          </p>
        </span>
        <span
          class="boton_taller abrir_opciones"
          onClick$={() => {
            const info_taller = document.getElementById(
              `info_taller-${taller.id_doc}`
            ) as HTMLElement;
            const opciones_taller = document.getElementById(
              `opciones_taller-${taller.id_doc}`
            ) as HTMLElement;
            const icono_expandido = document.getElementById(
              `abrir_opciones_taller-${taller.id_doc}`
            ) as HTMLElement;

            if (expandido.value) {
              expandido.value = false;

              info_taller.style.borderRadius = "25px";

              opciones_taller.style.width = "0";
              opciones_taller.style.height = "0";
              opciones_taller.style.padding = "0";
              opciones_taller.style.border = "none";

              icono_expandido.classList.remove("bi-arrow-bar-left");
              icono_expandido.classList.add("bi-arrow-bar-right");
            } else {
              expandido.value = true;

              info_taller.style.borderRadius = "25px 0px 0px 25px";

              opciones_taller.style.width = "170px";
              opciones_taller.style.height = "100%";
              opciones_taller.style.padding = "15px";
              opciones_taller.style.border = "1px solid var(--color_principal)";
              opciones_taller.style.borderLeft = "none";

              icono_expandido.classList.remove("bi-arrow-bar-right");
              icono_expandido.classList.add("bi-arrow-bar-left");
            }
          }}
        >
          <p>Opciones</p>
          <i
            class="bi bi-arrow-bar-right"
            id={`abrir_opciones_taller-${taller.id_doc}`}
          ></i>
        </span>
      </div>
      <div class="opciones_taller" id={`opciones_taller-${taller.id_doc}`}>
        <span
          class="boton_taller"
          onClick$={() => nav(`/talleres/${taller.id_doc}/editar`)}
        >
          <p>Editar taller</p>
          <i class="bi bi-pencil-square"></i>
        </span>
        <span
          class="boton_taller"
          onClick$={() => {
            nav(`/talleres/${taller.id_doc}/asistentes`);
          }}
        >
          <p>Ver lista de asistentes</p>
          <i class="bi bi-person"></i>
        </span>
        <span
          class="boton_taller"
          onClick$={() => {
            nav(`/talleres/${taller.id_doc}/inscribir`);
          }}
        >
          <p>Agregar asistente</p>
          <i class="bi bi-person-add"></i>
        </span>
        <span
          class="boton_taller"
          onClick$={() => {
            Swal.fire({
              title: "PRECAUCIÓN",
              text: "Si borras el taller no se podran recuperar los datos asociados a el.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d43b69",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, borrarlo",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.showLoading();
                fetch(
                  `https://talleres-imm-aziv.onrender.com/talleres/${taller.id_doc}`,
                  {
                    method: "DELETE",
                  }
                )
                  .then((response) => {
                    Swal.close();
                    if (response.ok) {
                      if (response.status == 200) {
                        Swal.fire({
                          text: "El taller ha sido borrado",
                          icon: "success",
                          confirmButtonColor: "#d43b69",
                        }).then(() => {
                          window.location.reload();
                        });
                      }
                    } else {
                      Swal.fire({
                        text: "Error al eliminar el taller",
                        icon: "error",
                        confirmButtonColor: "#d43b69",
                      });
                    }
                  })
                  .catch((error) => {
                    Swal.close();
                    Swal.fire({
                      text: "Hubo un error inesperado",
                      icon: "error",
                      confirmButtonColor: "#d43b69",
                    });
                  });
              }
            });
          }}
        >
          <p>Eliminar taller</p>
          <i class="bi bi-trash3-fill"></i>
        </span>
      </div>
    </article>
  );
});

const lista_talleres = (talleres: object) => {
  const talleresJSX = [];
  for (let i = 0; i < talleres.length; i++) {
    const key: number = i;
    let tallerJSX = (
      <TallerElemento
        key={key}
        id_doc={talleres[i].id_doc}
        nombre={talleres[i].nombre}
        mes={talleres[i].mes}
        instructor={talleres[i].nombre}
        dias={talleres[i].dias}
        cupo={talleres[i].cupo}
      />
    );
    talleresJSX.push(tallerJSX);
  }
  return talleresJSX;
};

export default component$(() => {
  useStylesScoped$(styles);
  const talleres = useRecuperarTalleres().value;

  return (
    <>
      <nav class="nav_breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">Talleres</li>
        </ol>
      </nav>
      <section class="lista_talleres">{lista_talleres(talleres)}</section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Lista de talleres",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
