document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector(".sliderWrapper");
    const menuItems = document.querySelectorAll(".menuItem");
    const pages = document.querySelectorAll('.page');
    const featureBoxes = document.querySelectorAll('.feature');
    const homeButton = document.getElementById('homeButton');
    const modalButton = document.querySelector('.modalButton');
  
    // UPDATED: Fixed Cardiology image and added new Lab Services section
    const services = [
        {
            id: 1,
            title: "Cardiology",
            description: "Advanced heart care with a team of expert cardiologists. We provide comprehensive services from diagnosis to treatment and rehabilitation.",
            img: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
            id: 2,
            title: "Neurology",
            description: "Specialized care for disorders of the nervous system. Our neurologists are equipped to handle complex neurological conditions.",
            img: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600",
        },
        {
            id: 3,
            title: "Emergency",
            description: "24/7 critical care and emergency services. Our team is always ready to respond to any medical emergency with speed and expertise.",
            img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 4,
            title: "Pediatrics",
            description: "Compassionate and comprehensive healthcare for infants, children, and adolescents. We focus on the well-being of our youngest patients.",
            img: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 5,
            title: "Appointments",
            description: "Easily book your appointments online. Our streamlined process ensures you get timely access to our medical experts.",
            img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 6,
            title: "Lab Services",
            description: "Our accredited laboratory provides precise and rapid diagnostic testing. Scroll down to see our available tests and book online.",
            img: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=600",
        }
    ];
  
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
  
    const generateAvailability = () => {
        const availability = {};
        const today = new Date();
        const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  
        for (let i = 1; i < 8; i++) { 
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateString = formatDate(date);
            
            if (Math.random() > 0.3) { 
                const availableSlots = times.filter(() => Math.random() > 0.5);
                if (availableSlots.length > 0) {
                    availability[dateString] = availableSlots;
                }
            }
        }
        return availability;
    };
  
    const doctors = [
        {
            name: 'Dr. Priya Sharma',
            specialty: 'Cardiologist',
            img: 'https://images.unsplash.com/photo-1622253692010-33352da69e0d?w=150&h=150&fit=crop&q=80&auto=format',
            availability: generateAvailability()
        },
        {
            name: 'Dr. Rohan Mehta',
            specialty: 'Neurologist',
            img: 'https://images.unsplash.com/photo-1594992350322-957367c3573c?w=150&h=150&fit=crop&q=80&auto=format',
            availability: generateAvailability()
        },
        {
            name: 'Dr. Anjali Rao',
            specialty: 'Pediatrician',
            img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&q=80&auto=format',
            availability: generateAvailability()
        },
        {
            name: 'Dr. Vikram Singh',
            specialty: 'Emergency Physician',
            img: 'https://images.unsplash.com/photo-1624720114704-3536b694a7e2?w=150&h=150&fit=crop&q=80&auto=format',
            availability: generateAvailability()
        },
    ];
  
    function add3DTiltEffect() {
        const sliderItems = document.querySelectorAll('.sliderItem');
        sliderItems.forEach(item => {
            const img = item.querySelector('.sliderImg');
            item.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = item.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                const rotateX = -1 * ((y - height / 2) / (height / 2)) * 10; 
                const rotateY = ((x - width / 2) / (width / 2)) * 10;
                img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            item.addEventListener('mouseleave', () => {
                img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    function populateSlider() {
        if(wrapper) {
            wrapper.innerHTML = services.map(service => `
                <div class="sliderItem">
                    <img src="${service.img}" alt="${service.title}" class="sliderImg">
                    <div class="slider-content">
                        <h1 class="sliderTitle">${service.title.toUpperCase()}<br>DEPARTMENT</h1>
                        <p class="sliderDesc">${service.description}</p>
                        <a href="#service">
                            <button class="actionButton">Learn More</button>
                        </a>
                    </div>
                </div>
            `).join('');
            add3DTiltEffect();
        }
    }
    populateSlider();
  
    function populateDoctors() {
        const doctorListContainer = document.getElementById('doctorList');
        if (doctorListContainer) {
            doctorListContainer.innerHTML = doctors.map(doctor => `
                <div class="doctor-card">
                    <img src="${doctor.img}" alt="Photo of ${doctor.name}">
                    <h3 class="doctor-name">${doctor.name}</h3>
                    <p class="doctor-specialty">${doctor.specialty}</p>
                </div>
            `).join('');
        }
    }
    populateDoctors();
  
    let chosenService = services[0];
  
    const currentServiceImg = document.querySelector(".serviceImg");
    const currentServiceTitle = document.querySelector(".serviceTitle");
    const currentServiceDesc = document.querySelector(".serviceDesc");
  
    function updateServiceDetails(service) {
        if (currentServiceImg && currentServiceTitle && currentServiceDesc) {
            currentServiceImg.classList.add('is-transitioning');
            currentServiceTitle.classList.add('is-transitioning');
            currentServiceDesc.classList.add('is-transitioning');

            setTimeout(() => {
                currentServiceTitle.textContent = service.title;
                currentServiceDesc.textContent = service.description;
                currentServiceImg.src = service.img.replace('800x600', '600x400').replace('&w=800','&w=600');
                currentServiceImg.alt = service.title;
                
                currentServiceImg.classList.remove('is-transitioning');
                currentServiceTitle.classList.remove('is-transitioning');
                currentServiceDesc.classList.remove('is-transitioning');
            }, 500); 
        }
    }
    
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const newPage = document.getElementById(pageId);
        if (newPage) {
            newPage.classList.add('active');
        }
        window.scrollTo(0, 0);
    }
    
    homeButton.addEventListener('click', () => showPage('mainPage'));
    
    featureBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const pageId = box.dataset.page;
            if(pageId) {
                showPage(pageId);
            }
        });
    });
  
    menuItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            showPage('mainPage');
            
            setTimeout(() => {
                if(wrapper) {
                    wrapper.style.transform = `translateX(${-100 * index}vw)`;
                }
                chosenService = services[index];
                updateServiceDetails(chosenService);
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }, 0);
        });
    });
    
    if(menuItems.length > 0) {
        menuItems[0].classList.add('active');
        updateServiceDetails(services[0]);
    }
  
    const appointmentButton = document.querySelector(".appointmentButton");
    const paymentModal = document.querySelector(".appointment-modal");
    const closeModal = document.querySelector(".close");
    const doctorSelect = document.getElementById('doctorSelect');
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentReason = document.getElementById('appointmentReason');
    const availabilityStatus = document.getElementById('availabilityStatus');
    const confirmationPage = document.getElementById('confirmationPage');
    const closeConfirmationButton = document.getElementById('closeConfirmation');
  
    function populateDoctorSelect() {
        if(doctorSelect) {
            doctorSelect.innerHTML = '<option value="">-- Select a Doctor --</option>';
            doctorSelect.innerHTML += doctors.map(doc => `<option value="${doc.name}">${doc.name} - ${doc.specialty}</option>`).join('');
        }
    }
  
    function checkAvailability() {
        const selectedDoctorName = doctorSelect.value;
        const selectedDate = appointmentDate.value;
  
        if (!selectedDoctorName || !selectedDate) {
            availabilityStatus.style.display = 'none';
            return;
        }
  
        const doctor = doctors.find(d => d.name === selectedDoctorName);
        const availableSlots = doctor.availability[selectedDate];
  
        availabilityStatus.style.display = 'block';
        if (availableSlots && availableSlots.length > 0) {
            availabilityStatus.textContent = `Available slots: ${availableSlots.join(', ')}`;
            availabilityStatus.className = 'availability-status available';
        } else {
            availabilityStatus.textContent = 'Doctor not available on this date.';
            availabilityStatus.className = 'availability-status unavailable';
        }
    }
    
    const setDateInputRange = () => {
      if (appointmentDate) {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          const maxDate = new Date(today);
          maxDate.setDate(today.getDate() + 7);
          appointmentDate.min = formatDate(tomorrow);
          appointmentDate.max = formatDate(maxDate);
          appointmentDate.value = ""; 
      }
    };
  
    const openModal = () => {
        if(paymentModal) {
            populateDoctorSelect();
            setDateInputRange(); 
            paymentModal.style.display = "flex";
            if(availabilityStatus) availabilityStatus.style.display = 'none';
        }
    };
    
    const closeTheModal = () => {
        if(paymentModal) {
            paymentModal.style.display = "none";
            if(appointmentReason) appointmentReason.value = "";
        }
    }
  
    if(appointmentButton) appointmentButton.addEventListener("click", openModal);
    if(closeModal) closeModal.addEventListener("click", closeTheModal);
    if(doctorSelect) doctorSelect.addEventListener('change', checkAvailability);
    if(appointmentDate) appointmentDate.addEventListener('change', checkAvailability);

    const bloodTestButtons = document.querySelectorAll('.openAppointmentModalBtn');
    bloodTestButtons.forEach(button => {
        button.addEventListener('click', () => {
            const testName = button.dataset.testName;
            if (appointmentReason) {
                appointmentReason.value = testName;
            }
            openModal();
        });
    });
  
    if (modalButton) {
        modalButton.addEventListener('click', (e) => {
            e.preventDefault();
            const nameInput = paymentModal.querySelector('input[placeholder="John Doe"]');
            const phoneInput = paymentModal.querySelector('input[placeholder="+1 234 5678"]');
            const selectedDoctor = doctorSelect.value;
            const selectedDate = appointmentDate.value;
            const reason = appointmentReason.value;
  
            if (nameInput.value.trim() === '' || phoneInput.value.trim() === '' || !selectedDoctor || !selectedDate) {
                alert('Please fill out all fields and select a doctor and date.');
                return;
            }
  
            const doctor = doctors.find(d => d.name === selectedDoctor);
            const availableSlots = doctor.availability[selectedDate];
            if (!availableSlots || availableSlots.length === 0) {
                alert('The selected doctor is not available on this date. Please choose another date.');
                return;
            }
  
            document.getElementById('confirmPatientName').textContent = nameInput.value;
            document.getElementById('confirmDoctorName').textContent = selectedDoctor;
            document.getElementById('confirmDate').textContent = selectedDate;
            document.getElementById('confirmTime').textContent = availableSlots[0]; 
            
            const confirmReasonWrapper = document.getElementById('confirmReasonWrapper');
            const confirmReasonSpan = document.getElementById('confirmReason');
            if(reason.trim() !== ''){
                confirmReasonSpan.textContent = reason;
                confirmReasonWrapper.style.display = 'block';
            } else {
                confirmReasonWrapper.style.display = 'none';
            }

            closeTheModal();
            confirmationPage.classList.add('active');
        });
    }
    
    if(closeConfirmationButton) {
        closeConfirmationButton.addEventListener('click', () => {
            confirmationPage.classList.remove('active');
        });
    }
  
    const loginButton = document.querySelector('.loginButton');
    const loginPage = document.getElementById('loginPage');
    const closeLoginButton = document.querySelector('.close-login');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
  
    if(loginButton) loginButton.addEventListener('click', () => { if(loginPage) loginPage.classList.add('active'); });
    if(closeLoginButton) closeLoginButton.addEventListener('click', () => { if(loginPage) loginPage.classList.remove('active'); });
    if(switchToRegister) switchToRegister.addEventListener('click', (e) => { e.preventDefault(); loginForm.classList.add('hidden'); registerForm.classList.remove('hidden'); });
    if(switchToLogin) switchToLogin.addEventListener('click', (e) => { e.preventDefault(); registerForm.classList.add('hidden'); loginForm.classList.remove('hidden'); });
  
    const toggleSwitch = document.getElementById('checkbox');
    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }
    if(toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleSwitch.checked = true;
        }
    }
  });