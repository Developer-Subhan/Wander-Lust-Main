const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
    category: Joi.string()
      .valid("Hotel", "Adventure", "Resort", "Beach-Related", "Restaurant", "Other")
      .required()
      .messages({
        "any.only": "Invalid category selected.",
        "any.required": "Category is required."
      }),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().trim().min(1).required().messages({
      "string.empty": "Review comment cannot be empty.",
      "string.min": "Review comment must contain at least 1 character.",
      "any.required": "Comment is required.",
    }),
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Rating must be a number.",
      "number.min": "Rating must be at least 1.",
      "number.max": "Rating cannot be more than 5.",
      "any.required": "Rating is required.",
    }),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
