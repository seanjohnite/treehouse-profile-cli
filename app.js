var profile = require('./profile');

process.argv.slice(2).forEach(profile.get);

// var users = ["chalkers", "joykesten2", "seanjohnston", 'davemcfarland'];

// users.forEach(profile.get);
