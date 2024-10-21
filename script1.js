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

		  // Nivel 1 (Raíz)
		  { key: 1, name: "Alcaldía", level: 1},
		  
		  // Nivel 2
		  { key: 1.1, parent: 1, name: "Dpto. de Comunicaciones y Relaciones Publicas", level: 2 },
		  { key: 2, parent: 1, name: "Administracion Municipal", level: 2 },
		  { key: 1.2, parent: 1, name: "Gabinete", level: 2 },
		  
		  // Nivel 3 (Subdependencias de Dpto. de Comunicaciones y Relaciones Públicas)
		  { key: 1.11, parent: 1.1, name: "Unidad de Gestion e Imagen Corporativa", level: 4 },
		  { key: 1.12, parent: 1.11, name: "Unidad de Prensa", level: 5 },
		  { key: 1.13, parent: 1.12, name: "Unidad de Eventos", level: 5 },
		  { key: 1.14, parent: 1.13, name: "Unidad de Informaciones", level: 6 },

		  // Nivel 3 (Subdependencias de Administración Municipal)
		  { key: 2.1, parent: 2, name: "Dpto. de Informatica", level: 3 },
		  { key: 3, parent: 2, name: "Secretaria Municipal", level: 3 },
		  { key: 4, parent: 2, name: "Secretaria Comunal de Planificacion", level: 3 },
		  { key: 5, parent: 2, name: "Direccion de Asesoria Juridica", level: 3 },
		  { key: 6, parent: 2, name: "Direccion de Control", level: 3 },
		  { key: 7, parent: 2, name: "Direccion de Administracion y Finanzas", level: 3 },
		  { key: 8, parent: 2, name: "Direccion de Obras", level: 3 },
		  { key: 9, parent: 2, name: "Direccion de Transito y Transporte Publico", level: 3 },
		  { key: 10, parent: 2, name: "Direccion de Desarrollo Comunitario", level: 3, loc: "0 1000" },
		  { key: 11, parent: 2, name: "Direccion de Medio Ambiente, Aseo y Areas Verdes", level: 3 },
		  { key: 12, parent: 2, name: "Direccion de Operaciones y Servicio a la Comunidad", level: 3 },
		  { key: 13, parent: 2, name: "Direccion de Servicios Traspasados", level: 3 },
		  { key: 14, parent: 2, name: "Direccion de Seguridad Publica", level: 3 },

		  // Nivel 4 (Subdependencias de Secretaria Municipal)
		  { key: 3.1, parent: 3, name: "Dpto. de Decretos y Resoluciones", level: 4 },
		  { key: 3.2, parent: 3.1, name: "Seccion Secretaria de Concejo", level: 5 },
		  { key: 3.3, parent: 3.2, name: "Oficina de Partes, Reclamos y Archivo", level: 6 },
		  { key: 3.4, parent: 3.3, name: "Seccion de Registro Publico de Organizaciones Sociales", level: 7 },

		  // Nivel 4 (Subdependencias de Secretaria Comunal de Planificación)
		  { key: 4.1, parent: 4, name: "Dpto. de Asesoria Urbana y Estudios", level: 4 },
		  { key: 4.2, parent: 4.1, name: "Dpto. de Planificacion Presupuestaria y Licitaciones", level: 5 },
		  { key: 4.3, parent: 4.2, name: "Dpto. de Proyectos", level: 6 },

		  // Nivel 4 (Subdependencias de Dirección de Asesoría Jurídica)
		  { key: 5.1, parent: 5, name: "Transparencia", level: 4 },

		  // Nivel 4 (Subdependencias de Dirección de Control)
		  { key: 6.1, parent: 6, name: "Dpto. de Auditoria", level: 4 },

		  // Nivel 4 (Subdependencias de Dirección de Administración y Finanzas)
		  { key: 7.1, parent: 7, name: "Dpto. de Presupuesto y Contabilidad", level: 4 },
		  { key: 7.11, parent: 7.1, name: "Seccion Tesoreria", level: 5 },
		  { key: 7.12, parent: 7.11, name: "Seccion Cobranza", level: 6 },
		  { key: 7.13, parent: 7.12, name: "Seccion Inventarios", level: 7 },
		  { key: 7.2, parent: 7, name: "Dpto. de Aprovisionamiento", level: 4 },
		  { key: 7.3, parent: 7, name: "Dpto. de Personal", level: 4 },
		  { key: 7.31, parent: 7.3, name: "Seccion Recursos Humanos", level: 5 },
		  { key: 7.32, parent: 7.31, name: "Seccion Remuneraciones", level: 6 },
		  { key: 7.4, parent: 7, name: "Dpto. de Bienestar", level: 4 },
		  { key: 7.5, parent: 7, name: "Subdireccion de Rentas Municipales", level: 4 },
		  { key: 7.51, parent: 7.5, name: "Dpto. de Patentes Municipales", level: 5 },
		  { key: 7.52, parent: 7.51, name: "Dpto. de Fiscalizacion", level: 6 },
		  { key: 7.53, parent: 7.52, name: "Seccion de Cobranzas Administrativas", level: 7 },
		  { key: 7.54, parent: 7.53, name: "Convenio SII", level: 8 },

		  // Nivel 4 (Subdependencias de Dirección de Obras)
		  { key: 8.1, parent: 8, name: "Dpto. de Edificacion y Archivo", level: 4 },
		  { key: 8.2, parent: 8.1, name: "Dpto. de Construccion e Inspeccion Tecnica", level: 5 },
		  { key: 8.3, parent: 8.2, name: "Dpto. de Urbanismo", level: 6 },
		  { key: 8.4, parent: 8.3, name: "Dpto. de Ingenieria Electrica, Alumbrado Publico y Proyectos", level: 7 },

		  // Nivel 4 (Subdependencias de Dirección de Tránsito y Transporte Público)
		  { key: 9.1, parent: 9, name: "Dpto. de Licencias de Conducir", level: 4 },
		  { key: 9.2, parent: 9.1, name: "Dpto. de Ingenieria y Estudios", level: 5 },
		  { key: 9.3, parent: 9.2, name: "Dpto. de Permisos de Circulacion", level: 6 },

		  // Nivel 4 (Subdependencias de Dirección de Desarrollo Comunitario)
		  { key: 10.1, parent: 10, name: "Subdireccion de Gestion y Familia", level: 4 },
		  { key: 10.11, parent: 10.1, name: "Dpto. de Programas Externos", level: 5 },
		  { key: 10.12, parent: 10.11, name: "Dpto. de Juventud y Niñez", level: 6 },
		  { key: 10.13, parent: 10.12, name: "Dpto. de la Mujer", level: 7 },
		  { key: 10.2, parent: 10, name: "Subdireccion Social", level: 4 },
		  { key: 10.21, parent: 10.2, name: "Dpto. Tecnico Social", level: 5 },
		  { key: 10.211, parent: 10.21, name: "Seccion Tecnico Social", level: 6 },
		  { key: 10.212, parent: 10.211, name: "Seccion de Estratificacion Social", level: 7 },
		  { key: 10.213, parent: 10.212, name: "Seccion de Migracion", level: 8 },
		  { key: 10.214, parent: 10.213, name: "Oficina de Inclusion de Personas con Discapacidad", level: 9 },
		  { key: 10.215, parent: 10.214, name: "Oficina de Prestaciones Monetarias", level: 10 },
		  { key: 10.216, parent: 10.215, name: "Oficina de Orientacion y Derivacion Legal", level: 11 },
		  { key: 10.3, parent: 10, name: "Subdireccion de Gestion Comunitaria", level: 4 },
		  { key: 10.31, parent: 10.3, name: "Unidad de Apoyo de Organizaciones", level: 5 },
		  { key: 10.4, parent: 10, name: "Subdireccion de Personas Mayores", level: 4 },
		  { key: 10.42, parent: 10.4, name: "Oficina de Personas Mayores", level: 5 },
		  { key: 10.5, parent: 10, name: "Subdireccion de Cultura", level: 4 },
		  { key: 10.51, parent: 10.5, name: "Seccion Gestion Cultural", level: 5 },
		  { key: 10.511, parent: 10.51, name: "Patrimonio", level: 6 },
		  { key: 10.512, parent: 10.511, name: "Formacion", level: 7 },
		  { key: 10.513, parent: 10.512, name: "Programacion", level: 8 },
		  { key: 10.514, parent: 10.512, name: "Pueblos Originarios", level: 8 },
		  { key: 10.52, parent: 10.5, name: "Participacion y Proyectos", level: 5 },
		  { key: 10.53, parent: 10.5, name: "Biblioteca", level: 5 },
		  { key: 10.6, parent: 10, name: "Subdireccion de Desarrollo Local", level: 4 },
		  { key: 10.61, parent: 10.6, name: "Seccion de OMIL", level: 5 },
		  { key: 10.62, parent: 10.61, name: "Seccion de Turismo", level: 6 },
		  { key: 10.63, parent: 10.62, name: "Seccion de OTEC", level: 7 },
		  { key: 10.64, parent: 10.63, name: "Seccion de Fomento Productivo", level: 8 },
		  { key: 10.7, parent: 10, name: "Subdireccion de Gestion del Riesgo de Desastre", level: 4 },
		  { key: 10.71, parent: 10.7, name: "Dpto. de Emergencia Social", level: 5 },

		  // Nivel 4 (Subdependencias de Dirección de Medio Ambiente, Aseo y Áreas Verdes)
		  { key: 11.1, parent: 11, name: "Dpto. de Areas Verdes", level: 4 },
		  { key: 11.2, parent: 11, name: "Dpto. de Medio Ambiente", level: 4 },
		  { key: 11.3, parent: 11, name: "Dpto. Servicios Municipales", level: 4 },
		  { key: 11.31, parent: 11.3, name: "Seccion de Aseo Comunal", level: 5 },
		  { key: 11.32, parent: 11.31, name: "Seccion Mantencion de Dependencias Municipales", level: 6 },
		  { key: 11.33, parent: 11.32, name: "Seccion Mantencion de Vehiculos", level: 7 },

		  // Nivel 4 (Subdependencias de Dirección de Operaciones y Servicio a la Comunidad)
		  { key: 12.1, parent: 12, name: "Dpto. de Servicios Generales", level: 4 },
		  { key: 12.2, parent: 12.1, name: "Servicio de Guardia Interna", level: 5 },

		  // Nivel 4 (Subdependencias de Dirección de Servicios Traspasados)
		  { key: 13.1, parent: 13, name: "Dpto. de Educacion Municipal", level: 4 },

		  // Nivel 4 (Subdependencias de Dirección de Seguridad Pública)
		  { key: 14.1, parent: 14, name: "Dpto. de Servicios Generales", level: 4 },
		  { key: 14.2, parent: 14.1, name: "Servicio de Guardia Interna", level: 5 }

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
