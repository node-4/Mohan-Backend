const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  products:[

    {

        product:{

            type:mongoose.Types.ObjectId,
            ref:"Product"
        }
    }

  ],
},{timestamps:true});

module.exports = mongoose.model("Wishlist", wishlistSchema);