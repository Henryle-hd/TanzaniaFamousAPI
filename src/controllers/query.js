const famous = require("../data");

const queryFamous = (req, res) => {
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
};

module.exports = {
  queryFamous
};
