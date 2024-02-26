if status is-interactive
    # Commands to run in interactive sessions can go here
end

export STARSHIP_CONFIG=/home/psoldunov/.config/starship.toml

starship init fish | source

export DOTFILES="$HOME/.dotfiles"
export USER_CONFIG="$DOTFILES/config/fish/user_config"

# Starship
source $USER_CONFIG/starship.fish

# Variables
source $USER_CONFIG/variables.fish

# Aliases
source $USER_CONFIG/aliases.fish

# Functions
source $USER_CONFIG/functions.fish

# Hyprland functions
source $USER_CONFIG/hyprland.fish

# cargo
set -Ua fish_user_paths $HOME/.cargo/bin

# add ~/.local/bin to PATH
export PATH="$HOME/.local/bin:$PATH"
export PATH="/usr/sbin:$PATH"
export PATH="$HOME/.local/podman/bin:$PATH"
export PATH="$HOME/.cargo/bin:$PATH"

# add ~/.local/share/fish/vendor/bin to PATH
set -U fish_user_paths $fish_user_paths ~/.local/share/fish/vendor/bin

# source autojump fish file
if test -f /usr/share/autojump/autojump.fish
    source /usr/share/autojump/autojump.fish
end

# bun
set --export BUN_INSTALL "$HOME/.bun"
set --export PATH $BUN_INSTALL/bin $PATH

# tabtab source for electron-forge package
# uninstall by removing these lines or running `tabtab uninstall electron-forge`
[ -f /home/psoldunov/Projects/figma-rpm/node_modules/tabtab/.completions/electron-forge.fish ]; and . /home/psoldunov/Projects/figma-rpm/node_modules/tabtab/.completions/electron-forge.fish