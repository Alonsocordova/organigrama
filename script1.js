import departamentos from './arreglodptos.js'
function init() {
  const $ = go.GraphObject.make; // abreviación para simplificar el código

  // Crear el diagrama con un TreeLayout para la organización automática
  const myDiagram = $(go.Diagram, "myDiagramDiv", {
    layout: $(go.TreeLayout, { angle: 90, layerSpacing: 50,  nodeSpacing: 20}), // TreeLayout organiza los nodos jerárquicamente
    "undoManager.isEnabled": true,  // habilita la función de deshacer/rehacer
    isReadOnly: true,               // hace el diagrama de solo lectura (no se puede modificar)
    scale: 0.45,
	contentAlignment: go.Spot.Center,
	
  });
  // Definir cómo serán los nodos del organigrama
  myDiagram.nodeTemplate = $(
    go.Node, "Auto",
    { click: showNodePopup }, // Evento para mostrar el popup al hacer clic en un nodo

     $(go.Shape, 
      new go.Binding("figure", "", function(data) {
        return data.key === 1 ? "Diamond" : "RoundedRectangle"; // Cambiar la forma solo para el nodo con key 1
      }, ),
	  new go.Binding("fill", "level", getNodeColor),  // Cambia el color según el nivel
      { stroke: "black" }
    ),
	

    $(go.TextBlock, {
        margin: 12,
        wrap: go.TextBlock.WrapDesiredSize, // Ajuste de texto (Text Wrapping)
        width: 165,                         // Ancho fijo para el nodo
        textAlign: "center",                // Centrar el texto horizontalmente
        verticalAlignment: go.Spot.Center,  // Centrar el texto verticalmente
        editable: false,                    // El texto no es editable
        stroke: "black",
		minSize: new go.Size(NaN, 50)
      },
	   // Binding para cambiar el tamaño de la fuente del nodo padre
	  new go.Binding("font", "", function(data) {
      return data.key === 1 ? "bold 25pt sans-serif" : "bold 15pt sans-serif"; // Tamaño mayor para el nodo padre
      }),
      new go.Binding("text", "name")), // Binding para mostrar el nombre del nodo
  );

  // Definir los enlaces entre los nodos con enlaces perpendiculares
  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape),
    //$(go.Shape, { toArrow: "OpenTriangle" })
  );

	// Crear el modelo de datos
	myDiagram.model = new go.TreeModel([

		   { key: 1, name: "Alcaldía", level: 1, img: "img/alcaldia", descripcion: "" },

		  { key: 1.1, parent: 1, name: "COSOC", level: 2, img: "img/cosoc", descripcion: "" },
		  { key: 1.2, parent: 1, name: "Juzgado de Policía Local", level: 2, img: "img/juzgadodepolicialocal", descripcion: "" },
		  { key: 1.3, parent: 1, name: "Informática", level: 2, img: "img/informatica", descripcion: "" },
		  { key: 1.4, parent: 1, name: "Administración Municipal", level: 2, img: "img/administracionmunicipal", descripcion: "" },
		  
		  { key: 1.5, parent: 1, name: "Consejo Municipal", level: 2, img: "img/consejomunicipal", descripcion: "" },
		  { key: 1.6, parent: 1, name: "Gabinete", level: 2, img: "img/gabinete", descripcion: "" },
		  { key: 1.7, parent: 1, name: "RRPP", level: 2, img: "img/rrpp", descripcion: "" },
		  { key: 1.8, parent: 1, name: "Comité Técnico Administrativo", level: 2, img: "img/comitetecnicoadministrativo", descripcion: "" },

		  { key: 2, parent: 1.4, name: "Secretaría Municipal", level: 3, img: "img/secretariamunicipal", descripcion: "" },
		  { key: 2.1, parent: 2, name: "Depto. Decretos", level: 4, img: "img/deptodecretos", descripcion: "" },
		  { key: 2.2, parent: 2.1, name: "Secretaría de Concejo", level: 4, img: "img/secretariadeconcejo", descripcion: "" },
		  { key: 2.3, parent: 2.2, name: "Oficina de Partes", level: 4, img: "img/oficinadepartes", descripcion: "" },

		  { key: 3, parent: 1.4, name: "Dirección de Control", level: 3, img: "img/direcciondecontrol", descripcion: "" },
		  { key: 3.1, parent: 3, name: "Depto. Auditoría", level: 4, img: "img/deptoauditoria", descripcion: "" },

		  { key: 4, parent: 1.4, name: "Dirección Asesoría Jurídica", level: 3, img: "img/direccionasesoriajuridica", descripcion: "" },
		  { key: 4.1, parent: 4, name: "Transparencia", level: 4, img: "img/transparencia", descripcion: "" },

		  { key: 5, parent: 1.4, name: "Dirección de Adm. y Finanzas", level: 3, img: "img/direcciondeadmfinanzas", descripcion: "" },
		  { key: 5.1, parent: 5, name: "Sección de Rentas", level: 4, img: "img/seccionderentas", descripcion: "" },
		  { key: 5.2, parent: 5.1, name: "Depto. Bienestar", level: 4, img: "img/deptobienestar", descripcion: "" },
		  { key: 5.3, parent: 5.2, name: "Presupuestos y Contabilidad", level: 4, img: "img/presupuestosycontabilidad", descripcion: "" },
		  { key: 5.4, parent: 5.3, name: "Estudios Financieros y Estadísticas", level: 4, img: "img/estudiosfinancierosyestadisticas", descripcion: "" },
		  { key: 5.5, parent: 5.4, name: "Aprovisionamiento", level: 4, img: "img/aprovisionamiento", descripcion: "" },
		  { key: 5.6, parent: 5.5, name: "Depto. Personal", level: 4, img: "img/deptopersonal", descripcion: "" },

		  { key: 6, parent: 1.4, name: "Sec. Comunal de Planificación", level: 3, img: "img/seccomunaldeplanificacion", descripcion: "" },
		  { key: 6.1, parent: 6, name: "Asesoría Urbana", level: 4, img: "img/asesoriaurbana", descripcion: "" },
		  { key: 6.2, parent: 6.1, name: "Proyectos y Planificación", level: 4, img: "img/proyectosyplanificacion", descripcion: "" },

		  { key: 7, parent: 1.4, name: "Dirección de Obras", level: 3, img: "img/direcciondeobras", descripcion: "" },
		  { key: 7.1, parent: 7, name: "Edificación y Archivo", level: 4, img: "img/edificacionyarchivo", descripcion: "" },
		  { key: 7.2, parent: 7.1, name: "Depto. Construcción y Fiscalización Técnica", level: 4, img: "img/deptoconstruccionyfiscalizaciontecnica", descripcion: "" },
		  { key: 7.3, parent: 7.2, name: "Alumbrado Público", level: 4, img: "img/alumbradopublico", descripcion: "" },
		  { key: 7.4, parent: 7.3, name: "Urbanismo", level: 4, img: "img/urbanismo", descripcion: "" },

		  { key: 8, parent: 1.4, name: "Dirección de Desarrollo Comunitario", level: 3, img: "img/direcciondesarrollocomunitario", descripcion: "" },
		  { key: 8.1, parent: 8, name: "Depto. Social", level: 4, img: "img/deptosocial", descripcion: "" },
		  { key: 8.2, parent: 8.1, name: "Depto. Gestión Comunitaria", level: 4, img: "img/deptogestioncomunitaria", descripcion: "" },
		  { key: 8.3, parent: 8.2, name: "Depto. Desarrollo Económico Local", level: 4, img: "img/deptodesarrolloeconomicolocal", descripcion: "" },
		  { key: 8.4, parent: 8.3, name: "Cultura", level: 4, img: "img/cultura", descripcion: "" },
		  { key: 8.5, parent: 8.4, name: "Depto. de la Mujer", level: 4, img: "img/deptodelamujer", descripcion: "" },
		  { key: 8.6, parent: 8.5, name: "Depto. Riesgos de Desastres", level: 4, img: "img/deptoriesgosdesastres", descripcion: "" },

		  { key: 9, parent: 1.4, name: "Dirección de Servicios Traspasados", level: 3, img: "img/direccionserviciostraspasados", descripcion: "" },
		  { key: 9.1, parent: 9, name: "Depto. de Educación Municipal", level: 4, img: "img/deptoeducacionmunicipal", descripcion: "" },
		  { key: 9.2, parent: 9.1, name: "COSAM", level: 4, img: "img/cosam", descripcion: "" },

		  { key: 10, parent: 1.4, name: "Dirección de Operación y Servicios a la Comunidad", level: 3, img: "img/direccionoperacionyserviciosalacomunidad", descripcion: "" },
		  { key: 10.1, parent: 10, name: "Depto. de Servicios Generales", level: 4, img: "img/deptoserviciosgenerales", descripcion: "" },
		  { key: 10.2, parent: 10.1, name: "Servicio de Guardia Interna", level: 4, img: "img/serviciodeguardiainterna", descripcion: "" },
		  { key: 10.3, parent: 10.2, name: "Depto. de Emergencia", level: 4, img: "img/deptodeemergencia", descripcion: "" },
		  { key: 10.4, parent: 10.3, name: "OIRS", level: 4, img: "img/oirs", descripcion: "" },

		  { key: 11, parent: 1.4, name: "Dirección de Medio Ambiente y Áreas Verdes", level: 3, img: "img/direcciondemedioambienteyareasverdes", descripcion: "" },
		  { key: 11.1, parent: 11, name: "Depto. de Servicios Municipales", level: 4, img: "img/deptoserviciosmunicipales", descripcion: "" },
		  { key: 11.2, parent: 11.1, name: "Depto. Medio Ambiente", level: 4, img: "img/deptomedioambiente", descripcion: "" },
		  { key: 11.3, parent: 11.2, name: "Depto. Áreas Verdes", level: 4, img: "img/deptoareasverdes", descripcion: "" },

		  { key: 12, parent: 1.4, name: "Dirección de Tránsito y Transporte Público", level: 3, img: "img/direcciondetransitoytransportepublico", descripcion: "" },
		  { key: 12.1, parent: 12, name: "Depto. Permisos de Circulación", level: 4, img: "img/deptopermisosdecirculacion", descripcion: "" },
		  { key: 12.2, parent: 12.1, name: "Depto. Ingeniería y Estudios", level: 4, img: "img/deptoingenieriayestudios", descripcion: "" },
		  { key: 12.3, parent: 12.2, name: "Depto. Licencias de Conducir", level: 4, img: "img/deptolicenciasdeconducir", descripcion: "" },

		  { key: 13, parent: 1.4, name: "Dirección de Seguridad Pública", level: 3, img: "img/direcciondeseguridadpublica", descripcion: "" }

		]);
	  }
// Función para mostrar el popup al hacer clic en un nodo
function showNodePopup(e, node) {
  const popup = document.getElementById("myPopup");
  const overlay = document.getElementById("overlay");
  const popupContent = document.getElementById("popupContent");

  const depto = departamentos.find(depto => depto.key === node.data.key);
  // Actualizar el contenido del modal con la información del nodo
  if (depto) {
    popupContent.innerHTML = `
	
	<h3 style="color: #4CAF50;">${node.data.name}</h3>
	
	<img src="img/images.png" >
	
	<p >${depto.descripcion}</p>
	
	`
  } else {
    popupContent.innerHTML = `<h3>${node.data.name}</h3><p>Descripción no encontrada</p>`;
  }
  
  // Mostrar el popup y el overlay
  popup.style.display = "block";
  overlay.style.display = "block";
}

// Función para cerrar el popup
function closePopup() {
  const popup = document.getElementById("myPopup");
  const overlay = document.getElementById("overlay");

  popup.style.display = "none";
  overlay.style.display = "none";
}

// Añadir eventos para cerrar el popup
document.getElementById("closePopup").addEventListener("click", closePopup);
document.getElementById("overlay").addEventListener("click", closePopup);

// Inicializar el diagrama
window.addEventListener('DOMContentLoaded', init);

// Función para obtener color por nivel
function getNodeColor(level) {
  switch(level) {
    case 1: return "#4CAF50"; // Verde para nivel 1
    case 2: return "#2196F3"; // Azul para nivel 2
    case 3: return "#FFC107"; // Amarillo para nivel 3
    case 4: return "#FF5722"; // Naranja para nivel 4
    default: return "#51D8FA"; // Gris para otros niveles
  }
}
