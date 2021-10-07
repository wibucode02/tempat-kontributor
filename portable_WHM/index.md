---

author: Satria Rahmat M

title: Portable WHM (Auto Generate Hosting)

description: This tools use for auto generate unlimited hosting and faster

---


# Install to Termux
apt-get update -y
apt-get upgrade -y
pkg install wget -y
pkg install python -y
pip install requests
wget https://raw.githubusercontent.com/Nux-xader/tempat-kontributor/main/portable_WHM/main.py
python main.py

# Install to Linux Desktop
pip3 install requests
wget https://raw.githubusercontent.com/Nux-xader/tempat-kontributor/main/portable_WHM/main.py
python3 main.py