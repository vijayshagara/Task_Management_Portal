import { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel } from '@mui/material';

interface TaskFormProps {
  developers: { id: number; name: string }[];
  onSubmit: (task: { title: string; description: string; developerId: number }) => void;
  onCancel: () => void;
}

export default function TaskForm({ developers, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [developerId, setDeveloperId] = useState(developers[0]?.id || 0);

  const handleSubmit = () => {    
    onSubmit({ title, description, developerId });
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputLabel id="developer-label">Developer</InputLabel>
        <Select
          labelId="developer-label"
          value={developerId}
          onChange={(e) => setDeveloperId(e.target.value)}
          fullWidth
        >
          {developers.map((dev) => (
            <MenuItem key={dev.id} value={dev.id}>
              {dev.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}