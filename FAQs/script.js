document.addEventListener('DOMContentLoaded', () => {
    const faqTabs = document.querySelector('.faq-tabs');
    const tabNavItems = document.querySelectorAll('.tab-nav li');
    const tabContents = document.querySelectorAll('.tab-content');
    const faqCards = document.querySelectorAll('.faq-card');
    const body = document.body;
    const logo = document.querySelector('.logo');
    // const toggleButton = document.getElementById('light-mode-toggle'); // Removed Toggle Button
    const nav_button = document.querySelectorAll('nav ul li a');
    const formatButton = document.querySelectorAll('.format-btn');

    // Set the default mode (dark)
    body.classList.add('dark-mode');


    tabNavItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabNavItems.forEach(el => el.classList.remove('active'));
            tabContents.forEach(el => el.classList.remove('active'));
            // Add active class to the clicked tab
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const tabContent = document.querySelector(`[data-tab-content='${tabId}']`);
            tabContent.classList.add('active');
        });
    });

    faqCards.forEach(card => {
        const header = card.querySelector('.faq-card-header');
        const content = card.querySelector('.faq-card-content');
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
});