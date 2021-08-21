const express = require('express');

var data= [{item: ' buy veggies'}, {item: 'Do assignments'}, {item: 'watch animes'}];

module.exports= (app)=>{

    
    app.get('/todo', (req,res)=>{
        res.render('todo', {todos: data});
    });

    app.post('/todo', (req,res)=>{
        data.push(req.body);
        res.json({todos: data});  //as we are reloading the same page so to match with todo.ejs code
    });

    app.delete('/todo', (req,res)=>{

    });
};