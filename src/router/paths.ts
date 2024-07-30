export const PATHS = {
	home: '/admin',
	frameWork: {
		silentCallback: '/admin/SilentCallback'
	},
	announcements: {
		index: '/admin/announcements',
		create: '/admin/announcements/create',
		show: '/admin/announcements/:id',
		showFn: (id: string) => `/admin/announcements/${id}`,
		edit: '/admin/announcements/:id/edit',
		editFn: (id: string) => `/admin/announcements/${id}/edit`
	},
	contents: {
		index: '/admin/contents',
		create: '/admin/contents/create',
		show: '/admin/contents/:id',
		showFn: (id: string) => `/admin/contents/${id}`,
		edit: '/admin/contents/:id/edit',
		editFn: (id: string) => `/admin/contents/${id}/edit`
	},
	faqContents: {
		index: '/admin/faq-contents',
		create: '/admin/faq-contents/create',
		show: '/admin/faq-contents/:id',
		showFn: (id: string) => `/admin/faq-contents/${id}`,
		edit: '/admin/faq-contents/:id/edit',
		editFn: (id: string) => `/admin/faq-contents/${id}/edit`
	},
	calender: '/admin/calender'
};
