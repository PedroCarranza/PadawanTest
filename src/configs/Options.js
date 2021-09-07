const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
        Mostrando do {from} ao {to} de {size} resultados
    </span>
);

const options = {
    pageStartIndex: 1,
    alwaysShowAllBtns: false, // Always show next and previous button
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'Primeira',
    prePageText: 'Anterior',
    nextPageText: 'Próxima',
    lastPageText: 'Última',
    nextPageTitle: 'Próxima página',
    prePageTitle: 'Página anterior',
    firstPageTitle: 'Primeira página',
    lastPageTitle: 'Última página',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
        text: '4', value: 4
    },
    {
        text: '8', value: 8
    },
    {
        text: '12', value: 12
    },
    {
        text: '16', value: 16
    },
    {
        text: '20', value: 20
    },
    ]
};

export default options;