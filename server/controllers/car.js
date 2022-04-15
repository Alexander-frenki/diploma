import fetch from "node-fetch";

async function getCarInfo(req, res, next) {
  try {
    console.log("try");
  } catch (error) {
    next(error);
  }
}

export { getCarInfo };

// class CarController {
//   async getCarInfo(req, res, next) {
//     console.log(req.body);
//     try {
//       // const errors = validationResult(req);
//       // if (!errors.isEmpty()) {
//       //   return next(
//       //     ApiError.BadRequest("Ошибка при валидации", errors.array())
//       //   );
//       // }
//       const { carNumber } = req.body;
//       const response = await fetch(
//         `${process.env.APIV3}/tech-passport?apiKey=${process.env.API_KEY}&number=${carNumber}`
//       );
//       console.log(response);
//       return res.json("{}");
//     } catch (e) {
//       console.log("carerror", e);
//       next(e);
//     }
//   }
// }

// module.exports = new CarController();
