export const PATHS = {
	home: '/',
	announcements: {
		index: '/announcements',
		create: '/announcements/create',
		show: '/announcements/:id',
		showFn: (id: string) => `/announcements/${id}`
	}
};
