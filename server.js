const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            error: 'All fields are required' 
        });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            error: 'Please enter a valid email address' 
        });
    }
    
    // Log the form submission (in production, you'd save to database or send email)
    console.log('New contact form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('---');
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send auto-response to user
    // 4. Integrate with CRM (like GoHighLevel)
    
    // For now, just return success
    res.json({ 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Page not found',
        message: 'The requested resource does not exist'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: 'Something went wrong on our end'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 MNL-AI website running on port ${PORT}`);
    console.log(`📧 Contact form submissions will be logged to console`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
});
