const buttons = document.querySelectorAll('.membership-card button');
const returnButtons = document.querySelectorAll('.modal-return-button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const dialogId = button.id.replace('button', 'dialog');
        const dialog = document.getElementById(dialogId);

        dialog ? dialog.showModal() : null;
    });
});

returnButtons.forEach(button => {
    button.addEventListener('click', function() {
        const dialog = button.closest('dialog');

        dialog ? dialog.close() : null;
    });
});