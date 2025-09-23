import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Schedules.module.css";
import scheduleIcon from "../../assets/icons/schedule.png";
import Loader from "../../components/Loader/Loader";

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        category: "irrigation"
    });

    const token = localStorage.getItem("verdure_token");

    // Fetch schedules from API
    const fetchSchedules = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/schedules", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSchedules(res.data || []);
        } catch (err) {
            setError("Failed to load schedules. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle adding a new task
    const handleAddTask = async () => {
        try {
            if (!newTask.title || !newTask.description) return;

            await axios.post("/api/schedules", newTask, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh schedules
            await fetchSchedules();
            setNewTask({ title: "", description: "", dueDate: "", priority: "medium", category: "irrigation" });
            setShowAddModal(false);
        } catch (err) {
            setError("Failed to add task. Please try again.");
            console.error(err);
        }
    };

    // Handle completing a task
    const handleCompleteTask = async (taskId) => {
        try {
            await axios.put(`/api/schedules/${taskId}/complete`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchSchedules();
        } catch (err) {
            setError("Failed to complete task. Please try again.");
            console.error(err);
        }
    };

    // Handle deleting a task
    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await axios.delete(`/api/schedules/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchSchedules();
        } catch (err) {
            setError("Failed to delete task. Please try again.");
            console.error(err);
        }
    };

    // Filter tasks based on active category
    const getFilteredTasks = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        switch (activeCategory) {
            case "today":
                return schedules.filter(task => {
                    const taskDate = new Date(task.dueDate);
                    return taskDate >= today && taskDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
                });
            case "week":
                return schedules.filter(task => {
                    const taskDate = new Date(task.dueDate);
                    return taskDate >= today && taskDate <= weekFromNow;
                });
            case "overdue":
                return schedules.filter(task => new Date(task.dueDate) < today && !task.completed);
            default:
                return schedules;
        }
    };

    // Get quick stats
    const getStats = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const todayTasks = schedules.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate >= today && taskDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
        }).length;

        const completedThisWeek = schedules.filter(task => {
            const taskDate = new Date(task.completedAt || task.updatedAt);
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return task.completed && taskDate >= weekAgo;
        }).length;

        const overdueTasks = schedules.filter(task =>
            new Date(task.dueDate) < today && !task.completed
        ).length;

        return { todayTasks, completedThisWeek, overdueTasks };
    };

    useEffect(() => {
        fetchSchedules();
    }, [token]);

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className={styles["schedules-container"]}>
                <div className="error-container">
                    <h3>❌ {error}</h3>
                    <button onClick={fetchSchedules} className="btn btn-primary">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const filteredTasks = getFilteredTasks();
    const stats = getStats();

    return (
        <div className={styles["schedules-container"]}>
            {/* Header */}
            <header className={styles["schedules-header"]}>
                <h1>
                    <img src={scheduleIcon} alt="schedule" />
                    Farm Schedules
                </h1>
                <p>Manage your farming tasks and activities efficiently</p>
                <button
                    className={styles["add-task-btn"]}
                    onClick={() => setShowAddModal(true)}
                >
                    Add New Task
                </button>
            </header>

            {/* Task Categories */}
            <section className={styles["task-categories"]}>
                <div className={styles["category-tabs"]}>
                    <button
                        className={styles["category-tab"] + " " + (activeCategory === "all" ? styles.active : "")}
                        onClick={() => setActiveCategory("all")}
                    >
                        All Tasks
                    </button>
                    <button
                        className={styles["category-tab"] + " " + (activeCategory === "today" ? styles.active : "")}
                        onClick={() => setActiveCategory("today")}
                    >
                        Today
                    </button>
                    <button
                        className={styles["category-tab"] + " " + (activeCategory === "week" ? styles.active : "")}
                        onClick={() => setActiveCategory("week")}
                    >
                        This Week
                    </button>
                    <button
                        className={styles["category-tab"] + " " + (activeCategory === "overdue" ? styles.active : "")}
                        onClick={() => setActiveCategory("overdue")}
                    >
                        Overdue
                    </button>
                </div>
            </section>

            {/* Task List */}
            <section className={styles["task-list"]}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div key={task.id} className={styles["task-item"]}>
                            <div className={styles["task-info"]}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <div className={styles["task-meta"]}>
                                    <span className={styles["task-date"]}>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                    <span className={styles["task-priority"] + " " + styles[task.priority || "medium"]}>
                                        {task.priority || "Medium"} Priority
                                    </span>
                                </div>
                            </div>
                            <div className={styles["task-actions"]}>
                                {!task.completed && (
                                    <button
                                        className={styles["complete-btn"]}
                                        onClick={() => handleCompleteTask(task.id)}
                                    >
                                        Complete
                                    </button>
                                )}
                                <button className={styles["edit-btn"]}>Edit</button>
                                <button
                                    className={styles["delete-btn"]}
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <p>No tasks found for the selected category.</p>
                    </div>
                )}
            </section>

            {/* Quick Stats */}
            <section className={styles["quick-stats"]}>
                <div className={styles["stat-card"]}>
                    <h3>Today's Tasks</h3>
                    <p className={styles["stat-number"]}>{stats.todayTasks}</p>
                </div>
                <div className={styles["stat-card"]}>
                    <h3>Completed This Week</h3>
                    <p className={styles["stat-number"]}>{stats.completedThisWeek}</p>
                </div>
                <div className={styles["stat-card"]}>
                    <h3>Overdue Tasks</h3>
                    <p className={styles["stat-number"]}>{stats.overdueTasks}</p>
                </div>
            </section>

            {/* Add Task Modal */}
            {showAddModal && (
                <div className={styles["modal"]}>
                    <div className={styles["modal-content"]}>
                        <h2>Add New Task</h2>
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Task Description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        />
                        <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <div className={styles["modal-actions"]}>
                            <button onClick={handleAddTask} className="btn btn-primary">Add Task</button>
                            <button onClick={() => setShowAddModal(false)} className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Schedules;
