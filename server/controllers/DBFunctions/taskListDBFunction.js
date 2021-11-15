const Task_List = require('../../models/Task_List');
exports.getTask = async (data) => {
  try {
    const { taskID } = data;
    const findTask = await Task_List.findById(taskID);
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
exports.getTasksByClubID = async (data) => {
  try {
    const { clubID } = data;
    const findTasks = await Task_List.find({ clubID });
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
exports.getTasksByCoreMemberID = async (data) => {
  try {
    const { coreMemberID } = data;
    const assignedTo = coreMemberID
    const findTasks = await Task_List.find({ assignedTo });
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
  try {
    const {
      taskTitle,
      taskDescription,
      taskStatus,
      assignedBy,
      assignedTo,
      clubID,
    } = data;
    const task = new Task_List({
      taskTitle,
      taskDescription,
      taskStatus,
      assignedBy,
      assignedTo,
      clubID,
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
exports.updateTask = async (data) => {
  try {
    const dataToUpdate = {};
    for (key in data) {
      if (key !== 'taskID') {
        dataToUpdate[key] = data[key];
      }
    }
    const { taskID } = data;
    const findTask = await Task_List.findById(taskID);
    if (!findTask) {
      return {
        success: false,
        error: 'Task does not exist!',
        code: 400
      };
    }
    const taskUpdated = await Task_List.findByIdAndUpdate(
      taskID,
      dataToUpdate,
      { new: true }
    );
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

exports.deleteTask = async (data) => {
  try {
    const { taskID } = data;
    const findTask = await Task_List.findById(taskID);
    if (!findTask) {
      return {
        success: false,
        error: 'Task does not exist!',
        code: 404
      };
    }
    const taskDeleted = await Task_List.findByIdAndDelete(taskID);
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
exports.deleteTasksByClubID = async (data) => {
  try {
    const { clubID } = data;
    const tasksDeleted = await Task_List.deleteMany({ clubID });
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
exports.deleteTasksByCoreMemberID = async (data) => {
  try {
    const { coreMemberID } = data;
    const assignedTo = coreMemberID
    const tasksDeleted = await Task_List.deleteMany({ assignedTo })
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