$(document).ready(() => {
    const key_ENTER = 13;
    const key_SPACE = 32;
    $('body').keydown((e) => {
        if (e.which === key_ENTER) {
            location.href = '../battlescreen/index.html';
        }
        if (e.which === key_SPACE) {
            location.href = '../recordsTable/recordsTable.html';
        }
    });
});
