import React from "react";
import "./App.css";

class Task extends React.Component {
    render() {
        return (
            <div className="task">
                {this.props.task}
            </div>
        )
    }
}

class TaskList extends React.Component {
    render() {
        const taskList = this.props.tasks.map((task, index) => {
            const taskDesc = '#' + (index + 1) + ": " + task;
            return (
                <div key={index}>
                    {taskDesc}
                </div>
            )
        })

        return (
            <div>{taskList}</div>
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
        newTasks.push(this.state.taskData);
        this.setState({
            tasks: newTasks,
            taskData: '',
        })
    }

    render() {
        return (
            <div>
                <TaskList tasks={this.state.tasks}></TaskList>
                <form>
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
