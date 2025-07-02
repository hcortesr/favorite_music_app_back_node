// import passport from 'passport';
// import { Strategy } from 'passport-local';
// import client from './db.js';
// import { ObjectId } from 'mongodb';

// passport.use(new Strategy((username, password, done) => {
//     console.log("Authentication");

//     client.db("driveCloneApp").collection("users").findOne({ "username": username })
//         .then(data => {
//             if (data === null) { return done(null, false) };
//             if (data.password === password) { return done(null, data) }
//             else {
//                 console.log("Las contraseñas no coiniden");
//                 return done(null, false)
//             }

//         })
//         .catch(e => {
//             console.log("error: ", e);
//             return done(e)
//         })

// }));

// passport.serializeUser((user, done) => {
//     console.log('Serializando usuario');
//     if (user) { done(null, user._id.toString()) }
//     else { done(null, false) };
// })
// passport.deserializeUser((id_user, done) => {
//     console.log('Deserializando usuario: ', id_user);

//     // Se guarda ID en objeto ID
//     const id_obj = new ObjectId(id_user);


//     client.db("driveCloneApp").collection("users").findOne({ "_id": id_obj })
//         .then(data => {
//             if (data == null) {
//                 return done(null, false);
//             } else {
//                 return done(null, data);
//             }
//         })
//         .catch(e => done(e));
// });