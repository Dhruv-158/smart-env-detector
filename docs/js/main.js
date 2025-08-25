// Main JavaScript for the documentation site
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initDocsNavigation();
    initDemoFunctionality();
    initCopyButtons();
    initSmoothScrolling();
    initResponsiveMenu();
    
    // Initialize syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
}

// Documentation navigation
function initDocsNavigation() {
    const navItems = document.querySelectorAll('.docs-nav-item');
    const panels = document.querySelectorAll('.docs-panel');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items and panels
            navItems.forEach(nav => nav.classList.remove('active'));
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding panel
            const target = item.dataset.target;
            const targetPanel = document.getElementById(target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Demo functionality
function initDemoFunctionality() {
    const detectBtn = document.getElementById('detectBtn');
    const experimentalBtn = document.getElementById('experimentalBtn');
    const clearBtn = document.getElementById('clearBtn');
    const demoOutput = document.getElementById('demoOutput');
    const capabilityGrid = document.getElementById('capabilityGrid');
    
    if (!detectBtn || !demoOutput) return;
    
    let includeExperimental = false;
    
    // Detect environment button
    detectBtn.addEventListener('click', () => {
        runEnvironmentDetection(includeExperimental);
    });
    
    // Toggle experimental features
    experimentalBtn.addEventListener('click', () => {
        includeExperimental = !includeExperimental;
        experimentalBtn.textContent = includeExperimental ? 
            '🧪 Experimental: ON' : '🧪 Include Experimental';
        experimentalBtn.classList.toggle('btn-primary', includeExperimental);
        experimentalBtn.classList.toggle('btn-secondary', !includeExperimental);
    });
    
    // Clear results
    clearBtn.addEventListener('click', () => {
        demoOutput.innerHTML = `
            <div class="placeholder">
                <i class="fas fa-play-circle"></i>
                <p>Click "Detect Environment" to see your current environment details</p>
            </div>
        `;
        capabilityGrid.innerHTML = '';
    });
    
    // Run initial capability test
    updateCapabilityGrid();
}

// Run environment detection
function runEnvironmentDetection(includeExperimental = false) {
    const demoOutput = document.getElementById('demoOutput');
    
    // Show loading state
    demoOutput.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>Detecting environment...</p>
        </div>
    `;
    
    // Simulate async detection (even though it's sync)
    setTimeout(() => {
        try {
            // Check if SmartEnvironmentDetector is available
            if (typeof SmartEnvironmentDetector === 'undefined') {
                throw new Error('SmartEnvironmentDetector not loaded');
            }
            
            const { detect } = SmartEnvironmentDetector;
            const env = detect({ includeExperimentalFeatures: includeExperimental });
            
            displayEnvironmentResults(env);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'demo-success';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Environment detection completed successfully!</span>
            `;
            demoOutput.insertBefore(successMsg, demoOutput.firstChild);
            
        } catch (error) {
            console.error('Detection error:', error);
            displayError(error.message);
        }
    }, 500);
}

// Display environment detection results
function displayEnvironmentResults(env) {
    const demoOutput = document.getElementById('demoOutput');
    
    const sections = [
        {
            id: 'platform',
            title: 'Platform Information',
            icon: 'fas fa-desktop',
            data: {
                platform: env.platform,
                'runtime.name': env.runtime.name,
                'runtime.version': env.runtime.version,
                'runtime.engine': env.runtime.engine
            }
        },
        {
            id: 'capabilities',
            title: 'Capabilities',
            icon: 'fas fa-cogs',
            data: env.capabilities
        },
        {
            id: 'performance',
            title: 'Performance Metrics',
            icon: 'fas fa-tachometer-alt',
            data: env.performance,
            showBars: true
        },
        {
            id: 'security',
            title: 'Security Context',
            icon: 'fas fa-shield-alt',
            data: env.security
        },
        {
            id: 'accessibility',
            title: 'Accessibility Preferences',
            icon: 'fas fa-universal-access',
            data: env.accessibility
        }
    ];
    
    // Add experimental section if available
    if (env.experimental) {
        sections.push({
            id: 'experimental',
            title: 'Experimental Features',
            icon: 'fas fa-flask',
            data: env.experimental
        });
    }
    
    let html = '<div class="env-result">';
    
    sections.forEach(section => {
        html += createEnvironmentSection(section);
    });
    
    html += '</div>';
    
    demoOutput.innerHTML = html;
    
    // Add event listeners for collapsible sections
    initCollapsibleSections();
}

// Create environment section HTML
function createEnvironmentSection({ id, title, icon, data, showBars = false }) {
    const properties = Object.entries(data)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => createPropertyHTML(key, value))
        .join('');
    
    let barsHTML = '';
    if (showBars && data) {
        barsHTML = createPerformanceBars(data);
    }
    
    return `
        <div class="env-section expanded" data-section="${id}">
            <div class="env-section-header">
                <h3 class="env-section-title">
                    <i class="${icon}"></i>
                    ${title}
                </h3>
                <i class="env-section-toggle fas fa-chevron-down"></i>
            </div>
            <div class="env-section-content">
                <div class="env-properties">
                    ${properties}
                </div>
                ${barsHTML}
            </div>
        </div>
    `;
}

// Create property HTML
function createPropertyHTML(key, value) {
    const valueClass = getValueClass(value);
    const displayValue = formatValue(value);
    
    return `
        <div class="env-property">
            <span class="env-property-name">${key}</span>
            <span class="env-property-value ${valueClass}">${displayValue}</span>
        </div>
    `;
}

// Get CSS class for value type
function getValueClass(value) {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'boolean') return value ? 'boolean-true' : 'boolean-false';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    return '';
}

// Format value for display
function formatValue(value) {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'boolean') return value ? '✓' : '✗';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number') {
        if (value > 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        }
        if (value > 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toString();
    }
    return String(value);
}

// Create performance bars
function createPerformanceBars(performance) {
    const bars = [];
    
    if (performance.memoryLimit) {
        const memoryGB = performance.memoryLimit / (1024 * 1024 * 1024);
        const maxMemory = 8; // Assume 8GB max for visualization
        const percentage = Math.min((memoryGB / maxMemory) * 100, 100);
        
        bars.push({
            label: 'Memory Limit',
            value: `${memoryGB.toFixed(1)} GB`,
            percentage
        });
    }
    
    if (performance.cpuCores) {
        const maxCores = 16; // Assume 16 cores max for visualization
        const percentage = Math.min((performance.cpuCores / maxCores) * 100, 100);
        
        bars.push({
            label: 'CPU Cores',
            value: performance.cpuCores.toString(),
            percentage
        });
    }
    
    if (performance.devicePixelRatio) {
        const maxRatio = 4; // Assume 4x max for visualization
        const percentage = Math.min((performance.devicePixelRatio / maxRatio) * 100, 100);
        
        bars.push({
            label: 'Device Pixel Ratio',
            value: `${performance.devicePixelRatio}x`,
            percentage
        });
    }
    
    if (bars.length === 0) return '';
    
    const barsHTML = bars.map(bar => `
        <div class="performance-bar">
            <div class="performance-bar-label">
                <span>${bar.label}</span>
                <span>${bar.value}</span>
            </div>
            <div class="performance-bar-track">
                <div class="performance-bar-fill" style="width: ${bar.percentage}%"></div>
            </div>
        </div>
    `).join('');
    
    return `<div class="performance-bars">${barsHTML}</div>`;
}

// Initialize collapsible sections
function initCollapsibleSections() {
    const sections = document.querySelectorAll('.env-section');
    
    sections.forEach(section => {
        const header = section.querySelector('.env-section-header');
        
        header.addEventListener('click', () => {
            section.classList.toggle('expanded');
        });
    });
}

// Update capability grid
function updateCapabilityGrid() {
    const capabilityGrid = document.getElementById('capabilityGrid');
    if (!capabilityGrid) return;
    
    const capabilities = [
        { name: 'localStorage', icon: 'fas fa-database' },
        { name: 'sessionStorage', icon: 'fas fa-clock' },
        { name: 'indexedDB', icon: 'fas fa-archive' },
        { name: 'webGL', icon: 'fas fa-cube' },
        { name: 'webAssembly', icon: 'fas fa-microchip' },
        { name: 'serviceWorker', icon: 'fas fa-cloud' },
        { name: 'pushNotifications', icon: 'fas fa-bell' },
        { name: 'geolocation', icon: 'fas fa-map-marker-alt' },
        { name: 'camera', icon: 'fas fa-camera' },
        { name: 'microphone', icon: 'fas fa-microphone' },
        { name: 'bluetooth', icon: 'fab fa-bluetooth' },
        { name: 'vibration', icon: 'fas fa-mobile-alt' },
        { name: 'fullscreen', icon: 'fas fa-expand' },
        { name: 'clipboard', icon: 'fas fa-clipboard' },
        { name: 'share', icon: 'fas fa-share-alt' },
        { name: 'wakeLock', icon: 'fas fa-eye' }
    ];
    
    // Check if SmartEnvironmentDetector is available
    if (typeof SmartEnvironmentDetector === 'undefined') {
        capabilityGrid.innerHTML = `
            <div class="capability-item">
                <div class="capability-name">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Library not loaded</span>
                </div>
                <span class="capability-status unknown">Unknown</span>
            </div>
        `;
        return;
    }
    
    const { supports } = SmartEnvironmentDetector;
    
    const html = capabilities.map(capability => {
        let status, statusClass;
        
        try {
            const supported = supports(capability.name);
            status = supported ? 'Supported' : 'Not Supported';
            statusClass = supported ? 'supported' : 'not-supported';
        } catch (error) {
            status = 'Unknown';
            statusClass = 'unknown';
        }
        
        return `
            <div class="capability-item">
                <div class="capability-name">
                    <i class="${capability.icon}"></i>
                    <span>${capability.name}</span>
                </div>
                <span class="capability-status ${statusClass}">${status}</span>
            </div>
        `;
    }).join('');
    
    capabilityGrid.innerHTML = html;
}

// Display error
function displayError(message) {
    const demoOutput = document.getElementById('demoOutput');
    
    demoOutput.innerHTML = `
        <div class="demo-error">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Error: ${message}</span>
        </div>
        <div class="placeholder">
            <i class="fas fa-exclamation-circle"></i>
            <p>Failed to detect environment. Please check the console for more details.</p>
        </div>
    `;
}

// Copy to clipboard functionality
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.copy;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Show success feedback
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = 'var(--success)';
                
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.color = '';
                }, 1000);
                
            } catch (error) {
                console.error('Failed to copy text:', error);
                
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show success feedback
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = 'var(--success)';
                
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.color = '';
                }, 1000);
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Responsive menu
function initResponsiveMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for global access (if needed)
window.SmartEnvDetectorDemo = {
    runEnvironmentDetection,
    updateCapabilityGrid,
    initDemoFunctionality
};
