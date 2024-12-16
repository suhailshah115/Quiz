const Track = require("../model/TrackModel"); // Import your model

// Controller function to handle score creation
const CreateScore = async (req, res) => {
  try {
    const { studentName, score, totalAttempts, questionTypes,time } = req.body;
    
    const newTrack = new Track({
      studentName,
      time,
      score,
      totalAttempts,
      questionTypes: questionTypes,
    });

    // Save the new score to the database
    await newTrack.save();

    res.status(201).json({ message: "Score created successfully", data: newTrack });
  } catch (error) {
    console.error("Error creating score:", error);
    res.status(500).json({ message: "Error creating score", error: error.message });
  }
};



const GetScore = async (req, res) => {

  try {
    const findScore=await Track.find();

    res.status(201).json(findScore)
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }

};
module.exports = { CreateScore,GetScore };
