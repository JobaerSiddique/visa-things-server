import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isActive:{
        type: Boolean,
        default: true,

    },
    isBlocked:{
        type: String,
        enum: ['block', 'access'],
        default:'access'
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    phone:{
        type:Number,
        require:true,
        match: [/^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/, 'Please fill a valid Bangladeshi phone number']
    }
},{
    timestamps:true
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

export const User = mongoose.model('User', UserSchema);