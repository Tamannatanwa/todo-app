const todo = require("../model/todo")

const addTodo = async (req,res)=>{
    try{
        const {name} = req.body;

        if(!name){
            res.status(400).json({
                msg:"name is requied"
            })
        } 

        const exist = await todo.findOne({name})
        if (exist){
            res.status(400).json({
                msg:"Already exists"
            })
        }

        const addTAsk = await todo.create({name})

        return res.status(201).json({
            msg:"Todo Task Created Successfully !",
            data:addTAsk
        })

    }
    catch(err){
        console.error("Error:", err);
    }
}




const getAllTodo = async (req,res)=>{
    try{
        const allTodo = await todo.find();
        return res.status(200).json({
            msg:"all todo's",
            data : allTodo
        })
    }
    catch(err){
        console.error("Error:", err);
        
    }
}



const getTodoById = async (req,res)=>{
    try{
        const {id} = req.params
        console.log(id)
        const allTodo = await todo.findById({_id:id});
        return res.status(200).json({
            msg:"todo task has been fetched",
            data : allTodo
        })
    }
    catch(err){
        console.error("Error:", err);
        
    }
}



const updateTodoById = async (req,res)=>{
    try{
        const {name} = req.body;
        const {id} = req.params
        const allTodo = await todo.updateOne({_id:id},{$set:{name:name}});
        return res.status(200).json({
            msg:"todo task has bee updated successfully !",
            data : allTodo
        })

    }
    catch(err){
        console.error("Error:", err);
        
    }
}



const deleteTodoById = async (req,res)=>{
    try{
        const {id} = req.params
        const allTodo = await todo.deleteOne({_id:id});
        return res.status(200).json({
            msg:"todo task has bee deleted successfully !",
            data : allTodo
        })
    }
    catch(err){
        console.error("Error:", err);
        
    }
}

module.exports = {addTodo,getAllTodo ,getTodoById ,updateTodoById ,deleteTodoById}