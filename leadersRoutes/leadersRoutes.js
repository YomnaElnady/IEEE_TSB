const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Leaders = [
    {
        id:10,
        tasks:['Action plan for the next month'],
        committee: 'PR'
    },
    {
        id:20,
        tasks:['Session preparation'],
        committee:'Media'
    }
]

router.get('/',(req,res)=>{
    if(req.query.sortBy == "'asc'"){
        const sorted = Leaders.sort((a, b) => (a.name > b.name) ? 1 : -1);
        res.send(sorted);
    }
    if(req.query.sortBy === "'des'"){
        const sorted = Leaders.sort((a, b) => (a.name < b.name) ? 1 : -1);
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
    const leader = Leaders.find(v=>v.id===parseInt(req.params.id));
    if(!leader){
        res.status(404).send('This leader is not exist');
        return;
    }
    res.send(leader);
});

// post a new volunteer
router.post('/',(req,res)=>{
    const schema =
    {
        tasks:Joi.array().required(),
        committee:Joi.string().required()
    };

    const result = Joi.validate(req.body,schema);
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const newLeader = {
        id:(Leaders.length+1)*10,
        tasks:req.body.tasks,
        committee:req.body.committee
    }

    Leaders.push(newLeader);
    res.send(newLeader);
});

// update volunteer
router.put('/:id',(req,res)=>{
    const leader = Leaders.find(v=>v.id===parseInt(req.params.id));
    if(!leader){
        res.status(404).send('This leader is not exist..');
        return;
    }
    leader.tasks.push(req.body.tasks);
    if(req.body.committee){
    leader.committee = req.body.committee;}
    res.send(leader);
});

// delete volunteer
router.delete('/:id',(req,res)=>{
    const leader = Leaders.find(v=>v.id===parseInt(req.params.id));
    if(!leader){
        res.status(404).send('This leader is not exist..');
        return;
    }
    const index = Leaders.indexOf(leader);
    Leaders.splice(index,1);
    res.send(leader);
});


module.exports = router;