const { response } = require('express');

const mongoose = require('mongoose')
const axios = require('axios')

const profileSchema = new mongoose.Schema ({
    slack_name : {
        type: String,
        required: true,
        unique: true,
    },
    current_day : String,
    utc_time: String,
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

profileSchema.pre('save', async function(next) {
   if(!this.current_day) {
    const current_date = new Date()
    const options = { weekday: 'long'}
    this.current_day = current_date.toLocaleDateString('en-US', options)
   }
   if(!this.utc_time) {
        this.utc_time = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000).toISOString().split('.')[0] + 'Z'
    console.log(this.utc_time)
   }
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