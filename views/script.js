function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }
  if (email == "") {
    alert("Email is required");
    return false;
  }
  if (phone == "") {
    alert("Phone Number is required");
    return false;
  }
  if (date == "") {
    alert("Date is required");
    return false;
  }
  if (time == "") {
    alert("Time is required");
    return false;
  }
  return true;
}

// Function to show data

function showData(response) {
  console.log(response);
  let html = "";

  for (let i = 0; i < response.data.length; i++) {
    html = html + "<tr>";
    html = html + "<td>" + response.data[i].id + "</td>";
    html = html + "<td>" + response.data[i].name + "</td>";
    html = html + "<td>" + response.data[i].email + "</td>";
    html = html + "<td>" + response.data[i].phone + "</td>";
    html = html + "<td>" + response.data[i].date + "</td>";
    html = html + "<td>" + response.data[i].time + "</td>";
    html =
      html +
      '<td><button class="btn btn-danger deleteBtn" value=' +
      response.data[i].id +
      '>Delete</button><button class="btn btn-warning m-2 updateBtn" value=' +
      response.data[i].id +
      ">Edit</button></td>";
    html = html + "</tr>";
  }
  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Get Data
async function getData() {
  try {
    let response = await axios.get(
      "http://localhost:7000/addappointment"
    );
    showData(response);
  } catch (error) {
    console.log(error);
  }
}

// onLoad

document.onload = getData();

// Function to Add/Post Data

async function addData() {
  try {
    // Form Validation
    if (validateForm() == true) {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;
      let date = document.getElementById("date").value;
      let time = document.getElementById("time").value;

      let response = await axios.post(
        "http://localhost:7000/addappointment",
        { name: name, email: email, phone: phone, date: date, time: time }
      );
      showData(response);

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("date").value = "";
      document.getElementById("time").value = "";

      // Get Api

      let response1 = await axios.get(
        "http://localhost:7000/addappointment"
      );
      showData(response1);
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to Delete Data

$("body").on("click", ".deleteBtn", async function () {
  try {
    let id = $(this).val();

    let response = await axios.delete(
      "http://localhost:7000/addappointment" +
        "/" +
        id
    );
    console.log(response);

    // Get Api

    let response1 = await axios.get(
      "http://localhost:7000/addappointment"
    );
    showData(response1);
  } catch (error) {
    console.log(error);
  }
});

// Function to Update/Edit Data

$("body").on("click", ".updateBtn", async function () {
  try {
    // Submit button will hide and Update button will show while clicking on edit button
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let id = $(this).val();

    let response = await axios.get(
      "http://localhost:7000/addappointment" +
        "/" +
        id
    );

    document.getElementById("name").value = response.data.name;
    document.getElementById("email").value = response.data.email;
    document.getElementById("phone").value = response.data.phone;
    document.getElementById("date").value = response.data.date;
    document.getElementById("time").value = response.data.time;

    // Update Function

    document.querySelector("#Update").onclick = async function () {
      if (validateForm() == true) {
        let response2 = await axios.get(
          "http://localhost:7000/addappointment"
        );
        let name = (response2.data.name =
          document.getElementById("name").value);
        let email = (response2.data.email =
          document.getElementById("email").value);
        let phone = (response2.data.phone =
          document.getElementById("phone").value);
        let date = (response2.data.date =
          document.getElementById("date").value);
        let time = (response2.data.time =
          document.getElementById("time").value);

        let response = await axios.put(
          "http://localhost:7000/addappointment" +
            "/" +
            id,
          { name: name, email: email, phone: phone, date: date, time: time }
        );

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";

        // Update button will hide and Submit button will show after Updating details
        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";

        // Get Data
        let response1 = await axios.get(
          "http://localhost:7000/addappointment"
        );
        showData(response1);
      }
    };
  } catch (error) {
    console.log(error);
  }
});