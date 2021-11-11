const Task_List = require('../../models/Task_List');
exports.getTask = async (data) => {
  try {
    const { taskID } = data;
    const findTask = await Task_List.findById(taskID);
    if (!findTask) {
      return {
        success: false,
        error: 'Task does not exist!',
      };
    }
    return {
      success: true,
      taskData: findTask,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
exports.getTaskByClubID = async (data) => {
  try {
    const { clubID } = data;
    const findTasks = await Task_List.find({ clubID });
    if (!findTasks) {
      return {
        success: false,
        error: 'No tasks found!',
      };
    }
    return {
      success: true,
      taskData: findTasks,
    };
  } catch (error) {
    return {
      success: false,
      error,
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
    return { success: true, taskData: taskInserted };
  } 
  catch (error) {
    throw new Error(error)
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
      };
    }
    const taskUpdated = await Task_List.findByIdAndUpdate(
      taskID,
      dataToUpdate,
      { new: true }
    );
    return { success: true, taskData: taskUpdated };
  } catch (error) {
    return {
      success: false,
      error,
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
      };
    }
    const taskDeleted = await Task_List.findByIdAndDelete(taskID);
    return { success: true, taskData: taskDeleted };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
exports.deleteTaskByClubID = async (data) => {
  try {
    const { clubID } = data;
    const tasksDeleted = await Task_List.deleteMany({ clubID });
    return { success: true, taskData: tasksDeleted };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
