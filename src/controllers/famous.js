const { writeFileSync } = require("fs");
const path = require("path");
const famous = require("../data");

//get all famous
const getFamous = (req, res) => {
  res.status(200).json({ success: true, data: famous });
};

//get famous by id
const getSpecificFamous = (req, res) => {
  const id = Number(req.params.ID);
  const singleFamous = famous.find((famous, index) => index + 1 === id);
  if (!singleFamous) {
    return res
      .status(404)
      .json({ success: false, message: `Famous of ID '${id}' not found` });
  }
  res.status(200).json({ success: true, data: singleFamous });
};

//create new famous
const createFamous = (req, res) => {
  const {
    full_name,
    nickname,
    date_of_birth,
    date_of_death,
    image_url,
    famous_for
  } = req.body;

  if (!full_name || !date_of_birth || !image_url || !famous_for) {
    return res.status(400).json({
      success: false,
      message: "please provide all required details",
      example: {
        full_name: "Henry Lee",
        nickname: null,
        date_of_birth: "1990-03-30",
        date_of_death: null,
        image_url:
          "https://avatars.githubusercontent.com/u/123258064?s=400&u=8791868508ed0f62f14ea7970d7575ea979ed497&v=4",
        famous_for: "Tanzanian web developer"
      }
    });
  } else {
    const newFamous = {
      full_name: full_name,
      nickname: nickname ? nickname : null,
      date_of_birth: date_of_birth,
      date_of_death: date_of_death ? date_of_death : null,
      image_url: image_url,
      famous_for: famous_for
    };
    const updatedFamous = [...famous, newFamous];

    writeFileSync(
      path.resolve(__dirname, "../data.js"),
      `const famous = ${JSON.stringify(
        updatedFamous,
        null,
        2
      )};\n\nmodule.exports = famous;`,
      { flag: "w" }
    );
    res.status(201).json({
      success: true,
      message: "Famous person added successfully",
      data: newFamous
    });
  }
};

//update famous
const updateFamous = (req, res) => {
  const id = Number(req.params.ID);
  const famousToUpdate = famous.find((famous, index) => index + 1 === id);
  if (!famousToUpdate) {
    return res
      .status(404)
      .json({ success: false, message: `Famous of ID '${id}' not found` });
  } else {
    const {
      full_name,
      nickname,
      date_of_birth,
      date_of_death,
      image_url,
      famous_for
    } = req.body;

    if (!full_name || !date_of_birth || !image_url || !famous_for) {
      return res.status(400).json({
        success: false,
        message:
          "please provide all required details, nickname and date_of_death is option",
        example: {
          full_name: "Henry Lee",
          nickname: null,
          date_of_birth: "1990-03-30",
          date_of_death: null,
          image_url:
            "https://avatars.githubusercontent.com/u/123258064?s=400&u=8791868508ed0f62f14ea7970d7575ea979ed497&v=4",
          famous_for: "Tanzanian web developer"
        }
      });
    } else {
      let updatePerson;
      const updatedFamous = famous.map((oneFamous, index) => {
        if (index + 1 === id) {
          oneFamous.full_name = full_name;
          oneFamous.nickname = nickname ? nickname : null;
          oneFamous.date_of_birth = date_of_birth;
          oneFamous.date_of_death = date_of_death ? date_of_death : null;
          oneFamous.image_url = image_url;
          oneFamous.famous_for = famous_for;
          updatePerson = oneFamous;
        }
        return oneFamous;
      });

      writeFileSync(
        path.resolve(__dirname, "../data.js"),
        `const famous = ${JSON.stringify(
          updatedFamous,
          null,
          2
        )};\n\nmodule.exports = famous;`,
        { flag: "w" }
      );
      res.status(201).json({
        success: true,
        message: "Famous person updated successfully",
        data: updatePerson
      });
    }
  }
};

//delete famous
const deleteFamous = (req, res) => {
  const id = Number(req.params.ID);
  const famousToUpdate = famous.find((famous, index) => index + 1 === id);
  if (!famousToUpdate) {
    return res
      .status(404)
      .json({ success: false, message: `Famous of ID '${id}' not found` });
  }
  const updatedFamous = famous.filter((person, index) => {
    if (index + 1 !== id) {
      return person;
    }
  });
  writeFileSync(
    path.resolve(__dirname, "../data.js"),
    `const famous = ${JSON.stringify(
      updatedFamous,
      null,
      2
    )};\n\nmodule.exports = famous;`,
    { flag: "w" }
  );
  res.status(200).json({
    success: true,
    message: `Famous with id '${id}' deleted! successfully`
  });
};

module.exports = {
  getFamous,
  getSpecificFamous,
  createFamous,
  updateFamous,
  deleteFamous
};
