# Create a directory and cd into it
function mkcd 
  mkdir -p "$argv" && cd "$argv"
end

function wkill
  hyprprop | grep '"pid":' | sed 's/[^0-9]*//g' | xargs kill
end

function open
  xdg-open "$argv" & disown
end