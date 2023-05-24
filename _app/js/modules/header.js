export default async function Header() {

   const toggleButton = document.querySelector('.header__top-toggle');
   const bottomHeader = document.querySelector('.header__bottom');

   function handleResize() {
      if (window.innerWidth <= 768) {
         if (!bottomHeader.classList.contains('hidden')) {
            bottomHeader.classList.add('hidden');
         }
      } else {
         bottomHeader.classList.remove('hidden');
         bottomHeader.classList.remove('visible');
      }
   }

   window.addEventListener('resize', handleResize);
   handleResize(); 

   toggleButton.addEventListener('click', handleToggleButtonClick);

   function handleToggleButtonClick() {
      if (window.innerWidth <= 768) {
         bottomHeader.classList.toggle('hidden');
         bottomHeader.classList.toggle('visible');
      }
   }
}
