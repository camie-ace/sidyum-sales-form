const body = document.getElementsByTagName("body")[0];

document.addEventListener("DOMContentLoaded", function () {

});

function createAPP() {
    const style = document.createElement("style");
  const script = document.createElement("script");
  script.setAttribute("src", "https://cdn.tailwindcss.com");
  style.textContent = `
      @keyframes thinking {
        0%, 80%, 100% { opacity: 0; }
        40% { opacity: 1; }
      }

      .thinking-dot {
        width: 8px;
        height: 8px;
        background-color: #6b7280;
        border-radius: 50%;
        display: inline-block;
        animation: thinking 1.4s infinite ease-in-out both;
      }

      .thinking-dot:nth-child(1) { animation-delay: -0.32s; }
      .thinking-dot:nth-child(2) { animation-delay: -0.16s; }
    `;

  document.head.appendChild(style);
  document.head.appendChild(script);
}

createAPP()
let buttonTriggerStatus = false;
let threadId = "";

function createChatInterface() {
  const container = document.createElement("div");
  if (!container) return;

  container.innerHTML = `
    <div class="relative bg-slate-400 shadow-xl border-slate-500 md:w-[400px] flex flex-col md:fixed md:h-[600px] h-[100vh] md:right-5 md:bottom-5 md:rounded-[20px] truncate" id="chat-interface">
      <div class="z-10  bg-cyan-500 px-4 py-1 fixed w-full md:w-[400px] text-white text-[30px]">
        Live Chat
        <span class="absolute right-1 cursor-pointer" onclick="hideChatInterface()">&times;</span>
      </div>
      <div id="chatMessages" class="py-[70px] overflow-y-auto h-full flex flex-col gap-6 relative">
      </div>
      <div id="thinkingAnimation" class="absolute bottom-[80px] left-4 hidden"> <div class="flex space-x-1"> <div class="thinking-dot"></div> <div class="thinking-dot"></div> <div class="thinking-dot"></div> </div> </div>
      <div class="absolute bottom-0 w-full border-b flex">
        <textarea id="messageInput" class="px-3 pl-4 py-2 outline-none w-full text-cyan- resize-none"></textarea>
        <button id="sendButton" onclick="sendMessageToNova()" class="w-auto bg-cyan-500 px-4 text-white">Send</button>
      </div>
    </div>
  `;
  body.appendChild(container);
}

function createFormInterface() {
  const container = document.createElement("div");
  if (!container) return;

  container.innerHTML = `
    <div
      class="fixed bg-[rgba(0,0,0,0.5)] flex justify-center items-center h-full w-full"
      onclick="hideFormInterface()"
      id="formOverlay"
    >
      <form
        class="bg-[#fff] w-[450px] sm:w-[350px] h-auto flex flex-col p-10 border rounded-2xl gap-2"
        id="salesForm"
      >
        <h2 class="text-cyan-500 text-center font-sans text-lg mb-4">
          Camie Tech
        </h2>
        <input
          type="text"
          class="w-[100%] border-[2px] rounded-lg px-3 py-2 text-cyan-500 focus:border-cyan-500 focus:outline-none"
          placeholder="name"
          id="nameInput"
        />
        <input
          type="text"
          class="w-[100%] border-[2px] rounded-lg px-3 py-2 text-cyan-500 focus:border-cyan-500 focus:outline-none"
          placeholder="number (+1 212 456 7890)"
          id="numberInput"
        />
        <button id="talk-with-sales" class="border bg-cyan-500 py-2 mt-3 rounded-lg text-white" type="submit">
          Talk with Sales
        </button>
      </form>
    </div>
  `;

  body.appendChild(container);
}

function addMessage(message, isUser = false) {
  const chatMessages = document.getElementById("chatMessages");
  const messageElement = document.createElement("div");
  // messageElement.setAttribute("style", "white-space: pre;");
  messageElement.className = isUser
    ? "bg-slate-300 self-end mr-3 max-w-[70%] relative w-[fit-content] py-1 px-4 break-all text-pretty rounded-lg rounded-tr-[0]"
    : "bg-cyan-500 ml-3 max-w-[70%] relative w-[fit-content] py-1 px-4 break-all text-pretty rounded-lg rounded-tl-[0]";

  messageElement.innerHTML = `
      <div class="w-0 h-0 absolute top-0 ${
        isUser
          ? "right-0 rotate-[150deg] translate-x-2"
          : "left-0 rotate-[200deg] -translate-x-2"
      } border-t-[10px] border-r-[10px] border-b-[10px] border-l-[10px] border-solid border-t-transparent  border-r-transparent border-b-${
    isUser ? "slate-300" : "cyan-500"
  } border-l-transparent"></div>
      <span>${message}</span>
    `;

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setMessageContent(message) {
  const messageSpan = document.createElement("span");
  messageSpan.textContent = message;
  return messageSpan.outerHTML;
}

async function sendMessageToNova() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  if (message) {
    messageInput.value = "";
    showThinkingAnimation();
    addMessage(message, true);
    const ans = await handleNovaAi(message);
    if (ans.error == null) {
      if (getChildCount("chatMessages") <= 2) {
        threadId = ans.threadId;
      }
      addMessage(ans.response);
    } else {
      alert("an error occured try again later");
      messageInput.value = message;
    }
  }
  hideThinkingAnimation();
}

// const vectorId = document.getElementById("info-from-bubble").dataset.fieldsid;

const handleNovaAi = async (message) => {
  const vectorId = document.getElementById("info-from-bubble").dataset.vectorid;
  if (vectorId) {
    let res = await fetch("https://ma0358.buildship.run/nova-ai", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message,
        threadId,
        vector: vectorId,
      }),
    });

    return await res.json();
  }
};

const formOverlay = document.getElementById("formOverlay");
const salesForm = document.getElementById("salesForm");
const nameInput = document.getElementById("nameInput");
const numberInput = document.getElementById("numberInput");
const salesFormSubmit = document.getElementById("talk-with-sales");

function createContactUsButton() {
  const button = document.createElement("div");
  button.innerHTML = "Contact Us";
  button.id = "show-chat-call";
  button.className =
    "flex bg-cyan-500 w-auto fixed bottom-5 right-2.5 p-4 rounded-2xl text-white h-auto hover:bg-cyan-600 cursor-pointer";
  button.style.display = "none";

  body.appendChild(button);

  function show() {
    button.style.display = "flex";
  }

  function hide() {
    button.style.display = "none";
  }

  return { show, hide };
}

function createRequestCallButton() {
  const button = document.createElement("div");
  button.innerHTML = "Request a call";
  button.id = "request-call-from-vapi";
  button.className =
    "bg-cyan-500 w-auto h-auto fixed bottom-[30px] right-[140px] p-4 rounded-full text-white hover:bg-cyan-600 cursor-pointer";
  button.style.display = "none";

  body.appendChild(button);

  function show() {
    button.style.display = "block";
  }

  function hide() {
    button.style.display = "none";
  }

  return { show, hide };
}

function createChatButton() {
  const button = document.createElement("div");
  button.innerHTML = "Chat with Us";
  button.id = "chat-box-opened";
  button.className =
    "bg-cyan-500 w-auto h-auto fixed bottom-[100px] right-[10px] p-4 rounded-full text-white hover:bg-cyan-600 cursor-pointer";
  button.style.display = "none";

  body.appendChild(button);

  function show() {
    button.style.display = "block";
  }

  function hide() {
    button.style.display = "none";
  }

  return { show, hide };
}

const contactUs = createContactUsButton("button");
const requestCall = createRequestCallButton("button");
const chatWithUs = createChatButton("button");

// Show the buttons
contactUs.show();

const showCallChat = document.getElementById("show-chat-call");
const showChat = document.getElementById("chat-box-opened");
const showCall = document.getElementById("request-call-from-vapi");

showCallChat &&
  showCallChat.addEventListener("click", () => {
    if (!buttonTriggerStatus) {
      requestCall.show();
      chatWithUs.show();
      buttonTriggerStatus = true;
    } else {
      buttonTriggerStatus = false;
      requestCall.hide();
      chatWithUs.hide();
    }
  });

showChat &&
  showChat.addEventListener("click", () => {
    createChatInterface();
    requestCall.hide();
    chatWithUs.hide();
    contactUs.hide();
  });

showCall &&
  showCall.addEventListener("click", () => {
    createFormInterface();

    const nameInput = document.getElementById("nameInput");
    const numberInput = document.getElementById("numberInput");
    const salesFormSubmit = document.getElementById("talk-with-sales");

    salesFormSubmit.addEventListener("click", async (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const number = numberInput.value.trim();

      if (name && number) {
        const fieldsData = JSON.parse(
          document
            .getElementById("info-from-bubble")
            .dataset.fieldsid.replace(/'/g, '"')
        );

        const aiName =
          document.getElementById("info-from-bubble").dataset.ainame;
        const businessName =
          document.getElementById("info-from-bubble").dataset.businessname;

        console.log(typeof fieldsData);

        let res = await fetch("https://ma0358.buildship.run/luna-ai", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone: number,
            fields: fieldsData,
            businessName: businessName,
            aiName: aiName,
          }),
        });

        const final_res = await res.json();
        if (final_res) {
          console.log(final_res);
        }
        // Clear the form
        nameInput.value = "";
        numberInput.value = "";
      } else {
        alert("Please fill in all fields");
      }
    });
    requestCall.hide();
    chatWithUs.hide();
    contactUs.hide();
  });

function hideFormInterface() {
  const formOverlay = document.getElementById("formOverlay");
  formOverlay.addEventListener("click", function (e) {
    if (e.target === formOverlay) {
      formOverlay.remove();
      contactUs.show();
    }
  });
}
function hideChatInterface() {
  const chatInterface = document.getElementById("chat-interface");
  chatInterface.addEventListener("click", function (e) {
    chatInterface.remove();
    contactUs.show();
    threadId = "";
  });
}

function getChildCount(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return 0;
  return element.children.length;
}

function showThinkingAnimation() {
  const animationElement = document.getElementById("thinkingAnimation");
  animationElement.classList.remove("hidden");
}

function hideThinkingAnimation() {
  const animationElement = document.getElementById("thinkingAnimation");
  animationElement.classList.add("hidden");
}
