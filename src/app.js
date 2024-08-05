/* //todo
    01.create new famous ✅
    02.get all famous ✅
    03.get specific famous ✅
    04.update famous ✅
    05.query famous
    06.delete famous✅
*/

//modules
const express = require("express");
const famous = require("./data");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

//variables
const app = express();
// const port = 5000;

//parse html
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

//get all famous
app.get("/api/famous", (req, res) => {
  res.status(200).json({ success: true, data: famous });
});

//get single famous
app.get("/api/famous/:ID", (req, res) => {
  const id = Number(req.params.ID);
  const singleFamous = famous.find((famous, index) => index + 1 === id);
  if (!singleFamous) {
    return res
      .status(404)
      .json({ success: false, message: `Famous of ID '${id}' not found` });
  }
  res.status(200).json({ success: true, data: singleFamous });
});

//create new famous
app.post("/api/famous", (req, res) => {
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
      path.resolve(__dirname, "./data.js"),
      `const famous = ${JSON.stringify(
        updatedFamous,
        null,
        2
      )};\n\nmodule.exports = famous;`,
      { flag: "w" }
    );
    res.status(201).json({ success: true, data: updatedFamous });
  }
});

// update famous
app.put("/api/famous/:ID", (req, res) => {
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
      const updatedFamous = famous.map((oneFamous, index) => {
        if (index + 1 === id) {
          oneFamous.full_name = full_name;
          oneFamous.nickname = nickname ? nickname : null;
          oneFamous.date_of_birth = date_of_birth;
          oneFamous.date_of_death = date_of_death ? date_of_death : null;
          oneFamous.image_url = image_url;
          oneFamous.famous_for = famous_for;
        }
        return oneFamous;
      });

      writeFileSync(
        path.resolve(__dirname, "./data.js"),
        `const famous = ${JSON.stringify(
          updatedFamous,
          null,
          2
        )};\n\nmodule.exports = famous;`,
        { flag: "w" }
      );
      res.status(201).json({ success: true, data: updatedFamous });
    }
  }
});

// delete famous;
app.delete("/api/famous/:ID", (req, res) => {
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
    path.resolve(__dirname, "./data.js"),
    `const famous = ${JSON.stringify(
      updatedFamous,
      null,
      2
    )};\n\nmodule.exports = famous;`,
    { flag: "w" }
  );
  res
    .status(200)
    .json({ success: true, message: `Famous with id '${id}' deleted!` });
});

//query famous
app.get("/api/v1/query", (req, res) => {
  const { search, dob, dod, nickname, famousFor, limit, page } = req.query;
  let sortedFamous = [...famous];
  if (search) {
    sortedFamous = sortedFamous.filter((person) => {
      return (
        person.full_name.toLowerCase().includes(search.toLowerCase()) ||
        (person.nickname &&
          person.nickname.toLowerCase().includes(search.toLowerCase())) ||
        (person.famous_for &&
          person.famous_for.toLowerCase().includes(search.toLowerCase()))
      );
    });
  }
  if (dob) {
    sortedFamous = sortedFamous.filter((person) => {
      return (
        person.date_of_birth && person.date_of_birth.toLowerCase().includes(dob)
      );
    });
  }
  if (dod) {
    sortedFamous = sortedFamous.filter((person) => {
      return (
        person.date_of_death && person.date_of_death.toLowerCase().includes(dod)
      );
    });
  }
  if (nickname) {
    sortedFamous = sortedFamous.filter((person) => {
      return (
        person.nickname &&
        person.nickname.toLowerCase().includes(nickname.toLowerCase())
      );
    });
  }
  if (famousFor) {
    sortedFamous = sortedFamous.filter((person) => {
      return (
        person.famous_for &&
        person.famous_for.toLowerCase().includes(famousFor.toLowerCase())
      );
    });
  }

  // Pagination
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedFamous = sortedFamous.slice(startIndex, endIndex);
  const totalResult = sortedFamous.length;
  const totalPages = Math.ceil(totalResult / pageSize);

  //check if array as not info
  if (paginatedFamous.length < 1) {
    return res
      .status(200)
      .json({ success: true, message: "no matched parameters" });
  }

  res.status(200).json({
    success: true,
    data: paginatedFamous,
    currentPage: pageNumber,
    totalPages: totalPages,
    totalItems: totalResult
  });
});

module.exports = app;
// server
// app.listen(port, (req, res) => {
//   console.log(`Server is listening on port ${port}.....`);
// });
