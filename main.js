function fetchBlogs() {
    fetch('blogs.json')
        .then(response => response.json())
        .then(data => {
            displayBlogs(data);
        })
        .catch(error => console.error('Error loading blogs:', error));
}

function displayBlogs(blogs) {
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';

    blogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.className = 'blog-item';
        blogItem.setAttribute('onclick', `viewBlog(${blog.id}, '${blog.title}', '${blog.date}', \`${blog.content}\`)`);
        blogItem.innerHTML = `
            <h2>${blog.title}</h2>
            <p>${blog.date}</p>
        `;
        blogList.appendChild(blogItem);
    });
}

function viewBlog(id, title, date, content) {
    document.getElementById('blogTitle').textContent = title;
    document.getElementById('blogDate').textContent = date;
    document.getElementById('blogContent').innerHTML = content;

    document.getElementById('blogList').style.display = 'none';  // Hide the blog list grid
    document.getElementById('blogDetail').style.display = 'block';  // Show the blog detail view
}

function goBack() {
    document.getElementById('blogList').style.display = 'grid';  // Restoring the grid layout
    document.getElementById('blogDetail').style.display = 'none';  // Hide the blog detail view
}

function searchBlogs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetch('blogs.json')
        .then(response => response.json())
        .then(data => {
            const filteredBlogs = data.filter(blog => blog.title.toLowerCase().includes(searchInput));
            displayBlogs(filteredBlogs);
        })
        .catch(error => console.error('Error searching blogs:', error));
}

window.onload = fetchBlogs;
let allBlogs = [];  // Store all blogs globally

// Fetch the blogs and store them
function fetchBlogs() {
    fetch('blogs.json')
        .then(response => response.json())
        .then(data => {
            allBlogs = data.sort((a, b) => new Date(b.date) - new Date(a.date));  // Store sorted blogs (newest first)
            displayBlogs(allBlogs.slice(0, 5));  // Show only the first 5 blogs initially
        })
        .catch(error => console.error('Error loading blogs:', error));
}

// Display blogs on the page
function displayBlogs(blogs) {
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';  // Clear the current list

    blogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.className = 'blog-item';
        blogItem.setAttribute('onclick', `viewBlog(${blog.id}, '${blog.title}', '${blog.date}', \`${blog.content}\`)`);
        blogItem.innerHTML = `
            <h2>${blog.title}</h2>
            <p>${blog.date}</p>
        `;
        blogList.appendChild(blogItem);
    });
}

// Filter blogs by the selected date range
function filterByDateRange() {
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    
    if (!startDateInput || !endDateInput) {
        alert("Please select both start and end dates.");
        return;
    }

    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    // Check if the endDate is not before the startDate
    if (endDate < startDate) {
        alert("End date must be after the start date.");
        return;
    }

    // Check if the date range exceeds 5 days
    const differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (differenceInDays > 5) {
        alert("The date range cannot exceed 5 days.");
        return;
    }

    const filteredBlogs = allBlogs.filter(blog => {
        const blogDate = new Date(blog.date);
        return blogDate >= startDate && blogDate <= endDate;
    });

    displayBlogs(filteredBlogs);  // Display the filtered blogs
}

// View individual blog
function viewBlog(id, title, date, content) {
    document.getElementById('blogTitle').textContent = title;
    document.getElementById('blogDate').textContent = date;
    document.getElementById('blogContent').innerHTML = content;

    document.getElementById('blogList').style.display = 'none';  // Hide the blog list
    document.getElementById('blogDetail').style.display = 'block';  // Show the blog detail view
}

// Go back to the blog list
function goBack() {
    document.getElementById('blogList').style.display = 'grid';  // Restore grid layout
    document.getElementById('blogDetail').style.display = 'none';  // Hide blog detail view
}

// Search blogs by title
function searchBlogs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredBlogs = allBlogs.filter(blog => blog.title.toLowerCase().includes(searchInput));
    displayBlogs(filteredBlogs);  // Display filtered blogs based on search input
}

// Load the blogs when the page loads
window.onload = fetchBlogs;