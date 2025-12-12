import Ambassador from "../Models/ambassador.model.js";
import ambassadorTask from "../Models/task.model.js";

const getAmbassadorsWithSteps = async (req, res) => {
  try {
    const ambassadors = await ambassadorTask.find().populate("ambassadorId");

    // JOIN with ambassadorTask model
    

    return res.status(200).json({
      success: true,
      message: "Ambassadors with step data fetched",
      ambassadors
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default getAmbassadorsWithSteps;
