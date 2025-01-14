document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
      const logo = document.querySelector('.logo');
        const aboutSection = document.querySelector('.about-section');
            const aboutHeader = document.querySelector('.about-section h2');
            const aboutParagraph = document.querySelectorAll('.about-section p');
              const aboutList = document.querySelector('.about-section ul');
    const toggleButton = document.getElementById('light-mode-toggle');
    const nav_button = document.querySelectorAll('nav ul li a');
     const formatButton = document.querySelectorAll('.format-btn');


    if (localStorage.getItem('lightMode') === 'enabled') {
        enableLightMode();
        toggleButton.classList.add('active');
      }
       // Function to toggle light mode on button
     toggleButton.addEventListener('click', () => {
        if(body.classList.contains('light-mode')){
              disableLightMode();
              toggleButton.classList.remove('active');
              localStorage.setItem('lightMode', 'disabled');
          }else{
             enableLightMode();
             toggleButton.classList.add('active');
              localStorage.setItem('lightMode', 'enabled');
          }
    });


  function enableLightMode(){
      body.classList.add('light-mode');
      logo.classList.add('light-mode');
       aboutSection.classList.add('light-mode');
      aboutHeader.classList.add('light-mode');
       aboutList.classList.add('light-mode');
      aboutParagraph.forEach(element => {
           element.classList.add('light-mode')
        });
     nav_button.forEach(element => {
            element.classList.add('light-mode')
        });

          formatButton.forEach(element => {
            element.classList.add('light-mode')
        });

  }
function disableLightMode(){
    body.classList.remove('light-mode');
    logo.classList.remove('light-mode');
      aboutSection.classList.remove('light-mode');
    aboutHeader.classList.remove('light-mode');
      aboutList.classList.remove('light-mode');
   aboutParagraph.forEach(element => {
           element.classList.remove('light-mode')
        });

        nav_button.forEach(element => {
            element.classList.remove('light-mode')
        });
         formatButton.forEach(element => {
            element.classList.remove('light-mode')
        });
  }
});