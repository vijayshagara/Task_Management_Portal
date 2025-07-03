import { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { getDeveloperTasks, updateTask } from '../../api/task.api';
import { Task } from '../../interfaces/task.interface';

const DeveloperDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getDeveloperTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleUpdateTaskStatus = async (taskId: number, status: 'pending' | 'in_progress' | 'completed') => {
    try {
      await updateTask(taskId, { status });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Developer Dashboard
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your Tasks
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    {task.status !== 'in_progress' && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleUpdateTaskStatus(task.id, 'in_progress')}
                        sx={{ mr: 1 }}
                      >
                        Start
                      </Button>
                    )}
                    {task.status !== 'completed' && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DeveloperDashboard;