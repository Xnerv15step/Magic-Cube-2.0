// 1. 匯入所有資料
import { f2lCases } from './f2lData.js';
import { ollCases } from './ollData.js';
import { pllCases } from './pllData.js';
import { moves, explanations } from './notationData.js';

// 2. 選取 DOM 元素
const navButtons = document.querySelectorAll('.nav-button');
const contentDisplay = document.getElementById('content-display');
const themeBtn = document.getElementById('dark-mode-toggle');
const searchInput = document.getElementById('formula-search');

// 3. 全域變數
let timerInterval = null;
let startTime = 0;
let currentData = []; // 儲存當前頁面的原始資料供搜尋使用

/**
 * 建立自動消失提示 (Toast)
 */
function showToast(message, contentToCopy) {
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = message;
    toast.style.cursor = 'pointer';

    toast.addEventListener('click', function() {
        if (contentToCopy) {
            navigator.clipboard.writeText(contentToCopy);
            toast.textContent = '再次複製成功！';
        }
    });

    document.body.appendChild(toast);
    window.setTimeout(function() {
        toast.classList.add('fade-out');
        window.setTimeout(function() {
            if (document.body.contains(toast)) { document.body.removeChild(toast); }
        }, 300);
    }, 2000);
}

/**
 * 產生隨機打亂
 */
function generateScramble() {
    const moveList = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = [];
    let lastMove = "";
    for (let i = 0; i < 20; i++) {
        let move;
        do { move = moveList[Math.floor(Math.random() * moveList.length)]; } while (move === lastMove);
        const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        scramble.push(move + modifier);
        lastMove = move;
    }
    return scramble.join(" ");
}

/**
 * 計時器邏輯
 */
function toggleTimer() {
    const timerDisplay = document.querySelector('.timer-display');
    const timerContainer = document.querySelector('.timer-container');
    const startBtn = document.querySelector('.timer-button');
    if (!timerDisplay || !timerContainer || !startBtn) return;

    if (!timerInterval) {
        startTime = Date.now();
        timerContainer.classList.add('timer-running');
        timerInterval = window.setInterval(function() {
            const diff = Date.now() - startTime;
            const ms = Math.floor((diff % 1000) / 10).toString().padStart(2, '0');
            const sec = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
            const min = Math.floor(diff / 60000).toString().padStart(2, '0');
            timerDisplay.textContent = min + ':' + sec + '.' + ms;
        }, 10);
        startBtn.textContent = '停止';
    } else {
        window.clearInterval(timerInterval);
        timerInterval = null;
        timerContainer.classList.remove('timer-running');
        showToast('完成時間：' + timerDisplay.textContent, timerDisplay.textContent);
        startBtn.textContent = '重新開始';
    }
}

/**
 * 建立卡片零件
 */
function createFormulaCard(item) {
    const card = document.createElement('div');
    card.className = 'formula-card';
    const imgDiv = document.createElement('div');
    imgDiv.className = 'case-image';
    const img = document.createElement('img');
    img.src = item.image;
    img.onerror = function() { this.src = 'https://via.placeholder.com'; };
    imgDiv.appendChild(img);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'card-info';
    const codeDiv = document.createElement('div');
    codeDiv.className = 'case-code';
    codeDiv.textContent = item.code;
    const algoDiv = document.createElement('div');
    algoDiv.className = 'case-algorithm';
    algoDiv.textContent = item.algorithm;

    algoDiv.addEventListener('click', function() {
        navigator.clipboard.writeText(item.algorithm);
        showToast('已複製公式：' + item.algorithm, item.algorithm);
    });

    infoDiv.appendChild(codeDiv);
    infoDiv.appendChild(algoDiv);
    card.appendChild(imgDiv);
    card.appendChild(infoDiv);
    return card;
}

/**
 * 搜尋過濾邏輯
 */
if (searchInput) {
    searchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.toUpperCase();
        const filteredData = currentData.filter(function(item) {
            return item.code.toUpperCase().includes(searchTerm) || 
                   item.algorithm.toUpperCase().includes(searchTerm);
        });

        const grid = document.querySelector('.formula-grid');
        if (grid) {
            grid.innerHTML = '';
            filteredData.forEach(function(item) {
                grid.appendChild(createFormulaCard(item));
            });
        }
    });
}

/**
 * 渲染主內容
 */
/**
 * 核心渲染函式：負責根據點擊的按鈕顯示對應的 HTML 內容
 * @param {string} pageKey - 頁面代碼 (home, F2L, OLL, PLL)
 */
function renderContent(pageKey) {
    // 1. 每次渲染前徹底清空內容區，防止舊頁面殘留
    contentDisplay.innerHTML = '';
    
    // 2. 處理搜尋框的顯示邏輯
    // 只有在公式頁面（非首頁）才顯示搜尋容器
    if (searchInput && searchInput.parentElement) {
        searchInput.value = ''; // 切換頁面時清空搜尋字元
        if (pageKey === 'home') {
            searchInput.parentElement.style.display = 'none';
        } else {
            searchInput.parentElement.style.display = 'flex';
        }
    }

    // 3. 根據分頁標籤進行渲染
    if (pageKey === 'home') {
        // --- [首頁：渲染歡迎訊息] ---
        const welcome = document.createElement('div');
        welcome.className = 'welcome-message';
        welcome.textContent = '歡迎來到魔術方塊公式庫';
        contentDisplay.appendChild(welcome);

        // --- [首頁：渲染隨機打亂區塊] ---
        const scrambleContainer = document.createElement('div');
        scrambleContainer.className = 'scramble-container';
        
        const scrambleTitle = document.createElement('h3');
        scrambleTitle.textContent = '隨機打亂練習';
        
        const scrambleText = document.createElement('div');
        scrambleText.className = 'scramble-text';
        scrambleText.id = 'current-scramble'; // 增加 ID 方便追蹤
        scrambleText.textContent = generateScramble();
        scrambleText.title = '點擊即可複製打亂公式';
        
        // 點擊打亂碼複製功能
        scrambleText.addEventListener('click', function() {
            const textToCopy = scrambleText.textContent;
            navigator.clipboard.writeText(textToCopy);
            showToast('打亂公式已複製！', textToCopy);
        });

        // 換一個按鈕
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'refresh-button';
        refreshBtn.textContent = '換一個打亂';
        refreshBtn.addEventListener('click', function() { 
            scrambleText.textContent = generateScramble(); 
        });
        
        scrambleContainer.appendChild(scrambleTitle);
        scrambleContainer.appendChild(scrambleText);
        scrambleContainer.appendChild(refreshBtn);
        contentDisplay.appendChild(scrambleContainer);

        // --- [首頁：渲染計時器區塊] ---
        const timerContainer = document.createElement('div');
        timerContainer.className = 'timer-container';
        
        const timerDisplay = document.createElement('div');
        timerDisplay.className = 'timer-display';
        timerDisplay.id = 'main-timer'; // 增加 ID
        timerDisplay.textContent = '00:00.00';
        
        const startBtn = document.createElement('button');
        startBtn.className = 'timer-button';
        startBtn.textContent = '開始計時 (Space)';
        
        // 綁定計時器開關
        startBtn.addEventListener('click', function() {
            toggleTimer();
        });
        
        timerContainer.appendChild(timerDisplay);
        timerContainer.appendChild(startBtn);
        contentDisplay.appendChild(timerContainer);

    } else {
        // --- [公式頁：渲染 F2L / OLL / PLL] ---
        let titleText = '';

        // 根據 key 綁定全域資料 currentData (供搜尋功能過濾)
        if (pageKey === 'F2L') { 
            currentData = f2lCases; 
            titleText = 'F2L 公式庫'; 
        } else if (pageKey === 'OLL') { 
            currentData = ollCases; 
            titleText = 'OLL 公式庫'; 
        } else if (pageKey === 'PLL') { 
            currentData = pllCases; 
            titleText = 'PLL 公式庫'; 
        }

        // 建立頁面標題
        const title = document.createElement('h2');
        title.className = 'page-title';
        title.textContent = titleText;
        contentDisplay.appendChild(title);

        // 建立網格容器並填充公式卡片
        const grid = document.createElement('div');
        grid.className = 'formula-grid';
        
        // 遍歷當前資料集，逐一建立 DOM 元素
        currentData.forEach(function(item) {
            const card = createFormulaCard(item);
            grid.appendChild(card);
        });
        
        contentDisplay.appendChild(grid);
    }
}

/**
 * 深色模式切換
 */
if (themeBtn) {
    if (localStorage.getItem('theme') === 'dark') { document.body.classList.add('dark-mode'); }
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

// 4. 事件綁定與初始化
navButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        if (timerInterval) { window.clearInterval(timerInterval); timerInterval = null; }
        navButtons.forEach(function(btn) { btn.classList.remove('active'); });
        button.classList.add('active');
        renderContent(button.getAttribute('data-page'));
    });
});

window.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        const activeNav = document.querySelector('.nav-button.active');
        if (activeNav && activeNav.getAttribute('data-page') === 'home') {
            event.preventDefault();
            toggleTimer();
        }
    }
});

/**
 * 初始化右側說明欄 (MoveNotationTable)
 */
function initNotationTable() {
    const aside = document.querySelector('.move-notation-table');
    if (!aside) return;
    aside.innerHTML = '';

    // 1. 建立標題
    const title = document.createElement('h2');
    title.className = 'notation-title';
    title.textContent = '魔方轉動代號';
    aside.appendChild(title);

    // 2. 建立表格
    const table = document.createElement('table');
    table.className = 'notation-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['代號', '描述', '備註'].forEach(function(text) {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    moves.forEach(function(item) {
        const tr = document.createElement('tr');
        
        const tdCode = document.createElement('td');
        tdCode.className = 'td-code';
        tdCode.textContent = item.code;

        const tdDesc = document.createElement('td');
        tdDesc.textContent = item.desc;

        const tdNote = document.createElement('td');
        tdNote.className = 'td-note';
        tdNote.textContent = item.note;

        tr.appendChild(tdCode);
        tr.appendChild(tdDesc);
        tr.appendChild(tdNote);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    aside.appendChild(table);

    // 3. 建立說明區塊
    const section = document.createElement('section');
    const subTitle = document.createElement('h3');
    subTitle.className = 'explanation-title';
    subTitle.textContent = '說明';
    section.appendChild(subTitle);

    const ul = document.createElement('ul');
    ul.className = 'explanation-list';
    explanations.forEach(function(item) {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.textContent = item.symbol;
        li.appendChild(strong);
        li.appendChild(document.createTextNode(' ：' + item.desc));
        ul.appendChild(li);
    });
    section.appendChild(ul);
    aside.appendChild(section);
}

// --- 程式碼最後的執行指令 ---
initNotationTable();
renderContent('home');
