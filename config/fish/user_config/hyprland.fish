function checkUpdates
  set updates (dnf check-update | wc -l)
  echo (math $updates - 2)
end

function resetDE
  killall waybar
  # killall hyprpaper
  killall mpvpaper
  killall swaync
  hyprctl reload
  waybar
  # hyprpaper
  swaync
  start_wallpaper
end