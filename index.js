const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", "https://camie-ace.github.io/sidyum-sales-form/btn.css");
document.head.appendChild(link);
const sidy_container_holder = document.querySelector(".sidy-btn-container");

const button = document.createElement("button");

// Set the button properties
button.id = "sidyum-ebeddable-btn";
button.className = "sidyum-ebeddable-btn sidyum-ebeddable-btn-bg";
button.textContent = "Start Demo";
button.setAttribute("onclick", "createConfirmationModal()");

sidy_container_holder.append(button);

const SIDYBTN = document.getElementById("sidyum-ebeddable-btn");

const makeSidyumDemoCall = async () => {
  SIDYBTN.disabled = true;
  SIDYBTN.style.color = "white";
  document
    .getElementById("sidyum-ebeddable-btn")
    .classList.remove("sidyum-ebeddable-btn-bg");
  document
    .getElementById("sidyum-ebeddable-btn")
    .classList.add("sidyum-ebeddable-btn-cusor");

  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);
  const queryValueName = document.getElementById(
    "sidy-con-firm-modal-nameDisplay"
  ).value;
  const queryValueBusinessName = document.getElementById(
    "sidy-con-firm-modal-businessNameDisplay"
  ).value;
  const queryValueNumber = document.getElementById(
    "sidy-con-firm-modal-phoneNumberDisplay"
  ).value;
  const queryValueEmail = document.getElementById(
    "sidy-con-firm-modal-emailDisplay"
  ).value;
  console.log(queryValueName);
  console.log(queryValueBusinessName);
  console.log(queryValueNumber);
  console.log(queryValueEmail);
  document.getElementById("sidyum-ebeddable-btn").innerText =
    "I'm calling your phone now";
  const result = await fetch("https://ma0358.buildship.run/demo-ai", {
    method: "post",
    headers: {
      "Content-Type": "application/json", // Set the content type header
    },
    body: JSON.stringify({
      name: queryValueName,
      businessName: queryValueBusinessName,
      number: `${queryValueNumber}`,
      email: queryValueEmail,
    }),
  });
  var intervalId = null;

  if (result.status === 200 || result.status === 201) {
    let answer = await result.json();
    const current_call_id = answer.id;
    console.log(current_call_id);
    intervalId = setInterval(async () => {
      const call_status_result = await fetch(
        "https://ma0358.buildship.run/get_call_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type header
          },
          body: JSON.stringify({
            callId: current_call_id,
          }),
        }
      );
      answer = await call_status_result.json();
      console.log(answer);
      if (answer.call_status === "ended") {
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById("sidyum-ebeddable-btn").innerText =
          "Call on cool down";
        document
          .getElementById("sidyum-ebeddable-btn")
          .classList.add("cool-down");
        setTimeout(() => {
          updateSidyBTN();
          document
            .getElementById("sidyum-ebeddable-btn")
            .classList.remove("cool-down");
        }, 60000);
      }
    }, 20000);
  } else {
    updateSidyBTN();
    const res = await result.json();
    console.log(res);
    document.getElementById("sidyum-ebeddable-btn").innerText = "Call Failed";
    document.getElementById("sidyum-ebeddable-btn").style.color = "red";
    if (typeof res.message === "string") {
      create_sidy_modal("Sorry I can't call this number, try another number");
    } else {
      create_sidy_modal("Sorry the number provided isn't valid");
    }
    setTimeout(() => {
      document.getElementById("sidyum-ebeddable-btn").innerText = "Start Demo";
      document.getElementById("sidyum-ebeddable-btn").style.color = "black";
    }, 5000);
  }
};

function updateSidyBTN() {
  SIDYBTN.disabled = false;
  document.getElementById("sidyum-ebeddable-btn").innerText = "Start Demo";
  document
    .getElementById("sidyum-ebeddable-btn")
    .classList.add("sidyum-ebeddable-btn-bg");
  SIDYBTN.style.color = "black";
  document
    .getElementById("sidyum-ebeddable-btn")
    .classList.remove("sidyum-ebeddable-btn-cusor");
}

function create_sidy_modal(err_msg) {
  const modal = document.createElement("div");
  modal.id = "errorModal";
  modal.className = "Sidy-modal";

  // Create the modal content container
  const modalContent = document.createElement("div");
  modalContent.className = "Sidy-modal-content";

  // Create the close button
  const closeButton = document.createElement("span");
  closeButton.className = "Sidy-close";
  closeButton.innerHTML = "&times;";
  // Create the error message
  const errorMessage = document.createElement("p");
  errorMessage.textContent = err_msg;

  // Append the close button and error message to the modal content container
  modalContent.appendChild(closeButton);
  modalContent.appendChild(errorMessage);

  closeButton.addEventListener("click", () => {
    modal.remove();
  });
  // Append the modal content container to the modal container
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

/* changes to make 

pop up to confirm phone number
validate phone number using regex
pre populate pop up from url phone number paraemter

*/
function createConfirmationModal() {
  // Get the query parameters
  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);
  const name = queryParams.get("Name");
  const businessName = queryParams.get("businessName");
  const phoneNumber = queryParams.get("phoneNumber");
  const emailAdd = queryParams.get("email");

  // Create the modal elements
  const modal = document.createElement("div");
  modal.id = "sidy-con-firm-modal";
  modal.classList.add("sidy-con-firm-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("sidy-con-firm-modal-content");

  const span = document.createElement("span");
  span.classList.add("sidy-con-firm-modal-close");
  span.innerHTML = "&times;";

  const heading = document.createElement("h2");
  heading.textContent = "Please confirm your details:";

  const nameDisplay = document.createElement("p");
  const nameSpan = document.createElement("input");
  nameSpan.id = "sidy-con-firm-modal-nameDisplay";
  nameDisplay.innerHTML = "<span>Name: </span>";
  nameDisplay.appendChild(nameSpan);

  const businessNameDisplay = document.createElement("p");
  const businessNameSpan = document.createElement("input");
  businessNameSpan.id = "sidy-con-firm-modal-businessNameDisplay";
  businessNameDisplay.innerHTML = "<span>Business Name: </span>";
  businessNameDisplay.appendChild(businessNameSpan);

  const phoneNumberDisplay = document.createElement("p");
  const phoneNumberSpan = document.createElement("input");
  phoneNumberSpan.id = "sidy-con-firm-modal-phoneNumberDisplay";
  phoneNumberDisplay.innerHTML = "<span>Phone Number: </span>";
  phoneNumberDisplay.appendChild(phoneNumberSpan);

  const emailDisplay = document.createElement("p");
  const emailSpan = document.createElement("input");
  emailSpan.id = "sidy-con-firm-modal-emailDisplay";
  emailDisplay.innerHTML = "<span>Email: </span>";
  emailDisplay.appendChild(emailSpan);

  const confirmButton = document.createElement("button");
  confirmButton.id = "sidy-con-firm-modal-confirmDetailsButton";
  confirmButton.textContent = "Confirm";

  // Append elements to the modal
  modalContent.appendChild(span);
  modalContent.appendChild(heading);
  modalContent.appendChild(nameDisplay);
  modalContent.appendChild(businessNameDisplay);
  modalContent.appendChild(phoneNumberDisplay);
  modalContent.appendChild(emailDisplay);
  modalContent.appendChild(confirmButton);
  modal.appendChild(modalContent);
  document.body.append(modal);

  document.getElementById("sidy-con-firm-modal-nameDisplay").value = name;
  document.getElementById("sidy-con-firm-modal-businessNameDisplay").value =
    businessName;
  document.getElementById("sidy-con-firm-modal-emailDisplay").value = emailAdd;
  document.getElementById("sidy-con-firm-modal-phoneNumberDisplay").value =
    "+" + phoneNumber;

  // Add event listeners
  span.addEventListener("click", () => {
    modal.remove();
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  document
    .querySelector("#sidy-con-firm-modal-confirmDetailsButton")
    .addEventListener("click", () => {
      if (
        isValidPhoneNumber(
          document.getElementById("sidy-con-firm-modal-phoneNumberDisplay")
            .value
        )
      ) {
        if (
          validateEmail(
            document.getElementById("sidy-con-firm-modal-emailDisplay").value
          )
        ) {
          makeSidyumDemoCall();
          document.querySelector(".sidy-con-firm-modal-close").click();
        } else {
          create_sidy_modal("Please enter a valid email address.");
        }
      } else {
        create_sidy_modal("Please enter a valid phone number.");
      }
    });
}
function isValidPhoneNumber(phoneNumber) {
  phoneNumber = phoneNumber.replace(/\s/g, "");
  const phoneNumberPattern = /^\+1\d{10}$/;
  return phoneNumberPattern.test(phoneNumber);
}

function validateEmail(email_value) {
  const emailRegex =     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  const email = email_value.trim();
  return emailRegex.test(email);
}
