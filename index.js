const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
//const data = require('./data'); 

//mongoose.connect('mongodb://127.0.0.1:27017/searchfilter');

mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0.ozvxjgk.mongodb.net/?retryWrites=true&w=majority');  


//console.log(data)

mongoose.set('strictQuery', false)
app.use(express.static('public')); 
app.use(express.json());


// User model
const User = mongoose.model('User', {
    name: { type: String },
    age: { type: Number }, 
    city: { type:String }
});

/*

User.insertMany([
    { id: 1, name: 'Alan Wake', age: 21, city: 'New York' },
    { id: 2, name: 'Steve Rogers', age: 106, city: 'Chicago' },
    { id: 3, name: 'Tom Hanks', age: 47, city: 'Detroit' },
    { id: 4, name: 'Ryan Burns', age: 16, city: 'New York' },
    { id: 5, name: 'Jack Ryan', age: 31, city: 'New York' },
    { id: 6, name: 'Clark Kent', age: 34, city: 'Metropolis' },
    { id: 7, name: 'Bruce Wayne', age: 21, city: 'Gotham' },
    { id: 8, name: 'Tim Drake', age: 21, city: 'Gotham' },
    { id: 9, name: 'Jimmy Olsen', age: 21, city: 'Metropolis' },
    { id: 10, name: 'Ryan Burns', age: 21, city: 'New York' },
]).then(function () {
    console.log("Data inserted")  // Success
}).catch(function (error) {
    console.log(error)      // Failure
});

*/


app.use('/search', async (req, res, next) => {
    const users = await User.find({});

    if (Object.keys(req.query).length === 0) {
        console.log('no query string, send db data without filtering...')
        return res.status(200).json({ users })
    } else {
        const filters = req.query;
        console.log(req.query)
        const filteredUsers = users.filter((u) => {
            return u.name == req.query.name || u.age == req.query.age || u.city == req.query.city
        })
        console.log(filteredUsers); 
        /*

        const filteredUsers = users.filter(user => {
            //let isValid = true;
            for (key in filters) {
                console.log(key, user[key], filters[key]);
                //isValid = isValid && user[key] == filters[key];
                return user[key] == filters[key]
            }
            //return isValid;
        });
        console.log(filteredUsers)
        return res.status(200).json({ filteredUsers })
        */
        return res.status(200).json({ "msg": "hi", filteredUsers}); 
        
    }

});


app.listen('3000', function () {
    console.log('server up and running')
})
