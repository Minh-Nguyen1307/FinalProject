import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Tabs() {
    const [showTab, setShowTab] = useState('tab1');
    const [tasks, setTasks] = useState([]);
    const [enterTask, setEnterTask] = useState('');

    const handleToggleTask = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, isActive: !task.isActive } : task
            )
        );
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const handleDeleteAllCompleted = () => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.isActive));
    };

    const tab2Content = (
        <div>
            
            <ul>
                {tasks.filter(task => task.isActive).map((task) => (
                    <li key={task.id} className="flex items-center mb-2">
                        <div
                            onClick={() => handleToggleTask(task.id)}
                            className={`w-5 h-5 border-2 border-gray-400 mr-2 flex items-center justify-center cursor-pointer ${
                                task.isActive ? '' : 'bg-teal-500'
                            }`}
                        />
                        <span className={`${!task.isActive ? 'line-through text-gray-400' : ''}`}>
                            {task.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );

    const tab3Content = (
        <div>
            
            <ul>
                {tasks.filter(task => !task.isActive).map((task) => (
                    <li key={task.id} className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <div 
                                onClick={() => handleToggleTask(task.id)}
                                className="w-5 h-5 border-2 border-gray-400 mr-2 flex items-center justify-center cursor-pointer bg-teal-500" 
                            />
                            <span className="line-through text-gray-400">{task.name}</span>
                        </div>
                        <button 
                            onClick={() => handleDeleteTask(task.id)} 
                            className="text-red-500"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
            {tasks.some(task => !task.isActive) && (
                <button 
                    onClick={handleDeleteAllCompleted} 
                    className="btn btn-danger"
                >
                    <FontAwesomeIcon icon={faTrash} /> Delete All
                </button>
            )}
        </div>
    );

    const showContent = () => {
        switch (showTab) {
            case 'tab1':
                return (
                    <div>
                        {tab2Content}
                        {tab3Content}
                    </div>
                );
            case 'tab2':
                return <div>{tab2Content}</div>;
            case 'tab3':
                return <div>{tab3Content}</div>;
            default:
                return null;
        }
    };

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        if (enterTask.trim()) {
            setTasks([...tasks, { id: Date.now(), name: enterTask, isActive: true }]);
            setEnterTask('');
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-around border-b-2 text-3xl">
                <div
                    className={`tab ${showTab === 'tab1' ? 'border-b-2 border-blue-500 font-bold' : ''}  cursor-pointer p-4 transition-all`}
                    onClick={() => setShowTab('tab1')}
                >
                    All
                </div>
                <div
                    className={`tab ${showTab === 'tab2' ? 'border-b-2 border-blue-500 font-bold' : ''} cursor-pointer p-4 transition-al`}
                    onClick={() => setShowTab('tab2')}
                >
                    Active
                </div>
                <div
                    className={`tab ${showTab === 'tab3' ? 'border-b-2 border-blue-500 font-bold' : ''}cursor-pointer p-4 transition-al `}
                    onClick={() => setShowTab('tab3')}
                >
                    Completed
                </div>
            </div>
            <div className="content p-4 border border-gray-300">
                {(showTab === 'tab1' || showTab === 'tab2') && (
                    <form className="flex justify-center mt-4" onSubmit={handleTaskSubmit}>
                        <input
                            type="text"
                            value={enterTask}
                            onChange={(e) => setEnterTask(e.target.value)}
                            placeholder="Add details"
                            className="border border-gray-400 p-2 rounded w-9/12"
                            required
                        />
                        <button type="submit" className="btn btn-primary ml-2">
                            Add
                        </button>
                    </form>
                )}
                {showContent()}
            </div>
        </div>
    );
}
