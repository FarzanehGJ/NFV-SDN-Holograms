# NFV-SDN-Holograms

**For Client side - WebXR Webpage**<br />
1) Clone this project
2) Clone three.js repository from [three.js github](https://github.com/mrdoob/three.js/) and put it in the same directory of "PLY-hologram.html" code.
3) Download dataset of [PLY files](http://plenodb.jpeg.org/pc/8ilabs/). Then copy just "Ply" folder and Paset it in the same directory of "PLY-hologram.html" code.
4) Open the "PLY-hologram.html" code whit "Chrome" browser

**For Encoding and Decoding**<br />
There is a bash file named "bash.sh". Inside this file, all 300 ply original files are encoded and saved in folder named "out" and the decoded and saved to folder 
named "decoded". 
The "PLY-holograms.html" file will read the decoded files from "decoded" folder, render and show in the Chrome browser.
