/* dependencies */
const express = require('express')
const admin = require('firebase-admin');
let inspect = require('util').inspect
let Busboy = require('busboy')
let UUID = require('uuid-v4')

// Node native packages
let path = require('path')
let os = require('os')
let fs = require('fs')


/* config firebase */
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'quasargram-f94b8.appspot.com'
});

const db = admin.firestore();
let bucket = admin.storage().bucket()


/* config express */
const app = express()

/* endpoint - getPosts*/
app.get('/posts', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    let posts = []
    db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
        snapshot.forEach((doc) => {
            posts.push(doc.data())
        });
        response.send(posts)
    }).catch(() => { });
})

/* endpoint - createpost*/
app.post('/createPost', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    let busboy = new Busboy({ headers: request.headers });
    let uuid = UUID()
    let fields = {};
    let fileData = {};

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        let filepath = path.join(os.tmpdir(), filename)
        file.pipe(fs.createWriteStream(filepath))
        fileData = { filepath, mimetype }
    });

    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        fields[fieldname] = val
    });

    busboy.on('finish', function () {
        bucket.upload(
            fileData.filepath,
            {
                uploadType: 'media',
                metadata: {
                    metadata: {
                        contentType: fileData.mimetype,
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            },
            (err, uploadedFile) => {
                if (!err) {
                    createDocument(uploadedFile)
                }
            })

        function createDocument(uploadedFile) {
            db.collection('posts').doc(fields.id).set({
                id: fields.id,
                caption: fields.caption,
                location: fields.location,
                date: parseInt(fields.date),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`
            }).then(() => {
                response.send('Post added:' + fields.id)
            }).catch(() => { })
        }
        //response.writeHead(303, { Connection: 'close', Location: '/' });        
        response.end();
    });

    request.pipe(busboy);

})

/* listen */
app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})