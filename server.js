const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const ownerRoutes = require("./routes/ownerRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const serviceTypeRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const corsOptions = require("./constants");
dotenv.config();
connectDB();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/owner", ownerRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/service", serviceTypeRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
