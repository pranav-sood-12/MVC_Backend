import { Task } from "../models/task.js"

export const newTask = async (req,res,next)=>{
    try {
        const {title,description} = req.body;

    await Task.create({
        title,
        description,
        user : req.user,
    })

    res.status(201).json({
        success:true,
        message : "task added successfuly",
    })
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req,res,next)=>{
    try {
        const userid=req.user._id;
    

    const tasks = await Task.find({user:userid});

    res.status(200).json({
        success:true,
        tasks,
    })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req,res,next)=>{
    try {
        // const id=req.params.id;
    // const {id} = req.params;
    const tasks = await Task.findById(req.params.id);

    tasks.isCompleted = !tasks.isCompleted;

    if(!tasks) return res.status(404).json({
        message : "invalid id",
        success : false,
    })

    await tasks.save();

    res.status(200).json({
        success:true,
        message : "task updated"
    })
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req,res,next)=>{
    try {
        const {id} = req.params;

    const tasks = await Task.findById(id);
    if(!tasks) return res.status(404).json({
        message : "invalid id",
        success : false,
    })
    await tasks.deleteOne();

    res.status(200).json({
        success:true,
        message : "task deleted"
    })
    } catch (error) {
        next(error)
    }
}