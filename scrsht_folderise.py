#!/usr/bin/env python3

DELIM = ";"

DOWNLOADSFOLDER = "/"
with open("downloadsfolder.txt", "r") as f:
    DOWNLOADSFOLDER = f.read().partition("\n")[0]

import os

FOLDERBASE = os.path.join(DOWNLOADSFOLDER, "scrsht_folderise")

for f in os.scandir(DOWNLOADSFOLDER):
    if f.path == FOLDERBASE:
        continue
    bits = f.name.split(DELIM)
    host = bits[0]
    filename = bits[-1]
    sub = DELIM.join(bits[1:-1])

    hostfolder = os.path.join(FOLDERBASE, host)
    if not os.path.exists(hostfolder):
        os.mkdir(hostfolder)
    subfolder = os.path.join(hostfolder, sub)
    if not os.path.exists(subfolder):
        os.mkdir(subfolder)
    os.rename(f, os.path.join(subfolder, filename))
