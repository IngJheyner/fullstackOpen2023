import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, minlength: 3 },
    name: String,
    passwordHash: { type: String, minlength: 3 }
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model("User", userSchema);

export default User;