const moment = require('moment');
const Recording = require('../models/recordings.models');

exports.getFiles = async (req, res) => {
    try {
        const recordings = await Recording.find({}).sort({ uploadedTime: 'desc'}).exec();
        return res.json({
            status: 200,
            message: 'Success',
            data: recordings.map((item) => {
                return {
                    fileName: item.fileName,
                    duration: item.duration,
                    uploadedTime: item.uploadedTime,
                }
            }),
        });
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error',
            errors: [
                {
                    error: error.message,
                }
            ]
        });
    }
} 

exports.uploadFiles = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.json({
                status: 400,
                message: 'No file uploaded'
            });
        }
        if (!req.files.file.mimetype.includes('audio')){
            return res.json({
                status: 400,
                message: 'Only audio files are accepted',
            });
        }

        const recording = new Recording({
            fileName: req.files.file.name,
            duration: req.body.duration,
            uploadedTime: moment().utc().unix(),
            fileContent: req.files.file,
        });
        const doc = await recording.save()
        return res.json({
            status: 200,
            message: 'Success',
            data: doc.id,
        });
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error',
            errors: [
                {
                    error: error.message,
                }
            ]
        });
    }
}