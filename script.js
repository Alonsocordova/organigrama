  function init() {
  const $ = go.GraphObject.make; // abreviación para simplificar el código

  // Crear el diagrama con un TreeLayout para la organización automática
  const myDiagram = $(go.Diagram, "myDiagramDiv", {
    layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 }), // TreeLayout organiza los nodos jerárquicamente
    "undoManager.isEnabled": true,  // habilita la función de deshacer/rehacer
    isReadOnly: true,               // hace el diagrama de solo lectura (no se puede modificar)
  });

  // Definir cómo serán los nodos del organigrama
  myDiagram.nodeTemplate = $(
    go.Node, "Auto",
   {click: showNodePopup},
    $(go.Shape, "RoundedRectangle", {
        fill: "lightblue",
        stroke: "black"
      }
    ),
    $(go.TextBlock, { margin: 10 },
      new go.Binding("text", "name")) // Binding para mostrar el nombre del nodo
  );

  // Definir los enlaces entre los nodos
  myDiagram.linkTemplate = $(
    go.Link,
    $(go.Shape),
    $(go.Shape, { toArrow: "OpenTriangle" })
  );

		// Crear el modelo de datos
		myDiagram.model = new go.TreeModel([
		  { key: 1, name: "Alcaldia" },
		  { key: 1.1, parent: 1, name: "Dpto. de Comunicaciones y relaciones publicas" },
		  { key: 1.11, parent: 1.1, name: "1.11" },
		  { key: 1.12, parent: 1.11, name: "1.12" },
		  { key: 1.13, parent: 1.12, name: "1.13" },
		  { key: 1.14, parent: 1.13, name: "1.14" },
		  { key: 1.2, parent: 1, name: "Gabinete" },
		  { key: 2, parent: 1, name: "Administracion" },
		  { key: 2.1, parent: 2, name: "Informatica" },
		  { key: 3, parent: 2, name: "3" },
		  { key: 3.1, parent: 3, name: "nombre" },
		  { key: 3.2, parent: 3.1, name: "nombre" },
		  { key: 3.3, parent: 3.2, name: "nombre" },
		  { key: 3.4, parent: 3.3, name: "nombre" },
		  { key: 4, parent: 2, name: "4" },
		  { key: 4.1, parent: 4, name: "nombre" },
		  { key: 4.2, parent: 4.1, name: "nombre" },
		  { key: 4.3, parent: 4.2, name: "nombre" },
		  { key: 5, parent: 2, name: "5" },
		  { key: 5.1, parent: 5, name: "nombre" },
		  { key: 6, parent: 2, name: "6" },
		  { key: 6.1, parent: 6, name: "nombre" },
		  { key: 7, parent: 2, name: "7" },
		  { key: 7.1, parent: 7, name: "nombre" },
		  { key: 7.11, parent: 7.1, name: "nombre" },
		  { key: 7.12, parent: 7.11, name: "nombre" },
		  { key: 7.13, parent: 7.12, name: "nombre" },
		  { key: 7.2, parent: 7, name: "nombre" },
		  { key: 7.3, parent: 7, name: "nombre" },
		  { key: 7.31, parent: 7.3, name: "nombre" },
		  { key: 7.32, parent: 7.31, name: "nombre" },
		  { key: 7.4, parent: 7, name: "nombre" },
		  { key: 7.5, parent: 7, name: "nombre" },
		  { key: 7.51, parent: 7.5, name: "nombre" },
		  { key: 7.52, parent: 7.51, name: "nombre" },
		  { key: 7.53, parent: 7.52, name: "nombre" },
		  { key: 7.54, parent: 7.53, name: "nombre" },
		  { key: 8, parent: 2, name: "8" },
		  { key: 8.1, parent: 8, name: "nombre" },
		  { key: 8.2, parent: 8.1, name: "nombre" },
		  { key: 8.3, parent: 8.2, name: "nombre" },
		  { key: 8.4, parent: 8.3, name: "nombre" },
		  { key: 9, parent: 2, name: "9" },
		  { key: 9.1, parent: 9, name: "nombre" },
		  { key: 9.2, parent: 9.1, name: "nombre" },
		  { key: 9.3, parent: 9.2, name: "nombre" },
		  { key: 10, parent: 2, name: "10" },
		  { key: 10.1, parent: 10, name: "nombre" },
		  { key: 10.11, parent: 10.1, name: "nombre" },
		  { key: 10.12, parent: 10.11, name: "nombre" },
		  { key: 10.13, parent: 10.12, name: "nombre" },
		  { key: 10.2, parent: 10, name: "nombre" },
		  { key: 10.21, parent: 10.2, name: "nombre" },
		  { key: 10.211, parent: 10.21, name: "nombre" },
		  { key: 10.212, parent: 10.211, name: "nombre" },
		  { key: 10.213, parent: 10.212, name: "nombre" },
		  { key: 10.214, parent: 10.213, name: "nombre" },
		  { key: 10.215, parent: 10.214, name: "nombre" },
		  { key: 10.216, parent: 10.215, name: "nombre" },
		  { key: 10.3, parent: 10, name: "nombre" },
		  { key: 10.31, parent: 10.3, name: "nombre" },
		  { key: 10.4, parent: 10, name: "nombre" },
		  { key: 10.42, parent: 10.4, name: "nombre" },
		  { key: 10.5, parent: 10, name: "nombre" },
		  { key: 10.51, parent: 10.5, name: "nombre" },
		  { key: 10.511, parent: 10.51, name: "nombre" },
		  { key: 10.512, parent: 10.511, name: "nombre" },
		  { key: 10.513, parent: 10.512, name: "nombre" },
		  { key: 10.514, parent: 10.512, name: "nombre" },
		  { key: 10.52, parent: 10.5, name: "nombre" },
		  { key: 10.53, parent: 10.5, name: "nombre" },
		  { key: 10.6, parent: 10, name: "nombre" },
		  { key: 10.61, parent: 10.6, name: "nombre" },
		  { key: 10.62, parent: 10.61, name: "nombre" },
		  { key: 10.63, parent: 10.62, name: "nombre" },
		  { key: 10.64, parent: 10.63, name: "nombre" },
		  { key: 10.7, parent: 10, name: "nombre" },
		  { key: 10.71, parent: 10.7, name: "nombre" },
		  { key: 11, parent: 2, name: "11" },
		  { key: 11.1, parent: 11, name: "nombre" },
		  { key: 11.2, parent: 11, name: "nombre" },
		  { key: 11.3, parent: 11, name: "nombre" },
		  { key: 11.31, parent: 11.3, name: "nombre" },
		  { key: 11.32, parent: 11.31, name: "nombre" },
		  { key: 11.33, parent: 11.32, name: "nombre" },
		  { key: 12, parent: 2, name: "12" },
		  { key: 12.1, parent: 12, name: "nombre" },
		  { key: 12.2, parent: 12.1, name: "nombre" },
		  { key: 13, parent: 2, name: "13" },
		  { key: 13.1, parent: 13, name: "nombre" },
		  { key: 14, parent: 2, name: "14" },
		  { key: 14.1, parent: 14, name: "nombre" },
		  { key: 14.2, parent: 14.1, name: "nombre" }
		  
		  
		]);
	  }
// Función para mostrar el popup al hacer clic en un nodo
function showNodePopup(e, node) {
  const popup = document.getElementById("myPopup");
  const overlay = document.getElementById("overlay");
  const popupContent = document.getElementById("popupContent");
  
  // Actualizar el contenido del modal con la información del nodo
  popupContent.innerHTML = `<h3>${node.data.name}</h3><p>Información adicional del nodo</p>`;
  
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