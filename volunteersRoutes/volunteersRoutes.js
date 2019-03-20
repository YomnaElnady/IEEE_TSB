const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Volunteers = [
    {
        name:'Asmaa',
        id:1,
        age:21,
        joinDate: '1/2/2017',
        skills: ['PR','Organization'],
        position:
        {
            role:'Leader',
            roleId:10
        },
        committee: 'PR'
    },
    {
        name:'Aya',
        id:2,
        age:20,
        joinDate: '15/2/2016',
        skills: ['Design','Leadership'],
        position:
        {
            role:'Leader',
            roleId:20
        },
        committee:'Media'
    },

    {
        name:'Aalaa',
        id:3,
        age:22,
        joinDate: '14/2/2018',
        skills: ['Design'],
        position:
        {
            role:'Volunteer',
            roleId:100
        },
        committee: 'Media'
    },
    {
        name:'Toqa',
        id:4,
        age:23,
        joinDate: '1/2/2014',
        skills: ['Persuasion','Public Speaking'],
        position:
        {
           role:'boardMember',
           roleId:1
        },
        committee:'HR'
    },
    {
        name:'Esraa',
        id:5,
        age:23,
        joinDate: '1/2/2014',
        skills: ['Persuasion','Public Speaking','Management'],
        position:
        {
           role:'boardMember',
           roleId:2
        },
        committee:'PR'
    },
    { 
        name:'Hagar',
        id:6,
        age:24,
        joinDate: '1/2/2016',
        skills: ['PR','Communication'],
        position:
        {
            role:'Volunteer',
            roleId:200
        },
        committee: 'PR'
    }
]

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
        const sorted = Volunteers.sort((a, b) => (a.name > b.name) ? 1 : -1);
        res.send(sorted);
    }
    if(req.query.sortBy === "'des'"){
        const sorted = Volunteers.sort((a, b) => (a.name < b.name) ? 1 : -1);
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
    const Volunteer = Volunteers.find(v=>v.id===parseInt(req.params.id));
    if(!Volunteer){
        res.status(404).send('This Volunteer is not exist');
        return;
    }
    if(Volunteer.position.role==="Leader"){
        const leader = Leaders.find(v=>v.id===Volunteer.position.roleId);
        const totalInfo = {
            asVolunteer:Volunteer,
            asLeader:leader
        };
        res.send(totalInfo);
        return;
    }
    if(Volunteer.position.role==="boardMember"){
        const board = Board.find(v=>v.id===Volunteer.position.roleId);
        const totalInfo = {
            asVolunteer:Volunteer,
            asBoard:board
        };
        res.send(totalInfo);
        return;
    }
    res.send(Volunteer);
});

// post a new volunteer
router.post('/',(req,res)=>{
/*     const schema =
    {
        name:Joi.string().min(3).required(),
        age:Joi.number().required(),
        skills:Joi.array().required(),
        position:Joi.object().required(),
        committee:Joi.string().required()
    };

    const result = Joi.validate(req.body,schema);
    console.log(result);
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    } */
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); 
    let year = today.getFullYear();
    today = month + '/' + day + '/' + year;

    if(Volunteers.find(v=>v.name===req.body.name)){
        res.send('This volunteer is already exists..');
        return;
    }
    const newVolunteer ={
        name:req.body.name,
        id:(Volunteers.length+1)*100,
        age:req.body.age,
        joinDate:req.body.joinDate,
        skills:req.body.skills,
        position:req.body.position,
        committee:req.body.committee
    };
    if(req.body.joinDate===''){
        newVolunteer.joinDate =today;
    };
    Volunteers.push(newVolunteer);
    res.send(newVolunteer);
});

// update volunteer
router.put('/:id',(req,res)=>{
    const Volunteer = Volunteers.find(v=>v.id===parseInt(req.params.id));
    if(!Volunteer){
        res.status(404).send('This volunteer is not exist..');
        return;
    }
    Volunteer.name = req.body.name;
    res.send(Volunteer);
});

// delete volunteer
router.delete('/:id',(req,res)=>{
    const Volunteer = Volunteers.find(v=>v.id===parseInt(req.params.id));
    if(!Volunteer){
        res.status(404).send('This volunteer is not exist..');
        return;
    }
    const index = Volunteers.indexOf(Volunteer);
    Volunteers.splice(index,1);
    res.send(Volunteer);
});


module.exports = router;