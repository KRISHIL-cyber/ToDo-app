const mongoose = require('mongoose');

const DB = "mongodb+srv://tester:test007@test.odevx.mongodb.net/todo?retryWrites=true&w=majority";
mongoose.connect(DB, {useNewUrlParser: true });

var todoSchema= new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);
var itemOne= Todo({item: 'watch animes'}).save(err=>{
    if(err) throw err;
    console.log('Item saved');
});


module.exports= (app)=>{

    
    app.get('/todo', (req,res)=>{
        //get data from mongodb and pass it to view
        Todo.find({}, (err,data)=>{
            if (err) throw err;
            res.render('todo', {todos: data});
        });   
    });

    app.post('/todo', (req,res)=>{
        var newTodo = Todo(req.body).save((err,data)=>{
            if (err) throw err;
            res.json({todos:data}); //as we are reloading the same page so to match with todo.ejs code
        });
    });

    app.delete('/todo/:item', (req,res)=>{
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err,data)=>{
            if (err) throw err;
            res.json({todos: data});
        });
    });
};