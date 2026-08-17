// Vercel Web Analytics Initialization
// This script initializes Vercel Web Analytics for the static site

// Import the inject function from @vercel/analytics
import { inject } from '@vercel/analytics';

// Initialize analytics with automatic mode detection
inject({
    mode: 'auto', // Automatically detect environment (production/development)
    debug: true   // Enable debug logging in development
});
