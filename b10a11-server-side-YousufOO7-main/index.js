const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", 'https://room-booking-75e27.web.app', 'https://room-booking-75e27.firebaseapp.com'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).send({message: 'Unauthorized access'})
    }
    // verify token
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).send({message: 'Not access the author'})
        }
        req.user = decoded;
        next();
    })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6mmiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // hotel related apis
    const roomsCollection = client.db("hotelBooking").collection("hotels");
    const bookedRoomsCollection = client
      .db("hotelBooking")
      .collection("bookedRooms");
    const allReviewCollection = client
      .db("hotelBooking")
      .collection("all-reviews");

    // auth related APIs
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_TOKEN, {
        expiresIn: "1d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV=== 'production',
          sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV=== 'production',
          sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    // all hotel data include sorting
    app.get("/rooms", async (req, res) => {
      const { sortBy } = req.query;
      const sortOptions = {};

      if (sortBy === "priceAsc") {
        sortOptions.price = 1;
      } else if (sortBy === "priceDesc") {
        sortOptions.price = -1;
      }

      const cursor = roomsCollection.find().sort(sortOptions);
      const result = await cursor.toArray();
      res.send(result);
    });

    // show all reviews Ui
    app.get("/reviews", async (req, res) => {
      const cursor = allReviewCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // room details by id
    app.get("/rooms/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await roomsCollection.findOne(query);
      res.send(result);
    });

    // Post a review for a room based on roomId
    app.post("/rooms/reviews", async (req, res) => {
      const {
        roomId,
        userName,
        userPhoto,
        userEmail,
        rating,
        comment,
        timestamp,
      } = req.body;

      try {
        // Find the room by _id
        const room = await roomsCollection.findOne({
          _id: new ObjectId(roomId),
        });

        if (!room) {
          return res
            .status(404)
            .send({ success: false, message: "Room not found" });
        }

        // Prepare the review data
        const review = {
          roomId,
          userName,
          userPhoto,
          userEmail,
          rating,
          comment,
          timestamp,
        };

        // Add the review to the room's reviews array
        const updateResult = await roomsCollection.updateOne(
          { _id: new ObjectId(roomId) },
          { $push: { reviews: review } }
        );

        if (updateResult.modifiedCount > 0) {
          // Repost the review to the allReviewCollection
          const repostResult = await allReviewCollection.insertOne(review);

          if (repostResult.insertedId) {
            return res.status(200).send({
              success: true,
              message: "Review added and reposted successfully",
            });
          } else {
            return res.status(500).send({
              success: false,
              message: "Review added to room but failed to repost",
            });
          }
        } else {
          return res
            .status(500)
            .send({ success: false, message: "Failed to add review to room" });
        }
      } catch (error) {
        console.error("Error adding review:", error);
        res
          .status(500)
          .send({ success: false, message: "Error adding review" });
      }
    });

    // booked room send to db
    app.post("/booked-room", async (req, res) => {
      // save data in bookedRoomsCollection
      const bookedRoom = req.body;
      const result = await bookedRoomsCollection.insertOne(bookedRoom);

      // make sure room is available  or unavailable
      const filter = { _id: new ObjectId(bookedRoom._id) };
      const updateState = {
        $set: { room_state: "Unavailable" },
      };
      const updateRoomState = await roomsCollection.updateOne(
        filter,
        updateState
      );

      res.send(result);
    });

    // booked room show by email
    app.get("/booked-room", verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { user: email };

        // console.log(req?.cookies)
        if(req.user.email !== req.query.email){
            return res.status(403).send({message: 'forbidden'})
        }

      const result = await bookedRoomsCollection.find(query).toArray();
      res.send(result);
    });

    // update date
    app.get("/date-update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const result = await bookedRoomsCollection.findOne(query);
      res.send(result);
    });

    app.put("/dateUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: id };
      const updateDoc = {
        $set: {
          bookingDate: updateData.bookingDate,
        },
      };
      const result = await bookedRoomsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // booked room delete
    app.delete("/room/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const result = await bookedRoomsCollection.deleteOne(query);

      // update room available
      const filter = { _id: new ObjectId(query._id) };
      const updateState = {
        $set: { room_state: "Available" },
      };
      const updateRoomState = await roomsCollection.updateOne(
        filter,
        updateState
      );

      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hotel Booking is on");
});

app.listen(port, () => {
  console.log(`Hotel Booking is On: ${port}`);
});
