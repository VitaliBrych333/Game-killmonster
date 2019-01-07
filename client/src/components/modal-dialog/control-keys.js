$(document).ready(() => {
    const key_Q = 81;
    const key_W = 87;
    const key_E = 69;
    const key_R = 82;
    const key_T = 84;
    const key_Y = 89;
    const key_U = 85;
    const key_I = 73;
    const key_O = 79;
    const key_P = 80;
    const key_A = 65;
    const key_S = 83;
    const key_D = 68;
    const key_F = 70;
    const key_G = 71;
    const key_0 = 48;
    const key_SPACE = 32; // play sound of task-audio
    $('body').keydown((e) => {
        if (e.which === key_Q) {
            $('#task').click();
        }
        if (e.which === key_W) {
            $('#taskTranslation').click();
        }
        if (e.which === key_E) {
            $('#taskPicture').click();
        }
        if (e.which === key_R) {
            $('#taskAudio').click();
        }
        if (e.which === key_T) {
            $('#taskCompare').click();
        }
        if (e.which === key_Y) {
            $('#taskWord').click();
        }
        if (e.which === key_U) {
            $('#taskConsonants').click();
        }
        if (e.which === key_I) {
            $('#taskCount').click();
        }
        if (e.which === key_O) {
            $('#taskFigure').click();
        }
        if (e.which === key_P) {
            $('#taskPoem').click();
        }
        if (e.which === key_A) {
            $('#taskSequence').click();
        }
        if (e.which === key_S) {
            $('#taskSpace').click();
        }
        if (e.which === key_D) {
            $('#taskSyllable').click();
        }
        if (e.which === key_F) {
            $('#taskTime').click();
        }
        if (e.which === key_G) {
            $('#taskVowels').click();
        }
        if (e.which === key_0) {
            $('.modal-dialog').css('display', 'none');
        }
        if (e.which === key_SPACE) {
            $('.audio p').click();
        }
    });
});
