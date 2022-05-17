import React from "react";
import "./App.css";

class Task extends React.Component {
    render() {
        return (
            <div className="task">
                <div>
                    {this.props.task}
                </div>
                <button className="removeTask-btn" onClick={() => this.props.onClick(this.props.id)}>Remove Task</button>
            </div>
        )
    }
}

class TaskList extends React.Component {
    render() {
        const taskList = this.props.tasks.map((taskObj) => {
            const taskDesc = '#' + (taskObj.id + 1) + ": " + taskObj.task;
            return (
                <Task key={taskObj.id} id={taskObj.id} task={taskDesc} onClick={(index) => this.props.onClick(index)}></Task>
            )
        })

        return (
            <div className="taskList">
                {taskList}
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            taskData: '',
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    onHandleChange(taskInput) {
        this.setState({
            taskData: taskInput.target.value,
        })
    }

    onHandleSubmit(e) {
        e.preventDefault();
        const newTasks = this.state.tasks.slice();
        newTasks.push({ id: this.state.tasks.length, task: this.state.taskData});
        this.setState({
            tasks: newTasks,
            taskData: '',
        })
    }

    removeTask(i) {
        this.state.tasks.splice(i, 1);
        const newTasks = [];
        this.state.tasks.forEach((taskObj, index) => {
            newTasks.push({ id: index, task: taskObj.task });
        })
        this.setState({
            tasks: newTasks,
        })
    }

    render() {
        return (
            <div>
                <TaskList tasks={this.state.tasks} onClick={(index) => this.removeTask(index)}></TaskList>
                <form className="addTask-form">
                    <input 
                        type="text" 
                        onChange={this.onHandleChange}
                        placeholder="Add A New Task?"
                        value={this.state.taskData}
                    />
                    <button onClick={this.onHandleSubmit} type="submit">
                        Add Task
                    </button>
                </form>
            </div>
        )
    }
}

export default App;
