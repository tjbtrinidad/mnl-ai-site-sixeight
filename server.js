const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https:"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

// Compression for better performance
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname), {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
        // Cache static assets longer
        if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
        }
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
        }
    }
}));

// Main route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for contact form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            phone, 
            businessType, 
            monthlyRevenue, 
            biggestChallenge, 
            urgentHelp 
        } = req.body;
        
        // Basic validation
        if (!firstName || !lastName || !email || !phone || !businessType) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled.'
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }
        
        // Log the submission (in production, you'd save to database/send email)
        const submissionData = {
            timestamp: new Date().toISOString(),
            name: `${firstName} ${lastName}`,
            email,
            phone,
            businessType,
            monthlyRevenue,
            biggestChallenge: biggestChallenge || 'Not provided',
            urgentHelp: urgentHelp || false,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        };
        
        console.log('🚀 NEW MNL-AI LEAD SUBMISSION:', JSON.stringify(submissionData, null, 2));
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success response
        res.json({
            success: true,
            message: 'Thank you! Your FREE strategy call request has been received. We\'ll contact you within 30 minutes during business hours.',
            data: {
                submissionId: Date.now().toString(),
                nextSteps: 'Check your email for confirmation and calendar link'
            }
        });
        
    } catch (error) {
        console.error('❌ Contact form submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong on our end. Please try again or contact us directly.'
        });
    }
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'MNL-AI Website',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version
    });
});

// Analytics/tracking endpoint
app.post('/api/track', (req, res) => {
    try {
        const { event, data } = req.body;
        
        // Log analytics event
        console.log('📊 MNL-AI Analytics Event:', {
            timestamp: new Date().toISOString(),
            event,
            data,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error('Analytics tracking error:', error);
        res.status(500).json({ success: false });
    }
});

// Sitemap for SEO
app.get('/sitemap.xml', (req, res) => {
    const baseUrl = `https://${req.get('host')}`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/#services</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/#case-studies</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/#about</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>${baseUrl}/#contact</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
</urlset>`;
    
    res.set('Content-Type', 'text/xml');
    res.send(sitemap);
});

// Robots.txt for SEO
app.get('/robots.txt', (req, res) => {
    const robots = `User-agent: *
Allow: /

Sitemap: https://${req.get('host')}/sitemap.xml

# MNL-AI - Filipino AI Automation Solutions
# Transform your business into a 24/7 sales machine`;
    
    res.set('Content-Type', 'text/plain');
    res.send(robots);
});

// Catch-all route - serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('🚨 Server error:', err);
    
    res.status(err.status || 500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' 
            ? 'Something went wrong on our end.' 
            : err.message
    });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('🔄 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🔄 SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
    });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 MNL-AI Website Server Running!`);
    console.log(`📱 Port: ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started: ${new Date().toISOString()}`);
    console.log(`🇵🇭 Ready to transform Filipino businesses!`);
    
    if (process.env.NODE_ENV === 'production') {
        console.log('🔒 Security headers enabled');
        console.log('⚡ Compression enabled');
        console.log('📊 Analytics tracking enabled');
    }
});

// Handle server startup errors
server.on('error', (err) => {
    console.error('❌ Server startup error:', err);
    process.exit(1);
});

module.exports = app;