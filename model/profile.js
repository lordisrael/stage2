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
    utc_time: Date,
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
    const currentDate = new Date()
    const formattedDate = new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate(),
          currentDate.getUTCHours(),
          currentDate.getUTCMinutes(),
          currentDate.getUTCSeconds()
        )
      ).toISOString();
    this.utc_time = formattedDate.slice(0, 5) + "Z"
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