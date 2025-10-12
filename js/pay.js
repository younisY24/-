document.addEventListener('DOMContentLoaded', () => {

    // الحصول على جميع العناصر المطلوبة من الصفحة
    const paymentMethods = document.querySelectorAll('.payment-method');
    const telegramContainer = document.getElementById('telegram-button-container');
    const backButton = document.getElementById('backButton');
    
    // العناصر الخاصة بتفاصيل الدفع
    const zainCashDetails = document.getElementById('zain-cash-details');
    const visaDetails = document.getElementById('visa-details');
    const userDetailsContainer = document.getElementById('user-details-container');
    const copyButtons = document.querySelectorAll('.copy-btn');

    // متغير لتخزين المؤقت (Timer) لتجنب تشغيله عدة مرات
    let processingTimer;

    // إضافة حدث النقر لكل زر من أزرار الدفع
    paymentMethods.forEach(button => {
        button.addEventListener('click', () => {
            const selectedMethod = button.dataset.method;
            console.log(`تم اختيار طريقة الدفع: ${selectedMethod}`);

            // 1. إلغاء أي مؤقت قيد التشغيل لمنع حدوث مشاكل
            clearTimeout(processingTimer);

            // 2. إخفاء جميع تفاصيل الدفع أولاً
            zainCashDetails.classList.add('hidden');
            visaDetails.classList.add('hidden');

            // 3. إظهار حقول المستخدم (الاسم والتواصل) وتركها ظاهرة
            userDetailsContainer.classList.remove('hidden');

            // 4. إظهار تفاصيل طريقة الدفع المختارة فقط
            if (selectedMethod === 'zain-cash') {
                zainCashDetails.classList.remove('hidden');
            } else if (selectedMethod === 'visa') {
                visaDetails.classList.remove('hidden');
            }
            // (ماستر كارد ليس لديه تفاصيل إضافية في الوقت الحالي)

            // 5. بدء عملية محاكاة الدفع وإظهار زر التلكرام فقط إذا كان مخفيًا
            if (telegramContainer.classList.contains('hidden')) {
                processingTimer = setTimeout(() => {
                    telegramContainer.classList.remove('hidden');
                    // التمرير السلس إلى زر التلكرام عند ظهوره
                    telegramContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 2000); // 2000 ميلي ثانية = ثانيتان
            }
        });
    });

    // وظيفة نسخ الأرقام (لزين كاش وفيزا)
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const numberElement = document.getElementById(targetId);
            
            // نسخ النص إلى الحافظة
            navigator.clipboard.writeText(numberElement.textContent).then(() => {
                const originalText = button.textContent;
                button.textContent = 'تم النسخ!';
                button.style.backgroundColor = '#218838';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('فشل نسخ النص: ', err);
                alert('لم يتمكن المتصفح من نسخ الرقم، يرجى النسخ يدوياً.');
            });
        });
    });

    // حدث النقر لزر العودة
    backButton.addEventListener('click', () => {
        window.history.back();
    });

});
