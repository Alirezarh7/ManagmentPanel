/** @type {import('tailwindcss').Config} */
(
	module.exports = {
		darkMode: 'class',
		content: ['./src/**/*.{js,jsx,ts,tsx}'],
		theme: {
			screens: {
				'2xsm': '375px',
				xsm: '425px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				xxl: '1536px',
				'3xl': '2000px'
			},
			extend: {
				colors: {
					current: 'currentColor',
					transparent: 'transparent',
					sliderColor: '#0D2A4C',
					goldColor: '#e1ac33',
					white: '#FFFFFF',
					black: '#1C2434',
					'black-2': '#010101',
					body: '#64748B',
					bodydark: '#AEB7C0',
					bodydark1: '#DEE4EE',
					bodydark2: '#8A99AF',
					primary: '#3C50E0',
					secondary: '#80CAEE',
					stroke: '#E2E8F0',
					gray: '#EFF4FB',
					graydark: '#333A48',
					'gray-2': '#F7F9FC',
					'gray-3': '#FAFAFA',
					whiten: '#F1F5F9',
					whiter: '#F5F7FD',
					boxdark: '#24303F',
					'boxdark-2': '#1A222C',
					strokedark: '#2E3A47',
					'form-strokedark': '#3d4d60',
					'form-input': '#1d2a39',
					'meta-1': '#DC3545',
					'meta-2': '#EFF2F7',
					'meta-3': '#10B981',
					'meta-4': '#313D4A',
					'meta-5': '#259AE6',
					'meta-6': '#FFBA00',
					'meta-7': '#FF6766',
					'meta-8': '#F0950C',
					'meta-9': '#E5E7EB',
					success: '#219653',
					danger: '#D34053',
					warning: '#FFA70B',
					gray: {
						50: '#f9fafb',
						100: '#f3f4f6',
						200: '#e5e7eb',
						300: '#d1d5db',
						400: '#9ca3af',
						500: '#6b7280',
						600: '#4b5563',
						700: '#374151',
						800: '#1f2937',
						900: '#111827'
					},
					amber: {
						50: '#fffbeb',
						100: '#fef3c7',
						200: '#fde68a',
						300: '#fcd34d',
						400: '#fbbf24',
						500: '#f59e0b',
						600: '#d97706',
						700: '#b45309',
						800: '#92400e',
						900: '#78350f',
						950: '#451a03'
					},
					blue: {
						50: '#eff6ff',
						100: '#dbeafe',
						200: '#bfdbfe',
						300: '#93c5fd',
						400: '#60a5fa',
						500: '#3b82f6',
						600: '#2563eb',
						700: '#1d4ed8',
						800: '#1e40af',
						900: '#1e3a8a',
						950: '#172554'
					}
				},
				zIndex: {
					999999: '999999',
					99999: '99999',
					9999: '9999',
					999: '999',
					99: '99',
					9: '9',
					1: '1'
				},
				animation: {
					progress: 'progress 1s infinite linear'
				},
				keyframes: {
					progress: {
						'0%': { transform: ' translateX(0) scaleX(0)' },
						'40%': { transform: 'translateX(0) scaleX(0.4)' },
						'100%': { transform: 'translateX(100%) scaleX(0.5)' }
					}
				},
				transformOrigin: {
					'left-right': '0% 50%'
				}
			}
		},
		plugins: []
	}
);
