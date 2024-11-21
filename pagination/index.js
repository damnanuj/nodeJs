import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;

app.use(express.json());

const MONGO_URI = `mongodb+srv://damnanuj:Anujatlas@cluster0.w7mdapr.mongodb.net/pagination`;
// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("db error");
  });

const ItemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", ItemSchema);

// Seed Database 
app.post("/seed", async (req, res) => {
  const items = Array.from({ length: 50 }, (_, i) => ({
    name: `Item ${i + 1}`,
  }));
  await Item.insertMany(items);
  res.send("Database seeded with sample data!");
});

// Pagination API
app.get("/items", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const items = await Item.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await Item.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      totalItems,
      items,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
