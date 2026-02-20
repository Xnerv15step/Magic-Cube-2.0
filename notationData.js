// notationData.js
export const moves = [
  { code: 'U', desc: '頂層順時針轉90度', note: 'Up（頂層）' },
  { code: "U'", desc: '頂層逆時針轉90度', note: "U 的逆向" },
  { code: 'U2', desc: '頂層轉180度', note: '' },
  { code: 'Uw', desc: '頂層與中間層一起順時針轉90度', note: 'Up（頂層）+ 內層' },
  { code: "Uw'", desc: '頂層與中間層一起逆時針轉90度', note: "U 的逆向 + 內層" },

  { code: 'D', desc: '底層順時針轉90度', note: 'Down（底層）' },
  { code: "D'", desc: '底層逆時針轉90度', note: "D 的逆向" },
  { code: 'D2', desc: '底層轉180度', note: '' },
  { code: 'Dw', desc: '底層與中間層一起順時針轉90度', note: 'Down（底層）+ 內層' },
  { code: "Dw'", desc: '底層與中間層一起逆時針轉90度', note: "D 的逆向 + 內層" },

  { code: 'L', desc: '左層順時針轉90度', note: 'Left（左層）' },
  { code: "L'", desc: '左層逆時針轉90度', note: "L 的逆向" },
  { code: 'L2', desc: '左層轉180度', note: '' },
  { code: 'Lw', desc: '左層與中間層一起順時針轉90度', note: 'Left（左層）+ 內層' },
  { code: "Lw'", desc: '左層與中間層一起逆時針轉90度', note: "L 的逆向 + 內層" },

  { code: 'R', desc: '右層順時針轉90度', note: 'Right（右層）' },
  { code: "R'", desc: '右層逆時針轉90度', note: "R 的逆向" },
  { code: 'R2', desc: '右層轉180度', note: '' },
  { code: 'Rw', desc: '右層與中間層一起順時針轉90度', note: 'Right（右層）+ 內層' },
  { code: "Rw'", desc: '右層與中間層一起逆時針轉90度', note: "R 的逆向 + 內層" },

  { code: 'F', desc: '前層順時針轉90度', note: 'Front（前層）' },
  { code: "F'", desc: '前層逆時針轉90度', note: "F 的逆向" },
  { code: 'F2', desc: '前層轉180度', note: '' },
  { code: 'Fw', desc: '前層與中間層一起順時針轉90度', note: 'Front前層）+ 內層' },
  { code: "Fw'", desc: '前層與中間層一起逆時針轉90度', note: "F 的逆向 + 內層" },

  { code: 'B', desc: '後層順時針轉90度', note: 'Back（後層）' },
  { code: "B'", desc: '後層逆時針轉90度', note: "B 的逆向" },
  { code: 'B2', desc: '後層轉180度', note: '' },
  { code: 'Bw', desc: '後層與中間層一起順時針轉90度', note: 'Back（後層）+ 內層' },
  { code: "Bw'", desc: '後層與中間層一起逆時針轉90度', note: "B 的逆向 + 內層" },
];

export const explanations = [
  { symbol: `'`, desc: "代表為動作符號逆時針旋轉。例如：R'" },
  { symbol: '2', desc: '代表所指的這個動作要旋轉180度，即轉動兩步(次)。例如：R2' },
  { symbol: 'w', desc: '代表所指的這個動作，一次要轉動兩層。例如：Rw' },
  { symbol: 'x,y,z', desc: '用小寫 x / y / z 去代表要直接轉動整顆。' },
];
