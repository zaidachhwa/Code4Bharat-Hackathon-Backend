import ambassadorTask from "../Models/task.model.js";

const imagesOfPromotionAndSeminar = async (req, res) => {
  try {
    const { ambassadorId } = req.params;

    console.log("📌 Ambassador ID from params:", ambassadorId);

    if (!ambassadorId) {
      return res.status(400).json({
        success: false,
        message: "Ambassador ID is required",
      });
    }

    // 1️⃣ Find Task
    const task = await ambassadorTask.findOne({ ambassadorId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found for this ambassador",
      });
    }

    // 2️⃣ Extract Promotion Images
    const promotionImages = {
      assignedImages: task?.promotion?.assignedImages || [],
      day1Screenshots: task?.promotion?.screenshots?.day1 || [],
      day2Screenshots: task?.promotion?.screenshots?.day2 || [],
    };

    // 3️⃣ Extract Seminar Images
    const seminarImages = {
      uploadedProof: task?.seminar?.uploadedProof || [],
      college: task?.seminar?.college || "",
      seminarTitle: task?.seminar?.seminarTitle || "",
      seminarDate: task?.seminar?.seminarDate || null,
    };

    // 4️⃣ Send Response
    return res.status(200).json({
      success: true,
      message: "Promotion & Seminar images fetched successfully",
      data: {
        promotion: promotionImages,
        seminar: seminarImages,
      },
    });

  } catch (error) {
    console.error("❌ ERROR in images controller:", error);

    return res.status(500).json({
      success: false,
      message: "Server error fetching images",
      error: error.message,
    });
  }
};

export default imagesOfPromotionAndSeminar;
