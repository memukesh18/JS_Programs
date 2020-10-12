const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    /*
    author: {
        type: authorSchema,
        required: true
    }
    */
    authors: [authorSchema]
}));


async function createCourse(name, authors){
    const course = new Course({
        name,
        authors
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

/*
async function updateAuthor(courseId){
    const course = await Course.findById(courseId);
    course.author.name = "Mukesh";
    course.save();
}
*/
async function updateAuthor(courseId){
    const course = await Course.updateOne({_id: courseId}, {
        $unset: {
            //'author.name': 'Mukesh Kumar'
            'author': ''
        } 
    });
}

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}



removeAuthor('5f841fa33d5c380f0abd39cc', '5f841fa33d5c380f0abd39cb');

//addAuthor('5f841fa33d5c380f0abd39cc', new Author({ name: 'Ricky B'}));

//updateAuthor('5f7e817c85f2501361742331');

//createAuthor('Mukesh K', 'My bio', 'My Website');

/*
createCourse('Node Course', [
    new Author({name: 'Mukesh K'}),
    new Author({name: 'Sandra B'})
]);
*/

//listCourses();