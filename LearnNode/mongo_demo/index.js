const mongoose = require('mongoose');

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

const courseSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 2000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished;},
        min:10,
        max:200,
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Django',
        category: 'Web',
        author: 'Mukesh K',
        tags: ['python', 'frontend'],
        isPublished:true,
        price: 50.85
    });
    
    try{
        const result = await course.save();
        console.log(result);
    }catch(ex){
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

async function getCourses(){
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        //.find({ price: { $gte: 10, $lte: 20 } })
        //.find({price: {$in: [10, 15, 20]}})
        //.find()
        //.or([{ author: 'Mukesh K' }, { isPublished: true }])
        //.and([])
        //.find({ author: /^Mukesh/ })        // starts with 'Mukesh'
        //.find({ author: /K$/i })            // Ends with 'K', i for case insensitive
        //.find({ author: /.*ke.*/ })          // Contains 'Muk' 
        .find({author: 'Mukesh K', isPublished: true})
        //.skip( (pageNumber-1) * pageSize )
        .limit(pageSize)
        .sort({ name: 1})
        //.count();
        .select({ name: 1, tags: 1});

    console.log(courses);
}


/*
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;

    course.isPublished = true;
    course.author = 'Guido van Rossum';

    const result = await course.save();
    console.log(result);
}
*/
/*
async function updateCourse(id){
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Mukesh K',
            isPublished: false
        }
    });

    console.log(result);
}
*/
async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Guido van Rossum',
            isPublished: true
        }
    }, { new: true });

    console.log(course);
}

async function removeCourse(id){
    //const result = await Course.deleteOne({_id: id});
    const result = await Course.findByIdAndDelete(id);
    console.log(result);
}

createCourse();
//getCourses();
//updateCourse('5f7b5f888433b36d49004098');
//removeCourse('5f7b5f888433b36d49004098')


