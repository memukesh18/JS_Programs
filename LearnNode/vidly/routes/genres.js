const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'},
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with given ID was not found');
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const course = genres.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).send('The genre with given ID was not found');
    }

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);

    // Update course
    course.name = req.body.name;

    // Return the updated course
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = genres.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The genre with given ID was not found');

    const index = genres.indexOf(course);
    genres.splice(index, 1);

    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;