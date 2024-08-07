const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const obtenerProductos = async () => {
    let URL = "./db/data.JSON"
    const productoError = () => {Swal.fire({
                                    customClass: {
                                    footer: ''
                                    },
                                    icon: "error",
                                    title: "Oh no !",
                                    text: "No pudimos conectarnos con el servidor. Intentá más tarde",
                                    footer: '<p>Para encargar podes llamarnos al: 343-4111222</p>'
                                  });}

    try{
        let solicitud = await fetch(URL)
        let response = await solicitud.json()

        response.forEach ((product) => {
            let content = document.createElement("div")
            content.className = "card"
            content.innerHTML = `
                <img src=${product.img}>
                <div class="informacion">
                    <p>${product.nombre}</p>
                    <p class="precio">$${product.precio}</p>
                </div>
            `
            shopContent.append(content)

            let comprar = document.createElement("button")
            comprar.innerText = "COMPRAR"
            comprar.className = "comprar"

            content.append(comprar)

            comprar.addEventListener("click", () =>{

            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
            if(repeat){
                carrito.map((prod) =>{
                    if(prod.id === product.id){
                        Toastify({
                            text: "Este producto ya fue agregado. Si desea agregar cantidades vaya al Carrito",
                            className: "info",
                            duration: 2700,
                            style: {
                            background: "linear-gradient(to right, #b0003f, #c93d7b)",
                            }
                        }).showToast();
                    }
                })
            }else{
                carrito.push({
                    id : product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                    })
                Toastify({
                    text: "Producto agregado al carrito",
                    className: "info",
                    duration: 1200,
                    style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }
            carritoCounter()
            saveLocal()
            })
        })
    }catch (err){
        productoError ()
    }
}

obtenerProductos ()

const saveLocal = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


