// https://www.youtube.com/watch?v=ckJ7gdIeebc

export default function Transitions() {
   window.onload = () => {

      const transition = document.querySelector('.transition');
      const anchors = document.querySelectorAll('a');

      setTimeout(() => {
         transition.classList.remove('is-active');
      }, 500);

      for (let i = 0; i < anchors.length; i++) {
         const anchor = anchors[i];

         anchor.addEventListener('click', e => {
            e.preventDefault();
            let target = e.currentTarget.href; 

            transition.classList.add('is-active');

            setTimeout(() => {
               window.location.href = target;
            }, 100);
         })
      }
   }
}
