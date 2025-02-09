const socket = io();

document.addEventListener("DOMContentLoaded", () => {

    socket.on("notification", (notificacion) => {
        Swal.fire(
            { title: notificacion }
        );
    })

    socket.on("productsDataRefresh", (products) => {

        document.getElementById("productsRealTimeContainer").innerHTML = ``;
        products.forEach(product => {

            document.getElementById("productsRealTimeContainer").innerHTML += `
    <div class="p-4 border rounded bg-white flex justify-between">
        <div class="flex-1">
            <h3 class="text-lg font-semibold">${product.title}</h3>
            <p class="text-sm text-gray-600">${product.description}</p>
            <p><span class="font-bold">Código:</span> ${product.code}</p>
            <p><span class="font-bold">Precio:</span> $${product.price}</p>
            <p><span class="font-bold">Stock:</span> ${product.stock}</p>
            <p><span class="font-bold">Categoría:</span> ${product.category}</p>
            <p><span class="font-bold">Estado:</span> ${product.status ? 'Disponible' : 'No disponible'}</p>

            <button class="mt-4 bg-red-500 text-white px-4 py-2 rounded deleteProductBtn" data-id="${product.id}">
                Eliminar
            </button>
        </div>
        <div class="ml-4 flex-shrink-0">
            ${product.thumbnails && product.thumbnails.length > 0 ?
                    product.thumbnails.map(thumbnail => `
                    <img src="img/${thumbnail}" class="w-48 h-48 object-cover rounded-lg mb-2" alt="${product.title}">
                `).join('')
                    : '<p>No hay imágenes disponibles</p>'}
        </div>
    </div>
`;

        });

    });



    document.getElementById("productsRealTimeContainer").addEventListener("click", (event) => {

        event.preventDefault();

        if (event.target && event.target.classList.contains("deleteProductBtn")) {
            const idProduct = event.target.getAttribute("data-id");

            socket.emit("deleteQuery", idProduct);
        }
    });


    document.getElementById("newProductForm").addEventListener("submit", async (event) => {


        event.preventDefault();

        const product = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            code: document.getElementById("code").value,
            price: document.getElementById("price").value,
            stock: document.getElementById("stock").value,
            category: document.getElementById("category").value

        }

        socket.emit("postQuery", product);

    });;


});

