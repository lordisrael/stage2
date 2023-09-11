const { response } = require('express');

const mongoose = require('mongoose')
const axios = require('axios')

const profileSchema = new mongoose.Schema ({
    slack_name : {
        type: String,
        required: true,
        unique: true,
    },
    track: {
        type: String,
        required: true,
        enum: ['design', 'frontend', 'backend',]
    },
    github_file_url: {
        type: String,
        required: true,
    },
    github_repo_url: {
        type: String,
        required: true,
    }, 
    status_code: Number

});

// const updateUtcTime = async function () {
//     this.utc_time = new Date().toISOString().split('.')[0] + 'Z';
//   };


profileSchema.pre('save', async function(next) {
   
   if(!this.status_code) {
    this.status_code = 200
    next()
   }

})

/*profileSchema.pre('save', async function(next) {
    const current_date = new Date();
    this.utc_time = current_date.toISOString()
    next();
})*/

module.exports = mongoose.model('Profile', profileSchema)