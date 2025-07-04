import React from 'react'
import { useEffect, useState } from 'react';
import { Typography, Button, Container, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getDevelopers } from '../../api/user.api';
import { User } from '../../interfaces/user.interface';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const DeveloperList = () => {
    const [developers, setDevelopers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const devs = await getDevelopers();
                if (devs) {
                    setDevelopers(devs);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <ArrowBackIcon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/admin')}>
                        Back
                    </ArrowBackIcon>
                </Box>
                <Typography variant="h4" gutterBottom>
                    Developers
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {developers.map((developer) => (
                                <TableRow key={developer.id}>
                                    <TableCell>{developer.name}</TableCell>
                                    <TableCell>{developer.email}</TableCell>
                                    <TableCell>{developer.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container >
    )
}

export default DeveloperList