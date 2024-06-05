require("./instrument");

const Sentry = require("@sentry/node");
//const Tracing = require("@sentry/tracing");
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
/*
// Initialize Sentry
Sentry.init({
    dsn: process.env.SENTRY_DSN, // Coloca tu DSN aquí
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });*/

// Usar Sentry para capturar todas las excepciones
//app.use(Sentry.Handlers.requestHandler());
//app.use(Sentry.Handlers.tracingHandler());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((error) => {
    console.log(error);
    Sentry.captureException(error); // Capture MongoDB connection errors
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
  
// Agrega el manejador de errores de Sentry
//app.use(Sentry.Handlers.errorHandler());

// Ruta de ejemplo para verificar que Sentry está funcionando
app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
});

//console.log(Sentry);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
    V1SwaggerDocs(app, process.env.PORT);
});

//module.exports = app;
