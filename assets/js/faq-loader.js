document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-list');
    if (!faqContainer) return;

    fetch('assets/data/faq.json')
        .then(response => response.json())
        .then(data => {
            faqContainer.innerHTML = data.map(item => `
        <details>
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>
      `).join('');
        })
        .catch(error => {
            console.error('Error loading FAQ:', error);
            faqContainer.innerHTML = '<p>よくある質問を読み込めませんでした。</p>';
        });
});
