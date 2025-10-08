const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

// Describe un conjunto de pruebas para una funcionalidad
describe('Pruebas de regresión de búsqueda', function() {
    this.timeout(30000); // Aumenta el tiempo de espera por si el navegador tarda

    let driver;

    // Antes de cada prueba, inicializa el navegador
    beforeEach(async function() {
        // Nota: Añadir 'this.driver = driver' es una práctica común para acceder al driver
        // en hooks como afterEach si fallara la inicialización, pero con tu estructura está bien.
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Después de cada prueba, cierra el navegador
    afterEach(async function() {
        // Se recomienda una comprobación de seguridad para evitar errores si el driver nunca se inicializó
        if (driver) {
            await driver.quit();
        }
    });

    // Caso de prueba POSITIVO (Original)
    it('Debería buscar "Selenium" y mostrar resultados correctos', async function() {
        try {
            // 1. Navegar a la página web (Google)
            await driver.get('https://www.google.com');

            // 2. Encontrar el campo de búsqueda por su nombre ('q')
            const searchBox = await driver.findElement(By.name('q'));

            // 3. Escribir el término de búsqueda y presionar Enter
            await searchBox.sendKeys('Selenium', Key.RETURN);

            // 4. Esperar hasta que el título de la página cambie
            await driver.wait(until.titleContains('Selenium'), 5000);

            // 5. Verificar que el título de la página contiene el término de búsqueda
            const pageTitle = await driver.getTitle();
            expect(pageTitle).to.include('Selenium');

        } catch (error) {
            console.error('Error durante la ejecución del test POSITIVO:', error);
            throw error; // Propagar el error para que la prueba falle
        }
    });

});