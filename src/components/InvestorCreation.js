import React, { useState } from 'react';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    Alert,
    IconButton,
    Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createInvestor } from '../services/api';

const RANKS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const DEFAULT_INTERESTS = [
    'Healthcare',
    'Technology',
    'Smart Home',
    'IoT',
    'Finance',
    'Education',
    'Entertainment',
    'Sports'
];

const InvestorCreation = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        profilePicture: '',
        birthday: '',
        gender: '',
        rank: '',
        aoi: [],
        enc_password: '',
        name: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [customInterest, setCustomInterest] = useState('');
    const [availableInterests, setAvailableInterests] = useState(DEFAULT_INTERESTS);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInterestChange = (event) => {
        const {
            target: { value },
        } = event;
        setFormData(prev => ({
            ...prev,
            aoi: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleAddCustomInterest = () => {
        if (customInterest.trim() && !availableInterests.includes(customInterest.trim())) {
            setAvailableInterests(prev => [...prev, customInterest.trim()]);
            setFormData(prev => ({
                ...prev,
                aoi: [...prev.aoi, customInterest.trim()]
            }));
            setCustomInterest('');
        }
    };

    const handleCustomInterestKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomInterest();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const dataToSend = {
                ...formData,
                enc_password: formData.enc_password
            };

            await createInvestor(dataToSend);
            setSuccess('Investor created successfully!');
            setFormData({
                fullName: '',
                email: '',
                profilePicture: '',
                birthday: '',
                gender: '',
                rank: '',
                aoi: [],
                enc_password: '',
                name: ''
            });
            setAvailableInterests(DEFAULT_INTERESTS);
        } catch (error) {
            setError('Failed to create investor. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 4,
                        backgroundColor: 'background.paper',
                        '& .MuiFormControl-root': {
                            backgroundColor: 'background.paper',
                        },
                    }}
                >
                    <Typography 
                        component="h1" 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                            color: 'primary.main',
                            fontWeight: 600,
                            mb: 3
                        }}
                    >
                        Create New Investor
                    </Typography>

                    {error && (
                        <Alert 
                            severity="error" 
                            sx={{ 
                                mb: 2,
                                backgroundColor: '#ffebee',
                                color: '#c62828',
                                '& .MuiAlert-icon': {
                                    color: '#c62828'
                                }
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert 
                            severity="success" 
                            sx={{ 
                                mb: 2,
                                backgroundColor: '#e8f5e9',
                                color: '#2e7d32',
                                '& .MuiAlert-icon': {
                                    color: '#2e7d32'
                                }
                            }}
                        >
                            {success}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                sx={{ backgroundColor: 'background.paper' }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ backgroundColor: 'background.paper' }}
                            />
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                sx={{ backgroundColor: 'background.paper' }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                name="enc_password"
                                type="password"
                                value={formData.enc_password}
                                onChange={handleChange}
                                sx={{ backgroundColor: 'background.paper' }}
                            />
                        </Box>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Profile Picture URL"
                            name="profilePicture"
                            value={formData.profilePicture}
                            onChange={handleChange}
                            sx={{ backgroundColor: 'background.paper' }}
                        />

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Birthday"
                                name="birthday"
                                type="date"
                                value={formData.birthday}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ backgroundColor: 'background.paper' }}
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={formData.gender}
                                    label="Gender"
                                    onChange={handleChange}
                                    sx={{ backgroundColor: 'background.paper' }}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Rank</InputLabel>
                            <Select
                                name="rank"
                                value={formData.rank}
                                label="Rank"
                                onChange={handleChange}
                                sx={{ backgroundColor: 'background.paper' }}
                            >
                                {RANKS.map((rank) => (
                                    <MenuItem key={rank} value={rank}>
                                        {rank}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                            Areas of Interest
                        </Typography>

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Areas of Interest</InputLabel>
                            <Select
                                multiple
                                name="aoi"
                                value={formData.aoi}
                                onChange={handleInterestChange}
                                input={<OutlinedInput label="Areas of Interest" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip 
                                                key={value} 
                                                label={value}
                                                sx={{ 
                                                    backgroundColor: 'primary.light',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.main'
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                                sx={{ backgroundColor: 'background.paper' }}
                            >
                                {availableInterests.map((interest) => (
                                    <MenuItem key={interest} value={interest}>
                                        {interest}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <TextField
                                fullWidth
                                label="Add Custom Interest"
                                value={customInterest}
                                onChange={(e) => setCustomInterest(e.target.value)}
                                onKeyPress={handleCustomInterestKeyPress}
                                sx={{ backgroundColor: 'background.paper' }}
                            />
                            <IconButton 
                                color="primary" 
                                onClick={handleAddCustomInterest}
                                sx={{ 
                                    mt: 1,
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.main'
                                    }
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                mt: 4, 
                                mb: 2,
                                py: 1.5,
                                backgroundColor: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.dark'
                                }
                            }}
                        >
                            Create Investor
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default InvestorCreation; 