// メモ帳アプリ本体

const memos = JSON.parse(localStorage.getItem('memos')) || [];
const titleInput = document.getElementById('titleInput');
const memoInput = document.getElementById('memoInput');
const memoList = document.getElementById('memoList');
const addMemoBtn = document.getElementById('addMemo');

// メモ内容を最大何文字表示するか
const MEMO_PREVIEW_LENGTH = 30;

function renderMemos() {
    memoList.innerHTML = '';
    memos.forEach((memo, idx) => {
        const li = document.createElement('li');
        li.className = 'memo-item';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'memo-title';
        titleDiv.textContent = memo.title;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'memo-content';
        // 長い場合は一部だけ表示
        let preview = memo.content;
        if (preview.length > MEMO_PREVIEW_LENGTH) {
            preview = preview.slice(0, MEMO_PREVIEW_LENGTH) + '...';
        }
        contentDiv.textContent = preview;

        const timeDiv = document.createElement('div');
        timeDiv.style.fontSize = '0.85em';
        timeDiv.style.color = '#888';
        timeDiv.style.marginTop = '6px';
        timeDiv.textContent = memo.createdAt ? `追加日時: ${memo.createdAt}` : '';

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-button';
        delBtn.textContent = '削除';
        delBtn.onclick = () => {
            memos.splice(idx, 1);
            saveMemos();
            renderMemos();
        };

        li.appendChild(titleDiv);
        li.appendChild(contentDiv);
        li.appendChild(timeDiv);
        li.appendChild(delBtn);
        memoList.appendChild(li);
    });
}

function addMemo() {
    const title = titleInput.value.trim();
    const content = memoInput.value.trim();
    if (!title && !content) return;
    const now = new Date();
    const createdAt = now.toLocaleString('ja-JP', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });
    memos.push({ title, content, createdAt });
    saveMemos();
    renderMemos();
    titleInput.value = '';
    memoInput.value = '';
}

function saveMemos() {
    localStorage.setItem('memos', JSON.stringify(memos));
}

// ...existing code...

addMemoBtn.onclick = addMemo;
renderMemos();
// ...existing code...