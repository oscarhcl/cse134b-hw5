const localProjectsData = [
    {
        id: 1,
        title: "Leaseflow AI - LLM-powered Rental Search Platform",
        image: "pickup1.png",
        imageAlt: "Leaseflow AI platform interface showing rental search with AI chat assistant",
        description: "Built and deployed a full-stack rental search platform with an LLM-powered chat assistant, designing and containerizing 7 REST APIs (Python, Express) for listing retrieval, chat logic, and query filtering. Integrated MongoDB Atlas vector search to reduce semantic query latency by 135%.",
        technologies: "React, Node.js, Express, MongoDB, LangChain, Docker",
        date: "2024",
        link: "https://github.com",
        linkText: "View Project"
    },
    {
        id: 2,
        title: "On-campus Pickup Basketball Virtual Queuing iOS App",
        image: "pickup2.png",
        imageAlt: "Pickup Basketball app screenshot showing virtual queue interface and live game tracking",
        description: "Built a React Native iOS app for UCSD students to manage pickup basketball through virtual queues, live game tracking, and player profiles. Implemented Apple ID login and real-time Supabase sync, achieving less than 200ms update latency.",
        technologies: "React Native, Supabase, Expo, Apple ID Auth",
        date: "2024",
        link: "https://github.com",
        linkText: "View Source Code"
    },
    {
        id: 3,
        title: "Immersion Coffee Website Revamped",
        image: "immersion1.png",
        imageAlt: "Immersion Coffee website homepage showing modern responsive design",
        description: "Redesigned the frontend for a San Diego coffee shop's website using React. Improved page load speed by 40% and visual consistency across 10+ components through Git and Figma-driven collaboration.",
        technologies: "React, HTML5, CSS3, TypeScript, Node.js, Figma",
        date: "2023",
        link: "https://github.com",
        linkText: "View Website"
    }
];

function initializeLocalStorage() {
    if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify(localProjectsData));
    }
}

function renderProjectCards(projects) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('project-card');
        card.setAttribute('title', project.title);
        card.setAttribute('image', project.image);
        card.setAttribute('image-alt', project.imageAlt || 'Project image');
        card.setAttribute('description', project.description);

        if (project.technologies) {
            card.setAttribute('technologies', project.technologies);
        }
        if (project.date) {
            card.setAttribute('date', project.date);
        }
        if (project.link) {
            card.setAttribute('link', project.link);
        }
        if (project.linkText) {
            card.setAttribute('link-text', project.linkText);
        }

        container.appendChild(card);
    });
}

function loadLocalProjects() {
    try {
        const data = localStorage.getItem('projects');
        if (data) {
            const projects = JSON.parse(data);
            renderProjectCards(projects);
        } else {
            alert('No local data found. Initializing with default data...');
            initializeLocalStorage();
            loadLocalProjects();
        }
    } catch (error) {
        alert('Error loading local data: ' + error.message);
    }
}

async function loadRemoteProjects() {
    const remoteUrl = 'https://my-json-server.typicode.com/oscarhcl/cse134b-hw5/projects';

    try {
        const response = await fetch(remoteUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const projects = await response.json();

        const mappedProjects = projects.map(project => ({
            title: project.title,
            image: project.image,
            imageAlt: project.imageAlt,
            description: project.description,
            technologies: project.technologies || '',
            date: project.date || '',
            link: project.link || 'https://github.com',
            linkText: project.linkText || 'Learn More'
        }));

        renderProjectCards(mappedProjects);
    } catch (error) {
        alert('Error loading remote data: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLocalStorage();

    const buttonContainer = document.querySelector('.button-container');

    if (buttonContainer) {
        buttonContainer.addEventListener('click', (event) => {
            const target = event.target;

            if (target.id === 'load-local-btn') {
                loadLocalProjects();
            } else if (target.id === 'load-remote-btn') {
                loadRemoteProjects();
            }
        });
    }
});
