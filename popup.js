document.getElementById("upload").addEventListener("change", function(event) {
  const file = event.target.files[0];

  Papa.parse(file, {
    header: true,
    complete: function(results) {
      console.log("parsed data csv:", results.data);
      displayData(results.data);
    }
  });
});

function displayData(data) {
  let html = "<table><tr><th>Assignment</th><th>Grade</th><th>Due Date</th><th>Category</th></tr>";
  data.forEach(row => {
    html += `<tr>
      <td>${row.Assignment || ""}</td>
      <td>${row.Grade || ""}</td>
      <td>${row.DueDate || ""}</td>
      <td>${row.Category || ""}</td>
    </tr>`;
  });
  html += "</table>";
  document.getElementById("output").innerHTML = html;
}
