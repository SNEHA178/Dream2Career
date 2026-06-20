// Dream2Career Application Engine

document.addEventListener("DOMContentLoaded", () => {
    // --- STATE MANAGEMENT ---
    let state = {
        profile: {
            name: "Sneha",
            goal: "software-engineer",
            bio: "Determined tech student aiming to bridge the gap between academic theory and real-world system engineering.",
            skills: ["HTML", "CSS", "JavaScript", "Git"]
        },
        completedRoadmapTopics: [], // Array of strings (format: "careerId-stageIndex-topicIndex")
        completedProjects: [],      // Array of project IDs
        completedCerts: [],         // Array of certification IDs
        bookmarkedCareers: [],      // Array of career IDs
        bookmarkedCerts: []         // Array of certification IDs
    };

    // Load state from LocalStorage
    function loadState() {
        const profile = localStorage.getItem("d2c_profile");
        const roadmap = localStorage.getItem("d2c_completedRoadmapTopics");
        const projects = localStorage.getItem("d2c_completedProjects");
        const certs = localStorage.getItem("d2c_completedCerts");
        const bookCareers = localStorage.getItem("d2c_bookmarkedCareers");
        const bookCerts = localStorage.getItem("d2c_bookmarkedCerts");

        if (profile) state.profile = JSON.parse(profile);
        if (roadmap) state.completedRoadmapTopics = JSON.parse(roadmap);
        if (projects) state.completedProjects = JSON.parse(projects);
        if (certs) state.completedCerts = JSON.parse(certs);
        if (bookCareers) state.bookmarkedCareers = JSON.parse(bookCareers);
        if (bookCerts) state.bookmarkedCerts = JSON.parse(bookCerts);
    }

    // Save state to LocalStorage
    function saveState() {
        localStorage.setItem("d2c_profile", JSON.stringify(state.profile));
        localStorage.setItem("d2c_completedRoadmapTopics", JSON.stringify(state.completedRoadmapTopics));
        localStorage.setItem("d2c_completedProjects", JSON.stringify(state.completedProjects));
        localStorage.setItem("d2c_completedCerts", JSON.stringify(state.completedCerts));
        localStorage.setItem("d2c_bookmarkedCareers", JSON.stringify(state.bookmarkedCareers));
        localStorage.setItem("d2c_bookmarkedCerts", JSON.stringify(state.bookmarkedCerts));

        updateGlobalMetrics();
    }

    // Reset storage
    function resetStorage() {
        if (confirm("Are you sure you want to clear all progress, bookmarks, and profile details? This action cannot be undone.")) {
            localStorage.clear();
            window.location.reload();
        }
    }

    // --- NAVIGATION & ROUTER SYSTEM ---
    const navLinks = document.querySelectorAll(".sidebar-link");
    const viewSections = document.querySelectorAll(".view-section");
    const appViewTitle = document.getElementById("app-view-title");

    function navigateTo(target, params = {}) {
        // Close mobile sidebar if open
        const sidebar = document.getElementById("app-sidebar");
        sidebar.classList.remove("mobile-open");

        // Deactivate all links
        navLinks.forEach(link => {
            if (link.getAttribute("data-target") === target) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Hide all views
        viewSections.forEach(section => {
            section.classList.remove("active");
        });

        // Show target view
        const targetSection = document.getElementById(`view-${target}`);
        if (targetSection) {
            targetSection.classList.add("active");
            
            // Update Title
            const titleWord = target.charAt(0).toUpperCase() + target.slice(1);
            appViewTitle.innerText = titleWord === "Interviews" ? "Interview Preparation" : titleWord === "Matching" ? "Career Matching System" : titleWord === "Analyzer" ? "Skill Gap Analyzer" : titleWord === "Roadmap" ? "Learning Roadmap" : titleWord === "Projects" ? "Project Center" : titleWord === "Certifications" ? "Certification Hub" : titleWord === "Tracker" ? "Progress Tracker" : titleWord === "Profile" ? "Profile & Setup" : titleWord;
            
            // Execute view-specific initializations
            initView(target, params);
        }
        
        // Scroll to top of content
        document.querySelector(".main-content").scrollTop = 0;
    }

    function initView(viewName, params = {}) {
        switch (viewName) {
            case "dashboard":
                renderDashboard();
                break;
            case "explorer":
                renderExplorer(params.career || null);
                break;
            case "matching":
                renderMatching();
                break;
            case "analyzer":
                renderAnalyzer();
                break;
            case "roadmap":
                renderRoadmap(params.career || state.profile.goal);
                break;
            case "projects":
                renderProjects();
                break;
            case "certifications":
                renderCertifications();
                break;
            case "resume":
                renderResume();
                break;
            case "interviews":
                renderInterviews(params.career || state.profile.goal);
                break;
            case "tracker":
                renderTracker();
                break;
            case "profile":
                renderProfile();
                break;
        }
    }

    // Hash change routing support (e.g. app.html#explorer?career=web-developer)
    function handleRouting() {
        const hash = window.location.hash.substring(1);
        if (!hash) {
            navigateTo("dashboard");
            return;
        }

        const [path, queryStr] = hash.split("?");
        const params = {};
        if (queryStr) {
            queryStr.split("&").forEach(param => {
                const [key, val] = param.split("=");
                params[key] = decodeURIComponent(val);
            });
        }

        navigateTo(path, params);
    }

    window.addEventListener("hashchange", handleRouting);

    // Sidebar navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            window.location.hash = target;
        });
    });

    // Mobile sidebar toggle
    const mobileToggle = document.getElementById("mobile-toggle");
    const sidebar = document.getElementById("app-sidebar");
    
    mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("mobile-open");
    });

    // Close mobile sidebar when clicking main content
    document.querySelector(".main-content").addEventListener("click", (e) => {
        if (!e.target.closest(".sidebar") && !e.target.closest(".mobile-sidebar-toggle")) {
            sidebar.classList.remove("mobile-open");
        }
    });

    // --- GLOBAL TOPBAR CONTROLS ---
    // Theme Toggle
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (theme === "light") {
            themeIcon.className = "bi bi-moon-fill";
        } else {
            themeIcon.className = "bi bi-sun-fill";
        }
    }
    setTheme(localStorage.getItem("theme") || "dark");
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        setTheme(currentTheme === "light" ? "dark" : "light");
    });

    // Bookmarks Dropdown Update
    function updateBookmarksDropdown() {
        const container = document.getElementById("bookmarks-list-container");
        const badge = document.getElementById("bookmark-count-badge");
        container.innerHTML = "";

        const careersCount = state.bookmarkedCareers.length;
        const certsCount = state.bookmarkedCerts.length;
        const total = careersCount + certsCount;

        if (total > 0) {
            badge.classList.remove("d-none");
            badge.innerText = total;
        } else {
            badge.classList.add("d-none");
        }

        if (careersCount === 0 && certsCount === 0) {
            container.innerHTML = `<p class="text-muted small mb-0 px-2 py-1">No bookmarks saved yet.</p>`;
            return;
        }

        // Add bookmarked careers
        if (careersCount > 0) {
            const h = document.createElement("div");
            h.className = "text-primary fw-bold small px-2 py-1 border-bottom border-secondary border-opacity-10 mb-1";
            h.innerText = "Careers";
            container.appendChild(h);

            state.bookmarkedCareers.forEach(id => {
                const career = CAREERS_DB.find(c => c.id === id);
                if (career) {
                    const item = document.createElement("a");
                    item.className = "dropdown-item text-secondary py-2 rounded-2 d-flex justify-content-between align-items-center";
                    item.href = `#explorer?career=${career.id}`;
                    item.innerHTML = `<span><i class="bi ${career.icon} me-2 text-info"></i>${career.name}</span><i class="bi bi-chevron-right small text-muted"></i>`;
                    container.appendChild(item);
                }
            });
        }

        // Add bookmarked certifications
        if (certsCount > 0) {
            const h = document.createElement("div");
            h.className = "text-primary fw-bold small px-2 py-1 border-bottom border-secondary border-opacity-10 mt-2 mb-1";
            h.innerText = "Certifications";
            container.appendChild(h);

            state.bookmarkedCerts.forEach(id => {
                const cert = CERTIFICATIONS_DB.find(c => c.id === id);
                if (cert) {
                    const item = document.createElement("a");
                    item.className = "dropdown-item text-secondary py-2 rounded-2 d-flex justify-content-between align-items-center";
                    item.href = "#certifications";
                    item.innerHTML = `<span><i class="bi bi-patch-check me-2 text-warning"></i>${cert.name}</span><i class="bi bi-chevron-right small text-muted"></i>`;
                    container.appendChild(item);
                }
            });
        }
    }

    // Global Search Engine
    const globalSearchInput = document.getElementById("global-search");
    
    // Create floating results container in main-content
    const searchResultsPanel = document.createElement("div");
    searchResultsPanel.className = "glass-panel p-3 border border-secondary d-none position-absolute";
    searchResultsPanel.style.cssText = "top: 70px; left: 30px; width: 380px; max-height: 400px; overflow-y: auto; z-index: 1000;";
    document.querySelector(".main-content").appendChild(searchResultsPanel);

    globalSearchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
            searchResultsPanel.classList.add("d-none");
            return;
        }

        searchResultsPanel.innerHTML = "";
        searchResultsPanel.classList.remove("d-none");

        // Search Careers
        const matchedCareers = CAREERS_DB.filter(c => c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query));
        // Search Projects
        const matchedProjects = PROJECTS_DB.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
        // Search Certifications
        const matchedCerts = CERTIFICATIONS_DB.filter(cer => cer.name.toLowerCase().includes(query) || cer.benefits.toLowerCase().includes(query));

        let hasResults = false;

        if (matchedCareers.length > 0) {
            hasResults = true;
            const h = document.createElement("h6");
            h.className = "text-primary fw-bold mb-2 mt-1 small";
            h.innerText = "CAREERS";
            searchResultsPanel.appendChild(h);
            matchedCareers.forEach(c => {
                const a = document.createElement("a");
                a.href = `#explorer?career=${c.id}`;
                a.className = "d-block text-secondary text-decoration-none py-1 ps-2 rounded-1 hover-lift mb-1 border-start border-primary border-3";
                a.style.fontSize = "13px";
                a.innerText = c.name;
                a.addEventListener("click", () => searchResultsPanel.classList.add("d-none"));
                searchResultsPanel.appendChild(a);
            });
        }

        if (matchedProjects.length > 0) {
            hasResults = true;
            const h = document.createElement("h6");
            h.className = "text-success fw-bold mb-2 mt-3 small";
            h.innerText = "PROJECTS";
            searchResultsPanel.appendChild(h);
            matchedProjects.forEach(p => {
                const a = document.createElement("a");
                a.href = `#projects`;
                a.className = "d-block text-secondary text-decoration-none py-1 ps-2 rounded-1 hover-lift mb-1 border-start border-success border-3";
                a.style.fontSize = "13px";
                a.innerText = `${p.name} (${p.difficulty})`;
                a.addEventListener("click", () => searchResultsPanel.classList.add("d-none"));
                searchResultsPanel.appendChild(a);
            });
        }

        if (matchedCerts.length > 0) {
            hasResults = true;
            const h = document.createElement("h6");
            h.className = "text-warning fw-bold mb-2 mt-3 small";
            h.innerText = "CERTIFICATIONS";
            searchResultsPanel.appendChild(h);
            matchedCerts.forEach(cer => {
                const a = document.createElement("a");
                a.href = `#certifications`;
                a.className = "d-block text-secondary text-decoration-none py-1 ps-2 rounded-1 hover-lift mb-1 border-start border-warning border-3";
                a.style.fontSize = "13px";
                a.innerText = cer.name;
                a.addEventListener("click", () => searchResultsPanel.classList.add("d-none"));
                searchResultsPanel.appendChild(a);
            });
        }

        if (!hasResults) {
            searchResultsPanel.innerHTML = `<span class="text-muted small">No matches found for "${query}"</span>`;
        }
    });

    // Close search panels when clicking anywhere else
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#global-search") && !e.target.closest(".glass-panel")) {
            searchResultsPanel.classList.add("d-none");
        }
    });

    // --- ALGORITHMIC CALCULATIONS ---

    // Calculate dynamic readiness score
    function calculateReadiness() {
        const targetId = state.profile.goal;
        const career = CAREERS_DB.find(c => c.id === targetId);
        if (!career) return 0;

        // 1. Skill completeness score (40%)
        const targetSkills = career.skills;
        const matchingSkills = state.profile.skills.filter(s => targetSkills.includes(s));
        const skillScore = targetSkills.length > 0 ? (matchingSkills.length / targetSkills.length) * 100 : 0;

        // 2. Project completeness score (40%)
        const careerProjects = PROJECTS_DB.filter(p => p.careerId === targetId);
        const completedCareerProjects = careerProjects.filter(p => state.completedProjects.includes(p.id));
        const projectScore = careerProjects.length > 0 ? (completedCareerProjects.length / careerProjects.length) * 100 : 0;

        // 3. Certification completeness score (20%)
        const careerCerts = CERTIFICATIONS_DB.filter(c => c.careers.includes(targetId));
        const completedCareerCerts = careerCerts.filter(c => state.completedCerts.includes(c.id));
        const certScore = careerCerts.length > 0 ? (completedCareerCerts.length / careerCerts.length) * 100 : 0;

        // Weighted Average
        const totalScore = (skillScore * 0.4) + (projectScore * 0.4) + (certScore * 0.2);
        return Math.min(100, Math.round(totalScore));
    }

    function updateGlobalMetrics() {
        // Sync header details
        document.getElementById("header-user-name").innerText = state.profile.name;
        document.getElementById("avatar-initials").innerText = state.profile.name.charAt(0).toUpperCase();

        updateBookmarksDropdown();
    }


    // --- 1. DASHBOARD VIEW RENDER ---
    function renderDashboard() {
        // Populate Goal Cards
        document.getElementById("dash-welcome-name").innerText = state.profile.name;
        
        const goalId = state.profile.goal;
        const goalCareer = CAREERS_DB.find(c => c.id === goalId);
        document.getElementById("dash-current-goal").innerText = goalCareer ? goalCareer.name : "None Mapped";

        // Calculate Readiness Metrics
        const readiness = calculateReadiness();
        document.getElementById("dash-readiness-label").innerText = `${readiness}%`;
        
        // Progress Circle fill
        const circle = document.getElementById("dash-progress-circle");
        const circumference = 2 * Math.PI * 40; // 251.2
        const offset = circumference - (readiness / 100) * circumference;
        circle.style.strokeDashoffset = offset;

        // Count metrics
        document.getElementById("dash-skills-count").innerText = state.profile.skills.length;
        const skillsPercent = Math.round((state.profile.skills.length / SKILLS_LIST.length) * 100);
        document.getElementById("dash-skills-bar").style.width = `${skillsPercent}%`;

        document.getElementById("dash-projects-count").innerText = state.completedProjects.length;
        const totalProjects = PROJECTS_DB.length;
        const projPercent = Math.round((state.completedProjects.length / totalProjects) * 100);
        document.getElementById("dash-projects-bar").style.width = `${projPercent}%`;

        document.getElementById("dash-certs-count").innerText = state.completedCerts.length;
        const totalCerts = CERTIFICATIONS_DB.length;
        const certPercent = Math.round((state.completedCerts.length / totalCerts) * 100);
        document.getElementById("dash-certs-bar").style.width = `${certPercent}%`;

        // Recommended Tasks algorithm (Find first missing skill, uncompleted project, or cert)
        const tasksContainer = document.getElementById("dash-tasks-list");
        tasksContainer.innerHTML = "";

        let taskCount = 0;

        if (goalCareer) {
            // Find missing skills
            const missingSkills = goalCareer.skills.filter(s => !state.profile.skills.includes(s));
            if (missingSkills.length > 0 && taskCount < 3) {
                const card = document.createElement("div");
                card.className = "list-group-item bg-transparent text-secondary border-secondary border-opacity-15 py-3 d-flex justify-content-between align-items-center";
                card.innerHTML = `
                    <div>
                        <h5 class="mb-1 text-primary fw-bold" style="font-size: 14px;"><i class="bi bi-lightbulb"></i> Bridge Skill Gap</h5>
                        <p class="mb-0 small">Learn target skill: <strong>${missingSkills[0]}</strong> to align with target role.</p>
                    </div>
                    <a href="#analyzer" class="btn btn-outline-primary btn-sm rounded-pill px-3">View Gap</a>
                `;
                tasksContainer.appendChild(card);
                taskCount++;
            }

            // Find uncompleted projects for target career
            const uncompletedProj = PROJECTS_DB.find(p => p.careerId === goalId && !state.completedProjects.includes(p.id));
            if (uncompletedProj && taskCount < 3) {
                const card = document.createElement("div");
                card.className = "list-group-item bg-transparent text-secondary border-secondary border-opacity-15 py-3 d-flex justify-content-between align-items-center";
                card.innerHTML = `
                    <div>
                        <h5 class="mb-1 text-success fw-bold" style="font-size: 14px;"><i class="bi bi-folder-plus"></i> Launch Core Project</h5>
                        <p class="mb-0 small">Build: <strong>${uncompletedProj.name}</strong> (${uncompletedProj.difficulty})</p>
                    </div>
                    <a href="#projects" class="btn btn-outline-success btn-sm rounded-pill px-3">Start</a>
                `;
                tasksContainer.appendChild(card);
                taskCount++;
            }

            // Find uncompleted certs for target career
            const uncompletedCert = CERTIFICATIONS_DB.find(cer => cer.careers.includes(goalId) && !state.completedCerts.includes(cer.id));
            if (uncompletedCert && taskCount < 3) {
                const card = document.createElement("div");
                card.className = "list-group-item bg-transparent text-secondary border-secondary border-opacity-15 py-3 d-flex justify-content-between align-items-center";
                card.innerHTML = `
                    <div>
                        <h5 class="mb-1 text-warning fw-bold" style="font-size: 14px;"><i class="bi bi-patch-check"></i> Earn Industry Credential</h5>
                        <p class="mb-0 small">Acquire: <strong>${uncompletedCert.name}</strong></p>
                    </div>
                    <a href="#certifications" class="btn btn-outline-warning btn-sm rounded-pill px-3">Details</a>
                `;
                tasksContainer.appendChild(card);
                taskCount++;
            }
        }

        if (taskCount === 0) {
            tasksContainer.innerHTML = `<p class="text-muted small mb-0 py-3 text-center">You have completed all milestones for your active goal path!</p>`;
        }

        // Recent Bookmarks list populate
        const booklist = document.getElementById("dash-bookmarks-list");
        booklist.innerHTML = "";

        if (state.bookmarkedCareers.length === 0) {
            booklist.innerHTML = `<p class="text-muted small mb-0 py-3 text-center">No careers bookmarked.</p>`;
        } else {
            state.bookmarkedCareers.slice(0, 3).forEach(id => {
                const career = CAREERS_DB.find(c => c.id === id);
                if (career) {
                    const item = document.createElement("div");
                    item.className = "list-group-item bg-transparent border-secondary border-opacity-15 py-2 d-flex justify-content-between align-items-center";
                    item.innerHTML = `
                        <span class="small text-secondary"><i class="bi ${career.icon} me-2 text-info"></i>${career.name}</span>
                        <a href="#explorer?career=${career.id}" class="text-primary text-decoration-none small fw-bold">Explore</a>
                    `;
                    booklist.appendChild(item);
                }
            });
        }

        // Link button event handlers
        document.getElementById("dash-resume-btn").addEventListener("click", () => {
            window.location.hash = "resume";
        });
        document.getElementById("dash-roadmap-btn").addEventListener("click", () => {
            window.location.hash = "roadmap";
        });
    }


    // --- 2. CAREER EXPLORER VIEW RENDER ---
    const detailPanel = document.getElementById("explorer-detail-panel");
    const explorerGrid = document.getElementById("explorer-grid");

    function renderExplorer(selectedCareerId = null) {
        // If a specific career parameter is provided, load its detailed view panel instantly
        if (selectedCareerId) {
            loadCareerDetail(selectedCareerId);
        } else {
            detailPanel.classList.add("d-none");
        }

        // Populating the Main 8 Career Grid
        explorerGrid.innerHTML = "";
        
        CAREERS_DB.forEach(career => {
            const isBookmarked = state.bookmarkedCareers.includes(career.id);
            const isGoal = state.profile.goal === career.id;

            const col = document.createElement("div");
            col.className = `col-lg-4 col-md-6 explorer-card-wrapper`;
            col.setAttribute("data-category", career.category);
            col.innerHTML = `
                <div class="glass-card p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="sidebar-logo-icon" style="width: 45px; height: 45px; font-size: 20px;"><i class="bi ${career.icon}"></i></div>
                            <div class="d-flex gap-1">
                                ${isGoal ? `<span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-30">Active Goal</span>` : ""}
                                <button class="btn btn-sm btn-link p-0 text-secondary bookmark-btn-icon" data-id="${career.id}">
                                    <i class="bi ${isBookmarked ? 'bi-bookmark-fill text-warning' : 'bi-bookmark'}"></i>
                                </button>
                            </div>
                        </div>
                        <h3 class="h5 fw-bold mb-2">${career.name}</h3>
                        <p class="text-secondary small mb-3">${career.description.substring(0, 120)}...</p>
                    </div>
                    <div>
                        <div class="d-flex flex-wrap gap-1 mb-3">
                            ${career.skills.slice(0, 3).map(skill => `<span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10">${skill}</span>`).join('')}
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100 rounded-pill py-2 explore-details-btn" data-id="${career.id}">Explore Full Path</button>
                    </div>
                </div>
            `;
            explorerGrid.appendChild(col);
        });

        // Add event listeners for grid buttons
        document.querySelectorAll(".explore-details-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                loadCareerDetail(id);
            });
        });

        document.querySelectorAll(".bookmark-btn-icon").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = btn.getAttribute("data-id");
                toggleCareerBookmark(id);
                renderExplorer(); // Refresh bookmarks visual indicators
            });
        });
    }

    // Filter Buttons logic
    const categoryFilters = document.querySelectorAll("#explorer-category-filters button");
    categoryFilters.forEach(filter => {
        filter.addEventListener("click", () => {
            categoryFilters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");
            
            const cat = filter.getAttribute("data-category");
            const cards = document.querySelectorAll(".explorer-card-wrapper");
            
            cards.forEach(card => {
                if (cat === "all" || card.getAttribute("data-category") === cat) {
                    card.classList.remove("d-none");
                } else {
                    card.classList.add("d-none");
                }
            });
        });
    });

    // Toggle Career Bookmark helper
    function toggleCareerBookmark(id) {
        const idx = state.bookmarkedCareers.indexOf(id);
        if (idx > -1) {
            state.bookmarkedCareers.splice(idx, 1);
        } else {
            state.bookmarkedCareers.push(id);
        }
        saveState();
    }

    // Close Detail Panel action
    document.getElementById("close-detail-btn").addEventListener("click", () => {
        detailPanel.classList.add("d-none");
        window.location.hash = "explorer";
    });

    // Populate and open detailed view pane for selected career
    function loadCareerDetail(id) {
        const career = CAREERS_DB.find(c => c.id === id);
        if (!career) return;

        detailPanel.classList.remove("d-none");
        
        // Sync URLs and titles
        document.getElementById("detail-title").innerText = career.name;
        document.getElementById("detail-category").innerText = career.category;
        document.getElementById("detail-description").innerText = career.description;
        
        const iconDiv = document.getElementById("detail-icon");
        iconDiv.innerHTML = `<i class="bi ${career.icon}"></i>`;

        // Update detail badges
        const targetBtn = document.getElementById("detail-target-btn");
        if (state.profile.goal === career.id) {
            targetBtn.className = "btn btn-success rounded-pill px-4 py-2 disabled";
            targetBtn.innerHTML = `<i class="bi bi-check-lg"></i> Active Goal`;
        } else {
            targetBtn.className = "btn bg-gradient-accent text-white rounded-pill border-0 px-4 py-2 shadow";
            targetBtn.innerHTML = `<i class="bi bi-flag"></i> Set as Target Goal`;
            targetBtn.onclick = () => {
                state.profile.goal = career.id;
                saveState();
                loadCareerDetail(career.id);
            };
        }

        const bookmarkBtn = document.getElementById("detail-bookmark-btn");
        const isBookmarked = state.bookmarkedCareers.includes(career.id);
        bookmarkBtn.innerHTML = `<i class="bi ${isBookmarked ? 'bi-bookmark-fill text-warning' : 'bi-bookmark'}"></i> ${isBookmarked ? 'Bookmarked' : 'Bookmark Path'}`;
        bookmarkBtn.onclick = () => {
            toggleCareerBookmark(career.id);
            loadCareerDetail(career.id);
        };

        // Render detailed list profiles
        const skillsCont = document.getElementById("detail-skills-list");
        skillsCont.innerHTML = career.skills.map(s => `<span class="pill-badge active">${s}</span>`).join('');

        const toolsCont = document.getElementById("detail-tools-list");
        toolsCont.innerHTML = career.tools.map(t => `<span class="pill-badge bg-secondary bg-opacity-20 text-secondary">${t}</span>`).join('');

        // Render preview timelines (Beginner, Intermediate, Advanced, Ready)
        const timelineCont = document.getElementById("detail-roadmap-preview");
        timelineCont.innerHTML = `
            <div class="timeline-item active">
                <span class="timeline-node-number">1</span>
                <h4 class="h6 fw-bold mb-2">Beginner Phase</h4>
                <p class="text-secondary small mb-0">${career.learningPath.beginner.join(', ')}</p>
            </div>
            <div class="timeline-item">
                <span class="timeline-node-number">2</span>
                <h4 class="h6 fw-bold mb-2">Intermediate Phase</h4>
                <p class="text-secondary small mb-0">${career.learningPath.intermediate.join(', ')}</p>
            </div>
            <div class="timeline-item">
                <span class="timeline-node-number">3</span>
                <h4 class="h6 fw-bold mb-2">Advanced Phase</h4>
                <p class="text-secondary small mb-0">${career.learningPath.advanced.join(', ')}</p>
            </div>
        `;

        // Load project recommendations
        const projectsCont = document.getElementById("detail-projects-list");
        projectsCont.innerHTML = PROJECTS_DB.filter(p => p.careerId === career.id)
            .map(p => `
                <div class="py-2 border-bottom border-secondary border-opacity-10">
                    <h5 class="h6 fw-bold mb-1">${p.name} <span class="badge bg-secondary text-muted small ms-2" style="font-size:9px;">${p.difficulty}</span></h5>
                    <p class="text-secondary mb-0" style="font-size: 11px;">${p.description}</p>
                </div>
            `).join('');

        // Load certs
        const certsCont = document.getElementById("detail-certs-list");
        certsCont.innerHTML = CERTIFICATIONS_DB.filter(cer => cer.careers.includes(career.id))
            .map(cer => `
                <div class="py-2 border-bottom border-secondary border-opacity-10">
                    <h5 class="h6 fw-bold mb-1">${cer.name}</h5>
                    <p class="text-secondary mb-0" style="font-size: 11px;">Provided by ${cer.provider} | Duration: ${cer.duration}</p>
                </div>
            `).join('');

        // Scroll to detail panel smoothly
        detailPanel.scrollIntoView({ behavior: "smooth" });
    }

    // --- COMPARE CAREERS MODAL ENGINE ---
    const compareBtn = document.getElementById("trigger-compare-btn");
    const compareModalEl = document.getElementById("compareModal");
    const select1 = document.getElementById("compare-select-1");
    const select2 = document.getElementById("compare-select-2");
    const col1 = document.getElementById("compare-details-1");
    const col2 = document.getElementById("compare-details-2");

    let compareModal;

    compareBtn.addEventListener("click", () => {
        // Initialize Bootstrap modal object if not present
        if (!compareModal) compareModal = new bootstrap.Modal(compareModalEl);

        // Clear and Populate dropdown selectors
        select1.innerHTML = `<option value="">Choose first career...</option>`;
        select2.innerHTML = `<option value="">Choose second career...</option>`;

        CAREERS_DB.forEach(c => {
            select1.innerHTML += `<option value="${c.id}">${c.name}</option>`;
            select2.innerHTML += `<option value="${c.id}">${c.name}</option>`;
        });

        // Set defaults
        select1.value = state.profile.goal;
        select2.value = CAREERS_DB.find(c => c.id !== state.profile.goal)?.id || "";

        renderComparison();
        compareModal.show();
    });

    function renderComparison() {
        const val1 = select1.value;
        const val2 = select2.value;

        renderCompareCol(val1, col1);
        renderCompareCol(val2, col2);
    }

    select1.addEventListener("change", renderComparison);
    select2.addEventListener("change", renderComparison);

    function renderCompareCol(careerId, targetCol) {
        if (!careerId) {
            targetCol.innerHTML = `<p class="text-muted text-center py-5">Please select a career path.</p>`;
            return;
        }

        const career = CAREERS_DB.find(c => c.id === careerId);
        if (!career) return;

        targetCol.innerHTML = `
            <div class="p-3">
                <h4 class="h5 fw-bold text-primary mb-3">${career.name}</h4>
                <p class="text-secondary mb-4">${career.description}</p>
                
                <h5 class="h6 fw-bold text-white mb-2">Technical Skills</h5>
                <div class="d-flex flex-wrap gap-1 mb-4">
                    ${career.skills.map(s => `<span class="badge bg-secondary bg-opacity-20 text-secondary">${s}</span>`).join('')}
                </div>

                <h5 class="h6 fw-bold text-white mb-2">Tools / Stack</h5>
                <div class="d-flex flex-wrap gap-1 mb-4">
                    ${career.tools.map(t => `<span class="badge bg-info bg-opacity-10 text-info">${t}</span>`).join('')}
                </div>

                <h5 class="h6 fw-bold text-white mb-2">Primary Roadmap Tracks</h5>
                <ul class="list-unstyled mb-0">
                    <li class="mb-1"><i class="bi bi-dot text-primary"></i> <strong>Beginner:</strong> ${career.learningPath.beginner.slice(0, 2).join(', ')}...</li>
                    <li class="mb-1"><i class="bi bi-dot text-primary"></i> <strong>Intermediate:</strong> ${career.learningPath.intermediate.slice(0, 2).join(', ')}...</li>
                    <li class="mb-0"><i class="bi bi-dot text-primary"></i> <strong>Advanced:</strong> ${career.learningPath.advanced.slice(0, 2).join(', ')}...</li>
                </ul>
            </div>
        `;
    }


    // --- 3. CAREER MATCHING SYSTEM ENGINE ---
    let matchAnswers = {
        interests: [],
        subjects: [],
        strengths: []
    };

    function renderMatching() {
        // Reset matching wizard layout views
        document.getElementById("matching-step-1").classList.remove("d-none");
        document.getElementById("matching-step-2").classList.add("d-none");
        document.getElementById("matching-step-3").classList.add("d-none");
        document.getElementById("matching-results").classList.add("d-none");

        // Build Interests Check grid
        const intGrid = document.getElementById("match-interests-grid");
        intGrid.innerHTML = "";
        INTERESTS_LIST.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "pill-badge";
            btn.innerText = item.name;
            btn.addEventListener("click", () => {
                btn.classList.toggle("active");
                const idx = matchAnswers.interests.indexOf(item.id);
                if (idx > -1) matchAnswers.interests.splice(idx, 1);
                else matchAnswers.interests.push(item.id);
            });
            intGrid.appendChild(btn);
        });

        // Build Subjects Check grid
        const subGrid = document.getElementById("match-subjects-grid");
        subGrid.innerHTML = "";
        SUBJECTS_LIST.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "pill-badge";
            btn.innerText = item.name;
            btn.addEventListener("click", () => {
                btn.classList.toggle("active");
                const idx = matchAnswers.subjects.indexOf(item.id);
                if (idx > -1) matchAnswers.subjects.splice(idx, 1);
                else matchAnswers.subjects.push(item.id);
            });
            subGrid.appendChild(btn);
        });

        // Build Strengths Check grid
        const strGrid = document.getElementById("match-strengths-grid");
        strGrid.innerHTML = "";
        STRENGTHS_LIST.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "pill-badge";
            btn.innerText = item.name;
            btn.addEventListener("click", () => {
                btn.classList.toggle("active");
                const idx = matchAnswers.strengths.indexOf(item.id);
                if (idx > -1) matchAnswers.strengths.splice(idx, 1);
                else matchAnswers.strengths.push(item.id);
            });
            strGrid.appendChild(btn);
        });
    }

    // Match wizards navigations
    document.getElementById("match-next-1").onclick = () => {
        document.getElementById("matching-step-1").classList.add("d-none");
        document.getElementById("matching-step-2").classList.remove("d-none");
    };

    document.getElementById("match-prev-2").onclick = () => {
        document.getElementById("matching-step-2").classList.add("d-none");
        document.getElementById("matching-step-1").classList.remove("d-none");
    };

    document.getElementById("match-next-2").onclick = () => {
        document.getElementById("matching-step-2").classList.add("d-none");
        document.getElementById("matching-step-3").classList.remove("d-none");
    };

    document.getElementById("match-prev-3").onclick = () => {
        document.getElementById("matching-step-3").classList.add("d-none");
        document.getElementById("matching-step-2").classList.remove("d-none");
    };

    document.getElementById("match-next-3").onclick = () => {
        document.getElementById("matching-step-3").classList.add("d-none");
        runMatchingCalculation();
    };

    document.getElementById("match-reset-btn").onclick = () => {
        matchAnswers = { interests: [], subjects: [], strengths: [] };
        renderMatching();
    };

    // Calculate score logic: matching interests/subjects/strengths against profiles
    function runMatchingCalculation() {
        const resultsContainer = document.getElementById("matching-results-list");
        resultsContainer.innerHTML = "";
        document.getElementById("matching-results").classList.remove("d-none");

        const scoredCareers = CAREERS_DB.map(career => {
            const req = career.matching;
            
            // Total matches count
            let matchedItems = 0;
            let totalItems = req.interests.length + req.subjects.length + req.strengths.length;

            req.interests.forEach(i => { if (matchAnswers.interests.includes(i)) matchedItems++; });
            req.subjects.forEach(s => { if (matchAnswers.subjects.includes(s)) matchedItems++; });
            req.strengths.forEach(st => { if (matchAnswers.strengths.includes(st)) matchedItems++; });

            const percentage = totalItems > 0 ? Math.round((matchedItems / totalItems) * 100) : 0;
            
            return {
                career,
                score: percentage,
                matchedCount: matchedItems
            };
        });

        // Sort descending
        scoredCareers.sort((a, b) => b.score - a.score);

        scoredCareers.forEach(item => {
            const career = item.career;
            const resCard = document.createElement("div");
            resCard.className = "list-group-item bg-transparent text-secondary border-secondary border-opacity-15 py-4";
            resCard.innerHTML = `
                <div class="row g-3 align-items-center">
                    <div class="col-md-7">
                        <div class="d-flex align-items-center gap-3">
                            <div class="sidebar-logo-icon" style="width: 40px; height: 40px; font-size: 18px;"><i class="bi ${career.icon}"></i></div>
                            <div>
                                <h4 class="h6 fw-bold mb-1 text-white">${career.name}</h4>
                                <span class="badge bg-secondary bg-opacity-20 text-secondary text-muted" style="font-size:10px;">${career.category}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <div class="progress flex-grow-1" style="height: 6px;">
                                <div class="progress-bar bg-gradient-cyan" role="progressbar" style="width: ${item.score}%"></div>
                            </div>
                            <span class="fw-bold small text-white">${item.score}% Match</span>
                        </div>
                    </div>
                    <div class="col-md-2 text-md-end">
                        <button class="btn btn-outline-primary btn-sm rounded-pill px-3 match-set-goal-btn" data-id="${career.id}">Select</button>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(resCard);
        });

        // Event binder
        document.querySelectorAll(".match-set-goal-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                state.profile.goal = id;
                saveState();
                alert(`Goal target set to ${CAREERS_DB.find(c => c.id === id).name}! Redirecting to dashboard.`);
                window.location.hash = "dashboard";
            });
        });
    }


    // --- 4. SKILL GAP ANALYZER ENGINE ---
    function renderAnalyzer() {
        const select = document.getElementById("analyzer-target-select");
        select.innerHTML = "";

        CAREERS_DB.forEach(c => {
            select.innerHTML += `<option value="${c.id}" ${state.profile.goal === c.id ? 'selected' : ''}>${c.name}</option>`;
        });

        // Reset display
        document.getElementById("analyzer-results-panel").classList.add("d-none");
    }

    document.getElementById("run-analyzer-btn").addEventListener("click", () => {
        const targetId = document.getElementById("analyzer-target-select").value;
        const career = CAREERS_DB.find(c => c.id === targetId);
        if (!career) return;

        const resultsPanel = document.getElementById("analyzer-results-panel");
        resultsPanel.classList.remove("d-none");
        document.getElementById("analyzer-title-label").innerText = career.name;

        // Perform intersections
        const have = career.skills.filter(s => state.profile.skills.includes(s));
        const missing = career.skills.filter(s => !state.profile.skills.includes(s));

        // Render Have Skills
        const haveCont = document.getElementById("analyzer-have-skills");
        if (have.length > 0) {
            haveCont.innerHTML = have.map(s => `<span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-35 px-3 py-2 rounded-pill"><i class="bi bi-check-lg"></i> ${s}</span>`).join('');
        } else {
            haveCont.innerHTML = `<span class="text-muted small">None of the required skills acquired yet. Add them in your Profile.</span>`;
        }

        // Render Missing Skills
        const missingCont = document.getElementById("analyzer-missing-skills");
        if (missing.length > 0) {
            missingCont.innerHTML = missing.map(s => `<span class="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-35 px-3 py-2 rounded-pill"><i class="bi bi-x-lg"></i> ${s}</span>`).join('');
        } else {
            missingCont.innerHTML = `<span class="badge bg-success bg-opacity-25 text-success border border-success px-3 py-2 rounded-pill"><i class="bi bi-check-lg"></i> All Core Skills Met!</span>`;
        }

        // Formulate Steps
        const stepsCont = document.getElementById("analyzer-steps-list");
        stepsCont.innerHTML = "";

        if (missing.length > 0) {
            stepsCont.innerHTML += `<li class="mb-2">Visit your <a href="#roadmap" class="text-primary text-decoration-none fw-semibold">Learning Roadmap</a> and mark tasks containing <strong>${missing.join(', ')}</strong> as complete.</li>`;
            
            // Recommending corresponding projects
            const relatedProjs = PROJECTS_DB.filter(p => p.careerId === targetId && p.skills.some(sk => missing.includes(sk)));
            if (relatedProjs.length > 0) {
                stepsCont.innerHTML += `<li class="mb-2">Complete these projects to gain practical skills: <strong>${relatedProjs.slice(0,2).map(p=>`${p.name} (${p.difficulty})`).join(' or ')}</strong>.</li>`;
            }

            // Recommending certifications
            const relatedCerts = CERTIFICATIONS_DB.filter(cer => cer.careers.includes(targetId));
            if (relatedCerts.length > 0) {
                stepsCont.innerHTML += `<li class="mb-0">Earn credentials like <strong>${relatedCerts[0].name}</strong> to structure your learning.</li>`;
            }
        } else {
            stepsCont.innerHTML = `<li>Congratulations! You possess all the baseline skills mapped for this career. Focus on building advanced projects or preparing for interviews.</li>`;
        }
    });


    // --- 5. LEARNING ROADMAP TIMELINE ENGINE ---
    function renderRoadmap(careerId) {
        const career = CAREERS_DB.find(c => c.id === careerId);
        if (!career) return;

        // Sync Dropdown Select values
        const select = document.getElementById("roadmap-career-select");
        select.innerHTML = "";
        CAREERS_DB.forEach(c => {
            select.innerHTML += `<option value="${c.id}" ${careerId === c.id ? 'selected' : ''}>${c.name}</option>`;
        });

        // Set label
        document.getElementById("roadmap-title-label").innerText = `${career.name} Roadmap timeline`;

        // Render Roadmap timesteps
        const container = document.getElementById("roadmap-timeline-container");
        container.innerHTML = "";

        const phases = [
            { key: "beginner", title: "Beginner Stage" },
            { key: "intermediate", title: "Intermediate Stage" },
            { key: "advanced", title: "Advanced Stage" },
            { key: "industryReady", title: "Industry-Ready Stage" }
        ];

        let completedInPhase = 0;
        let totalInPhase = 0;

        phases.forEach((phase, phaseIdx) => {
            const topics = career.learningPath[phase.key] || [];
            totalInPhase += topics.length;

            const card = document.createElement("div");
            
            // Calculate phase completeness status
            const completedTopics = topics.filter((t, topicIdx) => state.completedRoadmapTopics.includes(`${careerId}-${phase.key}-${topicIdx}`));
            completedInPhase += completedTopics.length;

            const isPhaseDone = completedTopics.length === topics.length && topics.length > 0;
            const isPhaseActive = phaseIdx === 0 || topics.length === 0 || completedTopics.length > 0;

            card.className = `timeline-item ${isPhaseDone ? 'completed' : isPhaseActive ? 'active' : ''}`;
            card.innerHTML = `
                <span class="timeline-node-number">${phaseIdx + 1}</span>
                <h4 class="h5 fw-bold mb-3 text-white">${phase.title}</h4>
                <div class="row g-2">
                    ${topics.map((topic, topicIdx) => {
                        const uniqueId = `${careerId}-${phase.key}-${topicIdx}`;
                        const checked = state.completedRoadmapTopics.includes(uniqueId) ? 'checked' : '';
                        return `
                            <div class="col-md-6">
                                <div class="glass-card p-3 d-flex align-items-center justify-content-between">
                                    <span class="small text-secondary fw-semibold">${topic}</span>
                                    <div class="form-check form-switch mb-0">
                                        <input class="form-check-input roadmap-check-toggle" type="checkbox" data-id="${uniqueId}" ${checked}>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            container.appendChild(card);
        });

        // Update complete percentage bars
        const completionRate = totalInPhase > 0 ? Math.round((completedInPhase / totalInPhase) * 100) : 0;
        document.getElementById("roadmap-percent-label").innerText = `${completionRate}%`;
        document.getElementById("roadmap-percent-bar").style.width = `${completionRate}%`;

        // Event listener toggle checks
        document.querySelectorAll(".roadmap-check-toggle").forEach(checkbox => {
            checkbox.addEventListener("change", (e) => {
                const uid = checkbox.getAttribute("data-id");
                const idx = state.completedRoadmapTopics.indexOf(uid);
                if (e.target.checked) {
                    if (idx === -1) state.completedRoadmapTopics.push(uid);
                } else {
                    if (idx > -1) state.completedRoadmapTopics.splice(idx, 1);
                }
                saveState();
                renderRoadmap(careerId); // Rerender matching classes and percentages
            });
        });
    }

    // Change timeline target career handler
    document.getElementById("roadmap-career-select").addEventListener("change", (e) => {
        renderRoadmap(e.target.value);
    });

    // Print print wrapper triggers
    document.getElementById("roadmap-print-btn").addEventListener("click", () => {
        window.print();
    });


    // --- 6. PROJECT RECOMMENDATION CENTER ENGINE ---
    function renderProjects() {
        const selectFilter = document.getElementById("project-career-filter");
        selectFilter.innerHTML = `<option value="all">All Careers</option>`;
        CAREERS_DB.forEach(c => {
            selectFilter.innerHTML += `<option value="${c.id}" ${state.profile.goal === c.id ? 'selected' : ''}>${c.name}</option>`;
        });

        const activeCareer = selectFilter.value;
        const activeDiff = document.getElementById("project-diff-filter").value;

        filterAndRenderProjects(activeCareer, activeDiff);
    }

    function filterAndRenderProjects(careerId, difficulty) {
        const grid = document.getElementById("projects-grid");
        grid.innerHTML = "";

        const filtered = PROJECTS_DB.filter(p => {
            const matchesCareer = careerId === "all" || p.careerId === careerId;
            const matchesDiff = difficulty === "all" || p.difficulty === difficulty;
            return matchesCareer && matchesDiff;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="col-12 py-5 text-center text-muted">No projects found matching these filters.</div>`;
            return;
        }

        filtered.forEach(p => {
            const isCompleted = state.completedProjects.includes(p.id);
            const parentCareer = CAREERS_DB.find(c => c.id === p.careerId);

            const card = document.createElement("div");
            card.className = "col-lg-4 col-md-6";
            card.innerHTML = `
                <div class="glass-card p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="badge bg-secondary bg-opacity-20 text-secondary border border-secondary" style="font-size:10px;">${parentCareer ? parentCareer.name : "Core"}</span>
                            <span class="badge ${p.difficulty === 'Beginner' ? 'bg-success bg-opacity-10 text-success' : p.difficulty === 'Intermediate' ? 'bg-warning bg-opacity-10 text-warning' : 'bg-danger bg-opacity-10 text-danger'} border border-opacity-20" style="font-size:10px;">${p.difficulty}</span>
                        </div>
                        <h4 class="h5 fw-bold mb-2">${p.name}</h4>
                        <p class="text-secondary small mb-3">${p.description}</p>
                    </div>
                    <div>
                        <div class="d-flex flex-wrap gap-1 mb-3">
                            ${p.skills.map(sk => `<span class="badge bg-primary bg-opacity-15 text-primary" style="font-size: 9px;">${sk}</span>`).join('')}
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary border-opacity-10">
                            <span class="text-muted small"><i class="bi bi-clock me-1"></i>${p.estimatedTime}</span>
                            <button class="btn btn-sm ${isCompleted ? 'btn-success' : 'btn-outline-primary rounded-pill'} py-1 px-3 project-toggle-btn" data-id="${p.id}">
                                <i class="bi ${isCompleted ? 'bi-check-lg' : 'bi-play'}"></i> ${isCompleted ? 'Completed' : 'Complete'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Event listener toggle project completions
        document.querySelectorAll(".project-toggle-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const idx = state.completedProjects.indexOf(id);
                if (idx > -1) {
                    state.completedProjects.splice(idx, 1);
                } else {
                    state.completedProjects.push(id);
                }
                saveState();
                filterAndRenderProjects(document.getElementById("project-career-filter").value, document.getElementById("project-diff-filter").value);
            });
        });
    }

    document.getElementById("project-career-filter").addEventListener("change", (e) => {
        filterAndRenderProjects(e.target.value, document.getElementById("project-diff-filter").value);
    });

    document.getElementById("project-diff-filter").addEventListener("change", (e) => {
        filterAndRenderProjects(document.getElementById("project-career-filter").value, e.target.value);
    });


    // --- 7. CERTIFICATION HUB ENGINE ---
    function renderCertifications() {
        const activeProvider = document.querySelector("#cert-provider-filters button.active").getAttribute("data-provider");
        filterAndRenderCerts(activeProvider);
    }

    function filterAndRenderCerts(provider) {
        const grid = document.getElementById("certifications-grid");
        grid.innerHTML = "";

        const filtered = CERTIFICATIONS_DB.filter(cer => {
            return provider === "all" || cer.provider === provider;
        });

        filtered.forEach(cer => {
            const isCompleted = state.completedCerts.includes(cer.id);
            const isBookmarked = state.bookmarkedCerts.includes(cer.id);

            const card = document.createElement("div");
            card.className = "col-lg-4 col-md-6";
            card.innerHTML = `
                <div class="glass-card p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="badge bg-secondary bg-opacity-25 text-white" style="font-size:10px;">${cer.provider}</span>
                            <div class="d-flex gap-1">
                                <button class="btn btn-sm btn-link p-0 text-secondary cert-bookmark-btn" data-id="${cer.id}">
                                    <i class="bi ${isBookmarked ? 'bi-bookmark-fill text-warning' : 'bi-bookmark'}"></i>
                                </button>
                            </div>
                        </div>
                        <h4 class="h5 fw-bold mb-2">${cer.name}</h4>
                        <p class="text-secondary small mb-3">${cer.benefits}</p>
                    </div>
                    <div>
                        <div class="small text-secondary mb-3">
                            <div class="mb-1"><i class="bi bi-clock me-2 text-primary"></i> <strong>Duration:</strong> ${cer.duration}</div>
                            <div><i class="bi bi-bar-chart me-2 text-primary"></i> <strong>Level:</strong> ${cer.difficulty}</div>
                        </div>
                        <button class="btn btn-sm ${isCompleted ? 'btn-success w-100' : 'btn-outline-primary w-100 rounded-pill'} py-2 cert-complete-btn" data-id="${cer.id}">
                            <i class="bi ${isCompleted ? 'bi-check-circle-fill' : 'bi-award'}"></i> ${isCompleted ? 'Credential Earned' : 'Mark as Completed'}
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Event bindings
        document.querySelectorAll(".cert-complete-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const idx = state.completedCerts.indexOf(id);
                if (idx > -1) {
                    state.completedCerts.splice(idx, 1);
                } else {
                    state.completedCerts.push(id);
                }
                saveState();
                filterAndRenderCerts(document.querySelector("#cert-provider-filters button.active").getAttribute("data-provider"));
            });
        });

        document.querySelectorAll(".cert-bookmark-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const idx = state.bookmarkedCerts.indexOf(id);
                if (idx > -1) {
                    state.bookmarkedCerts.splice(idx, 1);
                } else {
                    state.bookmarkedCerts.push(id);
                }
                saveState();
                filterAndRenderCerts(document.querySelector("#cert-provider-filters button.active").getAttribute("data-provider"));
            });
        });
    }

    // Provider filter button triggers
    document.querySelectorAll("#cert-provider-filters button").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#cert-provider-filters button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderCertifications();
        });
    });


    // --- 8. RESUME BUILDER ENGINE ---
    const resumeForm = document.getElementById("resume-form");
    const resumePreview = document.getElementById("resume-document");

    function renderResume() {
        // Automatically fetch current completed lists to prefill sections
        const acquiredSkills = state.profile.skills;
        
        const completedProjects = PROJECTS_DB.filter(p => state.completedProjects.includes(p.id));
        const completedCerts = CERTIFICATIONS_DB.filter(cer => state.completedCerts.includes(cer.id));

        // Get Input Values
        const nameVal = document.getElementById("res-name").value;
        const emailVal = document.getElementById("res-email").value;
        const phoneVal = document.getElementById("res-phone").value;
        const linksVal = document.getElementById("res-links").value;
        const degreeVal = document.getElementById("res-degree").value;
        const uniVal = document.getElementById("res-uni").value;
        const objective = document.getElementById("res-summary").value;

        // Compile HTML layout for printable preview
        resumePreview.innerHTML = `
            <div class="resume-header text-center">
                <h1 class="resume-title display-6 mb-1">${nameVal || 'STUDENT NAME'}</h1>
                <div class="resume-contact-info d-flex justify-content-center flex-wrap gap-3 mt-2">
                    <span><i class="bi bi-envelope"></i> ${emailVal}</span>
                    <span><i class="bi bi-telephone"></i> ${phoneVal}</span>
                    <span><i class="bi bi-globe"></i> ${linksVal}</span>
                </div>
            </div>

            <div class="resume-section mb-4">
                <h3 class="resume-section-title">Objective</h3>
                <p class="small text-secondary mb-0">${objective}</p>
            </div>

            <div class="resume-section mb-4">
                <h3 class="resume-section-title">Education</h3>
                <div class="resume-item">
                    <div class="d-flex justify-content-between">
                        <span class="resume-item-title">${degreeVal || 'Degree/Major Details'}</span>
                        <span class="small text-muted">2023 - Present</span>
                    </div>
                    <div class="resume-item-subtitle">${uniVal || 'Institution / University'}</div>
                </div>
            </div>

            <div class="resume-section mb-4">
                <h3 class="resume-section-title">Verified Skills Inventory</h3>
                <div class="d-flex flex-wrap">
                    ${acquiredSkills.map(s => `<span class="resume-tag">${s}</span>`).join('')}
                    ${acquiredSkills.length === 0 ? '<span class="text-muted small">No verified skills entered. Update your Profile catalog.</span>' : ''}
                </div>
            </div>

            <div class="resume-section mb-4">
                <h3 class="resume-section-title">Key Projects Mapped</h3>
                ${completedProjects.map(p => `
                    <div class="resume-item mb-2">
                        <div class="d-flex justify-content-between">
                            <span class="resume-item-title">${p.name}</span>
                            <span class="small text-muted">${p.difficulty}</span>
                        </div>
                        <p class="small text-secondary mb-1">${p.description}</p>
                        <div>
                            ${p.skills.map(sk => `<span class="badge bg-light border text-dark me-1" style="font-size:9px;">${sk}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
                ${completedProjects.length === 0 ? '<span class="text-muted small">No completed projects listed yet. Mark items in Project Center.</span>' : ''}
            </div>

            <div class="resume-section">
                <h3 class="resume-section-title">Professional Certifications</h3>
                ${completedCerts.map(cer => `
                    <div class="resume-item mb-2">
                        <div class="d-flex justify-content-between">
                            <span class="resume-item-title">${cer.name}</span>
                            <span class="small text-muted">${cer.duration}</span>
                        </div>
                        <div class="resume-item-subtitle">${cer.provider} Certification</div>
                    </div>
                `).join('')}
                ${completedCerts.length === 0 ? '<span class="text-muted small">No certifications earned yet. Complete credentials in Certification Hub.</span>' : ''}
            </div>
        `;
    }

    // Auto-compiling layout on form input changes
    const inputs = resumeForm.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("input", renderResume);
    });

    document.getElementById("print-resume-btn").onclick = () => {
        window.print();
    };


    // --- 9. INTERVIEW PREPARATION PORTAL ENGINE ---
    function renderInterviews(careerId) {
        const career = CAREERS_DB.find(c => c.id === careerId);
        if (!career) return;

        const select = document.getElementById("interview-career-select");
        select.innerHTML = "";
        CAREERS_DB.forEach(c => {
            select.innerHTML += `<option value="${c.id}" ${careerId === c.id ? 'selected' : ''}>${c.name}</option>`;
        });

        const activeCat = document.querySelector("#prep-cards-container").getAttribute("data-active-category") || "tech";
        loadInterviewQuestions(careerId, activeCat);
    }

    function loadInterviewQuestions(careerId, category) {
        const container = document.getElementById("prep-cards-container");
        container.setAttribute("data-active-category", category);
        container.innerHTML = "";

        const questionsData = INTERVIEWS_DB[careerId] || { tech: [], hr: [], aptitude: [], gd: [] };

        if (category === "gd") {
            const list = questionsData.gd || [];
            if (list.length === 0) {
                container.innerHTML = `<div class="py-5 text-center text-muted">No discussion topics mapped for this track.</div>`;
                return;
            }
            list.forEach(topic => {
                const card = document.createElement("div");
                card.className = "glass-card p-4 mb-3 border-glow-primary";
                card.innerHTML = `
                    <h4 class="h6 fw-bold mb-2 text-primary"><i class="bi bi-chat-quote-fill me-2"></i>GD Prompt</h4>
                    <p class="text-secondary small mb-0">${topic}</p>
                `;
                container.appendChild(card);
            });
        } else {
            const list = questionsData[category] || [];
            if (list.length === 0) {
                container.innerHTML = `<div class="py-5 text-center text-muted">No questions mapped for this category yet.</div>`;
                return;
            }

            list.forEach((qObj, idx) => {
                const card = document.createElement("div");
                card.className = "prep-card mb-4";
                card.innerHTML = `
                    <div class="prep-card-inner glass-card">
                        <div class="prep-card-front">
                            <span class="badge bg-secondary bg-opacity-20 text-primary border border-secondary border-opacity-10 align-self-start mb-2">Question ${idx + 1}</span>
                            <h4 class="h6 fw-bold text-white mb-3">${qObj.q}</h4>
                            <div class="text-end text-muted small mt-auto"><i class="bi bi-arrow-repeat me-1"></i>Click to Flip & Reveal</div>
                        </div>
                        <div class="prep-card-back">
                            <span class="badge bg-success bg-opacity-20 text-success border border-success border-opacity-10 align-self-start mb-2">Answer Guideline</span>
                            <p class="small text-secondary mb-0 overflow-y-auto" style="max-height: 120px;">${qObj.a}</p>
                            <div class="text-end text-muted small mt-auto"><i class="bi bi-arrow-repeat me-1"></i>Click to Flip back</div>
                        </div>
                    </div>
                `;
                card.addEventListener("click", () => {
                    card.classList.toggle("flipped");
                });
                container.appendChild(card);
            });
        }
    }

    // Dropdown change binder
    document.getElementById("interview-career-select").addEventListener("change", (e) => {
        renderInterviews(e.target.value);
    });

    // Pill categories binders
    document.querySelectorAll("#view-interviews .nav-link").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const cat = btn.getAttribute("data-category");
            const careerId = document.getElementById("interview-career-select").value;
            loadInterviewQuestions(careerId, cat);
        });
    });


    // --- 10. PROGRESS TRACKER ENGINE ---
    function renderTracker() {
        const goalId = state.profile.goal;
        
        document.getElementById("track-skills-count").innerText = state.profile.skills.length;
        document.getElementById("track-projects-count").innerText = state.completedProjects.length;
        document.getElementById("track-certs-count").innerText = state.completedCerts.length;
        
        const readiness = calculateReadiness();
        document.getElementById("track-readiness-percent").innerText = `${readiness}%`;

        // Render Completed Certs Table
        const certTable = document.getElementById("track-certs-table");
        certTable.innerHTML = "";
        
        const completedCerts = CERTIFICATIONS_DB.filter(cer => state.completedCerts.includes(cer.id));
        if (completedCerts.length === 0) {
            certTable.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-muted">No certifications completed yet.</td></tr>`;
        } else {
            completedCerts.forEach(cer => {
                const tr = document.createElement("tr");
                tr.className = "border-bottom border-secondary border-opacity-10";
                tr.innerHTML = `
                    <td class="text-white fw-bold">${cer.name}</td>
                    <td>${cer.provider}</td>
                    <td><span class="badge bg-secondary bg-opacity-20 text-secondary">${cer.difficulty}</span></td>
                `;
                certTable.appendChild(tr);
            });
        }

        // Render Completed Projects Table
        const projTable = document.getElementById("track-projects-table");
        projTable.innerHTML = "";

        const completedProjs = PROJECTS_DB.filter(p => state.completedProjects.includes(p.id));
        if (completedProjs.length === 0) {
            projTable.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-muted">No projects completed yet.</td></tr>`;
        } else {
            completedProjs.forEach(p => {
                const tr = document.createElement("tr");
                tr.className = "border-bottom border-secondary border-opacity-10";
                tr.innerHTML = `
                    <td class="text-white fw-bold">${p.name}</td>
                    <td><span class="badge bg-secondary bg-opacity-20 text-secondary">${p.difficulty}</span></td>
                    <td>${p.estimatedTime}</td>
                `;
                projTable.appendChild(tr);
            });
        }
    }


    // --- 11. STUDENT PROFILE PAGE ENGINE ---
    const profileForm = document.getElementById("profile-form");
    
    function renderProfile() {
        document.getElementById("profile-name").value = state.profile.name;
        document.getElementById("profile-bio").value = state.profile.bio;

        // Populate Target goals dropdown
        const select = document.getElementById("profile-goal-select");
        select.innerHTML = "";
        CAREERS_DB.forEach(c => {
            select.innerHTML += `<option value="${c.id}" ${state.profile.goal === c.id ? 'selected' : ''}>${c.name}</option>`;
        });

        // Populate Master Skills checklist
        const listCont = document.getElementById("profile-skills-checklist");
        listCont.innerHTML = "";

        SKILLS_LIST.forEach(skill => {
            const hasSkill = state.profile.skills.includes(skill);
            
            const col = document.createElement("div");
            col.className = "col-lg-3 col-md-4 col-sm-6";
            col.innerHTML = `
                <div class="glass-card p-2 px-3 d-flex align-items-center justify-content-between">
                    <span class="small text-secondary fw-semibold">${skill}</span>
                    <input class="form-check-input profile-skill-check" type="checkbox" data-skill="${skill}" ${hasSkill ? 'checked' : ''}>
                </div>
            `;
            listCont.appendChild(col);
        });
    }

    // Save profile changes
    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameVal = document.getElementById("profile-name").value.trim();
        const goalVal = document.getElementById("profile-goal-select").value;
        const bioVal = document.getElementById("profile-bio").value.trim();

        // Get all checked skills
        const checkedSkills = [];
        document.querySelectorAll(".profile-skill-check:checked").forEach(checkbox => {
            checkedSkills.push(checkbox.getAttribute("data-skill"));
        });

        state.profile = {
            name: nameVal || "Student",
            goal: goalVal,
            bio: bioVal,
            skills: checkedSkills
        };

        saveState();
        alert("Profile details saved successfully!");
        window.location.hash = "dashboard";
    });

    // Reset profile storage button
    document.getElementById("profile-reset-btn").onclick = resetStorage;


    // --- INITIALIZATION ---
    loadState();
    updateGlobalMetrics();
    handleRouting(); // First load routing
});
