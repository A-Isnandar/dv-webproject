async function loadComponents() {
    const components = [
        { id: 'load-navbar', file: 'components/navbar.html' },
        { id: 'load-hero', file: 'components/hero.html' },
        { id: 'load-menu', file: 'components/menu.html' },
        { id: 'load-reservations', file: 'components/reservations.html' },
        { id: 'load-about', file: 'components/about.html' },
        { id: 'load-more', file: 'components/more.html' },
        { id: 'load-footer', file: 'components/footer.html' },
        { id: 'load-modals', file: 'components/modals.html' }
    ];

    // Kita load satu per satu
    for (const comp of components) {
        try {
            const response = await fetch(comp.file);
            if (response.ok) {
                const html = await response.text();
                document.getElementById(comp.id).innerHTML = html;
            } else {
                console.error(`Gagal load ${comp.file}`);
            }
        } catch (error) {
            console.error(`Error loading ${comp.file}:`, error);
        }
    }

    // PENTING: Setelah semua HTML masuk, baru kita jalankan logic script.js utama
    // Kita bikin event custom biar script.js tau kapan harus jalan
    document.dispatchEvent(new Event('componentsLoaded'));
}

// Jalankan fungsi saat browser buka
document.addEventListener('DOMContentLoaded', loadComponents);