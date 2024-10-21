function init() {
  const $ = go.GraphObject.make; // abreviación para simplificar el código

  // Crear el diagrama con un TreeLayout para la organización automática
  const myDiagram = $(go.Diagram, "myDiagramDiv", {
    layout: $(go.LayeredDigraphLayout, { direction: 90, layerSpacing: 50 }), // Ajustes de espaciado
    "undoManager.isEnabled": true,
    isReadOnly: true,
    scale: 0.55, // Tamaño ajustado
    contentAlignment: go.Spot.Center,
  });

  // Definir cómo serán los nodos del organigrama
  myDiagram.nodeTemplate = $(
    go.Node, "Auto",
    { click: showNodePopup },
    $(
      go.Shape,
      new go.Binding("figure", "", function(data) {
        return data.key === 1 ? "Diamond" : "RoundedRectangle"; // Nodo principal en forma de diamante
      }),
      new go.Binding("fill", "level", getNodeColor), // Colores según nivel
      { stroke: "black", strokeWidth: 2 } // Líneas más gruesas
    ),
    $(
      go.TextBlock, {
        margin: 12,
        wrap: go.TextBlock.WrapDesiredSize, // Ajuste del texto
        width: 165, // Ancho ajustado del nodo
        textAlign: "center",
        verticalAlignment: go.Spot.Center,
        editable: false,
        stroke: "black",
		minSize: new go.Size(NaN, 50)
      },
	   // Binding para cambiar el tamaño de la fuente del nodo padre
	  new go.Binding("font", "", function(data) {
      return data.key === 1 ? "bold 25pt sans-serif" : "bold 15pt sans-serif"; // Tamaño mayor para el nodo padre
      }),
      new go.Binding("text", "name")
    )
  );

  // Definir los enlaces entre los nodos con flechas
  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 10 }, // Bordes más redondeados
    $(go.Shape), // Línea
   
  );

	// Crear el modelo de datos
	myDiagram.model = new go.GraphLinksModel(
  [
    // Nodos
    { key: 1, name: "Alcaldía", level: 1 },
    { key: 1.1, name: "Dpto. de Comunicaciones y Relaciones Publicas", level: 2 },
    { key: 2, name: "Administracion Municipal", level: 2 },
    { key: 1.2, name: "Gabinete", level: 2 },
    { key: 1.11, name: "Unidad de Gestion e Imagen Corporativa", level: 4 },
    { key: 1.12, name: "Unidad de Prensa", level: 5 },
    { key: 1.13, name: "Unidad de Eventos", level: 5 },
    { key: 1.14, name: "Unidad de Informaciones", level: 6 },
    { key: 2.1, name: "Dpto. de Informatica", level: 3 },
    { key: 3, name: "Secretaria Municipal", level: 3 },
    { key: 4, name: "Secretaria Comunal de Planificacion", level: 3 },
    { key: 5, name: "Direccion de Asesoria Juridica", level: 3 },
    { key: 6, name: "Direccion de Control", level: 3 },
    { key: 7, name: "Direccion de Administracion y Finanzas", level: 3 },
    { key: 8, name: "Direccion de Obras", level: 3 },
    { key: 9, name: "Direccion de Transito y Transporte Publico", level: 3 },
    { key: 10, name: "Direccion de Desarrollo Comunitario", level: 3 },
    { key: 11, name: "Direccion de Medio Ambiente, Aseo y Areas Verdes", level: 3 },
    { key: 12, name: "Direccion de Operaciones y Servicio a la Comunidad", level: 3 },
    { key: 13, name: "Direccion de Servicios Traspasados", level: 3 },
    { key: 14, name: "Direccion de Seguridad Publica", level: 3 },
    { key: 3.1, name: "Dpto. de Decretos y Resoluciones", level: 4 },
    { key: 3.2, name: "Seccion Secretaria de Concejo", level: 5 },
    { key: 3.3, name: "Oficina de Partes, Reclamos y Archivo", level: 6 },
    { key: 3.4, name: "Seccion de Registro Publico de Organizaciones Sociales", level: 7 },
    { key: 4.1, name: "Dpto. de Asesoria Urbana y Estudios", level: 4 },
    { key: 4.2, name: "Dpto. de Planificacion Presupuestaria y Licitaciones", level: 5 },
    { key: 4.3, name: "Dpto. de Proyectos", level: 6 },
    { key: 5.1, name: "Transparencia", level: 4 },
    { key: 6.1, name: "Dpto. de Auditoria", level: 4 },
    { key: 7.1, name: "Dpto. de Presupuesto y Contabilidad", level: 4 },
    { key: 7.11, name: "Seccion Tesoreria", level: 5 },
    { key: 7.12, name: "Seccion Cobranza", level: 6 },
    { key: 7.13, name: "Seccion Inventarios", level: 7 },
    { key: 7.2, name: "Dpto. de Aprovisionamiento", level: 4 },
    { key: 7.3, name: "Dpto. de Personal", level: 4 },
    { key: 7.31, name: "Seccion Recursos Humanos", level: 5 },
    { key: 7.32, name: "Seccion Remuneraciones", level: 6 },
    { key: 7.4, name: "Dpto. de Bienestar", level: 4 },
    { key: 7.5, name: "Subdireccion de Rentas Municipales", level: 4 },
    { key: 7.51, name: "Dpto. de Patentes Municipales", level: 5 },
    { key: 7.52, name: "Dpto. de Fiscalizacion", level: 6 },
    { key: 7.53, name: "Seccion de Cobranzas Administrativas", level: 7 },
    { key: 7.54, name: "Convenio SII", level: 8 },
    { key: 8.1, name: "Dpto. de Edificacion y Archivo", level: 4 },
    { key: 8.2, name: "Dpto. de Construccion e Inspeccion Tecnica", level: 5 },
    { key: 8.3, name: "Dpto. de Urbanismo", level: 6 },
    { key: 8.4, name: "Dpto. de Ingenieria Electrica, Alumbrado Publico y Proyectos", level: 7 },
    { key: 9.1, name: "Dpto. de Licencias de Conducir", level: 4 },
    { key: 9.2, name: "Dpto. de Ingenieria y Estudios", level: 5 },
    { key: 9.3, name: "Dpto. de Permisos de Circulacion", level: 6 },
    { key: 10.1, name: "Subdireccion de Gestion y Familia", level: 4 },
    { key: 10.11, name: "Dpto. de Programas Externos", level: 5 },
    { key: 10.12, name: "Dpto. de Juventud y Niñez", level: 6 },
    { key: 10.13, name: "Dpto. de la Mujer", level: 7 },
    { key: 10.2, name: "Subdireccion Social", level: 4 },
    { key: 10.21, name: "Dpto. Tecnico Social", level: 5 },
    { key: 10.211, name: "Seccion Tecnico Social", level: 6 },
    { key: 10.212, name: "Seccion de Estratificacion Social", level: 7 },
    { key: 10.213, name: "Seccion de Migracion", level: 8 },
    { key: 10.214, name: "Oficina de Inclusion de Personas con Discapacidad", level: 9 },
    { key: 10.215, name: "Oficina de Prestaciones Monetarias", level: 10 },
    { key: 10.216, name: "Oficina de Orientacion y Derivacion Legal", level: 11 },
    { key: 10.3, name: "Subdireccion de Gestion Comunitaria", level: 4 },
    { key: 10.31, name: "Unidad de Apoyo de Organizaciones", level: 5 },
    { key: 10.4, name: "Subdireccion de Personas Mayores", level: 4 },
    { key: 10.42, name: "Oficina de Personas Mayores", level: 5 },
    { key: 10.5, name: "Subdireccion de Cultura", level: 4 },
    { key: 10.51, name: "Seccion Gestion Cultural", level: 5 },
    { key: 10.511, name: "Patrimonio", level: 6 },
    { key: 10.512, name: "Formacion", level: 7 },
    { key: 10.513, name: "Programacion", level: 8 },
    { key: 10.514, name: "Pueblos Originarios", level: 8 },
    { key: 10.52, name: "Participacion y Proyectos", level: 5 },
    { key: 10.53, name: "Biblioteca", level: 5 },
    { key: 10.6, name: "Subdireccion de Desarrollo Local", level: 4 },
    { key: 10.61, name: "Seccion de OMIL", level: 5 },
    { key: 10.62, name: "Seccion de Turismo", level: 6 },
    { key: 10.63, name: "Seccion de OTEC", level: 7 },
    { key: 10.64, name: "Seccion de Fomento Productivo", level: 8 },
    { key: 10.7, name: "Subdireccion de Gestion del Riesgo de Desastre", level: 4 },
    { key: 10.71, name: "Dpto. de Emergencia Social", level: 5 },
    { key: 11.1, name: "Dpto. de Areas Verdes", level: 4 },
    { key: 11.2, name: "Dpto. de Medio Ambiente", level: 5 },
    { key: 11.3, name: "Dpto. Servicios Municipales", level: 5 },
    { key: 11.31, name: "Seccion de Aseo Comunal", level: 5 },
    { key: 11.32, name: "Seccion Mantencion de Dependencias Municipales", level: 6 },
    { key: 11.33, name: "Seccion Mantencion de Vehiculos", level: 7 },
    { key: 12.1, name: "Dpto. de Servicios Generales", level: 4 },
    { key: 12.2, name: "Servicio de Guardia Interna", level: 5 },
    { key: 13.1, name: "Dpto. de Educacion Municipal", level: 4 },
    { key: 14.1, name: "Dpto. de Servicios Generales", level: 4 },
    { key: 14.2, name: "Servicio de Guardia Interna", level: 5 }
  ],
  [
    // Enlaces entre nodos
    { from: 1, to: 1.1 },
    { from: 1, to: 2 },
    { from: 1, to: 1.2 },
    { from: 1.1, to: 1.11 },
    { from: 1.11, to: 1.12 },
    { from: 1.12, to: 1.13 },
    { from: 1.13, to: 1.14 },
    { from: 2, to: 2.1 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 2, to: 6 },
    { from: 2, to: 7 },
    { from: 2, to: 8 },
    { from: 2, to: 9 },
    { from: 2, to: 10 },
    { from: 2, to: 11 },
    { from: 2, to: 12 },
    { from: 2, to: 13 },
    { from: 2, to: 14 },
    { from: 3, to: 3.1 },
    { from: 3.1, to: 3.2 },
    { from: 3.2, to: 3.3 },
    { from: 3.3, to: 3.4 },
    { from: 4, to: 4.1 },
    { from: 4.1, to: 4.2 },
    { from: 4.2, to: 4.3 },
    { from: 5, to: 5.1 },
    { from: 6, to: 6.1 },
    { from: 7, to: 7.1 },
    { from: 7.1, to: 7.11 },
    { from: 7.11, to: 7.12 },
    { from: 7.12, to: 7.13 },
    { from: 7, to: 7.2 },
    { from: 7, to: 7.3 },
    { from: 7.3, to: 7.31 },
    { from: 7.31, to: 7.32 },
    { from: 7, to: 7.4 },
    { from: 7, to: 7.5 },
    { from: 7.5, to: 7.51 },
    { from: 7.51, to: 7.52 },
    { from: 7.52, to: 7.53 },
    { from: 7.53, to: 7.54 },
    { from: 8, to: 8.1 },
    { from: 8.1, to: 8.2 },
    { from: 8.2, to: 8.3 },
    { from: 8.3, to: 8.4 },
    { from: 9, to: 9.1 },
    { from: 9.1, to: 9.2 },
    { from: 9.2, to: 9.3 },
    { from: 10, to: 10.1 },
    { from: 10.1, to: 10.11 },
    { from: 10.11, to: 10.12 },
    { from: 10.12, to: 10.13 },
    { from: 10, to: 10.2 },
    { from: 10.2, to: 10.21 },
    { from: 10.21, to: 10.211 },
    { from: 10.211, to: 10.212 },
    { from: 10.212, to: 10.213 },
    { from: 10.213, to: 10.214 },
    { from: 10.214, to: 10.215 },
    { from: 10.215, to: 10.216 },
    { from: 10, to: 10.3 },
    { from: 10.3, to: 10.31 },
    { from: 10, to: 10.4 },
    { from: 10.4, to: 10.42 },
    { from: 10, to: 10.5 },
    { from: 10.5, to: 10.51 },
    { from: 10.51, to: 10.511 },
    { from: 10.511, to: 10.512 },
    { from: 10.512, to: 10.513 },
    { from: 10.512, to: 10.514 },
    { from: 10.5, to: 10.52 },
    { from: 10.5, to: 10.53 },
    { from: 10, to: 10.6 },
    { from: 10.6, to: 10.61 },
    { from: 10.61, to: 10.62 },
    { from: 10.62, to: 10.63 },
    { from: 10.63, to: 10.64 },
    { from: 10, to: 10.7 },
    { from: 10.7, to: 10.71 },
    { from: 11, to: 11.1 },
    { from: 11.1, to: 11.2 },
    { from: 11.2, to: 11.3 },
    { from: 11.3, to: 11.31 },
    { from: 11.31, to: 11.32 },
    { from: 11.32, to: 11.33 },
    { from: 12, to: 12.1 },
    { from: 12.1, to: 12.2 },
    { from: 13, to: 13.1 },
    { from: 14, to: 14.1 },
    { from: 14.1, to: 14.2 }
  ]
);
	  }
// Función para mostrar el popup al hacer clic en un nodo
function getNodeColor(level) {
  switch(level) {
    case 1: return "#4CAF50"; // Verde para nivel 1
    case 2: return "#2196F3"; // Azul para nivel 2
    case 3: return "#FFC107"; // Amarillo para nivel 3
    case 4: return "#FF5722"; // Naranja para nivel 4
    default: return "#51D8FA"; // Gris para otros niveles
  }
}

// Mejorar el popup
function showNodePopup(e, node) {
  const popup = document.getElementById("myPopup");
  const overlay = document.getElementById("overlay");
  const popupContent = document.getElementById("popupContent");

  const depto = departamentos.find(depto => depto.key === node.data.key);
  
  if (depto) {
    popupContent.innerHTML = `
      <h3 style="color: #4CAF50;">${node.data.name}</h3>
      <p style="font-size: 16px; line-height: 1.5;">${depto.descripcion}</p>`;
  } else {
    popupContent.innerHTML = `<h3>${node.data.name}</h3><p>Descripción no encontrada</p>`;
  }

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



