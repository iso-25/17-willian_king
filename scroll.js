document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.anchor');
    const menuItems = document.querySelectorAll('.header__a');
    const headerHeight = document.querySelector('header').offsetHeight;

    const screenHeight = window.innerHeight || document.documentElement.clientHeight;
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    let activeMenuItemIndex = null;

    function isPartiallyInViewport(element, topOffset, bottomOffset) {
        const rect = element.getBoundingClientRect();
        return (
            (rect.top >= topOffset && rect.top <= bottomOffset)
            || (rect.bottom >= screenHeight * 0.6 && rect.bottom <= screenHeight)
        );
    }

    function updateActiveMenuItem() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        let found = false;

        sections.forEach((section, index) => {
            const isSectionInViewport = isPartiallyInViewport(section, headerHeight, screenHeight * 0.20);

            if (!found && isSectionInViewport) {
                activeMenuItemIndex = index;
                found = true;
            }
        });

        if (found) {
            menuItems.forEach((menuItem, index) => {
                if (index === activeMenuItemIndex) {
                    menuItem.classList.add('active');
                } else {
                    menuItem.classList.remove('active');
                }
            });
        }

        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        const prevSection = sections[activeMenuItemIndex];
        
        // scroll up
        if (scrollDirection === 'up') {
            const nextSection = sections[activeMenuItemIndex - 1];
            if (((nextSection.offsetTop > headerHeight) && (nextSection.offsetTop <= (screenHeight * 0.2 - headerHeight)))
                || (prevSection.offsetTop > screenHeight * 0.9)) {
                activeMenuItemIndex -= 1;
            }
        }

        // scroll down
        if (scrollDirection === 'down') {
            const nextSection = sections[activeMenuItemIndex + 1];
            if (prevSection.bottomOffset < (screenHeight * 0.9) && nextSection.offsetTop <= (screenHeight * 0.9)) {
                activeMenuItemIndex += 1;
            }

        }

        lastScrollTop = scrollTop;

    }

    window.addEventListener('scroll', updateActiveMenuItem);
    window.addEventListener('resize', updateActiveMenuItem);

    updateActiveMenuItem();
});
