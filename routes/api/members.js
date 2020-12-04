const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

// Get Single Member
router.get("/:id",(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member=>member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({ msg:'Member Not founda' });
    }
});

// Get a All Members
router.get("/",(req,res)=>{
    res.json(members); 
});

// Create Member
router.post('/',(req,res) => {
    const newMember = {
        ...req.body,
        id: uuid.v4(),
        status: "active"
    };
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:"Please include name and email"});
    }
    members.push(newMember)
    // res.redirect('/');
    res.json(members);
}
);

// Update Member
router.put("/:id",(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updMember = req.body;
        members.forEach(member=>{
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name? updMember.name: member.name;
                member.email = updMember.email? updMember.email: member.email;

                res.json({msg:'Member updated',member:member});
            }
        })
    }else{
        res.status(400).json({ msg:'Member Not found' });
    }
});

// Delete Member
router.delete("/:id",(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({msg:'Member Deleted',member:members.filter(member=>member.id !== parseInt(req.params.id))});
    }else{
        res.status(400).json({ msg:'Member Not founda' });
    }
});

module.exports = router;