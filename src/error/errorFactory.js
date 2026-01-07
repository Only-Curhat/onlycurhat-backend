const AppError = require("./AppError");

module.exports = {
  BadRequest: (msg) =>
    new AppError(msg || "Permintaan tidak valid", 400, "BAD_REQUEST"),

  Unauthorized: (msg) =>
    new AppError(msg || "Silakan login", 401, "UNAUTHORIZED"),

  Forbidden: (msg) =>
    new AppError(msg || "Akses ditolak", 403, "FORBIDDEN"),

  NotFound: (msg) =>
    new AppError(msg || "Data tidak ditemukan", 404, "NOT_FOUND"),

  Conflict: (msg) =>
    new AppError(msg || "Terjadi konflik data", 409, "CONFLICT"),

  Internal: () =>
    new AppError("Terjadi kesalahan sistem", 500, "INTERNAL_ERROR"),
};