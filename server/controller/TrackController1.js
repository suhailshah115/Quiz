const TrackMcqs =require("../model/TrackModel1")
const CreateScore1 = async (req, res) => {
  try {
      const { studentName1, score1, totalAttempts1, questionTypes1,time1 } = req.body;
      // console.log("req.body",req.body)
      
      // Validate required fields
      if (!studentName1 || !score1 || !totalAttempts1 || !questionTypes1) {
          return res.status(400).json({ error: "All fields are required" });
      }
      
      const newTrack = new TrackMcqs({
          studentName1,
          score1,
          totalAttempts1,
          questionTypes1,
          time1
      });

      const savedTrack = await newTrack.save();
      res.status(201).json(savedTrack);
  } catch (error) {
      console.error("Error creating score:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

const GetScore1 = async (req, res) => {

  try {
    const findScore=await TrackMcqs.find();

    res.status(201).json(findScore)
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }

};



module.exports={CreateScore1,GetScore1}