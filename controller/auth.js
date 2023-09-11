const Profile = require('../model/profile')

const {StatusCodes} = require('http-status-codes')
const { ConflictError, BadRequestError } = require('../error')
const searchUser = async(req, res) => {
    const {slack_name, track } = req.query
    const queryObject = {}
    if(slack_name) {
        queryObject.slack_name = {$regex: slack_name, $options: 'i'}
    }
    if(track) {
        queryObject.track = track
    }
    if(!this.current_day) {
        const current_date = new Date()
        const options = { weekday: 'long'}
        this.current_day = current_date.toLocaleDateString('en-US', options)
       }
    if(!this.utc_time) {
        const current_date = new Date();
        this.utc_time = current_date.toISOString().split('.')[0] + 'Z'
            /*this.utc_time = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000).toISOString().split('.')[0] + 'Z'
        console.log(this.utc_time)*/
       }

    const result = Profile.findOne(queryObject)
    const slack = await result.select('slack_name track github_file_url github_repo_url status_code')

    const response = {
        slack_name: slack.slack_name,
        track: slack.track,
        github_file_url: slack.github_file_url,
        github_repo_url: slack.github_repo_url,
        status_code : slack.status_code,
        current_day: this.current_day,
        utc_time: this.utc_time
    }

    res.status(StatusCodes.OK).json(response)
}
const createUser = async(req, res) => {
    const {slack_name/*track, github_file_url, github_repo_url*/ } = req.body
    const userAlreadyExists = await Profile.findOne({slack_name})
    if(!userAlreadyExists) {
        const user = await Profile.create(req.body)
        res.status(StatusCodes.CREATED).json({user})
    } else {
        throw new ConflictError('Name already Exists')
    }
}

module.exports = {
    searchUser,
    createUser
}