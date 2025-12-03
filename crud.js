const projectForm = document.getElementById('project-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const projectsList = document.getElementById('projects-list');
const projectIdInput = document.getElementById('project-id');

let editingId = null;

function getProjects() {
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : [];
}

function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function generateId() {
    return Date.now();
}

function renderProjectsList() {
    const projects = getProjects();
    projectsList.innerHTML = '';

    if (projects.length === 0) {
        projectsList.innerHTML = '<p class="no-projects">No projects found. Create one above!</p>';
        return;
    }

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card-item';
        card.innerHTML = `
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p class="project-meta">${project.date || 'No date'} | ${project.technologies || 'No technologies'}</p>
                <p class="project-desc">${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
            </div>
            <div class="project-card-actions">
                <button type="button" class="btn-edit" data-id="${project.id}">Edit</button>
                <button type="button" class="btn-delete" data-id="${project.id}">Delete</button>
            </div>
        `;
        projectsList.appendChild(card);
    });
}

function createProject(projectData) {
    const projects = getProjects();
    const newProject = {
        id: generateId(),
        ...projectData
    };
    projects.push(newProject);
    saveProjects(projects);
    return newProject;
}

function updateProject(id, projectData) {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...projectData };
        saveProjects(projects);
        return projects[index];
    }
    return null;
}

function deleteProject(id) {
    const projects = getProjects();
    const filtered = projects.filter(p => p.id !== id);
    saveProjects(filtered);
}

function getFormData() {
    return {
        title: document.getElementById('project-title').value.trim(),
        image: document.getElementById('project-image').value.trim(),
        imageAlt: document.getElementById('project-image-alt').value.trim(),
        description: document.getElementById('project-description').value.trim(),
        technologies: document.getElementById('project-technologies').value.trim(),
        date: document.getElementById('project-date').value.trim(),
        link: document.getElementById('project-link').value.trim(),
        linkText: document.getElementById('project-link-text').value.trim()
    };
}

function setFormData(project) {
    document.getElementById('project-title').value = project.title || '';
    document.getElementById('project-image').value = project.image || '';
    document.getElementById('project-image-alt').value = project.imageAlt || '';
    document.getElementById('project-description').value = project.description || '';
    document.getElementById('project-technologies').value = project.technologies || '';
    document.getElementById('project-date').value = project.date || '';
    document.getElementById('project-link').value = project.link || '';
    document.getElementById('project-link-text').value = project.linkText || '';
}

function clearForm() {
    projectForm.reset();
    projectIdInput.value = '';
    editingId = null;
    formTitle.textContent = 'Create New Project';
    submitBtn.textContent = 'Create Project';
    cancelBtn.style.display = 'none';
}

function enterEditMode(project) {
    editingId = project.id;
    setFormData(project);
    formTitle.textContent = 'Edit Project';
    submitBtn.textContent = 'Update Project';
    cancelBtn.style.display = 'inline-block';
    projectForm.scrollIntoView({ behavior: 'smooth' });
}

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = getFormData();

    if (editingId) {
        updateProject(editingId, formData);
        alert('Project updated successfully!');
    } else {
        createProject(formData);
        alert('Project created successfully!');
    }

    clearForm();
    renderProjectsList();
});

cancelBtn.addEventListener('click', () => {
    clearForm();
});

projectsList.addEventListener('click', (e) => {
    const target = e.target;
    const id = parseInt(target.dataset.id);

    if (target.classList.contains('btn-edit')) {
        const projects = getProjects();
        const project = projects.find(p => p.id === id);
        if (project) {
            enterEditMode(project);
        }
    }

    if (target.classList.contains('btn-delete')) {
        if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
            renderProjectsList();
            alert('Project deleted successfully!');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderProjectsList();
});
