function getFamousPerson() {
  const id = document.getElementById("famousId").value;
  const url = `https://tanzania-famous-api.netlify.app/api/famous/${id}`;
  const resultElement = document.getElementById("getByIdResult");

  resultElement.textContent = "Loading...";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      resultElement.textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      if (
        error.name === "TypeError" &&
        (error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError"))
      ) {
        resultElement.textContent =
          "Network error: Please check your internet connection and try again.";
      } else {
        resultElement.textContent = `Error: ${error.message}`;
      }
    });
}

// Highlight active link in sidebar
document.querySelectorAll("aside a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector("aside a.active").classList.remove("active");
    this.classList.add("active");
  });
});

// Real-time update on input change
document.getElementById("famousId").addEventListener("input", getFamousPerson);
