const mongoose = require('mongoose')
const { Schema } = mongoose



const FilesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    info: [{
        autor: {
            type: String,
        },
        date: {
            type: Date, default: Date.now
        },
        link: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        }
    }],
})
module.exports = mongoose.model('files', FilesSchema)