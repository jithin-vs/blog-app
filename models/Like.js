import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Blog', 'Comment']
  },
  author: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    profilePic: {
      type: String,
      default:process.env.PROFILE_PATH,
    },
    name: {
      type: String,
      required: true,
    },
  }
}, { timestamps: true });

const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

export default Like;
