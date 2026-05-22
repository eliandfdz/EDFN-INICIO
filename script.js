document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animación de Enfoque Central Simétrica (Aparece al entrar, desaparece al salir por arriba o abajo)
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const checkVisibility = () => {
        // Obtenemos la altura total de la ventana del navegador
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            // CALIBRACIÓN DE LÍMITES (ZONA DE ENFOQUE EXTRA FLUIDA)
            // rect.top < windowHeight * 0.85  -> Aparece cuando entra un 15% desde abajo
            // rect.bottom > windowHeight * 0.15 -> Desaparece si el fondo del elemento supera el 15% superior de la pantalla
            const isVisibleInWindow = rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.23;

            if (isVisibleInWindow) {
                // Si está dentro de la zona central visible, se enciende
                element.classList.add("active");
                
                // Animación de tus números de logros (se ejecuta solo una vez por aparición)
                const statNumber = element.querySelector(".stat-number");
                if (statNumber && !statNumber.classList.contains("counted")) {
                    animateNumber(statNumber);
                }
            } else {
                // SI SE QUEDA MUY ARRIBA O MUY ABAJO: Se apaga de inmediato
                element.classList.remove("active");
            }
        });
    };

    // Escuchamos el evento de scroll y optimizamos el rendimiento con requestAnimationFrame
    let isScrolling = false;
    window.addEventListener("scroll", () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                checkVisibility();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Ejecución inicial para activar lo que ya esté en pantalla al cargar la página
    checkVisibility();

    // 2. Función para animar los números de logros
    function animateNumber(element) {
        const target = parseInt(element.getAttribute("data-target"));
        let count = 0;
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // ~60fps

        const updateCount = () => {
            count += increment;
            if (count < target) {
                element.innerText = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = target;
                element.classList.add("counted");
            }
        };
        
        updateCount();
    }
});