const express = require('express');
const server = express();
const db = require('./db/database')
//parse
server.use(express.json());


server.get('/' , (req,res) => {
    res.json({
        Status:"hi"
    })
})

//유저 전부 가져오기
server.get('/:user' , (req ,res) =>{
    db.query('select * from user',(err,row,field)=>{
        res.json(row);
    })
})

//해당 유저 가져오기
server.get('/:user/:id' , (req,res) => {
    const id = req.params.id;
    db.query('select * from user where uid = ?' , [id] , (err,row)=>{
        res.json(row);
    })
})

//유저 가입시키기
server.post('/user/join' ,(req,res) => {
    const {uname,uage,uemail,uaddress,upwd} = req.body;
    console.log(`req.body => ${req.body}`);
    db.query('insert into user (uname,uage,uemail,uaddress,upwd) values(?,?,?,?,?)',[uname,uage,uemail,uaddress,upwd],(err,row)=>{
        if(err){
            console.log(`insert user error ${err}`);
        }else{
            console.log(`inserted`);
            res.json(
                {
                    Status:"INSERTED!"
                }
            )
        }
    })
})

// 유저 정보 수정 *******************
// req.params 사용하기!
server.put('/:update/:user/:id',(req,res) => {
    const {id} = req.params;
    const {uname , uage , uemail , uaddress ,upwd} = req.body;
    db.query('update user set uname = ? , uage = ? , uemail = ? , uaddress =? , upwd = ? where uid = ?',[uname,uage,uemail,uaddress,upwd,id],(err,row)=>{
        if(err){
            console(`updated err => ${err}`)
        }else{
            res.json({
                Result:true
            })
        }
    })
})

//해당 유저 삭제
server.delete('/:delete/:user/:id',(req,res)=>{
    const query = 'delete from user where uid = ?';
    const { id } = req.params;
    
    db.query(query,[id],(err,row)=>{
        if(err){
            console.log(`err => ${err}`)
        }else{
            console.log(`delete id => ${id}`)
            res.json({
                Status:"hello"
            })
        }
    })
})



server.listen(3000,(err)=>{
    if(err) console.log(`err => ${err}`);
    else console.log(`server on 3000!!!!!`)
})


