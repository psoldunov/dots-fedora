# Customize Aliases
alias ls='lsd -laFh'
alias reload="source ~/.config/fish/config.fish && echo 'FISH config reloaded.'"
alias nerdfont="fontforge --script ~/.dotfiles/apps/font-patcher/font-patcher --complete $1 --outputdir ~/.fonts"
alias vim='nvim'
alias code='code --ozone-platform-hint=auto'
alias code-insiders='code-insiders --ozone-platform-hint=auto'

# Power settings
alias poweroff='systemctl poweroff'
alias reboot='systemctl reboot'
alias suspend='systemctl suspend'
alias hibernate='systemctl hibernate'
alias hybrid-sleep='systemctl hybrid-sleep'

#Add files to trash
alias rm='gio trash'

# sudo
alias fucking='sudo'


# nemo
alias thunar='nemo'