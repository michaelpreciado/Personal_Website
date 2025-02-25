import React, { useState } from 'react';
import ProjectsSidebar from '../components/ProjectsSidebar';

const ProjectsPage = () => {
    // Define categories for filtering
    const categories = ['all', 'web', 'mobile', 'design', 'other'];
    
    // Define projects data
    const projects = [
        {
            id: 1,
            title: 'Project 1',
            description: 'Description for Project 1',
            category: 'web',
            image: '/images/project1.jpg',
        },
        {
            id: 2,
            title: 'Project 2',
            description: 'Description for Project 2',
            category: 'mobile',
            image: '/images/project2.jpg',
        },
        {
            id: 3,
            title: 'Project 3',
            description: 'Description for Project 3',
            category: 'design',
            image: '/images/project3.jpg',
        },
        // Add more projects as needed
    ];

    const [activeCategory, setActiveCategory] = useState('all');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Filter projects based on active category
    const filteredProjects = projects.filter(project => 
        activeCategory === 'all' || project.category === activeCategory
    );

    return (
        <div className="projects-container">
            <div className="filter-buttons">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            {/* Sidebar component */}
            <ProjectsSidebar 
                isVisible={isSidebarVisible} 
                onClose={toggleSidebar}
            />
            
            {/* Display filtered projects */}
            <div className="projects-grid">
                {filteredProjects.map(project => (
                    <div key={project.id} className="project-card">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <span className="category-tag">{project.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;