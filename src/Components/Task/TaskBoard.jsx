import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const defaultTasks = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "Complete the React tutorial and build a small project.",
    tags: ["React", "JavaScript"],
    priority: "High",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTasks]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }

          return task;
        })
      );

      setTaskToUpdate(null);
    }

    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {/* Add Task Modal */}
        {showAddModal && (
          <AddTaskModal onSave={handleAddTask} taskToUpdate={taskToUpdate} />
        )}

        {/* Search Box */}
        <SearchTask />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* Task Action */}
          <TaskAction handleShowModal={() => setShowAddModal(true)} />
          {/* Task List */}
          <TaskList tasks={tasks} onEdit={handleEditTask} />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
