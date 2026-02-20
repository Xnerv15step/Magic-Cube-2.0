# 🧩 魔方 CFOP 公式練習網站
<img width="1920" height="922" alt="魔方CFOP公式練習網站 - Google Chrome 2026_2_20 下午 12_05_25" src="https://github.com/user-attachments/assets/79ae67b4-8e74-467c-b7c1-a3b53f070b39" />
一個專為魔術方塊愛好者打造的 CFOP 公式查詢與練習工具，提供完整的 F2L、OLL、PLL 公式庫，並內建打亂產生器與計時器功能。

---

## ✨ 功能介紹

### 📚 公式庫
- **F2L（First Two Layers）**：第一、二層公式總覽
- **OLL（Orientation of the Last Layer）**：頂層方向公式總覽
- **PLL（Permutation of the Last Layer）**：頂層排列公式總覽
- 每張公式卡片包含情境圖示、案例編號與對應演算法
- **點擊公式即可複製**到剪貼簿

### 🔍 即時搜尋
- 支援依公式編號（如 `F2L-1`）或公式內容（如 `R U R'`）進行即時過濾

### 🎲 打亂產生器
- 隨機生成 20 步標準打亂公式
- 點擊打亂公式可直接複製
- 支援一鍵重新產生

### ⏱️ 計時器
- 精確計時至百分之一秒（`mm:ss.ms` 格式）
- 支援鍵盤快捷鍵：**空白鍵（Space）** 開始 / 停止
- 停止後自動顯示完成時間並可再次複製

### 🌙 深色模式
- 一鍵切換深色 / 淺色主題
- 記憶使用者偏好（儲存於 `localStorage`）

### 📖 轉動代號說明欄
- 右側常駐說明欄，列出 `U R L D F B` 等所有轉動代號與修飾符說明

---

## 🗂️ 專案結構

```
project/
├── index.html          # 主頁面
├── style.css           # 樣式表
├── script.js           # 主程式邏輯
└── data/
    ├── f2lData.js      # F2L 公式資料
    ├── ollData.js      # OLL 公式資料
    ├── pllData.js      # PLL 公式資料
    └── notationData.js # 轉動代號說明資料
```

---

## 🚀 使用方式

此專案為純前端靜態網站，無需安裝任何套件。

1. **Clone 專案**
   ```bash
   git clone https://github.com/your-username/cfop-formula-site.git
   cd cfop-formula-site
   ```

2. **啟動本地伺服器**

   由於使用 ES Module（`type="module"`），需透過本地伺服器開啟，不能直接點擊 `index.html`。

   推薦使用 VS Code 的 **Live Server** 擴充套件，或執行：
   ```bash
   npx serve .
   ```

3. 在瀏覽器開啟 `http://localhost:3000`（或 Live Server 提供的網址）

---

## ⌨️ 快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Space` | 在首頁開始 / 停止計時器 |

---

## 🛠️ 技術細節

- **純原生 JavaScript**（ES Modules），無框架依賴
- **DOM 操作**：所有頁面內容均由 JS 動態產生，無需額外模板引擎
- **Clipboard API**：實現一鍵複製功能
- **localStorage**：儲存深色模式偏好設定

---

## 📝 資料格式說明

各公式資料檔（`f2lData.js`、`ollData.js`、`pllData.js`）匯出一個陣列，每筆資料格式如下：

```js
{
  code: "OLL-1",           // 案例編號
  algorithm: "R U R' ...", // 公式字串
  image: "images/oll1.png" // 情境圖示路徑
}
```

`notationData.js` 匯出 `moves`（轉動代號列表）與 `explanations`（修飾符說明）兩個陣列。

---

## 🤝 貢獻方式

歡迎提交 Issue 回報問題，或透過 Pull Request 新增公式、修正錯誤或改善介面。

---

## 📄 授權

MIT License
