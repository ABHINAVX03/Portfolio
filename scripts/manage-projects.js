#!/usr/bin/env node

/**
 * Single-file Project Management Script
 *
 * Use the JSON file at src/utils/projects/index.json as the single source of project data.
 * Run from repository root:
 *   node scripts/manage-projects.js <command>
 *
 * Commands:
 *   list                        List all projects
 *   add <id>                    Add a new project to index.json
 *   update <id> <field=value>   Update fields for a project
 *   delete <id>                 Delete a project from index.json
 *   validate                    Validate index.json project data
 *   stats                       Show project statistics
 *   sort-index | reindex        Sort index.json by priority, featured, and year
 */

const fs = require('fs');
const path = require('path');

const INDEX_FILE = path.join(__dirname, '../src/utils/projects/index.json');

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return null;
  }
}

function saveJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Saved ${filePath}`);
  } catch (error) {
    console.error(`Error saving ${filePath}:`, error.message);
  }
}

function getProjects() {
  const index = loadJSON(INDEX_FILE);
  return index ? index.projects || [] : [];
}

function writeIndex(projects) {
  const indexData = {
    projects,
    metadata: {
      totalProjects: projects.length,
      featuredProjects: projects.filter((project) => project.featured).length,
      lastUpdated: new Date().toISOString().split('T')[0],
      version: '1.0.0'
    }
  };

  saveJSON(INDEX_FILE, indexData);
}

function sortProjects(projects) {
  return projects.slice().sort((a, b) => {
    const aPriority = typeof a.priority === 'number' ? a.priority : 999;
    const bPriority = typeof b.priority === 'number' ? b.priority : 999;
    if (aPriority !== bPriority) return aPriority - bPriority;
    if (a.featured !== b.featured) return b.featured - a.featured;
    return b.year - a.year;
  });
}

function listProjects() {
  const projects = getProjects();
  console.log('📋 Current Projects:\n');
  projects.forEach((project, index) => {
    console.log(`${index + 1}. ${project.name}`);
    console.log(`   ID: ${project.id}`);
    console.log(`   Status: ${project.status} (${project.year})`);
    console.log(`   Featured: ${project.featured ? '⭐' : '❌'}`);
    console.log(`   Priority: ${project.priority}`);
    console.log(`   Tags: ${project.tags.join(', ')}\n`);
  });
}

function formatProjectName(projectId) {
  return projectId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function addProject(projectId) {
  const projects = getProjects();
  if (projects.some((project) => project.id === projectId)) {
    console.error(`❌ Project ${projectId} already exists in index.json`);
    return;
  }

  const project = {
    id: projectId,
    name: formatProjectName(projectId),
    type: 'Full Stack · React',
    repo: null,
    deploy: null,
    image: '/projects/default.png',
    description: 'Write a short project description here.',
    tags: ['React', 'JavaScript'],
    color: 'primary',
    priority: 99,
    featured: false,
    year: new Date().getFullYear(),
    status: 'planned'
  };

  projects.push(project);
  writeIndex(sortProjects(projects));
  console.log(`✅ Added project ${projectId} to index.json`);
}

function parseUpdateArgs(args) {
  const updates = {};
  args.forEach((arg) => {
    const [key, ...rest] = arg.split('=');
    if (!key || rest.length === 0) return;
    let value = rest.join('=');
    const trimmed = value.trim();
    if (trimmed === 'null') {
      value = null;
    } else if (trimmed === 'true' || trimmed === 'false') {
      value = trimmed === 'true';
    } else if (!Number.isNaN(Number(trimmed)) && trimmed !== '') {
      value = Number(trimmed);
    } else {
      value = trimmed.replace(/^['\"]|['\"]$/g, '');
    }
    if (key === 'tags' && typeof value === 'string') {
      value = value.split(',').map((item) => item.trim()).filter(Boolean);
    }
    updates[key] = value;
  });
  return updates;
}

function updateProject(projectId, updateArgs) {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.id === projectId);
  if (index === -1) {
    console.error(`❌ Project ${projectId} not found in index.json`);
    return;
  }

  const updates = parseUpdateArgs(updateArgs);
  if (Object.keys(updates).length === 0) {
    console.error('❌ No updates provided. Use key=value pairs.');
    return;
  }

  const allowedFields = [
    'name', 'type', 'repo', 'deploy', 'image', 'description',
    'tags', 'color', 'priority', 'featured', 'year', 'status'
  ];

  Object.entries(updates).forEach(([key, value]) => {
    if (!allowedFields.includes(key)) {
      console.warn(`⚠️  Skipping unsupported field: ${key}`);
      return;
    }
    projects[index][key] = value;
  });

  writeIndex(sortProjects(projects));
  console.log(`✅ Updated project ${projectId} in index.json`);
}

function deleteProject(projectId) {
  let projects = getProjects();
  if (!projects.some((project) => project.id === projectId)) {
    console.error(`❌ Project ${projectId} not found in index.json`);
    return;
  }

  projects = projects.filter((project) => project.id !== projectId);
  writeIndex(sortProjects(projects));
  console.log(`✅ Deleted project ${projectId} from index.json`);
}

function validateProjects() {
  const projects = getProjects();
  console.log('🔍 Validating projects in index.json...\n');
  let errors = 0;

  projects.forEach((project) => {
    const issues = [];
    const requiredFields = [
      'id', 'name', 'type', 'description', 'tags', 'color',
      'featured', 'year', 'status', 'priority', 'image'
    ];

    requiredFields.forEach((field) => {
      if (project[field] === undefined || project[field] === null) {
        issues.push(`Missing required field: ${field}`);
      }
    });

    if (typeof project.featured !== 'boolean') {
      issues.push('featured must be a boolean');
    }
    if (typeof project.priority !== 'number' || Number.isNaN(project.priority)) {
      issues.push('priority must be a valid number');
    }

    const validColors = ['primary', 'cyan', 'violet', 'emerald'];
    if (!validColors.includes(project.color)) {
      issues.push(`Invalid color: ${project.color}`);
    }

    const validStatuses = ['completed', 'in-progress', 'planned'];
    if (!validStatuses.includes(project.status)) {
      issues.push(`Invalid status: ${project.status}`);
    }

    if (issues.length > 0) {
      console.log(`❌ ${project.name} (${project.id}):`);
      issues.forEach((issue) => console.log(`   - ${issue}`));
      errors += 1;
    } else {
      console.log(`✅ ${project.name} (${project.id})`);
    }
  });

  console.log(`\n📊 Validation complete: ${errors} errors found`);
}

function showStats() {
  const projects = getProjects();
  const stats = {
    total: projects.length,
    featured: projects.filter((p) => p.featured).length,
    completed: projects.filter((p) => p.status === 'completed').length,
    inProgress: projects.filter((p) => p.status === 'in-progress').length,
    technologies: {},
    years: {}
  };

  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      stats.technologies[tag] = (stats.technologies[tag] || 0) + 1;
    });
    stats.years[project.year] = (stats.years[project.year] || 0) + 1;
  });

  console.log('📊 Project Statistics:\n');
  console.log(`Total Projects: ${stats.total}`);
  console.log(`Featured Projects: ${stats.featured}`);
  console.log(`Completed: ${stats.completed}`);
  console.log(`In Progress: ${stats.inProgress}`);
  console.log('\nTechnologies Used:');

  Object.entries(stats.technologies)
    .sort(([, a], [, b]) => b - a)
    .forEach(([tech, count]) => {
      console.log(`  ${tech}: ${count}`);
    });

  console.log('\nProjects by Year:');
  Object.entries(stats.years)
    .sort(([, a], [, b]) => b - a)
    .forEach(([year, count]) => {
      console.log(`  ${year}: ${count}`);
    });
}

const [,, command, ...args] = process.argv;

switch (command) {
  case 'list':
    listProjects();
    break;
  case 'add':
    if (!args[0]) {
      console.error('❌ Please provide a project ID: node scripts/manage-projects.js add <project-id>');
      process.exit(1);
    }
    addProject(args[0]);
    break;
  case 'update':
    if (!args[0]) {
      console.error('❌ Please provide a project ID: node scripts/manage-projects.js update <project-id> <field=value>...');
      process.exit(1);
    }
    updateProject(args[0], args.slice(1));
    break;
  case 'delete':
    if (!args[0]) {
      console.error('❌ Please provide a project ID: node scripts/manage-projects.js delete <project-id>');
      process.exit(1);
    }
    deleteProject(args[0]);
    break;
  case 'validate':
    validateProjects();
    break;
  case 'stats':
    showStats();
    break;
  case 'sort-index':
  case 'reindex':
    writeIndex(sortProjects(getProjects()));
    console.log('✅ index.json sorted');
    break;
  default:
    console.log(`
🛠️  Single-file Project Management Script

Usage: node scripts/manage-projects.js <command>

Commands:
  list                           List all projects
  add <id>                       Add a new project to index.json
  update <id> <field=value>...   Update fields for a project
  delete <id>                    Delete a project from index.json
  validate                       Validate index.json project data
  stats                          Show project statistics
  sort-index | reindex           Sort index.json by priority, featured, year

Examples:
  node scripts/manage-projects.js list
  node scripts/manage-projects.js add my-new-project
  node scripts/manage-projects.js update hospital-management priority=2 featured=true
  node scripts/manage-projects.js delete travel-world
  node scripts/manage-projects.js reindex
    `);
}
