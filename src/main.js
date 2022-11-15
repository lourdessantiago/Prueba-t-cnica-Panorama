const datosHTML = document.querySelector("#unProducto");
const contenedorImagenes = document.querySelector('#contenedorProductos');
const detallesProducto = document.querySelector('#detalles');
const buscador = document.querySelector('#buscador');

let productos = [];
let cargando = true;
let imagenesProductos= [];

const datosApi = async () => {
  try {
    const datosRaw = await fetch("https://gnk.onm.mybluehost.me/products_api/");
    const datos = await datosRaw.json();
    return datos;
  } catch (error) {
    console.error(error);
  }
};

const seleccionProducto =(producto)=>{
  const divProducSeleccion = document.createElement('div');
  const divSeleccion = document.createElement('div');
  const imgSeleccion = document.createElement('img');
  const nombreSeleccion = document.createElement('p');
  const skuSeleccion = document.createElement('p');
  const descSeleccion = document.createElement('p');
  const precioSeleccion = document.createElement('p');

  divProducSeleccion.classList.add('divProducSeleccion');
  divSeleccion.classList.add('divSeleccion');
  imgSeleccion.classList.add('imgSeleccion');
  nombreSeleccion.classList.add('desc-nombreSeleccion');
  skuSeleccion.classList.add('desc-skuSeleccion');
  descSeleccion.classList.add('desc-descSeleccion');
  precioSeleccion.classList.add('desc-precioSeleccion');

  imgSeleccion.src = producto.img;
  nombreSeleccion.innerText = producto.title;
  precioSeleccion.innerText = `Precio: $${producto.price}`;
  descSeleccion.innerHTML =  `Descripción: ${producto.description}`;
  skuSeleccion.innerText = `SKU: ${producto.sku}`;
  detallesProducto.innerHTML='';
  divProducSeleccion.append(imgSeleccion, divSeleccion);
  divSeleccion.append(nombreSeleccion, skuSeleccion, descSeleccion, precioSeleccion);
  detallesProducto.append(divProducSeleccion);

}

const buscar = (caracteres='')=>{
  if (caracteres.length > 2 ) {
    console.log(caracteres);
  }


}

buscador.addEventListener('keyup', (e) => {
  buscar(e.target.value)
});

let resultados = ()=>{
  productos.filter((producto)=> {
    return true;
  })

}

((_) => {
 // datosHTML.innerHTML = "Cargando...";
  datosApi().then((resultado) => {
    productos = resultado;
    cargando = false;
    imagenesProductos = productos.map((producto) => {
 
      const divProductos = document.createElement('div')
      const imagenProducto = document.createElement("img");
      const nombreProducto = document.createElement('p');

      divProductos.classList.add('divProductos');
      divProductos.onclick = ()=>seleccionProducto(producto);
      imagenProducto.classList.add('imagenProducto');
      nombreProducto.classList.add('nombreProducto');

      imagenProducto.src = producto.img;
      nombreProducto.innerHTML = producto.title;
      divProductos.append(imagenProducto, nombreProducto);
      contenedorImagenes.appendChild(divProductos);
    
      return imagenesProductos;

    });
  });
})();


