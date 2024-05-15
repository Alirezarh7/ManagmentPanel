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
	calender: '/calender'
};
