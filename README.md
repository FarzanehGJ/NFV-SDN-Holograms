# NFV-SDN-Holograms

**For Client side - WebXR Webpage**<br />
1) Clone this project
2) Clone three.js repository from [three.js github](https://github.com/mrdoob/three.js/) and put it in the same directory of "PLY-hologram.html" code.
3) Download dataset of [PLY files](http://plenodb.jpeg.org/pc/8ilabs/). Then copy just "Ply" folder and Paset it in the same directory of "PLY-hologram.html" code.
4) Clone [draco repository](https://github.com/google/draco) and build it inside the NFV-SDN-Hologram project folder.
5) Open the "PLY-hologram.html" code whit "Chrome" browser

**NFV-SDN-Holograms:**
* three (cloned from three.js github)<br />
* draco (cloned from draco github)<br />
* PLY-hologram.html<br />
* PlyScript.js<br />
* Server.js<br />
* WebServer.js<br />
* Run.sh<br />
* Bash.sh<br />
* main.css<br /><br />


**When you run the Run.sh file, it will run two servers. One is serving the webpage on port 3000 and the other is doing the decoding process on port 8080.**

**For Encoding and Decoding**<br />
First you need to clone [draco repository](https://github.com/google/draco) and build it inside the NFV-SDN-Hologram project folder.
The "PLY-holograms.html" file will send a request to port:8080 to decode the targeted files before loading and then read the decoded files from "decoded" folder, 
render and show in the Chrome browser.

