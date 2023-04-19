// Example#8

const Main = imports.ui.main;
const St = imports.gi.St;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const ByteArray = imports.byteArray;
const GLib = imports.gi.GLib;

let myPopup;

const MyPopup = GObject.registerClass(
  class MyPopup extends PanelMenu.Button {

    _init() {

      super._init(0);

      let icon = new St.Icon({
        //icon_name : 'security-low-symbolic',
        gicon: Gio.icon_new_for_string(Me.dir.get_path() + '/food-potato.svg'),
        style_class: 'system-status-icon',
      });

      this.add_child(icon);

      let pmItem = new PopupMenu.PopupMenuItem('Update credentials');
      this.menu.addMenuItem(pmItem);

      pmItem.connect('activate', () => {
        log('clicked');
        log('path: ' + Me.dir.get_path());
        //runShell("touch test");
      });

      // you can close, open and toggle the menu with
      // this.menu.close();
      // this.menu.open();
      // this.menu.toggle();
    }
  });

function runShell(argv) {
  try {
    let [, stdout, stderr, status] = GLib.spawn_command_line_sync(argv);

    if (status !== 0) {
      if (stderr instanceof Uint8Array)
        stderr = ByteArray.toString(stderr);

      printerr(stderr);
    }

    if (stdout instanceof Uint8Array)
      stdout = ByteArray.toString(stdout);

    // Now were done blocking the main loop, phewf!
    log(stdout);
  } catch (e) {
    printerr(e);
  }

}

function init() {
}

function enable() {
  myPopup = new MyPopup();
  Main.panel.addToStatusArea('myPopup', myPopup, 1);
}

function disable() {
  myPopup.destroy();
}
