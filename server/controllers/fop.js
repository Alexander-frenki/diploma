import fetch from "node-fetch";

async function getFopInfo(req, res, next) {
  try {
    const { fopCode } = req.body;
    const response = await fetch(
      `${process.env.APIV3}/fop/${fopCode}/?apiKey=${process.env.API_KEY}`
    );
    const json = await response.json();

    if (json.status === "error") {
      throw {
        code: json.code,
        // mock: companyInfoMock,
      };
    }

    return res.send(json.data);
  } catch (error) {
    next(error);
  }
}

export { getFopInfo };
