// // const express = require('express');
// // const session = require('express-session');
// // const bcrypt = require('bcryptjs');
// // const path = require('path');
// // const multer = require('multer');
// // const fs = require('fs');
// // const { exec } = require('child_process');

// // const app = express();
// // const upload = multer({ dest: 'uploads/' });
// // const dbFile = 'users.json';
// // let users = [];

// // if (fs.existsSync(dbFile)) {
// //     try {
// //         users = JSON.parse(fs.readFileSync(dbFile));
// //         console.log('Users loaded from file.');
// //     } catch (error) {
// //         console.error('Error reading users file:', error);
// //     }
// // } else {
// //     console.log('Users file not found, starting with an empty user list.');
// // }

// // app.use(express.urlencoded({ extended: true }));
// // app.use(session({
// //     secret: 'your-secret-key',
// //     resave: false,
// //     saveUninitialized: true
// // }));
// // app.use(express.static(path.join(__dirname, 'public')));

// // app.post('/signup', async (req, res) => {
// //     const { username, password } = req.body;
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const userExists = users.some(user => user.username === username);

// //     if (userExists) {
// //         console.log(`User already exists: ${username}`);
// //         return res.redirect('/signup.html');
// //     }

// //     users.push({ username, password: hashedPassword });

// //     try {
// //         fs.writeFileSync(dbFile, JSON.stringify(users, null, 2));
// //         console.log(`User signed up: ${username}`);
// //         req.session.user = username;
// //         res.redirect('/home');
// //     } catch (error) {
// //         console.error('Error writing users file:', error);
// //         res.status(500).send('Internal Server Error');
// //     }
// // });

// // app.post('/login', async (req, res) => {
// //     const { username, password } = req.body;
// //     const user = users.find(u => u.username === username);
// //     console.log(`Attempting login for: ${username}`);

// //     if (user) {
// //         const passwordMatch = await bcrypt.compare(password, user.password);
// //         if (passwordMatch) {
// //             req.session.user = username;
// //             console.log(`Login successful for: ${username}`);
// //             res.redirect('/home');
// //         } else {
// //             console.log(`Password mismatch for: ${username}`);
// //             res.redirect('/login.html');
// //         }
// //     } else {
// //         console.log(`User not found: ${username}`);
// //         res.redirect('/login.html');
// //     }
// // });

// // app.use((req, res, next) => {
// //     if (req.session.user || req.path === '/' || req.path === '/signup.html' || req.path === '/login.html') {
// //         next();
// //     } else {
// //         res.redirect('/login.html');
// //     }
// // });

// // app.get('/home', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'home.html'));
// // });

// // app.get('/logout', (req, res) => {
// //     req.session.destroy();
// //     res.redirect('/');
// // });

// // const pluginMap = {
// //     'pslist': 'windows.pslist.PsList',
// //     'pstree': 'windows.pstree.PsTree',
// //     'network analysis': 'windows.netstat.NetStat', // Replace with the correct plugin name
// //     'register analysis': 'windows.registry.Registry', // Replace with the correct plugin name
// //     'dll analysis': 'windows.dlllist.DllList'
// // };

// // app.post('/analyze', upload.single('memoryDump'), (req, res) => {
// //     const { plugin } = req.body;
// //     const memoryDumpPath = path.join(__dirname, req.file.path);
// //     const selectedPlugin = pluginMap[plugin];

// //     if (!selectedPlugin) {
// //         return res.status(400).send('Invalid plugin selected.');
// //     }

// //     const volatilityCommand = `python C:\\Users\\DELL\\volatility3\\vol.py -f ${memoryDumpPath} ${selectedPlugin}`;

// //     console.log(`Executing command: ${volatilityCommand}`);

// //     exec(volatilityCommand, (error, stdout, stderr) => {
// //         if (error) {
// //             console.error(`Error executing command: ${error.message}`);
// //             return res.status(500).send('Error executing Volatility command.');
// //         }
// //         if (stderr) {
// //             console.error(`Command stderr: ${stderr}`);
// //         }

// //         const resultFilePath = path.join(__dirname, 'uploads', 'result.txt');
// //         fs.writeFileSync(resultFilePath, stdout, 'utf8');

// //         res.redirect('/results.html');
// //     });
// // });



// // app.get('/results.html', (req, res) => {
// //     const resultFilePath = path.join(__dirname, 'uploads', 'result.txt');
// //     if (fs.existsSync(resultFilePath)) {
// //         const results = fs.readFileSync(resultFilePath, 'utf8');
// //         res.send(`
// //             <!DOCTYPE html>
// //             <html lang="en">
// //             <head>
// //                 <meta charset="UTF-8">
// //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //                 <title>Analysis Results</title>
// //                 <link rel="stylesheet" href="styles.css">
// //             </head>
// //             <body>
// //                 <nav>
// //                     <ul>
// //                         <li><a href="/home">Home</a></li>
// //                         <li><a href="/analysis.html">Memory Analysis</a></li>
// //                         <li><a href="/logout">Logout</a></li>
// //                     </ul>
// //                 </nav>
// //                 <main>
// //                     <h1>Analysis Results</h1>
// //                     <pre>${results}</pre>
// //                 </main>
// //             </body>
// //             </html>
// //         `);
// //     } else {
// //         res.send(`
// //             <!DOCTYPE html>
// //             <html lang="en">
// //             <head>
// //                 <meta charset="UTF-8">
// //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //                 <title>Analysis Results</title>
// //                 <link rel="stylesheet" href="styles.css">
// //             </head>
// //             <body>
// //                 <nav>
// //                     <ul>
// //                         <li><a href="/home">Home</a></li>
// //                         <li><a href="/analysis.html">Memory Analysis</a></li>
// //                         <li><a href="/logout">Logout</a></li>
// //                     </ul>
// //                 </nav>
// //                 <main>
// //                     <h1>Analysis Results</h1>
// //                     <p>No results available.</p>
// //                 </main>
// //             </body>
// //             </html>
// //         `);
// //     }
// // });



// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// // });

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });
const dbFile = 'users.json';
let users = [];

// Load users from JSON file if it exists
if (fs.existsSync(dbFile)) {
    try {
        users = JSON.parse(fs.readFileSync(dbFile));
        console.log('Users loaded from file.');
    } catch (error) {
        console.error('Error reading users file:', error);
    }
} else {
    console.log('Users file not found, starting with an empty user list.');
}

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

let analysisStatus = {};

app.get('/api/analysis/:analysisId/status', (req, res) => {
    const analysisId = req.params.analysisId;
    const status = analysisStatus[analysisId] || 'failed';
    res.json({ status });
});


// Sign up route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        console.log(`User already exists: ${username}`);
        return res.redirect('/signup.html');
    }

    users.push({ username, password: hashedPassword });

    try {
        fs.writeFileSync(dbFile, JSON.stringify(users, null, 2));
        console.log(`User signed up: ${username}`);
        req.session.user = username;
        res.redirect('/home');
    } catch (error) {
        console.error('Error writing users file:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    console.log(`Attempting login for: ${username}`);

    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            req.session.user = username;
            console.log(`Login successful for: ${username}`);
            res.redirect('/home');
        } else {
            console.log(`Password mismatch for: ${username}`);
            res.redirect('/login.html');
        }
    } else {
        console.log(`User not found: ${username}`);
        res.redirect('/login.html');
    }
});

// Middleware to ensure authenticated users only access certain routes
app.use((req, res, next) => {
    if (req.session.user || req.path === '/' || req.path === '/signup.html' || req.path === '/login.html') {
        next();
    } else {
        res.redirect('/login.html');
    }
});

// Home route
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Mapping of plugin names to Volatility plugin paths
// const pluginMap = {
//     'pslist': 'windows.pslist.PsList',
//     'pstree': 'windows.pstree.PsTree',
//     'network analysis': 'windows.netscan.NetScan',
//     'register analysis': 'windows.registry.Registry',
//     'dll analysis': 'windows.dlllist.DllList'
// };
const pluginMap = {
    'pslist': 'windows.pslist.PsList',
    'pstree': 'windows.pstree.PsTree',
    'network': 'windows.netscan.NetScan', // Adjusted for network analysis
    'registery': 'windows.registry.hiveinfo.HiveInfo', // Adjusted for registry hive analysis
    'dll': 'windows.dlllist.DllList'
};

// Memory analysis route
// app.post('/analyze', upload.single('memoryDump'), (req, res) => {
//     const { plugin } = req.body;
//     const memoryDumpPath = path.join(__dirname, req.file.path);
//     const selectedPlugin = pluginMap[plugin];

//     if (!selectedPlugin) {
//         return res.status(400).send('Invalid plugin selected.');
//     }

//     const volatilityCommand = `python C:\\Users\\DELL\\volatility3\\vol.py -f ${memoryDumpPath} ${selectedPlugin}`;

//     console.log(`Executing command: ${volatilityCommand}`);

//     exec(volatilityCommand, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing command: ${error.message}`);
//             return res.status(500).send('Error executing Volatility command.');
//         }
//         if (stderr) {
//             console.error(`Command stderr: ${stderr}`);
//         }

//         const resultFilePath = path.join(__dirname, 'uploads', 'result.txt');
//         fs.writeFileSync(resultFilePath, stdout, 'utf8');

//         res.redirect('/results.html');
//     });
// });

app.post('/analyze', upload.single('memoryDump'), (req, res) => {
    const { plugin } = req.body;
    const memoryDumpPath = path.join(__dirname, req.file.path);
    const selectedPlugin = pluginMap[plugin];
    const analysisId = Date.now().toString(); // Unique ID for this analysis

    if (!selectedPlugin) {
        return res.status(400).send('Invalid plugin selected.');
    }

    analysisStatus[analysisId] = 'in_progress';

    const volatilityCommand = `python C:\\Users\\DELL\\volatility3\\vol.py -f ${memoryDumpPath} ${selectedPlugin}`;

    console.log(`Executing command: ${volatilityCommand}`);

    exec(volatilityCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            analysisStatus[analysisId] = 'failed';
            return;
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
        }

        const resultFilePath = path.join(__dirname, 'uploads', 'result.txt');
        fs.writeFileSync(resultFilePath, stdout, 'utf8');

        analysisStatus[analysisId] = 'completed';
    });

    res.redirect(`/process.html?analysisId=${analysisId}`);
});


// Results route for results.html
app.get('/getResults', (req, res) => {
    const resultFilePath = path.join(__dirname, 'uploads', 'result.txt');
    if (fs.existsSync(resultFilePath)) {
        const results = fs.readFileSync(resultFilePath, 'utf8');
        res.send(results);
    } else {
        res.send('No results available.');
    }
});

// Results route for results1.html
app.get('/getFullResults', (req, res) => {
    const resultFilePath = path.join(__dirname, 'uploads', 'result.txt');
    if (fs.existsSync(resultFilePath)) {
        const results = fs.readFileSync(resultFilePath, 'utf8');
        res.send(results);
    } else {
        res.send('No results available.');
    }
});

const pdf = require('html-pdf');

app.get('/downloadResults', (req, res) => {
    const resultFilePath = path.join(__dirname, 'uploads', 'result.txt');
    const results = fs.existsSync(resultFilePath) ? fs.readFileSync(resultFilePath, 'utf8') : 'No results available.';
    const htmlContent = `
        <html>
        <head>
            <title>Analysis Results</title>
        </head>
        <body>
            <h1>Analysis Results</h1>
            <pre>${results}</pre>
        </body>
        </html>
    `;

    pdf.create(htmlContent).toStream((err, stream) => {
        if (err) return res.status(500).send(err);
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-disposition', 'attachment; filename=results.pdf');
        stream.pipe(res);
    });
});





// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
