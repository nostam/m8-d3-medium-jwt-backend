const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    headLine: { type: String, required: true },
    subHead: "string",
    content: { type: String, required: true },
    category: {
      name: "string",
      img: "string",
    },
    author: [{ type: Schema.Types.ObjectId, ref: "users" }],
    cover: "string",
    reviews: [
      { text: { type: String }, user: { type: String } },
      //{ timestamps: true },
    ],
  },
  { timestamps: true }
);

ArticleSchema.static(
  "getReviewByReviewId",
  async function (articleId, reviewId) {
    const reviews = await this.findById(articleId, {
      _id: 0,
      reviews: { $elemMatch: { _id: reviewId } },
    });
    return reviews.reviews[0];
  }
);

const ArticleModel = model("articles", ArticleSchema);
module.exports = ArticleModel;
