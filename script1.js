import departamentos from './arreglodptos.js';
import descripciones from './arreglodescr.js';
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
	 
	 new go.Binding("desiredSize", "key", function(key) {
		if (key === 1) { // Si es el nodo Alcaldía
			return new go.Size(255, 150); // Cambiar el tamaño (ancho: 200px, alto: 100px)
		}
	 }),
	 
     $(go.Shape, 
      new go.Binding("figure", "", function(data) {
        return data.key === 1 ? "Diamond"  : "RoundedRectangle"; // Cambiar la forma solo para el nodo con key 1
      }),
	  new go.Binding("fill", "level", getNodeColor), 
	  { stroke: "black"}
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
      new go.Binding("text", "name") // Binding para mostrar el nombre del nodo
	) 
  );

  // Definir los enlaces entre los nodos con enlaces perpendiculares
  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape),
  );

	// Crear el modelo de datos
	myDiagram.model = new go.TreeModel(departamentos);
}
// Función para mostrar el popup al hacer clic en un nodo
function showNodePopup(e, node) {
  const popup = document.getElementById("myPopup");
  const overlay = document.getElementById("overlay");
  const popupContent = document.getElementById("popupContent");

  const desc = descripciones.find(desc => desc.key === node.data.key);
  
  // Actualizar el contenido del modal con la información del nodo
  if (desc) {
    popupContent.innerHTML = `
	  
		<div style="display:flex;" >
			
				<img id ="imgn" src="${node.data.img}">
			<div>  
				<h3>${node.data.name}</h3>
				<h3>${node.data.encargado}</h3>
				<p><strong>Correo:</strong>${node.data.correo}</p>
				<p><strong>Teléfono:</strong>${node.data.telefono}</p>
				<p><strong>Secretaria:</strong>${node.data.secretaria}</p>
			</div>
		</div>
		<p>${desc.descripcion || 'Descripción no disponible.'}</p>
	
	`;
	
	
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
    case 1: return "#3D7FCC"; // Azul saturado para el nivel más alto
    case 2: return "#58A9E5"; // Celeste saturado para el segundo nivel
    case 3: return "#85C4F5"; // Celeste más claro saturado para el tercer nivel
    case 4: return "#E5E7EB"; // Gris suave para el nivel más bajo
  }
}

