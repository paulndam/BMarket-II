import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 2,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isSeller: {
      type: Boolean,
      default: false,
      required: true,
    },
    seller:{
      name:String,
      logo:String,
      description:String,
      rating:{type:Number,default:0,required:true},
      reviews:{type:Number,default:0,required:true}
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", UserSchema);

export default Users;
