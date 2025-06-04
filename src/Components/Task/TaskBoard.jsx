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

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
    setShowAddModal(false);
  };

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {/* Add Task Modal */}
        {showAddModal && <AddTaskModal onSave={handleAddTask} />}

        {/* Search Box */}
        <SearchTask />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* Task Action */}
          <TaskAction handleShowModal={() => setShowAddModal(true)} />
          {/* Task List */}
          <TaskList tasks={tasks} />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
