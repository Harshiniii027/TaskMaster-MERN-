import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaChartBar, FaCheckCircle, FaClock, FaPlus, FaTasks, FaCalendarAlt } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Performance() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState({
    completed: 0,
    inProgress: 0,
    toDo: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
    avgCompletionTime: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfRes = await axios.get("http://localhost:1000/api/tasks/getPerformance", {
          withCredentials: true
        });
        setTaskData(perfRes.data);

        const tasksRes = await axios.get("http://localhost:1000/api/tasks/recent", {
          withCredentials: true
        });
        setTasks(tasksRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalTasks = taskData.completed + taskData.inProgress + taskData.toDo;
  const completionRate = totalTasks > 0 ? Math.round((taskData.completed / totalTasks) * 100) : 0;

  const statusData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [{
      data: [taskData.completed, taskData.inProgress, taskData.toDo],
      backgroundColor: ['#10B981', '#F59E0B', '#E5E7EB'],
    }]
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Tasks by Priority',
      data: [taskData.highPriority, taskData.mediumPriority, taskData.lowPriority],
      backgroundColor: ['#EF4444', '#F59E0B', '#10B981'],
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaChartBar className="h-6 w-6 text-teal-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">Performance Analytics</span>
          </div>
          <button onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-teal-600">
            <FaHome className="mr-2" />
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card icon={<FaTasks />} title="Total Tasks" value={totalTasks} border="teal" />
              <Card icon={<FaCheckCircle />} title="Completed" value={taskData.completed} border="green" />
              <Card icon={<CompletionCircle percent={completionRate} />} title="Completion Rate" value={`${completionRate}%`} border="blue" />
              <Card icon={<FaClock />} title="Avg. Completion" value={`${taskData.avgCompletionTime.toFixed(1)} days`} border="yellow" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ChartBox title="Tasks by Status">
                <Pie data={statusData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />
              </ChartBox>
              <ChartBox title="Tasks by Priority">
                <Bar data={priorityData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} />
              </ChartBox>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Tasks</h3>
                <button onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm">
                  <FaPlus className="mr-2" />
                  Add Task
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {tasks.length > 0 ? tasks.map(task => (
                  <div key={task._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <FaCalendarAlt className="mr-2" />
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'inProgress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status === 'inProgress' ? 'In Progress' : task.status}
                      </span>
                    </div>
                  </div>
                )) : (
                  <p className="px-6 py-4 text-gray-500">No recent tasks available.</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} TaskMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Card({ icon, title, value, border }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-${border}-500`}>
      <div className="flex items-center">
        <div className="text-2xl text-${border}-600">{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  );
}

function CompletionCircle({ percent }) {
  return (
    <div className="relative w-8 h-8">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeDasharray={`${percent}, 100`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-600">
        {percent}%
      </span>
    </div>
  );
}

export default Performance;