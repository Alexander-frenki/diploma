import { ApiError } from "../exceptions/apiError.js";

function errorMiddleware(err, req, res, next) {
  if (err?.code === 404) {
    res.sendStatus(404);
  }

  if ((err?.code === 424 || err?.code === 403) && err?.mock) {
    return res.send(err?.mock);
  }

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  next();
  return res.sendStatus(500);
}

export { errorMiddleware };
