export default async function Header() {
   const toggleButton = document.querySelector('.header__top-toggle');
   const bottomHeader = document.querySelector('.header__bottom');


   window.addEventListener('resize', handleResize);
   handleResize();

   toggleButton.addEventListener('click', handleToggleButtonClick);

   // Hides the bottom header when the window size is 768 pixels or less.
   function handleResize() {
      if (window.innerWidth <= 768) {
         if (bottomHeader.classList.contains('visible')) {
            bottomHeader.classList.remove('visible');
         }
      } else {
         bottomHeader.classList.remove('visible');
      }
   }

   // handleToggleButtonClick toggles visibility of the bottom header
   // when the window size is 768 pixels or less and the button is clicked.
   function handleToggleButtonClick() {
      if (window.innerWidth <= 768) {
         bottomHeader.classList.toggle('visible');
      }
   }
}
