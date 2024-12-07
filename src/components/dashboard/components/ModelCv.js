import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, useTheme, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResponsiveContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    maxWidth: '1000px',
    width: '700px',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        maxWidth: '90%',
    },
}));

const FileInput = styled('input')({
    display: 'none',
});

const CustomButton = styled(Button)(({ theme }) => ({
    width: '100%',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        background: theme.palette.primary.dark,
    },
}));

export default function JobMatcherForm() {
    const theme = useTheme();
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [matchShow, setMatchShow] = useState(false);
    const [matchValue, setMatchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFile(selectedFile);
        }
    };

    async function sendFileToEndpoint() {
        if (!file) {
            toast.error("File cannot be empty", { position: "top-center" });
            return;
        }
        if (!jobDescription) {
            toast.error("Description cannot be empty", { position: "top-center" });
            return;
        }
        setLoading(true); // Start loading
        const formData = new FormData();
        formData.append('pdf_file', file);
        formData.append('job_description', jobDescription);

        try {
            const response = await fetch('http://localhost:5000/match_cv_to_job', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                if (result['Match']) {
                    setMatchShow(true);
                    setMatchValue(parseFloat(result['Match']));
                }
            } else {
                console.error("Failed to upload file:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false); // Stop loading
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                minWidth: '70vh',
                padding: theme.spacing(2),
                backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f0f0f0',
            }}
        >
            <ResponsiveContainer>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    AI Job Matcher
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <label htmlFor="cv-upload">
                        <FileInput
                            accept=".pdf"
                            id="cv-upload"
                            type="file"
                            onChange={handleFileChange}
                            disabled={loading} // Disable while loading
                        />
                        <CustomButton variant="contained" component="span" disabled={loading}>
                            {fileName || 'Upload CV'}
                        </CustomButton>
                    </label>
                </Box>
                <TextField
                    placeholder="Enter job description here"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    fullWidth
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.default,
                            height: "150px",
                        },
                    }}
                    disabled={loading} // Disable while loading
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }} 
                    onClick={sendFileToEndpoint}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </Button>
                {matchShow && (
                    <Typography variant="h6" sx={{ mt: 2, color: theme.palette.success.main }}>
                        Match Percentage: {matchValue}%
                    </Typography>
                )}
            </ResponsiveContainer>
            <ToastContainer />
        </Box>
    );
}
