const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

exports.converToCsv = async (req, res, next) => {
  const data = req.body.data
  const json2csvParser = new Json2csvParser({ header: true });
  const csvData = json2csvParser.parse(data);

 fs.writeFile("bezkoder_mongodb_fs.xls", csvData, (error) => {
    if (error) {
      res.json({ error }) 
      throw error;
    } else {
      res.download("bezkoder_mongodb_fs.xls")
    }
  });
}
