const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello! Server is running!');
});

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
  
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 4080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
