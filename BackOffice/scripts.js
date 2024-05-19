// Example chart for Fundos Angariados
const fundosCtx = document.getElementById('fundosChart').getContext('2d');
const fundosChart = new Chart(fundosCtx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Fundos Angariados',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});

// Example chart for Visitantes
const visitantesCtx = document.getElementById('visitantesChart').getContext('2d');
const visitantesChart = new Chart(visitantesCtx, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [{
            label: 'Visitantes',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});

// Example chart for Donativos
const donativosCtx = document.getElementById('donativosChart').getContext('2d');
const donativosChart = new Chart(donativosCtx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Donativos',
            data: [10, 15, 8, 12, 7, 10],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});