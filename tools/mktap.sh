#!/bin/zsh

[[ "$UID" -ne "0" ]] && echo "You must be root. Goodbye..." && exit 1
echo "starting"
exec 4<>/dev/tap0
ifconfig tap0 10.10.10.1 10.10.10.255
ifconfig tap0 up
ping -c1 10.10.10.1
echo "ending"
export PS1="tap interface>"
dd of=/dev/null <&4 & # continuously reads from buffer and dumps to null

