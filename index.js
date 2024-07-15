const { app } = require("../Group4-Backend/src/shared/shared");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

const userRoutes = require("../Group4-Backend/src/shared/routes/userRoutes");
app.use("/api/user", userRoutes);
