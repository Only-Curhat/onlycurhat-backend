const AppError = require("../error/AppError");

module.exports = (err, req, res, next) => {
  // Error buatan kita
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
    });
  }

  // Prisma: data tidak ditemukan
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Data tidak ditemukan",
    });
  }

  // Prisma: unique constraint
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "Data sudah digunakan",
    });
  }

  console.error("🔥 UNHANDLED ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
};