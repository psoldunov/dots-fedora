import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Notifications from 'resource:///com/github/Aylur/ags/service/notifications.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import Bluetooth from 'resource:///com/github/Aylur/ags/service/bluetooth.js';

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it

const Workspaces = () =>
	Widget.Box({
		class_name: 'workspaces',
		children: Hyprland.bind('workspaces').transform((ws) => {
			return ws.map(({ id }) =>
				Widget.Button({
					on_clicked: () => Hyprland.sendMessage(`dispatch workspace ${id}`),
					child: Widget.Label(`${id}`),
					class_name: Hyprland.active.workspace
						.bind('id')
						.transform((i) => `${i === id ? 'focused' : ''}`),
				})
			);
		}),
	});

const ClientTitle = () =>
	Widget.Label({
		class_name: 'client-title',
		label: Hyprland.active.client.bind('title'),
	});

const Clock = () =>
	Widget.Label({
		class_name: 'clock',
		setup: (self) =>
			self
				// this is bad practice, since exec() will block the main event loop
				// in the case of a simple date its not really a problem
				.poll(1000, (self) => (self.label = exec('date "+%H:%M:%S %b %e."')))

				// this is what you should do
				.poll(1000, (self) =>
					execAsync(['date', '+%H:%M:%S %b %e.']).then(
						(date) => (self.label = date)
					)
				),
	});

// we don't need dunst or any other notification daemon
// because the Notifications module is a notification daemon itself
const Notification = () =>
	Widget.Box({
		class_name: 'notification',
		visible: Notifications.bind('popups').transform((p) => p.length > 0),
		children: [
			Widget.Icon({
				icon: 'preferences-system-notifications-symbolic',
			}),
			Widget.Label({
				label: Notifications.bind('popups').transform(
					(p) => p[0]?.summary || ''
				),
			}),
		],
	});

const Media = () =>
	Widget.Button({
		class_name: 'media',
		on_primary_click: () => Mpris.getPlayer('')?.playPause(),
		on_scroll_up: () => Mpris.getPlayer('')?.next(),
		on_scroll_down: () => Mpris.getPlayer('')?.previous(),
		child: Widget.Label('-').hook(
			Mpris,
			(self) => {
				if (Mpris.players[0]) {
					const { track_artists, track_title } = Mpris.players[0];
					self.label = `${track_artists.join(', ')} - ${track_title}`;
				} else {
					self.label = 'Nothing is playing';
				}
			},
			'player-changed'
		),
	});

const connectedList = Widget.Box({
	setup: (self) =>
		self.hook(
			Bluetooth,
			(self) => {
				self.children = Bluetooth.connectedDevices.map(({ iconName, name }) =>
					Label({
						indicator: Widget.Icon(iconName + '-symbolic'),
						child: Widget.Label(name),
					})
				);

				self.visible = Bluetooth.connectedDevices.length > 0;
			},
			'notify::connected-devices'
		),
});

// const indicator = Widget.Icon({
// 	icon: Bluetooth.bind('enabled').transform(
// 		(on) => `bluetooth-${on ? 'active' : 'disabled'}-symbolic`
// 	),
// });

const BluetoothIndicator = () =>
	Widget.Button({
		class_name: 'bluetooth-button',
		// icon: Bluetooth.bind('enabled').transform(
		// 	(on) => `bluetooth-${on ? 'active' : 'disabled'}-symbolic`
		// ),

		child: Widget.Icon({
			icon: Bluetooth.bind('enabled').transform(
				(on) => `bluetooth-${on ? 'active' : 'disabled'}-symbolic`
			),
		}),
		//
		on_primary_click: () => connectedList.toggle(),
		// on_secondary_click: (_, event) => item.openMenu(event),
		// binds: [['tooltip-markup', item, 'tooltip-markup']],
	});

const Volume = () =>
	Widget.Box({
		class_name: 'volume',
		css: 'min-width: 180px',
		children: [
			Widget.Icon().hook(
				Audio,
				(self) => {
					if (!Audio.speaker) return;

					const category = {
						101: 'overamplified',
						67: 'high',
						34: 'medium',
						1: 'low',
						0: 'muted',
					};

					const icon = Audio.speaker.is_muted
						? 0
						: [101, 67, 34, 1, 0].find(
								(threshold) => threshold <= Audio.speaker.volume * 100
						  );

					self.icon = `audio-volume-${category[icon]}-symbolic`;
				},
				'speaker-changed'
			),
			Widget.Slider({
				hexpand: true,
				draw_value: false,
				on_change: ({ value }) => (Audio.speaker.volume = value),
				setup: (self) =>
					self.hook(
						Audio,
						() => {
							self.value = Audio.speaker?.volume || 0;
						},
						'speaker-changed'
					),
			}),
		],
	});

const Mic = () =>
	Widget.Box({
		class_name: 'microphone',
		css: 'min-width: 180px',
		children: [
			Widget.Icon().hook(
				Audio,
				(self) => {
					if (!Audio.microphone) return;

					const category = {
						67: 'high',
						34: 'medium',
						1: 'low',
						0: 'muted',
					};

					const icon = Audio.microphone.is_muted
						? 0
						: [101, 67, 34, 1, 0].find(
								(threshold) => threshold <= Audio.microphone.volume * 100
						  );

					self.icon = `audio-input-microphone-${category[icon]}`;
				},
				'microphone-changed'
			),
			Widget.Slider({
				hexpand: true,
				draw_value: false,
				on_change: ({ value }) => (Audio.microphone.volume = value),
				setup: (self) =>
					self.hook(
						Audio,
						() => {
							self.value = Audio.microphone?.volume || 0;
						},
						'microphone-changed'
					),
			}),
		],
	});

const BatteryLabel = () =>
	Widget.Box({
		class_name: 'battery',
		visible: Battery.bind('available'),
		children: [
			Widget.Icon({
				icon: Battery.bind('percent').transform((p) => {
					return `battery-level-${Math.floor(p / 10) * 10}-symbolic`;
				}),
			}),
			Widget.ProgressBar({
				vpack: 'center',
				fraction: Battery.bind('percent').transform((p) => {
					return p > 0 ? p / 100 : 0;
				}),
			}),
		],
	});

const SysTray = () =>
	Widget.Box({
		class_name: 'system-tray',
		children: SystemTray.bind('items').transform((items) => {
			return items.map((item) =>
				Widget.Button({
					class_name: 'system-tray-item',
					child: Widget.Icon({ binds: [['icon', item, 'icon']] }),
					on_primary_click: (_, event) => item.activate(event),
					on_secondary_click: (_, event) => item.openMenu(event),
					binds: [['tooltip-markup', item, 'tooltip-markup']],
				})
			);
		}),
	});

// layout of the bar
const Left = () =>
	Widget.Box({
		spacing: 8,
		children: [Workspaces(), ClientTitle()],
	});

const Center = () =>
	Widget.Box({
		spacing: 8,
		children: [Media(), Notification()],
	});

const Right = () =>
	Widget.Box({
		hpack: 'end',
		spacing: 8,
		children: [
			BluetoothIndicator(),
			Volume(),
			Mic(),
			BatteryLabel(),
			Clock(),
			SysTray(),
		],
	});

const Bar = () =>
	Widget.Window({
		name: `bar`, // name has to be unique
		class_name: 'bar',
		anchor: ['top', 'left', 'right'],
		exclusivity: 'exclusive',
		child: Widget.CenterBox({
			start_widget: Left(),
			center_widget: Center(),
			end_widget: Right(),
		}),
	});

import { monitorFile } from 'resource:///com/github/Aylur/ags/utils.js';

monitorFile(`${App.configDir}/style.css`, function () {
	App.resetCss();
	App.applyCss(`${App.configDir}/style.css`);
});

// exporting the config so ags can manage the windows
export default {
	style: App.configDir + '/style.css',
	windows: [Bar()],
};
