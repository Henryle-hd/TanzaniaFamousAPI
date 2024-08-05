function getFamousPerson() {
  const id = document.getElementById("famousId").value;
  const url = `https://tanzania-famous-api.netlify.app/api/famous/${id}`;
  const resultElement = document.getElementById("result");

  resultElement.textContent = "Loading...";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resultElement.textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      resultElement.textContent = "Error: " + error.message;
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
