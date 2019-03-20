const Joi = require('joi');
const express = require('express');
const router = express.Router();

const Board = [
    {
        id:1,
        role:'HR Leader',
        tasks:['collecting feedback']
    },
    {
        id:2,
        role:'Vice chairman',
        tasks:['committees follow up']
    }
]



router.get('/',(req,res)=>{
    if(req.query.sortBy == "'asc'"){
        const sorted = Board.sort((a, b) => (a.name > b.name) ? 1 : -1);
        res.send(sorted);
    }
    if(req.query.sortBy === "'des'"){
        const sorted = Board.sort((a, b) => (a.name < b.name) ? 1 : -1);
        res.send(sorted);
    }
    res.send('Error');
});

// getting volunteers by name

// router.get('/:name',(req,res)=>{
//     const Volunteer = Volunteers.find(v=>v.name===req.params.name);
//     console.log(Volunteer);
//     if(!Volunteer){
//         res.status(404).send('This Volunteer is not exist');
//         return;
//     }
//     res.send(Volunteer);
// });

// geeting volunteers by id
router.get('/:id',(req,res)=>{
    const board = Board.find(v=>v.id===parseInt(req.params.id));
    if(!board){
        res.status(404).send('This boardMember is not exist');
        return;
    }
    res.send(board);
});

// post a new volunteer
router.post('/',(req,res)=>{
    const schema =
    {
        role:Joi.string().min(4).required(),
        tasks:Joi.array().required(),
    };

    const result = Joi.validate(req.body,schema);
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };
   
    const newBoard = {
        id:Board.length+1,
        role:req.body.role,
        tasks:req.body.tasks
    };

    Board.push(newBoard);
    res.send(newBoard);
});

// update volunteer
router.put('/:id',(req,res)=>{
    const board = Board.find(v=>v.id===parseInt(req.params.id));
    if(!board){
        res.status(404).send('This boardMember is not exist..');
        return;
    }
    board.tasks.push(req.body.tasks);
    if(req.body.committee){
    board.committee = req.body.committee;}
    res.send(board);
});

// delete volunteer
router.delete('/:id',(req,res)=>{
    const board = Board.find(v=>v.id===parseInt(req.params.id));
    if(!board){
        res.status(404).send('This boardMember is not exist..');
        return;
    }
    const index = Board.indexOf(board);
    Board.splice(index,1);
    res.send(board);
});


module.exports = router;