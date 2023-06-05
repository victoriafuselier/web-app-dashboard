// =================================================
//                     ALERT
// =================================================   

const alertBanner = document.getElementById('alert');

alertBanner.innerHTML = `
    <div class = 'alert-banner'>
        <p class= 'alert-banner-close'>x</p>
        <p class='alert-banner-msg'><strong>Alert:</strong> You have <strong>6</strong> unread messages</p>
    </div>
`;

alertBanner.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains('alert-banner-close')) {
        alertBanner.style.display = 'none';
    }
})

// =================================================
//                 TRAFFIC CHART
// ================================================= 

const trafficCanvas = document.getElementById('traffic-chart');

let trafficData = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]

};

let trafficOptions = {
    backgroundColor: 'rgba(112, 104, 201, .5)',
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});

const hourlyData = [383, 939, 1039, 333, 290, 1200, 782, 983, 200, 123, 432, 211];
const dailyData = [102, 899, 765, 678, 897, 711, 345];
const weeklyData = [1230, 3453, 2499, 1483, 3235, 2003, 4287, 1239, 3236, 4981];
const monthlyData = [9382, 3982, 8173, 7365, 9037, 8014, 9038, 3092, 5162, 3837, 6049, 7980]


const trafficNav = document.getElementById('traffic-nav');
const trafficLinks = trafficNav.querySelectorAll('.traffic-nav-links');

const updateTrafficChart = (labelToDisplay, dataToDisplay) => {
    // Set labels depending on what labels parameter is passed in from event listener
    if (labelToDisplay === 'hourly') {
        // Set hourly labels
        trafficData.labels = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'];
    } else if (labelToDisplay === 'daily') {
        // Set daily labels
        trafficData.labels = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    } else if (labelToDisplay === 'weekly') {
        // Set weekly labels
        trafficData.labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '25-31'];
    } else if (labelToDisplay === 'monthly') {
        // Set monthly labels
        trafficData.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
    // Set data depending on what datasets parameter is passed in from event listener
    trafficData.datasets[0].data = dataToDisplay;
    // Update traffic chart with new labels and data
    trafficChart.update();
};

const toggleClass = (element, arr, state) => {
    // For each item in the array that is passed in..
    for (let i = 0; i < arr.length; i++) {
        // ..check if that array item contains the class--or state--and if so..
        if (arr[i].classList.contains(state)) {
        // ..remove the class or state from that item..
            arr[i].classList.remove(state);
        }
    }
    // Add the class--or state--to the element passed in
    element.classList.add(state);
};

trafficNav.addEventListener('click', (e) => {
    // Check if clicked element is an li element
    if (e.target.tagName === 'LI') {
        let clickedLink = e.target;
        // If it is, add active state class to clicked li element
        toggleClass(clickedLink, trafficLinks, 'active');
        // If the hourly link is clicked..
        if (clickedLink.textContent === 'Hourly') {
            // ..then run function to update chart to display hourly data
            updateTrafficChart('hourly', hourlyData);
        } else if (clickedLink.textContent === 'Daily') {
            // ..then run function to update chart to display daily data
            updateTrafficChart('daily', dailyData);
        } else if (clickedLink.textContent === 'Weekly') {
            // ..then run function to update chart to display weekly data
            updateTrafficChart('weekly', weeklyData);
        } else if (clickedLink.textContent === 'Monthly') {
            // ..then run function to update chart to display daily data
            updateTrafficChart('daily', monthlyData);
        }
    }
});

// =================================================
//               DAILY TRAFFIC CHART
// ================================================= 

const dailyCanvas = document.getElementById('daily-traffic-chart');

const dailyTrafficData = {
    labels: ['S', 'M', 'T', 'W', 'TH', 'F', 'S'],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyTrafficOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyTrafficData,
    options: dailyTrafficOptions
});

// =================================================
//               MOBILE USERS CHART
// ================================================= 

const mobileCanvas = document.getElementById('mobile-users-chart');

const mobileData = {
    labels: ['Desktop', 'Tablet', 'Phones'],
    datasets: [{
        label: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }],
}

const mobileOptions = {
    aspectRatio: 1.9,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                fontStyle: 'bold'
            }
        }
    }
};

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

// =================================================
//                  MESSAGE FORM
// ================================================= 

const user = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');

send.addEventListener('click', () => {
    // ensure user and message fields are filled out
    if (user.value === '' && message.value === '') {
        alert('Please fill out user and message fields before sending');
    } else if (user.value === '') {
        alert('Please fill out user field before sending');
    } else if (message.value === '') {
        alert('Please fill out message field before sending');
    } else {
        alert(`Message successfully sent to: ${user.value}`);
    }
});

// =================================================
//                RESPONSIVE RESIZING
// ================================================= 

function beforePrintHandler () {
    for (let id in Chart.instances) {
        Chart.instances[id].resize();
    }
}
 
window.addEventListener('beforeprint', () => {
    myChart.resize(600, 600);
  });
  window.addEventListener('afterprint', () => {
    myChart.resize();
  });

// =================================================
//              SEARCH BAR AUTOCOMPLETE
// =================================================  

const namesList = [
    'Victoria Chambers',
    'Dale Byrd',
    'Dawn Wood',
    'Dan Oliver'
];

function autocomplete(inp, arr) {
    // the function takes two arguments, the text field element and array of possible autocomplete values
    var currentFocus;
    // executes a function when someone types in the search bar
    inp.addEventListener('input', function(e) {
        var a, b, i, val = this.value;
        // close any already open lists of autocompleted values
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        // create a div element that will contain the items (values)
        a = document.createElement('div');
        a.setAttribute('id', this.id + 'autocomplete-list');
        a.setAttribute('class', 'autocomplete-items');
        // append the div element as a child of the autocomplete container...
        this.parentNode.appendChild(a);
        // For each item in the array...
        for (let i = 0; i < arr.length; i++) {
            //check if item starts with same letters as the search input
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                // create a div element for each matching element
                b = document.createElement('div');
                // make matching letters bold
                b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                b.innerHTML += arr[i].substr(val.length);
                // insert an input field that will hold current array item's value
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                // execute a function when someone clicks on the item value div element
                b.addEventListener('click', function(e) {
                    // insert the value for the autocomplete text field
                    inp.value = this.getElementsByTagName('input')[0].value;
                    // close list of autocompleted values or any other open lists of autocomplete values
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    // execute a function when user presses a key on the keyboard
    inp.addEventListener('keydown', function(e) {
        var x = document.getElementById(this.id + 'autocomplete-list');
        if (x) x = x.getElementsByTagName('div');
        if (e.keyCode == 40) {
            // If the down arrow key is pressed, increase the currentFocus variable
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            // If the up arrow key is pressed, decrease the currentFocus variable..
            currentFocus--;
            // ..and make the current item more visible;
            addActive(x);
        } else if (e.keyCode == 13) {
            // If the enter key is pressed, prevent form from being submitted...
            e.preventDefault();
            if (currentFocus > -1) {
                // ..and simulate a click on the active item
                if (x) x[currentFocus].click();
            } 
        }
    });
    function addActive(x) {
        // a function to classify an item as 'active'
        if (!x) return false;
        // start by removing the active class on all items
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        // add class 'autocomplete-active'
        x[currentFocus].classList.add('autocomplete-active');
    }
    function removeActive(x) {
        // a function to remove the active class from all autocomplete items
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active');
        }
    }
    function closeAllLists(elmnt) {
        // close all autocomplete lists in the document, except the one passed as an argument
        var x = document.getElementsByClassName('autocomplete-items');
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    // execute a function when someone clicks in the document
    document.addEventListener('click', function(e) {
        closeAllLists(e.target);
    });
}
