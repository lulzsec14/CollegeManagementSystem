const Task_List = require('../../models/Task_List');
const { 
  validateCreateTask,
  validateGetTaskById,
  validateTasksByClubId,
  validateTasksByCoreMemberId,
  validateUpdateTask,
  validateDeleteById


} = require("../../Validators/TaskListValidator")
exports.getTask = async (data,session) => {
  try {const validationError = validateGetTaskById(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const { taskId } = data;
    const findTask = await Task_List.findById(taskId).session(session);
    if (!findTask) {
      return {
        success: false,
        code: 404,
        error: 'Task does not exist!',
      };
    }
    return {
      success: true,
      code: 200,
      taskData: findTask,
      message: 'Task found and data returned successfully'

    };
  } 
  catch (error) {
    console.log(error)
    return {
      success: false,
      code: 500,
      error: 'Server Error',
    };
  }
};
exports.getTasksByClubId = async (data,session) => {
  try {const validationError = validateTasksByClubId(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const { clubId } = data;
    const findTasks = await Task_List.find({ clubId }).session(session);
    if (!findTasks) {
      return {
        success: false,
        code: 404,
        error: 'No tasks found belonging to this club!',
      };
    }
    return {
      success: true,
      taskData: findTasks,
      code:200,
      message:'Tasks found successfully and data returned successfully'
    };
  } 
  catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
};
exports.getTasksByCoreMemberId = async (data,session) => {
  try {const validationError = validateTasksByCoreMemberId(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const { coreMemberId } = data;
    const assignedTo = coreMemberId
    const findTasks = await Task_List.find({ assignedTo }).session(session);
    if (!findTasks) {
      return {
        success: false,
        code: 404,
        error: 'No tasks found belonging to this core member!',
      };
    }
    return {
      success: true,
      taskData: findTasks,
      code:200,
      message:'Tasks found successfully and data returned successfully'
    };
  } 
  catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
};
exports.insertTask = async (data,session) => {
  try {const validationError = validateCreateTask(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const {
      taskTitle,
      taskDescription,
      taskStatus,
      assignedTo,
      clubId,
    } = data;
    const task = new Task_List({
      taskTitle,
      taskDescription,
      taskStatus,
      assignedTo,
      clubId,
    });
    const taskInserted = await task.save({session});
    return { success: true, taskData: taskInserted, code:201, message: 'Task inserted successfully' };
  } 
  catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };

  }
};
exports.updateTask = async (data,session) => {
  try {
    const validationError = validateUpdateTask(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const dataToUpdate = data.dataToUpdate
    const { taskId } = data;
    const findTask = await Task_List.findById(taskId).session(session);
    if (!findTask) {
      return {
        success: false,
        error: 'Task does not exist!',
        code: 400
      };
    }
    const taskUpdated = await Task_List.findByIdAndUpdate(
      taskId,
      dataToUpdate,
      { new: true }
    ).session(session);
    return { success: true, taskData: taskUpdated, code:200, message:"Task updated successfully" };
  } 
  catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
};

exports.deleteTask = async (data,session) => {
  try {const validationError = validateDeleteById(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const { taskId } = data;
    const findTask = await Task_List.findById(taskId).session(session);
    if (!findTask) {
      return {
        success: false,
        error: 'Task does not exist!',
        code: 404
      };
    }
    const taskDeleted = await Task_List.findByIdAndDelete(taskId).session(session);
    return { success: true, taskData: taskDeleted, code:200, message:"Task deleted successfully" };
  } 
  catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    }; 
  }
};
exports.deleteTasksByClubId = async (data,session) => {
  try {const validationError = validateTasksByClubId(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const { clubId } = data;
    const tasksDeleted = await Task_List.deleteMany({ clubId }).session(session);
    return { success: true, taskData: tasksDeleted, code:200, message:"Tasks deleted successfully" };
  } 
  catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
};
exports.deleteTasksByCoreMemberId = async (data,session) => {
  try {const validationError = validateTasksByCoreMemberId(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const { coreMemberId } = data;
    const assignedTo = coreMemberId
    const tasksDeleted = await Task_List.deleteMany({ assignedTo }).session(session)
    return { success: true, taskData: tasksDeleted, code:200, message:"Tasks deleted successfully" };
  } 
  catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
};