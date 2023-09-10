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

    const result = await Profile.find(queryObject)
    res.status(StatusCodes.OK).json({result})
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