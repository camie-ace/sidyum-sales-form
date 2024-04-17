const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", "https://camie-ace.github.io/sidyum-sales-form/styles.css");
document.head.appendChild(link);

// Create the outer container
const outerContainer = document.createElement("div");
outerContainer.classList.add("siydum-open-modal");

// Create the inner container
const innerContainer = document.createElement("div");
innerContainer.classList.add("open-model");

// Add the image
const image = document.createElement("img");
image.src =
  "https://sidyum.com/assets/MAIN-TRANSPARENT-PNG1_TJAWnDey.png?width=1280";
image.alt = "";
innerContainer.appendChild(image);

// Add the text
const text = document.createElement("p");
text.textContent = "Siydum Fitness";
innerContainer.appendChild(text);

// Add the button
const button = document.createElement("button");
button.id = "sidyum-btn-open-modal";
button.textContent = "Talk with Sales";
outerContainer.appendChild(innerContainer);
outerContainer.appendChild(button);

// Create the modal container
const modalContainer = document.createElement("div");
modalContainer.classList.add("siydum-emb-modal", "hide");

// Create the form container
const formContainer = document.createElement("div");
formContainer.classList.add("siydum-form-container");

// Add the close button
const closeButton = document.createElement("span");
closeButton.classList.add("sidyum-close");
closeButton.textContent = "×";
formContainer.appendChild(closeButton);

// Add the logo
const logo = document.createElement("img");
logo.src =
  "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F5999602d776bbd038ac7cfaec9e3a4d3.cdn.bubble.io%2Ff1606293152132x969712402646309900%2FSidyum-1_cropped.jpg?w=192&h=58&auto=compress&dpr=1&fit=max";
logo.alt = "";
formContainer.appendChild(logo);

// Add the input fields
const firstNameInput = document.createElement("input");
firstNameInput.setAttribute("id", "siydum-fn");
firstNameInput.type = "text";
firstNameInput.name = "firstname";
firstNameInput.placeholder = "First Name";
const lastNameInput = document.createElement("input");
lastNameInput.type = "text";
lastNameInput.setAttribute("id", "siydum-ln");
lastNameInput.name = "firstname";
lastNameInput.placeholder = "Last Name";
const emailInput = document.createElement("input");
emailInput.setAttribute("id", "siydum-em");
emailInput.type = "email";
emailInput.name = "firstname";
emailInput.placeholder = "Email";
const phoneInput = document.createElement("input");
phoneInput.setAttribute("id", "siydum-pn");
phoneInput.type = "tel";
phoneInput.name = "firstname";
phoneInput.placeholder = "Phone number pls with country code";
const submitButton = document.createElement("input");
submitButton.setAttribute("id", "siydum-subbtn");
submitButton.type = "submit";
submitButton.name = "submit";
submitButton.value = "Talk with Sales";

const inputContainers = [
  firstNameInput,
  lastNameInput,
  emailInput,
  phoneInput,
  submitButton,
];

inputContainers.forEach((input) => {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("siydum-input-con");
  inputContainer.appendChild(input);
  formContainer.appendChild(inputContainer);
});

modalContainer.appendChild(formContainer);
outerContainer.appendChild(modalContainer);

// Append the outer container to the document
document.querySelector(".siydum-whole-container").appendChild(outerContainer);


document
  .querySelector("#sidyum-btn-open-modal")
  .addEventListener("click", () => {
    document.querySelector(".siydum-emb-modal").classList.remove("hide");
  });

document.querySelector(".sidyum-close").addEventListener("click", () => {
  document.querySelector(".siydum-emb-modal").classList.add("hide");
});

const sub_submit_siydum_form = document.querySelector("#siydum-subbtn");
sub_submit_siydum_form?.addEventListener("click", async () => {
  sub_submit_siydum_form.disabled = true;
  sub_submit_siydum_form.classList.add("siydium-disabled-btn");
  const res = await fetch("https://ma0358.buildship.run/make-a-call", {
    method: "POST", // Specify the HTTP method as POST
    headers: {
      "Content-Type": "application/json", // Set the content type header
    },
    body: JSON.stringify({
      firstName: document.querySelector("#siydum-fn").value,
      lastName: document.querySelector("#siydum-ln").value,
      email: document.querySelector("#siydum-em").value,
      number: document.querySelector("#siydum-pn").value,
    }), // Add the data to the request body
  });
  const result = await res.json();

  if (result.status === 201) {
    // Create the main container div
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";

    // Create the image element
    const image = document.createElement("img");
    image.src = "https://camie-ace.github.io/sidyum-sales-form/good.jpg";
    image.width = 100;
    image.height = 100;
    image.alt = "";

    // Create the message span
    const message = document.createElement("span");
    message.textContent = "You would recieve a call in a minutes";

    // Append the image and message to the container

    container.appendChild(image);
    container.appendChild(message);
    formContainer.innerHTML = "";
    formContainer.appendChild(logo);
    formContainer.appendChild(closeButton);
    formContainer.appendChild(image);
    formContainer.appendChild(message);
    setTimeout(() => {
      document.querySelector(".sidyum-close").click();
    }, 3000);
  } else {
    alert(result.data.message[0]);
    sub_submit_siydum_form.disabled = false;
    sub_submit_siydum_form.classList.remove("siydium-disabled-btn");
  }
});
