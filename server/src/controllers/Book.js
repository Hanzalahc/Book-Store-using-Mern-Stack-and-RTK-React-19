import Book from "../models/Book.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadImageOnCloudinary,
  deleteImageFromCloudinary,
} from "../utils/cloudinary.js";
import Joi from "joi";

export const createBook = asyncHandler(async (req, res, next) => {
  const userData = req.user;

  if (userData.role !== "admin") {
    return next(new apiError(403, "unauthorized Request"));
  }

  const { error } = validateBook(req.body);

  if (error) {
    return next(new apiError(400, error.details[0].message));
  }

  const { title, description, category, trending, image, oldPrice, newPrice } =
    req.body;

  const existingBook = await Book.findOne({ title });

  if (existingBook) {
    return next(new apiError(409, "Book already exists with this title"));
  }

  const formattedBook = {
    title: title.trim().replace(/\s+/g, " "),
    description: description.trim().replace(/\s+/g, " "),
    category: category.trim().replace(/\s+/g, " "),
    trending,
    image,
    oldPrice,
    newPrice,
  };

  const book = await Book.create(formattedBook);

  if (!book) {
    return next(new apiError(500, "Something went wrong while creating book"));
  }

  return res.status(201).json({
    success: true,
    message: "Book created successfully!",
    data: book,
  });
});

export const getAllBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();

  if (books.length === 0) {
    return next(new apiError(404, "Books not found or no books available"));
  }

  if (!books) {
    return next(new apiError(500, "Something went wrong while fetching books"));
  }

  return res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    count: books.length,
    data: books,
  });
});

export const getSingleBook = asyncHandler(async (req, res, next) => {
  const bookId = req.params.id;

  if (!bookId) {
    return next(new apiError(400, "Book id is required"));
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return next(new apiError(404, "Book not found"));
  }

  return res.status(200).json({
    success: true,
    message: "Book fetched successfully",
    data: book,
  });
});

export const updateBook = asyncHandler(async (req, res, next) => {
  const userData = req.user;

  if (userData.role !== "admin") {
    return next(new apiError(403, "unauthorized Request"));
  }

  const bookId = req.params.id;

  if (!bookId) {
    return next(new apiError(400, "Book id is required"));
  }

  const { error } = validateBook(req.body);

  if (error) {
    return next(new apiError(400, error.details[0].message));
  }

  const { title, description, category, trending, image, oldPrice, newPrice } =
    req.body;

  const findedBook = await Book.findById(bookId);

  if (!findedBook) {
    return next(new apiError(404, "Book not found"));
  }

  if (
    title.trim().replace(/\s+/g, " ") === findedBook.title &&
    description.trim().replace(/\s+/g, " ") === findedBook.description &&
    category === findedBook.category &&
    trending === findedBook.trending &&
    image.url === findedBook.image.url &&
    image.publicId === findedBook.image.publicId &&
    oldPrice === findedBook.oldPrice &&
    newPrice === findedBook.newPrice
  ) {
    return next(new apiError(400, "No changes found"));
  }

  // delete image from cloudinary if image is changed
  if (findedBook?.image?.publicId !== image.publicId) {
    const cloudinaryDeleteResult = await deleteImageFromCloudinary(
      findedBook?.image?.publicId
    );
    if (!cloudinaryDeleteResult) {
      return next(
        new apiError(
          500,
          `Failed to delete image with ID: ${findedBook.image.publicId} from Cloudinary`
        )
      );
    }
    // now upload the new image on cloudinary
    const cloudinaryUploadResult = await uploadImageOnCloudinary(image.url);
    if (!cloudinaryUploadResult) {
      return next(
        new apiError(500, "Failed to upload image on Cloudinary, try again")
      );
    }

    image.url = cloudinaryUploadResult.secure_url;
    image.publicId = cloudinaryUploadResult.public_id;
  }

  const formattedBook = {
    title: title.trim().replace(/\s+/g, " "),
    description: description.trim().replace(/\s+/g, " "),
    category: category,
    trending,
    image,
    oldPrice,
    newPrice,
  };

  const book = await Book.findByIdAndUpdate(bookId, formattedBook, {
    new: true,
  });

  if (!book) {
    return next(new apiError(500, "Something went wrong while updating book"));
  }

  return res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

export const deleteBook = asyncHandler(async (req, res, next) => {
  const userData = req.user;

  if (userData.role !== "admin") {
    return next(new apiError(403, "unauthorized Request"));
  }

  const { title } = req.body;
  const bookId = req.params.id;

  if (!bookId) {
    return next(new apiError(400, "Book id is required"));
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return next(new apiError(404, "Book not found"));
  }

  // remove image from cloudinary
  if (book?.image?.publicId) {
    const cloudinaryDeleteResult = await deleteImageFromCloudinary(
      book?.image?.publicId
    );
    if (!cloudinaryDeleteResult) {
      return next(
        new apiError(
          500,
          `Failed to delete image with ID: ${image.publicId} from Cloudinary`
        )
      );
    }
  }

  const deletedBook = await Book.findByIdAndDelete(bookId);

  if (!deletedBook) {
    return next(new apiError(500, "Something went wrong while deleting book"));
  }

  return res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});

const validateBook = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(80).required(),
    description: Joi.string().min(10).required(),
    category: Joi.string().required(),
    trending: Joi.boolean(),
    image: Joi.object({
      url: Joi.string().uri().required(),
      publicId: Joi.string().required(),
    }).required(),
    oldPrice: Joi.number().required(),
    newPrice: Joi.number().required(),
  });

  return schema.validate(data);
};
