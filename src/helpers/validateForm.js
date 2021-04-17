export const validateForm = () => {
    const fieldsToValidation = document.querySelectorAll('[data-to-validate]');
    if (!fieldsToValidation.length) return;
    for (const el of fieldsToValidation) {
        if (el instanceof HTMLElement) {
            if (el.value.length > el.dataset.toValidate) return
            const p = document.createElement('p');
            p.textContent = `this field requires at least ${el.dataset.toValidate} characters`;
            p.style.color = "red";
            p.style.fontSize = "0.8rem";
            const whetherElementHasSibling = el.nextElementSibling;
            whetherElementHasSibling
                ? el?.parentElement?.insertBefore(p, whetherElementHasSibling)
                : el.parentElement?.appendChild(p);
        }
    }
}

// export const validateForm: any = () => {
//     const fieldsToValidation = document.querySelectorAll('[data-to-validate]');
//     if (!fieldsToValidation.length) return;
//     for (const el of fieldsToValidation) {
//         if (el instanceof HTMLElement) {
//             const p = document.createElement('p');
//             p.textContent = el.dataset.toValidate!;
//             p.style.color = "red";
//             p.style.fontSize = "0.8rem";
//             const whetherElementHasBrother = el.nextElementSibling;
//             whetherElementHasBrother
//                 ? el?.parentElement?.insertBefore(p, whetherElementHasBrother)
//                 : el.parentElement?.appendChild(p);
//         }
//     }
// }