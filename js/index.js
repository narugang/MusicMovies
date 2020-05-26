window.onload = function () {
  var noticeMessage = window.open(
    "",
    "_black",
    "resizable=no, width=600px, height=290px, left=200px, top=50%"
  );
  var notiBody = noticeMessage.document.createElement("div");
  notiBody.id = "notiBody";
  notiBody.style.backgroundColor = "#343a40";
  notiBody.style.color = "white";

  var notiHeader = noticeMessage.document.createElement("div");
  notiHeader.id = "notiHeader";
  notiHeader.style.textAlign = "center";
  notiHeader.style.fontSize = "xx-large";
  notiHeader.style.padding = "20px";
  notiHeader.style.borderBottom = "1px solid white";
  notiHeader.textContent = "Lee & Kang present";

  var notiSection = noticeMessage.document.createElement("div");
  notiSection.id = "notiSection";
  notiSection.style.padding = "30px";

  var notiTitle = noticeMessage.document.createElement("div");
  notiTitle.id = "notiTitle";
  notiTitle.textContent = "Notice Message";
  notiTitle.style.fontSize = "larger";
  notiTitle.style.paddingBottom = "15px";

  var notiText = noticeMessage.document.createElement("div");
  notiText.textContent =
    "Our page is being prepared. We are sorry for the trouble.";

  var notiFooter = noticeMessage.document.createElement("div");
  notiFooter.id = "notiFooter";
  notiFooter.style.textAlign = "center";
  notiFooter.style.padding = "20px";
  notiFooter.style.borderTop = "1px solid white";
  notiFooter.textContent = "Copyrightⓒ by JKLee & THKang All Right Reserved";

  noticeMessage.document.body.appendChild(notiBody);
  var notiBodySec = noticeMessage.document.getElementById("notiBody");

  notiBodySec.appendChild(notiHeader);
  notiBodySec.appendChild(notiSection);

  var notiSec = noticeMessage.document.getElementById("notiSection");
  notiSec.appendChild(notiTitle);
  notiSec.appendChild(notiText);
  // notiBodySec.appendChild(notiTitle);
  // notiBodySec.appendChild(notiText);
  notiBodySec.appendChild(notiFooter);
};
