document.addEventListener('DOMContentLoaded', function() {
    const branchOptions = {
        First: ["Information Technology Engineering", "Computer Science Engineering", "Electronic And Telecommunication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering", "MCA"],
        Second: ["Information Technology Engineering", "Computer Science Engineering", "Electronic And Telecommunication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering", "MCA"],
        Third: ["Information Technology Engineering", "Computer Science Engineering", "Electronic And Telecommunication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering", "MCA"],
        Final: ["Information Technology Engineering", "Computer Science Engineering", "Electronic And Telecommunication Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering", "MCA"],
    };

    let formCount = 1; // Counter for forms
    const yearSelect = document.getElementById('year');
    const branchSelect = document.getElementById('branch');

    function populateBranches() {
        branchSelect.innerHTML = '';
        const selectedYear = yearSelect.value;
        branchOptions[selectedYear].forEach(branch => {
            const option = document.createElement('option');
            option.value = branch;
            option.textContent = branch;
            branchSelect.appendChild(option);
        });
    }

    yearSelect.addEventListener('change', populateBranches);
    populateBranches(); // Initial population of branches

    // Handle individual certificate generation
    document.getElementById('certificateForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            year: yearSelect.value,
            branch: branchSelect.value,
            enrollment: document.getElementById('enrollment').value,
            duration: document.getElementById('duration').value
        };

        const response = await fetch('/generate-certificate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = '/certificate';
        } else {
            alert("Failed to generate certificate. Please try again.");
        }
    });

    // Handle "Generate All Certificates" button functionality
    document.getElementById('generateCertificatesButton').addEventListener('click', async function() {
        const forms = document.querySelectorAll('.certificate-form'); // Select all forms
        const certificatesData = [];

        forms.forEach(form => {
            const data = {
                name: form.querySelector('input[id^="name"]').value,
                year: form.querySelector('select[id^="year"]').value,
                branch: form.querySelector('select[id^="branch"]').value,
                enrollment: form.querySelector('input[id^="enrollment"]').value,
                duration: form.querySelector('input[id^="duration"]').value
            };
            certificatesData.push(data);
        });

        try {
            const response = await fetch('/generate-certificates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(certificatesData)
            });

            if (response.ok) {
                alert('Certificates generated successfully!');
                window.location.href = '/certificate';
            } else {
                alert("Failed to generate certificates. Please try again.");
            }
        } catch (error) {
            console.error('Error generating certificates:', error);
            alert('Failed to generate certificates. Please try again.');
        }
    });
});
