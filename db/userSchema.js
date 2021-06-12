const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mno: {
        type: Number,
        require: true
    },
    profession: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    messages:[
        {
            date:{
                type:Date
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            mno: {
                type: Number,
                require: true
            },
            message:{
                type:String
            }
        }
    ],

    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]

});

// We are hashing the password 
userSchema.pre("save", async function(next) {

    if(this.isModified("password")){

        this.password = await bcrypt.hash(this.password , 12);

        this.cpassword = await bcrypt.hash(this.cpassword , 12);

    }
    next()
})

// generating token for schema 
userSchema.methods.generateToken = async function() {
    try {
        let token = jwt.sign({ _id:this._id },process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token })
        await this.save();
        return token
    } catch (error) {
        console.log(error)
    }
}

// adding message of user 
userSchema.methods.addMessage = async function( name , email , mno , message , date){
    try {
        this.messages = this.messages.concat({name , email , mno , message , date}) 

        return await this.save();
        
    } catch (error) {
        return res.status(401).json({error:error})
    }
}

//Change Profile.info 
userSchema.methods.ChangePro = async function (name, email , mno, profession) {
    try {
        this.name = name;
        this.email = email;
        this.mno = mno;
        this.profession = profession;

        return await this.save()

    } catch (error) {
        
    }
}


const User = mongoose.model('user', userSchema);   // in model variable first character must be capital 

module.exports = User;      //Creating module of schema model for data insertion process

