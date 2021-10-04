import requests, random, sys, os

log_file = "log_portable_whm.txt"
headers = {"user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; Redmi Note 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Mobile Safari/537.36"}
subDo = [
	"orgfree.com", "6te.net", "ueuo.com", "eu5.org", "noads.biz", 
	"coolpage.biz", "freeoda.com", "freevar.com", "freetzi.com", "xp3.biz"
	]
mail = [
	"gmail.com", "yahoo.com", "yandex.com", "inscriptio.in","just4fun.me", 
	"privacy-mail.top","cloud-mail.top","happy-new-year.top","buy-blog.com", 
	"the23app.com","mac-24.com","thejoker5.com","greencafe24.com", 
	"crepeau12.com","appzily.com","coffeetimer24.com","popcornfarm7.com", 
	"bestparadize.com"
	]


class Whm:
	def __init__(self):
		self.templateResult = """
===============================================
CPanel
Url      : {}
Username : {}
Password : {}
===============================================
===============================================
FTP Account
FTP Server/Host: {}
FTP Login/Username: {}
FTP PassWord: {}
===============================================
"""
		try:
			self.sess = requests.Session()
			self.sess.get("https://freewebhostingarea.com")
		except Exception as e:
			print(" [!] Please Check Your Internet Connection")
			open(log_file, "a").write(str(e)+"\n")
			sys.exit()

	def checkAvailable(self, name, domain):
		dummy_sess = self.sess
		payload = {"thirdLevelDomain":name, "domain":domain, "action": "check_domain"}
		html = dummy_sess.post(
			"https://freewebhostingarea.com/cgi-bin/create_account.cgi", 
			data=payload, headers=headers).text
		if "Account already" in html:
			return False
		else:
			return True

	def create(self, email, domainName):
		dummy_sess = self.sess
		psswd = self.randomChar(random.randint(10, 16))
		payload = {
			"action": "validate", 
			"domainName": domainName, 
			"email": email, 
			"password": psswd, 
			"confirmPassword": psswd,
			"agree": "1"}
		html = dummy_sess.post(
			"https://newserv.freewha.com/cgi-bin/create_ini.cgi", 
			data=payload, headers=headers).text
		if "was successfully activated" in html:
			return self.templateResult.format(
				"https://newserv.freewha.com/", domainName, 
				psswd, domainName, domainName, psswd)
		else:
			return False


	def randomChar(self, length, num=True):
		char = "qwertyuioplkjhgfdsazxcvbnmZXCVBNMLKJHGFDSAQWERTYUIOP"
		if num: char+="1234567890"
		return "".join([random.choice(char) for i in range(length)])



def clr():
    os.system('cls' if os.name == 'nt' else 'clear')

def banner():
    print("""
 █▀█ █▀█ █▀█ ▀█▀ ▄▀█ █▄▄ █░░ █▀▀
 █▀▀ █▄█ █▀▄ ░█░ █▀█ █▄█ █▄▄ ██▄
 
 █░█░█ █░█ █▀▄▀█
 ▀▄▀▄▀ █▀█ █░▀░█  V1.0.0

 Contact         : https://wa.me/+6281251389915
 About Developer : https://github.com/Nux-xader
 ________________________________________________
""")

def preperate():
	x = str(input(" Use random sub domain [y/n] ")).lower()
	if x == "n":
		print(" List sub domain : ")
		[print(" "+str(num+1)+". "+x) for num, x in enumerate(subDo)]
		try:
			subDomain = int(input(" Choice : "))-1
			subDomain = subDo[subDomain]
		except Exception as e:
			open(log_file, 'a').write(str(e)+"\n")
			print(" [!] Invalid input")
			sys.exit()

	elif x == "y":
		subDomain = False
	else:
		print(" [!] Invalid input")
		sys.exit()

	x = str(input(" Generate random app name [y/n] ")).lower()
	if x == "y":
		try:
			appName = int(input(" Quantity : "))
		except:
			print(" [!] Invalid input")
			sys.exit()
	elif x == "n":
		appName = str(input(" File list app name : "))
		try:
			appName = str(open(appName, 'r').read()).split("\n")
		except Exception as e:
			open(log_file, 'a').write(str(e)+"\n")
			print(" [!] "+str(e))
			sys.exit()

	saveTo = str(input(" Save result to : "))
	if saveTo.split('.')[-1] != "txt": saveTo+=".txt"
	try:
		open(saveTo, 'r').read()
		x = str(input(" File "+saveTo+" Already exists\n Are you sure replace it [y/n] ")).lower()
		if x == "y":
			os.remove(saveTo)
		elif x == "n":
			sys.exit()
		else:
			print(" [!] Invalid input")
			sys.exit()

	except:
		pass

	return subDomain, appName, saveTo

def main():
	clr()
	banner()
	whm = Whm()
	subDomain, appName, saveTo = preperate()
	if str(appName).isdigit: appName = [whm.randomChar(random.randint(6,11), False) for x in range(appName)]
	success, filed, qty = 0, 0, len(appName)
	for app in appName:
		clr()
		banner()
		print(" Progress ["+str(success+filed)+"/"+str(qty)+"]")
		print(" [+] Succes : "+str(success))
		print(" [-] Filed  : "+str(filed))
		subdo = subDomain
		if not subDomain: subdo = random.choice(subDo)
		available = whm.checkAvailable(app, subdo)

		if available:
			result = whm.create(whm.randomChar(random.randint(6,11))+"@"+random.choice(mail), str(app+"."+subdo).lower())
			if result:
				success+=1
				open(saveTo, "a").write(result)

			else:
				filed+=1
		else:
			filed+=1
	clr()
	banner()
	print(" Progress ["+str(success+filed)+"/"+str(qty)+"]")
	print(" [+] Succes : "+str(success))
	print(" [-] Filed  : "+str(filed))
	print(" [+] Bot Finished")


if __name__ == '__main__':
	main()