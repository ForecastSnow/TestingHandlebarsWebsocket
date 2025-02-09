document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("newProductForm").addEventListener("submit", async (event) => {


        event.preventDefault();

        const datos = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            code: document.getElementById("code").value,
            price: document.getElementById("price").value,
            stock: document.getElementById("stock").value,
            category: document.getElementById("category").value

        }

        try {
            const response = await fetch("http://localhost:8080/api/products/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            }).then(response => {
                if (response.ok) {
                    location.reload()
                } else {
                    document.getElementById("formContainer").innerHTML += `<p class="text-xl font-bold mb-4 text-red-600">Error al intentar crear el producto</p>`;
                    console.error("Error en la solicitud:", error);
                }
            })

            const resultado = await response.json();
            console.log("Respuesta del servidor:", resultado);
        } catch (error) {
            console.log(error)
        }

    })

    const deleteButtons = document.querySelectorAll(".deleteProductBtn");

    try {
        deleteButtons.forEach((deleteProductBtn) => {
            deleteProductBtn.addEventListener("click", () => {

                const idProduct = deleteProductBtn.getAttribute("data-id");

                fetch(`http://localhost:8080/api/products/${idProduct}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            location.reload()
                        } else {
                            document.getElementById("formContainer").innerHTML += `<p class="text-xl font-bold mb-4 text-red-600">Error al intentar eliminar el producto</p>`;
                            console.error('Error al eliminar el producto');
                        }
                    })
            });
        });
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }


});


