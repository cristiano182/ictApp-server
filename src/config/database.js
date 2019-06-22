const mongoose = require('mongoose')


mongoose.connect('mongodb://stark182:stark182@ds054999.mlab.com:54999/ucs_unifesp', {

    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then( db => console.log('DB is connected'))
.catch(err => console.error(err))