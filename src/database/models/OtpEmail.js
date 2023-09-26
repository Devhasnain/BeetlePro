const mongoose = require("mongoose");

const OtpEmailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: function () {
            if (this.isDriver) {
                return 'Driver';
            } else {
                return 'User';
            }
        },
        required: true
    },
    code: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }

);

const OTP_Email = mongoose.models.otp_email || mongoose.model("otp_email", OtpEmailsSchema);
module.exports = OTP_Email;