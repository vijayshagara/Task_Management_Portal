import { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getDevelopers } from '../../api/user.api';
import { getTasks, createTask } from '../../api/task.api';
import TaskForm from '../../components/Task/TaskForm';
import { User } from '../../interfaces/user.interface';
import { Task } from '../../interfaces/task.interface';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [developers, setDevelopers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const devs = await getDevelopers();
        if (devs) {
          setDevelopers(devs);
        }
        const tsk = await getTasks();

        setTasks(tsk);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateTask = async (task: any) => {
    try {
      await createTask(task);
      const tsk = await getTasks();
      setTasks(tsk);
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Button variant="contained" onClick={() => {
            navigate('/developer-list');
          }}>
            All Developer
          </Button>
          <Button variant="contained" onClick={() => setShowTaskForm(true)}>
            Add Task
          </Button>
        </Box>

        {showTaskForm && (
          <TaskForm
            developers={developers}
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskForm(false)}
          />
        )}

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Tasks
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Developer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.developer?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminDashboard;