const TrackMcqs =require("../model/TrackModel2")
const CreateScore2 = async (req, res) => {
  try {
      const { studentName2, score2, totalAttempts2, questionTypes2,time2 } = req.body;
      // console.log("req.body",req.body)
      
      // Validate required fields
      if (!studentName2 || !score2 || !totalAttempts2 || !questionTypes2) {
          return res.status(400).json({ error: "All fields are required" });
      }
      
      const newTrack = new TrackMtf({
          studentName2,
          score2,
          totalAttempts2,
          questionTypes2,
          time2
      });

      const savedTrack = await newTrack.save();
      res.status(201).json(savedTrack);
  } catch (error) {
      console.error("Error creating score:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

const GetScore2 = async (req, res) => {

  try {
    const findScore=await TrackMtf.find();

    res.status(201).json(findScore)
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }

};



module.exports={CreateScore2,GetScore2}