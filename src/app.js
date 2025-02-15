import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js"
import realTimeProducts from "./routes/realTimeProductsRouter.js"
import { engine } from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";

const app = express();

const PORT = 8080;

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));



app.engine('handlebars', engine());

app.set('view engine', 'handlebars');

app.set('views', './views');




app.use(express.json());


const productManager = new ProductManager;


app.get("/", async (req, res) => {

    const products = await productManager.getProducts();

    res.render("home", { products });

})


io.on("connection", async (socket) => {
    console.log(socket.id + " conectado!")

    const productsQuery = () => productManager.getProducts();

    socket.emit("productsDataRefresh", (productsQuery()))

    socket.on("deleteQuery", (id) => {

        try {
            productManager.deleteProduct(parseInt(id));

            io.emit("productsDataRefresh", (productsQuery()));

            socket.emit("notification", ("Eliminado con Exito!"));
        } catch (error) {
            socket.emit("notification", (error.message))
        }

    });

    socket.on("postQuery", (product) => {

        try {
            if(!product.title, !product.description, !product.code, !product.price, !product.stock, !product.category) {
                throw new Error("Campos incompletos!")
            }

            productManager.addProduct(product.title, product.description, product.code, product.price, product.stock, product.category);

            io.emit("productsDataRefresh", (productsQuery()));

            socket.emit("notification", ("Producto creado con Exito!"));
        } catch (error) {
            socket.emit("notification", ("Error " + error))
        }
    })

})


app.use("/", realTimeProducts);

app.use("/api/products/", productsRouter);

app.use("/api/carts/", cartsRouter)

server.listen(PORT, () => {
    console.log(`Servidor alojado en http://localhost:${PORT}`)
})