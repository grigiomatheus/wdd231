const urlQueryParameters = window.location.search
  .replace("?", "")
  .replace("%40", "@")
  .split("&");

const urlParams = urlQueryParameters.reduce((acc, param) => {
  const [key, value] = param.split("=");
  acc[key] = value;
  return acc;
}, {});

var formData = document.getElementById("form-data");

formData.innerHTML = "";

var firstName = urlParams["first-name"];
var lastName = urlParams["last-name"];
var title = urlParams["title"];
var email = urlParams["email"];
var phone = urlParams["cell-phone"];
var organizationName = urlParams["organization-name"];
var membershipLevel = urlParams["membership-level"];
var description = urlParams["description"];

var parameters = [
    {
        label: "First Name",
        value: firstName
    },
    {
        label: "Last Name",
        value: lastName
    },
    {
        label: "Title",
        value: title
    },
    {
        label: "Email",
        value: email
    },
    {
        label: "Cell Phone",
        value: phone
    },
    {
        label: "Organization Name",
        value: organizationName
    },
    {
        label: "Membership Level",
        value: membershipLevel
    },
    {
        label: "Description",
        value: description
    }
]

parameters.forEach((param) => {
    var label = document.createElement("p");
    var value = document.createElement("p");

    label.classList.add("label");
    label.innerHTML = `${param.label}:`;

    value.classList.add("label-value");
    value.innerHTML = param.value;

    formData.appendChild(label);
    formData.appendChild(value);
});