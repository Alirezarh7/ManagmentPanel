export const PATHS = {
	home: '/',
	frameWork: {
		silentCallback: '/SilentCallback'
	},
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
	faqContents: {
		index: '/faq-contents',
		create: '/faq-contents/create',
		show: '/faq-contents/:id',
		showFn: (id: string) => `/faq-contents/${id}`,
		edit: '/faq-contents/:id/edit',
		editFn: (id: string) => `/faq-contents/${id}/edit`
	},
	configs: '/configs',
	redisCache: 'redis-cache',
	calender: '/calender'
};
