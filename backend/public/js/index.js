'use strict';

const addTopicSidebar = document.querySelector('#addTopicSidebar');
const addTopicOpen = document.querySelector('.addTopicOpen');
const addTopicClose = document.querySelector('.addTopicClose');

if (addTopicSidebar) {
	addTopicOpen.addEventListener('click', (e) => {
		e.preventDefault();
		addTopicSidebar.classList.remove('translate-x-[100%]');
	});

	addTopicClose.addEventListener('click', (e) => {
		e.preventDefault();
		addTopicSidebar.classList.add('translate-x-[100%]');
	});
}

const sidebarOpener = document.querySelector('.sidebar-opener');
const sidebarClose = document.querySelector('.sidebar-close');
const sidebar = document.querySelector('.sidebar');

sidebarOpener.addEventListener('click', (e) => {
	e.preventDefault();
	console.log('clicked');
	sidebar.classList.remove('translate-x-[-100%]');
});

sidebarClose.addEventListener('click', (e) => {
	e.preventDefault();
	sidebar.classList.add('translate-x-[-100%]');
});
