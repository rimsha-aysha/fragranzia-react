require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("./config/cloudinary");
const Product = require("./models/Product");

const connectDb = require("./config/db");

const uploadsFolder = path.join(__dirname, "uploads");

const migrateImages = async () => {
  try {
    // Connect to MongoDB using your existing connection
    await connectDb();

    console.log("MongoDB connected.");

    // Read all files from uploads
    const files = fs.readdirSync(uploadsFolder);

    console.log(`Found ${files.length} files in uploads folder.`);

    for (const file of files) {
      const filePath = path.join(uploadsFolder, file);

      // Skip folders
      if (!fs.statSync(filePath).isFile()) {
        continue;
      }

      // Find the product whose image field contains this filename
      const product = await Product.findOne({
        image: file,
      });

      if (!product) {
        console.log(`No product found for: ${file}`);
        continue;
      }

      // Skip products already using Cloudinary
      if (product.image.startsWith("http")) {
        console.log(`Already using Cloudinary: ${product.name}`);
        continue;
      }

      console.log(`Uploading ${file}...`);

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "fragranzia/products",
      });

      // Replace old filename with Cloudinary URL
      product.image = result.secure_url;

      await product.save();

      console.log(`✓ ${product.name} migrated successfully`);
      console.log(`  Cloudinary URL: ${result.secure_url}`);
    }

    console.log("\n================================");
    console.log("IMAGE MIGRATION COMPLETED");
    console.log("================================");

    process.exit(0);

  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrateImages();