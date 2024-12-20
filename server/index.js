const express = require("express");
const cors = require("cors");
const { Database } = require("./Database/database");
const dotenv = require('dotenv');

const userRoute = require("./Routes/userRoute");
const { questionRoute } = require("./Routes/quesRoute");
const trackRoute = require("./Routes/TrackRoute");
const trackRoute1 = require("./Routes/TrackRoutes1");
const User =require("./model/UserModel")

//  Express session Password
const session=require("express-session")

const passport=require("passport");
const facebookRoute = require("./Routes/FacebookRoute");
const GoogleStrategy = require("passport-google-oauth2").Strategy;




dotenv.config()
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies and headers for authentication
}));

const PORT = 8080;


// Api Route
app.get("/", (req, res) => {
    res.send("You are on the correct PORT");
    console.log("Hello World");
  });

  app.get("/auth/google", (req, res) => {
    const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http://localhost:8080/auth/google/callback&client_id=YOUR_GOOGLE_CLIENT_ID&scope=profile email`;
    res.redirect(redirectUri);
  });

//   UserRoute

app.use("/",userRoute)

// /   UserRoute

app.use("/",facebookRoute)


// Session Setup
app.use(
  session({
    secret: "123456789abcdfgyrxvhhjinjhtrcvgtdfff",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope:["profile","email"]
    },

    
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            Fname: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);





// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/",
  }),
  (req, res) => {
    // Get the user's Fname
    const Fname = req.user.Fname;
 

    // Redirect to frontend with Fname as query parameter
    res.redirect(`http://localhost:5173/?Fname=${encodeURIComponent(Fname)}`);
  }
);









// NoteRoute

app.use("/",questionRoute)

// TractRoute

app.use("/",trackRoute)

// TrackRoute1
 app.use("/",trackRoute1)




const startServer = async () => {
    try {
       Database();
      app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  };
  
  startServer();
  

