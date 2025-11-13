// ========== CONTADOR REGRESIVO NAVIDEÑO ==========

// ⚙️ CONFIGURACIÓN: Cambiá esta fecha para tu promoción
const endDate = new Date('December 25, 2025 00:00:00').getTime();

// Función principal del contador
function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate - now;
    
    // Si la promoción terminó
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = 
            '<p style="color: #ffd700; font-size: 1.5rem; font-weight: bold; padding: 2rem;">¡La promoción ha finalizado! Gracias por tu interés 🎄</p>';
        return;
    }
    
    // Calcular tiempo restante
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Actualizar el DOM
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Inicializar contador
updateCountdown();

// Actualizar cada segundo
setInterval(updateCountdown, 1000);

// ========== EFECTOS ADICIONALES (OPCIONAL) ==========

// Animación de nieve (descomentar si querés agregar efecto de nieve)
/*
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄️';
    snowflake.style.position = 'fixed';
    snowflake.style.top = '-50px';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
    snowflake.style.opacity = Math.random();
    snowflake.style.zIndex = '9999';
    snowflake.style.pointerEvents = 'none';
    
    document.body.appendChild(snowflake);
    
    const fallDuration = Math.random() * 3 + 2;
    snowflake.style.animation = `fall ${fallDuration}s linear`;
    
    setTimeout(() => {
        snowflake.remove();
    }, fallDuration * 1000);
}

// Crear copos de nieve cada 300ms
setInterval(createSnowflake, 300);

// Agregar animación CSS para la caída
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
*/

// ========== LOG DE DEBUG (opcional, podés borrarlo) ==========
console.log('🎄 Promo Navidad cargada correctamente');
console.log('📅 Fecha fin:', new Date(endDate).toLocaleString('es-AR'));