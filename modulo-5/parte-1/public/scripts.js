const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links a');

for ( item of menuItems ){
    if (currentPage.includes(item.getAttribute("href")))
        item.classList.add('active');
}


// Paginação
// totalPages = 20
// selectedPage = 15
// [1, ..., 13, 14, 15, 16, 17, ..., 20]

let totalPages = 20,
    selectedPage = 15,
    pages = [],
    oldPage;

for(let currentPage = 0; currentPage <= totalPages; currentPage++){

    const firstAndLastPage = currentPage == 1 || currentPage == 20;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >=  selectedPage - 2
    
    if ( firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage ) {
        if (oldPage && (currentPage - oldPage) > 2)
            pages.push('...');
        
        if (oldPage && (currentPage - oldPage) == 2)
            pages.push(oldPage + 1)
        
        pages.push(currentPage);
        oldPage = currentPage;
    }
}