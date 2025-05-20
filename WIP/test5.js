// Test JS voor het toevoegen van continenten en de globe draaiing
document.addEventListener('DOMContentLoaded', function() {
    const continentsData = [
        { name: 'Africa', x: 15, y: -30, z: 100 },
        { name: 'Asia', x: 50, y: 30, z: 80 },
        { name: 'Europe', x: -20, y: -50, z: 120 },
        { name: 'North America', x: 30, y: 10, z: 90 },
        { name: 'South America', x: -40, y: -10, z: 80 },
        { name: 'Australia', x: -50, y: 60, z: 110 },
        { name: 'Antarctica', x: 0, y: -70, z: 130 },
    ];
    

    const continentsContainer = document.getElementById('continents');

    // Dynamisch continenten toevoegen
    continentsData.forEach(continent => {
        const continentElement = document.createElement('div');
        continentElement.classList.add('continent');
        continentElement.style.transform = `translate3d(${continent.x}%, ${continent.y}%, ${continent.z}px)`;
        continentElement.setAttribute('title', continent.name);

        continentsContainer.appendChild(continentElement);
    });
});
console.log("JavaScript is loaded!");
console.log("Continents are added to the globe!");


