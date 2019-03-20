const express = require('express');
const app = express();
const volunteers = require('./volunteersRoutes/volunteersRoutes');
const leaders = require('./leadersRoutes/leadersRoutes');
const board = require('./boardRoutes/boardRoutes');
//const Joi = require('joi');
app.use(express.json());
app.use('/IEEE/Volunteers/',volunteers);
app.use('/IEEE/Leaders/',leaders);
app.use('/IEEE/Board/',board);

/* const Volunteers = [
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
           role:'boradMember',
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
           role:'boradMember',
           roleId:1
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
            roleId:101
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
];
 */

app.get('/' , (req,res) =>{
    res.send('Welcome to IEEE site!');
});

app.listen(8080,()=>console.log('waiting for a request....'));