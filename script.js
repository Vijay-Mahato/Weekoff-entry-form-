// Weekoff Calendar JavaScript - All Requirements Fulfilled
function toggleMode() {
    const checkbox = document.getElementById('halfDayCheckbox');
    const simpleMode = document.getElementById('simpleMode');
    const halfDayMode = document.getElementById('halfDayMode');
    if (checkbox.checked) {
        simpleMode.classList.add('hidden');
        halfDayMode.classList.remove('hidden');
    } else {
        halfDayMode.classList.add('hidden');
        simpleMode.classList.remove('hidden');
    }
}

function toggleRowSimple(masterCheckbox, day) {
    const checkboxes = document.querySelectorAll(`.${day}-simple`);
    checkboxes.forEach(cb => cb.checked = masterCheckbox.checked);
}

function toggleRowHalf(masterCheckbox, day) {
    const checkboxes = document.querySelectorAll(`.${day}-half`);
    checkboxes.forEach(cb => cb.checked = masterCheckbox.checked);
}

function applyDropdown(day, value) {
    const dropdowns = document.querySelectorAll(`.${day}-drop`);
    dropdowns.forEach(dropdown => dropdown.value = value);
}

function saveCalendar() {
    const isHalfDayMode = document.getElementById('halfDayCheckbox').checked;
    const calendarData = { mode: isHalfDayMode ? 'half-day' : 'simple', weekSchedule: {} };
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    if (isHalfDayMode) {
        days.forEach(day => {
            const checkboxes = document.querySelectorAll(`.${day}-half`);
            const dropdowns = document.querySelectorAll(`.${day}-drop`);
            const daySchedule = [];
            checkboxes.forEach((cb, index) => {
                daySchedule.push({
                    week: index + 1,
                    isWeekoff: cb.checked,
                    type: dropdowns[index] ? dropdowns[index].value : ''
                });
            });
            calendarData.weekSchedule[day] = daySchedule;
        });
    } else {
        days.forEach(day => {
            const checkboxes = document.querySelectorAll(`.${day}-simple`);
            const daySchedule = [];
            checkboxes.forEach((cb, index) => {
                daySchedule.push({ week: index + 1, isWeekoff: cb.checked });
            });
            calendarData.weekSchedule[day] = daySchedule;
        });
    }
    
    console.log('Calendar Data:', calendarData);
    try {
        localStorage.setItem('weekoffCalendar', JSON.stringify(calendarData));
        alert('✅ Calendar saved successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error saving calendar!');
    }
}

// ✅ REQUIREMENT 1: Cancel clears entire form
function cancelForm() {
    const confirmCancel = confirm('⚠️ Clear all data?\n\nसभी data clear करें?');
    if (confirmCancel) {
        document.getElementById('halfDayCheckbox').checked = false;
        document.getElementById('simpleMode').classList.remove('hidden');
        document.getElementById('halfDayMode').classList.add('hidden');
        document.querySelectorAll('#simpleMode input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('#halfDayMode input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('#halfDayMode select').forEach(dropdown => dropdown.value = '');
        alert('✅ Form cleared!');
    }
}

function closeModal() {
    const confirmClose = confirm('⚠️ Close without saving?');
    if (confirmClose) {
        alert('👋 Thank you!');
    }
}

window.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Calendar Initialized - All Requirements Fulfilled!');
});
