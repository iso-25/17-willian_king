function navToggle() {
	document.getElementById("headerUl").classList.toggle("_active");
	document.getElementById("html").classList.toggle("_overflow");
}

// JavaScript для плавної прокрутки з врахуванням висоти заголовка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
	  e.preventDefault();

	  const targetId = this.getAttribute('href').substring(1);
	  const targetElement = document.getElementById(targetId);

	  if (targetElement) {
		const headerHeight = document.querySelector('header').offsetHeight;
		const targetPosition = targetElement.offsetTop - headerHeight;

		window.scrollTo({
		  top: targetPosition,
		//   behavior: 'smooth'
		});
	  }
	});
  });