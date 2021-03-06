const express = require('express');
const app = express(); // App

// Layer to add to middleware stack
const experimentSpecs = datafile => {
    const optimizelyClientInstance = optimizely.createInstance({ datafile });
    console.log("EXPERIMENT SPECS")
    app.use((req, res, next) => {
        
        const experimentKey = 'simon-fullstack-example';
        const optimizely_user_id = req.cookies.optimizely_user_id || getRandomHash(); // If cookie doesn't exist, generate random hash.
        const attributes = {
            url: req.originalUrl
        }

        res.cookie('optimizely_user_id', optimizely_user_id);  // Set cookie value with generated value
        // req.optimizely_bucket_id = optimizely_bucket_id; // Set cookie value to request object ?? Need this??

        const variation = optimizelyClientInstance.activate(experimentKey, optimizely_user_id, attributes); // Activate A/B test for user
        res.locals.variation = variation; // Initialize to locals object for res object so middleware functions can access it
        console.log("WHAT")
        next();

        //optimizelyClientInstance.track('added-to-cart', req.optimizely_user_id);
    });

    // app.post('/wow', (req, res) => {
    //     console.log(req.optimizely_user_id);
    //     optimizelyClientInstance.track('added-to-cart', req.optimizely_user_id);
    // });
}

module.exports = experimentSpecs;