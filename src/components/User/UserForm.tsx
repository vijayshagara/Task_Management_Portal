import { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface UserFormProps {
  onSubmit: (user: { name: string; email: string; password: string; role: 'admin' | 'developer' }) => void;
  onCancel: () => void;
}

export default function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'developer'>('developer');

  const handleSubmit = () => {
    onSubmit({ name, email, password, role });
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Add role selector here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!name || !email || !password}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}