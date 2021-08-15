const express = require('express');
const router = express.Router();

//mongo schema
const Todo = require('../model/TodoSchema')


router.get('/' , async (req , res) => {
    const todo = await Todo.find().sort({"_id": -1})
    res.render('index' , {
        todo : todo,
    })
})

router.post('/add/todo' , async (req , res) => {
    const todo = await req.body.todo
    const content = await req.body.content;
    try{
        const newTodo = new Todo({
            todo : todo,
            content : content
        });
        newTodo.save();
        res.redirect('/')
    }catch(error){
        console.log(error);
    }
})

//edit
router.get('/todo/:id' , async (req , res) => {
    try{
        let todo = await Todo.findByIdAndDelete(req.params.id);
        res.render('edit' , {todo : todo})
    }catch(error){
        console.log(error);
    }
})


//delete 
router.delete('/delete/:id' , async (req , res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.redirect('/')
    }catch(error){
        console.log(error)
    }

})



module.exports = router;