import { EmptyIcon } from "@phosphor-icons/react";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "Complete the React tutorial and build a small project.",
    tags: ["React", "JavaScript"],
    priority: "High",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]);
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

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSearchTask = (text) => {
    const filteredTask = tasks.filter((task) =>
      task.title.toLowerCase().includes(text.toLowerCase())
    );

    setTasks([...filteredTask]);
  };

  const handleDeleteAll = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFavoriteTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    const newTasks = [...tasks];

    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;

    setTasks(newTasks);
  };

  const handleClose = () => {
    setTaskToUpdate(null);
    setShowAddModal(false);
  };

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {/* Add Task Modal */}
        {showAddModal && (
          <AddTaskModal
            onSave={handleAddTask}
            taskToUpdate={taskToUpdate}
            handleClose={handleClose}
          />
        )}

        {/* Search Box */}
        <SearchTask handleSearchTask={handleSearchTask} />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* Task Action */}
          <TaskAction
            handleShowModal={() => setShowAddModal(true)}
            handleDeleteAll={handleDeleteAll}
          />
          {/* Task List */}
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavoriteTask}
            />
          ) : (
            <h1 className="text-2xl flex items-center justify-center gap-2">
              <EmptyIcon />
              No Task Found!
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
