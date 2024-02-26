# find out which distribution we are running on
set LFILE "/etc/os-release"

test -e /etc/os-release && set _distro $(awk '/^ID=/' /etc/os-release | awk -F'=' '{ print tolower($2) }')

# set an icon based on the distro
# make sure your font is compatible with https://github.com/lukas-w/font-logos

switch $_distro
    case '*kali*'
        set ICON "ﴣ"
    case '*arch*'
        set ICON ""
    case '*debian*'
        set ICON ""
    case '*raspbian*'
        set ICON ""
    case '*ubuntu*'
        set ICON ""
    case '*elementary*'
        set ICON ""
    case '*fedora*'
        set ICON ""
    case '*coreos*'
        set ICON ""
    case '*gentoo*'
        set ICON ""
    case '*mageia*'
        set ICON ""
    case '*centos*'
        set ICON ""
    case '*opensuse*'
        set ICON ""
    case '*sabayon*'
        set ICON ""
    case '*slackware*'
        set ICON ""
    case '*linuxmint*'
        set ICON ""
    case '*alpine*'
        set ICON ""
    case '*aosc*'
        set ICON ""
    case '*nixos*'
        set ICON ""
    case '*devuan*'
        set ICON ""
    case '*manjaro*'
        set ICON ""
    case '*rhel*'
        set ICON ""
    case '*macos*'
        set ICON ""
    default
        set ICON ""
end

export STARSHIP_DISTRO="$ICON"