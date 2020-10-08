const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB..', err));


const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    });
    
    try{
        const result = await author.save();
        console.log(result);
    }catch(ex){
        console.log(ex.message);
    }
}

async function createCourse(name, author){
    const course = new Course({
        name,
        author
    });
    
    try{
        const result = await course.save();
        console.log(result);
    }catch(ex){
        console.log(ex.message);
    }
    
}

async function listCourses(){
    const courses = await Course
        .find()
        .populate('author', 'name -_id')
        .select('name author');

    console.log(courses);
}

//createAuthor('Mukesh K', 'My bio', 'My Website');
//createCourse('Nodejs', '5f7e788c3fe5db28700b7a08')
listCourses();