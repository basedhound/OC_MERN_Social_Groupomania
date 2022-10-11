const normalizePort = (val) => {
   const port = parseInt(val, 10);
   if (isNaN(port)) {
      return val;
   }
   if (port >= 0) {
      return port;
   }
   return false;
};
export const PORT = normalizePort(process.env.PORT || "3000");

export const errorHandler = (error) => {
   if (error.syscall !== "listen") {
      throw error;
   }
   const address = server.address();
   const bind =
      typeof address === "string" ? "pipe " + address : "port: " + PORT;
   switch (error.code) {
      case "EACCES":
         console.error(bind + " requires elevated privileges.");
         process.exit(1);
         break;
      case "EADDRINUSE":
         console.error(bind + " is already in use.");
         process.exit(1);
         break;
      default:
         throw error;
   }
};

// move to index.js
/* app.on("error", errorHandler);
app.on("listening", () => {
   const address = app.address();
   const bind =
      typeof address === "string" ? "pipe " + address : "port " + PORT;
   console.log("Listening on " + bind);
}); */
