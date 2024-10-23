const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        _id: true,
        timestamps: true
    }
);

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);