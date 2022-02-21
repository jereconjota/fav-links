const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
})

router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    }
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

// router.post('/add', (req, res) => {
//     const { title, url, description } = req.body;
//     const newLink = {
//         title,
//         url,
//         description
//     }
//     const errors = [];

//     if (!title) {
//         errors.push({ text: 'Please add a title' });
//     }
//     if (!url) {
//         errors.push({ text: 'Please add a url' });
//     }
//     if (!description) {
//         errors.push({ text: 'Please add a description' });
//     }

//     if (errors.length > 0) {
//         res.render('links/add', {
//             errors,
//             title,
//             url,
//             description
//         });
//     } else {
//         pool.query('INSERT INTO links (title, url, description) VALUES (?, ?, ?)', [title, url, description], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.redirect('/links');
//             } else {
//                 res.redirect('/links');
//             }
//         });        
//     }
//     res.send('recieved');
// });

router.get('/', isLoggedIn, async (req, res) => {
    //al usar promisify podemos usarlo como promesa el query, sino habria q hacerlo de esta forma con callback 
    // const linksdb = pool.query('SELECT * FROM links', (err, result, fields) => { 
    //     if (err) throw err;
    //     console.log(result);
    // });
    
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    // console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link delete successfully');
    res.redirect('/links');

});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', { link: link[0] });
})
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { url, title, description } = req.body;
    link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');
})

module.exports = router;