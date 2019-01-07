function controlKeys(fieldFirst, fieldSecond) {
    const firstValueField = $('.ui-state-default')[`${fieldFirst}`].innerHTML;
    const secondValueField = $('.ui-state-default')[`${fieldSecond}`].innerHTML;
    const temp = firstValueField;
    $('.ui-state-default')[`${fieldFirst}`].innerHTML = secondValueField;
    $('.ui-state-default')[`${fieldSecond}`].innerHTML = temp;
}
$(document).ready(() => {
    const key_1 = 49;
    const key_2 = 50;
    const key_3 = 51;
    const key_4 = 52;
    const key_5 = 53;
    const key_6 = 54;
    const key_7 = 55;
    const key_8 = 56;
    const numberField1 = 0;
    const numberField2 = 1;
    const numberField3 = 2;
    const numberField4 = 3;
    const numberField5 = 4;
    const numberField6 = 5;
    const numberField7 = 6;
    const numberField8 = 7;
    let startReplasements1 = numberField1 + 1;
    let startReplasements2 = numberField2 + 1;
    let startReplasements3 = numberField3 + 1;
    let startReplasements4 = numberField4 + 1;
    let startReplasements5 = numberField5 + 1;
    let startReplasements6 = numberField6 + 1;
    let startReplasements7 = numberField7 + 1;
    let startReplasements8 = numberField8 + 1;
    $('body').keydown((e) => {
        const length = document.querySelectorAll('.ui-state-default').length;
        const codeKey = key_1 + length - 1;
        if ((e.which === key_1) && (e.which < codeKey)) {
            controlKeys(numberField1, startReplasements1);
            startReplasements1 += 1;
            if (startReplasements1 >= length) {
                startReplasements1 = numberField1 + 1;
            }
        }
        if ((e.which === key_2) && (e.which < codeKey)) {
            controlKeys(numberField2, startReplasements2);
            startReplasements2 += 1;
            if (startReplasements2 >= length) {
                startReplasements2 = numberField2 + 1;
            }
        }
        if ((e.which === key_3) && (e.which < codeKey)) {
            controlKeys(numberField3, startReplasements3);
            startReplasements3 += 1;
            if (startReplasements3 >= length) {
                startReplasements3 = numberField3 + 1;
            }
        }
        if ((e.which === key_4) && (e.which < codeKey)) {
            controlKeys(numberField4, startReplasements4);
            startReplasements4 += 1;
            if (startReplasements4 >= length) {
                startReplasements4 = numberField4 + 1;
            }
        }
        if ((e.which === key_5) && (e.which < codeKey)) {
            controlKeys(numberField5, startReplasements5);
            startReplasements5 += 1;
            if (startReplasements5 >= length) {
                startReplasements5 = numberField5 + 1;
            }
        }
        if ((e.which === key_6) && (e.which < codeKey)) {
            controlKeys(numberField6, startReplasements6);
            startReplasements6 += 1;
            if (startReplasements6 >= length) {
                startReplasements6 = numberField6 + 1;
            }
        }
        if ((e.which === key_7) && (e.which < codeKey)) {
            controlKeys(numberField7, startReplasements7);
            startReplasements7 += 1;
            if (startReplasements7 >= length) {
                startReplasements7 = numberField7 + 1;
            }
        }
        if ((e.which === key_8) && (e.which < codeKey)) {
            controlKeys(numberField8, startReplasements8);
            startReplasements8 += 1;
            if (startReplasements8 >= length) {
                startReplasements8 = numberField8 + 1;
            }
        }
    });
});
