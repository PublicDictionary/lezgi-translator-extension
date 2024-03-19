var popup = null;
var popupIcon = null;
var popupOpened = false;

const disabledTagNames = [
  "IMG",
  "VIDEO",
  "AUDIO",
  "SCRIPT",
  "STYLE",
  "IFRAME",
  "SVG",
];

// Функция для отображения попапа и скрытия иконки
function showTranslatinPopup({ selection, selectedText }) {
  const isValidateSelectedText = selectedText && selectedText.length > 0;

  if (isValidateSelectedText) {
    popupIcon.style.display = "none";
    const { top, left } = usePosition({ selection });
    console.log(top, left);
    CreatePopup({ top, left, selectedText });
  }
}

// Обработчик события клика на документ
document.addEventListener("mousedown", function (event) {
  if (popupOpened) {
    const clickedPopup = checkedPopup(event);
    if (!clickedPopup) {
      resetGlobalState();
    } else {
      return false;
    }
  }
});

// Обработчик выделения текста
document.addEventListener("selectionchange", async function () {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  const isValidateSelectedText = selectedText && selectedText.length > 0;

  setTimeout(() => {
    if (isValidateSelectedText) {
      resetGlobalState();
      const { top, left } = usePosition({ selection });
      CreatePopupIcon({ top, left, selection, selectedText });
      popupOpened = true;
    }
  }, 1);

  setTimeout(() => {
    if (selection.type === "Range") {
      const commonAncestor = selection.getRangeAt(0).commonAncestorContainer;
      const disabled = checkNestedTags(commonAncestor, disabledTagNames);

      if (disabled) {
        resetGlobalState();
      }
    }
  }, 2);

  // дополнение
  // await new Promise((resolve) => setTimeout(resolve, 1000));
});

// Обработчик после клика
document.addEventListener("mouseup", async () => {
  setTimeout(() => {
    var gtxTransBlock = document.getElementById("gtx-trans");
    if (gtxTransBlock) {
      gtxTransBlock.style.zIndex =
        parseInt(window.getComputedStyle(gtxTransBlock).zIndex) - 1;
    }

    const selection = window.getSelection();
    if (selection.type === "Range") {
      const commonAncestor = selection.getRangeAt(0).commonAncestorContainer;
      const disabled = checkNestedTags(commonAncestor, disabledTagNames);

      if (disabled) {
        resetGlobalState();
      }
    }
  }, 1);
});

// Создаем и добавляем попап с иконкой
const CreatePopupIcon = ({ top, left, selection, selectedText }) => {
  popupIcon = document.createElement("div");
  popupIcon.classList.add("icon-popup");
  popupIcon.style.cssText = `
width: max-width;
height: auto;
position: absolute;
top: ${top + 5}px;
left: ${left}px;
background-color: rgb(245, 245, 245);
border-radius: 5px;
border: 1px solid rgba(220, 220, 220);
z-index: 91474836489;
box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
cursor: pointer;
display: flex;
`;
  popupIcon.addEventListener("click", () =>
    showTranslatinPopup({ selection, selectedText })
  );

  const logo = document.createElement("img");
  logo.src =
    "https://cdn.jsdelivr.net/gh/PublicDictionary/lezgi-translator-extension/icons/logo.svg";
  logo.style.cssText = `
width: 32px;
height: auto;
padding: 0px;
padding: 4px;

`;
  logo.alt = "PublicDictionary Logo";

  popupIcon.appendChild(logo);
  document.body.appendChild(popupIcon);
};

// Создаем попап перевода
const CreatePopup = ({ top, left, selectedText }) => {
  popup = document.createElement("div");
  popup.classList.add("translation-popup");
  popup.style.cssText = `
  min-width: 200px;
  max-width: 300px;
  position: absolute;
  top: ${top + 5}px;
  left: ${left}px;
  background-color: white;
  padding: 0px;
  z-index: 9147483648;
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.25s ease;
`;

  setTimeout(() => {
    popup.style.opacity = 1;
  }, 10);

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
  margin: 0px;
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
  margin: 0;
  margin-bottom: 0px;
`;

  const content = document.createElement("div");
  content.style.cssText = `
  padding: 16px;
  height: max-content;
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
};

// Cброс глобального стейта
const resetGlobalState = () => {
  popup = null;
  popupIcon = null;
  popupOpened = false;
  document
    .querySelectorAll(".icon-popup, .translation-popup")
    .forEach((popup) => popup.remove());
};

// Валидация выделенного текста
const isValidateSelectedText = () => {
  const selection = window.getSelection();
  const selectedText = selection?.toString().trim();
  return selectedText && selectedText.split(/\s+/).length === 1;
};

// Возвращает top и left позицию выделенного текста
const usePosition = ({ selection }) => {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;

  // Рассчитываем координаты позиционирования попапа с учетом прокрутки
  const popupTop = rect.bottom + scrollY;
  const popupLeft = rect.left + scrollX;

  return { top: popupTop, left: popupLeft };
};

// Проверка на клик внтури попапов
const checkedPopup = (event) => {
  const isClickPopup = event.target.closest(".translation-popup") !== null;
  const isClickIconPopup = event.target.closest(".icon-popup") !== null;

  return isClickPopup || isClickIconPopup;
};

// Рекурсивно проверяем дочерние теги на доступ
function checkNestedTags(node, disabledTagNames) {
  // Проверяем текущий узел
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    disabledTagNames.includes(node.tagName)
  ) {
    return true;
  }

  // Рекурсивно проверяем дочерние узлы
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      if (checkNestedTags(node.childNodes[i], disabledTagNames)) {
        return true;
      }
    }
  }

  return false;
}
