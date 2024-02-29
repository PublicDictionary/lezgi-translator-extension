var popup = null;
var popupOpened = false;

document.addEventListener("mouseup", async function (event) {
  if (!event.target.closest(".translation-popup")) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    setTimeout(function () {
      var selection = window.getSelection();
      var selectedText = selection.toString().trim();
      if (selectedText && selectedText.split(/\s+/).length === 1) {
        var range = selection.getRangeAt(0);
        var rect = range.getBoundingClientRect();
        var scrollY = window.scrollY || window.pageYOffset;
        var scrollX = window.scrollX || window.pageXOffset;

        // Рассчитываем координаты позиционирования попапа с учетом прокрутки
        var popupTop = rect.bottom + scrollY;
        var popupLeft = rect.left + scrollX;

        // Создать попап элемент
        popup = document.createElement("div");
        popup.classList.add("translation-popup");
        popup.style.cssText = `
        min-width: 200px;
        position: absolute;
        top: ${popupTop + 5}px;
        left: ${popupLeft}px;
        background-color: white;
        padding: 0px;
        z-index: 9147483648;
        box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.1);
      `;

        const lezLabel = document.createElement("p");
        lezLabel.textContent = "Лезгинский";
        lezLabel.style.cssText = `
        color: #636363;
        font-size: 11px;
        margin: 0;
        padding: 5px 0;
        text-transform: uppercase;
        `;

        const selectedTextH6 = document.createElement("h6");
        selectedTextH6.textContent = selectedText;
        selectedTextH6.style.cssText = `
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: initial;
        `;

        const ruLabel = document.createElement("p");
        ruLabel.textContent = "Русский";
        ruLabel.style.cssText = `
        color: #636363;
        font-size: 12px;
        margin: 0;
        padding: 5px 0;
        text-transform: uppercase;
      `;

        const translatedTextH6 = document.createElement("h6");
        translatedTextH6.textContent = "[перевод]";
        translatedTextH6.style.cssText = `
        font-size: 16px;
        font-weight: 600;
        text-transform: initial;
        margin-bottom: 0px;
      `;

        const content = document.createElement("div");
        content.style.cssText = `
        padding: 16px;
        `;

        content.appendChild(lezLabel);
        content.appendChild(selectedTextH6);
        content.appendChild(ruLabel);
        content.appendChild(translatedTextH6);

        const footerSpan = document.createElement("span");
        footerSpan.textContent = "@ 2024 ";

        const footerLink = document.createElement("a");
        footerLink.textContent = "PublicDictionary";
        footerLink.style.cssText = `
        text-decoration: none;
        color: #577453;
        transition: opacity 0.25s ease-in-out;
        font-size: 14px;
        line-height: 22px;
        font-family: Arial, Helvetica, 'Nimbus Sans L', sans-serif;
        `;

        const footer = document.createElement("div");
        footer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: #EFEFF0;
        padding: 12px 16px;
        font-weight: 500;
        font-size: 14px;
        margin: 4px;
        `;

        footerLink.href = "https://publicdictionary.org/";
        footerLink.target = "_blank";
        footer.appendChild(footerSpan);
        footer.appendChild(footerLink);

        popup.appendChild(content);
        popup.appendChild(footer);

        document.body.appendChild(popup);

        // Устанавливаем флаг, что попап открыт
        popupOpened = true;
      }
    }, 1);
  }
});

// Обработчик события клика на документ
document.addEventListener("click", function (event) {
  if (popupOpened) {
    const isClickPopup = event.target.closest(".translation-popup") !== null;
    if (!isClickPopup) {
      const translationPopups = document.querySelectorAll(".translation-popup");
      translationPopups.forEach((popup) => {
        document.body.removeChild(popup);
      });
      popupOpened = false;
    }
  }
});
