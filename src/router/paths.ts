export const PATHS = {
	home: '/',
	announcements: {
		index: '/announcements',
		create: '/announcements/create',
		show: '/announcements/:id',
		showFn: (id: string) => `/announcements/${id}`,
		edit: '/announcements/:id/edit',
		editFn: (id: string) => `/announcements/${id}/edit`
	},
	contents: {
		index: '/contents',
		create: '/contents/create',
		show: '/contents/:id',
		showFn: (id: string) => `/contents/${id}`,
		edit: '/contents/:id/edit',
		editFn: (id: string) => `/contents/${id}/edit`
	},
	calender: '/calender'
};
