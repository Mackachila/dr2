// Notification System
document.addEventListener('DOMContentLoaded', () => {
    // Testimonial data (hardcoded)
    const testimonials = [
        {
            name: "Grace M.",
            message: "Thank you for helping recover my stolen car! It was back in my possession within 48 hours.",
            image: "samakiwakupaka.jpg"
        },
        {
            name: "Robert K.",
            message: "The protective ritual you performed for my business has worked wonders. Sales have increased by 30% this month!",
            image: "breakfast.jpg"
        },
        {
            name: "Amina J.",
            message: "My relationship with my husband has greatly improved after your guidance. We are communicating better than ever.",
            image: "MandaziwithChai.jpg"
        },
        {
            name: "David N.",
            message: "I was skeptical at first, but you helped me find my lost family heirloom. Forever grateful!",
            image: "lunch.jpg"
        },
        {
            name: "Sarah W.",
            message: "The financial prosperity ritual has brought me unexpected opportunities. Just received a job offer with double my salary!",
            image: "mbaazi.jpg"
        },
        {
            name: "Francis O.",
            message: "After years of bad luck, the cleansing ritual has completely changed my fortunes. Thank you!",
            image: "pilau.webp"
        },
        {
            name: "Zainab L.",
            message: "You helped identify the person who was stealing from my shop. Problem solved permanently!",
            image: "supper.jpg"
        },
        {
            name: "Malik T.",
            message: "My chronic pain has significantly reduced after following your traditional remedies. I can finally sleep at night.",
            image: "swahili1.png"
        },
        {
            name: "Joyce K.",
            message: "The love spell worked! My ex-boyfriend called me after months of no contact. We're working things out now.",
            image: "swahili2.jpeg"
        },
        {
            name: "Peter M.",
            message: "Your spiritual guidance helped me make the right business decision. The investment is already paying off!",
            image: "swahili3.jpeg"
        }
    ];

    // Keep track of shown testimonials to avoid repetition
    let shownIndices = [];
    
    // Function to get random time text
    const getRandomTimeText = () => {
        const times = ['Just now', '1 minute ago', '2 minutes ago', '5 minutes ago', 'A moment ago', '3 minutes ago'];
        return times[Math.floor(Math.random() * times.length)];
    };
    
    // Function to get random testimonial (avoiding repetition)
    const getRandomTestimonial = () => {
        if (shownIndices.length === testimonials.length) {
            // Reset if all testimonials have been shown
            shownIndices = [];
        }
        
        let index;
        do {
            index = Math.floor(Math.random() * testimonials.length);
        } while (shownIndices.includes(index));
        
        shownIndices.push(index);
        return testimonials[index];
    };
    
    // Function to create and show notification
    const showNotification = () => {
        const testimonial = getRandomTestimonial();
        const timeText = getRandomTimeText();
        
        // Create notification card element
        const notificationCard = document.createElement('div');
        notificationCard.className = 'notification-card';
        
        // Create notification content
        notificationCard.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">
                    <div class="notification-avatar" style="background-image: url('${testimonial.image}')"></div>
                    ${testimonial.name}
                </div>
                <div class="notification-time">${timeText}</div>
                <div class="notification-close"><i class="fas fa-times"></i></div>
            </div>
            <div class="notification-body">
                ${testimonial.message}
            </div>
            <div class="notification-footer">
                <div class="notification-progress"></div>
            </div>
        `;
        
        // Append to container
        const container = document.getElementById('notification-container');
        container.appendChild(notificationCard);
        
        // Show with animation
        setTimeout(() => {
            notificationCard.classList.add('show');
        }, 10);
        
        // Setup progress bar
        const progressBar = notificationCard.querySelector('.notification-progress');
        const duration = 10000; // 10 seconds before disappearing
        
        // Make sure the transition duration matches the display duration
        progressBar.style.transition = `width ${duration}ms linear`;
        
        // Set initial width to 0%
        progressBar.style.width = '0%';
        
        // Start the progress animation
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 10);
        
        // Setup close button
        const closeBtn = notificationCard.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notificationCard.classList.remove('show');
            setTimeout(() => {
                container.removeChild(notificationCard);
            }, 500);
        });
        
        // Auto remove after duration
        setTimeout(() => {
            notificationCard.classList.remove('show');
            setTimeout(() => {
                if (notificationCard.parentNode === container) {
                    container.removeChild(notificationCard);
                }
            }, 500);
        }, duration);
        
        // Schedule next notification with random timing between 7 seconds and 2 minutes
        scheduleNextNotification();
    };
    
    // Function to schedule the next notification with random timing
    const scheduleNextNotification = () => {
        // Random time between 7 seconds (7000ms) and 2 minutes (120000ms)
        const minTime = 7000;
        const maxTime = 120000;
        const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
        
        setTimeout(showNotification, randomTime);
    };
    
    // Show first notification after 5 seconds
    setTimeout(showNotification, 5000);
});

