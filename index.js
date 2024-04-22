const sidy_container_holder = document.querySelector(".sidy-btn-container");

const button = document.createElement("button");

// Set the button properties
button.id = "sidyum-ebeddable-btn";
button.className = "sidyum-ebeddable-btn sidyum-ebeddable-btn-bg";
button.textContent = "Start Demo";
button.setAttribute("onclick","makeSidyumDemoCall()");

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
  const queryValueName = queryParams.get("Name");
  const queryValueBusinessName = queryParams.get("businessName");
  const queryValueNumber = queryParams.get("phoneNumber");
  console.log(queryValueName);
  console.log(queryValueBusinessName);
  console.log(queryValueNumber);
  const result = await fetch("https://ma0358.buildship.run/demo-ai", {
    method: "post",
    headers: {
      "Content-Type": "application/json", // Set the content type header
    },
    body: JSON.stringify({
      name: queryValueName,
      businessName: queryValueBusinessName,
      number: `+${queryValueNumber}`,
    }),
  });

  if (result.status === 200 || result.status === 201) {
    setTimeout(updateSidyBTN, 120000);
  } else {
    updateSidyBTN();
    const res = await result.json();
    console.log(res);
    create_sidy_modal(res.message[0]);
  }
};

function updateSidyBTN() {
  SIDYBTN.disabled = false;
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
  closeButton.setAttribute("onclick", "del_sidy_modal()");
  // Create the error message
  const errorMessage = document.createElement("p");
  errorMessage.textContent = err_msg;

  // Append the close button and error message to the modal content container
  modalContent.appendChild(closeButton);
  modalContent.appendChild(errorMessage);

  // Append the modal content container to the modal container
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

function del_sidy_modal() {
  var sidy_close_modal_btn = document.getElementsByClassName("Sidy-close")[0];
  var sidy_close_modal = document.getElementsByClassName("Sidy-modal")[0];

  sidy_close_modal.addEventListener("click", () => {
    sidy_close_modal.remove();
  });
}
