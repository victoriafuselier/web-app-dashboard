// =================================================
//                     ALERT
// =================================================   

const alertBanner = document.getElementById('alert');

alertBanner.innerHTML = `
    <div class='alert-banner'>
        <p class='alert-banner-close'>x</p>
        <p class='alert-banner-msg'><strong>Alert:</strong> You have <strong>6</strong> unread messages</p>
    </div>
`;

alertBanner.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains('alert-banner-close')) {
        alertBanner.style.display = 'none';
    }
});

// =================================================
//                   NOTIFICATIONS
// =================================================   

const notificationsBell = document.getElementById('bell-icon');
const notificationDiv = document.getElementById('notification');
const notificationBanner = document.getElementById('notification');

notificationsBell.addEventListener('click', () => {
    notificationDiv.innerHTML = `
        <div class='notifications-banner'>
            <div class='notifications-text'>
                <h3 id='notifications-title'>Notifications</h3>
                <div class='notifications'>
                    <p><strong>New message</strong> from <strong>Dawn Wood</strong></p>
                    <p>10th Annual Crawfish Boil Sat 1:00 PM</p>
                    <p>Quarterly meeting 8/5/23 9:30 AM</p>
                </div>
            </div>
            <div>
                <p class='notifications-banner-close'>x</p>
            </div>
        </div>
    `;
});

notificationDiv.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains('notifications-banner-close')) {
        notificationDiv.style.display = 'none';
    };
});

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

// =================================================
//                  SAVE SETTINGS
// =================================================  

const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');
const emailCheckbox = document.getElementById('email-checkbox');
const profileCheckbox = document.getElementById('profile-checkbox');
const timezoneSelect = document.getElementById('timezone');

// Define saveSettings function and save to var saveSettings
// Function accepts a settings parameter to save info based on which of the 3 settings options are passed in
const saveSettings = settings => {
    // If settings parameter 'email' is passed in...
    if (settings === 'email') {
        // ..check is email checkbox is checked..
        if (emailCheckbox.checked) {
            // ..and if so, set email setting to on in local storage. 
            localStorage.setItem('Email Notifications', 'on');
        // Otherwise.. 
        } else {
            // ..set email setting to off in local storage.
            localStorage.setItem('Email Notifications', 'off');
        }
    }
    // Repeat block of code above to save 'profile' setting to local storage
    if (settings === 'profile') {
        if (profileCheckbox.checked) {
            localStorage.setItem('Public Profile', 'on');
        } else {
            localStorage.setItem('Public Profile', 'off');
        }
    }
    // If timezone settings parameter is passed in..
    if (settings === 'timezone') {
        // ..set var to store the timezone determined by the select index..
        let selectedTimezone = timezoneSelect[timezoneSelect.selectedIndex];
        // ..and if the select index's text matches Eastern..
        if (selectedTimezone.textContent === 'Eastern') {
            // ..set timezone setting to Eastern in local storage.
            localStorage.setItem('Timezone', 'Eastern');
            // Otherwise, repeat above code for other select options.
        } else if (selectedTimezone.textContent === 'Central') {
            localStorage.setItem('Timezone', 'Central');
        } else if (selectedTimezone.textContent === 'Mountain') {
            localStorage.setItem('Timezone', 'Mountain');
        } else if (selectedTimezone.textContent === 'Pacific') {
            localStorage.setItem('Timezone', 'Pacific');
        }
    }
};

// Event listener to run saveSettings function for all 3 settings option when save button is clicked
saveButton.addEventListener('click', () => {
    // Run saveSettings function for all 3 settings parameters
    saveSettings('email');
    saveSettings('profile');
    saveSettings('timezone');
    // Alert the user to notify that settings have been saved
    alert('Settings succesfully saved!');
});

// Event listener to cancel/erase memory of any settings previously entered or saved when cancel button is clicked
cancelButton.addEventListener('click', () => {
    // If email setting checkbox is not already in default 'off' position, switch to off
    if (emailCheckbox.checked) {
        emailCheckbox.checked = false;
    }
    // If public profile setting checkbox is not already in default 'off' position, switch to off
    if (profileCheckbox.checked) {
        profileCheckbox.checked = false;
    }
    // If timezone setting select input is not already in default 'off' position, switch to off
    if (timezoneSelect.selectedIndex > '0') {
        timezoneSelect.selectedIndex = '0';
    }
    // Clear any previously saved settings from local storage
    localStorage.clear();
});

// Store function that displays saved settings on load
const addSavedSettings = () => {
    // Get email setting from local storage
    let emailPreference = localStorage.getItem('Email Notifications');
    // If setting is saved as 'on'....
    if (emailPreference === 'on') {
        // ..then load checkbox as checked
        emailCheckbox.checked = true;
    // OR if setting is saved as 'off'..
    } else if (emailPreference === 'off'){
        // ..then load checkbox as unchecked
        emailCheckbox.checked = false;
    }
    // Repeat if else statement above for public profile setting
    let profilePreference = localStorage.getItem('Public Profile');
    if (profilePreference === 'on') {
        profileCheckbox.checked = true;
    } else if (profilePreference === 'off') {
        profileCheckbox.checked = false;
    }
    // Repeat if else statement above for timezone setting..
    // Need to set selected option via select index
    let timezonePreference = localStorage.getItem('Timezone');
    if (timezonePreference === 'Eastern') {
        timezoneSelect.selectedIndex = '1';
    } else if (timezonePreference === 'Central') {
        timezoneSelect.selectedIndex = '2';
    } else if (timezonePreference === 'Mountain') {
        timezoneSelect.selectedIndex = '3';
    } else if (timezonePreference === 'Pacific') {
        timezoneSelect.selectedIndex = '4';
    }
};

// Run function to display saved settings upon loading page
addSavedSettings();