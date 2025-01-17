import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    trending: {
      type: Boolean,
      default: false,
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    oldPrice: {
      type: Number,
      required: [true, "Old Price is required"],
    },
    newPrice: {
      type: Number,
      required: [true, "New Price is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
