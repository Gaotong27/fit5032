/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// functions/index.js
const {onRequest} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const cors = require("cors")({origin: true});

setGlobalOptions({region: "australia-southeast1", maxInstances: 10});
admin.initializeApp();

// 计数：内置 CORS，前端不会再触发 Network Error
exports.countBooks = onRequest({cors: true}, async (req, res) => {
  try {
    const snap = await admin.firestore().collection("books").get();
    res.json({count: snap.size});
  } catch (err) {
    logger.error("Error counting books", err);
    res.status(500).json({error: err.message});
  }
});

exports.getAllBooks = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get();
      const books = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      res.status(200).json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({error: true, message: String(err)});
    }
  });
});

// 新增文档时把 name 全部大写
exports.capitalizeBookName = onDocumentCreated(
    {region: "australia-southeast1", databaseId: "(default)"},
    "books/{bookId}",
    async (event) => {
      const snap = event.data;
      if (!snap) return null;

      const data = snap.data();
      if (!data || typeof data.name !== "string") return null;

      const upperName = data.name.toUpperCase();
      if (upperName === data.name) return null;

      await admin
          .firestore()
          .collection("books")
          .doc(event.params.bookId)
          .update({name: upperName});

      return null;
    },
);

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
