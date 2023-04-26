import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: false
	},
	lastName: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},

    password: {
        type: String,
        required: true
    },

	phone: {
		type: Number,
		required: false
	},
	address: {
		type: String,
		required: false
	}, 
    birth: {
        type: Date,
        required:false
    },
    avatar: {
        type: String,
        required: false
    }

})

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model("users", userSchema);

export default userModel;
